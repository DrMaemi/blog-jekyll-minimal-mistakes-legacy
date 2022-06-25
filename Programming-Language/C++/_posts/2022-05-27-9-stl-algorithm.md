---
title: '[C++] 9. STL - &lt;algorithm&gt;'
author_profile: true
toc_label: '[C++] 9. STL - &lt;algorithm&gt;'
post-order: 9
last_modified_at: 2022-06-24 13:03:42 +0900
---

`<algorithm>` 헤더는 요소들(elements)의 범위(range)에 대해 사용되는 함수들을 모아놓은 라이브러리다. 여기서 범위란 반복자(iterator)와 포인터(pointer)를 통해 명시될 수 있으며 이는 배열이나 STL 컨테이너의 범위가 될 수 있다는 뜻이다. 유의할 점은 `<algorithm>` 헤더에 있는 함수들은 이러한 반복자와 포인터를 통해 자료구조에 접근하기 때문에 실제 값을 변경할 수 있다는 것과, 자료구조의 크기나 저장 공간 할당 등의 연산은 수행하지 못한다는 점이다.

## `<algorihtm>`의 함수들
`<algorithm>` 헤더에서 제공하는 함수들 종류가 너무 많아 깜짝 놀랐다. 본문에서는 이들을 모두 나열하기 보단 자주 사용되는 몇 가지 함수들에 대해서만 종류 별로 나열하고자 한다. 모든 함수들에 대한 자세한 내용과 예제 코드는 [cplusplus.com](https://m.cplusplus.com/reference/algorithm/)에서 참고하자.

### 비수정 연산(Non-modifying sequence operation)
- all_of
- any_of
- none_of
- for_each
- find
- find_if
- count
- count_if
...

### 수정 연산(Modifying sequence operation)
- copy
- copy_n
- copy_if
- swap
- swap_ranges
- transform
- replace
- fill
- fill_n
- remove
- remove_if
- reverse
- rotate
...

### 분할(Partition)
- partition
...

### 정렬(Sorting)
- sort
...

### 이분 탐색(Binary search)
operating on partitioned/sorted ranges
- lower_bound
- upper_bound
- binary_search
...

### 병합(Merge)
operation on sorted ranges
...

### 힙(Heap)
...

### 최소/최대(Min/max)
- min
- min_element
- max
- max_element
...

## 예제
### 조건 검사 `all_of`와 각 요소에 대해 함수 적용 `for_each`, 기본 정렬

```cpp::lineons
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void op_increase(int& i) { ++i; }

struct st_increase {
    int operator()(int& i) { return ++i; }
};

void print(int* arr) {
    for (size_t i=0; i<8; i++)
        cout << arr[i] << ' ';
    cout << '\n';
}

void print(vector<int>& v) {
    for (auto& x: v)
        cout << x << ' ';
    cout << '\n';
}

int main() {
    int myArr[] = {11, 23, 7, 3, 17, 13, 5, 19};

    if (all_of(myArr, myArr+sizeof(myArr)/sizeof(int), [](int& x){ return x%2; }))
        cout << "All the elements of myArr[] are odd numbers.\n";
    
    for_each(myArr, myArr+8, op_increase);

    if (all_of(myArr, myArr+sizeof(myArr)/sizeof(int), [](int& x){ return x%2 == 0; }))
        cout << "All the elements of myArr[] are even numbers.\n";

    for_each(myArr, myArr+8, st_increase());

    if (all_of(myArr, myArr+sizeof(myArr)/sizeof(int), [](int& x){ return x%2; }))
        cout << "All the elements of myArr[] are odd numbers.\n";
    
    cout << "myArr: ";
    print(myArr);

    vector<int> v(myArr, myArr+sizeof(myArr)/sizeof(int));
    sort(v.begin(), v.end());

    cout << "After sorting, v:";
    print(v);

    return 0;
}
```

```txt
All the elements of myArr[] are odd numbers.
All the elements of myArr[] are even numbers.
All the elements of myArr[] are odd numbers.
myArr: 13 25 9 5 19 15 7 21
After sorting, v:5 7 9 13 15 19 21 25
```

### `all_of` 2차원 배열

```cpp::lineons
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    vector<vector<int>> v(2, vector<int>(2, 1));

    cout << all_of(&v[0][0], &v[2][3], [](const int& x){ return x; });

    return 0;
}
```
```txt
1
```

### `copy`, 구조체와 다중 조건 정렬

```cpp::lineons
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Student {
    int id;
    string name;
    string address;

    void print() {
        cout << '(' << id << ", " << name << ", " << address << ")\n";
    }

    bool operator<(const Student& b) const {
        if (id == b.id) {
            if (name == b.name) {
                return address > b.address; // 내림차순
            }
            return name < b.name; // 오름차순
        }
        return id > b.id; // 내림차순
    }
};

bool fncomp(const Student& a, const Student& b) {
    if (a.id == b.id) {
        if (a.name == b.name) {
            return a.address > b.address; // 내림차순
        }
        return a.name < b.name; // 오름차순
    }
    return a.id > b.id; // 내림차순
}

class classcomp {
public:
    bool operator()(const Student& a, const Student& b) const {
        if (a.id == b.id) {
            if (a.name == b.name) {
                return a.address > b.address; // 내림차순
            }
            return a.name < b.name; // 오름차순
        }
        return a.id > b.id; // 내림차순
    }
};

void print(Student *students) {
    for (size_t i=0; i<10; i++)
        students[i].print();
    cout << '\n';
}

void print(vector<Student>& students) {
    for (auto& x: students)
        x.print();
    cout << '\n';
}

int main() {
    Student students_1[10] = {
        {1, "f", "adsf"},
        {5, "e", "aasdfxcvzc"},
        {3, "w", "234asdc"},
        {7, "xz", "basd"},
        {6, "xy", "b2qds"},
        {2, "xqw", "c3w9"},
        {9, "ag", "sadf"},
        {8, "woeir", "efwdf"},
        {4, "a", "yfe"},
        {10, "w", "xczvdsf"}
    };

    Student *students_2;
    students_2 = (Student*)calloc(sizeof(students_1)/sizeof(Student), sizeof(Student));
    copy(students_1, students_1+10, students_2);
    vector<Student> students_3(students_2, students_2+10);

    cout << "Before sorting, students_1:\n";
    print(students_1);

    sort(students_1, students_1+10, fncomp);
    cout << "After customed fncomp sorting, students_1:\n";
    print(students_1);

    cout << "Before sorting, students_2:\n";
    print(students_2);

    sort(students_2, students_2+10, classcomp());
    cout << "After customed classcomp sorting, students_2:\n";
    print(students_2);

    cout << "Before sorting, students_3:\n";
    print(students_3);

    sort(students_3.begin(), students_3.end());
    cout << "After method < overriding sorting, students_3:\n";
    print(students_3);

    return 0;
}
```

```txt
Before sorting, students_1:
(1, f, adsf)
(5, e, aasdfxcvzc)
(3, w, 234asdc)
(7, xz, basd)
(6, xy, b2qds)
(2, xqw, c3w9)
(9, ag, sadf)
(8, woeir, efwdf)
(4, a, yfe)
(10, w, xczvdsf)

After customed fncomp sorting, students_1:
(10, w, xczvdsf)
(9, ag, sadf)
(8, woeir, efwdf)
(7, xz, basd)
(6, xy, b2qds)
(5, e, aasdfxcvzc)
(4, a, yfe)
(3, w, 234asdc)
(2, xqw, c3w9)
(1, f, adsf)

Before sorting, students_2:
(1, f, adsf)
(5, e, aasdfxcvzc)
(3, w, 234asdc)
(7, xz, basd)
(6, xy, b2qds)
(2, xqw, c3w9)
(9, ag, sadf)
(8, woeir, efwdf)
(4, a, yfe)
(10, w, xczvdsf)

After customed classcomp sorting, students_2:
(10, w, xczvdsf)
(9, ag, sadf)
(8, woeir, efwdf)
(7, xz, basd)
(6, xy, b2qds)
(5, e, aasdfxcvzc)
(4, a, yfe)
(3, w, 234asdc)
(2, xqw, c3w9)
(1, f, adsf)

Before sorting, students_3:
(1, f, adsf)
(5, e, aasdfxcvzc)
(3, w, 234asdc)
(7, xz, basd)
(6, xy, b2qds)
(2, xqw, c3w9)
(9, ag, sadf)
(8, woeir, efwdf)
(4, a, yfe)
(10, w, xczvdsf)

After method < overriding sorting, students_3:
(10, w, xczvdsf)
(9, ag, sadf)
(8, woeir, efwdf)
(7, xz, basd)
(6, xy, b2qds)
(5, e, aasdfxcvzc)
(4, a, yfe)
(3, w, 234asdc)
(2, xqw, c3w9)
(1, f, adsf)
```

### `max_element`로 `unordered_map`의 값 기준 가장 큰 요소 가져오기

<p class=short>백준 2108번 통계학 풀이 일부 코드</p>

<p class=short>입력된 숫자 별로 개수를 세어 최다 입력 숫자 반환, 최다 입력 숫자가 1개 이상일 시 2번째로 작은 수 반환</p>

```cpp::lineons
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    int N;
    vector<int> V;
    unordered_map<int, int> M;

    cin >> N;
    V.resize(N);

    for (int i=0; i<N; i++) {
        cin >> V[i];

        if (M.find(V[i]) == M.end()) {
            M[V[i]] = 0;
        }

        M[V[i]]++;
    }

    auto maxFreqItr = max_element(M.begin(), M.end(), [](const auto& lhs, const auto& rhs) {
        return lhs.second < rhs.second;
    });
    int range = *max_element(V.begin(), V.end())-*min_element(V.begin(), V.end());

    vector<int> maxFreqNums;

    for (auto itr=M.begin(); itr!=M.end(); itr++) {
        if (itr->second == maxFreqItr->second) {
            maxFreqNums.push_back(itr->first);
        }
    }

    sort(maxFreqNums.begin(), maxFreqNums.end());
    int maxFreqNum = 1 < maxFreqNums.size()? maxFreqNums[1]: maxFreqNums[0];

    cout << mean << "\n";
    cout << median << "\n";
    cout << maxFreqNum << "\n";
    cout << range << "\n";

    return 0;
}
```

## A. 참조
cplusplus.com, "&lt;algorithm&gt;", *cplusplus.com*, [Online]. Available: [https://m.cplusplus.com/reference/algorithm/](https://m.cplusplus.com/reference/algorithm/) [Accessed May 26, 2022].

juwon9733, "구조체(struct)와 연산자 오버로딩을 통한 sort in C++", *Velog.io*, Sep. 7, 2021. [Online]. Available: [https://velog.io/@juwon9733/구조체struct와-연산자-오버로딩을-통한-sort-in-C](https://velog.io/@juwon9733/구조체struct와-연산자-오버로딩을-통한-sort-in-C) [Accessed May 27, 2022].
