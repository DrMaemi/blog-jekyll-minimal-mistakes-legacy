---
title: '[컴퓨터네트워크] 03. 어플리케이션 계층 - 개요'
author_profile: true
uml: true
mathjax: true
toc_label: '[컴퓨터네트워크] 03. 어플리케이션 계층 - 개요'
post-order: 3
---

*본문은 2019년도 하반기 아주대학교의 컴퓨터공학과 교수로 재직하셨던 강경란 교수님의 컴퓨터네트워크 과목 강의 자료를 기반으로 작성되었음을 알립니다.*

## 1. SW의 네트워크 기능 구현
<p class=short>SW의 네트워크 기능은 Application 계층에서 구현한다. 이 때 다음 사항들을 고려해야 한다.</p>

- 네트워크 모델
    - Client-server vs P2P(Peer-to-peer)
- 전송 계층(Transport layer) 서비스 모델
    - TCP vs UDP
- 어플리케이션 계층 프로토콜
    - HTTP, FTP, SMTP/IMAP, DNS

## 2. Client-server vs P2P
![](https://drive.google.com/uc?export=view&id=1w2bo-DFZot1CMM6cX_a1E-2Jfx0aVkng){: .align-center}
&lt;그림 1. Client-server vs P2P&gt;
{: style="text-align: center;"}

- Client-server architecture
    - Server
        - 언제나 켜져 있음(Always-on)
        - 고정된 영구(Permanent) IP
        - 트래픽에 따른 스케일링
    - Client
        - 서버와 간헐적(intermittently) 통신
        - 동적(Dynamic) IP
        - 클라이언트간 직접적 통신 없음

- P2P(Peer-to-peer) architecture
    - 서버가 언제나 켜져있지는 않음
    - 임의의 단말 시스템 간 직접적 통신
    - 단말 시스템 Peer는 서비스 요청과 제공 둘 다 수행
    - Self scalability
        - 새로운 Peer는 새로운 Service capacity임
    - Peer는 간헐적으로 통신하며 동적 IP를 가짐

## 3. 프로세스간 통신
프로세스란 호스트 내부에서 동작하는 프로그램을 말한다. 프로세스간 통신은 같은 호스트 내부에서의 OS에 의해 이루어지는 IPC(Inter-process communication)이 있고, 네트워크 상 서로 다른 호스트의 프로세스 간 메시지를 교환하는 통신이 있다.

P2P 아키텍처로 설계된 어플리케이션은 Client 프로세스와 Server 프로세스가 공존한다. Client 프로세스는 통신을 시작(initiate)하며, Server 프로세스는 통신 접촉(Contact)를 기다린다(wait).

### 3.1. Socket
소켓(Socket)은 네트워크 상의 프로세스 간 데이터 통신 시 실질적 종점(Endpoint) 역할을 수행하는 물리적/논리적 요소다. 물리적으로 컴퓨터 시스템을 구성하는 하드웨어의 연결 단자가 소켓의 역할을 수행하며 소프트웨어에서 프로토콜 + IP 주소 + 포트 번호로 소켓들을 구분하여 사용할 수 있다.

![](https://drive.google.com/uc?export=view&id=1XPiYPK2PgVyEVuVM2E-_JDVZ_ofNw7S3){: .align-center}
&lt;그림 2. Socket은 통신 시 종점(Endpoint)을 구분하는 최소 단위다.&gt;
{: style="text-align: center;"}

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-07-20T04:34:50.013Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;0dNbV1kRePptCOoqK21l\&quot; version=\&quot;20.1.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;LZP33Un9-cZIFlqMNWCZ\&quot; name=\&quot;Page-1\&quot;&gt;7Ztbj5s4FMc/DVL70BU3Q/I4yXR3paraSvNQ9dEBN7FKcMY4l+mnXxsbCMZJmCQE0pnRSAMHc3z5/+zjC2N50+XuHwpXi68kRonl2vHO8h4t13V817XErx2/SEsIfGmYUxyrRJXhCf9Gymgr6xrHKKslZIQkDK/qxoikKYpYzQYpJdt6sp8kqee6gnPUMDxFMGlav+OYLaR15IaV/V+E54siZycYyydLWCRWNckWMCbbPZP32fKmlBAmr5a7KUpE4xXtIt/7+8DTsmAUpazNC5778J1+eZ55m+1/9o9dxr74u0/KywYma1XhaYKFQ15eEv1CTJWdvRQNwtCOZzdZsGXCDQ6/hAmep/w64u8hyg0bRBnmTfigHixxHIvXJxRl+Dec5a5sfr8iOGW5QGBigUfha81IJiEQrjNGyS80JQnhfh9TkgovP3GS6CaSMsWOExT3qsxFFXmh0O5g2zmlIhxlRJaI0ReepHhhDOQrimKnEHVbMVHaFns8eMoGFYbz0nWlFL9QYr1COLch3BOivI7vwtWE80P7tHDeLYUDDeEsN0iEMtkKpjXJgue1GBzyRvkkG/eBJ3D8Fa/dpHrOr+bqb+5oVhgkCR8+Fg94gWd6Ym6TGWs+6FWKcnmdwCSiCDJUgQ0eD5ZdQ56SdRqjWEG7XWCGnlYwEk+3PFzVe8M+in7p7bJhI9DoCwz0jQ30+V3RF7zT92bo8/2h0RcepK8EY4bT+Dgyl7IB8jz24iSfUIrKxjGPclmu78CFLINTb0KOTguZ4IyhtGspZS713jlw9Ty7b/XGp9WDUYRWJ8buy9WTufBEFD2vUXYf8oV9y1csjY/plyE5jNoiK9G+0aZrMUWWPAmhMj+ENyJqxpDBe5C1vO9P1uaSriGr2uXoWspiM0WFxkxbWQ5QTn2m7fUeIh3/vZdeXdYB9NLD6/eqlyYkQ533UZHJXfVJ4PQu3uHl77t4x+PjAMQzLTq0VuOD24PY9Od3UQKzDEf1hqq3qrnZUNw4EdAaTei2phE6UlgFGoN0jtiRdKFZhL1GBoY2LmwUJZCJEXy/bKaGVzl8E9u2lcaeo42u+qanrKZ6q5Kv6UiPviPNkWyHhqOcg7LaF6BhWtEMFY1RSzTGfaIR2nVF3fBMNHRH5er3RmgU+/13gUbYEo1Rn2gAUD8LKw84X4tGwxG4MRrNw8/hojFuiYZjWz2yEYy1iKL39rZsNBzpoalrNkyL8aGyUYTx03AEvcKhncX6+lSxNRy6Iz04dQ2Hd0dwgLZsuH2yoXV379zpxqnxp2syTJs+VyUjhtkif+iom2+QMUTT3OLa7pVHll6haCwr9AlC65mGB4476hoL06bRUAeMYh/69Ijh9wmHoy8szo0muqObRxPTptRg4fDbwgEGFE7KzasLw0mgM9Y1GqYPJtqgkfGCsVcQ0yKqDAKqXhc3ejjyz6XK1/bdSse3wqq5k6pO/DBJreo0Xkdt8F+QXmnvuzHvMJ06+QbQuvvat7nBmR/ZvVmF9BUg8BoKmUaCzgQqHP/pI3Xr1WSvOw3l+UMR/8892OBzwb/svR/3uNuOx22vuWG5P25Xh5PynJFjscQplA/f6kABNBIM3/+bTjH1BWKLgYLfVv/MIyWv/iXK+/w/&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 3. 클라이언트와 서버의 소켓 동작 순서&gt;
{: style="text-align: center;"}

### 3.2. IP 주소와 포트 번호
통신에 참여하는 종점(Endpoint)을 구분하기 위한 식별자가 필요하다. 이 때 종점은 프로세스다. 네트워크 상에서는 IP 주소(IP Address, e.g., IPv4는 32-bit)를 사용하여 서로 다른 단말 시스템을 구분한다. 같은 단말 시스템 내부에서 포트 번호(Port number)를 사용하여 서로 다른 프로세스를 구분한다.

네트워크 상 서로 다른 프로세스를 구분하는 식별자는 IP 주소와 포트 번호를 합친 것이다.

## 4. 어플리케이션 계층 프로토콜 개요
<p class=short>어플리케이션 계층의 프로토콜은 다음과 같은 것들을 정의한다.</p>

- 메시지 교환 형식
    - 요청(Request) vs 응답(Response)
- 메시지 문법(Syntax)
- 메시지 의미(Semantics)
    - 필드 정보, 즉 메시지 내 비트의 의미 정의
- 통신 규칙
    - 언제, 어떻게 프로세스 간 메시지를 전송/수신할 것인지 등

프로토콜은 소유권에 따라 Open protocol(E.g., HTTP, SMTP), Proprietary protocol(E.g., Skype)로 분류할 수 있다. Open protocol에 속한 프로토콜은 특정 기업에 소유되지 않고 자유롭게 사용 가능한 프로토콜이다. Proprietary protocol에 속한 프로토콜은 특정 기업이 프로토콜을 연구/개발함으로써 소유권을 지니고 있다.
{: .notice--info}

## 5. 어플리케이션 특성과 프로토콜
<p class=short>어플리케이션이 사용할 프로토콜을 선택할 때 다음과 같은 특성들을 고려해야 한다.</p>

- 데이터 무결성(Data Integrity)
    - 100% 신뢰성 있는 데이터 전송 필요 vs 일부 데이터 손실이 치명적이지 않음(Loss-tolerant)
    - E.g. File transfer, Web transaction vs Voice, Video application
- 전송 지연(Timing, Delay)
    - 데이터 전송 시 지연이 낮을수록 효과적인 어플리케이션
        - E.g., 인터넷 전화, 게임
- 처리율(Throughput)
    - 어플리케이션 동작 시 보장되어야 할 최소 처리율
- 보안(Security)
    - 데이터 무결성 보장

## 6. 전송 계층 프로토콜 TCP vs UDP
- TCP
    - 신뢰성 있는 전송(Reliable transport)
    - 흐름 제어(Flow control) 지원
    - 혼잡 제어(Congestion control) 지원
    - 연결지향(Connection-oriented)
        - 연결 상태를 유지하여 통신
    - 최소 전송 지연(Timing), 최소 처리율(Throughput), 보안에 대해선 지원x

- UDP
    - 비신뢰성(Unreliable) 전송
    - TCP의 특성들 포함 모두 지원x
    - 간결한 메시지 구조
    - 연결 과정 생략
    - 빠른 전송 속도

TCP는 신뢰성이 높고 느리며, UDP는 신뢰성이 낮고 빠르다. UDP가 TCP에 비해 현저히 적은 기능을 지원함에도 불구하고 TCP와 UDP 모두 사용되고 있다.

## A. 참조
달나라 곰돌이, "[기본] 소켓(SOCKET)통신 이란? - 곰돌이 놀이터", *Tistory*, Oct. 23, 2019. [Online]. Available: [https://helloworld-88.tistory.com/215](https://helloworld-88.tistory.com/215) [Accessed Jul. 20, 2022].

Evan Moon, "HTTP/3는 왜 UDP를 선택한 것일까?", *Github.io*, Oct. 8, 2019. [Online]. Available: [https://evan-moon.github.io/2019/10/08/what-is-http3/](https://evan-moon.github.io/2019/10/08/what-is-http3/) [Accessed Jul. 20, 2022].
