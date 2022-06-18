---
title: '[C++] map 자료구조에 람다 함수 사용하기(std::function<>(), std::any)'
author_profile: true
toc_label: '[C++] map 자료구조에 람다 함수 사용하기(std::function<>(), std::any)'
post-order: 100
---

함수형 프로그래밍 기법에는 함수가 1급 객체(First-class object)가 된다. 이는 변수나 데이터 구조 안에 함수를 담을 수 있으며 이외에도 다양한 코딩 스타일을 가능케하는데, 파이썬의 딕셔너리에 람다 함수를 바인딩하는 것처럼 C++에서는 어떻게 사용할 수 있을지 궁금했다. C++ 공식 문서와 여러 포스트의 코드를 참조하고 몇 가지 삽질을 한 결과 `<functional>`, `<any>` 헤더를 이용해서 가능한 방법을 찾았다.

<p class=short>&lt;function&gt; 헤더의 function wrapper 클래스</p>

```cpp
template <class Ret, class... Args> class function<Ret(Args...)>;
```

<p class=short>&lt;any&gt; 헤더의 any 클래스</p>

```cpp
class any;
```

any 클래스는 파이썬의 변수처럼 여러 가지 자료형의 데이터를 저장할 수 있는 클래스이다. 이런 기능은 모던 C++의 `auto` 키워드와 비슷한 기능으로 보이는데, `auto`는 바인딩하는 값으로부터 컴파일러가 자료형을 추론하고 이에 따라 변수의 자료형이 정의되는 반면 any 클래스는 코더가 해당 변수에 접근하기 전까지 자료형을 정의하지 않는, 즉 자료형을 추상화하는 기능으로 보인다. 코더가 any 타입 변수에 접근할 때는 `<any>`헤더에 정의되어 있는 `any_cast<type>` 함수를 이용해 접근해야 하며, 사용자가 `type`을 직접 정해줘야 한다(이 `type`에 any를 사용할 경우 오류를 발생시킨다). 이 때문에 type-safe한 접근이 가능해진다. 아, 그리고 any 클래스는 C++17부터 사용 가능하다.

<p class=short><b>any 예제 코드</b></p>

```cpp::lineons
#include <any>
#include <iostream>
 
int main()
{
    std::cout << std::boolalpha;
 
    // any type
    std::any a = 1;
    std::cout << a.type().name() << ": " << std::any_cast<int>(a) << '\n';
    a = 3.14;
    std::cout << a.type().name() << ": " << std::any_cast<double>(a) << '\n';
    a = true;
    std::cout << a.type().name() << ": " << std::any_cast<bool>(a) << '\n';
 
    // bad cast
    try
    {
        a = 1;
        std::cout << std::any_cast<float>(a) << '\n';
    }
    catch (const std::bad_any_cast& e)
    {
        std::cout << e.what() << '\n';
    }
 
    // has value
    a = 2;
    if (a.has_value())
    {
        std::cout << a.type().name() << ": " << std::any_cast<int>(a) << '\n';
    }
 
    // reset
    a.reset();
    if (!a.has_value())
    {
        std::cout << "no value\n";
    }
 
    // pointer to contained data
    a = 3;
    int* i = std::any_cast<int>(&a);
    std::cout << *i << "\n";
}
```
```txt
int: 1
double: 3.14
bool: true
bad any_cast
int: 2
no value
3
```

<p class=short><b>any, function<>() 예제 코드</b></p>

```cpp::lineons
#include <iostream>
#include <functional>
#include <map>
#include <any>

using namespace std;

int main()
{
    auto func = [](int x)
    {
        cout << "In any" << endl;
        cout << any_cast<int>(x) << endl;
        return 1000;
    };

    map<string, function<any(int)>> my_map;

    my_map.emplace("first", func);
    my_map.emplace("second", [](int x) -> int { return 0; });

    auto ret = my_map["first"](100);
    cout << any_cast<int>(ret) << endl;

    return 0;
}
```
```txt
In any
100
1000
```

위 코드를 보면 map 자료구조의 값으로 `function<any(int)>` 자료형을 사용했다. 이는 *1개의 `int` 타입 매개변수를 받아 `any` 타입의 값을 반환하는 함수 객체*가 map의 값이 된다는 뜻이다. 그런데 map의 키(key)에 따라 호출되는 함수 객체가 받는 매개 변수의 종류와 개수도 다른 경우, map 자료구조의 값으로 `any` 자료형을 사용하여 한 번 더 추상화하는 방식으로 코딩해야 한다. 이와 같은 코딩을 적용해볼 수 있었던 알고리즘 문제가 아래 있다.

<figure data-ke-type="opengraph"><a href="https://www.acmicpc.net/problem/18258" data-source-url="https://www.acmicpc.net/problem/18258">
<div class="og-image" style="background-image: url('https://drive.google.com/uc?export=view&id=1nCax5mgwtYA82T46I_ntU1afsBBNkrLr');"></div>
<div class="og-text">
<p class="og-title">18258번: 큐 2</p>
<p class="og-desc">정수를 저장하는 큐를 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오..</p>
<p class="og-host">www.acmicpc.net</p></div></a></figure>

```cpp::lineons
#include <iostream>
#include <unordered_map>
#include <queue>
#include <functional>
#include <any>

using namespace std;

queue<int> q;

unordered_map<string, any> functionMap = {
    {"push", function<void(int)>([](int x) { q.push(x); })},
    {"pop", function<int()>(
        [](){ if (!q.empty()) { 
            int x = q.front(); q.pop(); return x; 
        } else {
            return -1;
        }}
    )},
    {"size", function<int()>([](){ return q.size(); })},
    {"empty", function<int()>([](){ return q.empty(); })},
    {"front", function<int()>([](){ return q.empty()? -1: q.front(); })},
    {"back", function<int()>([](){ return q.empty()? -1: q.back(); })}
};

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    int N;
    cin >> N;

    for (int i=0; i<N; i++) {
        string command;
        cin >> command;

        if (command == "push") {
            int x;
            cin >> x;
            any_cast<function<void(int)>>(functionMap[command])(x);
        } else {
            int ret = any_cast<function<int()>>(functionMap[command])();
            cout << ret << "\n";
        }
    }

    return 0;
}
```

## A. 참조
miniboxHaHa, "Is it possible to put lambda expressions into a map or list in C++?", *stackoverflow.com*, May 23, 2020. [Online]. Available: [https://stackoverflow.com/questions/61969316/is-it-possible-to-put-lambda-expressions-into-a-map-or-list-in-c](https://stackoverflow.com/questions/61969316/is-it-possible-to-put-lambda-expressions-into-a-map-or-list-in-c) [Accessed Jun. 18, 2022].

cplusplus, "&lt;functional&gt;", *cplusplus.com*, [Online]. Available: [https://cplusplus.com/reference/functional/](https://cplusplus.com/reference/functional/) [Accessed Jun. 18, 2022].

cppreference, "std::any", *cppreference.com*, [Online]. Available: [https://en.cppreference.com/w/cpp/utility/any](https://en.cppreference.com/w/cpp/utility/any) [Accessed Jun.18, 2022].