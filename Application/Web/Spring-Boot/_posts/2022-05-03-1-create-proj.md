---
title: '[Spring Boot] 1. 프로젝트 생성(Hello World !)'
tags:
  - IntelliJ
  - Gradle
  - Tomcat
author_profile: true
toc_label: '[Spring Boot] 1. 프로젝트 생성(Hello World !)'
last_modified_at: 2022-05-06 02:48:15 +0900
post-order: 1
---

## 1. SpringBoot 개발 환경
SpringBoot 프로젝트를 시작하기 위해선 자바 프로그래밍 개발 환경이 필요하다.

자바 개발 환경 구성을 위해서는 JDK와 IDE를 설치해야 한다. IDE는 크게 Eclipse와 IntelliJ 둘 중 하나를 선택하여 개발하는데 본 블로그에서는 IntelliJ IDEA Community 버전을 활용해 SpringBoot 개발을 진행할 계획이다. 이에 관해서 본 블로그에서 작성한 포스트 [[JAVA] 1. 자바 개발 환경 구성](https://drmaemi.github.io/programming-language/java/dev-env/)를 참조하자.

## 2. 프로젝트 생성
IntelliJ IDEA Community 버전에서는 Spring 개발에 필요한 라이브러리가 포함되어 있지 않기 때문에 [스프링 이니셜라이저](https://start.spring.io/)에서 SpringBoot 프로젝트를 생성하고 다운받아 사용해야 한다.

![](https://drive.google.com/uc?export=view&id=1AL9hrdV_gPcq7UCJNVuHpPYHy0T0Hy2b){: .align-center}
<화면 1. Spring Initializer 프로젝트 생성 화면>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1f0MGv1Zrl2UJolDxfZjGT2VWW7X3H7_0){: .align-center}
<화면 2. Spring 라이브러리 추가>
{: style="text-align: center;"}

이후 <화면 1>의 *GENERATE* 버튼을 클릭하면 압축 파일이 다운되는데, 이를 적절한 위치에 압축 해제하고 IntelliJ를 실행하여 File > Open 으로 프로젝트를 열면 된다.

![](https://drive.google.com/uc?export=view&id=1YXolqlvckT1mk3PGks3GYS9me2TIUf1J){: .align-center}
<화면 3. 스프링부트 프로젝트가 열린 모습>
{: style="text-align: center;"}

이후 `index.html` 파일을 리소스 폴더 하위에 생성하고 웹 어플리케이션을 실행시켜본다.

```html:src/main/resources/static/index.html:lineons
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>스프링부트 데모 웹사이트</title>
</head>
<body>
<p>
  Hello World !
</p>
<p>
  INDEX.HTML - IntelliJ Community 프레임워크를 이용한 스프링부트, 지금 시작합니다.
</p>
</body>
</html>
```

<br>

![](https://drive.google.com/uc?export=view&id=1wsMVnvKP8D5a4YOafXZwnqGgrNjmVpMG){: align-center}
<화면 4. 스프링부트 웹 어플리케이션 실행>
{: style="text-align: center;"}

그런데 웹 어플리케이션이 실행되지 않고 다음과 같은 오류가 발생했다.

```txt:CMD
Error: Could not find or load main class maemi.dr.SpringDemo.SpringDemoApplication
Caused by: java.lang.ClassNotFoundException: dr.maemi.SpringDemo.SpringDemoApplication

Process finished with exit code 1
```

원인을 찾아보니 프로젝트 폴더에서 Gradle Build를 수행하지 못해 생기는 문제인 것 같았다. 이를 해결하는 방법은 *File > Settings* 에서 *Build, Execution, Deployment > Build Tools > Gradle* 의 설정 값을 <화면 5>와 같이 수정하는 것이다.

![](https://drive.google.com/uc?export=view&id=19MO9kQ6woHVqKynBXOsO3WBqV5mzdkTj){: .align-center}
<화면 5. Gradle Build Setting 변경>
{: style="text-align: center;"}

근데 필자는 이것을 처음 시도했을 때 <화면 6>과 같이 IntelliJ가 Gradle 프로젝트를 인식하지 못해 세팅 화면이 비어있었다.

![](https://drive.google.com/uc?export=view&id=1dUcDRIsg0dClp6J0J8fSfBXJR6xlIZuh){: .align-center}
<화면 6. Gradle 프로젝트 인식 실패>
{: style="text-align: center;"}

이에 대한 해결법은 프로젝트 폴더에서 `.idea` 파일을 삭제하고 *File > Invalidate Caches* 에서 *Clear...* 항목 모두 체크한 뒤 *Invalidate and Restart*하여 IDEA를 재실행하는 것이다.

이후에 다시 <화면 5>의 설정 창을 열어 빌드 설정을 변경하면 <화면 7>처럼 Gradle로 스프링 프로젝트를 정상적으로 빌드한다. 만약 <화면 6>의 문제가 아니었다면 *Build > Rebuild Project*를 시도해보는 것을 권한다.

![](https://drive.google.com/uc?export=view&id=1vPIX3Rhz7PHGJeKSgj4ss6ieOB8bntok){: .align-center}
<화면 7. Gradle로 스프링 프로젝트 빌드>
{: style="text-align: center;"}

그럼 이제 <화면 4>처럼 웹 어플리케이션을 실행할 수 있다. 이 때 하단 실행 로그를 보면 어떤 설정도 하지 않았는데도 기본적으로 8080 포트로 지정된 웹 어플리케이션 서버 Tomcat이 실행되는 것을 확인할 수 있다.

![](https://drive.google.com/uc?export=view&id=16gjSQ-3HNjj0oUmZl_NDjzwzj9EMskyi){: .align-center}
<화면 8. index.html 페이지>
{: style="text-align: center;"}

여담으로, <화면 5> 설정에서 *Gradle JVM*으로 JDK 18을 선택했는데 *Invalid Gradle JDK configuration found* 오류창이 팝업됐었다. 그래도 어플리케이션 실행에는 문제가 없었는데, 후에 이 문제로 오류가 발생한다면 JVM을 Gradle과 호환되는 버전으로 변경해야할 것 같다.

## A. 참조
SidePower, "IntelliJ IDEA Community를 이용한 Springboot 개발 시작. 스프링부트란", *Tistory*, Jun 7, 2021. [Online]. Available: [https://youtu.be/wEIBDHfoMBg](https://youtu.be/wEIBDHfoMBg) [Accessed May 3, 2022].

Into, "[Error] Intellij Spring 'Could not find or load main class' Caused by 'java.lang.ClassNotFoundException', 인텔리제이 메인 클래스 에러", *Tistory*, Aug. 22, 2021. [Online]. Available: [https://bba-jin.tistory.com/13](https://bba-jin.tistory.com/13) [Accessed May 6. 2022].

otrodevym, "[intellij] 인텔리제이에서 Gradle 프로젝트 인식 안되는 경우", *Tistory*, May 4, 2021. [Online]. Available: [https://otrodevym.tistory.com/entry/intellij-인텔리제이에서-Gradle-프로젝트-인식-안되는-경우](https://otrodevym.tistory.com/entry/intellij-인텔리제이에서-Gradle-프로젝트-인식-안되는-경우) [Accessed May 6. 2022].

한코딩, "[스프링 부트] 게시판 무작정 따라하기 - 프로젝트 생성", *Youtube*, Sep. 1, 2021. [Online]. Available: [https://youtu.be/6CJ6akFElPc](https://youtu.be/6CJ6akFElPc) [Accessed May 6. 2022].
