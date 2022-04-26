---
title: '[JSP] 1. 프로젝트 생성(Hello World !)'
tags:
  - Eclipse
  - Tomcat
author_profile: true
toc_label: '[JSP] 1. 프로젝트 생성(Hello World !)'
last_modified_at: 2022-04-26 15:01:25 +0900
post-order: 1
---

본 블로그의 JSP 포스트는 '동빈나'님의 유튜브 [JSP 게시판 만들기 강좌](https://www.youtube.com/playlist?list=PLRx0vPvlEmdAZv_okJzox5wj2gG_fNh_6)를 참조하여 필자가 공부한 것을 정리하고 부족한 부분은 추가하는 형태로 작성될 예정이다.

## 1. JSP 개발 환경
JSP로 웹 어플리케이션을 개발하기 위해서는 자바 프로그래밍 개발 환경과 웹 서버를 구동하기 위한 WAS(Web Application Server) 엔진이 필요하다.

### 1.1. 자바 개발 환경
자바 개발 환경 구성을 위해서는 JDK와 IDE를 설치해야 한다. 이에 관해서는 
본 블로그에서 작성한 포스트 [자바 개발 환경 구성](https://drmaemi.github.io/programming-language/java/dev-env/)를 참조하자.

개발 환경 IDE는 유튜브 강좌에서 이클립스와 Java EE를 사용했는데, 필자는 스프링 개발을 최종 목적으로 하기 때문에 Spring Tools Suite 4 Eclipse를 사용했다.

### 1.2. WAS 엔진 Tomcat
웹을 구동시킬 WAS 엔진으로 Tomcat을 사용한다. Tomcat은 [아파치 공식 웹사이트](https://tomcat.apache.org/)에서 다운받을 수 있다. 본문에서는 Tomcat 버전 9를 다운로드하여 사용한다.

64비트 윈도우용 설치 zip파일을 다운받아 적절한 경로에 압축을 해제하고, 관리자 권한 CMD로 Tomcat의 bin 경로로 이동한 다음 `startup.bat`를 입력하여 웹 서버를 구동시킬 수 있다.

```txt
C:\Windows\System32>cd C:\dev\apache-tomcat-9.0.62\bin

C:\dev\apache-tomcat-9.0.62\bin>startup.bat
```

이 때 새로운 터미널이 실행되면서 웹 서버 구동 로그를 확인할 수 있는데, 인코딩이 잘못되어 그런지 텍스트가 이상하게 출력된다. 실제로 Tomcat 콘솔 파일의 속성을 보면 '현재 코드 페이지' 설정 값이 `ANSI/OEM`으로 되어 있는 것을 확인할 수 있다.

이 경우 `apache-tomcat-9.0.62/conf/logging.properties` 파일에서 `UTF-8`로 되어 있는 인코딩 속성을 전부 `EUC-KR` 등으로 바꾸면 된다.

```txt:apache-tomcat-9.0.62/conf/logging.properties
...
1catalina.org.apache.juli.AsyncFileHandler.encoding = EUC-KR
...
2localhost.org.apache.juli.AsyncFileHandler.encoding = EUC-KR
...
3manager.org.apache.juli.AsyncFileHandler.encoding = EUC-KR
...
4host-manager.org.apache.juli.AsyncFileHandler.encoding = EUC-KR
...
java.util.logging.ConsoleHandler.encoding = EUC-KR
...
```

## 2. 프로젝트 생성
이클립스를 실행시킨 뒤 화면 상단에서 `File > New > Dynamic Web Project`를 수행한다. 이 때 Java EE 개발용 소프트웨어가 설치되어있지 않다면 `Dynamic Web Project` 항목이 없을 수 있는데, 이 경우엔 화면 상단 `Help > Install New Software`를 수행한 뒤 `Work with`에 `Latest Eclipse Release`를 선택하고 `Web, XML, Java EE and OSGi Enterprise Development` 항목을 선택해 `Finish`를 클릭한다. 이후 소프트웨어 설치를 위해 IDE 종료 후 재실행하면 정상적으로 `Dynamic Web Project`를 생성할 수 있다.

## 3. index.jsp 작성 및 웹 서버 실행
`src/main/webapp` 경로 밑에 `index.jsp`를 작성하고 실행버튼을 클릭하면(혹은 `Ctrl`+`F11` 단축키 이용) 가장 먼저 웹 프로젝트를 구동시킬 런타임을 지정하게 된다. `Target runtime`에서 `New runtime`을 클릭하고 본인이 설치한 Tomcat 버전을 선택한 뒤 `Installation directory`에 Tomcat 설치 경로 `.../apache-tomcat-9.0.62`를 기입하여 완료한다.

```html:src/main/webapp/index.jsp:lineons
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <title>Hello World !</title>
</head>
<body>
  Hello World !
</body>
</html>
```

여기까지 완료했으면 Tomcat으로 웹 서버가 정상적으로 구동되어 브라우저로 `http://localhost:8080/<project_name>/index.jsp`에 접속하면 `Hello World !` 문구가 보인다.

![](https://drive.google.com/uc?export=view&id=1eLUnDXM-L0oMDR50-o3RKfAF0J7y1WSj){: .align-center}
<그림 1. Hello World !>
{: style="text-align: center;"}

## A. 참조
동빈나, "JSP 게시판 만들기 강좌 1강 - Hello World! (JSP Advanced Development Tutorial #1)", *Youtube*, May 4, 2017. [Oneline]. Available: [https://youtu.be/wEIBDHfoMBg](https://youtu.be/wEIBDHfoMBg) [Accessed Apr. 8, 2022].

dejavuhyo, "Windows에서 Tomcat 콘솔 로그 한글깨짐 해결", *Github.io*, Jan. 26, 2021. [Oneline]. Available: [https://dejavuhyo.github.io/posts/tomcat-console-encoding/](https://dejavuhyo.github.io/posts/tomcat-console-encoding/) [Accessed Apr. 8, 2022].

은서파, "STS에서 Dynamic Web Project 개발", *Tistory*, Jan. 12, 2021. [Online]. Available: [https://goodteacher.tistory.com/329](https://goodteacher.tistory.com/329) [Accssed Apr. 8, 2022].
