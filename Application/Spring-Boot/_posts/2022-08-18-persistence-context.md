---
title: '[Spring Boot] JPA 영속성 문맥(Persistence Context)'
uml: true
author_profile: true
toc_label: '[Spring Boot] JPA 영속성 문맥(Persistence Context)'
post-order: 100
---

## 1. 영속성이란
영속성은 데이터를 생성한 프로그램이 종료되어도 사라지지 않는 데이터의 특성을 의미합니다. 영속성은 프로그램 실행 중 주기억장치에 생성된 데이터를 파일이나 DB에 저장함으로써 부여할 수 있습니다.

## 2. 영속성 문맥(Persistence Context)란?
- **엔티티를 영구 저장하는 환경**
- 어플리케이션과 DB 사이에서 객체 정보를 저장하고 있는 가상의 공간
- JPA의 EntityManager를 통해 엔티티를 조회/저장하면 EntityManager는 이를 영속성 문맥을 통해 관리하고 보관함

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-17T07:05:56.973Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;ZxhdnmwIAnI9I7tUfO_7\&quot; version=\&quot;20.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;eC6KCAFZok1EgxWegQtk\&quot; name=\&quot;그림 1. JPA  - 영속성 문맥 - DB 관계\&quot;&gt;7Vpbk5s2GP01zKSdyQ6SuD4a1kkmnaTbbtrO9E0G2TDBiAh5befXVxhhLsK7bsolza5fDJ8uoHN0jj7J1pC/PbxlOIs+0JAkGtTDg4ZuNQiBhUzxVUSOZcRxURnYsDiUlerAffyVyKAuo7s4JHmrIqc04XHWDgY0TUnAWzHMGN23q61p0n5qhjdECdwHOFGjf8Uhj+QooF3H35F4E1VPBpZblmxxVVmOJI9wSPeNEFpqyGeU8vJqe/BJUoBX4VK2e3Oh9PxijKT8mgbpxz/113/8/ftHN/g1/SX8lHn4y2vZywNOdnLAiyxL4gDzmKbyvfmxAiPfx9sEp+LOW8dJ4tOEslMJCk3ihIaI55zRz6RR4sAVsixRIp9EGCeHi0MAZ2DEjCJ0Szg7iiqygSOhPLZv9zUxliljUYMUo6IAy8mwOfdc4yUuJGT/Bj5LwU+DVsILIDKcttCzvuwKqr3W1ab4XqY85seqoXiRsm1ZqJDA6C4NSfFWQBTvo5iT+wwHReleaFDEIr5NZHFJRzVzwXjEXZ5dF9mEbTaBpdIJjB46rbHYhK7C5s8K/AIE3sYYJ/EmFdeBAIMI8LwCKiGhZCELtnEYFs09RvL4K16dutLFfUbjlJ9GYXqaeVv0teM0L00QKKSkVJFeFaIpl94JjBEpO3NUcWarnMEeykYTIFINTFv6mutoDiguHEtzbk8XhuaJurq29LSFr3nO6cLWFmaluxWrJHdHWB7nnKRCVFD3BbYF5+Pq0MK6vl736RDZuu77kuRGfH36TKdPZPTYrT6lPlWzvVXtUUW6SUOEs6Le9rAp0pWbdUL3QYQZvwkxxyuckwtUdtgSwMMg6GMrtFaWOdByh1CbARP2OGSf3MB4C56tcPAeP+DDTVZr5tX7u8VPj+UOT4qBALEs2X3wupaN8EDwQrdjZsBU4DVAn5u5o8FrDpdPfMCpSE7ZGxxwymbKLoYi8pG5eFk9HftSyZ02uwDO4Nw+e1IBnJ3Vl5zxKc46uzagq5xNmjNWHQ8hxE8Mp7lw2NNu+bmJ8buzWNizG+jCT9JwUZwL1UJowF1zo5+BI6FyQnQVbOKpdMcCcsWSwDHbkMd6bBwYtYhoIN138FHFGEkwjx/aw+hDXz7hrvCYxq4PdBRsme0uyoHKVs0jqKc60jsdlUAoHZ0mw3nY/2F+QGV+gBezbmu6Q5E9t1mjIcz6tx15jinw95cuQeNHdWg0q0PbAzm0siee2qHVDfBLOv24Q4OetGtaix7kR5DWoetzN2rYcxQ1sVGrB30/hlGXyM5l1LDzAwp0v9GoUccFoDGtUaO+TfRc82O2ZVfvbIC7q+XVG6NOR8CZmE01y/6fLLujWbJr9DPSmFmoZ2ah0Qy57/h4VMFVW+Mnrde61nqdOcVqGm2NmeAbxdrtyJharOopxhQzYS7eUGdLYnYT2auXTLfLmz4Qb+K2/h9XWb3+Nxxa/gM=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. JPA  - 영속성 문맥 - DB 관계&gt;
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
    - JPA의 영속성 관리 기능을 사용할 때 이 클래스의 static 메서드를 사용하는 것부터 시작하는 듯함(추측)
- Query
    - JPA vendor들에 따라 제공되는 JPA 구현체(코드에 따른 쿼리 구현 등)에 대한 인터페이스

## 3. Entity 생명주기
<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-17T07:27:11.436Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;A5Bl3HMtzvRz090QJ0N7\&quot; version=\&quot;20.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;glIh79aSZspIRKbHw-Fv\&quot; name=\&quot;그림 2. Entity 생명주기\&quot;&gt;5Vpdc+I2FP01zLQPYSzLn48hLN1udzPbpp2mfdkRtmyrNTYriwD76ythGZBkAkuNSSa8YF3rwzr36Ojq2gN4N1v9RNE8+1TGOB/YVrwawPHAtoFthfxPWNa1JQCwNqSUxLLSzvBAvmFptKR1QWJcKRVZWeaMzFVjVBYFjphiQ5SWS7VaUubqqHOUYsPwEKHctP5JYpbJWdj+zv4ekzRrRgaenPAMNZXlTKoMxeVyzwTfDeAdLUtWX81WdzgX4DW41O0mB+5uH4zigp3SIEsXk5+/xI9frTn1xovHJB+BG9nLE8oXcsJjzFCU4Vg+NFs3SPDeOOi8MFpmhOGHOYrEnSX3O7dlbJbzEuCXCcnzuzIv6aYdTJLEjiJhLwsmHQw8Xq4YLf/FezVjb+q54o58KEwZXh2cLdhiyMmHyxlmdM2ryAZ2KGFveCeLy50TQeOZbM+BTT0keZNue95Byy8kut+BtG0gfY+X3YEcRPg0kKeB67hWNyAHKsY27BHkP8YPdxGbLbOH0d9fisk/60nFWuj8CRV8iXbH5tjFQeycAnRgT6F3ITZfH2mTzr/hWfnUIdIYcKz9U5AOPR+izpAGCtIwAFdG2jElemSAXGPS7FBABZbvPHNRb7ZKxSY9TPJyGWWIsmGMGJqig87RkdfXAsJBIkRHIE74nnmbk7QQA5E4Fk82qnh/pEib59Ad50UBnibdOM4F2hIBruk40OK4rfH/eM4uQJp8uJ+sf4cfSRHB+19sr0WNzMVRxLciSuGlKEdVRSLVdbRcFDEWg1gt/qi7w7ERwmig8SHLBY3w8e2JIZpidkxhTSfsgey2YNzYKM4RI0/q47bhLkf4XBI+ka2PHUv1MdRdV09TttqPhbSOoKuRxdc6qnEwOtrQYDvt85lhqucc04pU7IcfDYrwJcFUUiC5zCLuZUyfW38UV+Qbmm66EgSaiwltpuiOBu5Y9LVgZSUpZSzRoiywtuwb0x4TnY6UV1/AjrnH+S3cgpdavvDSy5cDQ9eP4ubQB035r03ZcoLGMF7J5nVp3ZRWhMm2li/LddvQg7K8ayoK6/1+PmNKOEyCPtsauq1DeWmObi9bXjRVAM6Z8uL6Wkd6cHBheTFDhhnmA75hcYG+2+6Ra4mL26O4QFsVl9ADJ4tL3XarLZbjPq8tLTLSqjfnactzh759bTmsQdfSFuhokhCeqS22JlK+N3Q9fqa3ndAJ+Z4Je1Uaz6BxzJ0cZUJqvFxIy5QqrPa+LkTCa0PXm1obbnkF4MxXG1Y09/lVKv6jHCPaYW9l9ZZl0PY0FnrmIalNBr1LyaDfnwyqGuieqIBAkb8j4te/0B3OGLyUIMpIjJwqdHpH0IdDBwLH9V3LtXzP7lXoAoOoCSnizoTpw+dfP75ZVXKgRhlgBmfeM4ztXJVC09n5osre8MZhuMg/zUUXi58bivQSQPPISt097G2FI9vHDQ+ZLTWEhvYZu0h3x/Pncswv/HiuBS/22cfzYx1deC8BF08MK5ml15xautpxzXeGLgh3PzUUsfwhcPfu+ucRUYwS7v8cdZgAcsSt3c/pl6ZmlvpyNH3NOYqrkdQOhlZgUMa3z2RjS3eW3y/lzJw73bxWfq2hlyhP0IzkAtD3OH/C4oE6yml6ak5TBBZ6TBb0GpOZeedX/lrrku7TczGw5ZuOXlPS4ISctKrnxz7oOISeDrP59UKLbzqAXMvBtp1h2j7t2L52/g7IeXH3aV8tj7sPJOG7/wA=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 2. Entity 생명주기&gt;
{: style="text-align: center;"}

### 3.1. 비영속(New/Transient)
- 엔티티 객체를 생성했으나 아직 영속성 문맥에 반영하지 않은 상태
- 영속성 문맥과 전혀 관계 없는 상태

```java
User user = new User();
```

### 3.2. 영속(Managed)
- 영속성 문맥에 저장된 상태
- 엔티티가 영속성 문맥에 의해 관리됨
- 영속 상태가 되자마자 DB에 값이 저장되진 않음
    - 트랜잭션 커밋(`commit()`) 시 EntityManager의 `flush()` 호출
    - `flush()` 호출 시 영속성 문맥에 있는 데이터들과 SQL이 DB에 전달되어 저장됨

```java
@Autowired
private EntityManagerFactory entityManagerFactory;

public void someMethod(User data) {
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    EntityTransaction tx = entityManager.getTransaction();

    try {
        tx.begin();
        entityManager.persist(data); // 영속화
        tx.commit(); // DB 반영
    } catch (Exception e) {
        tx.rollback();
    } finally {
        entityManager.close(); // 영속성 문맥 종료(준영속)
    }
}
```

#### flush
- flush는 영속성 문맥의 변경 내용을 DB에 반영하는 역할을 수행함
    - 영속성 문맥을 비우는 것이 아님
- 1차 캐시를 지우지 않고 SQL 쿼리를 DB에 전달하여 DB와 일관된 상태를 갖도록 동기화함
- `flush()` 또는 트랜잭션 `commit()` 시 영속성 문맥의 쿼리 저장소에 저장됐던 SQL문들이 DB에 전달됨
- `flush()` 시 변경 감지(Dirty Checking)을 통해 영속성 문맥 내 데이터들의 변경되기 전 스냅샷과 현재 스냅샷을 비교
    - 수정된 Entity를 찾고 그에 대한 UPDATE 쿼리를 쿼리 저장소에 저장
    - 쿼리 저장소에 저장된 모든 쿼리를 DB에 전달하여 동기화
- flush 옵션 선택 가능(entityManager.setFlushMode(FlushModeType.~))
    - FlushModeType.AUTO
        - 기본값, 커밋 또는 쿼리 실행 시 자동 flush
    - FlushModeType.COMMIT
        - 커밋 시에만 flush

### 3.3. 준영속(Detached)
- 영속성 문맥에 저장됐다가 분리(삭제)된 상태
- 트랜잭션 커밋으로 DB에 반영되고 식별자를 가지는 데이터만이 준영속 상태가 될 수 있음
- 영속성 문맥이 제공하는 기능들(1차 캐시, 변경 감지 등)을 사용하지 못함

#### 3.3.1. 준영속 엔티티 수정 방법
##### 변경 감지(Dirty Checking) 기능 사용
- 준영속 엔티티의 id로 영속 엔티티를 불러와 수정

```java
@Transactional // 트랜잭션 생성 및 커밋/롤백
void update(Item item) { // item: 메서드 인자로 넘어온 준영속 상태 엔티티
    Item findItem = entityManager.find(Item.class, item.getId()); // 같은 id의 영속 엔티티 조회
    findItem.setPrice(item.getPrice()); // 데이터 수정
}
```

##### 병합
- EntityManager의 병합 메서드 `merge()` 사용
    - `merge()`의 인자로 넘어온 준영속 엔티티의 id로 1차 캐시 조회
        - 1차 캐시에 없으면 DB 조회 후 1차 캐시에 저장
    - 조회된 영속 엔티티의 값을 준영속 엔티티의 값으로 수정
    - 영속 엔티티 반환

```java
@Transactional // 트랜잭션 생성 및 커밋/롤백
void update(Item item) { // item: 메서드 인자로 넘어온 준영속 상태 엔티티
    Item mergeItem = entityManager.merge(item);
}
```

### 3.4. 삭제(Removed)
- 영속화된 엔티티를 영속성 문맥에서 삭제 요청한 상태
- 트랜잭션 커밋 시 DB에 삭제 요청

```java
entityManager.remove(user);
```

## 4. 영속성 문맥의 특징/이점
시스템 아키텍처에서 중간 계층이 있는 경우 다음과 같은 방법으로 성능을 개선할 수 있습니다.

- I/O를 요청 **버퍼링** 및 배치 처리를 통한 문맥 교환 최소화
- 데이터 **캐싱**을 통한 데이터 접근 속도 향상

JPA의 영속성 문맥은 어플리케이션과 DB 사이에서 동작하기 때문에 위 두 방법을 이용한 특징과 이점을 가집니다.

### 4.1. 1차 캐시(Cache)
- 맵 자료구조로 구현된 1차 캐시 공간
- 맵의 Key는 엔티티 id, Value는 엔티티 값
- 엔티티 id로 조회 시 1차 캐시를 먼저 탐색하고 없으면 DB 탐색
    - 단일 트랜잭션 내 동일 id로 조회할 경우 SQL 한 번만 발생
- 조회 성능 향상
    - 단일 트랜잭션 내에서만 캐시 기능을 사용할 수 있기 때문에 극적인 성능 향상은 기대하기 힘듬
    - 비즈니스 로직이 복잡한 경우 효과 있음

### 4.2. 동일성(Identity) 보장
- 영속성 문맥에서 영속 엔티티의 동일성을 보장함
    - 같은 id로 조회할 경우 항상 같은 객체 조회 가능(`==`연산 결과 true)
- 1차 캐시와 동일성 보장을 통해 어플리케이션 레벨에서 트랜잭션 격리 수준 Repeatable read 지원
    - DB의 트랜잭션 격리 수준과 별개

### 4.3. 트랜잭션 쓰기 지연(Transactional Write-behind)
- flush() 호출 전까지 SQL을 메모리(쿼리 저장소)에 저장해둠(버퍼링)
- JDBC Batch SQL 기능을 통해 한 번에 SQL 전송

```java
@Autowired
private EntityManagerFactory entityManagerFactory;

public void insert(Data data1, Data data2, Data data3) { // data1, 2, 3은 비영속 상태
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    EntityTransaction tx = entityManager.getTransaction();

    try {
        /* 1. 트랜잭션 커밋까지 INSERT SQL을 메모리에 모아둠(버퍼링) */
        tx.begin(); // 트랜잭션 시작
        entityManager.persist(data1);
        entityManager.persist(data2);
        entityManager.persist(data3);

        // -- 여기까지 아직 INSERT SQL을 DB에 전달하지 않음

        /* 2. 트랜잭션 커밋 시 JDBC Batch SQL 기능을 사용해 한 번에 SQL 전달 */
        tx.commit();
    } catch (Exception e) {
        tx.rollback();
    } finally {
        entityManager.close();
    }
    
}
```

- INSERT 뿐 아니라 UPDATE, DELETE 동작에 대해서도 동일하게 버퍼링 적용

### 4.4. 변경 감지(Dirty Checking)
- 영속성 문맥에 영속된 엔티티 수정 시 이를 자동으로 반영하는 기능
- 영속성 문맥 1차 캐시에 엔티티를 최초 저장할 때 스냅샷을 저장해두고, 트랜잭션 커밋 시점에 해당 엔티티의 스냅샷과 비교하여 변경 유무를 감지하고 이에 대한 UPDATE SQL 전달

> <h4>Dirty Checking 동작 흐름</h4>
> 1. 트랜잭션 커밋 시도
> 2. 커밋 시점 영속성 문맥에 존재하는 엔티티들의 스냅샷과 해당 엔티티들의 최초 스냅샷과 비교, 변경된 엔티티 감지
> 3. 변경된 각 엔티티별로 UPDATE SQL을 생성하고 쓰기 지연 SQL 저장소에 저장
> 4. EntityManager의 `flush()` 호출, SQL 저장소에 저장된 모든 SQL을 DB에 전달 및 실행
> 5. 트랜잭션 커밋 종료

```java
@SpringBootTest
class JpaApplicationTests {
    @Autowired
    StudentService studentService;

    @Autowired
    StudentRepository studentRepository;

    @Test
    void JPA_변경감지_테스트() {
        StudentEntity inserted = studentService.insert(StudentEntity.builder()
                        .id(1L)
                        .name("test name")
                        .info("test info")
                        .build());

        studentService.updateInfo(inserted.getId(), "updated info");
        StudentEntity saved = studentRepository.findAll().get(0);
        assertThat(saved.getInfo().equals("updated info"));
    }
}
```
```txt
Hibernate: insert into student (info, name, id) values (?, ?, ?)
Hibernate: select studentent0_.id as id1_0_0_, studentent0_.info as info2_0_0_, studentent0_.name as name3_0_0_ from student studentent0_ where studentent0_.id=?
Hibernate: update student set info=?, name=? where id=?
Hibernate: select studentent0_.id as id1_0_, studentent0_.info as info2_0_, studentent0_.name as name3_0_ from student studentent0_
```

- JpaRepository.save() 호출이나 쿼리를 생성하지 않았음에도 UPDATE SQL 쿼리 발생
- UPDATE 쿼리가 모든 필드를 포함하도록 생성됨

#### 변경 부분만 update하고 싶을 때
Dirty Checking으로 생성되는 UPDATE 쿼리는 기본적으로 모든 필드를 포함하는데 이럴 경우 다음과 같은 장점을 가집니다.

- 생성되는 쿼리가 항상 모든 필드를 포함한다는 규칙이 같기 때문에 부트 실행 시점에 미리 생성해두고 재사용 가능함
- DB에서 쿼리 재사용이 가능함(이전과 동일한 쿼리를 입력받은 경우 이전에 파싱된 쿼리를 재사용)

다만, 필드가 20~30개 이상인 경우 전체 필드에 대한 UPDATE 쿼리가 오버헤드를 갖게 되어 부담될 수 있습니다. 이런 경우 테이블 정규화가 잘못된 경우일 확률이 높지만, 여전히 많은 필드 수를 가진다면 `@DynamicUpdate`로 변경 필드만 반영되도록 설정할 수 있습니다.

<p class=short>엔티티를 정의한 클래스에 <c>@DynamicUpdate</c>를 선언하면 됩니다.</p>

```java
@Getter
@NoArgsConstructor
@Entity
@Table(name="STUDENT")
@DynamicUpdate
public class StudentEntity {
    ...
```

이후 테스트 코드를 다시 수행하여 로그를 확인해보면 다음과 같이 UPDATE 쿼리에 수정된 필드 `info`만 포함되어 생성된 것을 확인할 수 있습니다.

```txt
Hibernate: insert into student (info, name, id) values (?, ?, ?)
Hibernate: select studentent0_.id as id1_0_0_, studentent0_.info as info2_0_0_, studentent0_.name as name3_0_0_ from student studentent0_ where studentent0_.id=?
Hibernate: update student set info=? where id=?
Hibernate: select studentent0_.id as id1_0_, studentent0_.info as info2_0_, studentent0_.name as name3_0_ from student studentent0_
```

## A. 참조
adam2, "JPA는 도대체 뭘까? (orm, 영속성, hibernate, spring-data-jpa)," *Velog.io*, Apr. 9, 2020. [Online]. Available: [https://velog.io/@adam2/JPA는-도데체-뭘까-orm-영속성-hibernate-spring-data-jpa](https://velog.io/@adam2/JPA는-도데체-뭘까-orm-영속성-hibernate-spring-data-jpa) [Accessed Aug. 17, 2022].

seongwon97, "[Spring JPA] 영속성 컨텍스트(Persistence Context)," *Velog.io*, Oct. 4, 2021. [Online]. Available: [https://velog.io/@seongwon97/Spring-Boot-영속성-컨텍스트Persistence-Context](https://velog.io/@seongwon97/Spring-Boot-영속성-컨텍스트Persistence-Context) [Accessed Aug. 17, 2022].

향로, "더티 체킹 (Dirty Checking)이란?," *Tistory*, Apr. 29, 2019. [Online]. Available: [https://jojoldu.tistory.com/415](https://jojoldu.tistory.com/415) [Accessed Aug. 18, 2022].
