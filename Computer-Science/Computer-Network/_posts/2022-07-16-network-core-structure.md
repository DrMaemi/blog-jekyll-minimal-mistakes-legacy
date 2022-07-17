---
title: '[컴퓨터네트워크] 02. 네트워크와 인터넷 구조'
author_profile: true
uml: true
mathjax: true
toc_label: '[컴퓨터네트워크] 02. 네트워크와 인터넷 구조'
post-order: 2
---

*본문은 2019년도 하반기 아주대학교의 컴퓨터공학과 교수로 재직하셨던 강경란 교수님의 컴퓨터네트워크 과목 강의 자료를 기반으로 작성되었음을 알립니다.*

## 1. Network core란?
여러 네트워크를 연결하는 상호 연결된 라우터들의 거대한 집합(Mesh of interconnected routers)을 말한다.여러 네트워크 내 단말 시스템(Host, End system)에서 동작하는 어플리케이션 간 통신을 위해 메세지를 패킷으로 분할하여 전송하면 Network core는 해당 패킷의 목적지까지의 경로를 결정(Routing)하고 이에 따라 라우터가 다음 라우터로 패킷을 적절히 전달(Forwarding)한다. 이를 Packet-switching이라 한다.

![](https://drive.google.com/uc?export=view&id=1HkgT9sZX7_wF3y05_op83fZp36TdR8pk){: .align-center}
&lt;그림 1. 네트워크 간 연결을 돕는 Network core&gt;
{: style="text-align: center;"}

## 2. 인터넷 구조(Internet structure)
- 여러 네트워크를 연결하는 거대한 Network core
- 단말 시스템은 ISP(Internet Service Providers)들이 제공하는 인터넷 망 인프라를 이용해 인터넷에 접속
- ISP들은 상호 연결되어 있어 서로 다른 ISP의 망을 이용하더라도 통신할 수 있게 됨
- 인터넷 망은 매우 복잡하기 때문에 경제적·국가적 정책에 의해 발전해왔음

오늘날 인터넷의 구조는 &lt;그림 2&gt;와 같이 여러 개의 ISP 네트워크와 지역 네트워크(Regional net), 단말 네트워크인 Access net으로 구성되어 있다.

![](https://drive.google.com/uc?export=view&id=1uBETnFnTMrriEyhWPcslOI81Rt8cqcCt){: .align-center}
&lt;그림 2. 인터넷 네트워크 구조&gt;
{: style="text-align: center;"}

그러나 처음부터 인터넷이 이와 같은 구조를 가졌던 것은 아니다. 인터넷은 다음 과정을 거쳐 발전해왔다.

1. Access net끼리 서로 직접 연결
    - Access net이 $N$개라면 $\frac{N(N-1)}{2}$개의 간선이 필요, 복잡성 증가
2. Global ISP의 등장
    - Access net이 연결될 수 있는 1개의 ISP 등장
    - Customer와 Provider간 계약
3. 여러 ISP의 등장
    - 여러 Global ISP가 생겨나며 서로 경쟁
    - Access net은 자신에게 유리한 ISP에 연결
    - 서로 다른 ISP를 이용하는 단말 시스템은 통신이 불가한 문제 발생
4. IXP(Internet Exchange Point) 생성
    - 서로 다른 ISP의 단말 시스템이 서로 통신할 수 있도록 함
5. Regional net 등장
    - 인터넷이 복잡해지고 단말 시스템을 지역적으로 연결하는 지역 네트워크 등장
6. Content Provider Network 등장
    - Google, Microsoft, Akamai와 같이 IT 기업이 자체적으로 네트워크 인프라를 구축해서 고객들에게 컨텐츠를 제공하는 형태

인터넷 망이 복잡해짐에 따라 다양한 ISP가 등장해 계층 구조가 생겼다.

![](https://drive.google.com/uc?export=view&id=1kYOAoGbp9dsz7bnIxMmY5v7ety2_ZnWR){: .align-center}
&lt;그림 3. ISP 계층 구조&gt;
{: style="text-align: center;"}

## 3. Network core의 기능
어떤 단말 시스템이 자신의 데이터를 목적 단말 시스템에 전송하고자 할 때 Network core는 Forwarding, Routing 크게 두 가지 기능을 제공한다.

### 3.1. Routing
출발지(Source) 단말 시스템(End system)으로부터 목적지(Destination) 단말 시스템까지 데이터가 전달될 경로를 결정하는 것을 Routing이라 한다. Routing 기능과 이에 대한 Routing 알고리즘은 Network 계층에서 자세히 다룬다.

### 3.2. Forwarding
전달하고자 하는 데이터를 특정 라우터에서 다음 라우터에게 전달하는 것을 Forwarding이라 한다. Routing 기능을 통해 적절한 경로가 정해지면 라우터는 Routing 결과에 대한 Forwarding 테이블이 생성되며 이후 해당 라우터에 전달되는 데이터의 목적지 정보를 살피고 적절한 다음 라우터에 데이터를 전달한다.

![](https://drive.google.com/uc?export=view&id=1vHzFLLTbw1N7R10gE6wQX5o2mEAXaUQ_){: .align-center}
&lt;그림 7. Routing & Forwarding&gt;
{: style="text-align: center;"}

## 4. 데이터 전송 방식
네트워크에서 데이터를 전송하는 방식은 크게 Circuit-switching 방식과 Packet-switching 방식이 있다.

### 4.1. Circuit-switching
임의의 출발지 단말 시스템으로부터 임의의 목적지 단말 시스템을 연결하는 경로가 결정되면 해당 경로가 유일한 경로가 되며 전송하고자 하는 데이터를 물리적인 순서대로 데이터를 주고받는 방식을 Circuit-switching이라 한다.

Circuit-switching은 다음과 같은 특징을 가진다.

- 장점
    - 데이터가 물리적 순서대로 전송되며 **전달 속도가 빠름**
    - 헤더같은 정보나 데이터를 보내기 위한 특별한 절차가 없음
- 단점
    - Dedicated resources - Source와 Destination을 연결하는 회선이 결정되면 **공유하지 못함**
    - 회선 setup 후 전달할 데이터가 없으면 회선을 사용하지 않는 
    **idle 상태가 지속되어 자원이 낭비**됨

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-07-17T02:02:40.468Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;5jPgaZvoW9tLe-lHVVHi\&quot; version=\&quot;20.1.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;GyPB4sfw31hM6UMfn8vR\&quot; name=\&quot;그림 4.Circuit-switching의 단점 \&quot;&gt;7ZpLc9owEIB/DdNTGD8xHANJ2kMfmSGdTk8dxRa2psbyyCKQ/vqubNnYFg9DwDgtHMBeWa/9diXtmp45ma8+MhQHX6iHw56heaueedczDEcfwLcQvGYCy9Ezgc+Il4lKgin5g6VQk9IF8XBSeZBTGnISV4UujSLs8ooMMUaX1cdmNKz2GiMfK4Kpi0JV+oN4PMikQ8NZyz9h4gd5z/pglJXMUf6wnEkSII8uSyLzvmdOGKU8u5qvJjgUusv1ktV72FJaDIzhiDep4N0sP4/Dz1P09PP7t1s0nVoPX25kKy8oXMgJy8Hy11wDKIkzxc7ICkNb4xgzMsccM5BBF0ACP65F44DPQyjR4RKFxI/g2oUhpmWFDjS48VASiAbTmyRGLon8JxqDwAQBmadk8t87MvdhbiF5hm/kcvKCf3mEwcgoewVRHNAI95MXH6rMaMSlJYH5Qduc0d94QkPK0imZWvqBEjl7zDhebVWrXsACI8cU5il61PIKjuQrDdwYyPvl2lxsKQpKlmKO+rY0U2miftH2miJcSJAHQDWvUE8MVR9eHKp1hXpiqKZ1caiDK9Q3QrW0zi2/zhXqiaF2YPkdXqGeGGoHlt/RfqiMLiKvUP4yIBxPgYAoXULAU8W4V58Dd4ifZ+JJEoYluYfwcOaCnAq6XGjIPpHaC53u8CXd2KB3I+d1crXnsV1J718xX1L2Ow3kGFYowPT5Ho8RSiIQt93KgjnxPFF9zHBC/qDntCmh05iSiKdTssc9+060teA0kdgUahG4Sw1YLqrRPgcsqzD+fbjMs9FqECPiyLsVwfZaOSVUVRfarDXsKWF4TWfQH10wF+8YqblZt3vWl1zGcIjEalnpc5M2ZQ+Pwo52LG91INnwZa1ynF5rqDjB5Ceauh9yxHzMlYZSuMW038Db6ATvS3Hcq/6mHM1aQ8V9WxwbpAG64beX5T2qYTqWt2I4w5Z5N8gQ/E9+W1f/sX7b+vprd4KjoWXz3DFS55K892JqzHs06o9KH6PSrA6lzkArPnq7ttAgQdQNWxh2yRaUrfZIW3CcarM22IJVKm/XFhqkILqxn1sX3QcMTYFm68eZQ31Paf0I1yBBoSIv0kX6IfxFrUfEIZiO0ucNzXiHu/7xnn/hXd9ocFr3gWAsH1OzDPINuMx09Ao/OCD7MNxyFC6x3Jwp2o7tTamHvOEzLXlKem4ykenOrCR/4d/QEXZwbd09XjeTabzwtWz8500x/cOcjwW7xT7OzVkNUV0UfRDjSwIk8r6DUOR5nxlc+TxL3qYzSxR7eBcpYXG/ye62LuIHLNb1nc9UF2td22Fyp1+t303gOrjkkUU5aRybqLA0rb8OTDVTq0YrhjPqm+2Gq4YarhLhcVffrfpu8eozR2WrvrvxVejhrgu3678YZpzX/9M07/8C&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 4. Circuit-switching 단점&gt;
{: style="text-align: center;"}

단점을 보완하기 위해 신호의 주파수 분할 방식의 **FDM**(Frequency Division Multiplexing)과 시분할 방식의 **TDM**(Time Division Multiplexing)을 사용한다. 그러나 FDM, TDM 방식도, Source와 Destination 간 회선 Setup 시 각 회선에 정해진 Frequency 혹은 Time period를 할당하며 할당된 Frequency와 Time period는 공유되지 못한다. 또한 모든 회선이 사용되지 않을 경우 자원이 낭비된다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-07-16T14:03:23.362Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;lXA6KOojaDjMjapX_8ho\&quot; version=\&quot;20.1.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;bjXcZckyeb7kp7AXRPlE\&quot; name=\&quot;그림 1. FDM vs TDM\&quot;&gt;7Vtdc5s6EP01TJ86AxLC+DGxm/alM51JZvrYkWGxaTFyhRw7/fUV5sOAyE1yay/UdV4Ci1jgHLG7Z5EtOlvvP0q+WX0WISQWscO9RecWIY5Nff0vtzwVFs+nhWEp47AcdDTcx7+gOrO0buMQstZAJUSi4k3bGIg0hUC1bFxKsWsPi0TSvuqGL8Ew3Ac8Ma1f41CtCqtPJkf7J4iXq+rKjjctjqx5Nbh8kmzFQ7FrmOgHi86kEKrYWu9nkOTgVbgU5909c7S+MQmpes0Jt96DFGR7841ztqDfv6ezTfq+9PLIk235wOXNqqcKAUjDmxxIvSc2kFr0dqXWid5z9KYU2zSE/Aq23tND7+IkKfcKTxAaAB/v2Klx0BMIxBqUfNJDdkekWYneqgFyZZOQcBU/tt3zkvBl7a6+whcR6wsTu5ycxC79lFPTrfYrF5nYygDKs5rIvuCITDuOFJdLUIYjvdF47KPpQNwbSCRXEv+cRI+84OjMJFKDxId4DQaRCvaqzR5P4qUmdB5oQkBqwyNIFesIdlMeWMdhmJ9+KyGLf/HFwVXO7SZ/lsPTsVuLzXNfWyWyIgbnrjMlxQ+YiURov/NUpLmXSE+OrkmkqgzdjldPmvw+YP/WaVOeQKfP0NGYVl7PtKL28zOoRdlb+XENfu4k/NxCGjz9syQ5nZePEpOkegwKS+zlUNiOdrtVrOB+w4P86E7XMG3euqA1cbUIjfwAgsAgQR9Z+Mxl9onehUknvzjMgJn0oEzOhbKHjHIUkX6UQ2/hsRNNZrebxYdGeYKLcsjBj3pR9gIfFtGJUPZGhrKPjDIDP3T7UPbJgnqnmst0ZChXcq4Bs06o9jYDmb2ziJfk+XIh9dYy3wq54rnSkzzNIpBSg//6HJtApC4lw+qo1Caypwxy3P8or0/P5CskI06KtQ9/J8LZ6VQyjomz21fJnO+NeYWqw0myZ8WZDo6zKbwGSrNnxXkyOM6mgBoo0Z4VZzY4ztMenD2+ztE7ZNm7+efacEi2b0itly1f64ZCgzwfU70Ss0oyyPlnOnls0oH5/7Zja8mB1Y69NtVPwGK3H2s4OjeLZv11bcj28TFUQ5aYhdu1I9tNae7UZAm3I0uQ675h9KLrmzj3NVj8s8GM3fnGkYt0bDAjt76R1OJkbDBj975xxCIbG8x9ze+mVny4asXnEmtP4wpXK/bp/L8/r3Y/+w/9ilT8XVZepWMrXyjyVwWcvErHFvCpKWovIK/SsVWJFPmbAk5s7i5DGR5mbGmJE5tHlwKRpSVObO4ukRgeZmxpiRKb3dFVGsjSEic2u6OrNJDXVeHEZnd0KRBZBeLEZja2oFGtsLqw2Dy2SsO9yLVlbGyVhousAnFiMxtbCnQvcmUZG13QuMiFZQyv0tC7x1+hFssnjr/lpR9+Aw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 5. FDM vs TDM&gt;
{: style="text-align: center;"}

### 4.2. Packet-switching
출발지 단말 시스템과 목적지 단말 시스템을 연결할 때 경로가 할당되지 않는다. 출발지 시스템이 전송하고자 하는 데이터를 일정 크기 단위로 나눈 패킷(Packet)들을 목적지로 전송하면 Network core의 라우터들이 상황에 따라 적절한 경로로 패킷을 전달한다. 목적지의 시스템은 전달받은 패킷들을 자신의 임시 저장 공간인 버퍼(Buffer)에 저장한다. 목적지의 시스템은 여러 곳에서 패킷을 전달받을 수 있다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-07-17T04:09:05.933Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;WfucYXmpl5VtvyEZIJFe\&quot; version=\&quot;20.1.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;gshBYwGTHNgUSQvBqr70\&quot; name=\&quot;그림 6. Packet-switching\&quot;&gt;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&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 6. Packet-switching&gt;
{: style="text-align: center;"}

결과적으로 Packet-switching 기법이 Circuit-switching 기법보다 더 많은 사용자가 네트워크를 사용할 수 있도록 해준다. 

![](https://drive.google.com/uc?export=view&id=185aLqDOvNm2jiiZD20roZ3Qk9ihQB3VE){: .align-center}
&lt;그림 7. Packet-switching는 더 많은 사용자가 네트워크를 이용할 수 있다&gt;
{: style="text-align: center;"}

위 &lt;그림 7&gt;을 보면 주어진 상황에서 Circuit-switching 기법으로는 네트워크를 이용할 수 있는 사용자 수가 최대 10명으로 고정된 반면 Packet-switching의 경우 35명을 네트워크에 할당하더라도 11명 이상의 사용자가 네트워크에 접속할 확률은 0.04% 이하로 거의 일어나지 않는다 판단한다. 이와 같이 Packet-switching은 확률 통계적 계산을 통해 Circuit-switching보다 훨씬 더 많은 사용자를 네트워크에 할당할 수 있다.

#### 4.2.1. Store & Forward

#### 4.2.2. Queueing & Loss
