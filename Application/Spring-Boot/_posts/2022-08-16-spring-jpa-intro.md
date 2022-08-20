---
title: '[Spring Boot] 스프링 JPA(Java Persistence API) 개요'
uml: true
author_profile: true
toc_label: '[Spring Boot] 스프링 JPA(Java Persistence API) 개요'
post-order: 100
last_modified_at: 2022-08-17 20:44:39 +0900
---

## 0. 들어가며, 관계형 DB와 ORM
DBMS가 발전해온 과정을 살펴보면 관계형 DB가 가장 오래 사용되었고 그만큼 많은 장점을 가지고 있습니다. 여기에 객체지향 프로그래밍에서 도입한 객체라는 개념을 이용해 DB를 관리하는 것으로 객체지향 DBMS, 객체관계 DBMS가 생겨났습니다.

JPA는 ORM 프레임워크라는 표현을 쓰는데, 이 때 ORM은 Object Relational Mapping의 약자로서 어플리케이션의 객체와 DB의 데이터를 자동으로 연결한다는 뜻을 가집니다. 객체지향 프로그래밍은 클래스를 사용하고, 관계형 DB는 테이블을 사용하기 때문에, 객체지향 프로그래밍이 사용하는 객체 모델과 관계형 DB가 사용하는 관계형 데이터 모델 간 불일치가 존재합니다. 이를 ORM 프레임워크가 어플리케이션에서 정의한 객체 간 관계를 바탕으로 SQL 등을 자동으로 생성하여 불일치를 해결합니다. 이를 봤을 때 관계형 DB를 사용하면서 객체관계 패러다임의 프로그래밍 방식을 가져가기 위해 사용하는 것이 ORM 프레임워크라는 생각이 들었습니다.

## 1. JPA란?
- Java에서 제공하는 ORM 기술에 대한 표준 명세
    - 스프링에서 제공하는 것이 아님
- 자바 어플리케이션에서 관계형 DB를 사용하는 방식을 정의한 인터페이스
    - 스프링 PSA를 위한 표준 인터페이스에 따라 정의됨
    - 인터페이스일 뿐 라이브러리가 아님
- 기존 EJB에서 제공되던 엔티티 빈을 대체하는 기술
- 자바 클래스와 DB 테이블을 매핑함

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-17T05:05:05.289Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;YpvdKpAqJxlfK80tRW9J\&quot; version=\&quot;20.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;SAtdEK-nJ39xAfELVRJt\&quot; name=\&quot;그림 1. Applicatoin - JPA - RDB 관계 레이아웃\&quot;&gt;5VhNj9sqFP01ltrFi4zx5zJfbfWkkebNqOp0VWGbJKjEWIQ0cX99wcZ2bDxvkiieLJpN4AAXOPdwucaC8+3xM0f55oGlmFqOnR4tuLAcB/jQk38KKSokjGAFrDlJdacWeCa/sQZtje5JinedjoIxKkjeBROWZTgRHQxxzg7dbitGu7PmaI0N4DlB1ES/kVRs9C6coMW/YLLe1DMDP6patqjurHey26CUHU4guLTgnDMmqtL2OMdUkVfzUo379EprszCOM3HOgAQULz8o//q0fBDo5et/BSkO/2grvxDd6w3rxYqiZoCzfZZiZQRYcHbYEIGfc5So1oP0ucQ2Ykt184pQOmeU8XIsTD0cpq7Ed4Kzn/ikJXRi6PuyRS8Ac4GPr+4MNHxJoWG2xYIXsose4NScF3VdU35oPeZEGtuceCvQGNIiWTemWx5lQVN5Aa2OQes0zylJkCAs+x+G7csZRjhcJUMM+0mI49WNGA66DIMhhoMBhuFYDEOD4eeck2wtsQUSSP79+zi1HJ/KhcxiLktrVfrwhHO2I4Lx4uNt/fA+Su/5wXFNP4DQN/3gjuUH1/BDyfsNmV2tVk4yqPDUj31vLGajeyvcM5j9QmLMMyTwjfnF/iv8BlFs2+PwC+G9+fVN5S5m89tSGyZ4mNo49FxvLGrvHpwDg9onTMu7D1EzJqt4HaOdqWqZMeWqmMoOOxmy8cUOwEDG5WDIAZEfQHSr2FHHCu0Ad0jbbviO+UdoOMAgF2fpVOXHspaxDJccIS5qLKYs+dnlFh+JeFHnYOJ4uvpdHwtVXhxPK4WudI9POcUnQq+/ROWy9fhyqkyyVa0JBKAG1KrAxG7q7crKWnFae8ScSM4x12DFE06Nr4KeGCSXbM8T/HaKIre8xuKtZNEU14l4vIHDW2O8PFm/ussdEpSe4ZERuZFGu67d1W4TPGoT1Tb1qNPPi54h6PjdC9TuGap4MAyV+m62fb3kozEkf5F6z0hUuuo9V2v30oYHutpo4tyl2ugbAn1DI2ujnv6e4ng7FbhOHGcEouDMQOTfU2wwABOvoxIf2hMfXhmNAmcC7aj9dU17/dRnbAGa7yzth6jEreXcCh1rOleFaGpNI0OfMj0RXf0hStaZLCdSEOr+mqkkhiSITnXDlqSpGj7jeEd+o7g0pbSVq32WO/dmlrdQtvZCrqZ8fAOGSPV5OFW0hm6RPMFekLE9I3kC9oDunLGSJ2C+3jyhQ/Wi8GGZCSKKB5ShteTcmaszKpLJx7/bicZNMeBE532daD4QGd64+tOuuSAGCL4Bm6B/XQLze8IfYtP1LqdTVts36CretS/5cPkH&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<그림 1. Applicatoin - JPA - RDB 관계 레이아웃>
{: style="text-align: center;"}

- Spring Data JPA는 JPA를 간편하게 사용하도록 만든 오픈소스 라이브러리
    - 개발자는 JPA를 한 단계 더 추상화시킨 JpaRepository 인터페이스만 사용
    - JpaRepository는 내부적 JPA 인터페이스 EntityManager, EntityTransaction 등을 상속받은 JPA 구현체들을 이용하여 기능을 동작시킴

## 2. ORM이란?
- OOP의 객체와 관계형 DB의 데이터를 자동으로 매핑하는 기술
- OOP의 객체 모델과 관계형 DB의 관계형 모델 간 불일치 해소를 위해 사용
    - 불일치 요소
        - 세분성(Granularity)
            - 코드 재사용과 유지보수성을 위해 DB의 하나의 테이블을 여러 클래스로 분할하여 관리할 때 이를 일치시킴
        - 상속(Inheritance)
            - OOP의 상속 개념을 이용하면서 데이터를 다루도록 해줌
        - 일치(Identity)
            - 관계형 DB의 같음(Sameness)은 기본키를 통해 정의하지만, 자바의 `==` 연산이나 `.equals()` 메서드 등도 활용할 수 있도록 해줌
        - 연관성(Association)
            - OOP는 객체 참조를 사용하여 연관 관계를 설계하고, 관계형 DB는 외래키를 통해 연관 관계를 설계하는데 이를 통일해줌
        - 탐색/순회(Navigation)
            - OOP의 객체 그래프 탐색 방식은 관계형 DB에서 사용할 수 없는데 ORM을 통해 이를 해결함
            - ex. 사용자와 요금 정보가 있을 때 aUser.getBillingDetails().getAccountNumber()와 같이 객체 관계를 이용해 탐색을 진행할 수 있음

### 2.1. 장점
- OOP를 통한 데이터 조작 가능
- SQL 사용 없이 직관적 코드로 데이터 조작 가능
    - SQL을 직접 작성하지 않아 생산성 증가
    - 개발자 작성한 코드에 따라 자동으로 동적 SQL을 생성해줌
- SQL의 절차적 접근 대신 OOP 접근을 통한 생산성 증가, 코드 감소
    - OOP의 장점을 그대로 가져감
    - MVC 패턴에서 데이터 객체 재사용 가능
- DBMS 종속성 제거
- ERD를 작성할 필요 없이 코드만으로 객체 관계 파악 가능
- 개발자는 비즈니스 로직에 더 집중할 수 있음

### 2.2. 단점
- 프로젝트 규모와 복잡성 증가에 따른 구현 난이도 증가
- OOP를 활용하기 어려운 도메인인 경우 성능, 생산성 저하 가능

## 3. DB 접근 기술 변천사, SQL Mapper vs JPA
자바 진영의 DB 접근 기술은 JDBC → SQL Mapper(Spring JdbcTemplate, MyBatis), JPA 순으로 변화해왔습니다.

### 3.1. 전통적 연동 방법
<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-17T05:42:54.351Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;Fr28mb8xeUvfIOzVxpGJ\&quot; version=\&quot;20.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;ac9McRQ4iQVT4BXDVbsk\&quot; name=\&quot;그림 2. 어플리케이션 - DB 전통적 연동\&quot;&gt;7Vhdb5swFP01fmyF+So8YpKtmtZpVaRN25sLLlhzMDNOQ/brZ4MJAVNtrdpuUvvS2sfX1/ic64MJ8NJt+17gurziOWHAdfIWeCvgukEYqr8aOAxA1AOFoHkPwRHY0F/EgI5BdzQnzSRQcs4kradgxquKZHKCYSH4fhp2y9l01RoXxAI2GWY2+pXmsuzRyL0Y8UtCi3JYGYZxP7LFQ7DZSVPinO9PIG8NvFRwLvvWtk0J09wNvPTz3t0zenwwQSr5VxM+RW3pXbZfNt+vSfGh3TP325nbZ7nDbGc2DNYpiEOAfLBegdgHUQrWCCQhSFI9hFIQOV3MqotR3QDEStMOjHwQd/HI1e1+3/IwkCn4rsqJfh4IPLQvqSSbGmd6dK+qR2Gl3DIzfMsraeoBhqrfSMF/HEVQ9CGbAUPKHRGStCeQYeQ94VsixUGFmNHYiHMY5Av6/n7UGvompjzReZiHTXkVx8yjAqphRHiAIJ4lyNVhc/0RuCFTS6MbMWE0/LnT5dNxddZ0ZCUqAIZ12/EzjKtWof+vkKWJKstaN3MscSO5IP+JMp7/Z2nil1TGt4/KnEtS5Yn2HNXLGG4amk2JG+vfWaDxXtJIPvEom7ITSoIFSgZMEIYlvZs62xJPZoXPnKonOSriejNF3GCaouE7kREz69SJZoksaeeJJBYFkVaiTrbjth+vZGApCc+NgSFldb42MOVeSbBgb0nneYkD4sCSX1W2nAqOGS0qXQ1KUiIUoOufqrdLYga2NM/1dCSIOr74pkuli6PWm+/oCBAIVjrXTvLGlMvx0KWccZV3VfFKZ7mljM2hkyrzn+ZozgshXjBNuFCH3nMdzfDtaM5OVBCfP9XhtFM98/GMXrualgTxI7W0ymKe6JmVjC0lXW203X3GMT4a9XaL9P3yzVBNtLfgqM5LOiqElnRe/45M9N0e9Q1Pfw64w+dADI2S6DW/Gt2pkhfwXytpf1FY6kzt8gG3f9+6/cNlqp+A2pkpRo5FrB8tEAvDhzOruuN3eW+G448b3vo3&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 2. 어플리케이션 - DB 전통적 연동&gt;
{: style="text-align: center;"}

- 커넥션 연결 - 서버와 DB는 TCP/IP로 커넥션 수행
- SQL 전달 - DB가 이해할 수 있는 SQL을 연결된 커넥션을 통해 DB에 전달
- 결과 응답 - DB가 전달받은 SQL을 수행한 결과를 서버에 응답

#### 문제점
<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-17T05:43:25.250Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;ALjbD_NvWsIP_28sZqP8\&quot; version=\&quot;20.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;ZnXXIPFM2Rm-oE9299XF\&quot; name=\&quot;그림 3. 전통적 연동 방법의 문제점 - DB 종속성\&quot;&gt;7VjLcpswFP0aLePhbVgCsdNF0qTjzmSmOxlkrClGVMixk6/vlRC2BaR5TJJ2JvXCSEdXr3PulS4gN93sLziu11csJyVyrHyP3HPkOH4QwL8E7jsgbIGC07yF7COwoA9Eg5ZGtzQnjWEoGCsFrU0wY1VFMmFgmHO2M81WrDRnrXFBBsAiw+UQvaW5WLdo6EyP+BdCi3U3sx1EbcsGd8Z6J80a52x3Arkz5KacMdGWNvuUlJK7jpe23/yR1sPCOKnEczqk1J062+8p+3Hr7K6/zvLF1fSso/kOl1u9Y71acd9RAAuvZZFuFFfJWmxKqNpQvCNcUCArLmlRASZYfYJe4iUpb1hDBWWydcmEYBswKGVDgrOfBWfbKk9Zybiay12pH5ioyeKmbjW1AMFdZUX3JO9MoL4WQjpDLLfuzLO8siYU3GFFq5zwSQYzOvMcCwwPiTfwJLBEVT6zg3oPgA1uOt+f2U44qasCBl+xSmhvtD1dP1nnfG7BD/BGcPbz4BqSkxUty86yYpVkjNU4o0JGgC/7DJXTYkriyP4E0kpeELYhgt+DiW49dNFhFfltdXf0UdhLi61P/bMDsY6L4jD00XWgoL3nBZ4UPe1ISmwpndJzt6aCLIAZ2bqDw8N0rb4AzyL6DZj1LIPY0BoQ63WYQWxgvROx0wGxzgTqi2+X8I9mKYotFHpolqAwQXE6YB32LUxqsY7WDFgifCSMNzTPZfeEk4Y+4KUaSmpWM1oJtUE/Qf65HGsrIMBbmQ4q9VQZEaqv7luEhGsqZ7sjMWGNSOe+l3LhQDl3ojSLUeKgpC24KEm1kNE5imwtZOJ/YiEdU8ip/ZeFtAdCKrkClEDcgWgeClOpWxzIAIQmkDTsJJU2UPVRFGqdIVojZQ9eAOXHj0n7ZcdkMDgmnbdRJOpFlj0SWd6IINF7CeKMXDZBKTQfKh3srurg11ZmWIlKLtSlfQIFhX6qvssOuOY4AzU0DCtc9k0Ba2fqjcANKbuJpOlZG1yQpVgq51Cdegs5Tx5NvmQC0wjGyT/iEq73tE9EH+kS7tP5B6nyWL4SyBOzxE1DM5M4Mz/p0/goaSQ3XiGGlJ1Q4o9Q0mGclFjQO/PFY4wnPcONPMP/cP85vjlEw7Y8I7rX6YtCb6CBtP2BBOYFEYOBlGyHbb9eSW+gpD3RJ2cCZ2yb6ngo9kfO1djTGVH0me9PU7+xdwP7I69P/39o9iLKjyZvFZzDod45PIPPruZAguiVWg7coj/Qq5WE6vHDUmt+/Drnzn4D&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 3. 전통적 연동 방법의 문제점 - DB 종속성&gt;
{: style="text-align: center;"}

- 다른 종류의 DB로 변경하면 관련 어플리케이션 코드도 모두 변경되어야 함(유지보수 어려움)
- 각 DB 사용법을 숙지하여 개발해야 함(개발 비용 증가)

### 3.2. JDBC
전통적 연동 방법의 DB 종속성 문제를 해결하기 위해 JDBC라는 표준이 등장했습니다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-17T05:43:49.494Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;gRWOva9W8-7Zj6Hvnd8B\&quot; version=\&quot;20.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;UUz-0cR4I019Z-cCHySh\&quot; name=\&quot;그림 4. JDBC 표준 인터페이스를 이용한 DB 연동\&quot;&gt;3VjbctowEP0aPabjq2w/2gbSaZNpWjKTvhqsgCfGokLc+vWVbEm2sDGQpJ1QHhhptRdpz1lpAdjxYndLkuX8HqcoB5aR7oA9AJblQsi+uWAvBX4lmJEsrURmLRhnv5EQGkK6zlK00hQpxjnNlrpwiosCTakmSwjBW13tGed61GUyQy3BeJrkbelTltJ5JfUtr5Z/RtlsLiObMKhWFolUFidZzZMUbxsiewjsmGBMq9FiF6Oc507mpbIbHVlVGyOooOcYYDgZRqu7x5fHza+Hxc/wEX2d3LiVl02Sr8WBgQVz5i+asMGMD8AwBgEEkQOGAxA4wI/BMAIhBGHMl6IY+EapMyh12NQFAQPZKNVMEJRqoQd8U/pmm6zdV8mhe5lxgtdFivimTba8nWcUjZfJlK9uGcWYbE4XuVh+xgUVpDEhm68owS8KKUv5b6ZJZG6DCEW7hkik7RbhBaJkz1TkqiMgFBw2bTHf1owwXSGbN9kgsU8EC2fKdw0UGwisLsDN68DtII+oSENeAGyGl6jQ81Yn2ejIIjMdZXxD5SqbycXehK7wmkzRabLRhMwQ7dEzhUOUarXZxqeR/670SxlBeUKzjV7RXZCICA84Y0dT8FvwEH5Xd1EdXFg1K/DAke2dcFRlpuWoZIg69utJI/PaV+1fBqygee2yWle16/ASt1SV+3zVd0BUqvlDXu7aBRByk85aF9HIcUlcXeQZLljEGxnVK4OFILL4oGU0pglFC1Qmm9uMv98Jy9DgO2U3kR/xC6tl+QOt1jkdI6qiySB8YAORjfJ0LCGVo8i9glurzbb2raWe2X9za5n2aQLe7yvwBoRVLHkti6SXJpuO6TTIc0ylwZIPj7u69gTu9gfA3TmN+zeSTFlS3wq8ctOHvFLqgV7pXBP2TvDxsO9qMY+3KpMcT1/0pqPdkZzVyDhiHuMckzKOPRoZ7POmHkZeYX+liTHh+3Qstq/TwLUP0D23Y3GdE46OdCwMzWTfUFtyhVXPhl1X561h9O7L8Xr12aDawfu2T/D/YrJzBUx2LZ2AVvBaJvvwk+94PmvmfRi4UOeP6Z3XiV/Kaze4Al5bXV3Z0afOuOyp6+Ou/gSWlqwypGaBC6SUGuaGcYr6F/yyNw96ZLP9XkKn47203cvfSzat/+2pwKv/MrOHfwA=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 4. JDBC 표준 인터페이스를 이용한 DB 연동&gt;
{: style="text-align: center;"}

- 어플리케이션 로직은 JDBC 인터페이스에만 의존함(코드 변경 X)
- JDBC 인터페이스 사용법에 대해서만 숙지하여 개발 진행

#### 문제점
- SQL문을 작성하는데 중복되는 코드 발생
    - try-catch 예외 처리
    - Statement, ResultSet 처리에 필요한 부수적인 코드

### 3.3. SQL Mapper
JDBC 표준 인터페이스의 문제점을 해결하기 위해 스프링 JdbcTemplate, MyBatis와 같은 SQL Mapper가 등장했습니다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-17T05:44:10.835Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;bhESaFoXyfyWvVe2EBTx\&quot; version=\&quot;20.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;0dH50AzDGQC7b7Iki-Gu\&quot; name=\&quot;그림 5. SQL Mapper 연동\&quot;&gt;7Vhdb5swFP01fqzEd+ExkKRbte5DqbTt0QEXrBrMjNMk/fWzweYjISOdmqmV1ocKH19f8DkH30uAHeW7GwbL7I4miADLSHbAngPLcj1P/JfAXgN+A6QMJw1kdsAKPyMFGgrd4ARVg0BOKeG4HIIxLQoU8wEGGaPbYdgDJcO7ljBFR8AqhuQY/Y4TnjWob113+AeE00zf2fSCZiaHOljtpMpgQrc9yF4AO2KU8uYq30WISO40L8265YnZ9sEYKvg5Cx7vP6/pD/LzIwv2+ZeM36J9daWyPEGyURsGlkdEvnAtLlJ5ARYRCDwQOmAxB4ED/AgsQjDzwCySU2EEfKOOmdcxYuiCQIhs1GEmCOqw2TXwTZ1bPGSXviGH7zXjjG6KBMmHNsX0NsMcrUoYy9mtsJjAMp4TNf1AC65MY3piXHFGH1ulrDZ/nya9Z8Q42vUgRdsNojnibC9C1KynFNxra6rxtjOE6Sos65tBSw+VCdM2daeTuFBSvUA2e1q21bdPIuIOliVi47yrBew0ciUy3Cbr+B7lJYEcjUfc7UPIcfUOhLSCaSXbk+ffKOlMK3k7F+/Y+3xzXP+AcHvk1XFGCPcuxbc/wvdJGo2X0eiocUQJZXUue7k0xN8RvfVKTIiOLGiB2qDecsNQy19BC2cohX+sxLUxZv2LSRFMS4GKZCaLuBjFBFYVjofsD6U6VwuRVYf90ecV3bAYTVdPDlmK+PRxjZJBr3GsVE+LsXqiMYbEYYyfhh3KmDzqDl8pFjtrjWC7Qye0ztApmn2rVf2O4iCRYxy83cFBooaYo0S1W9pt/72B9En9jh1kn+kg5005yPJfyUG2N5Ho0g463f9K6evvCq2+92tDm7Krj+Ue1O+56nbXAL4jG2A/lH1yV72btCcKuDjJ+dCekOC0kN4VzhJ9nB3K8x6Lz5OZmshxksjlIUMVfobrOpW0aCk5q1l0Q+DOZa4Np5Vy7VGxURVopCid+068Rn9mTrcL/oit7UuVKNP674835A/3sOBczh9i2H2aN8dN9/uGvfgN&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 5. SQL Mapper 연동&gt;
{: style="text-align: center;"}

- 장점
    - SQL 응답 결과를 객체로 편리하게 반환
    - JDBC의 반복 코드 제거
- 단점
    - 여전히 SQL을 직접 작성해야 함

### 3.4. ORM
앞서 2장에서 설명한 OOP의 객체 모델과 관계형 DB의 관계형 데이터 모델 사이의 불일치를 해결하고자 등장한 기술이 ORM입니다. 대표적으로 JPA가 있으며, JPA 표준 인터페이스를 구현하는 구현체로 Hibernate, EclipseLink 등이 있습니다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-17T05:44:33.486Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;AXdShYn-GTsZ4hqWipzy\&quot; version=\&quot;20.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;gbyCDKXYr32KWK2ji-4W\&quot; name=\&quot;그림 6. ORM 연동\&quot;&gt;7Vhdb5swFP01fqzEd8gjkKTV1EmdUmnbowNusOLgyDhL0l8/G2y+W9KPrK20PlT4+vqCzzn4XALsaHu8ZnCXfqcJIsAykiOwZ8CyXM8T/2XgpAN+GVgznJQhsw4s8SNSQUNF9zhBeSuRU0o43rWDMc0yFPNWDDJGD+20B0rad93BNeoFljEk/ehPnPC0jPrWpI7fILxO9Z1Nb1rObKFOVjvJU5jQQyNkz4EdMUp5ebU9RohI7DQu5brFE7PVgzGU8XMWPN7P9979Vbqxr+HvX6f7PSThlaryB5K92jCwPCLqhStxsZYXYB6BqQdCB8xnYOoAPwLzEAQeCCI5FUbAN4qcWZEjhi6YCpKNIs0E0yItmADf1LXFQ9blS3D4SSPO6D5LkHxoU0wfUszRcgdjOXsQEhOxlG+Jmn6gGVeiMT0xzjmjm4opq6rfhEnvGTGOjo2Qgu0a0S3i7CRS9KyhKFQanrrl8FALwnRVStoUg6YeKhGuq9I1T+JCUfUC2uxx2r7dBV8Ubttpw13BOIb35FJwO2fCLSQfgNAt3oyZfAn84oUILflmDJKhqjAduRJFbvAKsQxyNDw9j4k4/NAtzjZfkEzL+2gy/QEyn4TReBmMjhpHlFBW1LIXC0P89eAtVmJCdGZGM1QlNZYbhlr+DlxM21T4fSY8f4CJy1GhTf45LlCWBNLHxWhFaLwRUIhQU7diuMDyxgVbDWbaNI7wNA50TvcsRuPHBIdsjfj46Y2SVuvRp635iujXhiECOf7T7k6GiFHl7igW26gk4JhtDVRjXaLcpFrV7CY6hdzJSKEShV6hQifVHt8gHetF0okJzHMcv4c+Gup79owclYt5ObkMHaju+yjItjvu7LxSQbbf6ar+sYAGeijp3oZsZGvTLlrbwCicPAR+KL29qzNx/PK2siDB60zKTogCCQGF8pDG4qsiUBNbnCRyechQjh/hqigl1bWT+y0QcEPgzmStPae5ElzPIZRtDDjJm4+7832lkpaWhN13liFjsS/mK26P2+WP2/9knkOm0+kSKvf/MDK9gZO+233PxGfo1/zacbt4f3iDbJ7RIX9yaz23E9Pa+iTe6nU+ltyuJ57rrRNrpNCrzVUM65+syvT6dz97/hc=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 6. ORM 연동&gt;
{: style="text-align: center;"}

## A. 참조
adam2, "JPA는 도대체 뭘까? (orm, 영속성, hibernate, spring-data-jpa)," *Velog.io*, Apr. 9, 2020. [Online]. Available: [https://velog.io/@adam2/JPA는-도데체-뭘까-orm-영속성-hibernate-spring-data-jpa](https://velog.io/@adam2/JPA는-도데체-뭘까-orm-영속성-hibernate-spring-data-jpa) [Accessed Aug. 16, 2022].

HeeJeong Kwon, "[DB] ORM이란," *Github.io*, Feb. 1, 2019. [Online]. Available: [https://gmlwjd9405.github.io/2019/02/01/orm.html](https://gmlwjd9405.github.io/2019/02/01/orm.html) [Accessed Aug. 16, 2022].

만년 꼴지 공대생 세상 이야기, "Spring DB : JDBC와 ORM의 필요성," *Tistory*, Apr. 28, 2022. [Online]. Available: [https://ojt90902.tistory.com/878](https://ojt90902.tistory.com/878) [Accessed Aug. 16, 2022].

seongwon97, "[Spring JPA] JPA란?," *Velog.io*, Sep. 14, 2021. [Online]. Available: [https://velog.io/@seongwon97/Spring-Boot-JPA%EB%9E%80](https://velog.io/@seongwon97/Spring-Boot-JPA%EB%9E%80) [Accessed Aug. 16, 2022].
