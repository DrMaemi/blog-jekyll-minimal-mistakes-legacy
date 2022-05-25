---
title: '[Spring Boot] 9. 회원가입 시 아이디 중복 검사(Ajax, JPA)'
author_profile: true
toc_label: '[Spring Boot] 9. 회원가입 시 아이디 중복 검사(Ajax, JPA)'
post-order: 9
---

사용자가 DB에 이미 존재하는 아이디로 회원가입을 시도할 경우 이를 사전에 확인할 수 있도록 아이디 중복 검사 기능을 구현할 것이다. 아이디 중복 검사 기능은 사용자가 웹페이지를 보는 상태에서 원할 때 비동기적으로 처리해야 하기 때문에 비동기 웹 통신에 사용되는 Ajax를 사용한다.

비동기 처리의 개념 이해와 자바스크립트 코드 사용법에 대해서는 본 포스트에서 자세히 다루지 않을 것이다. 대신 [포스트](https://realrain.net/post/async-await/)를 참조하자.

## 비동기 처리 예제
본격적으로 회원가입 아이디 중복 검사 기능을 구현하기 전에 자바스크립트를 이용해 어떻게 비동기 처리를 구현할 수 있는지 예제를 통해 확인해보고자 했다. 간단하게 사용자 ID를 입력받으면 해당 사용자의 이메일 주소를 알 수 있는 웹페이지를 비동기 처리로 구현해봤다. 비동기 처리는 바닐라 자바스크립트, fetch(), async-await 구문 순으로 변천사를 가졌는데 모던 자바스크립트에서는 async-await 구문을 사용하는 것을 권장한다.

### 바닐라 자바스크립트
```html::lineons
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ajax 테스트</title>
<style type="text/css"> span { color: blue } </style>
</head>
<body>
<h1>Ajax GET Test</h1>
User ID : <input type="text" id="inputId">
<button id="ajaxCall">검색</button>
<h2><span id="calledUserId"></span>의 이메일 주소는 <span id="calledUserEmail"></span>입니다.</h2>
<script>
    document.getElementById("ajaxCall").addEventListener('click', () => {
        var xhr = new XMLHttpRequest();
        var inputUserId = document.getElementById('inputId').value;

        xhr.open('GET', 'http://localhost:8080/api/user/'+inputUserId);
        xhr.responseType = 'json';
        xhr.send();

        xhr.onload = () => {
            if (xhr.status == 200) {
                var res = xhr.response;
                document.getElementById('calledUserId').innerText = res.id;
                document.getElementById('calledUserEmail').innerText = res.email;
            } else {
                alert('Request Error : '+res);
            }
        };
    });
</script>
</body>
</html>
```

### WebAPI fetch()
```html::lineons
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ajax 테스트</title>
<style type="text/css"> span { color: blue } </style>
</head>
<body>
<h1>Ajax GET Test</h1>
User ID : <input type="text" id="inputId">
<button id="ajaxCall">검색</button>
<h2><span id="calledUserId"></span>의 이메일 주소는 <span id="calledUserEmail"></span>입니다.</h2>
<script>
    document.getElementById("ajaxCall").addEventListener('click', () => {
        var inputUserId = document.getElementById('inputId').value;
        fetch('http://localhost:8080/api/user/'+inputUserId)
        .then(res => res.json())
        .then(data => {
            document.getElementById('calledUserId').innerText = data.id;
            document.getElementById('calledUserEmail').innerText = data.email;
        })
    });
</script>
</body>
</html>
```

### async-await 구문
```html::lineons
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ajax 테스트</title>
<style type="text/css"> span { color: blue } </style>
</head>
<body>
<h1>Ajax GET Test</h1>
User ID : <input type="text" id="inputId">
<button id="ajaxCall">검색</button>
<h2><span id="calledUserId"></span>의 이메일 주소는 <span id="calledUserEmail"></span>입니다.</h2>
<script>
    document.getElementById("ajaxCall").addEventListener('click', async () => {
        var inputUserId = document.getElementById('inputId').value;
        const res = await fetch('http://localhost:8080/api/user/'+inputUserId);
        const userDto = await res.json();
        document.getElementById('calledUserId').innerText = await userDto.id;
        document.getElementById('calledUserEmail').innerText = await userDto.email;
    });
</script>
</body>
</html>
```

### 테스트
![](https://drive.google.com/uc?export=view&id=14LM46uypQFvoB3Mjn9A31kBFkU_-_Rqe){: .align-center}
&lt;비동기 테스트 1. 사용자 ID 입력 전&gt;

![](https://drive.google.com/uc?export=view&id=1z7aWKyglppeuxEt9NK1OhY-o250gEuRb){: .align-center}
&lt;비동기 테스트 2. ID 입력 및 검색 버튼 클릭 후&gt;

사실, html 파일을 작성한 뒤 바로 테스트했을 때 ERROR 200 오류를 발생시켰다. 어플리케이션 URL로 GET 요청 시 오류가 발생하고 있었는데, 확인해보니 스프링부트 어플리케이션이 CORS를 허용하지 않아 발생한 문제였다. 나는 분명 CORS를 허용한 걸로 이해하고 있었는데, 알고보니 CORS 허용을 위해 스프링 시큐리티에 추가적으로 CORS 요청에 대한 리소스 관리 로직을 구현하는 구현체가 필요했다.

CORS란 Cross Origin Resource Sharing의 약자로, 말 그대로 다른 출처의 리소스를 공유하는 것이다. 출처는 URL 구성요소 중 Protocol, Host, Port를 합친 것이다. 그 중 하나라도 다르다면 다른 출처로 인식한다.
{: .notice--info}

## 스프링 시큐리티 CORS 설정
[지난 포스트]({{site.url}}/application/web/spring-boot/7-login/#스프링-시큐리티와-기본-로그인-폼을-이용한-로그인-기능-구현)에서 작성했던 `SecurityConfig.java` 파일에서 `CorsConfigurationSource` 인터페이스를 구현하는 구현체 코드를 스프링 빈으로서 작성하고, CORS 예비 요청(PreflightRequest) 방식에 대해 허용한다.

<div markdown="1">
CORS는 단순 요청(SimpleRequest) 방식과 예비 요청(PreflightRequest) 방식이 있다. 두 방식 모두 서버의 응답 헤더의 Access-Control-Allow-Origin을 통해 CORS 정책 위반 여부를 확인하여 요청을 전달한다. 단순 요청 방식은 본 요청을 바로 보내고 서버의 응답 헤더를 확인하는 반면 예비 요청 방식은 `OPTION` 메서드로 예비 요청을 먼저 보낸 후 응답 헤더를 확인한 다음 본 요청을 보내는 방식이다.
</div>
{: .notice--info}

```java:/src/main/java/maemi.dr.SpringDemo.config.SecurityConfig
package maemi.dr.SpringDemo.config;

import lombok.AllArgsConstructor;
import maemi.dr.SpringDemo.service.UserAuthService;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration // 자바 기반의 Config 명시
@EnableWebSecurity // 시큐리티 필터가 등록
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private UserAuthService userAuthService;

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
                    .defaultSuccessUrl("/"); // 로그인에 성공하면 해당 경로로 리디렉션
    }
}

```

- **requestMatchers(CorUtils::isPreFlightRequest).permitAll()**
    - SpringSecurity 모듈은 기본적으로 모든 인증되지 않은 요청에 401 Error를 반환함
    - CORS 인증 헤더가 없는 예비 요청에 대해 접근 가능하도록 설정
    - 클라이언트에서 인증 이슈가 아닌 CORS 이슈임을 확인할 수 있음

이제 비동기 처리를 위한 환경 구성과 예제 실습까지 마쳤으니 본격적으로 회원가입 시 아이디 중복 검사 기능을 구현해보자.

## UserService
웹페이지에서 사용자가 입력한 아이디가 DB에 있는지 여부를 판단하는 메서드인 `isExistId()`를 다음과 같이 작성한다.

```java:/src/main/java/maemi.dr.SpringDemo.service.UserService
...

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    ...

    @Transactional
    public boolean isExistId(String id) {
        return userRepository.existsById(id);
    }
}

```

JpaRepository 인터페이스의 기본 메서드인 `existsById()`를 이용해 전달받은 아이디가 DB에 있는지 유무를 판단하여 boolean 자료형으로 true/false 값을 반환한다.

## UserRestController
아이디 중복 유무에 대한 HTTP 요청은 페이지를 렌더링할 필요가 없기 때문에 RESTful API로서 구현한다. 따라서 사용자와 관련된 로직을 처리하는 `UserRestController` 클래스에 `/api/user/exist/{id}` 요청을 받았을 때 중복 유무에 대해 true/false 값을 전달하는 메서드 `isExistId()`를 다음과 같이 작성한다.

```java:/src/main/java/maemi.dr.SpringDemo.controller.UserRestController
...

@RestController
@AllArgsConstructor
public class UserRestController {
    UserService userService;

    ...

    @GetMapping("/api/user/exist/{id}")
    public boolean isExistId(@PathVariable String id) {
        return userService.isExistId(id);
    }
}

```

## join.html
여기까지 완료했다면 이제 회원가입 페이지에 비동기 처리를 위한 자바스크립트를 작성하면 된다. 솔직히 위에서 실습한 대로 작성하면 금방 해결될 줄 알았는데 웹페이지가 의도대로 동작해주지 않았다.

### 왜 submit 버튼을 누르지 않았는데 POST /user/join 요청이 발생하나
중복확인 버튼을 만들고 중복확인 버튼을 클릭하지 않으면 회원가입 요청을 시도할 수 없도록 버튼 클릭 시 회원가입 버튼에 `disable` 속성을 제거/추가하는 코드를 추가하여 다음과 같이 `join.html`을 작성하고 테스트를 진행했다.

```html:/src/main/resources/templates/user/join.html:lineons
<!DOCTYPE html>
<html lang="ko" xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/extras/spring-security">
<head>
  <meta name="viewport" content="width=device-width" initial-scale="1" charset="UTF-8">
  <link rel="stylesheet" type="text/css" th:href="@{/css/bootstrap.css}"/>
  <title>스프링부트 게시판 웹사이트</title>
  <style>
    .not_valid { color: red }
  </style>
</head>
<body>
<div th:insert="/common/header.html" id="header"></div>
<div class="container">
  <div class="col-lg-4"></div>
  <div class="col-lg-4">
    <div class="jumbotron" style="padding-top: 20px;">
      <form method="post" action="/user/join">
        <h3 style="text-align: center;">회원가입</h3>
        <div class="form-group">
          아이디 <span th:text="${valid_id}" class="not_valid"></span>
          <input type="text" class="form-control" placeholder="아이디" id="userId" name="id" th:value="${userDto.getId()}" maxlength="20">
          <button id="checkDuplicateId">중복확인</button>
          <span id="isDuplicated"></span>
        </div>
        <div class="form-group">
          비밀번호 <span th:text="${valid_password}" class="not_valid"></span>
          <input type="password" class="form-control" autocomplete="off" placeholder="비밀번호" name="password" th:value="${userDto.getPassword()}" maxlength="20">
        </div>
        <div class="form-group">
          이름 <span th:text="${valid_name}" class="not_valid"></span>
          <input type="text" class="form-control" placeholder="이름" name="name" th:value="${userDto.getName()}" maxlength="20">
        </div>
        <div class="form-group" style="text-align: center;">
          <div class="btn-group" data-toggle="buttons">
            <label th:if="${userDto.getGender() == 'male'}" class="btn btn-primary active">
              <input type="radio" name="gender" autocomplete="off" value="male" checked>남자
            </label>
            <label th:unless="${userDto.getGender() == 'male'}" class="btn btn-primary">
              <input type="radio" name="gender" autocomplete="off" value="male">남자
            </label>
            <label th:if="${userDto.getGender() == 'female'}" class="btn btn-primary active">
              <input type="radio" name="gender" autocomplete="off" value="female" checked>여자
            </label>
            <label th:unless="${userDto.getGender() == 'female'}" class="btn btn-primary">
              <input type="radio" name="gender" autocomplete="off" value="female">여자
            </label>
          </div>
        </div>
        <div th:text="${valid_gender}" style="text-align: center;" class="not_valid"></div>
        <div class="form-group">
          이메일 <input type="email" class="form-control" placeholder="이메일" name="email" th:value="${userDto.getEmail()}" maxlength="50">
          <span th:text="${valid_email}" class="not_valid"></span>
        </div>
        <input type="submit" class="btn btn-primary form-control" id="submit" disabled value="가입">
      </form>
    </div>
  </div>
  <div class="col-lg-4"></div>
</div>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script th:src="@{/js/bootstrap.js}"></script>
<script>
  console.log('is printed? 1');
  document.getElementById("checkDuplicateId").addEventListener('click', async () => {
    console.log('is printed? 2');
    var inputUserId = document.getElementById('userId').value;
    console.log('is printed? 3');
    const res = await fetch('http://localhost:8080/api/user/exist/'+inputUserId);
    const isDuplicated = await res.json();
    console.log('is printed? 4');

    if (isDuplicated) {
      document.getElementById('isDuplicated').innerText = "중복된 아이디가 있습니다.";
    } else {
      document.getElementById('isDuplicated').innerText = "사용 가능한 아이디입니다.";
      document.getElementById('submit').removeAttribute('disabled');
    }
  });
</script>
</body>
</html>
```

![](https://drive.google.com/uc?export=view&id=1ukzEk69t9G1-n22226sQXThUcdTbojn8){: .align-center}
&lt;테스트 1. 중복검사 버튼을 클릭했는데 회원가입 정보가 전달되어 유효성 검사를 진행한 모습&gt;
{: style="text-align: center;"}

웹페이지에서 아이디 중복검사 버튼을 클릭하면 중복검사에 대한 메세지만 비동기적으로 표시되어야 하는데 아예 입력 정보 전체가 컨트롤러에게 전달되어 유효성 검사를 수행한 모습이다. 크롬 브라우저에서 `F12`로 콘솔을 확인해봐도 `is printed? 1`만 출력되어 있었다.

현상을 좀 더 관찰해보니 중복검사 버튼을 클릭하면 순간적으로 아이디 중복 여부 메세지가 출력되면서 콘솔에 `is printed? 4`까지 출력되고, 곧바로 화면이 렌더링되면서 콘솔에도 `is printed? 1`까지만 출력됨을 확인했다. 의도치 않게 입력 정보가 `form`으로 submit되는 현상인 것으로 추측했다.

### form의 기본 동작 submit 실행을 중지시키는 로직 추가
검색을 통해 알아보니 브라우저는 웹페이지에서 이벤트가 감지된 경우 브라우저가 HTML 각 요소의 기본 동작을 수행하도록 하는 기본 이벤트가 설정되어 있는데, `<form>`의 경우 기본 동작이 `submit`이기 때문에 중복검사 버튼을 클릭하는 이벤트가 발생한 경우 `<form>` 내부 `<input>` 상자에 입력된 값들이 자동으로 `submit`되는 것이 문제였다. 이를 해결하기 위해서 다음과 같이 로직을 수행하도록 설계했다.

1. 중복검사 버튼을 클릭했을 때 브라우저의 기본 동작을 수행하지 않도록 설정
2. 중복검사 기능을 비동기 처리
3. 비동기 처리가 끝난 후 브라우저가 기본 동작을 수행하도록 설정

*(1)*, *(3)* 기능에 대한 코드가 추가되어야 하는데, 이는 위에서 작성한 `join.html`의 비동기 처리를 위한 자바스크립트 코드에서 람다 함수가 전달받는 이벤트 객체와 이벤트 객체의 기본 이벤트 수행 여부를 결정한은 필드 `returnValue`의 값을 변경해주면 된다.

```html:/src/main/resources/templates/user/join.html
...
<script>
  document.getElementById("checkDuplicateId").addEventListener('click', async e => {
    e.preventDefault(); // e.returnValue = false; 와 같음
    var inputUserId = document.getElementById('userId').value;
    const res = await fetch('http://localhost:8080/api/user/exist/'+inputUserId);
    const isDuplicated = await res.json();

    if (isDuplicated) {
      document.getElementById('isDuplicated').innerText = "중복된 아이디가 있습니다.";
    } else {
      document.getElementById('isDuplicated').innerText = "사용 가능한 아이디입니다.";
      document.getElementById('submit').removeAttribute('disabled');
    }
    e.returnValue = true;
  });
</script>
...
```

![](https://drive.google.com/uc?export=view&id=1B9GRXe-2db040LId71wBYGsgY-ZSii0V){: .align-center}
&lt;테스트 2. 중복검사 버튼 클릭 정상 동작&gt;
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1Tz0-py7AbGS9nkyO-MAPiTCm26ulCpxc){: .align-center}
&lt;테스트 3. 중복검사 완료 후 일부 정보 입력 누락 후 가입 시도&gt;
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1oYL8cmqDVSpgFIggrFnmtI85lZl-JI6x){: .align-center}
&lt;테스트 4. 유효성 검사 정상 동작, 그러나 중복검사를 다시 해야 함&gt;
{: style="text-align: center;"}

&lt;테스트 3&gt;, &lt;테스트 4&gt;를 보면 중복검사 후 회원가입 버튼이 정상적으로 활성화되며 유효성 검사까지 정상적으로 동작함을 확인할 수 있지만, 유효성 검사 후에 다시 중복검사를 해야되는 것을 알 수 있다. 이런 불편함을 없애려면 마지막으로 입력된 아이디에 대한 정보를 모델에 담아 뷰가 알 수 있도록 하면서 해당 아이디에 대한 중복 검사 유무에 대한 정보를 같이 알고 있도록 구현하면 될 것 같다.

## A. 참조
realrain, "Javascript 비동기 처리의 이해", *realrain.net*, May 14, 2021. [Online]. Available: [https://realrain.net/post/async-await/](https://realrain.net/post/async-await/)

오리엔탈킴, "순수 (바닐라) JavaScript로 AJAX Get/Post 구현 (JSON 응답/요청)", *Tistory*, Dec. 10, 2021. [Online]. Available: [https://kim-oriental.tistory.com/12](https://kim-oriental.tistory.com/12) [Accessed May 25, 2022].

nana_kim, "fetch() 함수 사용법(3)", *Velog.io*, Nov. 29, 2020. [Online]. Available: [https://velog.io/@nana_kim/fetch-함수-사용법3](https://velog.io/@nana_kim/fetch-함수-사용법3) [Accessed May 25, 2022].

Daleseo, "[자바스크립트] 비동기 처리 3부 - async/await", *dalesoe.com*, Dec. 1, 2018. [Online]. Available: [https://www.daleseo.com/js-window-fetch/](https://www.daleseo.com/js-window-fetch/) [Accessed May 25, 2022].

디비드킴, "Spring boot 회원가입 만들기!(2) 아이디중복검사 with ajax", *Tistory*, Jun. 13, 2021. [Online]. Available: [https://cordingmonster.tistory.com/33](https://cordingmonster.tistory.com/33) [Accessed May 25, 2022].

헤일리_HJ, "210511 (회원가입) 아이디 중복 체크", *Tistory*, May 11, 2021. [Online]. Available: [https://dukdukz.tistory.com/entry/210511-회원가입-아이디-중복-체크](https://dukdukz.tistory.com/entry/210511-회원가입-아이디-중복-체크) [Accessed May 25, 2022].

도뎡이, "스프링 부트(Spring Boot) JPA 게시판 - 비동기(Ajax) 페이징(Paging) 및 검색(Search) - 페이지 번호 & 검색 조건 (이전 페이지 정보) 유지하기(With. MySQL)", *Tistory*, Jan. 24, 2022. [Online]. Available: [https://congsong.tistory.com/60](https://congsong.tistory.com/60)

toycoms, "Spring Security CORS", *Tistory*, Jun. 2, 2020. [Online]. Available: [https://toycoms.tistory.com/37](https://toycoms.tistory.com/37) [Accessed May 25, 2022].

