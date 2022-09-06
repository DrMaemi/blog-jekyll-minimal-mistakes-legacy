---
title: '[Spring Boot] 왜 JPA Entity는 기본 생성자를 가져야 하는가?'
uml: true
author_profile: true
toc_label: '[Spring Boot] 왜 JPA Entity는 기본 생성자를 가져야 하는가?'
---

## 에러 - No default constructor for entity

Spring MVC와 JPA를 이용해 개발하던 중 No default constructor for entity 에러를 만났습니다.

에러 메시지를 보니 JPA Entity에 기본 생성자가 없어서 발생하는 오류같습니다. 

오류를 고치기 전에 왜 JPA Entity가 기본 생성자를 가져야하는지 궁금했습니다.

## 예제 - 기본 생성자가 없는 경우
예를 들어 다음과 같이 게시글(Article)에 대한 MVC, JPA 코드가 있다고 하면

```java
@Entity
@Getter
public class Article {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String contents;
}

public interface ArticleRepository extends JpaRepository<Article, Long> {
}

@RestController
public class ArticleRestController {
    private final ArticleService articleService;

    public ArticleRestController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/api/articles")
    public ResponseEntity<List<ArticleDto>> fetchArticles() {
        return new ResponseEntity<>(articleService.fetchArticles(), HttpStatus.OK);
    }

    @PostMapping("/api/article")
    public void createArticle(@RequestBody ArticleReqDto articleReqDto) {
        articleService.save(articleReqDto);
    }
}
```

POST 요청을 통해 게시글을 저장하고, GET 요청을 통해 게시글을 전부 가져오는 두 가지 기능을 가지고 있습니다.

테스트해보면 POST 요청으로 게시글을 저장하는데는 성공하지만 GET 요청 시 `org.hibernate.InstantiationException: No default constructor for entity` 오류가 발생합니다.

JpaRepository에서 엔티티 정보를 조회해 인스턴스를 만들 때 기본 생성자를 사용하기 때문입니다.

디버거를 통해 확인해보니 PojoInstantiator의 intantiate() 라는 메소드에서 인스턴스를 생성하려다 실패하고 예외가 발생합니다.

```java:org.hibernate.tuple.PojoInstantiator.java
public Object instantiate() {
    if ( isAbstract ) {
        throw new InstantiationException( "Cannot instantiate abstract class or interface: ", mappedClass );
    }
    else if ( optimizer != null ) {
        return optimizer.newInstance();
    }
    else if ( constructor == null ) {
        throw new InstantiationException( "No default constructor for entity: ", mappedClass );
    }
    else {
        try {
            return applyInterception( constructor.newInstance( (Object[]) null ) );
        }
        catch ( Exception e ) {
            throw new InstantiationException( "Could not instantiate entity: ", mappedClass, e );
        }
    }
}
```

## 기본 생성자의 접근 제어자가 private인 경우

의도치 않은 인스턴스화를 막기 위해 기본 생성자의 접근 제어자를 private으로 구현하고, 게시글에 대한 댓글 기능을 추가로 구현하는 상황입니다.

```java
@Entity
@Getter
public class CommentEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    private ArticleEntity articleEntity;

    private String contents;

    private CommentEntity() { }

    public CommentEntity(ArticleEntity articleEntity, String contents) {
        this.articleEntity = articleEntity;
        this.contents = contents;
    }

    public void update(String contents) {
        this.contents = contents;
    }
}
```

하나의 게시글에는 여러 개의 댓글을 달 수 있으니 CommentEntity와 ArticleEntity는 다대일 관계를 가집니다.

이 때 CommentEntity를 Repository에서 가져올 때 ArticleEnttiy까지 굳이 필요하지 않은 경우를 위해 JPA의 지연로딩(FetchType.LAZY)을 사용합니다.

지연로딩을 사용하면 처음으로 CommentEntity 인스턴스를 조회하여 생성할 때 ArticleEntity 필드에는 **ArticleEntity를 상속받은 Proxy 객체**가 바인딩됩니다. 이후 ArticleEntity를 실제로 참조하는 시점(ex. CommentEntity.getArticle().getContents())에서 SELECT 쿼리를 통해 진짜 ArticleEntity 객체를 가져옵니다.

댓글 저장 기능과 수정 기능을 다음과 같이 구현하여 테스트를 해보면

```java
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
}

@RestController
public class CommentRestController {
    private final CommentService commentService;

    public CommentRestController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/api/comment")
    public void createComment(@RequestBody CommentReqDto commentReqDto) {
        commentService.save(CommentReqDto);
    }

    @PutMapping("/api/comment/{commentId}")
    public void update(@PathVariable Long commentId, @RequestBody CommentReqDto commentReqDto) {
        commentService.update(commentId, commentReqDto);
    }
}

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Transactional
    public void update(Long commentId, CommentReqDto commentReqDto) {
        CommentEntity commentEntity = commentRepository.findById(commentId)
                .orElseThrow(IllegalArgumentException::new);
        
        commentEntity.update(commentReqDto.getContents());
    }
}
```

POST 요청으로 1번 게시글에 댓글을 저장하고 PUT 요청으로 댓글 수정 요청을 보내면 `java.lang.InstantiationException: jpa.study.model.ArticleEntity$HibernateProxy$FFpeW17u` 예외가 발생합니다.

CommentService 로직에서 댓글 엔티티를 수정하기 위해 Repository의 `findById()`를 이용해 댓글 엔티티를 조회하는데, 지연 로딩을 통해 댓글 엔티티의 ArticleEntity 필드에 Proxy 객체를 바인딩하는 과정에서 Proxy 객체를 생성할 때 문제가 발생합니다.

지연 로딩에서 Proxy 객체는 상속받은 부모 클래스의 기본 생성자를 사용하기 때문입니다.

그런데 **상속받은 부모 클래스의 기본 생성자가 private**이기 때문에 생성에 실패합니다.

![](https://drive.google.com/uc?export=view&id=15hZ_DkdofaTkVDcxGL8-TC9guBQxwUNk){: .align-center}
&lt;화면 1. JPA(Hibernate) 지연 로딩 시 프록시 객체 생성에 기본 생성자 사용&gt;
{: style="text-align: center;"}

## 결론
JPA Entity는 public 또는 protected 접근 수준을 갖는 기본 생성자가 필요합니다.

- Entity를 JpaRepository에서 가져올 때 기본 생성자를 사용함
- Entity 기본 생성자의 접근 제어 수준을 private으로 설정하면 추후에 Lazy Loading 정책을 사용할 때 Proxy 관련 예외가 발생할 수 있음
- Entity의 기본 생성자의 접근 수준은 public 또는 protected가 되어야 하며, 안정성 측면에서 protected가 권장됨

## A. 참조
yebali, "Spring, JPA에 기본 생성자가 필요한 이유," *Velog.io*, Sep. 8, 2021. [Online]. Available: [https://velog.io/@yebali/Spring-JPA에-기본-생성자가-필요한-이유](https://velog.io/@yebali/Spring-JPA에-기본-생성자가-필요한-이유) [Accessed Sep. 6, 2022].

wbluke, "JPA Entity의 기본 생성자 관련 예외 정리하기," *Tistory*, Sep. 13, 2019. [Online]. Available: [https://wbluke.tistory.com/6](https://wbluke.tistory.com/6) [Accessed Sep. 6, 2022].
