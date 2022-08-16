---
title: '[Spring Boot] 스프링 JPA(Java Persistence API)'
uml: true
author_profile: true
toc_label: '[Spring Boot] 스프링 JPA(Java Persistence API)'
post-order: 100
---

## 1. JPA란?
- Java에서 제공하는 ORM 기술에 대한 표준 명세
    - 스프링에서 제공하는 것이 아님
- 자바 어플리케이션에서 관계형 DB를 사용하는 방식을 정의한 인터페이스
    - 스프링 PSA를 위한 표준 인터페이스에 따라 정의됨
    - 인터페이스일 뿐 라이브러리가 아님
- 기존 EJB에서 제공되던 엔티티 빈을 대체하는 기술
- 자바 클래스와 DB 테이블을 매핑함

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
<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-16T09:26:35.558Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;OUekvpAKUhGJnNHwgynY\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;ac9McRQ4iQVT4BXDVbsk\&quot; name=\&quot;그림 1. 어플리케이션 - DB 전통적 연동\&quot;&gt;7VjBbpwwEP0aHxNhDAQfgd02qpqq0Uqt2psDDqB68dZ4s2y/vjYYWDBRmihJKzUn7PF4jN+bedgAlGyb94LsiiueUQZcJ2sAWgHXhQHy1UNbjp0lxKgz5KLMjNNo2JS/qDE6xrovM1pPHCXnTJa7qTHlVUVTObERIfhh6nbL2XTVHcmpZdikhNnWr2UmC7ML92K0X9IyL/qVYYC7kS3pnc1O6oJk/HBiQmuAEsG57FrbJqFMg9fj0s17d8/o8GKCVvKPJnwKmwJdNl82369p/qE5MPfbmdtFuSNsbzYM1gnAAYg9sF4B7IEwAesYRAGIEj0UJyB0Wp9V66O6PsChitG2PYBb/9jV7W7f8tiDKfi+yqh+HwhQfChKSTc7kurRg0ofZSvklpnhW15Jkw8wUP1aCv5jIEHBF5t3p0LS5l5Q4AC1ylHKt1SKo3IxE7Ah59jTZ9L1MHINPeNTnPDczyMmvfIh8siAahgSHkEIsgi5Om6uPwI3YGrp+EZMEA1+7nX6tFid1S1YkXKAwa5p8enHVSvXz1VscaLScqebGZGkllzQf4QZ5D1MDX5NZjy7VOZY0iqLtOaoXspIXZfpFLgx/50FGLtwNLME6UHITiDxFyDpbYIyIsu7afglnMwKn3mpFh4YcdGMEdefhqj5XqTUzDpVolkgi9p5IElETqUVqKVt2PbTmfQtJuG5EbBYSZ2nBUypV+QvyFvUal7kAOxb9Ktkl1PCCSvzSmeDYpAKZdAlUaqvS2QGtmWW6emxoKp8yU0bSifHTm++hcOPgb/SsfaS1yZdhqJLOOMq7qrilY5yWzI2N51kmfc8pTlPBLwgmnAhD9FLlWbwVpqzivLx+XMVpx3qhcsz/N/ZtCjAT+TSSot5oBdmEltMulpo2/OMY3Q07OQ21ufLN0E13mhBUZ3XVFQILepQ942M9Nk+7hpIXwfc/jqAoWEy/p8/je6UyQv4t5m0bxQWO1O5fMTp37NO/3AZ6meAdiaKoWMB64ULwMLg8ciq7ngv78Rw/LuB1r8B&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. 어플리케이션 - DB 전통적 연동&gt;
{: style="text-align: center;"}

- 커넥션 연결 - 서버와 DB는 TCP/IP로 커넥션 수행
- SQL 전달 - DB가 이해할 수 있는 SQL을 연결된 커넥션을 통해 DB에 전달
- 결과 응답 - DB가 전달받은 SQL을 수행한 결과를 서버에 응답

#### 문제점
<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-16T09:30:31.915Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;B3Ib9eUlba6kMviPaPeN\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;ZnXXIPFM2Rm-oE9299XF\&quot; name=\&quot;Page-2\&quot;&gt;7VhNc9sgEP01HOPRt6WjpNjtIWnScWcy0xuWsMxEFirCsZNf3wUh20hK8zFJ2pnUBwseywLv7QISctPN/gvH9fqS5aREjpXvkXuOHMcOXB8eErlvkTByW6DgNNdGR2BBH4gGLY1uaU4aw1AwVgpam2DGqopkwsAw52xnmq1YaY5a44IMgEWGyyF6Q3Ox1qtwpkf8K6HFuhvZDqK2ZYM7Y72SZo1ztjuB3BlyU86YaEubfUpKSV7HS9tv/kjrYWKcVOI5HVLqTp3tj5T9vHF2V99m+eJyetbRfIfLrV6xnq247yiAideySDeKq2QtNiVUbSjeES4okBWXtKgAE6w+QS/wkpTXrKGCMtm6ZEKwDRiUsiHB2W3B2bbKU1YyrsZyV+oHJmqwuKlbTS1AcFdZ0T3JOxOor4WQwRDLpTvzLK+sCYVwWNEqJ3ySwYjOPMcCw0PiDTwJTFGVz+yg3gNgB/C3P7OdcFJXBThfsUroaLQ9XT+Z53xuwQ/wRnB2ewgNycmKlmVnWbFKMsZqnFEhM8CXfTTlwBLZPyqmfQgRyC3CNkTwezDRHQ5ddFpFOs12xxiFtbTY+jQ+OxDrvCgOro+hAwUdPS+IpOjpQFJiS+mUnrs1FWQBzMjWHeweZmj1BXgW0W/ArGcZxIbWgFivwwxiA+udiJ0OiHUmUF98v4B/NEtRbKHQQ7MEhQmK0wHrQIUwqcU6WzOghPCRNN7QPJfdE04a+oCXypXUrGa0EmqBfoL8c+lrKyDBW5kOKvVUGRGqr+5bpIRrKme7IzlhjUjnvpdy4UA5d6I0i1HioKQtuChJtZDROYpsLWTif2IhHVPIqf2XhbSHe5uUK0AJ5B2I5qEwlbrFgUxAaAJJw05SaQNVH0Wh1hmyNVL2EAVQfnybtF+2TQaDbdJ5G0WiXmbZI5nljQgSvZcgzshhE5RC86Gug91RHfzayhtWoi4X6tA+gYJCP1XfZQdccZyBGhqGGS77poC1I/U8cEPKbiBpetYmF9xSLHXnUJ16EzlPHr18yQtMIxgn/0hIuN7TMRF9ZEi4T98/SJXH8pVA7pglbhqamcSZ95M+ja07kg/eF56k7IQSf4SSDuOkxILeme7HeNIjXMs9/A/nn+ObLhq25RnRvU5fFHqOBtL2HQnMCyIGjpRsh2W/XklvoKQ90TtnAntse9XxUOyP7Kuxp29E0Wc+P039xt4N7I88Pv3/qdnLKD+avFVyDl29c3oGn13NgQTRK7UchEXf0auVhOrxw1Jrfvw8585+Aw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 2. 전통적 연동 방법의 문제점 - DB 종속성&gt;
{: style="text-align: center;"}

- 다른 종류의 DB로 변경하면 관련 어플리케이션 코드도 모두 변경되어야 함(유지보수 어려움)
- 각 DB 사용법을 숙지하여 개발해야 함(개발 비용 증가)

### 3.2. JDBC
전통적 연동 방법의 DB 종속성 문제를 해결하기 위해 JDBC라는 표준이 등장했습니다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-16T09:41:16.986Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;nXTPHBTOY10k71bTqgSs\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;UUz-0cR4I019Z-cCHySh\&quot; name=\&quot;그림 3. JDBC 표준 인터페이스를 이용한 DB 연동\&quot;&gt;3VjbctowEP0aPaZjWb4+2gbaaZNpWjKTvhqsgCfGokLc+vWVbFm2sM0lYTqkvCCt9iLtOSstABQtdp9pvJw/kARnwDSSHUADYJrQQTb/EpJ9KfF8VApmNE2kUi0Yp3+wFBpSuk4TvNIUGSEZS5e6cEryHE+ZJospJVtd7YVketRlPMMtwXgaZ23pc5qwuTyF6dbyLzidzavI0PHLlUVcKcuTrOZxQrYNERoCFFFCWDla7CKcieRVeSntRj2ramMU5+wcA+JMhuHq/un1afP7cfEreMLfJncSnU2creWBgelk3F844YOZGIBhBHwHhBYYDoBvAS8CwxAEDggisRRGwDMKnUGhw6c28D3utFCDwC/UAhd4sPLNN1m7L5PD9lXGKVnnCRabhnx5O08ZHi/jqVjdco5x2ZwtMrn8QnImSQMdPl8xSl4VUqbyv8GU4V1v5qDCgxMZkwVmdM9VKgNLQig5DJGcb2tGQFvK5k02VNjHkoUz5bsGig8kVhfg5nbgdpBHnCeBKAA+I0uc63mrk2x0ZJGbjlKxoWKVz6rFOqE4adXNQTr5ZsiaTvFp9rGYzjA7ogd78Gnkvyv9lYziLGbpRt9vFyQywiNJ+UkU/KZzCL+tuyjPKa2aFXjgCLknHJWJaDkqGKKO/XbSQHi62r8OeEGL2uW1rmrXEiVuqir3xKpngbBQ84ai3LULIBAmnbUuo9F+SVRe5CnJecS7KqpbBAtAaIpBy2jMYoYXuEi2sBn/uJeWgSF2ym8iLxQXVsvyJ16tMzbGTEWrgogBAjIbxel4QkpHof0Bbq0229q3lnpm/82tBdFpAj7sS/AGlFcsfSuLKi9NNvXpNMjTp9Jgyc3jrq49iTu6Adyt07h/p/GUJ/W9wCs3x5BXSkegVzofCXvLvz3su1rM/lZlkpHpq950tDuSsxoZS84jkhFaxEGjkcE/1+1hqjvtGk0MdK7TsSBPp4GNDtA9t2OxrROOejoWjma8b6gthcLqyIZtW+etYRzdl+Ue1eeDcgfXbZ+c/5zJ1u0x2TZ1Apr+W5nsOZ88y/V4M+85vu3o/IHueZ34pby2/Q/Aa7OrK+t96ozLnrpj3NWfwMKSV0almZMcK6WGuWFo1H/fL3t40CPD9nvpWB3vJbIvfy/5tP63pwSv/s8MDf8C&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 3. JDBC 표준 인터페이스를 이용한 DB 연동&gt;
{: style="text-align: center;"}

- 어플리케이션 로직은 JDBC 인터페이스에만 의존함(코드 변경 X)
- JDBC 인터페이스 사용법에 대해서만 숙지하여 개발 진행

#### 문제점
- SQL문을 작성하는데 중복되는 코드 발생
    - try-catch 예외 처리
    - Statement, ResultSet 처리에 필요한 부수적인 코드

### 3.3. SQL Mapper
JDBC 표준 인터페이스의 문제점을 해결하기 위해 스프링 JdbcTemplate, MyBatis와 같은 SQL Mapper가 등장했습니다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-16T10:19:21.468Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;F7WGLI8cAD_3lj5vMqHz\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;0dH50AzDGQC7b7Iki-Gu\&quot; name=\&quot;그림 4. SQL Mapper 연동\&quot;&gt;7VjbcpswEP0aPWaGe+DRYKdtpull3Jm2jzIooIlAVMixna+vBBIXgwenE7dNp3nIoNXuIp1zpF0M7Cjfv2GwzO5oggiwjGQP7CWwLNfzxH9pODQG37caQ8pw0pjMzrDGT0gZDWXd4gRVA0dOKeG4HBpjWhQo5gMbZIzuhm73lAzfWsIUjQzrGJKx9StOeKZ2YV139rcIp5l+s+kFzUwOtbPaSZXBhO56JnsF7IhRypunfB8hIrHTuDRxNydm24UxVPBzAh6+fNjQb+T7OxYc8o8Zv0WH6kpleYRkqzYMLI+IfOFGPKTyAawiEHggdMBqCQIH+BFYhWDhgUUkp8II+Ebts6x9xNAFgS+S1m4mCGq3xTXwTZ1bLLJL34DDDxpxRrdFguSiTTG9yzBH6xLGcnYnJCZsGc+Jmr6nBVeiMT0xrjijDy1TVpv/ETGO9ieRM1s+hI4RzRFnB+GiAjzF4EFLU413nSBMV9myvhg09VCJMG1TdzyJB0XVM2iz52lbf34vPO5gWSI2jbsKYKctVyLDbbKJv6C8JJCjaY+7Qwg5rl4BkVYwz2R78/weJp15Jm+X4oy9zpPj+keA2xNHx5kA3LsU3v4E3idhNJ4Ho6PGESWU1bnsmxtD/I3grSMxIdqzoAVqnXrhhqHCX4ALZ0iFP2bi2piS/sWoCOapQEWykEVcjGICqwrHQ/SHVJ3Lhciq3Tqdo2TUCBwhK1ZGtyxG8+WUQ5YiPnd/j5nqcTFVT7SNIXEZ48fhcqfoUW/4RLHYSCsE2x0qoVWGTtFsU0X1O4qjRI5xdLqDo0QNDqNEtVrabf+6gPRN/S8pyD5TQc6fVJDlv5CCbG8m0aUVdLr/ldTX3xWafe/HljZlV1/LPVO/56rbXQP4jmyA/VD2yV31btKeKODicudDeUKC00JqVwhJ9HF2KEsAFp8nCzWR4ySR4SFDFX6CmzqVlGgpMatRdEPgLmWuLaeVUu2o2KgKNFGUzj0TL9GfmfPtgj8ha/tSJcq0/uvjL9KHe1xwLqcPMew+zZvrpvt9w179BA==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 4. SQL Mapper 연동&gt;
{: style="text-align: center;"}

- 장점
    - SQL 응답 결과를 객체로 편리하게 반환
    - JDBC의 반복 코드 제거
- 단점
    - 여전히 SQL을 직접 작성해야 함

### 3.4. ORM
앞서 2장에서 설명한 OOP의 객체 모델과 관계형 DB의 관계형 데이터 모델 사이의 불일치를 해결하고자 등장한 기술이 ORM입니다. 대표적으로 JPA가 있으며, JPA 표준 인터페이스를 구현하는 구현체로 Hibernate, EclipseLink 등이 있습니다.

<div class="mxgraph" style="max-width:100%; marign:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-16T10:23:31.688Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;ZDwg2APG51QGX2EJ91qK\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;gbyCDKXYr32KWK2ji-4W\&quot; name=\&quot;그림 5. ORM 연동\&quot;&gt;7VjbbuIwEP0aP1bKneQxCdBq1ZW6otLuPprETSxMjBxToF+/duLc0wVaughp+1DF4/HEnnM8ZwIww/X+nsFN+p3GiABDi/fAnALDsB1H/JeGQ2lwXaM0JAzHpUlvDAv8hpRRU9YtjlHeceSUEo43XWNEswxFvGODjNFd1+2Fku5bNzBBA8MigmRo/YljnqpTGJPG/oBwklZv1h2vnFnDylmdJE9hTHctkzkDZsgo5eXTeh8iInNX5aVcN39ntt4YQxk/ZcHb82zrPN+lK/Me/v51eN5CEtypKK+QbNWBgeEQES9YiodEPoBZCDwHBBaYTYFnATcEswD4DvBDORWEwNUKn2nhI4Y28FwRtHDTgVe4+RPg6lVssckmfJkcfqgyzug2i5HctC6mdynmaLGBkZzdCYoJW8rXRE2/0Iwr0uiOGOec0VWNlFHHf0WMo/27mdNrPASPEV0jzg7CpVqgKQgVhz27HO4aQui2cknbZKigh4qESR26wUk8KKjOgM08Dtu3J/9G021a3XTXaTyW78lXpds6Md2C8j4I7OJmTOUlcIsLERjyZoyCoaKwynIngjzgJWIZ5Gh8ehYRUfzQI85WNwim4VwbTHcEzHfTqJ2XRkuNQ0ooK2KZ87km/gbpLVZiQirPjGaodmot1zS1/AJYuF0o3CESjjuCxNdBUYn837BAWexLHRejJaHRSqRCmNq8FcM5li8u0Goh04XxCE69RKN40Bf00ix2SbcsQsfrBocsQfxYOR/C1r4i1bVhiECOX7t7GwNGhXuiWOy6poCldzlQj6sQ5ZnUqnY30QtkT44EKg89CFTwpD7jJ6hjnEWdiMA8x9El+NFin3FZuugXo8tYQbUvwyDT7Kmz9UEGmb1y5P1jAo30UFK9NdnINqJdtLa+Vih5ANxAanufZ6Ii8y6zIMFJJmknOIAEgQJZt7H4qvDVxBrHsVweMJTjN7gsQkl2beR5iwzYAbCnMtaW01wRbqAQSjZGlOS8cvcpXampVVHCHCrLmLCYX6Yr9gDbxY/H/2CeAqbl9Rq2ybXBdEYqfb/7norP0Nv82rH7+b56g6yf0CHfmrSe2omVZLuWtjq9jyW7r4mnauvEOBLow+Iqhs1PVqV787ufOfsD&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 5. ORM 연동&gt;
{: style="text-align: center;}

## A. 참조
adam2, "JPA는 도대체 뭘까? (orm, 영속성, hibernate, spring-data-jpa)," *Velog.io*, Apr. 9, 2020. [Online]. Available: [https://velog.io/@adam2/JPA는-도데체-뭘까-orm-영속성-hibernate-spring-data-jpa](https://velog.io/@adam2/JPA는-도데체-뭘까-orm-영속성-hibernate-spring-data-jpa) [Accessed Aug. 16, 2022].

HeeJeong Kwon, "[DB] ORM이란," *Github.io*, Feb. 1, 2019. [Online]. Available: [https://gmlwjd9405.github.io/2019/02/01/orm.html](https://gmlwjd9405.github.io/2019/02/01/orm.html) [Accessed Aug. 16, 2022].

만년 꼴지 공대생 세상 이야기, "Spring DB : JDBC와 ORM의 필요성," *Tistory*, Apr. 28, 2022. [Online]. Available: [https://ojt90902.tistory.com/878](https://ojt90902.tistory.com/878) [Accessed Aug. 16, 2022].

seongwon97, "[Spring JPA] JPA란?," *Velog.io*, Sep. 14, 2021. [Online]. Available: [https://velog.io/@seongwon97/Spring-Boot-JPA%EB%9E%80](https://velog.io/@seongwon97/Spring-Boot-JPA%EB%9E%80) [Accessed Aug. 16, 2022].
