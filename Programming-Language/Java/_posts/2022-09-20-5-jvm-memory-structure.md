---
title: '[JAVA] 5. JVM의 메모리 구조'
author_profile: true
uml: true
toc_label: '[JAVA] 5. JVM의 메모리 구조'
post-order: 5
---

응용프로그램이 실행되면, JVM은 시스템으로부터 프로그램을 수행하는데 필요한 메모리를 할당받습니다.

JVM은 이 메모리를 용도에 따라 여러 영역으로 나누어 관리합니다.

JVM 메모리 구조는 크게 메서드 영역, 힙, 호출 스택으로 나뉩니다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;Electron\&quot; modified=\&quot;2022-09-20T07:44:07.195Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) draw.io/20.3.0 Chrome/104.0.5112.114 Electron/20.1.3 Safari/537.36\&quot; etag=\&quot;38Z0Ti9ovQKKOOF2wiJi\&quot; version=\&quot;20.3.0\&quot; type=\&quot;device\&quot;&gt;&lt;diagram id=\&quot;IrJq_87U6u3LvwtAQoc8\&quot; name=\&quot;그림 1. JVM 메모리 구조\&quot;&gt;7Vpdj5s4FP01lrYPlQADMY/56k61rVRppLb76IAJ3hIcGWeSzK+vHUwC2GnSnZBEal4ifLANPudwfX0VAMeLzd8cL7PPLCE58JxkA+AEeF6AIvmrgG0FhAGsgDmnSQW5B+CZvhINOhpd0YSUrY6CsVzQZRuMWVGQWLQwzDlbt7ulLG8/dYnnxACeY5yb6DeaiKxCkTc44E+EzrP6yW6oF7zAdWe9kjLDCVs3IDgFcMwZE9XVYjMmueKu5qUa9+HI3f2LcVKIcwY8DZL/oq//ZB/JOnoutuVs/eX1vZ7lBecrvWD9smJbM8DZqkiImsQBcLTOqCDPSxyru2spucQyschly5WXKc3zMcsZ342FKYpJHEu8FJz9II07MxT4gZowZYX4gBc0Vwb5SniCCyxh/V6EC7I5umB3T6O0H2ELIvhWdqkHDDTz2npupNvrg5DQ0VjWFLGWDGvzzPdzH/iVF5ri36DbuzTddvK6KqSpZ1chCWdhEPZDt++eS7fTF92wZ3enJDzC6yCaOdd1N7w93b5J93QCkAtGPpiOQDQFEQLTMUBDMJR9HQWiCRg5Cowmu26yv6+QS+qUYIJSq05hjMgslXeUFFRG/WFO54W8J9iyV/XkzthST0plqOfa1Bv0JV5giBe/9BKcLsFe0GEvNNnzLeTBvsgbGOR9JiJjicSGnGCDR7l00SYLa+PlJBUWPy5okqjBI05K+opnu4mUBktGC7FbTjACwUTNtBKsrPIo1/B8wQrS+UBq6Kb7sNXrvcmFDLnGeDeqFDj+8VDr1DaOrilWZIj1RGSoeYh0YvMPrilS/fzH3n9aPAhP7162L8zvTbwzjiWkSIbqOH1wd4PztkBHmJPs8O133WfX+LfZmGxara1uVS9CEuOU3mHbcwTmcyJ+tczQLsuJb6bGOMmxoC/t97BpoZ/wRYWRRs4SduJq95BZshWPiR7VPMd3J3I73353oooIY6KdNfbLfoNbzjhVXcAtGyq+6wHqeu8VeX2wimr8vlMqpu/WKRB1nBL8T6cYE13bKaHhlAWmxRvju90v9iDeSQEuELyNzziwJLPeL8xx+ehtZrP53Z7c9hWJmr5bn9w8W+JSZSSNfEWnJn4jg7lkjhIQlPi2HAV5MxiGd1CfgDevT3hmqZrerc27BQp4c5tbNu2HzY1U3KbTVVNxz6yh3m8Zzo86wdy5tcvNIub9boUGe+jW7Jnp2v1GWIM9/9bsmXWq0xWQEQRoVwFBSN79a5zjstzNwakqSL0z2P+jqlyBfzq+uFetRUJ7tjgcaBmjARhO7Np+YlKVh7ZHtbVEv32V8zraWv4LcVaKZFP7Y1EKXMio+BD8mOCWgL0vbb1RcNk8/K+mqmYc/pwEpz8B&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. JVM 메모리 구조&gt;
{: .text-center}

- 메서드 영역(Method area)
    - 프로그램 실행 중 어떤 클래스가 사용되면, JVM은 해당 클래스의 클래스 파일(*.class)을 읽고 분석하여 클래스에 대한 정보(클래스 데이터)를 이곳에 저장
    - 클래스 변수(Class variable)도 이 영역에 함께 생성됨
- 힙(Heap)
    - 런타임 시 동적 할당
    - new 연산자로 생성되는 객체와 배열 저장
    - 인스턴스 변수(Instance variable)가 이 영역에 생성됨
    - 참조 없는 객체는 GC(Garbage Collection)의 대상이 됨
- 호출 스택(Call stack 또는 Execution stack)
    - 스레드마다 개별적인 호출 스택이 할당됨
    - 메서드 호출 시 메서드 작업에 필요한 메모리 공간인 스택 프레임 생성
    - 지역 변수, 매개 변수, 연산 중 발생하는 임시 데이터가 이 영역에 생성됨
    - 호출 스택의 제일 위에 있는 메서드가 현재 실행 중인 메서드
    - 프로그램이 실행할 스택 프레임의 주소는 PC Register에 저장됨
    - 메서드가 종료되면 사용했던 메모리를 반환하고 스택에서 제거됨

추가로, 앞서 설명한 것이 JVM의 메모리 영역의 전부는 아닙니다.

JVM 메모리 영역에는 C/C++ 등 저수준 코드를 실행하는 스택 공간인 Native Method Stack 영역도 있습니다.

## A. 참조
S. Namgung, "3.7. JVM의 메모리 구조," in *Java의 정석*, Jung-gu, Korea: 도우출판, 2022, ch. 6, sec. 3.7, pp. 261-263.
