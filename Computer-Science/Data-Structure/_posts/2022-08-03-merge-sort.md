---
title: '[자료구조] 합병 정렬(Merge Sort)'
author_profile: true
uml: true
toc_label: '[자료구조] 합병 정렬(Merge Sort)'
post-order: 3
---

합병 정렬은 기존 리스트를 재귀적으로 부분 리스트로 분할하여 하위 부분 리스트부터 정렬해나가는 정렬 알고리즘입니다. 흔히 리스트를 하위 2개의 부분 리스트로 분할해나가는 방식을 하향식 2-way 합병 정렬이라 하며, 다음과 같은 순서로 동작합니다.

1. 리스트의 길이가 1 이하인 경우 이미 정렬된 것으로 간주한다. 그렇지 않은 경우
2. 분할(Divide): 정렬되지 않은 리스트를 반으로 나누어 비슷한 크기의 두 부분 리스트로 나눈다(`partition()`).
3. 정복(Conquer): 각 부분 리스트를 재귀적으로 합병 정렬한다(`start`, `end`).
4. 결합(Combine): 두 부분 리스트를 하나의 정렬된 리스트로 합병한다(`merge()`). 이 때 정렬 결과가 임시 배열에 저장된다.
    - 2개의 부분 리스트의 값들을 처음부터(`left`, `right`) 하나씩 비교하여 더 작은 값을 새로운 리스트(`sortedArr`, `insertIdx`)에 저장
    - 두 리스트 중 하나가 끝 색인까지 도달할 때까지 반복
    - 끝 색인까지 도달하지 못한 나머지 리스트의 값들을 차례대로(`insertIdx`, `end`) 새로운 리스트에 저장
5. 복사(Copy): 임시 배열에 저장된 결과를 원래 배열에 복사한다.

![](https://drive.google.com/uc?export=view&id=1_IDSCKGXM9MGlqQTQwHVONhaajaPWyvF){: .align-center}
&lt;그림 1. 합병 정렬 시간-공간 복잡도&gt;
{: style="text-align: center;"}

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-03T06:58:58.483Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;C_Iy7oC8QUCLPse1WmOy\&quot; version=\&quot;20.2.2\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;nwRuXktgp3GJoTleMmOe\&quot; name=\&quot;그림 1. 합병 정렬(Merge sort) 개요\&quot;&gt;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&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 2. 합병 정렬(Merge sort) 개요&gt;
{: style="text-align: center;"}

<p class=short>C++ 예제 코드</p>

```cpp::lineons
#include <iostream>
#include <vector>

using namespace std;

vector<int> arr = {6, 5, 3, 1, 8, 7, 2, 4};
vector<int> sortedArr(arr.size());

void merge(int start, int end) {
    int mid = (start+end)/2;
    int left = start;
    int right = mid+1;
    int insertIdx = start;

    while (left <= mid && right <= end) {
        if (arr[left] < arr[right]) {
            sortedArr[insertIdx++] = arr[left++];
        } else {
            sortedArr[insertIdx++] = arr[right++];
        }
    }

    int remainCursor = mid < left? right: left;

    while (insertIdx <= end) {
        sortedArr[insertIdx++] = arr[remainCursor++];
    }

    for (int i=start; i<=end; i++)
        arr[i] = sortedArr[i];
}

void partition(int start, int end) {
    if (start < end) {
        int mid = (start+end)/2;
        partition(start, mid);
        partition(mid+1, end);
        merge(start, end);
    }
}

void mergeSort() {
    partition(0, arr.size()-1);
}

void print(vector<int>& v) {
    for (size_t i=0; i<v.size(); i++) {
        cout << v[i] << " ";
    }
    cout << "\n";
}

int main() {
    print(arr);
    mergeSort();
    print(sortedArr);

    return 0;
}
```
```txt
6 5 3 1 8 7 2 4 
1 2 3 4 5 6 7 8
```

## A. 참조
Wikipedia, "합병 정렬," *wikipedia.org*, Mar. 13, 2022. [Online]. Available: [https://ko.wikipedia.org/wiki/합병_정렬](https://ko.wikipedia.org/wiki/합병_정렬) [Accessed Aug. 3, 2022].

Big-O Cheat Sheet, "Know Thy Complexities!," *bigocheatsheet.com*, [Online]. Available: [https://www.bigocheatsheet.com/](https://www.bigocheatsheet.com/) [Accessed Aug. 3, 2022].
