---
title: '[Spring Boot] 10. Security 로그인 실패 메세지 출력'
uml: true
toc_label: '[Spring Boot] 10. Security 로그인 실패 메세지 출력'
post-order: 10
---

[지난 포스트]({{site.url}}/application/web/spring-boot/7-login/)에서 커스텀 로그인 폼을 이용한 로그인 기능 구현까지 해봤는데, 정확한 정보를 입력하면 로그인에 성공하는 기능은 구현했지만 입력된 정보가 일치하지 않거나 기타 문제 때문에 로그인에 실패한 경우 이를 처리하기 위한 기능을 구현하진 않았다. 이 때문에 사용자는 로그인에 실패했어도 아무런 메세지나 알림을 보지 못한 채 동일한 로그인 페이지만 보게 될 것이고 이는 안좋은 UX이기 때문에 로그인 실패 처리 기능을 구현해보자.

## 프로젝트 구조
![](https://drive.google.com/uc?export=view&id=1iJjZA3xNbeb4S6wAlkg_GvG4SFI4GXDu){: .align-center}
&lt;화면 1. 프로젝트 구조&gt;
{: style="text-align: center;"}

이번 포스트에서는 &lt;화면 1&gt;의 프로젝트 구조에서 파란 색과 빨간 색으로 표시된 파일들에 대해서 다룬다.

## GET 방식의 @RequestParam을 이용해 메세지 전달
처음 이 로그인 실패 처리 기능을 구현할 때 로그인 실패 시 사용자가 입력된 정보가 로그인 화면에 유지되지 않고 전부 날아가도록 redirect 방식(웹페이지 간 이동 방식 중 하나) 처리를 구현하는 방법을 사용했다. 후에 사용자가 입력한 정보가 로그인 화면에 유지되면 편리하겠다는 생각이 들어 코드를 수정했는데, 포스트에서는 두 가지 방법을 모두 다루어 서로 어떻게 다른지 살펴보고자 한다.

### LoginFailureHandler
스프링 시큐리티를 통한 사용자 인증에 실패한 경우 이에 대한 처리 로직을 구현하는 구현체가 필요하다. 이 구현체는 스프링 시큐리티 필터가 사용하게 된다. [지난 포스트]({{site.url}}/application/web/spring-boot/7-login/#스프링-시큐리티와-기본-로그인-폼을-이용한-로그인-기능-구현)에서 작성한, `WebSecurityConfigurerAdapter`를 상속하는 `SecurityConfig`에서 `configure(HttpSecurity)` 메서드를 오버라이딩하여 스프링 시큐리티 필터 체인(Filter Chain)의 동작 대상(URL 요청에 따른)과 설정을 개발자가 정의했다. 여기에 추가로 이제 작성할 `LoginFailureHandler` 객체를 주입하여 로그인 실패 시 처리 로직을 수행하도록 구현한다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-05-28T12:43:17.450Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36\&quot; etag=\&quot;ztKPMFj5zEsPzKRHa3Aj\&quot; version=\&quot;18.1.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;KK9Dc77ho3uvVCHNatc1\&quot; name=\&quot;Authentication Failure\&quot;&gt;7Vptb5s6FP41SLsfWoEhpHzMS3t7pTtpWnS1j5MDJ2DNYGZMQvbrZ2LznqxptzRpb1DVwMF+fM6xfZ7HUQx7Fhd/c5xGH1kA1EBmUBj23EDozh3J/6Vhqwwjz1WGkJNAmazGsCA/QBtNbc1JAFmnoWCMCpJ2jT5LEvBFx4Y5Z5tusxWj3VFTHMLAsPAxHVq/kEBEOiw0buyPQMKoGtlyPfUmxlVjHUkW4YBtWib73rBnnDGh7uJiBrTMXZUX1e/hwNvaMQ6JOKYDL7JNErqh/9lZ5sX26/zTjN5olDWmuQ7YQC6VeNO0dFlsdR7c73np5zTGPCSJYU/MtKgfbwRLpcnZmQQU4gZTEpatfOkbcGltEORdqD9345CWAccSZ0qHT/+UMCvsQ23udukgyhSQ/ihLPrBUhkkuIukm8bEgLHnAhOYcHnESUOAtyGUfQNrSvi3iZdaqRVyFbB2O/jlZprASdZoPQw5DvTxP5Z/Jkr2Z//Arr0+QrizFyV7UTUQE3MjXctXZk3KrcTiEZCDb6yZcwaoGj0KkC+BrCuIzfM8hEwaavfMws5QlGbTiPG5Zvs3Iuwv5vvAhLW/+D6H/tT8k1BkWrYGX2aETxQvzHWFMNUvMVTRTJlut6I4iV0RSlz1dsURoSWAh/fyAY0JLMfEIdA0lalnNREzLRvXY5YBQHGRKq+ZfqVuAxSD4VjbRHRwXqS5as1i2pvBNowAsT8NGbfZ3dUOsVUdYYzfELG80Nz+DpxE6O1HXBLggcUrhP06vzHmpnr7t7eeYne1n79l+yEbD7Xd3qt3n7JPJvRxDEkzK84Z8WlLmf5O5CHAWQaATI98/7NI6N9VTO7OtBHKWJ8Gul6lTPmOUya05D2CFc9pMMASDo0svxdJBlnMfjigsQq4/EE+dFIZz1i6JVfXjQGVFWHed2zcpGu4TI9LtZv49uzv/Zm9eVVC6V/vE0wNyR08AqaAHQLs1Usf4G8vm/EX7qNMVXmaCY3l4/vOHqy+wXICfcyK2M5asSCgZgk8CnIorRZzK06n6OkQl+0NrBg5otZO7oA4G5/Whq1U+4gSHwKc5oQHw96hha836Cw2LRuZraljHPns5bDRsuRyrmnQtRFet+uJt5l2aVnVepFUvVJ5WNeNJeaq01qvoU8vrllbHe6E+lUC39tjxqms87uI63q3Xuu5eV7y6z1pHLAW5P9/EkaeS5Rd05BmNektq/MIlNbaeADr1qhlfDsf/yyTU9Vupy/H0TTO941i3o159PjvX370rrh8fWZfR63E9crtzbjvmrdm6eoDHluk+LPK6VO/9oaItH5sfGKjmza807Puf&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. `WebSecurityConfigurerAdapter`, `AuthenticationFailureHandler` 관계&gt;
{: style="text-align: center;"}

```java:/src/main/java/maemi.dr.SpringDemo.config.auth.LoginFailureHandler:lineons
package maemi.dr.SpringDemo.config.auth;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Getter @Setter
public class LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        System.out.println("In LoginFailureHandler.onAuthenticationFailure(),");
        String errorMessage;
        if (exception instanceof BadCredentialsException) {
            errorMessage = "아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해 주세요.";
        } else if (exception instanceof InternalAuthenticationServiceException) {
            errorMessage = "내부적으로 발생한 시스템 문제로 인해 요청을 처리할 수 없습니다. 관리자에게 문의하세요.";
        } else if (exception instanceof UsernameNotFoundException) {
            errorMessage = "계정이 존재하지 않습니다. 회원가입 진행 후 로그인해주세요.";
        } else if (exception instanceof AuthenticationCredentialsNotFoundException){
            errorMessage = "인증 요청이 거부되었습니다. 관리자에게 문의하세요.";
        } else {
            errorMessage = "알 수 없는 이유로 로그인에 실패하였습니다. 관리자에게 문의하세요.";
        }
        request.setAttribute("error", true);
        request.setAttribute("errorMessage", errorMessage);
        System.out.println("request.getAttribute('userId'): "+request.getAttribute("userId"));
        System.out.println("request.getParameter('userId'): "+request.getParameter("userId"));
        System.out.println("request.getAttribute('userPassword'): "+request.getAttribute("userPassword"));
        System.out.println("request.getParameter('userPassword'): "+request.getParameter("userPassword"));
        System.out.println("request.getAttribute('error'): "+request.getAttribute("error"));
        System.out.println("request.getParameter('error'): "+request.getParameter("error"));
        System.out.println("request.getAttribute('errorMessage'): "+request.getAttribute("errorMessage"));
        System.out.println("request.getParameter('errorMessage'): "+request.getParameter("errorMessage"));
        setDefaultFailureUrl("/user/login?error=true&errorMessage="+errorMessage);
        super.onAuthenticationFailure(request, response, exception);
    }
}

```

- **HttpServletRequest**
    - 웹페이지로부터 전달된 Request 값(사용자 입력 데이터)을 가지고 있는 객체
- **HttpServletResponse**
    - 출력을 정의할 수 있는 객체
- **AuthenticationException**
    - 로그인 실패 정보(실패 종류, 메세지)를 가지고 있는 객체

- **setDefaultFailureUrl(URL)**
    - super.onAuthenticationFailure()를 호출할 때 요청할 URL 설정

- **super.onAuthenticationFailure(request, response, exception)**
    - 기본 요청 방식인 redirect 방식으로 사전에 설정된 URL에 HTTP 요청 수행

코드를 살펴보면 `onAuthenticationFailure()`가 발생시킨 Exception 종류에 따라 사용자에게 전달할 에러 메세지를 정한다. Spring Security가 제공하는 사용자 인증 필터 관련 Exception 종류는 다음과 같다.

Exception | 설명
--- | ---
BadCredentialException | 비밀번호가 일치하지 않음
InternalAuthenticationServiceException | 존재하지 않는 아이디
AuthenticationCredentialNotFoundException | 인증 요구가 거부됨
LockedException | 잠긴 계정
DisabledException | 비활성화된 계정
AccountExpiredException | 유효 기간이 만료된 계정
CredentialExpiredException | 유효 기간이 만료된 비밀번호
{: .align-center}

### SecurityConfig
```java:/src/main/java/maemi.dr.SpringDemo.config.SecurityConfig:lineons
package maemi.dr.SpringDemo.config;

import lombok.AllArgsConstructor;
import maemi.dr.SpringDemo.service.UserAuthService;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity // 시큐리티 필터가 등록
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private UserAuthService userAuthService;
    private final AuthenticationFailureHandler loginFailureHandler;

    @Bean // 비밀번호 암호화를 위해 사용, 어플리케이션에서 해당 객체가 한 개만 필요하므로 스프링 빈으로 등록
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /*
    스프링 시큐리티가 어플리케이션의 유저 인증 로직에서 유저의 아이디와 비밀번호를 가로채 인증 진행
    유저가 회원가입했을 때 해쉬화한 암호화 인코더와 동일한 인코더를 사용하여 DB 내 유저 정보와 비교
    */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userAuthService).passwordEncoder(passwordEncoder());
    }

    // 정적 자원에 대해서는 Security 설정을 적용하지 않음.
    @Override
    public void configure(WebSecurity web) {
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Non-browser client를 위한 disable. disable 하지 않으면 Postman과 같은 테스트 플랫폼에서 GET을 제외한 API 호출이 막히게 된다.
                .cors() // Front와 Back 도메인이 다른 경우 CORS 허용
                .and() // 그리고
                .authorizeRequests() // 인가(Authorization) 요청 수신 시
                    .requestMatchers(CorsUtils::isPreFlightRequest).permitAll() // CORS 예비 요청 방식 허용
                    .antMatchers("/api/**", "/").permitAll() // 일반적인 ant 패턴 URL을 감지하여 정책 적용
                    .mvcMatchers("/user/**").permitAll() // MVC 패턴의 URL을 감지하여 정책 적용
                    .mvcMatchers("/board/**").hasRole("USER")
                    .mvcMatchers("/manage/**").hasRole("ADMIN") // ROLE_로 시작되는 경우 java.lang.IllegalArgumentException: role should not start with 'ROLE_' since it is automatically inserted 오류 발생
                    .anyRequest().authenticated() // 다른 모든 요청은 인증이 된 후에 접근 가능
                .and() // 그리고
                    .formLogin() // 로그인 폼 사용
                    .loginPage("/user/login") // 커스텀 로그인 페이지 경로 .html
                    .loginProcessingUrl("/user/loginAction") // 해당 Url로 전달되는 로그인 정보를 스프링 시큐리티가 가로채 인증 진행
                    .usernameParameter("userId") // <input> 태그의 name 속성의 값이 userId인 데이터를 가로챔
                    .passwordParameter("userPassword") // <input> 태그의 name 속성의 값이 userPassword인 데이터를 가로챔
                    .defaultSuccessUrl("/") // 로그인에 성공하면 해당 경로로 리디렉션
                    .failureHandler(loginFailureHandler);
    }
}

```

- **.failureHandler(Handler)**
    - 사용자가 로그인에 실패할 경우 처리 로직을 구현한 구현체를 Spring Security Filter Chain에 적용

### UserController
```java:/src/main/java/maemi.dr.SpringDemo.controller.UserController
...

@Controller
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @GetMapping("/user/login")
    public String login(
            @RequestParam(value="error", required=false) boolean error,
            @RequestParam(value="errorMessage", required=false) String errorMessage,
            HttpServletRequest request,
            Model model
    ) {
        System.out.println("UserController GET /user/login called.");
        System.out.println("request.getAttribute(\"userId\"): "+request.getAttribute("userId"));
        System.out.println("request.getParameter(\"userId\"): "+request.getParameter("userId"));
        System.out.println("request.getAttribute(\"userPassword\"): "+request.getAttribute("userPassword"));
        System.out.println("request.getParameter(\"userPassword\"): "+request.getParameter("userPassword"));
        System.out.println("request.getAttribute('error'): "+request.getAttribute("error"));
        System.out.println("request.getParameter('error'): "+request.getParameter("error"));
        System.out.println("request.getAttribute('errorMessage'): "+request.getAttribute("errorMessage"));
        System.out.println("request.getParameter('errorMessage'): "+request.getParameter("errorMessage"));
        model.addAttribute("error", error);
        model.addAttribute("errorMessage", errorMessage);
        return "/user/login";
    }

    ...
}

```

스프링 컨트롤러의 URL 매핑 메서드는 `HttpServletRequest` 객체를 인자로 전달받아 해당 URL로의 요청 객체에 대해 접근할 수 있다.

### login.html
```html:/src/main/resources/templates/user/login.html:lineons
<!DOCTYPE html>
<html lang="ko" xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/extras/spring-security">
<head>
  <meta name="viewport" content="width=device-width" initial-scale="1" charset="UTF-8">
  <link rel="stylesheet" type="text/css" th:href="@{/css/bootstrap.css}"/>
  <title>스프링부트 게시판 웹사이트</title>
</head>
<body>
<div th:insert="/common/header.html" id="header"></div>
<div class="container">
  <div class="col-lg-4"></div>
  <div class="col-lg-4">
    <div class="jumbotron" style="padding-top: 20px;">
      <form method="post" action="/user/loginAction">
        <h3 style="text-align: center;">로그인</h3>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="아이디" name="userId" maxlength="20">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="비밀번호" name="userPassword" id="userPassword" maxlength="20">
        </div>
        <div th:if="${error}" th:text="${errorMessage}" class="alert alert-danger"></div>
        <input type="submit" class="btn btn-primary form-control" value="로그인">
      </form>
    </div>
  </div>
  <div class="col-lg-4"></div>
</div>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script th:src="@{/js/bootstrap.js}"></script>
</body>
</html>
```

22번 라인에 타임리프 if 구문을 사용하지 않으면 로그인 페이지에 접속했을 때 실패 메세지가 `null`이어도 붉은 영역이 생긴다.

### 테스트
로그인 페이지에 접속하여 올바르지 않은 사용자 정보를 입력하여 로그인을 시도해봤다.

<p class=short>콘솔 출력 내용</p>

```txt
In LoginFailureHandler.onAuthenticationFailure(),
request.getAttribute('userId'): null
request.getParameter('userId'): test
request.getAttribute('userPassword'): null
request.getParameter('userPassword'): test
request.getAttribute('error'): true
request.getParameter('error'): null
request.getAttribute('errorMessage'): ���̵� �Ǵ� ��й�ȣ�� ���� �ʽ��ϴ�. �ٽ� Ȯ���� �ּ���.
request.getParameter('errorMessage'): null
UserController GET /user/login called.
request.getAttribute("userId"): null
request.getParameter("userId"): null
request.getAttribute("userPassword"): null
request.getParameter("userPassword"): null
request.getAttribute('error'): null
request.getParameter('error'): true
request.getAttribute('errorMessage'): null
request.getParameter('errorMessage'): ??? ?? ????? ?? ????. ?? ??? ???.
```

`LoginFailureHandler`에서 전달받은 데이터는 `request.getParameter()`로 접근할 수 있고 `UserController`로 전달하고 싶은 데이터 `error`와 `errorMessage`는 `.setAttribute()`를 이용해서 요청 객체에 저장한 뒤 `/user/login?error=true&errorMessage=` URL로 HTTP 요청을 수행하면 UserController는 URL에 대응되는 메서드 `.login()`를 실행한다. 이 때 요청 객체 `request`에 있던 정보는 모두 삭제되고 URL에 명시되어 전달된 파라미터인 `error`와 `errorMessage`에만 `.getParameter()`로 접근 가능한 것을 확인할 수 있다. 한 편 GET 요청 파라미터로 전달된 사용자 로그인 실패 메세지 `errorMessage`는 인코딩에서 문제가 있는 것으로 보인다.

![](https://drive.google.com/uc?export=view&id=1m_k1WZr7yrlRyqcHYxsUlZyPBe03Hi57){: .align-center}
&lt;테스트 1. URL로 전달된 메세지 인코딩 문제와 메세지 화면&gt;
{: style="text-align: center;"}

????? 뭐지?

![](https://drive.google.com/uc?export=view&id=1NMK8Pmu8yoL8h0pgxS--smSDZGkYKgqX){: .align-center}

검색해보니 서블릿 엔진의 기본 인코딩 방식(예를 들면 ISO-8859-1)이 한글을 제대로 인코딩하지 못해 발생하는 문제였다. 이는 `LoginFailureHandler.onAuthenticationFailure()` 에 다음 코드를 추가하여 해결할 수 있다.

```java
errorMessage = URLEncoder.encode(errorMessage, "UTF-8");
```

![](https://drive.google.com/uc?export=view&id=1IwssPUajQkokCSX06XBjbux0e7YujlSc){: .align-center}
&lt;테스트 2. 인코딩 문제 해결&gt;
{: style="text-align: center;"}

<p class=short>콘솔 출력 내용</p>

```txt
In LoginFailureHandler.onAuthenticationFailure(),
request.getAttribute('userId'): null
request.getParameter('userId'): test
request.getAttribute('userPassword'): null
request.getParameter('userPassword'): test
request.getAttribute('error'): true
request.getParameter('error'): null
request.getAttribute('errorMessage'): %EC%95%84%EC%9D%B4%EB%94%94+%EB%98%90%EB%8A%94+%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8%EA%B0%80+%EB%A7%9E%EC%A7%80+%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4.+%EB%8B%A4%EC%8B%9C+%ED%99%95%EC%9D%B8%ED%95%B4+%EC%A3%BC%EC%84%B8%EC%9A%94.
request.getParameter('errorMessage'): null
UserController GET /user/login called.
request.getAttribute("userId"): null
request.getParameter("userId"): null
request.getAttribute("userPassword"): null
request.getParameter("userPassword"): null
request.getAttribute('error'): null
request.getParameter('error'): true
request.getAttribute('errorMessage'): null
request.getParameter('errorMessage'): ���̵� �Ǵ� ��й�ȣ�� ���� �ʽ��ϴ�. �ٽ� Ȯ���� �ּ���.
```

콘솔의 한글 인코딩 문제는 그대로인 것을 보니 IntelliJ의 설정을 변경해야하는 문제로 추측된다.

## request 정보를 유지하여 로그인 실패 시 사용자가 입력한 정보를 유지하도록 구현
사용자가 로그인에 실패했을 때 [지난 포스트]({{site.url}}/application/web/spring-boot/8-join-validation/#테스트)처럼 사용자가 입력한 정보가 입력 상자에 그대로 유지될 수 있도록 구현하기 위해서는 웹페이지 간 이동 방식 중 forward 방식으로 HTTP 요청을 해야 한다.

### LoginFailureHandler
```java:/src/main/java/maemi.dr.SpringDemo.config.auth.LoginFailureHandler:lineons
package maemi.dr.SpringDemo.config.auth;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Getter @Setter
public class LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        System.out.println("In LoginFailureHandler.onAuthenticationFailure(),");
        String errorMessage;

        if (exception instanceof BadCredentialsException) {
            errorMessage = "아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해 주세요.";
        } else if (exception instanceof InternalAuthenticationServiceException) {
            errorMessage = "내부적으로 발생한 시스템 문제로 인해 요청을 처리할 수 없습니다. 관리자에게 문의하세요.";
        } else if (exception instanceof UsernameNotFoundException) {
            errorMessage = "계정이 존재하지 않습니다. 회원가입 진행 후 로그인해주세요.";
        } else if (exception instanceof AuthenticationCredentialsNotFoundException){
            errorMessage = "인증 요청이 거부되었습니다. 관리자에게 문의하세요.";
        } else {
            errorMessage = "알 수 없는 이유로 로그인에 실패하였습니다. 관리자에게 문의하세요.";
        }

        request.setAttribute("error", true);
        request.setAttribute("errorMessage", errorMessage);
        System.out.println("request.getAttribute('userId'): "+request.getAttribute("userId"));
        System.out.println("request.getParameter('userId'): "+request.getParameter("userId"));
        System.out.println("request.getAttribute('userPassword'): "+request.getAttribute("userPassword"));
        System.out.println("request.getParameter('userPassword'): "+request.getParameter("userPassword"));
        System.out.println("request.getAttribute('error'): "+request.getAttribute("error"));
        setDefaultFailureUrl("/user/login");
        setUseForward(true);
        super.onAuthenticationFailure(request, response, exception);
    }
}

```

- **setUseForward(boolean)**
    - `.onAuthenticationFailure()` 메서드에서 기본(default) 페이지 전환 방식인 redirect 대신 forward 방식을 사용함을 명시

### SecurityConfig
위에서 기술한 코드와 동일

### UserController
기존 로그인 로직에서 `/user/login`에서 사용자가 입력한 정보를 POST 방식으로 `/user/loginAction`에 전달할 때 Spring Security가 사용자 정보를 가로채어 인증 절차를 진행한다고 했었다. 이 때 로그인 실패 시 `.onAuthenticationFailure()`에서 forward 방식으로 페이지 전환을 하기 때문에 지난 요청 방식인 POST 방식으로 `AuthenticationFailureHandler` 객체의 멤버 변수 `defaultFailureUrl` URL에 요청하게 된다. 따라서 `POST /user/login` 요청에 해당하는 메서드를 구현하면 된다.

```java:/src/main/java/maemi.dr.SpringDemo.controller.UserController:lineons
package maemi.dr.SpringDemo.controller;

import lombok.AllArgsConstructor;
import maemi.dr.SpringDemo.dto.UserDto;
import maemi.dr.SpringDemo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Controller
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @GetMapping("/user/login")
    public String login() {
        System.out.println("UserController GET /user/login called.");
        return "/user/login";
    }

    @PostMapping("/user/login")
    public String login(HttpServletRequest request) {
        System.out.println("UserController POST /user/login called.");
        System.out.println("request.getAttribute(\"userId\"): "+request.getAttribute("userId"));
        System.out.println("request.getParameter(\"userId\"): "+request.getParameter("userId"));
        System.out.println("request.getAttribute(\"userPassword\"): "+request.getAttribute("userPassword"));
        System.out.println("request.getParameter(\"userPassword\"): "+request.getParameter("userPassword"));
        System.out.println("request.getAttribute('error'): "+request.getAttribute("error"));
        System.out.println("request.getParameter('error'): "+request.getParameter("error"));
        System.out.println("request.getAttribute('errorMessage'): "+request.getAttribute("errorMessage"));
        System.out.println("request.getParameter('errorMessage'): "+request.getParameter("errorMessage"));
        return "/user/login";
    }

    @GetMapping("/user/join")
    public String join(UserDto userDto) {
        return "/user/join";
    }

    @PostMapping("/user/join")
    public String join(@Valid UserDto userDto, Errors erros, Model model) {
        if (erros.hasErrors()) {
            // 회원가입 실패 시 입력된 데이터 유지
            model.addAttribute("userDto", userDto);

            Map<String, String> validatorResult = this.validateHandling(erros);
            for (String key: validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }

            return "/user/join";
        }

        userService.joinUser(userDto);
        return "redirect:/user/login";
    }

    public Map<String, String> validateHandling(Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();

        for (FieldError error: errors.getFieldErrors()) {
            String validKeyName = String.format("valid_%s", error.getField());
            validatorResult.put(validKeyName, error.getDefaultMessage());
        }

        return validatorResult;
    }
}

```

### login.html
타임리프 문법을 통해 해당 페이지를 요청할 때 전달받은 데이터를 요청 객체 request에 접근하여 가져온다.

```html:/src/main/resources/templates/user/login.html:lineons
<!DOCTYPE html>
<html lang="ko" xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/extras/spring-security">
<head>
  <meta name="viewport" content="width=device-width" initial-scale="1" charset="UTF-8">
  <link rel="stylesheet" type="text/css" th:href="@{/css/bootstrap.css}"/>
  <title>스프링부트 게시판 웹사이트</title>
</head>
<body>
<div th:insert="/common/header.html" id="header"></div>
<div class="container">
  <div class="col-lg-4"></div>
  <div class="col-lg-4">
    <div class="jumbotron" style="padding-top: 20px;">
      <form method="post" action="/user/loginAction">
        <h3 style="text-align: center;">로그인</h3>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="아이디" name="userId" maxlength="20" th:value="${#request.getParameter('userId')}">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="비밀번호" name="userPassword" id="userPassword" maxlength="20" th:value="${#request.getParameter('userPassword')}">
        </div>
        <div th:if="${#request.getAttribute('error')}" th:text="${#request.getAttribute('errorMessage')}" class="alert alert-danger"></div>
        <input type="submit" class="btn btn-primary form-control" value="로그인">
      </form>
    </div>
  </div>
  <div class="col-lg-4"></div>
</div>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script th:src="@{/js/bootstrap.js}"></script>
</body>
</html>
```

- **${#request.getParameter(param)}, ${#request.getAttribute(attr)}**
    - 현재 페이지를 요청할 때 요청 객체 request에 저장했던 데이터에 대해 타임리프 문법으로 접근 가능

### 테스트
로그인 페이지에 접속하여 올바르지 않은 사용자 정보를 입력하여 로그인을 시도해봤다.

<p class=short>콘솔 출력 내용</p>

```txt
In LoginFailureHandler.onAuthenticationFailure(),
request.getAttribute('userId'): null
request.getParameter('userId'): test
request.getAttribute('userPassword'): null
request.getParameter('userPassword'): test
request.getAttribute('error'): true
request.getParameter('error'): null
request.getAttribute('errorMessage'): ���̵� �Ǵ� ��й�ȣ�� ���� �ʽ��ϴ�. �ٽ� Ȯ���� �ּ���.
request.getParameter('errorMessage'): null
UserController POST /user/login called.
request.getAttribute("userId"): null
request.getParameter("userId"): test
request.getAttribute("userPassword"): null
request.getParameter("userPassword"): test
request.getAttribute('error'): true
request.getParameter('error'): null
request.getAttribute('errorMessage'): ���̵� �Ǵ� ��й�ȣ�� ���� �ʽ��ϴ�. �ٽ� Ȯ���� �ּ���.
request.getParameter('errorMessage'): null
```

redirect 방식과 달리 forward 방식의 웹페이지 전환은 기존 요청 정보를 그대로 가지기 때문에 이를 이용해 웹페이지에 사용자의 입력 정보를 유지시킬 수 있다. 위 콘솔에 출력된 것을 보면 `POST /user/login`에 해당하는 메서드에서 요청 객체에 들어있는 사용자 정보 `userId`와 `userPassword`에 접근했을 때 사용자가 입력한 정보가 그대로 남아있음을 확인할 수 있다.

![](https://drive.google.com/uc?export=view&id=1SStcpYtSoGqBNv29FLJJd41bpQCfH0bD){: .align-center}
&lt;테스트 3. 로그인 실패 시 입력된 정보가 그대로 유지됨 + URL이 바뀌지 않음&gt;
{: style="text-align: center;"}

forward 전환 방식은 브라우저 상 URL이 바뀌지 않는다. URL을 보면 `/user/loginAction`으로 표시되어 있는데, 이는 사용자가 입력한 정보를 `/user/loginAction` 페이지로 전달하면서 POST 요청한 것이 마지막 요청이기 때문이다. 결과적으로 기능이 잘 동작함을 확인할 수 있다.

이후 올바른 정보를 입력하여 로그인 시도 시 정상적으로 로그인 됨을 확인할 수 있다.

![](https://drive.google.com/uc?export=view&id=1PjiXOq7sXODr2fHngKpT392NyGZPIEzS){: .align-center}
&lt;테스트 4. 로그인 실패 후 정상적으로 로그인 가능&gt;
{: style="text-align: center;"}

### 의문
스프링 시큐리티 로그인 로직에 대한 의문으로, 첫 로그인 페이지 접속 시에도 `UserController`의 `GET /user/login` 요청에 해당하는 메서드의 출력문이 콘솔에서 확인되지 않았다. 그러면 해당 메서드를 구현하지 않아도 기능이 정상적으로 동작할까? 싶어서 주석처리하고 서버를 구동했는데 로그인 페이지 접속 시 500 에러를 발생시켰다. 스프링 시큐리티 이론에 대한 공부를 더 해야 할 듯하다..

또, forward 방식으로 웹페이지를 전환할 때 `POST /user/login` 메서드를 컨트롤러에 구현하지 않아도 경고 `WARN 14156 --- [nio-8080-exec-3] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'POST' not supported]`를 발생시키고 이후 알아서 `GET /user/login`으로 요청을 전달한다. 스프링 프레임워크의 기능인 건지.. 참 편리하지만 편리한만큼 내부 구조에 대한 이해가 필요해보인다.

## A. 참조
coco3o, "Spring Boot 게시판 Security 로그인 실패시 메시지 출력하기", *Tistory*, Dec. 21, 2021. [Online]. Available: [https://dev-coco.tistory.com/126#--%--user-login-mustache](https://dev-coco.tistory.com/126#--%--user-login-mustache) [Accessed May 27, 2022].

todyDev, "Spring Security - 로그인 실패 후 부가 작업", *Tistory*, Jan. 4, 2019. [Online]. Available: [https://to-dy.tistory.com/92](https://to-dy.tistory.com/92) [Accessed May 27, 2022].

더블에스, "Redirect VS, Forward(Redirect와 forward의 차이)", *Tistory*, Jan. 22, 2017. [Online]. Available: [https://doublesprogramming.tistory.com/63](https://doublesprogramming.tistory.com/63) [Accessed May 28, 2022].

코데방, "스프링 Security_로그인_로그인 실패 대응 로직 [3/9]", *Tistory*, Mar. 28, 2020. [Online]. Available: [https://codevang.tistory.com/268](https://codevang.tistory.com/268) [Accessed May 28, 2022].

tmdgh0221, "스프링 시큐리티 기본편 정리", *Velog.io*, Mar. 1, 2021. [Online]. Available: [https://velog.io/@tmdgh0221/스프링-시큐리티-기본편-정리](https://velog.io/@tmdgh0221/스프링-시큐리티-기본편-정리)

밀당하는It, "페이지출력, 페이지전환 및 특정 url로 재 요청을 해주는 RequestDispatcher 의 request.getRequestDispatcher()/forward() / HttpServletResponse의 responsesendRedirect()", *Tistory*, Aug. 30, 2020. [Online]. Available: [https://u-it.tistory.com/entry/페이지출력-페이지전환-및-특정-url로-재-요청-을-해주는-RequestDispatcher-의-requestgetRequestDispatcherforward-HttpServletResponse의-responsesendRedirect](https://u-it.tistory.com/entry/페이지출력-페이지전환-및-특정-url로-재-요청-을-해주는-RequestDispatcher-의-requestgetRequestDispatcherforward-HttpServletResponse의-responsesendRedirect) [Accessed May 28, 2022].

yangdongjue5510, "REDIRECT와 FORWARD의 차이!!", *Github,io*, Jan. 23, 2022. [Online]. Available: [https://yangdongjue5510.github.io/2021/11/29/spring/boot/boot13/](https://yangdongjue5510.github.io/2021/11/29/spring/boot/boot13/) [Accessed May 28, 2022].

cjhol2107, "[WEB] GET 방식과 POST 방식 개념, 요청 파라미터와 인코딩", *blog.naver.com*, Jan. 5, 2020. [Online]. Available: [https://m.blog.naver.com/cjhol2107/221760895968](https://m.blog.naver.com/cjhol2107/221760895968) [Accessed May 28, 2022].

Ethan, "url 인코딩, 디코딩", *blog.naver.com*, Jan. 25, 2011. [Online]. Available: [https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=kjwoo97&logNo=90105429751](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=kjwoo97&logNo=90105429751) [Accessed May 29, 2022].
