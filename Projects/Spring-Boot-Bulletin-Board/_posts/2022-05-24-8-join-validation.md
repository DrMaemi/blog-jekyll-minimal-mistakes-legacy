---
title: '[Spring Boot] 8. 회원가입 시 유효성 검사'
author_profile: true
toc_label: '[Spring Boot] 8. 회원가입 시 유효성 검사'
post-order: 8
---

## 유효성 검사란
유효성 검사는 요청한 데이터가 어플리케이션이 사전에 정의한 어떤 조건에 충족하는지 확인하는 작업이다. 예를 들어 이메일 주소는 `user@example.com`과 같은 형식으로 요청되어야 하는데 `@`가 없거나 다른 기호이거나 영문이 아니면 이메일 주소가 될 수 없다.

이런 유효성 검사는 어느 지점에서 해줘야 할까? 크게 프론트와 백엔드로 나눌 수 있는데, 유효성 검사는 프론트와 백엔드 모두 해주는 것이 좋다. 프론트에서 유효성 검사를 하는 이유는 사용자에게 이를 알려주기 위한 UX 측면의 이유(오타 등의 알림), 또는 불필요한 요청을 서버에게 전송하지 않기 위한 이유 등이 될 수 있다. 그러나 프론트에서만 유효성 검사를 하는 것은 보안상 위험하기 때문에 백엔드에서도 하는 것이 필수다.

스프링부트에서는 DTO 객체 필드에 조건과 메세지를 관련 어노테이션으로 작성해주면 컨트롤러 객체에서 `@Valid` 어노테이션과 함께 유효성 검사를 할 수 있다.

## 프로젝트 구조
이전 포스트인 [7. 로그인 기능 구현(Spring Security, JPA)]({{site.url}}//application/web/spring-boot/7-login/)의 프로젝트 구조에 따르되 일부 클래스의 코드를 수정하여 유효성 검사 기능을 추가할 수 있다.

### 의존성 추가
다음 의존성을 추가하면 스프링부트에서 유효성 검사 기능을 직접 구현하지 않아도 적절한 어노테이션과 함께 기능을 구현할 수 있다.

```txt
implementation 'org.springframework.boot:spring-boot-starter-validation'
```

## UserDto
```java:/src/main/java/maemi.dr.SpringDemo.dto.UserDto:lineons
package maemi.dr.SpringDemo.dto;

import lombok.*;
import maemi.dr.SpringDemo.entity.UserEntity;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor @Getter @Setter @ToString
public class UserDto {
    @NotBlank(message="아이디를 입력해주세요.")
    private String id;

    @NotBlank(message="비밀번호를 입력해주세요.")
    @Pattern(regexp="(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}", message="비밀번호는 8~20자 영문 대소문자, 숫자, 특수문자를 사용해 입력해주세요.")
    private String password;

    @NotBlank(message="이름을 입력해주세요.")
    @Pattern(regexp="^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "이름은 특수문자를 제외하고 2~10자로 입력해주세요.")
    private String name;

    @NotBlank(message="성별을 선택해주세요.")
    private String gender;

    @NotBlank(message="이메일을 입력해주세요.")
    @Pattern(regexp="^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message="이메일 형식이 올바르지 않습니다.")
    private String email;

    private List<UserRoleDto> roles;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;

    public UserEntity toEntity() {
        return UserEntity.builder()
                .id(id)
                .password(password)
                .name(name)
                .gender(gender)
                .email(email)
                .roles(roles.stream().map(userRoleDto -> userRoleDto.toEntity()).collect(Collectors.toList()))
                .build();
    }

    @Builder
    public UserDto(String id, String password, String name, String gender, String email, List<UserRoleDto> roles, LocalDateTime createdDate, LocalDateTime lastModifiedDate) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.roles = roles;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
    }
}

```

DTO 객체에서 유효성 검사가 필요한 필드에 유효성 검사 어노테이션을 사용한다. 유효성 검사 어노테이션은 다음과 같은 것들이 있다.

### 스프링 유효성 검증 기본 어노테이션 종류

어노테이션 | 설명
--- | ---
@Null | null만 허용
@NotNull | 공백(" "), 빈 문자열("")은 허용하되 Null은 허용하지 않음
@NotEmpty | 공백(" ")은 허용하되, 빈 문자열("")과 Null은 허용하지 않음
@NotBlank | 공백(" "), 빈 문자열(""), Null 모두 허용하지 않음
@Email | 이메일 형식을 검사함. 단, 빈 문자열("")의 경우 허용. 이 때문에 @Pattern을 이용한 정규식 검사를 더 많이 사용
@Pattern(regexp=...) | 정규식 검사
@Size(min=.., max=..) | 데이터 길이 제한
@Max(value=*x*) | *x* 이하의 값만 허용
@Min(value=*x*) | *x* 이상의 값만 허용
@Positive | 양수의 값만 허용
@PositiveOrZero | 양수와 0만 허용
@Negative | 음수의 값만 허용
@NagativeOrZero | 음수와 0만 허용
@Future | 현재 시간보다 미래의 날짜, 시간만 허용
@FutureOrPresent | 현재 시간 혹은 그보다 미래의 날짜, 시간만 허용
@Past | 현재 시간보다 과거의 날짜, 시간만 허용
@PastOrPresent | 현재 시간 혹은 그보다 과거의 날짜, 시간만 허용

## UserService
```java:/src/main/java/maemi.dr.SpringDemo.service.UserService:lineons
package maemi.dr.SpringDemo.service;

import lombok.AllArgsConstructor;
import maemi.dr.SpringDemo.entity.UserEntity;
import maemi.dr.SpringDemo.repository.UserRepository;
import maemi.dr.SpringDemo.dto.UserDto;
import maemi.dr.SpringDemo.dto.UserRoleDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Transactional
    public List<UserDto> getUserList() {
        List<UserEntity> userEntities = userRepository.findAll();
        List<UserDto> userDtoList = new ArrayList<>();

        for (UserEntity userEntity: userEntities) {
            userDtoList.add(userEntity.toDto());
        }

        return userDtoList;
    }

    @Transactional
    public UserDto getUser(String id) {
        Optional<UserEntity> userEntityWrapper = userRepository.findById(id);
        UserEntity userEntity = userEntityWrapper.get();
        return userEntity.toDto();
    }

    @Transactional
    public void joinUser(UserDto userDto) {
        // 비밀번호 암호화
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        List<UserRoleDto> roles = new ArrayList<UserRoleDto>();
        UserRoleDto role = UserRoleDto.builder()
                .userId(userDto.getId())
                .role("ROLE_USER")
                .build();
        roles.add(role);
        userDto.setRoles(roles);
        userRepository.save(userDto.toEntity());
    }

    @Transactional
    public void updateUser(String id, UserDto userDto) {
        Optional<UserEntity> user = userRepository.findById(id);
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        user.ifPresent(selectUser -> {
            selectUser.setId(userDto.getId());
            selectUser.setPassword(userDto.getPassword());
            selectUser.setName(userDto.getName());
            selectUser.setGender(userDto.getGender());
            selectUser.setEmail(userDto.getEmail());
        });
    }

    @Transactional
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}

```

## UserController
클라이언트로부터 요청을 받는 컨트롤러에서 사용자에게 유효성 이상 유무를 알리고 이에 대한 데이터를 전달하면서 기존에 사용자가 입력했던 데이터를 보존한다.

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

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Controller
@AllArgsConstructor
public class UserController {
    UserService userService;

    @GetMapping("/user/login")
    public String login() {
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

- **.validateHandling()**
    - 컨트롤러에서 POST로 전달받은 데이터에 대해 유효성 검사를 수행하는 메서드
    - &lt;valid_필드&gt; : &lt;에러메세지&gt; 쌍 전달

## join.html
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
          아이디 <input type="text" class="form-control" placeholder="아이디" name="id" th:value="${userDto.getId()}" maxlength="20">
          <span th:text="${valid_id}" class="not_valid"></span>
        </div>
        <div class="form-group">
          비밀번호 <input type="password" class="form-control" placeholder="비밀번호" name="password" th:value="${userDto.getPassword()}" maxlength="20">
          <span th:text="${valid_password}" class="not_valid"></span>
        </div>
        <div class="form-group">
          이름 <input type="text" class="form-control" placeholder="이름" name="name" th:value="${userDto.getName()}" maxlength="20">
          <span th:text="${valid_name}" class="not_valid"></span>
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
        <input type="submit" class="btn btn-primary form-control" value="가입">
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

타임리프 문법을 이용해서 유효성 검사 결과 데이터가 있다면 이를 화면에 삽입하고 기존에 입력했던 사용자 입력을 컨트롤러가 모델 객체를 통해 전달하면 타임리프 엔진이 이를 이용해 기존 입력 데이터를 보존한다.

- **th:text="${value}"**
  - 컨트롤러에서 전달한 모델의 attribute에 해당하는 값이 만약 존재하면 태그 영역 안에 해당 값을 텍스트로 삽입한다.
  - UserController에서 각 필드의 유효성 검사 결과를 뷰에 전달하는 모델에 `<valid_필드:메세지>` 쌍 형태로 전달했기 때문에 유효성 검사 결과 메세지가 있다면 표시
- **th:value="${value}"**
  - `<input>` 상자 영역 안에 기본 값으로서 rvalue를 삽입
  - 유효성 검사 실패 시 사용자가 입력했던 값을 컨트롤러가 뷰에 전달하는 모델에 `userDto` 객체로 전달했기 때문에 각 `<input>` 상자에서 입력받는 필드에 맞게 사용자가 사전에 입력한 값을 기본 값으로 삽입하여 보존
- **th:if, unless**
  - 타임리프 엔진에서 사용하는 if else 구문
  - 성별을 선택하는 라디오형 입력 상자에서 사용자가 사전에 선택한 성별에 대해 선택 유지

## 테스트
![](https://drive.google.com/uc?export=view&id=1U0P_U88v805zqZF1IidseNz33APiRoUv){: .align-center}
&lt;테스트 1. 회원가입 시 유효성 검사 메세지 확인 - 구글 크롬 Email 형식 검사&gt;
{: style="text-align: center;"}

위와 같이 입력해서 처음으로 테스트를 해봤는데 적용하지 않은 CSS가 적용된 듯한 에러 메세지를 확인했다. 해당 에러 메세지를 비활성화 하기 위해 코드에서 이곳 저곳 건드려봤는데 전혀 효과가 없었고, 나중에 구글링을 통해 확인한 내용은 해당 에러는 `<input type="email">` 형식의 입력 폼에 대해 구글 크롬이 자체적으로 유효성 검사를 수행하고 조건에 맞지 않으면 `submit`을 막아놓은 것이었다. 구글 크롬에 이런 기능도 있었구나 했다. 구글 크롬의 해당 기능을 사용하고 싶지 않으면 `<input type="text">`로 입력 형식을 이메일이 아닌 텍스트로 변경하면 된다.

![](https://drive.google.com/uc?export=view&id=1wxi9ZlMDNGEqEl3TAwJDE3OzuCQUSDqg){: .align-center}
&lt;테스트 2. 회원가입 시 유효성 검사 메세지 확인&gt;
{: style="text-align: center;"}

## 다음 포스트
본 포스트를 통해 스프링 부트에서 입력 데이터에 대한 유효성 검사를 어떻게 할 수 있는지 알아보았다. 이 포스트를 작성하면서 회원가입 시 이미 존재하는 ID에 대해서도 예외 처리를 하는 기능을 만들어야겠다는 생각이 들어서 구글링을 통해 몇 가지 키워드를 알아보았다. 다음 포스트에서는 Ajax, JPA를 이용해 회원가입 기능에서 아이디 중복 검사를 할 수 있는 방법에 대해 작성할 예정이다.

## A. 참조
KKKK_HHHH, "[Spring Boot+JPA] 회원가입 구현시 아이디 중복체크, 유효성 검사 처리하기", *Tistory*, Mar. 16, 2021. [Online]. Available: [https://1-7171771.tistory.com/78](https://1-7171771.tistory.com/78) [Accessed May 22, 2022].

coco3o, "Spring Boot 회원가입 Validation 유효성 검사하기", *Tistory*, Dec. 18, 2021. [Online]. Available: [https://dev-coco.tistory.com/124](https://dev-coco.tistory.com/124) [Accessed May 23, 2022].

coco3o, "[Spring Boot] Validation 적용, @Valid로 유효성 검사하기", *Tistory*, Dec. 17, 2021. [Online]. Available: [https://dev-coco.tistory.com/123](https://dev-coco.tistory.com/123) [Accessed May 23, 2022].

victolee, "[SpringBoot] @Valid로 유효성 검사하기", *Tistory*, Jan. 19, 2020. [Online]. Available: [https://victorydntmd.tistory.com/332](https://victorydntmd.tistory.com/332) [Accessed May 23, 2022].

whyWhale, "스프링 부트 Tranactional(readonly=true) 가 안되는 경우", *Tistory*, Feb. 2, 2021. [Online]. Available: [https://byeongyeon.tistory.com/35](https://byeongyeon.tistory.com/35) [Accessed May 23, 2022].

taegyunwoo, "이메일 주소에 '@'를 포함해 주세요. 메시지 출력 문제", *Github.io*, Sep. 4, 2021. [Online]. Available: [https://taegyunwoo.github.io/ts/TroubleShooting_EmailFormatAlarm](https://taegyunwoo.github.io/ts/TroubleShooting_EmailFormatAlarm) [Accessed May 24, 2022].
