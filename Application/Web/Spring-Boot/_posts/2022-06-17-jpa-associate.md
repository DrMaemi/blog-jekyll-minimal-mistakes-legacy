---
title: '[Spring Boot] ORM 프레임워크 JPA와 연관 관계 코딩'
uml: true
author_profile: true
toc_label: '[Spring Boot] ORM 프레임워크 JPA와 연관 관계 코딩'
post-order: 100
---

## 관계형 DB와 ORM
DBMS가 발전해온 과정을 살펴보면 관계형 DB가 가장 오래 사용되었고 그만큼 많은 장점을 가지고 있다. 여기에 객체지향 프로그래밍에서 도입한 객체라는 개념을 이용해 DB를 관리하는 것으로 객체지향 DBMS, 객체관계 DBMS가 생겨났다.

JPA는 ORM 프레임워크라는 표현을 쓰는데, 이 때 ORM은 Object Relational Mapping의 약자로서 어플리케이션의 객체와 DB의 데이터를 자동으로 연결한다는 뜻을 가진다. 객체지향 프로그래밍은 클래스를 사용하고, 관계형 DB는 테이블을 사용하기 때문에, 객체지향 프로그래밍이 사용하는 객체 모델과 관계형 DB가 사용하는 관계형 데이터 모델 간 불일치가 존재한다. 이를 ORM 프레임워크가 어플리케이션에서 정의한 객체 간 관계를 바탕으로 SQL 등을 자동으로 생성하여 불일치를 해결한다. 이를 봤을 때 관계형 DB를 사용하면서 객체관계 패러다임의 프로그래밍 방식을 가져가기 위해 사용하는 것이 ORM 프레임워크라는 생각이 든다.

## JPA 구조

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-06-16T06:59:38.023Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36\&quot; etag=\&quot;v7f4mpoVdfVknBSge49V\&quot; version=\&quot;20.0.0\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;jcJ8BJUcvm0o9dkq-Rwy\&quot; name=\&quot;JPA Architecture(Class Level)\&quot;&gt;7Zlbb5swGIZ/TS4bAYYcLts03UGr1Kqb1lsXHPBqbGSckuzXz4BxDCZLW7Wlp0SK8OsD8D6fzYczAot084XDLDlnESIjz4k2I3A68rzAd+VvKWxrYTJTQsxxVEuGcIX/IiU6Sl3jCOWthoIxInDWFkNGKQpFS4Ocs6LdbMVI+6wZjJElXIWQ2OpvHImkVmfedKd/RThOmjO7k3ldk8KmsbqTPIERKwwJLEdgwRkT9VG6WSBSetf4Uvc721OrL4wjKu7TIcPRn+xb8QtcX+dT9+iHV1yujtQod5Cs1Q0fZxnBIRSYUXXdYtuYkRc4JZDK0skKE7JghPGqBiz88lvqjApDrz9SzwVnt8iomVQfWaOuAHGBNntvzdWGyUBDLEWCb2UT1aGxWMWYO1flYkfMc5SWGLS8QIlQRUmsh94ZKQ+Ulw/w1bd8XVKBxdaylLM1jVA5lCu9KBIs0FUGw7K2kBNKaolIiaquTWzi0H15DPtjaC+bIGix8W008x4y4LnABJ9g+sHMBgYz+QTTD8b1BibjWWS+wzu4GWeI5zgXiErv38yTYvrqHhXAsvf0xPbTimMzyBOYle3STVzmYOMVYUWYQC7GERTwBuZoz0R5VWiCzlNczwMDjZ4LJhotPjmaqYXGAoNodFymmbJEWRXvEcwTvTwZlEr9AgqBOK0UzwHWAiXtOdmtb442FkVWlnrQVsO2oMe1RuOIyGTvrj18n5PqDBcMyxNram6HGph1YORszUOkepnp6aGBuhNOQB4jYQ1UgdW3/XjWswexviEsvK3wyWnWFQ3obZhV6zNMmlo5oFG6L2p5TZWnh9P62rJDS/tQoaNDpSHuPDJ0fNBdOV42dObvKXS8e4YOGDJ0usR9/7GhMzsw0DOHTrPN0ZP2OueQwhhxeXQGQ8H4W0+FD2Rmc3/cTnx1RmsmAIFrB9WzZb6uvT2i6fzkkOaSS98+yTvnMh2ci/1KYs+aD8UEuIMzsd9jLtfowy1aOm0dDoS993jxnzf1d46j5/3+qXDI4m73vk4Idn+BgOU/&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. Class-level JPA 아키텍처&gt;
{: style="text-align: center;"}

- EntityManagerFactory
    - EntityManager의 factory class. 팩토리 메서드 패턴에 따라 EntityManager 인스턴스 생성 및 관리
- EntityManager
    - Entity 객체의 영속성을 관리하는 인터페이스. Query 인스턴스에 대한 추상 팩토리 패턴을 따름
- Entity
    - 영속성 객체로 DB에 저장되어 있는 데이터에 매핑되는 객체
- EntityTransaction
    - EntityManager와 1대1 관계를 가지며, EntityManager의 연산 기능들을 가지고 기능들을 관리하는 객체
- Persistence
    - EntityManagerFactory 인스턴스를 얻기 위한 static 메서드를 포함하는 객체
    - JPA의 영속성 관리 기능을 사용할 때 이 클래스의 static 메서드를 사용하는 것부터 시작하는 듯하다
- Query
    - JPA vendor들에 따라 제공되는 JPA 구현체(코드에 따른 쿼리 구현 등)에 대한 인터페이스

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-06-16T07:17:51.094Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36\&quot; etag=\&quot;pZPt_SS7KJtwFfPcq3Ep\&quot; version=\&quot;20.0.0\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;a447QFqTvRkIgofb9SSp\&quot; name=\&quot;JPA Class Relations\&quot;&gt;7Vldb5swFP01vEzaBBhI8tjQtNWmbp26ac8euGANbGpMPvrrZwfzTdpso9BmVaQEjvG1fc714RI04MbbSwaT8Jr6KNJM3d9q4FwzTdsyxLcEdjngzBUQMOznUA24xQ9IgbpCM+yjtHEhpzTiOGmCHiUEebyBQcbopnnZHY2aoyYwQB3g1oNRF/2BfR7m6NycVfgVwkFYjGw4i7wlhsXFaiVpCH26qUFgpQGXUcrzo3jrokhyV/CS97s40FpOjCHCj+mQrS/gynM/f6Jf7nTXvLq/vPr+3syjrGGUqQVrphOJeMs0gUTOmu8UFc59Jqe6bBwF8ndFOOa7a0gEGewCepyyXRFGzCePlF+qqCiDmoxmxEdyioZo3oSYo9sEerJ1IxJKYCGPI9WcckZ/lTpI5A5HkUsjyvbRgGvJTznOGjGOtgf5MkoVRPYiGiMu560XHQrhdq3zTZUHhqWwsJYDjsKgSr2gDF2pIw6UQH8g1mw4sU5PHsuaWp55R56PcA23HxLEUpxyRARtbX7TDY4jSNDY7C2a5Dld7iyjhztgPRd5YHAjeg0pfjiPDioHWq5kT532Rle6dx2SBQm8ySSMcEDEsSfIEGKBpaQKixvvmWqIse/L7kuGUvwAf+5D6eI8oZjw/SrspWafy1gZp2leOlQiFaIQut9edZ0KiBKuKg7jOSWbtyQDXcnMHsXM51LMGm6vfWOQpOKOjyk50f3W3nA9VjnyftN75GtxjIh/JovfKtdrnFYC6CVvyO+UwcewJgalGfPQ08bOIQvQY/GsfhVqNNs9LBcYQxHkeN1cQx/1aoQb6SG1YsJobdFFS718mapXvch+KhBoBcp56ATaZ0K57H9Iju7eNt7MuLGf2wrpE7uxPYQbf83Q63jmGsCBX0DJY5ykBduTWvBsIAtuP9uMbsHd58C3evhxC+6pqUa1YGcIC76pP+b/F0ZsTv6Xy2JsHy6KqaEs15zScoHd1BPM/9JyLb0VaGzLfbF5MDsyD8CkeWA15bPa+/XYPOgEGjkPzG5ddsq33if+IG8VVFbP+4uB7rLitHqPlYtZvQwEq98=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 2. JPA 클래스 관계&gt;
{: style="text-align: center;"}

## 단방향 연관 관계
### 일대다 연관 관계 `@OneToMany`
학과(DEPARTMENT)와 학생(STUDENT)에 대한 관계 데이터 모델을 생각해보자. 이 때 단방향 일대다 연관 관계를 지니도록 객체 관계를 설계하고 ERD를 그린다면 &lt;그림 3&gt;과 같이 표현할 수 있다. 관계형 테이블과 JPA 어노테이션의 동작을 살펴보기 위해 학과 테이블에 id2 필드를 추가하고, 이를 참조하는 학생 테이블의 외래키 필드 이름을 department_id_naming으로 변경했다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-06-17T03:46:28.904Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36\&quot; etag=\&quot;FXbMJdAq4gnz-cU_U9XZ\&quot; version=\&quot;20.0.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;m8I2HaX5sejeY5udThUS\&quot; name=\&quot;Think about JPA OneToMany\&quot;&gt;7Vpdb9sgFP01edwU20maPC5Zu0prpyrdtMeKBmKzYbAwWT5+/S4G7DjU/VjTJpoj5cFcLtdwz4ETDJ1okq6+SJQl1wIT1gm7eNWJPnfCMOiFYUf/unhtLGfDgTHEkmLrVBlu6YZYY9daFxSTvOaohGCKZnXjTHBOZqpmQ1KKZd1tLlj9rRmKiWe4nSHmW39SrBJjHYZnlf2S0Dhxbw4GI1OTIudsR5InCIvllik670QTKYQyT+lqQphOnsuLaXfRUFt2TBKuntPg5nJz1938uiSk/209G17zZPTlQxBEJs4fxBZ2yJ8JBFWpDms6rtYuGzCGTD8qdK9N41yBpwUt6oIBYFCIciLBEBRlxlCW08LdWBLK8BVai4VygVxpPKcrgqcGM+0L8F1BMF3UwecQ/NZ2RlcjRmMOzzPoqn7jWJIc+nKFcmU97NiIVGTVmLagBANYTERKlFyDi2swsPitHTFteVnRIRhaW7JFhZG1IcvAuAxdgQQPFqcXYdbzMHscqanm3TgRkm40Pszmcxu9orykKUMcCI3wjmksiglcoEAZmwgmNMRccOKhrJ2wFNl3JGOirCETlKsiE/0x/CA3k+7HfqcPfZ1AOajK8NPuUk0Ez5UENukYBEBdEg3sWInMBmVk7uJLm3j9fC+UEulLKPDY3PCZYZkQPZMI0dsRoe8R4eZrIxX0rKaITWGZRDxmBrhi1UQVcA+g+2C+yxzvJn93kgpI/ZwVC19CMSb8lZj0HsZkC4TohRjYYFVeXhwNMVh/OFIwTRYc5x6wZT9fg/XAwxoaHBZrtwAb33GeoRnl8ZVpOdghQ//9yLBqnqD9vZLjWeHehR1nJ0l4liR031QSBoeXhKFHhB+HlgSCqYvXpAh11XgFPmdtlYfRA/LQvAYciT7sWw8a0G+fHrhN5xYdbtUCn/Z0RW0v+sc9XYnv/hduN4qTgr/tpm7r28txbuoc7i3a1DVN1/9etUP/61vrN3VPrN0tEnH3zpMC7HUP94QCHH4PF/l/BS4OrQDvuIeLGvD579Ug8pUfl2cxdxTfcZTCUnzs+rBnPWiiQ/v0IDyd+xyDQIwOLhChf+5z/PLwGkDaeugT+oc+oAGkZQrQBH8LFeB0zHMMClB+Xj2gBPjnPMcvAfvaIYRtPeUJ/VMeTme/79ooCqezHrdB8j8ielwgOCZu5kFiqVpPCUOKCn5e1Zj5aVQhCLVuqJTZ6Uw4/qSvU0LxfLohUnwX14ivTc0FZU5ZpB4nKUVE60zVzvCqMG41gaVe/C5vV9qXuW7sqlVQrex6TI2ksaZcLOSMPJY9d3NCOc1qzvPT3yXKg6TaoZEzyiLlf+qdfoR4N1o5tyjt7sRaFfJuGJrB2lYV0bxAvW49UBTuBDK58AI9zVgoVhdajXt1LTg6/ws=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>
&lt;그림 3. 학과-학생 테이블 ERD&gt;
{: style="text-align: center;"}

테스트 환경은 OpenJDK 18, Spring Boot 2.7.0, IntelliJ Community Edition 2021.3.3, Gradle, H2 Database, JPA, Lombok으로 구성되었다.

<p class=short>Entity 코드</p>

```java
@Entity
@Table(name="DEPARTMENT")
public class DepartmentEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private Long id2;

    @OneToMany
    @JoinColumn(name="department_id_naming", referencedColumnName="id2")
    private List<StudentEntity> studentEntities;
}

@Entity
@Table(name="STUDENT")
public class StudentEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false, unique=true)
    private String nickName;
}
```

<p class=short>Repository 코드</p>

```java
public interface DepartmentRepository extends JpaRepository<DepartmentEntity, Long> {
    Optional<DepartmentEntity> findById2(Long id2);
}

public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
}
```

<p class=short>어플리케이션 실행 후 Hibernate SQL 쿼리 결과</p>

```txt
Hibernate: 
    
    create table department (
       id bigint generated by default as identity,
        id2 bigint not null,
        primary key (id)
    )
Hibernate: 
    
    create table student (
       id bigint generated by default as identity,
        name varchar(255) not null,
        nick_name varchar(255) not null,
        department_id_naming bigint,
        primary key (id)
    )
Hibernate: 
    
    alter table department 
       drop constraint if exists UK_bsixctccnbmcqnn2kr3pto1ga
Hibernate: 
    
    alter table department 
       add constraint UK_bsixctccnbmcqnn2kr3pto1ga unique (id2)
Hibernate: 
    
    alter table student 
       drop constraint if exists UK_i6ps58a7tc8a3eaf21qmxf1e5
Hibernate: 
    
    alter table student 
       add constraint UK_i6ps58a7tc8a3eaf21qmxf1e5 unique (nick_name)
```

![](https://drive.google.com/uc?export=view&id=1pJODqiMtIdsj1AobJYHxsnQvcb7D8TUF){: .align-center}
&lt;화면 1. 학과-학생 테이블 생성 결과&gt;
{: style="text-align: center;"}

테이블은 원하는 대로 생성됐는데, 쿼리를 확인해보니 외래키 바인딩하는 부분을 찾을 수 없었다. 그리고 코드 상 STUDENT 테이블의 department_id_naming 필드를 DepartmentEntity에서 정의하고 있는 문제가 있다. 객체지향 프로그래밍 패러다임에 대해 이해하고 있다면 어색한 느낌을 바로 받을 것이다. DB에 객체지향-관계 기법을 적용하기 위해 ORM 기술을 이용하는 점을 생각해보면 패러다임을 역행하는 느낌을 받는다.

원하는대로 동작하는지 테스트 코드를 다음과 같이 작성하여 실행해봤다.

```java
@SpringBootTest
class TestApplicationTests {
    @Autowired
    private DepartmentRepository departmentRepository;

    @Test
    void createDepartmentAndStudent() {
        List<StudentDto> studentDtos = new ArrayList<>();

        StudentDto studentDto = StudentDto.builder()
                .name("testName1")
                .nickName("testNickName1")
                .build();

        studentDtos.add(studentDto);

        DepartmentDto departmentDto = DepartmentDto.builder()
                .id2(1L)
                .studentDtos(studentDtos)
                .build();

        Assertions.assertEquals(departmentRepository.save(departmentDto.toEntity()).getId2(), 1L);
    }
}
```

실행해보니 `Caused by: java.lang.ClassCastException: class maemi.dev.test.entity.DepartmentEntity cannot be cast to class java.io.Serializable (maemi.dev.test.entity.DepartmentEntity is in unnamed module of loader 'app'; java.io.Serializable is in module java.base of loader 'bootstrap')` 이런 오류가 발생했다. Serializable 문제가 발생하는데, 이유를 찾아보니 PK가 아닌 필드를 FK로 참조할 때 이런 문제가 발생한다고 한다. 원인을 분석하려 하면 JPA를 깊게 파고들어야 할 것 같아서 나중에 알아보기로 했다. 일단 Serializable 문제를 하결하는 방법은 참조 당하는 필드를 갖고 있는 엔티티 클래스 DepartmentEntity에 `implements Serializable`를 다음과 같이 추가하면 된다.

```java
...
public class DepartmentEntity implements Serializable {
...
```

변경 후 다시 실행해보니 `Caused by: org.hibernate.TransientObjectException: object references an unsaved transient instance - save the transient instance before flushing` 이런 오류가 발생했다. 연관 관계가 있는 엔티티들을 영속화할 때 참조되는 엔티티가 영속화되지 않아 참조하는 엔티티 또한 영속화하지 못한다는 오류다. 테스트코드 변경 없이 이를 해결하려면 @OneToMany 어노테이션에 cascade 옵션으로 CascadeType.PERSIST 등을 사용하면 된다. 본문에서는 테스트 코드를 다음과 같이 엔티티의 필드를 수정하는 방향으로 변경하여 테스트를 진행했다.

```java
@SpringBootTest
class TestApplicationTests {
    @Autowired
    private StudentService studentService;

    @Autowired
    private DepartmentService departmentService;

    @Test
    void createDepartmentAndStudent() {
        DepartmentDto departmentDto = DepartmentDto.builder()
                .id2(100001L)
                .studentDtos(new ArrayList<>())
                .build();

        Assertions.assertEquals(departmentService.createDepartment(departmentDto).getId2(), 100001L);

        StudentDto studentDto = StudentDto.builder()
                .name("testName1")
                .nickName("testNickName1")
                .build();

        departmentService.addStudent(100001L, studentDto);

        Assertions.assertEquals(departmentService.getDepartmentById2(100001L).getStudentDtos().get(0).getName(), "testName1");
    }
}
```

근데 이 테스트 코드도 여전히 같은 `Caused by: org.hibernate.TransientObjectException: object references an unsaved transient instance - save the transient instance before flushing` 오류가 발생했다. 확인해보니 학과 데이터는 잘 저장됐는데 학생 데이터를 영속화하는 과정에서 오류가 발생했다. 영속화되지 않은 학생 엔티티를 학과 엔티티의 학생 리스트에 넣으려 하니 발생한 오류였다. 테스트코드 작성 시 이런 실수가 발생하는 이유가 뭘까 생각해보니 관계형 데이터 모델의 이론과 상반되는 설계 방식을 지닌 일대다 단방향 연관 관계가 그 이유라고 생각이 들었다. 관계형 테이블에서 학생 테이블이 FK를 가지고 있으니 학생 테이블이 참조하는 테이블, 학과 테이블이 참조되는 테이블이므로 학과 엔티티가 먼저 영속화되어 있고, 영속화되지 않은 학생 엔티티를 학과 엔티티의 학생 리스트에 넣은 후 영속화하는 방향으로 코드를 작성했는데 오류가 발생한 것이다. 일대다 단방향 연관 관계에서는 반대로 참조하는 학생 엔티티를 먼저 영속화한 뒤, 영속화되지 않은 학과 엔티티를 생성하고 학생 리스트에 영속화된 학생 엔티티를 추가하여 학과 엔티티를 영속화한다. 이에 대한 테스트 코드는 아래와 같다.

```java
@SpringBootTest
class TestApplicationTests {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Test
    void createDepartmentAndStudent() {
        StudentDto studentDto = StudentDto.builder()
                .name("testName1")
                .nickName("testNickName1")
                .build();

        StudentEntity createdStudentEntity = studentRepository.save(studentDto.toEntity());

        Assertions.assertEquals(createdStudentEntity.getName(), "testName1");

        DepartmentEntity departmentEntity = DepartmentEntity.builder()
                .id2(100001L)
                .studentEntities(new ArrayList<>())
                .build();

        departmentEntity.addStudentEntity(createdStudentEntity);

        DepartmentEntity createdDepartmentEntity = departmentRepository.save(departmentEntity);

        Assertions.assertEquals(createdDepartmentEntity.getId2(), 100001L);
    }
}
```

![](https://drive.google.com/uc?export=view&id=1UzIHQ5w-QNa10CNn_mDDNb0N7YDgcLd8){: .align-center}
&lt;화면 2. 일대다 연관 관계 테스트 코드 pass 후 테이블 결과&gt;
{: style="text-align: center;"}

&lt;화면 2&gt;를 보면 학생 테이블의 department_id_naming이 정상적으로 학과 테이블의 id2 필드를 외래키로 참조하는 모습을 확인할 수 있다. 테스트 코드에서는 학과 엔티티를 생성하면서 학생 리스트를 추가하고 영속화했는데, 위에서 언급한 관계형 데이터 모델 이론에 좀 더 부합하는 방식은 학과 엔티티 생성-영속화, 학생 엔티티 생성-영속화, 이후 학생 엔티티를 리스트에 추가하는 방식이다. 테스트 코드는 다음과 같다.

```java
@SpringBootTest
class TestApplicationTests {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Test
    void createDepartmentAndStudent() {
        DepartmentDto departmentDto = DepartmentDto.builder()
                .id2(100001L)
                .studentDtos(new ArrayList<>())
                .build();

        StudentDto studentDto = StudentDto.builder()
                .name("testName1")
                .nickName("testNickName1")
                .build();

        DepartmentEntity createdDepartmentEntity = departmentRepository.save(departmentDto.toEntity());

        StudentEntity createdStudentEntity = studentRepository.save(studentDto.toEntity());

        createdDepartmentEntity.addStudentEntity(createdStudentEntity);

        departmentRepository.save(createdDepartmentEntity);

        DepartmentEntity savedDepartmentEntity = departmentRepository.findById2(100001L).get();
        
        Assertions.assertEquals(savedDepartmentEntity.getStudentEntities().get(0).getName(), "testName1");
    }
}
```

### 다대일 연관 관계 `@ManyToOne`
작성 예정

## 양방향 연관 관계
### 일대다 - 다대일 연관 관계 `@OneToMany`, `mappedBy`, `@ManyToOne`
작성 예정

## A. 참조
eun-jeong, "[DB] ORM (Object Relational Mapping) 사용 이유, 장단점", *Tistory*, Oct. 1, 2020. [Online]. Available: [https://eun-jeong.tistory.com/31](https://eun-jeong.tistory.com/31) [Accessed Jun. 16, 2022].

tutorialspoint, "Spring Boot JPA - Architecture", *tutorialspoint.com*, [Online]. Available: [https://www.tutorialspoint.com/spring_boot_jpa/spring_boot_jpa_architecture.htm](https://www.tutorialspoint.com/spring_boot_jpa/spring_boot_jpa_architecture.htm) [Accessed Jun. 16, 2022].

공부 안하고 싶은 사람, "FK가 PK가 아닌 다른 컬럼과 연관관계가 있을 때", *Tistory*, May. 31, 2021. [Online]. Available: [https://code-resting.tistory.com/49](https://code-resting.tistory.com/49) [Accessed Jun. 17, 2022].

뱀귤 블로그, "JPA 관련 Hibernate 에러: object references an unsaved transient instance - save the transient instance before flushing", *Tistory*, Nov. 6, 2021. [Online]. Available: [https://bcp0109.tistory.com/344](https://bcp0109.tistory.com/344) [Accessed Jun. 17, 2022].
