---
title: '[운영체제] 01. 운영체제란?'
author_profile: true
uml: true
toc_label: '[운영체제] 01. 운영체제란?'
post-order: 1
---

*본문은 2019년도 하반기 아주대학교의 컴퓨터공학과 교수로 재직하셨던 김상훈 교수님의 운영체제 과목 강의 자료를 기반으로 작성되었음을 알립니다.*

## 1. 운영체제란 무엇인가?
운영체제란 사용자 어플리케이션(User Application)과 컴퓨터 하드웨어 사이의 중개자(Intermediary)로서 동작하는 프로그램을 말한다.

다중 사용자, 다중 프로그램 상에서 발생하는 컴퓨팅 문제를 해결하기 위한 목적으로 탄생되었다. 컴퓨터 자원(CPU, memory, I/O devices 등)을 제어해서 다중 사용자와 다중 프로그램이 동등하게 자원을 사용할 수 있도록 도와준다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-07-13T11:16:38.450Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;RhBYeZ-BZETGhjH13l69\&quot; version=\&quot;20.1.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;d2SEbJC2drt5J7BlVScy\&quot; name=\&quot;그림 1. 컴퓨팅 계층 구조\&quot;&gt;7ZjRcqIwFIafxsvtCBGES3Xtdi+cuuvu7GUnkgNkGggTYtU+/UZIBETH1rWu7dQLh/w5OSHff4BAB42S1TeBs3jCCbCO3SWrDvrasW3HR+p/I6xLAfndUogEJaVkVcKMPoMWTdiCEsgbgZJzJmnWFAOephDIhoaF4MtmWMhZc9YMR9ASZgFmbfUPJTIuVc/uV/od0Cg2M1uuX/Yk2ATrleQxJnxZk9C4g0aCc1keJasRsA07w6Ucd3ugd3tiAlL5kgGT5+HY+zGn338OnNnQE/cPk19fdJYnzBZ6wSOeZAsJQql3WJClyq/PX64NFMEXKYFN3m4HDZcxlTDLcLDpXaoqUFosE6ZaljoMKWMjzrgoxiKCwQsDpedS8Eeo9biBB/NQ9ehzAiFhdXCx1hahKj3gCUixViFmgKFuyq6r28vKxK0zcc1AV2tY1020TV2hVQea7itI2y3S9xkILGkaKXm2ziUkHwC03fvfoFEL9CDLGA0Uap6qjqngkcBJ/gFgW14bttW/JOxeC/bvvLh3WGfFG4ahHezFS9y567hvhNdu43X20O29FV3nEF37PdL1royue4hu+g7p2v6V0e236LaoQkoGmy2aaqU8VeKQ4DwuMFtNpBt9iqXalqSFYnfRFqjZlik4w6ZP5YRAWju8o1CPQDOaAKaeKk/N9PtI6hmmnKqJK8+cHc+Qf+M0k+R8IQLQ4+qbu91UuxfXrq8SiwhkK1Fh7Xbhp7vtvcrtOePBY2EgFnJXrNnetLOIvqXM9KqEzZZ+e0Amtta+9lKwer0bp+9XP69p5+4D/KV1cSyvd9ky8T/L5N/uGN3ejW/V7HTPUybH8l64TMzL/2ednFgnyFJ+2uepjT25WruGk+tBNasvIGV49RkJjf8C&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. 컴퓨팅 계층 구조&gt;
{: style="text-align: center;"}

## 2. 운영체제의 목표
- 사용자 프로그램을 실행하고 그것들의 문제를 해결
- 컴퓨터 시스템을 편리하게 사용
- 컴퓨터 하드웨어와 자원을 효율적이고 안전한 방법으로 사용

## 3. 운영체제의 역할
### 3.1. 어플리케이션/사용자 관점
- 컴퓨터 시스템을 쉽고 편리하고 좋은 성능으로 사용하도록 환경 제공
- 컴퓨터 시스템을 추상화하여 제공
    - Processors → Processes, threads
    - Memory → Virtual memory address spaces
    - Storage → Volumns, directories, files
    - I/O devices → Files(ioctls)
    - Networks → Files(sockets, pipes, ...)

### 3.2. 시스템 관점
- 모든 사용자/어플리케이션이 만족할 수 있도록 컴퓨터 자원을 효율적으로 제공
- CPU, Memory, I/O devices, Energe 등의 컴퓨터 자원 관리자(Resource manager)
- 프로그램의 실행을 제어해서 오류를 방지하고 컴퓨터를 부적절하게 사용하는 것을 방지(Control program)

## 4. 컴퓨터 시스템 아키텍처(Computer System Architecture)
현대의 컴퓨터 시스템은 대부분 폰 노이만 아키텍처를 따른다. 폰 노이만 아키텍처는 내장 프로그램 컴퓨터 모델(Stored-program computer model)을 말한다. 이는 Program-controlled computer model과 반대 개념이다.

Stored-program computer model | Program-controlled computer model
:---------------------------: | :---------------------------:
비휘발성 메모리로부터 instruction을 읽어와 실행 | hard-wired된 고정된 회로로부터 operation 실행
프로그램 동작 방식이 정해져있지 않고 업데이트 가능 | 프로그램 동작 방식이 정해져있음
유연함 | 고정됨

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-07-13T12:28:14.178Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;grjslbF8m6a0uuRX2Gik\&quot; version=\&quot;20.1.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;Dx9nf-rEflJk00XQDcE4\&quot; name=\&quot;그림 2. Stored-program 컴퓨터 모델\&quot;&gt;1ZjbjpswEIafJpetAgYCl2l2e5C66qrRqr31wgSsGowc59Sn7xBMAJttsk2ibHODPR6PmW9+jMmIzPLtJ0nL7EEkwEfuONmOyN3IdZ0xCfFSWXa1JQhJbUglS7RTa5iz39DM1NYVS2DZc1RCcMXKvjEWRQGx6tmolGLTd1sI3l+1pClYhnlMuW39wRKV1dbQnbT2z8DSrFnZCaJ6JKeNs85kmdFEbDomcj8iMymEqlv5dga8gtdwqed9fGH0cGMSCnXKBD8WiSrKhVoviPd9nT79nKTvdJQ15Sud8JeiXKmRG3AM+uFZYiutWnewZjHoTNSuwSPFqkigWmGMTpuMKZiXNK5GNygItGUq59hzsKnXAqlg+2ISzgENagpEDkru0KWZMNE0tZxIQ3fTFqdxyTp18bWNajmkh8gtMWxoaK8A6FoAZyJHgoDkxvPdUkF+HrQF43wmuJD7uSTxIUw8tC+VFL+gMxK6zyQIcKQCzFDBU87SAseUKC8Dnzh9+IeHtAPfiQboH0pycfzEwv9tpd6ygP23JmDPFjCmImk18VGKGJZLVqTYeSqYOg/f9YRJDGH6A8L0B6g67rWwBgP7AmIV/CIkL8HMM5iFvs2MDDAj10I2sZBNJVMZBmcxBvwq0ur6NukR99b0QoveA+RCB74pKuPh9IbeGkMP59W2vMhCZUGCIplWp0fsxZziFhjvX7lUKtvcwdVnu/fXR1qCfQza6dVrQmKdPw2weF9iJWM4vofjcimoYxqxC9UpxN/qIIFTxdb92x0qjl7hUTBMpH3zRYYOIqO+dZp6VvcgawSa+P1Ak7ERqOZgBdpr5ZD2v8un0e+r9XN7oTRfUMeE4t5SKCQw9lbz9HiqUMyPBc/cUa4tFPvr6n8RinuiUMhNdxRjIyBmfU8VSuBE76Purx/WGxw9W0TYbb/+a/f2PxRy/wc=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 2. Stored-program 컴퓨터 아키텍처&gt;
{: style="text-align: center;"}

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-07-14T04:53:00.161Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;ls0S9KqI_ZCUOG3JLa7j\&quot; version=\&quot;20.1.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;gwF8KwP5aZfEKN76-9Mh\&quot; name=\&quot;그림 3. 현대 컴퓨터 동작 방식\&quot;&gt;7Vptb9s2EP41BroBLURSsuWPjt21HZA2Q1oM2JeBlmibqCS6FOWX/vqREfVGym+x5WZJHCCQTuSRuufuuTtCPTSONx84Xi5uWUiiHnTCTQ9NehAOfSD/K8E2F3jQyQVzTsNcBCrBPf1JtLAYltGQpI2BgrFI0GVTGLAkIYFoyDDnbN0cNmNRc9UlnhNLcB/gyJb+TUOxyKU+HFTyj4TOF8XKoD/Mn8S4GKzfJF3gkK1rIvS+h8acMZFfxZsxiZTtCrvk8/7Y8bTcGCeJOGbC9Nu//e/3n+8GX6fTL/+M/hwJ+Ndb5OdqVjjK9Bvr3YptYQLOsiQkSovTQzfrBRXkfokD9XQtMZeyhYgjeQfkZSo4+07GLGJcShKWyGE3MxpFhkgvS7ggm50vBEozSfciLCaCb+UQPaGvDas9y9e36womb6BlixpE5TysXWNeaq6sJy+0AU8wJrRsOb77JgVvfv/823lWVXai0ilHEZ0nUjZlQrDYsGwPopmn/pScJaImz38WPPJJ/+F3GUDAYNhAZGgjAlALIsDvChFgQ2IBMZdILHe+veYVPC2GO+daBYBjzeJ2ZZbhYauQJBwp+qwithHkmAvN1cqr5ODaXZDx1YNjA9tBQ0z8WdDqiIFPprPySUG2qHRNElpMXUGwB30bmDpDtNi9kHESYUFXzUXbsNAr3DEqt1Pi7jvvvHbgCx0py3hA9LQ6c5uaoKGp9OtCk8RjToSlSSKIt7VhSzUg3b1liIyFhu7ejQFnYEzQ2W/XBGiOd/ePtxeA3v4FClNV4ZEboQqW0hHOoBVgBZBYcIJDKWMz5asbEmSCssSKK8kvohlMWHN6IJ2Z8Bayj2kYquk3nKT0p2YilTQ0nFKvd9PzJkpXJliaR+LFk/FJIXYq16HOMoBrJ2UcLMh5+fhJpV3kHEy77nWz7uCk/BJEOE1pUOQVW3x05mmmDmDmoiPyyA5LXydjINeoFMwC4NiE4cIDinbki4vxo91V0ESCkwU5J/YjxYFTLq/m6qpGl+ajYBtEdrD+f1n0QCgbHtDS0/gt/tdZRwOOqBS7rp9NZ26htzabdEhvnmWUWxIzrfkJ5JSd3eIZeX54kBivDELfAuFTRTGpTSQ4CW3hBAv8jMjlJOiKA7lfTDEFIbwWC+cVC1YJ/dhiwVLUcbEA7WYqfAhLM1hjtiIx0Zt4HgF7WjUAjkx9nZ0bQZt0J2RFZUJTh5y3Zx5yPqmmyjy1Qy2dLLpqJwtfu6pHEWUZDiaSpxKlqQgOrkyUdlf1SSr6YjMlJz8ykr4cogTuoB2Zmof1r0qUp52wv8CgdA7E0tFB6RyI7o6DEtnla/i8mor9oVfmuxJIzwq9Nj/qLE0i+Bp6+0PPv1Q+9H9tPpRF4GtB9AgHcPv+Ox851c+9jD8c0Ht192hpVm5HbyaUq++EoFOc2TmjICBpajcvz5WyXc9o+FsoG7T1ld1xtt3aUGVhni1fThFbxsceWNq+Z3oEKvK2+u4sj7fq4z30/j8=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 3. 현대 컴퓨터 동작 방식&gt;
{: style="text-align: center;"}

## 4. CPU와 멀티프로세서 시스템
CPU(Central Processing Unit)는 프로세서(Processor)라고도 불린다. 대부분의 시스템은 하나의 범용 프로세서(General-purpose processor)를 사용한다. 일반적인 문제들을 풀기 위한 유연성(flexibility)가 있다. 그러나 간혹 특수 목적 프로세서(Special-purpose processor)도 사용한다. 이는 하드웨어 가속기(hardware accelerator)라고도 한다. 대표적으로 GPU(Graphic Processing Unit), TPU(Tensor Processing Unit)이 있다.

### 4.1. Task 할당 관점 - 비대칭·대칭 멀티프로세싱
멀티프로세서 시스템(Multiprocessor System)은 프로세서의 Task 할당 관점에서 비대칭 멀티프로세싱(Asymmetric Multiprocessing), 대칭 멀티프로세싱(Symmetric Multiprocessing, SMP)으로 분류할 수 있다. 비대칭은 각 프로세서가 특정 task를 할당받는 방식이고, 대칭은 각 프로세서가 모든 Task를 할당받을 수 있는 방식이다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-07-13T13:28:52.296Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;s8WxAuLpdU92QtlQTLq6\&quot; version=\&quot;20.1.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;LKs3Q8G6SKCcbzqr73s8\&quot; name=\&quot;그림 4. 멀티 프로세서 SMP\&quot;&gt;7Vldb5swFP01PLbCGBJ4bNNufVilVtU07dEDB1AdTI3Jx379DNh8OW2TjhYihUgJPr6+XJ97uGDHgIvV9jtDaXRPA0wMywy2BrwxLMv2bPFdALsKgJZTASGLgwoCDfAU/8USNCWaxwHOOoacUsLjtAv6NEmwzzsYYoxuumZLSrpXTVGINeDJR0RHf8UBjyrUteYNfofjMFJXBjOv6lkhZSxnkkUooJsWBG8NuGCU8upstV1gUnCneKnGfXultw6M4YQfMsD+cZM9XOTPL7+d/DF5fMnu7uGF9LJGJJcTXjz8NKwZES6vsxQlReB8J9mYveRFtNdLmvCLrMzVlTAAZirSfd30i7NQ/laO8j8KAgoTgbbgNlpeVcFWJwCL0TwJcDEjU3RvopjjpxT5Re9G6E9gEV8R0QJFmDEhC0ooK8fCpVN8BL7GjMcixVckDhPRx2kqJ9Wyro4ieM7oM271zMqjjq7whrevJgXUqRa3CKYrzNlOmMgBrhTHrtvcNFIDSj9RW2YKRFLeYe25UYA4kSI4QhC2JgiGwzjjmGXDJSPAS5QTPgyFwOxyCIBOoruHQ/hZFDoahT7yI3wq9Dkj0zcboiS5l+Xte3hdss51qa2K+qk1mcI0P7nCZNkTK0zuSRUmjb6xC5M3SmGC58LUVgWcTa0wqbv6hCoTdCdWmYC+DplyadL4G7s0AUvj7x6vqPQ8eD2YwlKpfkNpcW6bX0o61EjX6MZJcFXsQohWQhPcpTfjiHG55VHQJ4xbrYpMtelQ2Ps5W5epAzWjONC2L3p8inBoznz8xkTkgkVEE2L+hp29Pz+tBDh7+FcYwwTxeN0Nd19S5BUeaCwm0rwOeL382728VtOUo9r7ID1HsP9e4fUcVTxojkqN1NP+D9noS+zTlI17oGzmY8qmLs0q27MPykZz5HyxbPRthdOUjXrWv6sbYBpjCqf3ognmHxVO31FfgZ8tHH3Zd5xwuq8Mx8poSOVYByrHPT+ohhCOvuCdonDGyrMNvEu3m+n+GvPQTOuugPu1uVaRn3O9v4ZD73LutQ5nmMS/43c4FYhm809jZd78XQtv/wE=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 5. SMP 구조&gt;
{: style="text-align: center;"}

### 4.2. 단일 칩(Single-chip) 멀티프로세서
단일 칩 멀티프로세서는 1개의 프로세서가 여러 개의 코어(Core)를 갖는 구조를 말한다. 여러 개의 프로세서가 Main memory를 공유하는 구조처럼 1개의 프로세서 내부의 여러 개의 코어가 Cache를 공유하면서, 여러 개의 코어 간 거리가 여러 개의 프로세서 간 거리보다 짧기 때문에 자원을 더 효율적으로 공유할 수 있다. 일반적으로 가정에서 사용하는 컴퓨터 시스템으로 단일 칩 멀티프로세서 시스템을 사용한다.

![](https://drive.google.com/uc?export=view&id=1RSlGZgCmhGl5iQHFWWSqAGGBUo3sUNTO){: .align-center}
&lt;그림 6. 멀티코어 구조(Core i7 die)&gt;
{: style="text-align: center;"}

### 4.3. 메모리 접근 관점 - UMA·NUMA
UMA는 균등 메모리 접근(Uniform Memory Access) 아키텍처를, NUMA는 비균등 메모리 접근(Non-Uniform Memory Access) 아키텍처를 말한다. 

## 5. 컴퓨터 시스템 동작(Computer System Operation) 개요
- 1개 이상의 CPU와 Device 컨트롤러들이 공용 시스템 버스 회로로 연결되어 있고 버스는 공용 메모리로의 접근 기능을 수행한다.
- CPU와 Device들의 Concurrent execution은 Memory cycle을 얻기 위해 서로 경쟁한다.
- 각 Device를 담당하는 Controller는 Device type에 따라 적절한 기능을 수행한다.
- 각 Device controller는 Local buffer를 가지고 있다.
- I/O란 Device로부터 Controller의 Local buffer로, 그 반대로 데이터를 송신하는 것이다.
- CPU와 Device controller는 Main memory와 Local buffer간 데이터 통신 기능을 수행한다.
- Device controller는 Interrupt가 발생했을 때 이를 CPU에게 알린다.
    - Interrupt는 I/O 요청, 또는 I/O 기능 수행 완료 시 발생한다.

![](https://drive.google.com/uc?export=view&id=1-LksmhzTuerkFuexIM1-8nKfpX_CDwZ4){: .align-center}
&lt;그림 7. 컴퓨터 시스템 동작&gt;
{: style="text-align: center;"}

## 6. Interrupt 개요
1. Interrupt가 발생하면 시스템은 CPU의 현재 상태를 저장해둔다
    - Interrupt를 처리한 뒤 진행하던 작업을 계속 이어가기 위함
    - CPU 레지스터 상태와 실행중인 instruction address 저장
    - 하드웨어/OS에 의해
2. **Polling**, **Vectored Interrupt System** 등의 인터럽트 처리 방식으로 어떤 Interrupt가 발생했는지 판단한다
    - Polling
        - CPU가 각 디바이스들의 상태를 주기적으로 확인하는 방식
        - 빠른 처리 속도의 I/O 장치, 짧은 I/O service routine, 드물게 Interrupt가 발생하는 상황에서 유리
    - Vectored Interrupt System
        - 각 Device의 Interrupt마다 4~8비트의 고유한 코드 부여
        - Interrupt 발생 시 Device Controller가 해당 인터럽트의 고유 코드를 CPU로 전송
3. Interrupt 종류에 따라 적절한 **Interrupt Service Routine**(또는 **Interrupt Handler**)를 통해 처리한 뒤 진행중이던 작업의 레지스터 복원한다
    - **Interrupt Vector**는 모든 **Service Routine**의 주소를 가지고 있다

![](https://drive.google.com/uc?export=view&id=1eQ8VWaZA9fOZ1fOWboWVVyZI7P_zO2-J){: .align-center}
&lt;그림 8. 인터럽트 동작 CPU - IO device&gt;
{: style="text-align: center;"}

## 7. I/O 개요
- **Device Driver**는 OS와 Device Controller가 서로 통신하는데 도움을 준다
    - Device driver는 Device controller를 추상화한다
    - I/O를 시작하기 전에 Device driver는 Device controller 내부 레지스터 값들을 세팅한다
    - Controller는 세팅된 레지스터를 기반으로 I/O를 수행한다
- Device Controller는 I/O 과정에서 Device의 Local buffer와 Device 내부 메모리 간 데이터 송수신을 수행할 수 있다
- I/O 과정이 완료되면 Device controller가 Device driver에게 이를 알린다

### 7.1. 데이터 전송 모드(Data Transfer Modes)
데이터 전송 모드는 Main memory와 Device의 Local buffer 간 데이터 전송 시 방식에 따라 Programmed I/O(PIO)와 Direct Memory Access(DMA)로 나뉜다.

#### 7.1.1. Programmed I/O (PIO)
- I/O 장치와 Main memory 간 데이터 전송에 CPU가 관여한다.

#### 7.1.2. Direct Memory Access (DMA)
- I/O 장치의 빠른 데이터 전송 속도를 이용
- CPU 관여 없이 Device controller가 데이터 block들을 Local buffer에서 Main memory(or vice versa)로 전송
- 각 데이터 block이 전송될 때마다 Interrupt 발생

## 8. 저장 장치 개요
### 8.1. Main memory
- Random access
- Byte addressable
- 대부분 휘발성(전원 공급이 중단되면 저장됐던 데이터가 전부 삭제됨)
- CPU가 직접 접근할 수 있는 가장 큰 저장 장치

### 8.2. Secondary storage
- Block addressable
- 비휘발성


## A. 참조
Wikipedia, "Vectored interrupt", *wikipedia.org*, Apr. 21, 2021. [Online]. Available: [https://en.wikipedia.org/wiki/Vectored_interrupt](https://en.wikipedia.org/wiki/Vectored_interrupt) [Accessed Jul. 14, 2022].
