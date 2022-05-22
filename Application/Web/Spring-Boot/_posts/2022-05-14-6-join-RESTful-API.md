---
title: '[Spring Boot] 6. 회원가입 기능 RESTful API 구현'
uml: true
author_profile: true
toc_label: '[Spring Boot] 6. 회원가입 기능 RESTful API 구현'
post-order: 6
last_modified_at: 2022-05-22 22:07:02 +0900
---

웹 어플리케이션에서 사용자에 따라 컨텐츠를 구분하거나 접근 권한을 제어해야 하는 기능을 제공하기 위해 로그인 시스템을 사용한다. 로그인 시스템 기능 구현에 앞서 사용자는 회원가입을 통해 웹 서버에 정보를 등록한다. 본 포스트에서는 스프링부트, JPA로 MySQL을 회원가입 기능의 RESTful API를 구현하는 것에 대해 설명한다.

사실 회원가입 기능을 구현할 때 API로 따로 구현할 필요는 없지만 이번 기회에 스프링부트로 RESTful API 서버를 어떻게 만들 수 있는지 익히기 위해 포스트를 별도로 작성하게 되었다.

![](https://drive.google.com/uc?export=view&id=1-e4B8qzHdw4iA1oBttLLEb0G_Eo-Mq2h){: .align-center}
<화면 1. 프로젝트 구조>
{: style="text-align: center;"}

본 포스트에서는 <화면 1>의 프로젝트 구조 중 `User`와 관련되어 있는 파일들을 다룰 것이다.

## MySQL 설치
MySQL 설치 방법은 따로 자세히 다루지 않겠다. 구글링을 통해 본인의 개발 환경에 맞게 MySQL을 설치하길 바란다.

## DB, TABLE 생성
다음 SQL문을 이용해 스프링부트 프로젝트에서 사용할 데이터베이스 `SPRING_BOOT_DEMO`와 회원 테이블 `USER`를 생성한다. 하나의 회원은 고유 ID, 비밀번호, 이름, 성별, 이메일, 생성 날짜, 마지막 수정 날짜를 가진다.

```sql
CREATE DATABASE SPRING_BOOT_DEMO DEFAULT CHARACTER SET UTF8;

USE SPRING_BOOT_DEMO;

CREATE TABLE USER(
    id VARCHAR(20) PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(20) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    created_date DATETIME(6) NOT NULL,
    last_modified_date DATETIME(6) NOT NULL
);
```

```txt:CMD
mysql> CREATE DATABASE SPRING_BOOT_DEMO DEFAULT CHARACTER SET UTF8;
Query OK, 1 row affected (0.01 sec)

mysql> USE SPRING_BOOT_DEMO;
Database changed
mysql> CREATE TABLE USER(
    ->     id VARCHAR(20) PRIMARY KEY,
    ->     password VARCHAR(100) NOT NULL,
    ->     name VARCHAR(20) NOT NULL,
    ->     gender VARCHAR(20) NOT NULL,
    ->     email VARCHAR(50) NOT NULL,
    ->     created_date DATETIME(6) NOT NULL,
    ->     last_modified_date DATETIME(6) NOT NULL
    -> );
Query OK, 0 rows affected (0.02 sec)

mysql> SHOW TABLES;
+----------------------------+
| Tables_in_spring_boot_demo |
+----------------------------+
| user                       |
+----------------------------+
1 row in set (0.00 sec)

mysql> DESC USER;
+--------------------+--------------+------+-----+---------+----------------+
| Field              | Type         | Null | Key | Default | Extra          |
+--------------------+--------------+------+-----+---------+----------------+
| id                 | bigint       | NO   | PRI | NULL    | auto_increment |
| user_id            | varchar(20)  | NO   | UNI | NULL    |                |
| password           | varchar(100) | NO   |     | NULL    |                |
| name               | varchar(20)  | NO   |     | NULL    |                |
| gender             | varchar(20)  | NO   |     | NULL    |                |
| email              | varchar(50)  | NO   |     | NULL    |                |
| created_date       | datetime(6)  | NO   |     | NULL    |                |
| last_modified_date | datetime(6)  | NO   |     | NULL    |                |
+--------------------+--------------+------+-----+---------+----------------+
8 rows in set (0.00 sec)
```

`USER` 테이블의 속성 중 `created_date`와 `last_modified_date`의 이름 철자가 다르지 않도록 유의한다. 이는 테이블에 변경이 생겼을 때 변경을 가한 데이터 객체 `Entity`의 변화를 감지하는 스프링부트의 `AuditingEntityListener`가 해당 데이터의 생성/수정 시간을 테이블에 기록할 때 `created_date`, `last_modified_date` 속성 이름을 기준으로 수행하기 때문이다. JPA가 엔티티 객체를 DB와 연동할 때 객체 필드가 카멜 케이스(Camel Case)로 표기되어 있으면 이를 스네이크 케이스(Snake Case)로 변환하고 SQL `ALTER` 구문으로 테이블 속성을 변경하는 것으로 추측된다. 후술할 `TimeEntity` 객체에서 관련 필드들의 이름인 `createdDate`, `lastModifiedDate`가 스네이크 케이스로 변환되어 테이블의 필드에 반영된다.

## UserRepository
이제 위에 정의한 `USER` 테이블의 데이터 조작을 담당하는 `UserRepository`를 구현한다. `Repository`는 인터페이스로 정의하고, JpaRepository 인터페이스를 상속받으면 된다.

```java:/src/main/java/maemi.dr.SpringDemo.domain.UserRepository:lineons
package maemi.dr.SpringDemo.domain.repository;

import maemi.dr.SpringDemo.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {
}
```

JpaRepository의 제네릭 타입에는 Entity 클래스와 PK의 타입을 명시해주면 된다. JpaRepository에는 일반적으로 많이 사용하는 데이터 조작을 다루는 함수가 정의되어 있기 때문에, CRUD 작업이 편해진다.

JpaRepository는 `@Repository` 어노테이션을 사용하여 선언되어 있기 때문에 이를 상속받는 `UserRepository`에는 어노테이션을 사용할 필요 없다.

<div markdown="1">
스프링 어플리케이션은 동작 시 `@ComponentScan` 어노테이션 기능을 통해 코드의 컴포넌트를 탐색한 뒤 각 컴포넌트를 싱글톤(Singleton) 패턴으로 스프링 컨테이너에 빈(Bean)으로 생성하여 관리한다. 이렇게 Spring IoC 컨테이너가 관리하는 자바 객체를 스프링 빈이라 한다. 스프링 빈은 의존성 주입(DI)에 사용된다.
</div>
{: .notice--info}

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-05-14T09:19:44.438Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36\&quot; etag=\&quot;bFvJuhanqR-WiIExk9An\&quot; version=\&quot;18.0.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;LGoXKO2Ynyn2Hd2LECft\&quot; name=\&quot;Component, Controller, Repository, Service\&quot;&gt;5VhNc5swEP01HJsBBBgf44+0mWknaX1Ic5RhjTWRkUcIf+TXd2WEjYwTp5k0dhofPOzTatG+90CAQ/qz1VdJ59MfIgXu+G66csjA8f2YBPivgXUFhJFXAZlkaQU1gBF7BAO6Bi1ZCoWVqITgis1tMBF5DomyMCqlWNppE8Hts85pBi1glFDeRu9YqqamLb+zw78By6b1mb2oW43MaJ1sOimmNBXLBkSGDulLIVR1NFv1gWvual6qeVdPjG4XJiFXL5nwc7zIaXBfjm6uyXpYXpNOeffFVFlQXpqGncDti9lc5LpstXC1rtmQosxT0AVdh/SWU6ZgNKeJHl2i/IhN1Yxj5OHhROTKCOqFOmac9wUXclOLpBTiSYJ4oaR4gMZIlMQwnuCIWRxIBasnu/a2XKIHQcxAyTWmmAmkpt/4z49MvNyp6dU504aSdR41Bsq2pXcc44Gh+S8o9w9TniMLnIP8Dzj3iM05iU/NOTnE+QjkgiGPH5/wfZOfnvDgEOG/YC4KpoSp/7E5D8+O87DF+a2EAtuhiom8RTm2rmxeKWdZjscJzsEbEelpghjuhZdmYMbSVE/vYV32SMebUlqwuWC52vQT9pxwoGuVCrWuNGpJkePusqebgd7i7hPawgRBW5j4gC7+v9IlaunSKwuWQ1Eg+l1kLPk02hByXBvPfU9xOu2LBmTBCgW53hpcXd13B5c3n0aj0A+Pa+S9p0ZxS6PhCvVJi5YmCF7qh36MxlwkD8gIQvVe4VfhFdOn3/DeEM/egbS4N7gBMbU2CLIn17+bwb2ZuQkGq+bQoJ5VrRDS1kvGnhrYhShlAsefGxWVGahn8p5Qt6levQVJ4Lg3LOy1HZLPlLvVNt05xe/YV3MY7Dmg6snMar6a7BUKyJFCVdPPFKoTxWRSgJWzcdyWh9ebsHtWJvROZMLg7ExI9kxIXm3CMLqImj9i1d0+M5yRJ+u78GlN+Yb2Iudnr5hcENsJgfdKh/lx96Lb3RksDmznhu/pMAx3356q9N0HPDL8Aw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<그림 1. @Component, @Controller, @Service, @Repository 컴포넌트 상속 관계>
{: style="text-align: center;"}


## UserEntity, TimeEntity
`USER` 테이블의 튜플과 매핑되는 객체인 `UserEntity`, `TimeEntity`를 구현한다. `TimeEntity`는 JPA가 데이터의 생명주기를 감시하여 변화를 감지하는 *Jpa Auditing* 기능을 사용한다.

<div markdown="1">
DB는 해당 데이터를 누가, 언제 생성 또는 수정했는지 기록하는 것이 꽤나 중요합니다. 이 데이터들은 많은 테이블에서 사용되기 때문에 Entity에도 필드로 중복되어 들어가고, 해당 Entity가 생성 또는 수정될 때마다 개발자가 신경 써서 데이터를 입력해줘야 하는 번거로움이 생기게 됩니다. 이때 사용하는 기술이 *Spring Data*에서 제공하는 *Auditing*입니다.
{: .notice--info}
</div>

```java:/src/main/java/maemi.dr.SpringDemo.domain.entity.UserEntity:lineons
package maemi.dr.SpringDemo.domain.entity;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor(access=AccessLevel.PROTECTED) @Getter @Setter
@Entity
@Table(name="USER")
public class UserEntity extends TimeEntity {
    @Id
    private String id;

    @Column(length=100, nullable=false)
    private String password;

    @Column(length=20, nullable=false)
    private String name;

    @Column(length=20, nullable=false)
    private String gender;

    @Column(length=50, nullable=false)
    private String email;

    @Builder
    public UserEntity(String id, String password, String name, String gender, String email) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.email = email;
    }
}
```

- **@NoArgsConstructor(access=AccessLevel.PROTECTED)**
    - Lombok 기능
    - 엔티티의 기본 생성자에 대한 접근 제어 수준을 *PROTECTED*로 설정
    - 엔티티가 기본 생성자로 생성되는 것을 제한(무분별한 객체 생성에 대한 제한)
- **@Getter @Setter**
    - Lombok 기능
    - Getter Setter 메서드를 자동 생성
- **@Entity(name)**
    - 테이블과 매핑될 객체인 엔티티임을 명시
    - JPA가 관리하게 됨
- **@Table**
    - 엔티티와 매핑할 테이블 이름 지정
- **@Id**
    - 테이블의 기본 키임을 명시
- **@Column**
    - 객체 필드를 테이블 컬럼에 매핑시킴
    - 컬럼 특성을 명시할 수 있음
- **@Builder**
    - 빌더 패턴을 사용하여 객체 생성을 가능케 함

빌더 패턴(Builder Pattern)이란 생성 패턴 중 하나로, 복합 객체의 생성 과정과 표현 방법을 분리하여 동일한 생성 절차에서 서로 다른 표현 결과(객체)를 만들 수 있게 한다. 객체를 생성할 때 빌더 패턴을 사용하면 필요한 필드만을 선택적으로 초기화한 객체를 간편하게 생성할 수 있다.
{: .notice--info}

```java:/src/main/java/maemi.dr.SpringDemo.domain.entity.TimeEntity:lineons
package maemi.dr.SpringDemo.domain.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class TimeEntity {
    @CreatedDate
    @Column(updatable=false, nullable=false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(nullable=false)
    private LocalDateTime lastModifiedDate;
}
```

상술했듯 `TimeEntity`는 데이터 조작 시 이를 감지하여 조작 시간을 자동으로 업데이트하는 *Jpa Auditing* 기능을 사용한다.

- **@MappedSuperclass**
    - DB 테이블에 직접 매핑되는 것이 아니라 자식 클래스(엔티티)에게 매핑 정보를 상속시킴
- **@EntityListeners(AuditingEntityListener.class)**
    - JPA에게 해당 엔티티는 *Auditing* 기능을 사용함을 명시
- **@CreatedDate**
    - 엔티티가 처음 저장될 때 생성일자 주입
    - `update=false` 특성을 추가하지 않으면 수정 시 null값으로 대체됨
- **@LastModifiedDate**
    - 엔티티가 마지막으로 수정된 수정일자 주입

한 편, *Jpa Auditing* 기능을 사용하기 위해선 어플리케이션 객체에 `@EnableJpaAuditing` 어노테이션을 명시해야 한다.

```java:/src/main/java/maemi.dr.SpringDemo.SpringDemoApplication:lineons
package maemi.dr.SpringDemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication(exclude=SecurityAutoConfiguration.class)
public class SpringDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringDemoApplication.class, args);
	}

}
```

후술할 `UserService`에서 DB에 저장된 사용자 비밀번호에 대해 암호화를 하기 위해 `org.springframework.security` 의존성을 사용하는데, 해당 의존성을 사용한 경우 웹 어플리케이션을 이용할 때 자동으로 로그인 보안을 적용하기 때문에 이를 해제하고자 `@SpringBootApplication(exclude=SecurityAutoConfiguration.class)`을 명시한다.

## UserService
사용자 정보와 관련된 비즈니스 로직을 수행하는 `UserService`를 구현한다. 

```java:/src/main/java/maemi.dr.SpringDemo.service.UserService:lineons
package maemi.dr.SpringDemo.service;

import lombok.AllArgsConstructor;
import maemi.dr.SpringDemo.domain.entity.UserEntity;
import maemi.dr.SpringDemo.domain.repository.UserRepository;
import maemi.dr.SpringDemo.dto.UserDto;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService{
    private UserRepository userRepository;

    @Transactional
    public List<UserDto> getUserList() {
        List<UserEntity> userEntities = userRepository.findAll();
        List<UserDto> userDtoList = new ArrayList<>();

        for (UserEntity userEntity: userEntities) {
            UserDto userDto = UserDto.builder()
                    .id(userEntity.getId())
                    .password(userEntity.getPassword())
                    .name(userEntity.getName())
                    .gender(userEntity.getGender())
                    .email(userEntity.getEmail())
                    .createdDate(userEntity.getCreatedDate())
                    .lastModifiedDate(userEntity.getLastModifiedDate())
                    .build();

            userDtoList.add(userDto);
        }

        return userDtoList;
    }

    @Transactional
    public UserDto getUser(String id) {
        Optional<UserEntity> userEntityWrapper = userRepository.findById(id);
        UserEntity userEntity = userEntityWrapper.get();

        return UserDto.builder()
                .id(userEntity.getId())
                .password(userEntity.getPassword())
                .name(userEntity.getName())
                .gender(userEntity.getGender())
                .email(userEntity.getEmail())
                .createdDate(userEntity.getCreatedDate())
                .lastModifiedDate((userEntity.getLastModifiedDate()))
                .build();
    }

    @Transactional
    public void joinUser(UserDto userDto) {
        // 비밀번호 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        userRepository.save(userDto.toEntity());
    }

    @Transactional
    public void updateUser(String id, UserDto userDto) {
        Optional<UserEntity> user = userRepository.findById(id);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
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

- **@AllArgsConstructor**
    - `userRepository` 의존성 주입을 위해 사용
- **@Service**
    - 스프링 어플리케이션 구조에서 서비스 계층임을 명시
- **@Transactional**
    - 선언적 트랜잭션을 사용함을 명시
    - 메서드 수준에서 트랜잭션 개념 사용
- **Repository.findById(id)**
    - PK를 SQL의 WHERE 조건으로 데이터 탐색
    - 반환 값은 Optional&lt;<T>&gt;이며 값에 접근하기 위해 <c>.get()</c> 메서드 사용
- **Repository.save(Entity)**
    - DB 테이블에 INSERT문 사용(데이터 생성)
- **Optional&lt;UserEntity&gt;**
    - `null`일 수 있는 객체를 감싸는 Wrapper 클래스
- **selectUser -> {...}**
    - Repository 객체로부터 얻은 데이터 내부 값을 수정함으로써 DB에 있는 정보도 UPDATE됨

## UserDto
Repository 객체가 얻은 사용자 엔티티 정보를 받아 객체로서 전달되는 데이터 전달 객체(DTO, Data Transfer Object) `UserDto`를 구현한다.

DTO는 DB에서 데이터를 얻어 다른 Service 객체나 Controller 등으로 데이터를 전달할 때 사용하는 객체로, 데이터가 Service 계층에서 Presentation Logic 계층으로 넘어올 때 사용한다. DTO는 로직을 갖고 있지 않은 순수 데이터 객체로 Getter와 Setter 메서드만을 가진다. DTO를 이용하면 계층 간 호출 횟수를 줄여 서버의 성능을 향상시키거나 데이터 위변조 가능성을 낮추어 신뢰성을 향상시킬 수 있다.
{: .notice--info}

```java:/src/main/java/maemi.dr.SpringDemo.dto.UserDto:lineons
package maemi.dr.SpringDemo.dto;

import lombok.*;
import maemi.dr.SpringDemo.domain.entity.BoardEntity;
import maemi.dr.SpringDemo.domain.entity.UserEntity;

import java.time.LocalDateTime;

@NoArgsConstructor @Getter @Setter @ToString
public class UserDto {
    private String id;
    private String password;
    private String name;
    private String gender;
    private String email;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;

    public UserEntity toEntity() {
        return UserEntity.builder()
                .id(id)
                .password(password)
                .name(name)
                .gender(gender)
                .email(email)
                .build();
    }

    @Builder
    public UserDto(String id, String password, String name, String gender, String email, LocalDateTime createdDate, LocalDateTime lastModifiedDate) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
    }
}
```

- **.toEntity()**
    - 필요 시 엔티티 객체로 만들기 위해 엔티티 객체의 빌더 패턴을 활용

## UserRestController
마지막으로 RESTful API 요청에 따라 Json 데이터 객체를 반환하는 컨트롤러인 `UserRestController`를 구현한다.

```java:/src/main/java/maemi.dr.SpringDemo.controller.UserRestController:lineons
package maemi.dr.SpringDemo.controller;

import lombok.AllArgsConstructor;
import maemi.dr.SpringDemo.dto.UserDto;
import maemi.dr.SpringDemo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class UserRestController {
    UserService userService;

    @GetMapping("api/user/all")
    public List<UserDto> getUserList() {
        return userService.getUserList();
    }

    @GetMapping("api/user/{id}")
    public UserDto getUser(@PathVariable String id) {
        return userService.getUser(id);
    }

    @PostMapping("api/user/join")
    public void joinUser(@RequestBody UserDto userDto) {
        userService.joinUser(userDto);
    }

    @PutMapping("api/user/{id}")
    public void updateUser(@PathVariable String id, @RequestBody UserDto userDto) {
        userService.updateUser(id, userDto);
    }

    @DeleteMapping("api/user/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }
}
```

- **@RestController**
    - @Controller와 @ResponseBody를 붙인 것과 동일
    - 반환 값을 ResponseEntity로 감싸서 반환(Json Serialized)
- **@GetMapping, @PostMapping, ...**
    - HTPP 요청 종류에 따른 핸들러 메서드 구분 명시
- **@PathVariable**
    - URL에 중괄호 `{ }`로 감싸진 변수 사용

여기까지 구현이 완료됐다면 <그림 2>와 같이 클라이언트의 요청으로부터 DB의 데이터를 제공할 준비가 완료된 것이다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-05-14T10:07:43.627Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36\&quot; etag=\&quot;2CtrQD6XFM2pDFKXOdcb\&quot; version=\&quot;18.0.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;Ki1R5v1QQAeoJKOsch3n\&quot; name=\&quot;6., 7. Application Logic\&quot;&gt;7Vpbe6o4FP01PtaPWxAevfacOXWmp8709jJfgCBpkdAQq/bXn0SCclPbHmqdfsODJZuwadZae2XLZ0vvz5bnFMbBmHgobGmKt2zpg5amqZpi8z8iskojlqqngSnFnpy0DUzwC5JBRUbn2ENJYSIjJGQ4LgZdEkXIZYUYpJQsitN8EhafGsMpqgQmLgyr0RvssUCuQuts498QngbZk1VTLngGs8lyJUkAPbLIhfRhS+9TQlh6Nlv2USjAy3BJ7xvtuLr5xyiK2GtuAP74jpgPZ0vz3EBIcXqT6+6ZzPIMw7lccD/EImH6L7NVhgPPxSHng94iwAxNYuiKKwvOOo8FbBbykcpPYRKnPPh4ifijez6JmORVBXLcJyGh68S6vz5EHIdhLq46UEUcpF7CKHlEuSuKYg67fJW9KgLZchBlaJkLSUTOEZkhRld8ylag6S1SnhqQ40WObBkKcjxnMSjlNd1k3jLATyQJ9YRAjV5fRQMlGD7MlMvp99vY+LuGkCoVkdcVyuYjJyTuYxH/HNx8bRW4FcW2FaUCq4d8OA/54nrunD4L3tbJKJlH3nokbkFLzG7Fedvu2HJ8tx7rHSDHg2Vu8mCVG1wiijlGiMrYTvaQVyjJKnc5bkANN1mMohAy/Fws5DrC5BMuCRbC30jDttt2/jCKSilLICFz6iKZJF+Hpby6orZNa38uBukUsUqutaI2QLxfZFpFZFfoaY6SatnzMmKl+g7xNOLnLqdNcNkTxYa5YXblhRn2PHF7j6IEv0BnnUoQHovlrBcIei0wELnmjCTSGiqSjEiESraQhfY7irI+mvEHbugVsgCoWESnRoZaAxbhzKMgGX0zI+WSLQIvvHm4n9RYxAAnMWRuwPnQzHUVO+JsKs4miD6HqMpssbQPmHoF8aJXewBZnlHn1Zbm6KbZDBe6ohWJMKtevfHzPBNmA0zcPDxdkMWfd9eKY59/f/7jxwvANUz8kyB6xQupzwGjJAwFIx8JPESW79YBb7oWcvyGisDqFIDX7Rrg65z4w4CvGtjp7JI7AU83iMOFnZr/YdmdyD6pl1ooHbxzYzQ04bXK9jD3521uk8T3BFrOhTf6dzxeDn/evnQf6zoxUdzCTjFn8b9f1YZd4q2uqj/KTkfu9djExmX0xPD0zFfPBmy+005j3iQwIh/wtUA3jgk6UFyd+ZO/HCe6f/zR1W78wXMN6OPV5OdFBesUluw7sFrEln+3jcW82XIqXgO0/ZAs3ABS1vYggw7c+cXxAClI5a1Fp6bJdAhjZFbHlm12dNhQx1FmC1jV1u/D2IoBmryshnCmLa3RVeh1RsrFjhIZMPIFaqNT3kiOWRu1aOu1aA8jhtlXMKMy4Ec1o3p5v+31B4lRJN4uRN4Ihxm0fJQhqxVBLzKUp8B4bd+2r1PI92379re39G2q2VCTppeczHhvk1a2xHKi5rqyeoVUa/K0FLKvY88rZJ+SPkMhhr7DDN6skLLU9CMrBJy4QvZ5Q14h+9q1z1AIMEsKKW8Dr1VIORFQjqwQ88QV8tpdZl+L+L9Cfkch1okrZB/zBxWif55COkpDCrHUA4k+WiH2iSvktzzkMxVigbZuGaYK0k+tGb10TKO9yck/QdFfbHBU9WRi+Qz1eDAJNq+uG21YTk1KoGw25U70teIxy/taYy0tH25/AZJO3/6ORh/+Ag==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<그림 2. 회원가입 API 요청 시 스프링 웹 어플리케이션 동작 구조>
{: style="text-align: center;"}

## RESTful API 테스트(with *Postman*)
*Postman*을 이용해 구현한 API가 잘 동작하는지 테스트한다.

![](https://drive.google.com/uc?export=view&id=151pXpKFPvt1DcMzsz8Wasx5ah-ReNYAW){: .align-center}
<테스트 1. 관리자(Admin) 가입>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1oygCopJ3TrnjbayeCbXu9Awz5e1kgK7-){: .align-center}
<테스트 2. user1 가입>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1r219YiAUldxWfHVzY1R_Pox00iQEtQ6Y){: .align-center}
<테스트 3. 가입 전체 사용자 확인 1>
{: style="text-align: center;"}

회원가입이 정상적으로 이루어지고 있는 것을 확인할 수 있다.

![](https://drive.google.com/uc?export=view&id=1X9zWI0nbEZoKTkOBNRMtsR4bUQfwP4-N){: .align-center}
<테스트 4. user2 가입>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1OEXgE0Blo_E8gdj-m7wnew0nAElP59xk){: .align-center}
<테스트 5. user1 회원탈퇴>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1hAn8YggammA26PgfcevxKAAJNT-rd90X){: .align-center}
<테스트 6. 가입 전체 사용자 확인 2>
{: style="text-align: center;"}

User2 가입 후 User1이 정상적으로 회원탈퇴가 된 것을 확인할 수 있다.

![](https://drive.google.com/uc?export=view&id=1lm7Q1-xpyZcygH9uArXu3HWhL39L1vMY){: .align-center}
<테스트 7. user2 정보 수정>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1ZK84S9kjbWixJq_fE8sSr2Eu0zHUVRtH){: .align-center}
<테스트 8. 가입 전체 사용자 확인 3>
{: style="text-align: center;"}

정보 수정 또한 정상적으로 이루어지는 것을 확인할 수 있다. 한 가지 유의할 점은, 수정할 엔티티의 PK 값을 변경하려고 할 경우 identifier를 수정하지 못하도록 *Exception*을 발생시킨다. 예를 들어 `user2 name`의 아이디인 `user2`를 `user2-updated`로 변경하려 시도하면 `org.hibernate.HibernateException: identifier of an instance of maemi.dr.SpringDemo.domain.entity.UserEntity was altered from user2 to user2-updated` 와 같이 오류를 발생시킨다.

## A. 참조
uss0915, "Spring Boot 로 웹 서비스 출시하기 -2. 게시판 구현하기 (JPA를 이용한 CRUD Restful 적용)", *Velog.io*, Mar. 8, 2021. [Online]. Available: [https://velog.io/@uss0915/Spring-Boot-로-웹-서비스-출시하기-2.-게시판-구현하기-JPA를-이용한-CRUD-Restful-적용](https://velog.io/@uss0915/Spring-Boot-로-웹-서비스-출시하기-2.-게시판-구현하기-JPA를-이용한-CRUD-Restful-적용) [Accessed May 14, 2022].

uss0915, "Spring Boot 로 웹 서비스 출시하기 -3. 게시판 구현하기 (JPA + RestAPI + Oracle)", *Velog.io*, Mar. 23, 2021. [Online]. Available: [https://velog.io/@uss0915/Spring-Boot-로-웹-서비스-출시하기-3.-게시판-구현하기-JPA-RestAPI-Oracle](https://velog.io/@uss0915/Spring-Boot-로-웹-서비스-출시하기-3.-게시판-구현하기-JPA-RestAPI-Oracle) [Accessed May 14, 2022].

dltkdgus3435, "[SpringBoot] spring-data-jpa 사용시 @Repository 어노테이션은 꼭 필요한가?", *Velog.io*, Dec. 12, 2021. [Online]. Available: [https://velog.io/@dltkdgns3435/SpringBoot-spring-data-jpa-사용시-Repository-어노테이션은-꼭-필요한가](https://velog.io/@dltkdgns3435/SpringBoot-spring-data-jpa-사용시-Repository-어노테이션은-꼭-필요한가) [Accessed May 14, 2022].

