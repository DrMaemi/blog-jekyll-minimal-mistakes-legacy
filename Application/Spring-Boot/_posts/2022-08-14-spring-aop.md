---
title: '[Spring Boot] 스프링 AOP(Aspect Oriented Programming)'
uml: true
author_profile: true
toc_label: '[Spring Boot] 스프링 AOP(Aspect Oriented Programming)'
post-order: 100
---

## 1. 스프링 AOP
- Aspect Oriented Programming의 약자, 관점 지향 프로그래밍을 의미
- 관점 지향이란 프로그램 로직을 핵심 관점, 부가적 관점으로 나누고 각 관점을 기준으로 모듈화한다는 뜻
    - 핵심 관점
        - 비즈니스 로직
    - 부가적 관점
        - 비즈니스 로직에 중복적으로 나타나는 어떤 과정
        - 로깅, 인증 및 보안, 트랜잭션 처리 등
- 흩어진 관심사(Croscutting Concerns)를 모아 모듈화
    - 흩어진 관심사
        - 부가적 관점을 처리하는 소스코드

## 2. AOP 구현 개념 및 용어
- Aspect
    - 흩어진 관심사를 모아 모듈화한 것
    - Advice, Point Cut을 포함함
- Target
    - Aspect가 가진 Advice가 적용되는 대상
    - 클래스, 메서드 등
- Advice
    - 부가적 관점에서 수행되는 실제 로직을 구현한 구현체
- Join Point
    - Aspect가 가진 Advice가 적용될 시점 명시
    - 주로 메서드 실행 시점임
- Point Cut
    - Aspect가 가진 Advice가 적용될 위치 명시
        - 패키지 - 클래스 - 메서드 계층 순으로
    - Point Cut 표현식 사용


## A. 참조
Sunwoo Han, "스프링 AOP 총정리 : 개념, 프록시 기반 AOP, @AOP," *Github.io*, Apr. 27, 2021. [Online]. Available: [https://yadon079.github.io/2021/spring/spring-aop-core](https://yadon079.github.io/2021/spring/spring-aop-core) [Accessed Aug. 14, 2022].

backtony, "Spring - AOP 총정리," *Velog.io*, Jun. 18, 2022. [Online]. Available: [https://velog.io/@backtony/Spring-AOP-총정리](https://velog.io/@backtony/Spring-AOP-총정리) [Accessed Aug. 14, 2022].
