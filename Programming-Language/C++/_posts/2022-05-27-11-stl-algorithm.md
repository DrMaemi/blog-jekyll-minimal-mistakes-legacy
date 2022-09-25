---
title: '[C++] 11. STL - &lt;algorithm&gt;'
author_profile: true
toc_label: '[C++] 11. STL - &lt;algorithm&gt;'
post-order: 11
last_modified_at: 2022-09-25 23:43:00 +0900
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

### 정렬 sort
```cpp
vector<int> v = {3, 2, 1};

sort(v.begin(), v.end()); // {1, 2, 3}
```

<p class=short>구조체 + 다중정렬조건</p>

```cpp
bool fComp(const Student& lhs, const Student& rhs) {
    if (lhs.id != rhs.id) return lhs.id > rhs.id; // 내림차순
    if (lhs.name != rhs.name) return lhs.name < rhs.name; // 오름차순
    return lhs.address > rhs.address; // 내림차순
}

struct stComp {
    bool operator()(const Student& lhs, const Student& rhs) {
        if (lhs.id != rhs.id) return lhs.id > rhs.id; // 내림차순
        if (lhs.name != rhs.name) return lhs.name < rhs.name; // 오름차순
        return lhs.address > rhs.address; // 내림차순
    }
};

vector<Student> students = {
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

sort(students.begin(), students.end(), fComp);
sort(students.begin(), students.end(), stComp());
```

### 조건 검사 all_of

```cpp
struct stPred {
    bool operator()(const int& arg) const {
        return arg%2;
    }
};

bool fPred(const int& arg) {
    return arg%2;
}

if (all_of(v.begin(), v.end(), stPred())) {
    cout << "All elements are odd.\n";
}

if (all_of(v.begin(), v.end(), fPred)) {
    cout << "All elements are odd.\n";
}
```

<p class=short>2차원 배열</p>

```cpp
all_of(&v[0][0], &v[2][3], fPred);
```

### for_each

```cpp
struct Increase {
    int operator()(int& arg) {
        return ++arg;
    }
};

bool increase(int& arg) {
    return ++arg;
}

for_each(v.begin(), v.end(), increase);
for_each(v.begin(), v.end(), Increase());
```

### copy

```cpp
vector<int> v = {1, 2, 3};
vector<int> w(2);

copy(v.begin(), v.begin()+2, w.begin());
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

### 이분 탐색 `lower_bound`, `upper_bound` 색인 결과 차이

```cpp::lineons
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    vector<int> v = {1, 1, 1, 2, 2, 2, 2, 3, 3};

    vector<int>::iterator lowerIterator = lower_bound(v.begin(), v.end(), 2);
    vector<int>::iterator upperIterator = upper_bound(v.begin(), v.end(), 2);

    printf("Lower Index: %d\n", lowerIterator-v.begin());
    printf("Upper Index: %d\n", upperIterator-v.begin());

    return 0;
}
```
```txt
Lower Index: 3
Upper Index: 7
```

## A. 참조
cplusplus.com, "&lt;algorithm&gt;", *cplusplus.com*, [Online]. Available: [https://m.cplusplus.com/reference/algorithm/](https://m.cplusplus.com/reference/algorithm/) [Accessed May 26, 2022].

juwon9733, "구조체(struct)와 연산자 오버로딩을 통한 sort in C++", *Velog.io*, Sep. 7, 2021. [Online]. Available: [https://velog.io/@juwon9733/구조체struct와-연산자-오버로딩을-통한-sort-in-C](https://velog.io/@juwon9733/구조체struct와-연산자-오버로딩을-통한-sort-in-C) [Accessed May 27, 2022].
