---
title: '[Spring Boot] Annotation 동작 원리와 사용법'
uml: true
author_profile: true
toc_label: '[Spring Boot] Annotation 동작 원리와 사용법'
post-order: 100
---

## 1. 어노테이션(Annotation)이란?
- 사전 상 주석의 의미이지만, Java에서는 주석 이상의 기능을 가짐
- 자바 소스코드에 추가하여 사용할 수 있는 메타데이터의 일종
    - 클래스와 메서드에 추가하여 다양한 기능 부여

### 사용 이점
- 코드 길이 감소
- 유지보수 용이
- 생산성 증가
- OOP의 장점 활용
    - 캡슐화
        - Built-in 어노테이션을 사용해 자바나 스프링 어플리케이션 개발 시 상세 구현 내용을 알지 않아도 쉽게 사용할 수 있음
    - ISP
        - 모듈 자신이 필요한 인터페이스들을 적재 적소에 사용할 수 있음

Built-in 어노테이션이란 자바에서 기본적으로 제공하는 어노테이션으로, 컴파일러 경고 및 에러를 생성하여 코드를 형식에 맞게 제한하는 기능을 수행합니다. @Override, @Deprecated, @SuppressWarning, @SafeVarargs, @FunctionalInterface, @Native 등이 있습니다.
{: .notice--info}

### 용도
1. 컴파일러에게 코드 작성 문법 에러 체크
2. SW 개발툴이 빌드나 배치 시 코드 자동 생성
3. 런타임 시 특정 기능을 실행하도록 정보 제공

Spring에서 제공하는 대부분의 어노테이션이 3번 용도로 사용되고 있습니다.

## 2. 어노테이션 정의 방법
```java
@Target({<ElementType>})
@Retention(<RetentionPolicy>)
public @interface <어노테이션 이름> {
    ...
}
```

<p class=short>어노테이션을 정의하는데 필요한 것은 세가지입니다.</p>

- @Target - 어노테이션 적용 대상
- @Retention - 어노테이션 유지 범위
- 어노테이션 이름 - Class가 아닌 @interface로 정의된 어노테이션 이름

사용자 정의 어노테이션을 생성할 때 사용하는 `@Target`, `@Retention`과 같은 어노테이션을 메타 어노테이션이라 합니다.

메타 어노테이션의 종류로 이외에 @Documented, @Inherited, @Repeatable 등이 있습니다.
{: .notice--info}

### @Target
- 자바 컴파일러가 해당 어노테이션이 어디에 적용할지 결정하기 위해 사용

Java 8 공식 문서에 따르면 @Target의 인자로 전달할 ElementType의 Enum 값을 다음과 같이 정의하고 있습니다.

ElementType 값 | 의미(적용 대상)
:---------- | ---------------
TYPE | 클래스, 인터페이스, 열거형
FIELD | 필드(클래스 변수, 인스턴스 변수)
LOCAL_VARIABLE | 지역 변수
PARAMETER | 인자
METHOD | 메서드
CONSTRUCTOR | 생성자
PACKAGE | 패키지
ANNOTATION_TYPE | 어노테이션
TYPE_PARAMETER | 타입 인자(?)
TYPE_USE | 타입(?)

### @Retention
- 해당 어노테이션이 적용되어 유지되는 범위 결정

Java 8 공식 문서에 따르면 @Retention의 인자로 전달할 RetentionPolicy의 Enum 값을 다음과 같이 정의하고 있습니다.

RetentionPolicy 값 | 의미(유지 범위)
:----------------- | ------------
SOURCE | 소스코드(.java)에만 반영되고 컴파일러에 의해 삭제됨
CLASS | 컴파일러에 의해 클래스 파일에 기록된 후 런타임에 삭제 됨
RUNTIME | 컴파일러에 의해 클래스 파일에 기록되고 런타임까지 유지

## 3. Spring @Controller 어노테이션 분석
스프링 MVC 패턴에서 흔히 사용하는 @Controller 어노테이션 또한 앞서 설명한 어노테이션 작성 방법에 따라 정의되어 사용됩니다.

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Controller {
    @AliasFor(annotation = Component.class)
    String value() default "";
}
```

- @interface
    - 자바 컴파일러에게 해당 클래스가 어노테이션을 정의함을 명시
- @Documented
    - JavaDoc 문서 생성 시 현재 어노테이션의 존재를 표기함을 명시
- @AliasFor
    - 해당 어노테이션의 Element에 별칭을 부여
        - 별칭을 부여하면 해당 Element가 다음 중 하나로 동작하도록 명시함
            - 해당 어노테이션 내 다른 Element의 값으로 사용될 수 있음
            - **다른 어노테이션의 동일한 이름의 Element의 값으로 사용될 수 있음**
                - 오버라이딩 개념처럼 보임
- String value() default "";
    - Element 선언 문법이라고 함
    - 해당 어노테이션은 String 타입을 가지는 value라는 이름의 Element를 가지며, 기본값은 빈 문자열 "" 임

## A. 참조
도비랑, "[Spring 프로젝트] Annotation 동작 원리와 사용법," *Tistory*, Dec. 7, 2020. [Online]. Available: [https://hirlawldo.tistory.com/43](https://hirlawldo.tistory.com/43) [Accessed Aug. 20, 2022].

Developer PAPER, "Springboot in depth understanding the role of @ alias for annotation," *developerpaper.com*, Sep. 16, 2020. [Online]. Available: [https://developpaper.com/springboot-in-depth-understanding-the-role-of-alias-for-annotation/](https://developpaper.com/springboot-in-depth-understanding-the-role-of-alias-for-annotation/) [Accessed Aug. 21, 2022].

이승현, "자바 어노테이션의 모든것 - (1)," *Tistory*, Jul. 4, 2015. [Online]. Available: [https://hamait.tistory.com/314](https://hamait.tistory.com/314) [Accessed Aug. 21, 2022].

비달사쑨, "[JAVA]어노테이션(Annotation) - 2," *Tistory*, Sep. 24, 2019. [Online]. Available: [https://sassun.tistory.com/146](https://sassun.tistory.com/146) [Accessed Aug. 21, 2022].

melonicedlatte, "스프링(Spring)에서 자주 사용하는 Annotation 개념 및 예제 정리," *melonicedlatte.com*, Jul. 18, 2021. [Online]. Available: [https://melonicedlatte.com/2021/07/18/182600.html](https://melonicedlatte.com/2021/07/18/182600.html) [Accessed Aug. 20, 2022].
