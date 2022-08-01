---
title: '[컴퓨터네트워크] 04. 어플리케이션 계층 - Web & HTTP'
author_profile: true
uml: true
toc_label: '[컴퓨터네트워크] 04. 어플리케이션 계층 - Web & HTTP'
post-order: 4
---

## 1. 월드 와이드 웹(WWW, World Wide Web)이란?
월드 와이드 웹은 인터넷상의 정보를 Hypertext 방식과 멀티미디어 환경에서 검색할 수 있게 해주는 점보검색 시스템이다. 간단히 웹(Web)이라 부르는 경우가 많다.

웹이란 용어가 인터넷과 동의어로 쓰이는 경우가 많지만 엄격히 말해 서로 다른 개념이다. 웹은 전자 메일과 같이 인터넷 상에서 동작하는 하나의 서비스일 뿐이다.

## 2. 웹과 HTTP
종단 시스템은 보통 시스템 화면에 그려지는 단위인 웹페이지에 대한 자원을 요청하게 되는데, 웹페이지는 HTML 파일과 참조 객체들로 구성된다.

웹을 구성하는 기술은 문서를 작성하는 언어인 HTML, 문서 전송 프로토콜(HTTP), 문서의 위치를 지시하는 URL로 제안돼있다.

웹페이지 자체와 웹페이지가 포함한 참조 객체들 모두 URL(Uniform Resource Locator)을 통해 요청을 시도하여 접근할 수 있다. URL은 네트워크 상 자원이 어디 있는지 나타내기 위한 일련의 규칙에 따라 작성한 것이다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-01T03:22:41.409Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;wPb9hAEeg9uw6HmROVHg\&quot; version=\&quot;20.2.2\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;xN2jfBJdmvyMKoM7aQYc\&quot; name=\&quot;설명 1. URL 구조\&quot;&gt;7VjRbpswFP0aHheBDQl5bJJmlbY9TFG3aS+Ti91g1XCRMSXp1+86mARCoqVSW2lqXyL72L7Y59zDNfHoPNt81qxIvwEXyiM+33h04RESjgn+WmDbAFEYNcBaS95A/gFYySfRgEGLVpKL0mENZACUkUUfTCDPRWJ6GNMa6v60e1C8BxRsLQbAKmFqiP6U3KQNGpPJAb8Rcp22Tw7G02YkY+1kd5IyZRzqDkSvPTrXAKZpZZu5UJa7Pi/LM6P7jWmRm0sWTP/Abfrzi/oe0+h2uxW/v/4yn1yUR6Yqd+DUmMKjVzYOWdZ1PSohE2WSIukjwSsciv0Yn7S0+EIUBpuFTEZree/OabYteUZscGuz1GQKgQCbTMl1ju0ENy00Ao9CG4l0X7mBTHJul8+0KOUTu9uF8rFfgMzNTsxo5kULG6syUDYJY0OXRsODmIMCjLvIIbdR7qVSxxDkZskyqWxG/hCas5w5eOW2HrR9Fz3EviMKtys2ZxUI9rqiHwQSZPQWp7gFsUt9Z4XYJUZ9yKswcljaySnqMOZSeb0PfFAbG07wZ4hPBuIPFMSkLWwzqbTazjRLHoRVtE6lEauCJXasRuP3VdZQ5Vzwlkkli5sOq+fI75CtwTAjwSbE1H8Z8gN/POrzH/i0RToSkFMK0FdSgA4UKPDokID6f7zU1e2MvC8g32SgHh3aJ35L94TvyT2Ehj322+4/jBNMyCuxHw0LF5RYi/ycZeLDPEfvvmlfvVPeCfy3NM/4PZmHhtGIHNeeYDS5sPjs33wvrsJkWH5A70xUZXfoig8b9XX0/YGOp5wUvKWT4vfkpDAkR9eAiFx4hwvoa7loOnSR/fb7KEUnFfSjCy5ybb3qCkimz9YPu4fv691Y508Kev0X&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;설명 1. URL 구조&gt;
{: style="text-align: center;"}

## 3. URI vs URL vs URN
- URI
    - Uniform Resource Identifie
    - 네트워크 상 자원을 고유하게 식별할 수 있는 식별자를 의미
    - URL과 URN으로 나뉨
- URL
    - Uniform Resource Locator
    - 특정 종단 시스템의 자원의 위치를 서술한다.
- URN
    - Uniform Resource Name
    - URL의 한계를 극복하기 위해 등장
        - 서버가 자원의 위치를 변경했을 때 전에 사용하던 URL은 더 이상 사용하지 못함
        - 자원의 이름을 통해 자원의 위치와 관계 없이 항상 접근 가능하도록 설계
    - 아직 표준화되지 않음

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-01T03:24:01.593Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;U6yrgQ9PtDbdUX14qI0T\&quot; version=\&quot;20.2.2\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;x-Mqe3W3gOrlzLe2AEY4\&quot; name=\&quot;그림 1. URI, URL, URN 포함 관계\&quot;&gt;vZVdT8IwFIZ/zS5J+jGdXMpkaiKaiB/XDStbtWuXUtnw13vG2o0JRrzAhIv2PW9Pe85zwgIaF/W1YWU+0ymXAUFpHdCrgBAcEhI0P5RuWiU6C1shMyJ1pl6Yi0/uROTUD5Hy1cBotZZWlENxoZXiCzvQmDG6GtqWWg5vLVnG94T5gsl99VWkNm/VCxL1+g0XWe5vxufjNlIwb3aVrHKW6mpHotOAxkZr266KOuayaZ7vS3su+SHaPcxwZY858PC2NGpONqubaTZ7ii7r9YiNXJY1kx+u4OfHW/deu/FNgETQb9hMqlxYPi/ZoolUgBy03BYSdhiWS61swgohG9ov3KRMMSc7tE3dk6WQMtZSGxCUVk3ilTX6nXsxIJTS8TiBWiZrbqwAIJdSZApiVpcu5SH39ir3ctzl9egoKK5iyMrrH1uJO0Aw2VwX3JoNWPwBP51uqHHk9lU/ItR78p3xIN7I3FhmXe6eHCwcvD+AJAdA3p0SJD47EiRCSYLQsSARiuOt+39AkiFIEu6DxOEBkJieCiQ9APL+pCDDI0E2YH4BuQvsG9ju9ElAkij8P5Cw7f+2t7Gdjx+dfgE=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. URI, URL, URN 포함 관계&gt;
{: style="text-align: center;"}

쉽게 생각하면 URI는 규약이고, URL과 URN은 규약을 구현한 방법이다.

## 4. HTTP 동작 개요

![](https://drive.google.com/uc?export=view&id=10SVCS1kjgRhht1cse21BxFaVNiLgT3pI){: .align-center}
&lt;그림 2. HTTP는 Client-server 모델에서 동작한다&gt;
{: style="text-align: center;"}

HTTP는 클라이언트-서버 네트워크 모델 상에서 동작하며, 클라이언트 측에서 브라우저를 통해 웹서버에 자원을 요청하면 서버에서 해당 요청에 적절한 응답을 반환합니다

## 5. HTTP의 특징
### 5.1. 비연결성(Connectionless)

비연결성이란 클라이언트가 서버와 한 번 연결을 맺은 후 클라이언트의 요청에 대해 서버가 응답을 마치면 맺었던 연결을 끊는 성질을 의미합니다.

#### 5.1.1. 장점


HTTP는 인터넷 상에서 불특정 다수의 통신 환경을 기반으로 설계됐습니다. 만약 서버에서 다수의 클라이언트와 연결을 계속 유지해야 한다면 많은 리소스를 필요로 하기 때문에 **비연결성을 통해 연결 유지에 필요한 리소스를 추가 연결에 사용하여 더 많은 클라이언트와의 연결**을 수행할 수 있게 됩니다.

#### 5.1.2. 단점

서버가 클라이언트를 기억하지 않으므로 동일한 클라이언트의 모든 요청에 대해 매번 새로운 연결을 시도/해제해야 하는 과정을 거쳐야 하므로 이에 대한 오버헤드가 발생합니다.

#### 5.1.3. keep-alive 헤더

비연결성의 단점을 극복하기 위해 HTTP의 KeepAlive 속성을 이용할 수 있습니다. KeepAlive 속성을 활성화하면 지정된 시간동안 서버와 클라이언트 간 패킷 교환이 없을 경우 안부 패킷(TCP Flow Control의 Persist Timer에 사용되는 Probe 패킷과 같은)을 주기적으로 전송하여 연결 상태를 유지합니다.

하지만 KeepAlive가 주기적으로 클라이언트 상태를 체크하는 것에 일정 리소스가 사용되기 때문에 서버가 바쁜 환경에서 프로세스 수가 기하급수적으로 늘어나는 상황에서 KeepAlive를 사용하는 것에 주의해야 합니다.

HTTP 1.1부터는 default로 keep-alive 헤더를 활성화합니다.

### 5.2. 무상태(Stateless)

위에서 설명한 비연결성 때문에 생기는 성질로, 클라이언트-서버 관계에서 서버가 클라이언트와의 연결을 유지하지 않기 때문에 클라이언트의 상태(연결 상태)를 보존하지 않는 성질이 생기는데 이를 Stateless하다고 합니다.

#### 5.2.1. 단점
HTTP의 Stateless한 성질 때문에 별도로 처리해주지 않으면 다음과 같은 일이 벌어집니다.

<p class=short>예를 들어 쇼핑몰에서 클라이언트가 다음과 같은 순서로 서비스를 이용한다고 가정해봅시다.</p>

1. 쇼핑몰 접속
2. 로그인
3. 상품 클릭 → 상세화면 이동
4. 로그인
5. 주문
6. 로그인
7. …

Stateless한 성질 때문에 위와 같이 매번 새로운 인증을 해야하는 번거로움이 발생합니다.

#### 5.2.2. 쿠키 & 세션
HTTP의 Stateless한 성질로 인해 발생하는 문제점을 보완하기 위해 쿠키와 세션의 개념이 등장했습니다.

관점 | 쿠키 | 세션
:-: | :-: | :-:
정의 | 클라이언트 로컬에 저장되는 키-값 데이터 | 일정 시간 동안 같은 브라우저로부터 들어오는 일련의 요구를 하나의 상태로 보고 그 상태를 저장해놓은 데이터
저장 위치 | 클라이언트 | 서버
생명 주기 | 만료 시간 이후 삭제 | 브라우저 종료 시 삭제
속도 | 빠름(장점) | 느림(단점, 서버 내부에서 세션 처리를 위한 자원 사용)
보안 | 비교적 취약(단점) | 비교적 안전(장점)

세션은 서버의 자원을 사용하기 때문에 사용자가 많을수록 소모되는 자원이 상당합니다. 이 때문에 많은 웹 서버에서 세션보다는 주로 쿠키를 사용합니다.

#### 5.2.3. 토큰 기반 OAuth, JWT
쿠키와 세션은 각각 장단점을 지니고 있는데 이 단점들을 해결하고자 토큰 기반 인증 방식이 도입됐습니다.

토큰 기반 인증 방식의 핵심 기술은 **보호할 데이터를 토큰으로 치환하여 원본 데이터 대신 토큰을 사용하는 것**입니다.

그러나 반드시 토큰 기반 인증이 좋은 것은 아닙니다. 서비스 특성에 따라 쿠키, 세션, OAuth, JWT 중 적절한 기술을 사용하는 것이 가장 좋습니다.

각 기술에 대해 더 자세히 알고 싶으시다면 다음 링크를 참조하는 게 도움이 될 것입니다.

[victolee, "쿠키(Cookie)와 세션(Session)," *Tistory*](https://victorydntmd.tistory.com/34)

[victolee, "OAuth 인증 방식," *Tistory*](https://victorydntmd.tistory.com/4)

[victolee, "JWT (JSON Web Token)," *Tistory*](https://victorydntmd.tistory.com/115)

### 5.3. Non-persistent, Persistent HTTP, HTTP Pipelining
웹페이지에는 페이지에 담겨있는 텍스트나 이미지와 같은 데이터 외에도 페이지 설계, 배치 등 다양한 정보들이 담겨야 합니다.

초기 HTTP 모델은 한 번의 Client-server 연결에 하나의 Content를 업로드했습니다. 이를 Non-persistent connection이라 하며, 한 Content에 연결 셋업, 해제를 반복하니 웹페이지 전체에 대한 Content를 모두 받기까지 시간이 너무 오래걸렸습니다(HTTP 1.0).

위 문제를 해결하기 위해 Persistent connection 방식을 사용하도록 HTTP를 업데이트했습니다. Persistent connection 방식은 위에서 설명했던 keep-alive 헤더 정보를 이용해서 클라이언트가 모든 Content를 전송받기 전까지 클라이언트-서버 간 연결이 끊어지지 않도록 합니다(HTTP 1.1).

Persistent connection에서 더 나아가 패킷의 요청에 대한 응답을 기다리지 않고 요청을 연속해서 여러 개 보내는 방식인 HTTP Pipelining이 등장했습니다. Pipelining을 사용하면 RTT(Round Trip Time)을 효과적으로 줄일 수 있습니다. Pipelining의 문제는 정확히 구현해내기 복잡하다는 점인데, 후에 Queue를 이용한 더 나은 알고리즘인 Multiplexing을 사용하여 패킷 연속 전송을 구현했습니다(HTTP 2.0).

RTT(Round Trip Time)는 클라언트로가 서버에게 패킷 요청을 전송하고 이에 대한 응답을 반환받기까지 소요되는 시간을 말합니다. 
{: .notice--info}

![](https://drive.google.com/uc?export=view&id=1BFFUmYD-YhFam0YeJLnSjZSubwEK6xmv){: .align-center}
&lt;그림 3. Non-persistent vs Persistent vs Pipelining&gt;
{: style="text-align: center;"}

## 7. HTTP Method
HTTP는 클라이언트가 서버로 요청을 전달할 때 어떤 목적을 갖는 요청인지 명시할 수 있는 HTTP Method 기능을 제공합니다.

<p class=short>HTTP 메서드는 다음과 같이 구분됩니다.</p>

- GET
    - 리소스 조회 요청
- POST
    - 입력 데이터 전달, 데이터 생성 요청
- PUT
    - 입력 데이터 전달, 데이터 생성 또는 수정 요청
- DELETE
    - 데이터 삭제 요청
- HEAD
    - GET과 같이 리소스 조회 요청이지만 서버는 응답 본문 없이 헤더만을 반환
    - 클라이언트는 응답 헤더만을 통해 정보 조회 가능
- TRACE
    - 클라이언트-서버 사이에 존재하는 모든 HTTP 어플리케이션의 요청/응답 연쇄 추적
    - 클라이언트 자신이 보낸 메시지의 이상 유무 파악 위함
- OPTIONS
    - 서버에게 특정 리소스가 어떤 메서드를 지원하는지 조회 요청

## 8. HTTP 상태 코드
HTTP 상태 코드는 클라이언트의 요청에 서버가 응답한 결과의 속성에 따라 분류한 코드입니다.

모든 HTTP 응답에 대한 상태 코드는 세자릿수로 표기하며 5개의 분류로 구분되는데, 상태 코드의 첫 번째 숫자가 응답 코드의 클래스를 정의하고, 나머지 두 자리는 세부 표현을 담당합니다.

<p class=short>상태 코드 분류에 따른 의미는 다음과 같습니다.</p>

- 1xx (정보) - 요청을 받았으며 프로세스를 계속함
- 2xx (성공) - 요청을 성공적으로 인식 및 수용하였음
- 3xx (리다이렉션) - 요청 완료를 위해 추가 작업 조치가 필요함
- 4xx (클라이언트 오류) - 요청 문법이 잘못됐거나 등의 이유로 요청을 처리할 수 없음
- 5xx (서버 오류) - 서버가 클라이언트의 유효한 요청에 대한 처리에 실패했음

각 클래스 별 세부 표현은 [위키백과 - HTTP 상태 코드](https://ko.wikipedia.org/wiki/HTTP_상태_코드)를 참조하면 좋을 것 같습니다.

## 9. RESTful API
오늘날 대부분의 웹 서비스가 프론트엔드-백엔드로 분리되면서 프론트엔드와 백엔드가 HTTP 기반의 API를 통해 서로 통신하는데, 개발자마다 API 개발 방식이 모두 달라 개발된 API가 일관적이지 못한 문제를 해결하기 위해 등장한 것이 RESTful API입니다. RESTful API란 REST 패턴에 따라 API를 설계한 것을 의미합니다.

REST(Representational state transfer)란 WWW와 같은 분산 하이퍼미디어 시스템을 위한 SW 아키텍처의 한 형식으로, 자원을 정의하고 자원의 주소를 지정하는 방법 전반에 대한 패턴을 의미합니다.
{: .notice--info}

### 9.1. REST API 설계 목표
- 컴포넌트 간 유연한 상호 연동성 확보
    - 웹 시스템을 이루는 어떤 컴포넌트도 HTTP, URI 표준 기반으로 어디서든 동일하게 동작 보장
- 범용 인터페이스
    - 웹 시스템이 HTTP, URI 표준 기반으로 어디서든 사용 가능한 범용 인터페이스 제공
    - 개발자는 비즈니스 로직만 고민하면 됨
- 각 컴포넌트들의 독립적 배포
    - 각 컴포넌트들은 독립적으로 개발될 수 있음
    - 모든 컴포넌트가 규격에 맞게 개발되어 컴포넌트의 추가/변동 시 원활한 연동 가능
- 지연 감소, 보안 강화, 레거시 시스템 캡슐화를 지원하는 중간 컴포넌트로서의 역할 수행
    - Client-REST-Server 계층화
    - 클라이언트는 종단 서버에 직접 연결할 필요 없이 서비스 이용 가능
    - REST 계층을 중계 서버로 이용해 로드 밸런싱, 공유 메모리 등을 활용한 성능 및 확장성 향상, 보안 정책 적용

### 9.2. REST의 구성 요소(패턴)
- Resource(자원)
    - 자원을 식별하는 ID
    - URI로 표현(ex. /products/product-id/1)
- Verb(행위)
    - HTTP Method로 표현(ex. GET, POST, PUT, DELETE)
- Representation(표현)
    - HTTP Payload(본문, Body)에 기입
    - JSON, XML, TEXT, RSS 등 여러 형태로 전달 가능

### 9.3. REST 6가지 원칙
- 인터페이스 일관성(Uniform Interface)
    - URI로 지정한 자원에 대한 조작을 통일되고 한정적인 인터페이스로 수행
    - 모든 플랫폼에서 사용 가능
    - 특정 언어나 기술에 종속되지 않음
- 무상태(Stateless)
    - REST는 HTTP의 무상태 특성을 그대로 가짐
    - 받은 단일 요청에 대해서만 처리하여 구현이 쉽고 단순해짐
- 캐시 처리 가능(Cacheable)
    - 캐시 사용을 통해 빠른 응답 가능
- 계층화(Layered System)
    - 클라이언트는 REST 중간 서버에 연결되고, 서버에 직접 연결됐는지 알 수 없음
    - 중간 서버는 로드 밸런싱, 공유 메모리 기능 등을 제공하여 시스템의 성능과 확장성을 향상시킴
- 온디맨드 코드(Code on demand)
    - 자바 애플릿, 자바스크립트 등을 통해 서버가 클라이언트에게 실행 가능한 로직을 전송하여 기능 확장 가능
- 클라이언트-서버 구조
    - 아키텍처를 단순화하고 작은 단위로 분리하여 클라이언트-서버의 각 파트가 독립적으로 개선 가능

### 9.4. RESTful API 개발 가이드
- 자원을 식별할 수 있어야 함
    - URL 만으로 내가 어떤 자원을 제어하려고 하는지 알 수 있어야 함
    - 자원의 위치는 물론 자원의 종류까지 알 수 있어야 함
    - 서버가 제공하는 정보는 JSON이나 XML 형태로 HTTP body에 포함하여 전송
- 메시지를 통해 리소스를 조작해야 함
    - 메시지는 해당 자원에 대한 명시적 행위를 포함해야 함
    - HTTP Method의 목적에 알맞게 동작하도록 API를 설계해야 함
- 메시지는 자기서술적이어야 함
    - 각 메시지는 자신을 어떻게 처리해야 하는지에 대한 충분한 정보를 포함해야 함
    - 미디어 타입만 가지고도 클라이언트는 어떻게 그 내용을 처리해야 하는지 알 수 있어야 함
- HATEOAS(Hypermedia As The Engine Of Application State)
    - 어플리케이션 상태를 표현하는 엔진으로서 하이퍼미디어를 사용해야 함
    - 쉽게 말해, 클라이언트 요청에 대한 응답은 추가 정보를 제공하는 링크를 포함할 수 있어야 함
    - 독립적 컴포넌트들을 손쉽게 연결할 수 있음
    - 하이퍼 링크를 통한 느슨한 결합
        - 서버와 서버, 서버와 클라이언트가 분리됨
        - 그러나 클라이언트는 링크를 통해 전체 네트워크와 연결될 수 있음
        - 서버가 독립적으로 진화할 수 있음

## A. 참조
Wikipedia, “월드 와이드 웹,” *wikipedia.org*, Jul. 6, 2022. [Online]. Available: [https://ko.wikipedia.org/wiki/월드_와이드_웹](https://ko.wikipedia.org/wiki/월드_와이드_웹) [Accessed Jul. 31, 2022].

뭉, “[웹] 웹 기초(1) - HTTP, TCP/IP,” *Tistory*, May 24, 2021. [Online]. Available: [https://cordingdiary.tistory.com/entry/웹-웹-기초-1-HTTP-TCPIP](https://cordingdiary.tistory.com/entry/웹-웹-기초-1-HTTP-TCPIP) [Accessed Jul. 31, 2022].

mygumi, “URI vs URL vs URN,” *Tistory*, Mar. 25, 2017. [Online]. Available: [https://mygumi.tistory.com/139](https://mygumi.tistory.com/139) [Accessed Jul. 31, 2022].

victolee, “HTTP 특성(비연결성, 무상태)과 구성요소 그리고 Restful API,” *Tistory*, Oct. 3, 2018. [Online]. Available: [https://victorydntmd.tistory.com/286](https://victorydntmd.tistory.com/286) [Accessed Jul. 31, 2022].

mdn web docs, "HTTP/1.x의 커넥션 관리," *developer.mozilla.org*, May 21, 2022. [Online]. Available: [https://developer.mozilla.org/ko/docs/Web/HTTP/Connection_management_in_HTTP_1.x](https://developer.mozilla.org/ko/docs/Web/HTTP/Connection_management_in_HTTP_1.x) [Accessed Aug. 1, 2022].

양유성, "[Network] HTTP/2에서 multiplexing이란?," *medium.com*, Apr. 7, 2019. [Online]. [https://medium.com/@devfallingstar/network-http-2에서-multiplexing이란-565a7b184c](https://medium.com/@devfallingstar/network-http-2에서-multiplexing이란-565a7b184c) [Accessed Aug. 1, 2022].

Wikipedia, "HTTP 상태 코드," *wikipedia.org*, May 19, 2022. [Online]. Available: [https://ko.wikipedia.org/wiki/HTTP_상태_코드](https://ko.wikipedia.org/wiki/HTTP_상태_코드) [Accessed Aug. 1, 2022].

kdh10806, "REST API, RESTful API," *Velog.io*, Apr. 10, 2022. [Online]. Available: [https://velog.io/@kdh10806/REST-API-RESTful-API](https://velog.io/@kdh10806/REST-API-RESTful-API) [Accessed Aug. 1, 2022].
