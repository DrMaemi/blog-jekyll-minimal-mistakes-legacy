---
title: '[운영체제] 07. 프로세스 스케줄링'
author_profile: true
uml: true
toc_label: '[운영체제] 07. 프로세스 스케줄링'
post-order: 7
---

*본문은 2019년도 하반기 아주대학교의 컴퓨터공학과 교수로 재직하셨던 김상훈 교수님의 운영체제 과목 강의 자료를 기반으로 작성되었음을 알립니다.*

## 1. 프로세스 실행 특징
프로세스는 I/O 작업 빈도와 실행 시간에 따라 자원 사용량(CPU Burst 등)이 변합니다.

- I/O 작업 빈도가 높을 수록 CPU를 사용하지 않는 Idle 상태가 많음
- 프로세스 실행 직후 첫 5ms 정도까지 CPU 사용 최대화

![](https://drive.google.com/uc?export=view&id=1p22CCZUru6xkqepN3WsTHQL9iM-B4Ieb){: .align-center}
&lt;그림 1. 프로세스 실행 특징 - CPU-bound vs IO-bound&gt;
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1h219IifMzdR4hVc-mFfbeuuIBpASXimD){: .align-center}
&lt;그림 2. 프로세스 실행 특징 - CPU frequency by burst duration&gt;
{: style="text-align: center;"}

## 2. 프로세스 스케줄링이란?
프로세스 스케줄링(Process Scheduling)이란 언제, 어떤 프로세스에 자원을 할당할지 결정하는 것을 의미합니다. 프로세스 스케줄링의 목적은 **CPU와 같은 자원의 사용률을 최대화하는 것**입니다. 프로세스를 실행하는 자원이 보통 CPU이기 때문에 CPU 스케줄링이라고도 합니다.

<p class=short>프로세스 스케줄링은 다음과 같은 기능을 수행합니다.</p>

- 스케줄링의 대상이 될 가용 프로세스 관리
- 다음으로 실행할 프로세스 결정
- 프로세스 간 전환(문맥 교환)

## 2. 문맥 교환(Context-switch)
프로세스 간 전환 시 전 프로세스나 앞으로 실행할 프로세스의 상태를 저장해놓은 데이터를 문맥(Context)라 합니다. 이 데이터는 프로세스 제어 블록(PCB, Process Control Block)에 저장되어 있습니다. 프로세스 전환 시 이 Context를 교환하여 실행중이던 프로세스의 데이터와 상태를 저장하고, 다음으로 실행할 프로세스의 지난 데이터와 상태를 불러와 작업을 이어 진행할 수 있게 됩니다.

그런데 이 문맥 교환을 하는 중에는 CPU를 사용하지 않는 idle 상태가 됩니다. 프로세스 스케줄링의 목적이 CPU의 사용률을 최대화하는 것이므로 적절한 빈도로 문맥 교환을 하여 idle 상태의 시간을 최소화하는 것이 좋습니다.

![](https://drive.google.com/uc?export=view&id=1VBRL0FPgR3VRtsmgmDO6Zk03aS7XCBm2){: .align-center}
&lt;그림 1. 문맥 교환(Context-switch)&gt;
{: style="text-align: center;"}

## 3. 스케줄링 시점과 개요
프로세스 스케줄링 시점은 프로세스 상태 다이어그램에서 상태 전이에 해당하는 모든 구간에 해당합니다. 

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-02T12:25:17.916Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;inJpRCsXFW5pH1QNhoLQ\&quot; version=\&quot;20.2.2\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;bzSGDfPCPLQ6wK0j2PPz\&quot; name=\&quot;Page-1\&quot;&gt;7Ztbc6M2FMc/jR/rQTcEj7ltd2e6babJTPZVBtlWC8gD8i2fvsIIbBCOSeqYJLYnD3AQB9Dvr4N0Dhmgm3j1e8pm058y5NEAOuFqgG4HEAIM4SD/c8J1YaEEF4ZJKkLTaGt4EM/cGB1jnYuQZ7WGSspIiVndGMgk4YGq2ViaymW92VhG9avO2IRbhoeARbb1SYRqWlg9SLf271xMpuWVgesXR2JWNjZPkk1ZKJc7JnQ3QDeplKrYilc3PMo7r+yX4rxve45WN5byRHU5IXt8+gWvfv18Hl3/c7eYPD3yyY/fjJcFi+bmgf/kS3O/al12gnak+1vvXC+nQvGHGQvyI0uNXNumKo70HtCbY5mobywWUU77O48WXImA6QOZSuW/VQ9umoooupGRTDeXQGMv4EFgXBgZALc6c6flyCOYOPqIuXWeKr7a2yeg6mktUS5jrtK1bmJO8AybdX13uSXtG9N0B7JrbMxoa1L53Xa/3jAEXkEDWjT+5ixc98JjzN1uPELqj5wj8YBOHQjomwiyicyTRCSTPpiEjHvjTkzcwOOj8XGYYPTBmGCLyRMTqicm4/EYdhwn7sgl7nGYIIBrTJDTMxNiMXnkaSwSpnjYy1Ah3AtxFyweHCH3SFgI+VjvE9eiYrNIwqt8mqT3gohlmQg6Imh2rHZkdvO9YJ4ueGh8FBfloTXTavSrvjE5TwN+eL6iWDrh6tCb1Oa0A4K0gChtKY+YEov67bbRMVe4l0I/yHZ0wroMIGoALh7TnLU7ZWs6ontCb+mo6AfL0UYs1WO/XT/0y+kHfQb9ABcNAQCQUoB8nzg+rasAoyHWQcPF0EPQh9h7m7p04Bl6nkd1nHIdB/uNdwrw3SGhyEeEApc6lMBO2tNqYOudZrO8QfbCYHEbGke1ZYzeKDweVdje2Qob9xoYG/GsWhu/WrrYH9L8hxFFgHqw4ZYMqee6BFDgU0w98i7KxY3VIwInUK7/5ZQLOyoX9ancat5WSgy/UbnYOTAE3imsQnoCcZZJuy+kTvwZJgxVtrQB+/UTTugMoeN7nq8nBYTgRlyldAgc4rk+dQnRkdd9F+lWY+uUcRXYmdDPLt2uUwLS65Sg8RIFbw6s/kvSBfhN0j2auqClLhbGQrVlRxRfqbquWCQmSS46LQGeakOepNDKiq7MgViEYX76dcoz8cxGG1d5StYMNe2XXA/Ibe5rrmRmpGilQxKZ8EYupTQ1FLxX6uY5/08WBTRXvWV021Gk16LI5ir7aGkUYGeBRU4inc/UBZ+dm/Tr+Ny+8dkJ4yyY8nAeaRrQCUU2YyqYXkha1RhaJwlbBmJF9zQo7TzzD+3oL22SOUu+4Jt3QiDjWaR7QiYXqlZ4baxA2moHoC1N/X5U7Tx1K9UlE5d421Kf8w/zxCflaeeN+eqCrqVe1Cx3Qxtd29z7/ch1SIyWSP5gIx7d6y7ehFl0O5JKybiFmZKNsl42ZbPcWbya5B8NDUdML6WGY72kmtqVPE4A3nxeYFXurqHjbI7kiOolWf07UrDctzzZIQRPSai82IVQOd3E/gcj1CGTcNaEYO+E7PXceRMijYI1IH0T6vDlwlkRwnvS+f0R6vBtwFkRguSjEbLncuF5I2pOt1HL91mnRWRXcx+KzNTma0bnvqqUfJJ1k7lHcBRY/kFY5bcip6GFOky9UzlPwk0xJ+/cQ5832r14jFdFo1SNWgIReKmi84qO07vbf2AoiiXbfwNBd/8B&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 2. Scheduling points&gt;
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1GM6EDcNwkkzy3DAO-FPyLcSnum8EF2F-){: .align-center}
&lt;그림 3. 스케줄링 개요&gt;
{: style="text-align: center;"}

시스템은 CPU와 같은 프로세서를 통해 프로세스를 실행하다가 I/O 요청이나 시분할 알고리즘, 프로세스 생성(fork child process), 인터럽트 등의 이벤트에 의해 프로세스의 상태 전이가 발생하면 스케줄러는 다음으로 실행할 프로세스를 전달(dispatch)하여 문맥 교환이 발생합니다.

## 4. 스케줄링 성능 지표(기준, Criteria)

<p class=short>스케줄링 알고리즘의 성능을 평가하는 요소로 크게 5가지가 있습니다.</p>

- CPU 사용률(CPU utilization)
    - 전체 시스템 시간 중 CPU가 작업을 처리하는 시간의 비율
- 처리율(Throughput)
    - 단위 시간(Time unit) 당 실행 완료하는 프로세스 수
- 소요 시간(Turnaround time)
    - 프로세스 처리 시작부터 완료까지 소요된 시간
- 대기 시간(Waiting time)
    - 프로세스가 대기 큐(Ready queue)에 입력된 직후 실행(자원 할당 받기)까지 대기하는 시간
- 응답 시간(Response time)
    - 프로세스 실행 요청 직후부터 결과 반환까지 소요된 시간

## 5. 기아와 선점형 스케줄링
기아(Starvation)란 특정 프로세스가 실행(진행, Progress)에 필요한 자원을 다른 프로세스가 점유하고 있어 긴 시간 동안 실행되지 않는 현상을 의미합니다. 좋지 않은 스케줄링 정책은 기아 현상을 발생시킵니다.

다른 프로세스가 점유한 자원(ex. CPU)을 특정 프로세스가 가로챌 수 없는 형태의 스케줄링 정책을 비선점형(Non-preemptive) 스케줄링이라 하고, 반대로 가로챌 수 있는 스케줄링 정책을 선점형(Preemptive) 스케줄링이라 합니다. 둘의 차이를 비교하면 다음과 같습니다.

관점 | 비선점형 스케줄링 | 선점형 스케줄링
:--: | :------------: | :----------:
개념 | 한 번 프로세스에게 자원이 할당되면 프로세스가 완료되거나 자발적으로 Waiting 상태로 전이하기 전까지 자원을 점유하고 있음 | 스케줄러가 기준에 따라 프로세스를 중단하고 문맥 교환을 강제할 수 있음
기아 | 실행 시간이 긴 프로세스에 의해 발생 | 대기 큐(Ready Queue)에 우선순위가 높은 프로세스가 자주 입력되면 우선순위가 낮은 프로세스가 기아를 겪을 수 있음
선점으로 인한 오버헤드 | 존재하지 않음 | 존재
대기 시간(Waiting Time) | (비교적)낮음 | 높음
응답 시간(Response Time) | 빠름 | 느림
CPU 사용률 | 낮음 | 높음

&lt;표 1. Non-preemptive scheduling vs Preemptive scheduling&gt;
{: style="text-align: center;"}

<p class=short>선점형 스케줄링 정책을 사용할 시 다음과 같은 것들을 고려해야 합니다.</p>

- 공유 데이터에 대해 업데이트 중인 프로세스가 중간에 선점되면 어떻게 처리해야 하나
- System call을 실행중인 프로세스가 중간에 선점된 경우 어떻게 처리해야 하나

## 6. 스케줄링 알고리즘
스케줄링 정책을 구현하는 알고리즘은 다양하며 시스템이 동작하는 도메인이나 워크로드에 따라 다른 목적으로 설계되는데 간단히 분류하여 살펴보면 다음과 같습니다.

- 공통(Commonly)
    - No starvation
    - Fairness - 공평한 수준의 자원 공유
    - Balance - 시스템의 모든 요소가 busy하게 동작할 것
- 배치 시스템(Batch systems)
    - CPU 사용량(CPU utilization) 최대화
- 반응형 시스템(Interactive systems)
    - 응답 시간(Response time) 최소화

스케줄링 알고리즘은 FCFS, SJF, SRTF, Priority, RR, Multilevel Queue 등이 있는데 본문에서 차례로 설명할 예정입니다.

### 6.1. FCFS
FCFS는 First-Come, First-Served의 약자로 그 뜻대로 먼저 대기 큐에 입력된 프로세스 순으로 처리한다는 알고리즘입니다.

FCFS 스케줄링 방식은 **Convoy effect** 문제를 갖고 있습니다.

Convoy effect란 처리 시간이 긴 프로세스가 대기 큐에 먼저 입력되고 그 뒤에 처리 시간이 짧은 프로세스가 입력됐을 때 앞선 프로세스의 긴 처리 시간 때문에 프로세스 전체 평균 소요 시간(Average turnaround time)이 증가하는 문제를 말합니다.
{: .notice--info}

![](https://drive.google.com/uc?export=view&id=1mA0SmVzRrTVKRYK1YH1xNg5rCIAnMW-a){: .align-center}
&lt;그림 4. FCFS 스케줄링 성능 계산&gt;
{: style="text-align: center;"}

### 6.2. SJF
SJF는 Shortest Job First의 약자로, 그 뜻대로 예상 CPU burst(프로세스가 CPU를 사용하는 시간, 즉 처리 시간)가 가장 작은 Job을 먼저 실행하는 스케줄링 알고리즘입니다. 먼저 실행중인 프로세스가 처리 완료됐을 때 대기 큐에 존재하는 프로세스들 중 CPU burst가 가장 작은 프로세스를 스케줄링하는 방식으로 비선점형입니다.

- 특징
    - 최소 평균 대기 시간(Miminum average waiting time)을 보장(Guarantee)하는 알고리즘임
    - 비선점형
    - 우선순위(Priority)를 고려한 스케줄링
- 문제
    - 기아 가능성 있음
        - **Aging**, **Priority boosting** 기법을 이용해 해결 가능
    - 프로세스의 예상 처리 시간, CPU burst를 측정하는 것은 불가능
        - 미래의 CPU burst를 합리적으로 추측할 수 있는 방법 필요

![](https://drive.google.com/uc?export=view&id=1Mnv7DmPkm8WU8J9KfdtEgbznI7DHNS-C){: .align-center}
&lt;그림 5. SJF 스케줄링 성능 계산&gt;
{: style="text-align: center;"}

### 6.3. SRTF
SRTF는 Shortest Remaining Time First의 약자로, 그 뜻대로 남은 처리 시간이 짧은 프로세스 순으로 처리하는 알고리즘입니다. 앞서 설명한 SJF 스케줄링을 선점형 방식으로 수행하는 기법입니다.

대기 큐에 새 프로세스가 입력될 때마다 대기 큐에 존재하는 모든 프로세스와 실행중인 프로세스 중 남은 처리 시간이 가장 짧은 프로세스를 선택하여 실행합니다.

![](https://drive.google.com/uc?export=view&id=1ZNE4MmUTntmi_7gN4JNgd9s-qajQaygQ){: .align-center}
&lt;그림 6. SRTF 스케줄링 성능 계산&gt;
{: style="text-align: center;"}

### RR
실행 큐(Run Queue)가 순환형(Circular) FIFO(First-In, First-Out) 큐로 설계되어 각 Job마다 Time slice(또는 Scheduling quantum이라 함)를 할당받고 그 시간 동안 실행된 뒤 다음 프로세스로 전환되는 알고리즘입니다.

- 여러 개의 Timer-interrupt 또는 Timer tick을 이용해 Time slice 결정
- Time slice의 크기가 커지면 시스템 반응성 저하(Less responsive)
- Time slice의 크기가 작아지면 문맥 교환 오버헤드 증가(Higher context-switch overhead)
- Time slice의 크기는 보통 10~100ms로 정해짐
    - 프로세스 실행 특징 &lt;그림 1&gt;, &lt;그림 2&gt; 근거

![](https://drive.google.com/uc?export=view&id=1-Chjm3R4M8SwpTHQXYWU5Sr5Rig7fOmF){: .align-center}
&lt;그림 9. Round Robin 스케줄링&gt;
{: style="text-align: center;"}

- 특징
    - 선점형
    - 기아 X
    - 시분할(Time-sharing)을 통한 응답 시간 향상(Improve reponse time)
    - 대기 시간(Waiting time)은 증가함

### 다단계 큐
(Multilevel Queue) 작성 예정


### 다단계 피드백 큐
(Multilevel Feedback Queue) 작성 예정
