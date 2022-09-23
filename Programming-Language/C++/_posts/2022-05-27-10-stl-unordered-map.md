---
title: '[C++] 10. STL - &lt;unordered_map&gt;'
author_profile: true
toc_label: '[C++] 10. STL - &lt;unordered_map&gt;'
post-order: 10
last_modified_at: 2022-09-23 22:44:00 +0900
---

## 비정렬 맵(unordered_map) 컨테이너

```cpp
template<class Key, // unordered_map::key_type
    class T, // unordered_map::mapped_type
    class Hash = hash<Key>, // unordered_map::hasher
    class Pred = equal_to<Key>, // unordered_map::key_equal
    class Alloc = allocator< pair<const Key,T>> // unordered_map::allocator_type
> class unordered_map;
```

맵(map)은 키(key)-값(value) 쌍의 데이터를 특정 순서에 따라 저장하는 연관 컨테이너다. 맵에서 키(key)는 내부 요소를 고유하게 식별하고 정렬하는데 사용되며, 값(value)은 키에 대응하는 실제 값을 저장한다. 키와 값은 자료형이 서로 다를 수 있지만  맵 객체의 멤버 자료형 `value_type`으로 통일되며, `value_type`은 `pair` 자료형을 재정의한 것이다.

`typedef pair<const Key, T> value_type;`

맵(`map`)은 비정렬 맵(`unordered_map`)보다 요소 접근에 더 큰 시간복잡도를 가지지만(맵은 Binary Search Tree를 사용하여 탐색 시간복잡도가 *O(log n)*, 비정렬 맵은 해쉬 테이블을 사용하여 *O(1)*) 대신 정렬 순서에 따른 순회를 할 수 있다.

## 멤버 함수
각 멤버함수의 예제 코드를 작성하기엔 양이 매우 많기 때문에 [cplusplus.com](https://cplusplus.com/reference/unordered_map/unordered_map/)에서 각 멤버 함수 링크를 클릭하여 예제를 확인하자.

## 예제

### 생성자, [], 삽입(insert)

```cpp::lineons
#include <iostream>
#include <unordered_map>

using namespace std;

int main() {
    unordered_map<char, int> first; // empty constructor
    first['a'] = 10;
    first['b'] = 20;
    first['c'] = 50;
    first['d'] = 70;

    unordered_map<char, int> second(first.begin(), first.end()); // range constructor
    unordered_map<char, int> third(second); // copy constructor
    unordered_map<char, int> fourth, fifth;

    cout << "The content of third:\n";
    for (auto it=third.begin(); it!=third.end(); it++) {
        cout << it->first << " => " << it->second << '\n';
        fourth[(*it).first] = (*it).second;
        fifth[(*it).first] = (*it).second;
    }
    cout << "Before insert, the content of fourth:\n";
    for (unordered_map<char, int>::iterator it=fourth.begin(); it!=fourth.end(); it++)
        cout << it->first << " => " << it->second << '\n';

    fourth.insert(pair<char, int>('z', 100));
    pair<unordered_map<char, int>::iterator, int> ret = fourth.insert(pair<char, int>('z', 200));

    if (ret.second == false) {
        cout << "key '" << ret.first->first << "' is already existed in fourth with value " << ret.first->second << '\n';
    }

    cout << "After insert, the content of fourth:\n";
    for (unordered_map<char, int>::iterator it=fourth.begin(); it!=fourth.end(); it++)
        cout << it->first << " => " << it->second << '\n';
    
    cout << "Before insert, the content of fifth:\n";
    for (unordered_map<char, int>::iterator it=fifth.begin(); it!=fifth.end(); it++)
        cout << it->first << " => " << it->second << '\n';
    
    fifth['z'] = 100;
    fifth['z'] = 200;

    cout << "After insert, the content of fifth:\n";
    for (unordered_map<char, int>::iterator it=fifth.begin(); it!=fifth.end(); it++)
        cout << it->first << " => " << it->second << '\n';

    return 0;
}
```

```txt
The content of third:
a => 10
b => 20
c => 50
d => 70
Before insert, the content of fourth:
d => 70
c => 50
b => 20
a => 10
key 'z' is already existed in fourth with value 100
After insert, the content of fourth:
a => 10
b => 20
c => 50
z => 100
d => 70
Before insert, the content of fifth:
d => 70
c => 50
b => 20
a => 10
After insert, the content of fifth:
a => 10
b => 20
c => 50
z => 200
d => 70
```

<p class=short>삽입(insertion), 삭제(erase)</p>

{% raw %}
```cpp::lineons
#include <iostream>
#include <unordered_map>

using namespace std;

int main() {
    unordered_map<char, int> first; // empty constructor
    first['a'] = 10;
    first['b'] = 20;
    first['c'] = 50;
    first['d'] = 70;

    unordered_map<char, int> second(first.begin(), first.end()); // range constructor
    unordered_map<char, int> third(second); // copy constructor
    unordered_map<char, int> fourth, fifth;
    unordered_map<char, int> sixth({{'e', 80}, {'f', 90}, {'g', 100}}); // initializer list constructor

    cout << "The content of third:\n";
    for (auto it=third.begin(); it!=third.end(); it++) {
        cout << it->first << " => " << it->second << '\n';
        fourth[(*it).first] = (*it).second;
        fifth[(*it).first] = (*it).second;
    }
    cout << "Before insert, the content of fourth:\n";
    for (unordered_map<char, int>::iterator it=fourth.begin(); it!=fourth.end(); it++)
        cout << it->first << " => " << it->second << '\n';

    fourth.insert(pair<char, int>('z', 100));
    pair<unordered_map<char, int>::iterator, int> ret = fourth.insert(pair<char, int>('z', 200));

    if (ret.second == false) {
        cout << "key '" << ret.first->first << "' is already existed in fourth with value " << ret.first->second << '\n';
    }

    cout << "After insert, the content of fourth:\n";
    for (unordered_map<char, int>::iterator it=fourth.begin(); it!=fourth.end(); it++)
        cout << it->first << " => " << it->second << '\n';
    
    cout << "Before insert, the content of fifth:\n";
    for (unordered_map<char, int>::iterator it=fifth.begin(); it!=fifth.end(); it++)
        cout << it->first << " => " << it->second << '\n';
    
    fifth['z'] = 100;
    fifth['z'] = 200;

    cout << "After insert, the content of fifth:\n";
    for (unordered_map<char, int>::iterator it=fifth.begin(); it!=fifth.end(); it++)
        cout << it->first << " => " << it->second << '\n';

    sixth.insert(make_pair<char, int>('h', 1)); // move insertion
    sixth.insert(fifth.begin(), fifth.end()); // range insertion
    // sixth.insert(fifth); // Error

    cout << "After move, range, copy insertion to sixth, sixth:\n";
    for (unordered_map<char, int>::iterator it=sixth.begin(); it!=sixth.end(); it++)
        cout << it->first << " => " << it->second << '\n';
    
    // sixth.erase(sixth.begin()+2, sixth.end()); // Error - can't erase with range
    sixth.erase(sixth.find('z'));

    cout << "After erase 'z' from sixth, sixth:\n";
    for (unordered_map<char, int>::iterator it=sixth.begin(); it!=sixth.end(); it++)
        cout << it->first << " => " << it->second << '\n';

    return 0;
}
```
{% endraw %}

```txt
The content of third:
a => 10
b => 20
c => 50
d => 70
Before insert, the content of fourth:
d => 70
c => 50
b => 20
a => 10
key 'z' is already existed in fourth with value 100
After insert, the content of fourth:
a => 10
b => 20
c => 50
z => 100
d => 70
Before insert, the content of fifth:
d => 70
c => 50
b => 20
a => 10
After insert, the content of fifth:
a => 10
b => 20
c => 50
z => 200
d => 70
After move, range, copy insertion to sixth, sixth:
d => 70
z => 200
c => 50
b => 20
a => 10
f => 90
e => 80
g => 100
h => 1
After erase 'z' from sixth, sixth:
d => 70
c => 50
b => 20
a => 10
f => 90
e => 80
g => 100
h => 1
```

### list initializer를 이용한 삽입과 연산자 `[]`로 없는 키에 접근 테스트

{% raw %}
```cpp::lineons
#include <iostream>
#include <unordered_map>

using namespace std;

void print(unordered_map<char, int>& map) {
    for (auto it=map.begin(); it!=map.end(); it++)
        cout << '(' << it->first << ", " << it->second << ")\n";
}

int main() {
    unordered_map<char, int> myMap({{'e', 80}, {'f', 90}, {'g', 101}});
    cout << "After initialization, myMap:\n";
    print(myMap);

    cout << "myMap['h']: ";
    cout << myMap['h'] << '\n';
    myMap.insert({'h', 102});

    cout << "After insert({'h', 102}), myMap:\n";
    print(myMap);
    cout << "myMap['h']: ";
    cout << myMap['h'] << '\n';
    
    myMap.erase(myMap.find('h'));
    cout << "erased 'h'\n";

    myMap.insert(pair<char, int>('h', 102));
    cout << "After insert(pair<char, int>('h', 102)), myMap:\n";
    print(myMap);
    cout << "myMap['h']: ";
    cout << myMap['h'] << '\n';
    return 0;
}
```
{% endraw %}

```txt
After initialization, myMap:
(g, 101)
(e, 80)
(f, 90)
myMap['h']: 0
After insert({'h', 102}), myMap:
(h, 0)
(g, 101)
(e, 80)
(f, 90)
myMap['h']: 0
erased 'h'
After insert(pair<char, int>('h', 102)), myMap:
(h, 102)
(g, 101)
(e, 80)
(f, 90)
myMap['h']: 102
```

## A. 참조
cplusplus.com, "std::unordered_map", *cplusplus.com*, [Online]. Available: [https://m.cplusplus.com/reference/unordered_map/unordered_map/](https://m.cplusplus.com/reference/unordered_map/unordered_map/) [Accessed May 26, 2022].

BlockDMask, "[C++] map container 정리 및 사용법", *Tistory*, Jul. 28, 2017. [Online]. Available: [https://blockdmask.tistory.com/87](https://blockdmask.tistory.com/87) [Accessed May 27, 2022].
