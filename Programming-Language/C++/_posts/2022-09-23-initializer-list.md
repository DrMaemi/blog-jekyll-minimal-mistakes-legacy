---
title: '[C++] 생성자에서 콜론(:)은 왜 쓰는 건가 - 초기화 리스트'
author_profile: true
toc_label: '[C++] 생성자에서 콜론(:)은 왜 쓰는 건가 - 초기화 리스트'
post-order: 100
---

## 초기화 리스트

<p class=short>구조체 Student가 다음과 같이 있을 때,</p>

```cpp
struct Student {
    long long id;
    string name;
};
```

<p class=short>생성자로 다음과 같이 작성할 수 있습니다.</p>

```cpp
Student(long long id, string name) {
    this->id = id;
    this->name = name;
}
```

<p class=short>그런데 위 코드와 아래 코드는 같은 기능을 수행합니다.</p>

```cpp
Student(long long id, string name): id(id), name(name) { }
```

<p class=short>예제</p>

```cpp::lineons
#include <iostream>

using namespace std;

struct Student {
    long long id;
    string name;

    Student() { id = 0; name = ""; }

    Student(long long id, string name):
    id(id),
    name(name)
    { }
};

void print(Student& s) {
    cout << "("+to_string(s.id)+", "+s.name << ")\n";
}

int main() {
    Student s;
    Student* s2 = new Student(1, "1");
    print(s);
    print(*s2);
    return 0;
}
```

<p class=short>실행 결과</p>

```txt
(0, )
(1, 1)
```

C++에서 위와 같이 콜론을 사용하여 객체를 초기화하는 것을 '초기화 리스트'라고 합니다.

## 초기화 리스트를 쓰는 경우
- 클래스가 레퍼런스(&)를 멤버로 가질 때
- non static const 멤버가 있을 때
- default 생성자가 없을 때
- base class를 초기화할 때
- 생성자 파라미터 이름이 데이터 멤버랑 같을 때 this 문법 대신 사용하기 위해

## A. 참조
윤동길, "생성자에서 콜론(:)은 왜 쓰는 건가 - 초기화 리스트트요?," *hashcode.co.kr*, Jan. 25, 2016. [Online]. Available: [https://hashcode.co.kr/questions/629/생성자에서-콜론은-왜-쓰는-건가요](https://hashcode.co.kr/questions/629/생성자에서-콜론은-왜-쓰는-건가요) [Accessed Sep. 23, 2022].
