---
title: '[C++] 8. STL - &lt;unordered_set&gt;'
author_profile: true
toc_label: '[C++] 8. STL - &lt;unordered_set&gt;'
post-order: 8
last_modified_at: 2022-09-23 22:40:00 +0900
---

## 비정렬 집합(해시 집합, unordered_set) 컨테이너

```cpp
template <
    class Key,                        // unordered_set::key_type/value_type
    class Hash = hash<Key>,           // unordered_set::hasher
    class Pred = equal_to<Key>,       // unordered_set::key_equal
    class Alloc = allocator<Key>      // unordered_set::allocator_type
> class unordered_set;
```

해시 집합은 사전에 정의된 해시 함수에 각 요소를 적용하여 얻어낸 결과값(해시 키)을 해시 버킷이란 공간에 보관하는데, 서로 다른 요소가 같은 해시 키를 가질 때 해시 충돌(Hash Collision)이 발생한다고 한다. 해시 충돌은 해싱을 통한 자료 저장 시 성능 저하의 원인이 되며 원하는 데이터를 찾는데 장애 요소가 된다. 해시 충돌을 해결하는 방법은 크게 체이닝(Chaining), 개방 주소법(Open Addressing)이 있는데 자세한 내용은 본문에서 다루지 않겠다. 결과적으로 C++에서 사용자 정의 자료형을 요소로 가지는 해시 집합을 사용할 때는 사용자 정의 자료형에 대한 해시 함수와 비교를 위한 연산자`==` 오버로딩이 필요하다.

비정렬 집합 컨테이너를 이용하려면 다음 코드를 추가해야 한다.

```cpp
#include <unordered_set>
```

## 멤버 함수
각 멤버함수의 예제 코드를 작성하기엔 양이 매우 많기 때문에 [cplusplus.com](https://cplusplus.com/reference/unordered_set/unordered_set/)에서 각 멤버 함수 링크를 클릭하여 예제를 확인하자.

## 예제
### 초기화

```cpp
vector<string> v({"red", "green", "blue"});
unordered_set<string> first; // empty constructor
unordered_set<string> second({"red", "green", "blue"}); // list initializer constructor
unordered_set<string> third(v.begin(), v.end()); // range constructor
unordered_set<string> fourth(third); // copy constructor
```

### 구조체 해시 집합
unordered_set에 사용자 정의 자료형을 담기 위해선 다음 두 가지가 필요하다.

1. 연산자 `==` 오버로딩
2. 해시 함수

해시 함수를 구현하는 방법은 다음 두 가지 방법이 있다.

- std 네임스페이스에 hash&lt;Type&gt; 정의
- 해시 함수를 가진 자료형 정의

<p class=short>std 네임스페이스 hash&lt;Type&gt; 정의</p>

```cpp
struct Student {
    long long id;
    string name;

    bool operator==(const Student& rhs) const {
        return id == rhs.id && name == rhs.name;
    }
};

namespace std {
    template<>
    struct hash<Student> {
        size_t operator()(const Student& arg) const {
            hash<long long> hll;
            hash<string> hs;

            return hll(arg.id)^hs(arg.name);
        }
    };
}

unordered_set<Student> s({
    {1, "1"},
    {2, "2"},
});
```

<p class=short>해시 함수를 가진 자료형 정의</p>

```cpp
struct Student {
    long long id;
    string name;

    bool operator==(const Student& rhs) const {
        return id == rhs.id && name == rhs.name;
    }
};

struct HashStudent {
    size_t operator()(const Student& arg) const {
        hash<long long> hll;
        hash<string> hs;

        return hll(arg.id)^hs(arg.name);
    }
};

unordered_set<Student, HashStudent> s({
    {1, "1"},
    {2, "2"},
});
```

### find, erase

```cpp
unordered_set<Student> s({
    {1, "1"},
    {2, "2"},
    {3, "3"},
});

unordered_set<Student>::iterator it = s.find({2, "2"});
s.erase(it);
```

```cpp
unordered_set<int> s({1, 2, 3});
auto it = s.find(4);

if (it == s.end()) {
    cout << "4 doesn't exist.\n";
}
```

### 집합 연산
집합 연산에 사용되는 피연산자가 unordered_set 자료형인 경우 내림차순 또는 오름차순되어 있지 않기 때문에 원하는 대로 동작하지 않을 가능성이 있습니다.

따라서 집합 연산을 원한다면 unordered_set 자료형을 set으로 변환하여 수행하는 것이 좋습니다.

## A. 참조
cplusplus.com, "std::unordered_set", *cplusplus.com*, [Online]. Available: [https://cplusplus.com/reference/unordered_set/unordered_set/](https://cplusplus.com/reference/unordered_set/unordered_set/) [Accessed May 26, 2022].

공부하는 식빵맘, "", *Github.io*, Apr. 1, 2021. [Online]. Available: [https://ansohxxn.github.io/stl/mapsetcustom/](https://ansohxxn.github.io/stl/mapsetcustom/) [Accessed May 31, 2022].
