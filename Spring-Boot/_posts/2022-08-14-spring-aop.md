---
title: '[Spring Boot] 스프링 AOP(Aspect Oriented Programming)'
uml: true
author_profile: true
toc_label: '[Spring Boot] 스프링 AOP(Aspect Oriented Programming)'
---

## 1. AOP란?
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

### 1.1. OOP vs AOP
- OOP
    - 비즈니스 로직 모듈화
- AOP
    - 인프라, 부가 기능 모듈화

### 1.2. AOP 장점
- 핵심 로직과 부가 기능 명확한 분리 가능
- 핵심 로직 유지보수 용이
- 코드 가독성 증가

### 1.3. AOP 구현체
- 자바
    - AspectJ
    - 스프링 AOP
- 그 외

## 2. AOP 적용 방식
AOP 적용 방식은 자바 프로그램 실행 단계 중 어느 시점에 적용하는가에 따라 분류됩니다.

- 컴파일 시점
    - 컴파일러를 통해 .java 파일을 .class 바이트 파일로 변환하는 시점에 부가 기능 로직을 추가하는 방식
    - AspectJ가 제공하는 특별한 컴파일러를 사용해야 함
        - 컴파일러 의존, 복잡함 문제
    - 모든 지점에 적용 가능
- 클래스 로딩 시점
    - .class 파일이 JVM 런타임 데이터 영역에 로딩되기 전 조작을 통해 부가 기능 로직을 추가하는 방식
    - 특별한 옵션, 클래스 로더 조작기 지정 필요
        - 운영하기 다소 어려움
    - 모든 지점에 적용 가능
- **런타임 시점**
    - 자바 프로그램 실행 후 런타임 중 부가 기능 로직을 추가하는 방식
    - **스프링이 사용하는 방식**
    - 프록시를 통해 부가 기능 적용
        - 프록시는 메서드 오버라이딩 개념으로 동작하기 때문에 메서드에만 적용 가능
        - 런타임 시 메모리를 할당한 스프링 빈에만 적용 가능
    - 스프링만 있으면 AOP 적용 가능하다는 장점

스프링 AOP는 AspectJ 문법을 차용하고 프록시 방식의 AOP를 제공합니다. 스프링에서는 AspectJ가 제공하는 어노테이션이나 관련 인터페이스만 사용할 뿐, 실제 AspectJ가 제공하는 컴파일, 로드타임 위버 등은 사용하지 않습니다. 따라서 스프링 AOP는 AspectJ를 직접 사용하는 것은 아닙니다.
{: .notice--info}

## 3. AOP 구현 개념 및 용어
- Aspect
    - 흩어진 관심사를 모아 모듈화한 것
    - Advice, Point Cut을 포함하는 추상적 개념
- Target
    - Aspect가 가진 Advice가 적용되는 대상
    - 클래스, 메서드 등
    - Point Cut을 통해 지정
- Advice
    - 부가적 관점에서 수행되는 실제 로직을 구현한 구현체
        - 특정 조인 포인트에서 Aspect에 의해 실행되는 로직
- Join Point
    - Aspect가 가진 Advice가 적용될 시점 명시
    - 메서드 실행 시점, 생성자 호출 시점, 필드 값 접근 시점 등
    - **스프링 AOP는 프록시 방식 사용 → 조인 포인트는 항상 메서드 실행 지점**
- Point Cut
    - Join Point 중 Aspect가 가진 Advice가 적용될 위치(대상) 명시
        - 패키지 - 클래스 - 메서드 계층 순으로
    - Point Cut 표현식 사용
- AOP 프록시
    - AOP 기능을 구현하기 위해 만든 프록시 객체
    - 스프링에서 AOP 프록시는 JDK 동적 프록시 또는 CGLIB 프록시임
        - 기본값은 CGLIB

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-14T19:18:06.240Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;2xU8dABfeJ_4E1H7r_Sq\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;CWEb5NlUKF_vKZSTqJmS\&quot; name=\&quot;그림 1. 스프링 AOP 개요\&quot;&gt;7Zpbc9sqEIB/jWfah2YkoZsfHbc5nc5kekmnfexQQSzOwUJFyJf++oKELAlwTjK149Sp/GBrBQvstwss8gTMl5t/OCzza4YwnQQe2kzA60kQ+IE3lV9Ksm0lqQ9awYITpAv1ghvyE2uhp6U1QbgaFRSMUUHKsTBjRYEzMZJBztl6XOyW0XGrJVxgS3CTQWpLvxIkcj2KIOnlbzFZ5F3LfqwHvIRdYT2SKoeIrQci8GYC5pwx0f5abuaYKuN1dmnrXe15uusYx4W4TwWafCs/sNXnf+OP2dW6+PJuOsOvtJYVpLUe8HuOMJ+zQnBGKea672LbGYSzukBY6fQn4HKdE4FvSpipp2vpAlKWiyXVj28JpXNGGW/qAs9LoedJeSW1/4dHT6KkeXIrWx7Ib5tLy7V3+LG81/3GXODNXoP4OzNL/8RsiQXfyiK6AtBgtGf6qb5f95z9WMvyEWMthNq3FjvVvfnlD03gATQCN40bzFdEWvh8UQTpk2MB3Cw+4ZJVRDDdwnniiMInhyO0cHD8o8aV8F+8/E0Shv322nlMzJ+pj4sY8EMQhYchsbNyR2LqIOE5SIBjgYj2gQieFYggOjWIxALB1AR11hTC4KmFQ2pRyHJYLPCzwnD6YJhaGCq4Om8IsblnOnksdIv/gEJdIiieF4fTB0Ngc7jeztBTziEUASKz7hkli0IKBSuPk1mA5L5b2fBoeOyk+wMjcjiBN6/FHYS8o0VKjNIkDp2RMotC4B8q4R6zCD0Hi+BRI8XOuGETJ9dY5Aydd24RpNEYR+jAET0qDjvpvri4sBDIIYuxnaGeNjI5dMwd88mSIKSqX3JckZ/we6NKxVOpIq8ZR3Q5iV4rXbWQGX7LzEJQsAIbvDpRj1oZ3UR91VwHiiMjPQ/jyAIXOrgdb0azs3MLGi7QTJ3HKkoUVhXJxgjH0xyCVb4LsoeZFiPrRNcwrOwXq3mG7zFHC8gXWNxRMHGTGpBwRVAn45hCQVbj/rrw6Ba6daLbhxtJKUgNwu04da1gcDZsKIp8Q5EZ4q0dLEWSKNwOiulo2t/hxPBcPzKcr9XYu+LOpr/hnfaRxXPxzukpvTOa7tl6PdQ7Y/M4MomO4p2J8UYgHL9ROZJ3xg7vjKnQnjRRr7Y6Z4p/1Opt0WWzw1bXUDRw506oFLxq17KZLODH5aYp2leKF+pb+5FuVg6jbbl9+Mctv66d1i4KlfwKLglVjL9gjmABD3QoYsxtILBX5eRRd1P22dRfz/oTPcucl07uWZ3iu1bUB6etDtv9j+m1pzqpHcDsxp5od0owsHrqPNcx17l72F3e9v8EaJeW/v8U4M0v&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. 스프링 AOP 개요&gt;
{: style="text-align: center;"}

## 4. 스프링 AOP
- 스프링 AOP는 프록시 기반의 AOP를 구현하여 사용함
    - 스프링 빈에만 AOP 적용 가능
    - 모든 AOP 기능 지원 X
    - 스프링 IoC와 연동하여 엔터프라이즈 어플리케이션에서 가장 흔한 문제(중복 코드, 프록시 클래스 작성 번거로움, 객체 간 관계 복잡도 증가 등)를 해결하기 위한 솔루션 제공 목적

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-15T05:01:14.888Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;xPbFNPRABIKswQSm0m_J\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;V8q6GD6n67UfsBubKR32\&quot; name=\&quot;그림 2. 프록시 패턴\&quot;&gt;7Zhbb9owFMc/TR4n5Q48FtoOaZtUDU3THk18SLyamDoOl3362cS5maSlVbqWbbzgc2wf2+f/wznE8mbr/UeONskXhoFaro33lndtua7j2hP5pTyHwjN2vMIRc4L1oNqxIL9AO23tzQmGrDVQMEYF2bSdEUtTiETLhzhnu/awFaPtVTcohhPHIkL01PudYJHoU7ij2j8HEiflyk6oD7xG5WB9kixBmO0aLu/G8macMVG01vsZUJW8Mi/FvNue3mpjHFJxzoQs//Rjv30IA7zKwvjbZy+eTz/oKFtEc31gyw2pjDddykasGjNK1AraLeNXPfpc4lAmi7M8xaDWs2X3LiECFhsUqd6dxEP6ErGm0nJkc8VScYvWhCoy5kC3IEiEdIcGwQmVTSidMcr4cRFvtYIwiqQ/E5zdQ6MHjyZL2642tgUuYN+bLafSQMILbA2CH+SQckIJ4KHkUdu7mgKnlDZpEBBqH9LgxVXoWhvZ0PI8Qyq3V6psg9KWEOFDzgqBGq1CsplrXU1JKoCvlDDSnE4ryXmtrAHBIl/+VD+vTgr6ZstRxdbeEhccwBj7XbiM3aUXhsPg4r07XPxBcGlNKXx3nO0PvRJfOgvHCHpbzgBgVNe/BsMN3hqMYEgwqlvgKyB6qv7/a+NxOnz7vdEx6qDDyD+k+EpVVtKKKMoyErVT3tbnfAGk3UizffxUaQZ8UqcZSZZ7ZDmP4OlqRyAeg3jqUXsqWkOUoEOT0seBIkG27e12CaVXuGNE1VfVo8QzmPANrYtj6lnNgs8MNDaeSRMjUJGHk0BHbqpjvxyl8bNQWlIW3Uu5patJhTRviVr3CNNFUOYPRpkTDoOUOzKQcl+IlG+yaQbqQUqKjA6NYRs1IHtkwwa65d/BXtTNA7bHy0axg0H5nvyjfAfvjm/zpns53wZHjvc6fPvhBfBd/qX5O2uBc2/p4E1rAb+tu2fWfWeD7T4R6JVrAafr7cWfqet7UGrW+ylLYZiC3riISrNJS1c5X/HyjHpemvXLw0Kn+hWsd/Mb&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 2. 프록시 패턴&gt;
{: style="text-align: center;"}

- 프록시 패턴의 장점
    - 기존 코드 변경 없이 접근 제어 또는 부가 기능 추가 가능

### 4.1. 프록시 객체 직접 구현 AOP

<p class=short>[Client] - AppRunner</p>

```java
@Component
public class AppRunner implements ApplicationRunner {
    @Autowired
    EventService eventService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        eventService.createEvent();
        eventService.publishEvent();
        eventService.deleteEvent();
    }
}
```

<p class=short>[Interface - Subject] - EventService</p>

```java
public interface EventService {
    void createEvent();
    void publishEvent();
    void deleteEvent();
}
```

<p class=short>[Real Subject] - SimpleEventService</p>

```java
@Service
public class SimpleEventService implements EventService {

    @Override
    public void createEvent() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Created an event");
    }

    @Override
    public void publishEvent() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Published an event");
    }

    @Override
    public void deleteEvent() {
        System.out.println("Deleted an event");
    }
}
```

<p class=short>[Proxy] - ProxySEService</p>

```java
@Primary
@Service
public class ProxySEService implements EventService {
    @Autowired
    SimpleEventService simpleEventService;

    @Override
    public void createEvent() {
        long begin = System.currentTimeMillis();
        simpleEventService.createEvent();
        System.out.println(System.currentTimeMillis()-begin);
    }

    @Override
    public void publishEvent() {
        long begin = System.currentTimeMillis();
        simpleEventService.publishEvent();
        System.out.println(System.currentTimeMillis()-begin);
    }

    @Override
    public void deleteEvent() {
        simpleEventService.deleteEvent();
    }
}
```

- `@Primary`는 같은 타입의 빈이 여러 개 등록될 수 있는 상황일 때 해당 클래스를 우선적으로 등록하겠다는 의미
- 프록시 객체는 실제 객체(`simpleEventService`)에 대한 참조를 가지고 있음

<p class=short>실행 결과</p>

```txt
Created an event
1001
Published an event
2011
Deleted an event
```

- 프록시 객체 `ProxySEService`를 통해 Real Subject인 `SimpleEventService` 코드를 수정하지 않고 부가 기능인 메서드 수행 시간 측정 코드를 추가할 수 있음

### 4.2. 스프링 AOP
- 프록시를 여러 클래스, 여러 메서드에 적용해야 한다면?
    - 매번 프록시 클래스를 작성해야 하는 번거로움
    - 프록시 클래스 내 중복 코드 발생 가능성

→ 스프링 IoC 컨테이너 기술과 동적 프록시 기법을 사용해 위 문제를 해결할 수 있음

동적 프록시란 어플리케이션 런타임 중 동적으로 프록시 객체를 생성하는 것을 말합니다.
{: .notice--info}

<p class=short>의존성 추가</p>

```txt
implementation 'org.springframework.boot:spring-boot-starter-aop'
```

<p class=short>Aspect 클래스 작성</p>

```java
package maemi.dr.aoptest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class PerfAspect {

    @Around("execution(* maemi.dr..*.EventService.*(..))")
    public Object logPerf(ProceedingJoinPoint pjp) throws Throwable {
        long begin = System.currentTimeMillis();
        Object retVal = pjp.proceed();
        System.out.println(System.currentTimeMillis()-begin);
        return retVal;
    }
}
```

- @Aspect
    - 해당 클래스가 Aspect 클래스임을 명시
    - @Component를 통해 빈으로 등록해야 함
- ProceedingJoinPoint
    - 조인 포인트를 제어할 수 있는 객체
    - 스프링 AOP에서 조인 포인트는 AOP를 적용할 메서드 자체임
- @Around
    - Advice 동작 로직을 정의하는 어노테이션 중 하나
- execution
    - Point Cut 표현식
    - maemi.dr.aoptest 패키지 하위 EventService 객체의 모든 메서드에 해당 Advice를 적용하라는 의미

<p class=short>실행 결과</p>

```txt
Created an event
1027
Published an event
2011
Deleted an event
0
```

## A. 참조
Sunwoo Han, "스프링 AOP 총정리 : 개념, 프록시 기반 AOP, @AOP," *Github.io*, Apr. 27, 2021. [Online]. Available: [https://yadon079.github.io/2021/spring/spring-aop-core](https://yadon079.github.io/2021/spring/spring-aop-core) [Accessed Aug. 14, 2022].

backtony, "Spring - AOP 총정리," *Velog.io*, Jun. 18, 2022. [Online]. Available: [https://velog.io/@backtony/Spring-AOP-총정리](https://velog.io/@backtony/Spring-AOP-총정리) [Accessed Aug. 14, 2022].
