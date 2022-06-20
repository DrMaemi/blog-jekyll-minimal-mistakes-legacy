---
title: '[회고] Spring Boot, JPA를 이용해 셀러 광고 플랫폼 API 서버 만들기'
uml: true
author_profile: true
toc_label: '[회고] Spring Boot, JPA를 이용해 셀러 광고 플랫폼 API 서버 만들기'
---

<figure data-ke-type="opengraph"><a href="https://github.com/drmaemi/Ad-platform" data-source-url="https://github.com/drmaemi/Ad-platform">
<div class="og-image" style="background-image: url('https://drive.google.com/uc?export=view&id=1TEGMLaj66tqxG4V9a1YGwPrrQL6E6Fn6');"></div>
<div class="og-text">
<p class="og-title">셀러 광고플랫폼 구축</p>
<p class="og-desc">커머스 도메인에서 셀러의 업체 입점부터 광고입찰 생성, FRONT 전시, CPC 방식의 클릭과금, 과금데이터의 배치성 정산집계까지 일련의 프로세스를 수행할 수 있는 서버 개발</p>
<p class="og-host">https://github.com/drmaemi</p></div></a></figure>

## 들어가며, 프로젝트 시작 전에
최근 모 기업의 과제로 셀러 광고 플랫폼 API 서버를 구축하는 프로젝트를 진행했습니다. 과제는 1. CRUD 기능을 가진 상품정보 API 서버 구축(기술 스택 무관), 2. 셀러 광고 플랫폼 구축(스프링부트와 JPA, 인메모리 DB, Spring REST Docs, Spring Batch 기술스택 활용), 3. 장바구니, 상품 구매 경험을 할 수 있는 웹 프로토타입 구축(기술 스택 무관) 세 개 중 하나를 선택해서 진행했어야 하는데, 결과적으로 2번 과제를 선택해서 진행했습니다. 1번 과제는 흔히 해볼 수 있는 다소 식상한 주제라서 제외했고, 2번과 3번 과제 중 고민했는데 과제 요구 사항을 보고 백엔드 기술에 좀 더 집중할 수 있는 2번 과제를 선택했습니다.

2번 과제에 필요한 기술 스택에 대해서, 스프링부트와 JPA를 이용한 소규모 웹 어플리케이션 토이 프로젝트를 해본 경험이 있는데 그 외에 나머지 기술 스택에 대해서는 다뤄본 적이 없고 검색해보니 한 번 경험해보고 싶은 매우 흥미로운 것들이라 생각이 들어서 과감하게 도전했습니다.

결과적으로 경험해보지 못한 기술 스택을 사용하며 정말 많은 것들을 배울 수 있었습니다. 특히 Spring REST Docs를 이용한 TDD, ORM 프레임워크 JPA와 관계형 DB 설계, JPA 쿼리와 Native Query, QueryDSL 성능 최적화, 커스텀 유효성 검증, Spring Batch 처리에 대해서 고민해볼 수 있는 기회였고 포스트에서 다룰 회고 또한 이런 부분들을 중심적으로 서술해나갈 생각입니다.

## 도메인 분석 단계
개발환경과 화면/기능 요구사항은 다음과 같았습니다.

<p class=short><b>개발 환경</b></p>

- JAVA 8 이상
- Spring Boot 사용
- DB 컨트롤은 JPA or Mybatis mapper 방식으로 구현
- Gradle 또는 Maven 기반
- 인메모리 DB(ex. H2) 사용
- Swagger 또는 Spring Rest Docs를 사용한 API Documentation
- 외부 라이브러리 및 오픈소스 사용 가능 *README 파일에 사용한 오픈 소스와 사용 목적 명시

<p class=short><b>개발 목표 및 화면/기능 요구사항</b></p>

- 개발 목표
    - e커머스 도메인의 업체 입점부터 광고 입찰생성, FRONT 전시, CPC 방식의 클릭과금, 과금데이터 배치성 정산집계까지 일련의 프로세스를 구축

- 업체/계약 도메인
    - 업체생성
        - 상품에 셋팅된 업체만 등록 가능
        - ...
        - 사업자번호, 업체전화번호 등의 Data 셋팅 시 자릿수, 숫자여부만 Validation
    - 계약생성
        - 업체생성을 통해 업체 Master 정보가 생성된 업체에 안해 업체계약 가능
        - ...
        - 업체별 계약 기간 중복이 없도록 유효성 검사
- 광고 도메인
    - 광고입찰
        - 계약생성, 계약기간이 유효한 업체에 한해 입찰 가능
        - ...
    - 광고전시
        - 입찰된 광고 중 입찰가 기준 상위 3개 입찰을 노출 대상으로 Response
        - 상품정보 기준 재고수량 0인 경우 노출 대상 제외
        - ...
    - 광고과금
        - CPC 방식 과금을 가정하여 광고전시 API를 통해 노출된 광고가 클릭된 경우 과금 생성
- 정산 도메인
    - 광고과금대상 데이터 기준 일별 정산 집계 데이터 생성
    - ...

크게 세 개의 도메인으로 구성되어 있는데, 요구사항을 보니 데이터가 서로 연관되어 있으며 연관된 데이터의 유효성 검증 요소가 많이 보이기 때문에 관계형 데이터 모델을 사용하면 스프링부트의 유효성 검증 기능과 함께 DB레벨에서, 어플리케이션 레벨에서 데이터 무결성을 유지할 수 있을 것이라 생각이 들었습니다. 그에 따라 프로세스 흐름에 따른 데이터의 정합성도 보장되리라 생각했습니다.

일단 본격적인 개발을 진행하기 앞서 DB 설계를 진행하고자 ERD를 작성했습니다. 작성된 ERD는 아래 <그림 1>과 같습니다.

<div class="mxgraph" style="max-width:100%;border:1px solid transparent; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-06-19T10:30:59.686Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36\&quot; etag=\&quot;Fu0R_fx8nbonyQTN7Q4v\&quot; version=\&quot;20.0.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;9su41jI4dY5pf6SDruzu\&quot; name=\&quot;ERD\&quot;&gt;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&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. 광고 플랫폼 도메인 ERD&gt;
{: style="text-align: center;"}

각 기능에 대응되는 데이터를 테이블로 설계해서, 결과적으로 업체(COMPANY), 상품(PRODUCT), 계약(CONTRACT), 광고입찰(ADVERTISEMENT_BID), 광고전시(ADVERTISEMENT_DISPLAY), 광고과금(ADVERTISEMENT_CHARGE), 광고과금정산(ADVERTISEMENT_CHARGE_CAL) 총 6개의 테이블과 1개의 뷰를 설계했고, 외래키를 이용해 참조무결성을 보장하여 상품 리스트에 셋팅된 업체에 한해서만 업체 등록을 가능케하는 등 유효성 검증을 DB 레벨에서 할 수 있도록 했습니다. 과금 데이터에 대해 일별 배치 집계 후 정산된 데이터를 저장할 광고과금정산 테이블은 클릭일자-광고입찰ID 두 개의 필드를 이용해 복합키를 사용했습니다.

여기까지는 관계형 DB를 공부하신 분들이라면 조금 고민한 후 무리없이 잘 진행할 수 있는데, 문제는 이를 어떻게 ORM 프레임워크 JPA를 이용해 구현할 것인가에 대해서는 JPA의 연관 관계 설계에 대한 이해가 필요했습니다. 저 또한 이 부분에 대해 자세히 알고 있지 않은 상태에서 프로젝트를 진행하다 보니 별도의 스터디가 필요했고, 구현 가능 여부가 확실치 않아서 프로젝트 진행 최우선 목표로 JPA 코드를 통한 데이터 제어 기능 구현을 삼았습니다.

## JPA를 이용한 테이블 연관 관계 설계
ERD 상 외래 키로 참조 관계를 가지고 있는 모든 테이블은 JPA를 통해 연관 관계를 설계해줘야 할 대상입니다. 모든 연관 관계를 다루기엔 포스트에서 다룰 내용이 지나치게 많아질테니, 일대다 연관 관계에 대해서만 생각해보면 업체-상품, 광고입찰-과금이 있습니다. 하나의 업체가 다양한 상품을 등록할 수 있고, 광고입찰로 노출된 광고를 다수의 사람이 클릭하여 다수의 과금 데이터를 생성시킬 수 있습니다.

그런데 JPA에는 일대다 연관 관계에 대해 단방향, 양방향 개념이 있습니다. 관계형 데이터 모델을 객체 지향 패러다임으로 다룰 수 있도록 하는 ORM 프레임워크인 JPA는, 데이터를 객체 관점에서 바라보기 때문에 객체 간 참조 관계에 따라 단방향과 양방향이 있을 수 있습니다. 이 때 참조 관계는 비즈니스 로직에 의존한다고 생각이 들었습니다. 데이터를 조작할 때 연관 관계가 있는 두 객체가 서로 참조할 필요가 있는가, 혹은 한 객체에서 다른 객체를 참조하고 그 반대는 필요하지 않은가 이런 필요성에 의해 양방향이냐 단방향이냐를 결정하여 설계했고, 그 결과 업체-상품의 관계는 양방향으로, 그 외에 경우는 단방향으로 설계했습니다.

<p class=short>CompanyEntity, ProductEntity 코드</p>

```java
/**
 * 엔티티의 생명주기를 감시하는 JpaAuditing 기능을 수행하는 엔티티 클래스
 * DB에 매핑되는 테이블 없이, 해당 엔티티를 상속하는 자식 엔티티에 대해 JpaAuditing 기능 수행
 */
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

/**
 * DB 테이블 'COMPANY'에 매핑되는 엔티티 클래스
 * ProductEntity와 일대다 양방향 연관 관계
 */
@Getter
@Setter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Entity
@Table(name="COMPANY")
public class CompanyEntity extends TimeEntity implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(length=30, unique=true, nullable=false, updatable=false)
    private String name;

    @Column(length=10)
    private String businessRegistrationNumber;

    @Column(length=20)
    private String phoneNumber;

    @Column(length=50)
    private String address;

    @OneToMany(mappedBy="companyEntity", fetch=FetchType.LAZY)
    private List<ProductEntity> productEntities;
    ...

/**
 * DB 테이블 'PRODUCT'에 매핑되는 엔티티 클래스
 * CompanyEntity와 다대일 양방향 연관 관계
 */
@Getter
@Setter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Entity
@Table(name="PRODUCT")
public class ProductEntity extends TimeEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="company_name", referencedColumnName="name")
    private CompanyEntity companyEntity;

    @Column(nullable=false)
    private String productName;

    @Column(nullable=false)
    private Long price;

    @Column(nullable=false)
    private Long stock;
    ...
```

또한 JPA의 영속성 문맥에 있는 엔티티 객체의 노출을 최소화하여 데이터 오류를 방지하기 위해 DTO(Data Transfer Object) 클래스로 엔티티를 감싸도록 했습니다.

<p class=short>샘플 데이터</p>

상품 ID | 업체명 | 상품명 | 판매가 | 재고
:----: | :----: | :----: | :----: | :----:
1000000001 | 이마트 | 허쉬 초코멜로쿠키 45g | 600 | 10
1000000002 | 신세계백화점 | 크리스피롤 12 곡 180g | 2,800 | 5
1000000003 | 삼성전자 | 갤럭시 22 자급제모델 | 1,200,000 | 0
1000000004 | 이마트 | 말랑카우 핸드워시 250ml | 2,600 | 6
1000000005 | 신세계백화점 | 삼립 미니꿀호떡 322g | 1,200 | 4
1000000006 | 이마트 | 피코크 어랑손만두 어랑만두 700g | 6,400 | 2
1000000007 | 신세계백화점 | 뺴빼로바 아몬드아이스크림 4입 | 2,800 | 1
1000000008 | 이마트 | 피코크 에이 클래스 우유 900ml | 2,500 | 3
1000000009 | 이마트 | 아삭달콤 방울토마토 500g | 4,500 | 0
1000000010 | 이마트 | [롯데삼강] 돼지바 (70ml*6입) | 3,000 | 1
1000000011 | 나이키 | 나이키 덩크로우 흰검 | 129,000 | 4
1000000012 | 스타벅스 | 이달의 원두 500g | 18,500 | 4
1000000013 | 스타벅스 | 아쿠아 머그 | 23,000 | 7
1000000014 | 삼성전자 | 삼성전자 43인치 스마트모니터 | 480,000 | 2
1000000015 | 나이키 | 나이키 헤리티지 스우시 캡 | 25,000 | 5
{: .align-center}

![](https://drive.google.com/uc?export=view&id=1OumEfcTfKXUo_K443Q7gRlEWZh8GpyLL){: .align-center}
&lt;화면 1. 상품-업체 샘플 데이터 생성 결과&gt;
{: style="text-align: center;"}


그런데 양방향 일대다 연관 관계인 업체-상품 엔티티를 코딩해놓고, 샘플 데이터를 생성한 뒤 조회해보니 많은 문제가 발생했습니다.

### 양방향 연관 관계 순환 참조
테스트를 위해 생성된 데이터에서 업체 정보 리스트를 조회하려고 시도했더니 다음과 같은 오류가 발생했습니다.

```txt
java.lang.StackOverflowError: null
    at java.base/java.util.stream.AbstractPipeline.<init>(AbstractPipeline.java:211) ~[na:na]
    at java.base/java.util.stream.ReferencePipeline.<init>(ReferencePipeline.java:96) ~[na:na]
    at java.base/java.util.stream.ReferencePipeline$StatelessOp.<init>(ReferencePipeline.java:800) ~[na:na]
    at java.base/java.util.stream.ReferencePipeline$3.<init>(ReferencePipeline.java:191) ~[na:na]
    at java.base/java.util.stream.ReferencePipeline.map(ReferencePipeline.java:190) ~[na:na]
    at com.ssg.backendpreassignment.entity.CompanyEntity.toDto(CompanyEntity.java:58) ~[classes/:na]
    at com.ssg.backendpreassignment.entity.ProductEntity.toDto(ProductEntity.java:47) ~[classes/:na]
    at com.ssg.backendpreassignment.entity.CompanyEntity.lambda$toDto$0(CompanyEntity.java:58) ~[classes/:na]
    at java.base/java.util.stream.ReferencePipeline$3$1.accept(ReferencePipeline.java:197) ~[na:na]
    at java.base/java.util.Iterator.forEachRemaining(Iterator.java:133) ~[na:na]
    at java.base/java.util.Spliterators$IteratorSpliterator.forEachRemaining(Spliterators.java:1845) ~[na:na]
    at java.base/java.util.stream.AbstractPipeline.copyInto(AbstractPipeline.java:509) ~[na:na]
    at java.base/java.util.stream.AbstractPipeline.wrapAndCopyInto(AbstractPipeline.java:499) ~[na:na]
    at java.base/java.util.stream.ReduceOps$ReduceOp.evaluateSequential(ReduceOps.java:921) ~[na:na]
    at java.base/java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:234) ~[na:na]
    at java.base/java.util.stream.ReferencePipeline.collect(ReferencePipeline.java:682) ~[na:na]
    at com.ssg.backendpreassignment.entity.CompanyEntity.toDto(CompanyEntity.java:58) ~[classes/:na]
    at com.ssg.backendpreassignment.entity.ProductEntity.toDto(ProductEntity.java:47) ~[classes/:na]
    at com.ssg.backendpreassignment.entity.CompanyEntity.lambda$toDto$0(CompanyEntity.java:58) ~[classes/:na]
    ...
```

스택오버플로우가 발생한 걸 보니 호출 스택이 초과한 것으로 보입니다. JPA가 업체 정보를 조회하면서 상품 정보를 조회하고, 상품 정보를 조회하면서 업체 정보를 조회하면서 다시 상품 정보를 조회하는 식으로 무한히 참조하는 것이 문제였습니다. 양방향 연관 관계 설계 시 발생할 수 있는 문제로 어떻게 해결할까 고민하다가, 엔티티를 DTO로 감쌀 때 자신이 참조하고 있는 연관 엔티티는 DTO로 감싸지 않고 null로 설정하도록 구현하여 해결했습니다.

<p class=short>엔티티 순환 참조 해결 코드</p>

```java
/**
 * DB 테이블 'COMPANY'에 매핑되는 엔티티 클래스
 * ProductEntity와 일대다 양방향 연관 관계
 */
@Getter
@Setter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Entity
@Table(name="COMPANY")
public class CompanyEntity extends TimeEntity implements Serializable {
    ...

    public CompanyDto toDto() {
        return CompanyDto.builder()
                .id(this.getId())
                .name(this.getName())
                .businessRegistrationNumber(this.getBusinessRegistrationNumber())
                .phoneNumber(this.getPhoneNumber())
                .address(this.getAddress())
                .productDtos(this.getProductEntities().stream().map(productEntity -> productEntity.toDtoExceptCompany()).collect(Collectors.toList()))
                .createdDate(this.getCreatedDate())
                .lastModifiedDate(this.getLastModifiedDate())
                .build();
    }

    public CompanyDto toDtoExceptProducts() {
        return CompanyDto.builder()
                .id(this.getId())
                .name(this.getName())
                .businessRegistrationNumber(this.getBusinessRegistrationNumber())
                .phoneNumber(this.getPhoneNumber())
                .address(this.getAddress())
                .createdDate(this.getCreatedDate())
                .lastModifiedDate(this.getLastModifiedDate())
                .build();
    }
}

/**
 * DB 테이블 'PRODUCT'에 매핑되는 엔티티 클래스
 * CompanyEntity와 다대일 양방향 연관 관계
 */
@Getter
@Setter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Entity
@Table(name="PRODUCT")
public class ProductEntity extends TimeEntity {
    ...

    public ProductDto toDto() {
        return ProductDto.builder()
                .id(this.getId())
                .companyDto(this.getCompanyEntity().toDtoExceptProducts())
                .productName(this.getProductName())
                .price(this.getPrice())
                .stock(this.getStock())
                .createdDate(this.getCreatedDate())
                .lastModifiedDate(this.getLastModifiedDate())
                .build();
    }

    public ProductDto toDtoExceptCompany() {
        return ProductDto.builder()
                .id(this.getId())
                .productName(this.getProductName())
                .price(this.getPrice())
                .stock(this.getStock())
                .createdDate(this.getCreatedDate())
                .lastModifiedDate(this.getLastModifiedDate())
                .build();
    }
}
```

### N+1 문제
순환 참조 문제를 해결하고 기업 정보 리스트 조회가 잘 되길래 좋아하고 있었는데, 콘솔에 출력되는 SQL 쿼리문이 생각보다 많아서 유심히 보다가 문제가 있음을 확인했습니다. 생성된 쿼리문은 아래와 같습니다.

```txt
Hibernate: select companyent0_.id as id1_4_, companyent0_.created_date as created_2_4_, companyent0_.last_modified_date as last_mod3_4_, companyent0_.address as address4_4_, companyent0_.business_registration_number as business5_4_, companyent0_.name as name6_4_, companyent0_.phone_number as phone_nu7_4_ from company companyent0_
Hibernate: select productent0_.company_name as company_7_6_0_, productent0_.id as id1_6_0_, productent0_.id as id1_6_1_, productent0_.created_date as created_2_6_1_, productent0_.last_modified_date as last_mod3_6_1_, productent0_.company_name as company_7_6_1_, productent0_.price as price4_6_1_, productent0_.product_name as product_5_6_1_, productent0_.stock as stock6_6_1_ from product productent0_ where productent0_.company_name=?
Hibernate: select companyent0_.id as id1_4_1_, companyent0_.created_date as created_2_4_1_, companyent0_.last_modified_date as last_mod3_4_1_, companyent0_.address as address4_4_1_, companyent0_.business_registration_number as business5_4_1_, companyent0_.name as name6_4_1_, companyent0_.phone_number as phone_nu7_4_1_, productent1_.company_name as company_7_6_3_, productent1_.id as id1_6_3_, productent1_.id as id1_6_0_, productent1_.created_date as created_2_6_0_, productent1_.last_modified_date as last_mod3_6_0_, productent1_.company_name as company_7_6_0_, productent1_.price as price4_6_0_, productent1_.product_name as product_5_6_0_, productent1_.stock as stock6_6_0_ from company companyent0_ left outer join product productent1_ on companyent0_.name=productent1_.company_name where companyent0_.name=?
Hibernate: select productent0_.company_name as company_7_6_0_, productent0_.id as id1_6_0_, productent0_.id as id1_6_1_, productent0_.created_date as created_2_6_1_, productent0_.last_modified_date as last_mod3_6_1_, productent0_.company_name as company_7_6_1_, productent0_.price as price4_6_1_, productent0_.product_name as product_5_6_1_, productent0_.stock as stock6_6_1_ from product productent0_ where productent0_.company_name=?
Hibernate: select companyent0_.id as id1_4_1_, companyent0_.created_date as created_2_4_1_, companyent0_.last_modified_date as last_mod3_4_1_, companyent0_.address as address4_4_1_, companyent0_.business_registration_number as business5_4_1_, companyent0_.name as name6_4_1_, companyent0_.phone_number as phone_nu7_4_1_, productent1_.company_name as company_7_6_3_, productent1_.id as id1_6_3_, productent1_.id as id1_6_0_, productent1_.created_date as created_2_6_0_, productent1_.last_modified_date as last_mod3_6_0_, productent1_.company_name as company_7_6_0_, productent1_.price as price4_6_0_, productent1_.product_name as product_5_6_0_, productent1_.stock as stock6_6_0_ from company companyent0_ left outer join product productent1_ on companyent0_.name=productent1_.company_name where companyent0_.name=?
Hibernate: select productent0_.company_name as company_7_6_0_, productent0_.id as id1_6_0_, productent0_.id as id1_6_1_, productent0_.created_date as created_2_6_1_, productent0_.last_modified_date as last_mod3_6_1_, productent0_.company_name as company_7_6_1_, productent0_.price as price4_6_1_, productent0_.product_name as product_5_6_1_, productent0_.stock as stock6_6_1_ from product productent0_ where productent0_.company_name=?
Hibernate: select companyent0_.id as id1_4_1_, companyent0_.created_date as created_2_4_1_, companyent0_.last_modified_date as last_mod3_4_1_, companyent0_.address as address4_4_1_, companyent0_.business_registration_number as business5_4_1_, companyent0_.name as name6_4_1_, companyent0_.phone_number as phone_nu7_4_1_, productent1_.company_name as company_7_6_3_, productent1_.id as id1_6_3_, productent1_.id as id1_6_0_, productent1_.created_date as created_2_6_0_, productent1_.last_modified_date as last_mod3_6_0_, productent1_.company_name as company_7_6_0_, productent1_.price as price4_6_0_, productent1_.product_name as product_5_6_0_, productent1_.stock as stock6_6_0_ from company companyent0_ left outer join product productent1_ on companyent0_.name=productent1_.company_name where companyent0_.name=?
Hibernate: select productent0_.company_name as company_7_6_0_, productent0_.id as id1_6_0_, productent0_.id as id1_6_1_, productent0_.created_date as created_2_6_1_, productent0_.last_modified_date as last_mod3_6_1_, productent0_.company_name as company_7_6_1_, productent0_.price as price4_6_1_, productent0_.product_name as product_5_6_1_, productent0_.stock as stock6_6_1_ from product productent0_ where productent0_.company_name=?
Hibernate: select companyent0_.id as id1_4_1_, companyent0_.created_date as created_2_4_1_, companyent0_.last_modified_date as last_mod3_4_1_, companyent0_.address as address4_4_1_, companyent0_.business_registration_number as business5_4_1_, companyent0_.name as name6_4_1_, companyent0_.phone_number as phone_nu7_4_1_, productent1_.company_name as company_7_6_3_, productent1_.id as id1_6_3_, productent1_.id as id1_6_0_, productent1_.created_date as created_2_6_0_, productent1_.last_modified_date as last_mod3_6_0_, productent1_.company_name as company_7_6_0_, productent1_.price as price4_6_0_, productent1_.product_name as product_5_6_0_, productent1_.stock as stock6_6_0_ from company companyent0_ left outer join product productent1_ on companyent0_.name=productent1_.company_name where companyent0_.name=?
Hibernate: select productent0_.company_name as company_7_6_0_, productent0_.id as id1_6_0_, productent0_.id as id1_6_1_, productent0_.created_date as created_2_6_1_, productent0_.last_modified_date as last_mod3_6_1_, productent0_.company_name as company_7_6_1_, productent0_.price as price4_6_1_, productent0_.product_name as product_5_6_1_, productent0_.stock as stock6_6_1_ from product productent0_ where productent0_.company_name=?
Hibernate: select companyent0_.id as id1_4_1_, companyent0_.created_date as created_2_4_1_, companyent0_.last_modified_date as last_mod3_4_1_, companyent0_.address as address4_4_1_, companyent0_.business_registration_number as business5_4_1_, companyent0_.name as name6_4_1_, companyent0_.phone_number as phone_nu7_4_1_, productent1_.company_name as company_7_6_3_, productent1_.id as id1_6_3_, productent1_.id as id1_6_0_, productent1_.created_date as created_2_6_0_, productent1_.last_modified_date as last_mod3_6_0_, productent1_.company_name as company_7_6_0_, productent1_.price as price4_6_0_, productent1_.product_name as product_5_6_0_, productent1_.stock as stock6_6_0_ from company companyent0_ left outer join product productent1_ on companyent0_.name=productent1_.company_name where companyent0_.name=?
```

업체 리스트를 조회하는 요청인데, 업체와 연관된 상품 정보에 대한 SELECT 쿼리가 실행된 것을 확인할 수 있었습니다. 이 문제는 그 유명한 N+1 문제였는데, N+1 문제의 현상과 해결책에 대해서 조사를 하다가 다른 사람들의 포스트에서 문제 삼는 쿼리 현상과 제가 겪은 쿼리 현상이 조금 달라 의아했습니다. 다른 사람들의 쿼리 현상과 제 쿼리 현상을 비교하면 다음과 같습니다.

다른 사람들의 쿼리 현상 | 나의 쿼리 현상
:---: | :---:
일대다의 '일'에 해당하는 엔티티를 조회하는 쿼리 1번, '다'에 해당하는 연관 엔티티(N개)를 조회하는 쿼리 N번 발생(1+N) | 일대다의 '일'에 해당하는 엔티티를 전체 조회하는 쿼리 1번, '다'에 해당하는 연관 엔티티를 조회할 때 쿼리 1번, FK에 대해 LEFT OUTER JOIN 쿼리 1번 발생(1+1+1)
쿼리 N번은 각각 JOIN 없이 WHERE절 조건에 FK를 이용하여 SELECT(같은 쿼리가 중복하여 발생하는 것으로 보임) | '다' 쿼리 시 똑같이 JOIN 없이 WHERE절 조건에 FK를 이용하여 SELECT 하되 중복 쿼리가 없음
LEFT OUTER JOIN문이 보이지 않음 | LEFT OUTER JOIN문이 보임

LEFT OUTER JOIN은 테스트 코드로 실험 결과 단방향 일대다 연관 관계에서는 발생하지 않고 양방향 일대다 연관 관계에서만 발생하는 것으로 확인했습니다. 그리고 제가 참고했던 포스트들은 2018년도~2021년도 자료가 많았는데, 제 추측으론 최근에 JPA Hibernate 진영에서 N+1 문제에 대한 이슈가 계속 제기되자 이에 대한 성능 개선을 한 것 같습니다.

쿼리문을 더 자세히 보기 위해 업체 리스트가 아니라 업체 ID, 이름에 따라 업체 한 개에 대해서 정보를 조회하는 테스트 코드를 작성해서 쿼리를 확인했습니다.

<p class=short>컨트롤러</p>

```java
/**
 * 업체 도메인 관련 HTTP request 매핑 및 처리를 위한 컨트롤러 클래스
 */
@RestController
@RequiredArgsConstructor
public class CompanyRestController {
    private final CompanyService companyService;

    @GetMapping("/api/company/id/{companyId}")
    public ResponseEntity<?> getCompanyById(@PathVariable Long companyId) {
        return new ResponseEntity<RestResponse>(RestResponse.builder()
                .code(HttpStatus.OK.value())
                .status(HttpStatus.OK)
                .result(companyService.findById(companyId))
                .build(), HttpStatus.OK);
    }

    @GetMapping("/api/company/name/{companyName}")
    public ResponseEntity<?> getCompanyByName(@PathVariable String companyName) {
        return new ResponseEntity<RestResponse>(RestResponse.builder()
                .code(HttpStatus.OK.value())
                .status(HttpStatus.OK)
                .result(companyService.findByName(companyName))
                .build(), HttpStatus.OK);
    }
}
```

<p class=short>서비스</p>

```java
/**
 * 업체 도메인의 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class CompanyService {
    private final ProductRepository productRepository;
    private final CompanyRepository companyRepository;

    @Transactional(readOnly=true)
    public CompanyDto findById(Long id) {
        Optional<CompanyEntity> companyEntityWrapper = companyRepository.findById(id);

        if (companyEntityWrapper.isPresent()) {
            return companyEntityWrapper.get().toDto();
        }

        return null;
    }

    @Transactional
    public CompanyDto findByName(String companyName) {
        Optional<CompanyEntity> companyEntityWrapper = companyRepository.findByName(companyName);
        
        if (companyEntityWrapper.isPresent()) {
            return companyEntityWrapper.get().toDto();
        }
        
        return null;
    }
    ...
}
```

<p class=short>JPA 인터페이스(JpaRepository)</p>

```java
/**
 * CompanyEntity의 영속성을 관리하며 엔티티에 매핑된 DB 테이블 'COMPANY'에 CRUD 기능 수행
 */
public interface CompanyRepository extends JpaRepository<CompanyEntity, Long> {
    Optional<CompanyEntity> findByName(String name);
}
```

<p class=short>테스트 코드</p>

```java
@SpringBootTest
@AutoConfigureMockMvc
class ApplicationTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CompanyService companyService;

    @Test
    void getCompanyById() throws Exception {
        Long companyId = (long)1e9+1;
        String companyName = "이마트";

        this.mockMvc.perform(
                        get("/api/company/id/"+companyId)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.name").value("이마트"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.productDtos.size()").value(6));
    }

    @Test
    void getCompanyByName() throws Exception {
        Long companyId = (long)1e9+1;
        String companyName = "이마트";

        this.mockMvc.perform(
                        get("/api/company/name/"+companyName)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.id").value(companyId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.productDtos.size()").value(6));
    }
}
```

![](https://drive.google.com/uc?export=view&id=10ZsG6CMXPh1315O8DRQLxg4sy_bQ2SHO){: .align-center}
&lt;화면 2. getCompanyById(), getCompanyByName() API 테스트 결과(no fetch)&gt;
{: style="text-align: center;"}

소요 시간을 확인해보니 getCompanyById()가 getCompanyByName()에 비해 약 10배가량 더 소요했는데, 이는 테스트 진행 시 필요한 Mock 빈들을 주입받는 시간으로 보입니다. 이에 대해서도 자세한 테스트는 나중에 다뤄보기로 하고, 우선 쿼리를 살펴보기로 했습니다.

```txt:getCompanyById()
Hibernate: 
    select
        companyent0_.id as id1_4_0_,
        companyent0_.created_date as created_2_4_0_,
        companyent0_.last_modified_date as last_mod3_4_0_,
        companyent0_.address as address4_4_0_,
        companyent0_.business_registration_number as business5_4_0_,
        companyent0_.name as name6_4_0_,
        companyent0_.phone_number as phone_nu7_4_0_,
        productent1_.company_name as company_7_6_1_,
        productent1_.id as id1_6_1_,
        productent1_.id as id1_6_2_,
        productent1_.created_date as created_2_6_2_,
        productent1_.last_modified_date as last_mod3_6_2_,
        productent1_.company_name as company_7_6_2_,
        productent1_.price as price4_6_2_,
        productent1_.product_name as product_5_6_2_,
        productent1_.stock as stock6_6_2_ 
    from
        company companyent0_ 
    left outer join
        product productent1_ 
            on companyent0_.name=productent1_.company_name 
    where
        companyent0_.id=?
Hibernate: 
    select
        companyent0_.id as id1_4_1_,
        companyent0_.created_date as created_2_4_1_,
        companyent0_.last_modified_date as last_mod3_4_1_,
        companyent0_.address as address4_4_1_,
        companyent0_.business_registration_number as business5_4_1_,
        companyent0_.name as name6_4_1_,
        companyent0_.phone_number as phone_nu7_4_1_,
        productent1_.company_name as company_7_6_3_,
        productent1_.id as id1_6_3_,
        productent1_.id as id1_6_0_,
        productent1_.created_date as created_2_6_0_,
        productent1_.last_modified_date as last_mod3_6_0_,
        productent1_.company_name as company_7_6_0_,
        productent1_.price as price4_6_0_,
        productent1_.product_name as product_5_6_0_,
        productent1_.stock as stock6_6_0_ 
    from
        company companyent0_ 
    left outer join
        product productent1_ 
            on companyent0_.name=productent1_.company_name 
    where
        companyent0_.name=?
```

```txt:getCompanyByName()
Hibernate: 
    select
        companyent0_.id as id1_4_,
        companyent0_.created_date as created_2_4_,
        companyent0_.last_modified_date as last_mod3_4_,
        companyent0_.address as address4_4_,
        companyent0_.business_registration_number as business5_4_,
        companyent0_.name as name6_4_,
        companyent0_.phone_number as phone_nu7_4_ 
    from
        company companyent0_ 
    where
        companyent0_.name=?
Hibernate: 
    select
        productent0_.company_name as company_7_6_0_,
        productent0_.id as id1_6_0_,
        productent0_.id as id1_6_1_,
        productent0_.created_date as created_2_6_1_,
        productent0_.last_modified_date as last_mod3_6_1_,
        productent0_.company_name as company_7_6_1_,
        productent0_.price as price4_6_1_,
        productent0_.product_name as product_5_6_1_,
        productent0_.stock as stock6_6_1_ 
    from
        product productent0_ 
    where
        productent0_.company_name=?
Hibernate: 
    select
        companyent0_.id as id1_4_1_,
        companyent0_.created_date as created_2_4_1_,
        companyent0_.last_modified_date as last_mod3_4_1_,
        companyent0_.address as address4_4_1_,
        companyent0_.business_registration_number as business5_4_1_,
        companyent0_.name as name6_4_1_,
        companyent0_.phone_number as phone_nu7_4_1_,
        productent1_.company_name as company_7_6_3_,
        productent1_.id as id1_6_3_,
        productent1_.id as id1_6_0_,
        productent1_.created_date as created_2_6_0_,
        productent1_.last_modified_date as last_mod3_6_0_,
        productent1_.company_name as company_7_6_0_,
        productent1_.price as price4_6_0_,
        productent1_.product_name as product_5_6_0_,
        productent1_.stock as stock6_6_0_ 
    from
        company companyent0_ 
    left outer join
        product productent1_ 
            on companyent0_.name=productent1_.company_name 
    where
        companyent0_.name=?
```

ID로 조회한 경우 SELECT 쿼리가 총 두 번 발생했고, '다'의 상품 엔티티들을 LEFT OUTER JOIN으로 한 번에 가져온 뒤 FK로 한 번 더 LEFT OUTER JOIN을 수행했습니다. 이와 같이 한 번 더 쿼리가 발생한 이유는 FK를 업체 테이블의 PK인 ID로 설정하지 않아 JPQL이 쿼리를 한 번 더 생성한 것으로 추측됩니다. 이를 증명하려면 PK를 FK로 참조하도록 연관 관계를 설계하여 테스트를 해봐야 할 것 같습니다. ···*(1)*

업체명으로 조회한 경우 SELECT 쿼리가 총 세 번 발생했고, 업체 테이블과 상품 테이블 각각에 대해 업체명을 WHERE 조건으로 SELECT하여 조회한 뒤 FK에 대해 LEFT OUTER JOIN을 수행했습니다. 이 경우 ID로 조회한 경우와 달리 업체 테이블을 조회할 때 상품 테이블로 LEFT OUTER JOIN을 하지 않고 업체, 상품 테이블 각각에 대해 SELECT 쿼리가 발생했습니다. PK인 ID로 조회하는 경우와 아닌 경우 생성되는 JPQL이 다른 것으로 추측됩니다. 그리고 이 때 '다' 엔티티, 즉 상품 테이블에 대해 추가적인 쿼리가 발생하는 문제가 N+1 문제라고 생각됩니다.

#### *(1)* 그래서 별도로 테스트를 진행했습니다
추측으로 끝내기엔 너무 아쉬워서 아예 별도로 테스트 프로젝트를 진행했습니다. 광고 플랫폼 도메인에서 업체-상품 관계와 비슷하게 학과-학생 양방향 일대다 연관 관계에 대해 프로젝트를 설계하고 테스트를 진행했습니다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-06-20T11:39:38.975Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36\&quot; etag=\&quot;MehTr8dg-lerYRQwnKvO\&quot; version=\&quot;20.0.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;Dv1acctghuHOW7tnIxDJ\&quot; name=\&quot;FK PK N+1 Test ERD 1\&quot;&gt;7VpRb9o6FP41PN6JJEDL42D0Xt210kQ37bFysUmsOXbkmAH99TuO7YTghpWOkmpB4iE+OTmxz/f5fPIhvWiabv6VKEvuBCasF/bxphd96oVhMAjDnv718dZYroYDY4glxdapMtzTJ2KNfWtdUUzymqMSgima1Y0LwTlZqJoNSSnWdbelYPW3ZigmnuF+gZhv/U6xSoz1Oryq7P8RGifuzcFobO6kyDnbleQJwmK9Y4pmvWgqhVDmKt1MCdPJc3kxz9003C0nJglXL3lg9v+3wfzh8eNntLqLg+Q7WYT5PzbKT8RWdsGfCIRUqQ5qpq22LhewgkxfKvSoTZNcgaeFLOqDAUBQiHIiwRAUY8ZQltPC3VgSyvAt2oqVcoHcaLKkG4LnBjHtC+DdQjA91MGXEPzeTkbfRozGHK4XMFX9xokkOczlFuXKeti1EanIpjFpQQkFcJiIlCi5BRf3wMiit3W0tON1RYbg2tqSHSKMrQ1Z/sVl6AoiuLAoHYFY6CF2GKe55twkEZI+aXSYzeYudsV4TVOGOJAZ4T3TRBSbt8CAMjYVTGiAueDEw1g7YSmyr0jGRFlDJihXRR6GE/hBZqb9D8PeEOY6hXFQjeGn3aWaCp4rCVzSMQhAuiYa1okSmQ3KyNLFlzbt+vpRKCXSYwjQvC98VlgWRC8kQfRWJIg8Enz53EgDvZ8pYnMoj4jHzIBWVEtUgfYMss/muszvfuL3t6eAtC9ZUfASijHhf4RH+DweOwBER+bfBquycnQ0xKDucKRgg6w4zj1Qy3m+HueBhzO4t4uzK7vGd5JnaEF5fGueHO0RYXguImyaN+bwpMR4UbgzMGN4kYEXyUD/DWVg1LYMjDwSfGtbBgimLl6TCtSV4tXYDLspCVfPSELz3n8nmnBaDWhAvnMacO1R4V6t8OXkVtwdRK88uZXonrxcjy+afYaj2/VBzW796OYaW905u427KdSB31vr+uGtgQmdE+7gUvjf4LB2uPC3flgL/KbdTduF/3yntaCjHbzAb+Hh8h+WB4ofOEqhBL93XTitDjSRoXtCcGnjta8M49aVwe/jvX9d+IPd39HOXeC37qD4k46V/kvzzibC795dSv+5S38Qtl77j2gKvpvaf6ozQQM4f7sQONLtCgFd/HjooBo0MKBzahD6zUKPCQTHxO06SCtV2zlhSFHBZ9UdszeNHMAxCwRDpcxuZcLxR/1JJAxn8ycixVdxh/jW3LmhzEmK1MskpXpogameM6wqjDuPQI0XP8ovJO3L3DT2ZSqoSrpeUyNlrCkXK7kgh5Jn/JSTqka2/b4HUf5LVPtHyBllke+f9RkfIN0XrZc7dHa9f6s+3keCZqX2qYpkXqBBvx4oCvcCmVR4gX7PVhhWX6Qa9+q73mj2Cw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 2. 테스트 프로젝트 ERD - 상황 1: FK가 PK를 참조하는 경우&gt;
{: style="text-align: center;"}

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-06-20T11:41:19.811Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36\&quot; etag=\&quot;ezHj5IL3sx-U12QFUxGG\&quot; version=\&quot;20.0.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram name=\&quot;FK PK N+1 Test ERD 2\&quot; id=\&quot;9oYjQFuCC-lx8KSD_U39\&quot;&gt;7VpRb9owEP41PG4icaDlcVC6SqNSRTftsXKxCdYcO3PMgP762bGdENyU0lJADRIP8eVyie/7fJ98uAUGyfK7gOnsliNMW2EbLVvgqhWGQRSGLf1ro5WxXHQiY4gFQdapNNyTJ2yNbWudE4SziqPknEqSVo0TzhieyIoNCsEXVbcpp9W3pjDGnuF+Aqlv/U2QnBnrZXhR2m8wiWfuzUG3Z+4k0DnbmWQziPhizQSGLTAQnEtzlSwHmOrkubywv+FtZzyEN7/AfDz6Dm+iu8svJtj1Lo8UUxCYyf2GDjsm9j9I5zZhV1i9SCb6VWbacuVyqTKQ6ksJH7Wpn0nlaSEHbWVQIEpIGBbKEORjSmGakdzdWGaEohFc8bl0gdyoPyVLjMYGce2rwB+pYHqog09V8Hv7Mfo2pCRm6nqiPlW/sS9wpr5lBDNpPezcsJB4ucGGLakMCnzVwsA8wVKs1HMuStdSYuW4bseLkmHBpbXN1tjVszZoSR0XoUvg1IXFbhccux6OL6M31kzuz7ggTxozanO8jmg+XpCEQqaWCEQbpj7PS0KODKF0wCnXsDPOsIe8dkKCpz+hiLG0hpQTJvNEdPrqp1IzaH/ttDrqWwdqHJRj9dPuQg44y6RQDNMxsAJ6gTXYfclTG5TiqYsvbN719SOXkifvpoVZLj4vLA/AK2kAPowGFx4N7n7UEkGvcwLpWJVdyGJqYMurMCxhewbbZ7NdZHgz9ZvLlqvET2leSGcEIczeh0j3eUTWIAA7ImCDlWnZORqkqiAxKNUamTOUebAW3/kOpC89pJX/cZF2Bdn49rMUTgiLR+bJ7gYVOgejwrJ+cXb2So1XhTsEN3pnMXiVGLQ/Ugy6xxYDF3iNBr+OLQYYERevTguqevF2dHrNFAYQeKgTVL/+T0QZ9qwENdg3TglA6JHhXs7ReW9XT44IvHFvV2C+/0IOznp+gM2dWSynu7kDkUeDT765M8RvoIb7Xbmmb+7qqNA8Se+ea//+93Jbav/x93J+Y+/62LX/cHs50NAmH/CbfKj4d+aBoAcGE1WET10Z9qwE5zafTcS5zXcC0tA7tjREfpvv9IXhHXA0tK8X+X09Vf1xw2r/ubFn2eA39s61/+C1PwiPXvx3aA2eTPHf064gqgHn0yuB3wdkZPLnoXlyUMeA5smB3zD0mIBRjN2qU2klcjXGFErC2bC8Y9am0YMg1IohE2qXMmbomz6QqYbD8RMW/Ce/hWxl7lwT6jRF6GniQj60wpTPGVblxrVHVJHnf4rzmfZl7jM2dSooa7qe026UsX4Zn4sJfsHPnaGQTsFqJWJ7b6L4C6nyd5EzihyFf9V5vEDFOy2jayR3B22tJnlnDM1U7VMl9bxAUbsaCIQbgUwqvEDbOayG5SlZ416eNQbD/w==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>
&lt;그림 3. 테스트 프로젝트 ERD - 상황 2: FK가 PK가 아닌 필드를 참조하는 경우&gt;
{: style="text-align: center;"}

우선 1번 상황에서, '일' 엔티티의 PK로 조회하는 테스트를 수행했습니다.

<p class=short>엔티티</p>

```java
@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
@Entity
@Table(name="DEPARTMENT")
public class DepartmentEntity implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private Long id2;

    @OneToMany(mappedBy="departmentEntity", fetch=FetchType.EAGER)
    private List<StudentEntity> studentEntities = new ArrayList<>();

    @Builder
    public DepartmentEntity(Long id, Long id2, List<StudentEntity> studentEntities) {
        this.id = id;
        this.id2 = id2;
        this.studentEntities = studentEntities;
    }

    public DepartmentDto toDto() {
        return DepartmentDto.builder()
                .id(this.getId())
                .id2(this.getId2())
                .studentDtos(this.getStudentEntities().stream().map(ent -> ent.toDtoExceptDepartment()).collect(Collectors.toList()))
                .build();
    }

    public DepartmentDto toDtoExceptStudents() {
        return DepartmentDto.builder()
                .id(this.getId())
                .id2(this.getId2())
                .build();
    }

    public void addStudentEntity(StudentEntity studentEntity) {
        if (this.getStudentEntities() == null) {
            this.setStudentEntities(new ArrayList<>());
        }

        this.studentEntities.add(studentEntity);
    }
}

@Getter
@Setter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
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

    @ManyToOne
    @JoinColumn(name="department_id_naming", referencedColumnName="id")
    private DepartmentEntity departmentEntity;

    @Builder
    public StudentEntity(Long id, String name, String nickName, DepartmentEntity departmentEntity) {
        this.id = id;
        this.name = name;
        this.nickName = nickName;
        this.departmentEntity = departmentEntity;
    }

    public StudentDto toDto() {
        return StudentDto.builder()
                .id(this.getId())
                .name(this.getName())
                .departmentDto(this.getDepartmentEntity().toDtoExceptStudents())
                .build();
    }

    public StudentDto toDtoExceptDepartment() {
        return StudentDto.builder()
                .id(this.getId())
                .name(this.getName())
                .build();
    }
}
```

<p class=short>테스트 코드(1번 상황, FK -> PK, PK로 조회)</p>

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

        DepartmentEntity createdDepartmentEntity = departmentRepository.save(departmentDto.toEntityExceptStudents());

        List<StudentDto> studentDtos = new ArrayList<>();

        studentDtos.add(StudentDto.builder()
                .name("testName1")
                .nickName("testNickName1")
                .build());
        studentDtos.add(StudentDto.builder()
                .name("testName2")
                .nickName("testNickName2")
                .build());
        studentDtos.add(StudentDto.builder()
                .name("testName3")
                .nickName("testNickName3")
                .build());

        for (StudentDto studentDto: studentDtos) {
            StudentEntity studentEntity = studentDto.toEntityExceptDepartment();
            studentEntity.setDepartmentEntity(createdDepartmentEntity);
            studentRepository.save(studentEntity);
        }

        System.out.println("After inserts,");

        DepartmentEntity resDepartmentEntity = departmentRepository.findById(1L).get();

        int i = 1;
        for (StudentEntity resStudentEntity: resDepartmentEntity.getStudentEntities()) {
            Assertions.assertEquals(resStudentEntity.getNickName(), "testNickName"+i++);
        }
    }
}
```

<p class=short>결과(1번 상황, FK -> PK, PK로 조회)</p>

```txt
After inserts,
Hibernate: 
    select
        department0_.id as id1_0_0_,
        department0_.id2 as id2_0_0_,
        studentent1_.department_id_naming as departme4_1_1_,
        studentent1_.id as id1_1_1_,
        studentent1_.id as id1_1_2_,
        studentent1_.department_id_naming as departme4_1_2_,
        studentent1_.name as name2_1_2_,
        studentent1_.nick_name as nick_nam3_1_2_ 
    from
        department department0_ 
    left outer join
        student studentent1_ 
            on department0_.id=studentent1_.department_id_naming 
    where
        department0_.id=?
```

**PK를 FK로 참조하는 관계에서 '일' 엔티티에 대해 PK로 조회하면 SELECT 쿼리가 한 개만 발생합니다.** 제 추측이 맞아들어가고 있다는 증거입니다. 다음으로, 1번 상황에서 '일' 엔티티에 대해 PK가 아닌 다른 필드 `id2`로 조회하는 테스트 코드를 수행했습니다.

<p class=short>테스트 코드(1번 상황, FK -> PK, !PK로 조회)</p>

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

        DepartmentEntity createdDepartmentEntity = departmentRepository.save(departmentDto.toEntityExceptStudents());

        List<StudentDto> studentDtos = new ArrayList<>();

        studentDtos.add(StudentDto.builder()
                .name("testName1")
                .nickName("testNickName1")
                .build());
        studentDtos.add(StudentDto.builder()
                .name("testName2")
                .nickName("testNickName2")
                .build());
        studentDtos.add(StudentDto.builder()
                .name("testName3")
                .nickName("testNickName3")
                .build());

        for (StudentDto studentDto: studentDtos) {
            StudentEntity studentEntity = studentDto.toEntityExceptDepartment();
            studentEntity.setDepartmentEntity(createdDepartmentEntity);
            studentRepository.save(studentEntity);
        }

        System.out.println("After inserts,");

        DepartmentEntity resDepartmentEntity = departmentRepository.findById2(100001L).get();

        int i = 1;
        for (StudentEntity resStudentEntity: resDepartmentEntity.getStudentEntities()) {
            Assertions.assertEquals(resStudentEntity.getNickName(), "testNickName"+i++);
        }
    }
}
```

<p class=short>결과(1번 상황, FK -> PK, !PK로 조회)</p>

```txt
After inserts,
Hibernate: 
    select
        department0_.id as id1_0_,
        department0_.id2 as id2_0_ 
    from
        department department0_ 
    where
        department0_.id2=?
Hibernate: 
    select
        studentent0_.department_id_naming as departme4_1_0_,
        studentent0_.id as id1_1_0_,
        studentent0_.id as id1_1_1_,
        studentent0_.department_id_naming as departme4_1_1_,
        studentent0_.name as name2_1_1_,
        studentent0_.nick_name as nick_nam3_1_1_ 
    from
        student studentent0_ 
    where
        studentent0_.department_id_naming=?
```

비록 FK로 PK를 참조하고 있더라도 '일' 엔티티에 대해 PK로 조회하지 않는다면 '다' 엔티티에서 FK를 WHERE 조건으로 SELECT 쿼리가 추가로 발생합니다.

마지막으로 광고 플랫폼 도메인 상황과 같은 2번 상황으로 연관 관계를 설계하고 PK 필드로 조회, PK 필드가 아닌 경우로 조회하는 테스트를 진행했는데, 광고 플랫폼에서 발생했던 쿼리와 동일했습니다. 각각 2, 3개의 SELECT 쿼리가 발생했으며 마지막 SELECT에는 LEFT OUTER JOIN 절이 보이는 점까지 동일했는데, 이 마지막 SELECT문은 '다' 엔티티의 FK가 '일' 엔티티의 PK를 참조할 때 사용한 조회 쿼리에서 추가된 모습이었습니다. '다' 엔티티의 FK가 PK를 참조하지 않으니 앞선 쿼리에서 조회한 데이터들을 무시하고 다시 LEFT OUTER JOIN으로 WHERE 조건에 FK를 사용하여 가져오는 느낌입니다.

후술하겠지만, N+1 문제를 해결하는 방법으로 Fetch Join을 가장 많이 사용합니다. 이 때 1과 같이 일대다 관계에서 '다' 엔티티의 FK가 '일' 엔티티의 PK를 참조하는 경우 Fetch Join을 사용했을 때 결과적으로 SELECT 쿼리가 **한 번만** 발생합니다. 이에 대해서도 직접 테스트해봤습니다.

<p class=short>테스트 코드(1번 상황 FK -> PK, Fetch Join, findAll())</p>

```java
public interface DepartmentRepository extends JpaRepository<DepartmentEntity, Long> {
    @Query("SELECT DISTINCT d FROM DepartmentEntity d JOIN FETCH d.studentEntities")
    List<DepartmentEntity> findAllFetch();
}

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

        DepartmentEntity createdDepartmentEntity = departmentRepository.save(departmentDto.toEntityExceptStudents());

        List<StudentDto> studentDtos = new ArrayList<>();

        studentDtos.add(StudentDto.builder()
                .name("testName1")
                .nickName("testNickName1")
                .build());
        studentDtos.add(StudentDto.builder()
                .name("testName2")
                .nickName("testNickName2")
                .build());
        studentDtos.add(StudentDto.builder()
                .name("testName3")
                .nickName("testNickName3")
                .build());

        for (StudentDto studentDto: studentDtos) {
            StudentEntity studentEntity = studentDto.toEntityExceptDepartment();
            studentEntity.setDepartmentEntity(createdDepartmentEntity);
            studentRepository.save(studentEntity);
        }

        System.out.println("After inserts,");

        List<DepartmentEntity> resDepartmentEntities = departmentRepository.findAllFetch();

        int i = 1;
        for (StudentEntity resStudentEntity: resDepartmentEntities.get(0).getStudentEntities()) {
            Assertions.assertEquals(resStudentEntity.getNickName(), "testNickName"+i++);
        }
    }
}
```

<p class=short>결과(1번 상황 FK -> PK, Fetch Join, findAll())</p>

```txt
After inserts,
Hibernate: 
    select
        distinct department0_.id as id1_0_0_,
        studentent1_.id as id1_1_1_,
        department0_.id2 as id2_0_0_,
        studentent1_.department_id_naming as departme4_1_1_,
        studentent1_.name as name2_1_1_,
        studentent1_.nick_name as nick_nam3_1_1_,
        studentent1_.department_id_naming as departme4_1_0__,
        studentent1_.id as id1_1_0__ 
    from
        department department0_ 
    inner join
        student studentent1_ 
            on department0_.id=studentent1_.department_id_naming
```

#### 그래서 결론은
많이 헤맸는데 결과적으로 결론은 다음과 같습니다.

1. '다' 엔티티의 FK가 '일' 엔티티의 PK를 참조하는 경우
    - '일' 엔티티의 PK로 조회하는 경우 **N+1 문제가 발생하지 않음**(FK(=1's PK)에 대해 LEFT OUTER JOIN한 SELECT문 한 번만 수행)
    - '일' 엔티티의 PK가 아닌 필드로 조회하는 경우 **N+1 문제 발생**(FK(=1's PK)를 WHERE 조건으로 한 SELECT문이 1개 추가 발생)
    - '일' 엔티티를 findAll()로 전체 조회하는 경우 **N+1 문제 발생**(FK(=1's PK)를 WHERE 조건으로 한 SELECT문이 '일' 엔티티 개수 K개 만큼 추가 발생)
2. '다' 엔티티의 FK가 '일' 엔티티의 PK가 아닌 다른 필드를 참조하는 경우
    - 1 하위 항목의 각 조회 상황과 동일할 때 결과 쿼리에 **추가적으로 '일' 엔티티 K개 각각에 대해 FK로 참조당하는 필드를 WHERE 조건으로 '다' 엔티티와 LEFT OUTER JOIN한 SELECT문이 추가됨**
        - '다' 엔티티의 FK가 PK를 참조하지 않으니 앞선 쿼리에서 조회한 데이터들을 무시하고 다시 WHERE 조건에 FK를 사용하여 LEFT OUTER JOIN으로 가져오는 느낌
3. 위 모든 경우에 대해 Fetch Join을 사용하면, 명시한 N+1 문제 상황에 대해 해결됨

FK로 PK를 참조하지 않는 것이 추가 SELECT - LEFT OUTER JOIN문을 발생시키는 것으로 보입니다. 그런데 **기존에 알려져 있는 N+1 문제처럼 '다' 엔티티의 개수 N개의 추가 SELECT 쿼리가 발생하진 않았습니다.** '일'의 엔티티 개수 K개 만큼만 '다' 엔티티에 대한 SELECT문이 발생했다는 것이 차이점입니다. 제가 감히 재명명을 해보자면 1+1 문제('일' 엔티티 조회 1건에 대해서 추가 1건의 SELECT문 발생)가 될 것 같습니다.



#### 다시 돌아와서
1+1 문제는 여전히 남아있으므로, N+1 문제에 대해서 조사하다보니 [Hibernate 공식 가이드 문서](https://docs.jboss.org/hibernate/orm/6.0/userguide/html_single/Hibernate_User_Guide.html#fetching)에서 Fetch Join으로 문제를 해결할 수 있다는 것을 확인했습니다. JPQL을 `@Query` 어노테이션을 통해 직접 작성하고 이 때 Fetch Join 구문을 활용하는 방법입니다. 제가 겪는 문제가 예전부터 이슈가 됐던 N+1문제랑은 조금 다르지만 쿼리문에 변화가 생기는지, 결과적으로 성능 향상이 기대되는지 확인하기 위해 Fetch Join을 적용했습니다.

```java
/**
 * 업체 도메인의 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class CompanyService {
    private final ProductRepository productRepository;
    private final CompanyRepository companyRepository;

    @Transactional(readOnly=true)
    public CompanyDto findById(Long id) {
        Optional<CompanyEntity> companyEntityWrapper = companyRepository.findByIdJpqlFetch(id);

        if (companyEntityWrapper.isPresent()) {
            return companyEntityWrapper.get().toDto();
        }

        return null;
    }

    @Transactional
    public CompanyDto findByName(String companyName) {
        Optional<CompanyEntity> companyEntityWrapper = companyRepository.findByNameJpqlFetch(companyName);

        if (companyEntityWrapper.isPresent()) {
            return companyEntityWrapper.get().toDto();
        }

        return null;
    }
}

/**
 * CompanyEntity의 영속성을 관리하며 엔티티에 매핑된 DB 테이블 'COMPANY'에 CRUD 기능 수행
 * JOIN FETCH로 쿼리 성능 향상
 */
public interface CompanyRepository extends JpaRepository<CompanyEntity, Long> {
    @Query("SELECT DISTINCT e FROM CompanyEntity e JOIN FETCH e.productEntities WHERE e.id=:id")
    Optional<CompanyEntity> findByIdJpqlFetch(@Param("id") Long id);

    @Query("SELECT DISTINCT e FROM CompanyEntity e JOIN FETCH e.productEntities WHERE e.name=:name")
    Optional<CompanyEntity> findByNameJpqlFetch(@Param("name") String name);
}
```

![](https://drive.google.com/uc?export=view&id=1xovzuk7kZgQQGq-RL65AoBuZzzGxywvP){: .align-center}
&lt;화면 3. getCompanyById(), getCompanyByName() API 테스트 결과(with fetch)&gt;
{: style="text-align: center;"}

소요 시간을 비교해보니, 단일 레코드를 조회하는데 Fetch Join으로 유의미한 성능 향상을 기대하진 못할 것 같습니다. 다음으로 쿼리를 살펴봤습니다.

```txt:getCompanyByIdWithFetch()
Hibernate: 
    select
        distinct companyent0_.id as id1_4_0_,
        productent1_.id as id1_6_1_,
        companyent0_.created_date as created_2_4_0_,
        companyent0_.last_modified_date as last_mod3_4_0_,
        companyent0_.address as address4_4_0_,
        companyent0_.business_registration_number as business5_4_0_,
        companyent0_.name as name6_4_0_,
        companyent0_.phone_number as phone_nu7_4_0_,
        productent1_.created_date as created_2_6_1_,
        productent1_.last_modified_date as last_mod3_6_1_,
        productent1_.company_name as company_7_6_1_,
        productent1_.price as price4_6_1_,
        productent1_.product_name as product_5_6_1_,
        productent1_.stock as stock6_6_1_,
        productent1_.company_name as company_7_6_0__,
        productent1_.id as id1_6_0__ 
    from
        company companyent0_ 
    inner join
        product productent1_ 
            on companyent0_.name=productent1_.company_name 
    where
        companyent0_.id=?
Hibernate: 
    select
        companyent0_.id as id1_4_1_,
        companyent0_.created_date as created_2_4_1_,
        companyent0_.last_modified_date as last_mod3_4_1_,
        companyent0_.address as address4_4_1_,
        companyent0_.business_registration_number as business5_4_1_,
        companyent0_.name as name6_4_1_,
        companyent0_.phone_number as phone_nu7_4_1_,
        productent1_.company_name as company_7_6_3_,
        productent1_.id as id1_6_3_,
        productent1_.id as id1_6_0_,
        productent1_.created_date as created_2_6_0_,
        productent1_.last_modified_date as last_mod3_6_0_,
        productent1_.company_name as company_7_6_0_,
        productent1_.price as price4_6_0_,
        productent1_.product_name as product_5_6_0_,
        productent1_.stock as stock6_6_0_ 
    from
        company companyent0_ 
    left outer join
        product productent1_ 
            on companyent0_.name=productent1_.company_name 
    where
        companyent0_.name=?
```

```txt:getCompanyByNameWithFetch()
Hibernate: 
    select
        distinct companyent0_.id as id1_4_0_,
        productent1_.id as id1_6_1_,
        companyent0_.created_date as created_2_4_0_,
        companyent0_.last_modified_date as last_mod3_4_0_,
        companyent0_.address as address4_4_0_,
        companyent0_.business_registration_number as business5_4_0_,
        companyent0_.name as name6_4_0_,
        companyent0_.phone_number as phone_nu7_4_0_,
        productent1_.created_date as created_2_6_1_,
        productent1_.last_modified_date as last_mod3_6_1_,
        productent1_.company_name as company_7_6_1_,
        productent1_.price as price4_6_1_,
        productent1_.product_name as product_5_6_1_,
        productent1_.stock as stock6_6_1_,
        productent1_.company_name as company_7_6_0__,
        productent1_.id as id1_6_0__ 
    from
        company companyent0_ 
    inner join
        product productent1_ 
            on companyent0_.name=productent1_.company_name 
    where
        companyent0_.name=?
Hibernate: 
    select
        companyent0_.id as id1_4_1_,
        companyent0_.created_date as created_2_4_1_,
        companyent0_.last_modified_date as last_mod3_4_1_,
        companyent0_.address as address4_4_1_,
        companyent0_.business_registration_number as business5_4_1_,
        companyent0_.name as name6_4_1_,
        companyent0_.phone_number as phone_nu7_4_1_,
        productent1_.company_name as company_7_6_3_,
        productent1_.id as id1_6_3_,
        productent1_.id as id1_6_0_,
        productent1_.created_date as created_2_6_0_,
        productent1_.last_modified_date as last_mod3_6_0_,
        productent1_.company_name as company_7_6_0_,
        productent1_.price as price4_6_0_,
        productent1_.product_name as product_5_6_0_,
        productent1_.stock as stock6_6_0_ 
    from
        company companyent0_ 
    left outer join
        product productent1_ 
            on companyent0_.name=productent1_.company_name 
    where
        companyent0_.name=?

```

ID로 조회하는 쿼리는 여전히 2개의 SELECT 쿼리가 발생했는데, Fetch Join으로 LEFT OUTER JOIN 대신 INNER JOIN을 수행한 것으로 보입니다. 업체명으로 조회하는 쿼리는 기존 세 개의 SELECT 쿼리에서 두 개로 줄었는데 이는 '다' 엔티티에 대해 FK를 WHERE 조건으로 한 SELECT문이 Fetch Join으로 없어진 모습입니다. 결과적으로 1+1 문제가 해결된 모습인데, 단일 레코드 조회가 아니라 전체 리스트 조회 시 쿼리가 1/2로 줄어드는 것이므로 성능 향상이 있을 것으로 기대됩니다.

그리고 현재 광고 플랫폼 도메인의 설계와 달리, 일대다 관계에서 '다' 엔티티가 FK로 '일' 엔티티의 PK를 참조한다면 리스트 전체 조회에 Fetch Join문을 사용했을 때 **쿼리가 단 한개**만 발생합니다. 따라서 FK가 반드시 PK를 참조하도록 설계해야 JPA의 성능이 극대화될 수 있음을 알 수 있습니다.

## 배치 처리에 필요한 복잡한 쿼리와 Native Query
작성 예정

## TDD, 그리고 Spring REST Docs
작성 예정

## Bean validation과 커스텀 유효성 검증
작성 예정

## A. 참조
신진호, "Validation 어디까지 해봤니?", *NHN Cloud Meetup!*, Mar. 4, 2020. [Online]. Available: [https://meetup.toast.com/posts/223](https://meetup.toast.com/posts/223) [Accessed Jun. 19, 2022].

jongmin92, "Spring Boot에서의 Bean Validation (1)", *Github.io*, Nov. 18, 2019. [Online]. Available: [https://jongmin92.github.io/2019/11/18/Spring/bean-validation-1/](https://jongmin92.github.io/2019/11/18/Spring/bean-validation-1/) [Accessed Jun. 19, 2022].

soojong, "[JPA] mappedBy 이해하기", *Tistory*, Nov. 16, 2021. [Online]. Available: [https://soojong.tistory.com/entry/JPA-mappedBy-이해하기](https://soojong.tistory.com/entry/JPA-mappedBy-이해하기) [Accessed Jun. 19, 2022].

Developer RyanKim, "(JPA) JPA 성능개선이란? 성능개선 적용기 (fetch join/BatchSize)", *Tistory*, Mar. 9, 2020. [Online]. Available: [https://lion-king.tistory.com/53](https://lion-king.tistory.com/53) [Accessed Jun. 19, 2022].
