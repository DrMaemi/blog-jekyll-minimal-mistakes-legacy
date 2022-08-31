---
title: '[Spring Boot] 설정 파일 application.yml 분리하기'
uml: true
author_profile: true
toc_label: '[Spring Boot] 설정 파일 application.yml 분리하기'
---

스프링부트 설정 파일인 `application.yml`에서 DB 연결 정보 등 보안 상 민감한 정보들을 따로 분리해서 구성하는 방법이 궁금했다. 스프링부트 공식 문서의 [External Application Properties](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.files)에서 관련 내용을 찾아볼 수 있었다. 다양한 방식으로 가능하므로 최대한 다양한 방식에 대해 알고싶다면 공식 문서를 면밀히 참고하면 될 듯하다. 본문에서는 간단한 몇 가지 방법에 대해서만 다뤄보겠다.

## 프로젝트 구조
![화면 1. 프로젝트 구조](https://drive.google.com/uc?export=view&id=1MOIwZI60nx8SQaFplI7iSxCVTD8DuU2w){: .align-center}
&lt;화면 1. 프로젝트 구조&gt;
{: style="text-align: center;"}




## A. 참조
spring.io, "Core Features", *docs.spring.io*, [Online]. Available: [https://docs.spring.io/spring-boot/docs/current/reference/html/features.html](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html) [Accessed Jun. 16, 2022].