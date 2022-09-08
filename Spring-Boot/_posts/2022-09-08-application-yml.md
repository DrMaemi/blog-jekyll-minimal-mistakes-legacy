---
title: '[Spring Boot] application.yml 분리, import'
uml: true
author_profile: true
toc_label: '[Spring Boot] application.yml 분리, import'
---

스프링부트 어플리케이션 설정 파일인 `application.yml`에서 DB 연결 정보 등 보안 상 민감한 정보들을 따로 분리해서 구성하는 방법이 궁금했습니다.

관련 내용은 스프링부트 공식 문서의 [External Application Properties](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.files)에서 관련 내용을 찾아볼 수 있었습니다.

본문에서는 제가 분리 및 import에 성공한 세팅에 대해서 간단히 다룹니다.

## 기존 application.yml

```yml:application.yml:lineons
spring:
  h2:
    console:
      enabled: true
      path: /h2-console
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:tcp://localhost/~/test
    username: sa
    password:
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update
    properties:
      hibernate.format_sql: true

server:
  port: 8081
```

## .yml 분리 및 import 구조

![](https://drive.google.com/uc?export=view&id=1HV0hguhxWxXq5y1nslfxO6b6zOU3-vfD){: .align-center}
&lt;화면 1. application.yml 최종 구조&gt;
{: style="text-align: center;"}

```yml:application.yml:lineons
spring:
  config:
    import:
      - config/h2-local.yml
      - config/jpa.yml
      - config/server.yml
```

```yml:h2-local.yml:lineons
spring:
  h2:
    console:
      enabled: true
      path: /h2-console
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:tcp://localhost/~/test
    username: sa
    password:
```

```yml:jpa.yml:lineons
spring:
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: none
    properties:
      hibernate.format_sql: true
```

```yml:server.yml:lineons
server:
  port: 8081
```

공식 문서에 따르면 spring.config.import에 경로를 작성할 때 classpath, optional, file 등의 prefix를 사용하는 것으로 보입니다만, 파일 존재 유무에 따른 optional의 동작 기능이 필요한 때를 제외하면 본문처럼 작성하는 것이 코드 길이가 짧아지기에 더 좋은 것 같습니다.

## A. 참조
VMWare, Inc, "2.3. External Application Properties", *docs.spring.io*, [Online]. Available: [https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.files](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.files) [Accessed Sep. 8, 2022].

최고영희, "Spring Boot - using external yaml file (spring.config.import)," *Tistory*, Mar. 2, 2021. [Online]. Available: [https://kimyhcj.tistory.com/431](https://kimyhcj.tistory.com/431) [Accessed Sep. 8, 2022].
