---
title: '[Spring Boot] Spring Rest Docs 적용해보기'
uml: true
author_profile: true
toc_label: '[Spring Boot] Spring Rest Docs 적용해보기'
---

## API 명세서 작성 문제
API 서버를 개발하면 API 명세서를 작성하고 이해관계자에게 전달하거나 개발자들 간에 공유를 하는데, 개발과 별개로 문서를 작성하게 되면 많은 문제가 발생합니다.

- 개발하기도 바쁜데 문서까지 신경써야 함
- 매번 개발한 내용을 문서에 반영하여 동기화해야 함

## Swagger vs Spring Rest Docs
스프링 기반 어플리케이션을 개발하면 API 명세서를 만들고 테스트해볼 수 있는 라이브러리로 크게 Swagger와 Spring Rest Docs가 있습니다.

　| Swagger | Spring Rest Docs
:-: | :---: | :--------------:
장점 | 제품 코드에 영향 없음<br>테스트가 성공해야 문서화됨 | API 테스트 화면 제공<br>적용 쉬움
단점 | 적용 어려움 | 제품 코드에 어노테이션을 추가해야 함<br> 제품 코드와 동기화 안될 가능성 있음
{: .align-center}
&lt;표 1. Swagger vs Spring Rest Docs&gt;
{: style="text-align: center;"}

## Spring Rest Docs 적용 방법
### builde.gradle 작성
프로젝트 루트 디렉토리에 있는 build.gradle 파일에 다음과 같이 작성해야 합니다.

- plugin 추가

```txt
plugins {
    /*
        Asciidoctor 플러그인 적용
        gradle 7.0 이상부터는 convert 대신 jvm.convert 사용
     */
    id "org.asciidoctor.jvm.convert" version "3.3.2"
}
```

- configuration 추가

```txt
configurations {
    asciidoctorExt // dependency에서 Asciidoctor 의존성 주입 후 사용
}
```

- ext에 snippetsDir 속성 정의

```txt
ext {
    /* 생성된 스니펫 조각들이 위치하게 될 출력 경로 지정 */
    snippetsDir = file('build/generated-snippets')
}
```

- test task의 출력 경로 지정

```txt
tasks.named('test') {
    // 위에서 작성한 snippetsDir 디렉토리를 test의 output으로 구성하는 설정 -> 스니펫 조각들이 build/generated-snippets로 출력
    outputs.dir snippetsDir
}
```

- asciidoctor task 설정

```txt
asciidoctor {
    dependsOn test // 문서 생성 전 테스트가 실행되도록 test에 종속 설정
    configurations 'asciidoctorExt' // 위에서 작성한 configuration 적용
    inputs.dir snippetsDir // snippetsDir 를 입력으로 구성

    /*
        source가 없으면 .adoc파일을 전부 html로 만들어버림
        source 지정시 특정 adoc만 HTML로 만든다.
     */
    sources {
        include("/**/index.adoc","/**/common/*.adoc")
    }

    /*
        특정 .adoc에 다른 adoc 파일을 가져와서(include) 사용하고 싶을 경우 경로를 baseDir로 맞춰주는 설정입니다.
        개별 adoc으로 운영한다면 필요 없는 옵션
     */
    baseDirFollowsSourceFile()
}
```

- asciidoctor 추가 동작 정의 - 문서 폴더 비우기

```txt
// static/docs 폴더 비우기
asciidoctor.doFirst {
    delete file('src/main/resources/static/docs')
}
```

- copyDocument task 정의

```txt
// asciidoctor 작업 이후 생성된 HTML 파일을 static/docs 로 copy하기 위한 task 정의
task copyDocument(type: Copy) {
	dependsOn asciidoctor
	from file("build/docs/asciidoc")
	into file("src/main/resources/static/docs")
}
```

위 내용까지 작성한 후 후에 기술할 .adoc 문서 작성, 테스트 코드 작성까지 완료했다면 프로젝트 루트 디렉토리에서 `./gradlew build` 명령어를 실행했을 때 생성된 Rest Docs가 resources/static/docs 하위에 정상적으로 복사됩니다.

만약 `./gradlew bootJar` 명령어로도 위 과정을 수행하고 싶다면 gradle.build 파일에 다음을 추가로 작성해야 합니다.

- bootJar task 정의

```txt
/*
    asciidoctor task 실행 후 bootJar task를 실행하며 실행 완료 후 copyDucument task를 실행합니다.
*/
bootJar {
    dependsOn asciidoctor
    from ("${asciidoctor.outputDir}") {
        into 'static/docs'
    }
    finalizedBy 'copyDocument'
}
```

- dependency 추가

```txt
dependencies {
    /*
        build/generated-snippets 에 생긴 .adoc 조각들을 프로젝트 내의 .adoc 파일에서 읽어들일 수 있도록 연동
        이 덕분에 .adoc 파일에서 operation 같은 매크로를 사용하여 스니펫 조각들을 연동할 수 있음
        최종적으로 .adoc 파일을 HTML로 만들어 export
     */
    asciidoctorExt 'org.springframework.restdocs:spring-restdocs-asciidoctor'

    /*
        restdocs-mockmvc의 testCompile 구성 -> MockMvc를 사용해서 snippets 조각들 생성
        MockMvc 대신 WebTestClient을 사용하려면 spring-restdocs-webtestclient 추가
        MockMvc 대신 REST Assured를 사용하려면 spring-restdocs-restassured 를 추가
     */
    testImplementation 'org.springframework.restdocs:spring-restdocs-mockmvc'
}
```

### TestConfiguration 작성
![](https://drive.google.com/uc?export=view&id=1SU7ynlCo7IvobZbUjbJsEBzAFTN9HN5_){: .align-center}
&lt;화면 1. test 디렉토리 구조&gt;
{: style="text-align: center;"}

```java:src/test/java/.../config/RestDocsConfig.java
@TestConfiguration
public class RestDocsConfig {

    @Bean
    public RestDocsMockMvcConfigurationCustomizer restDocsMockMvcConfigurationCustomizer() {
        return configurer -> configurer.operationPreprocessors()
                .withRequestDefaults(prettyPrint())
                .withResponseDefaults(prettyPrint());
    }
}
```

- prettyPrint() - 생성된 스니펫 코드를 예쁘게 작성하도록 세팅

### MockMvc 테스트 코드 작성
```java::lineons
package maemi.dr.backendspringboot;

import com.fasterxml.jackson.databind.ObjectMapper;
import maemi.dr.backendspringboot.config.RestDocsConfig;
import maemi.dr.backendspringboot.domain.dto.BoardDto;
import maemi.dr.backendspringboot.domain.dto.BoardReqDto;
import maemi.dr.backendspringboot.service.BoardService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@TestMethodOrder(MethodOrderer.DisplayName.class)
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Import(RestDocsConfig.class)
public class BackendSpringBootApplicationTests {
    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    @DisplayName("01. 게시글 생성")
    void 게시판_게시글_생성() throws Exception {
        String title = "게시글 제목 0";
        String content = "게시글 내용 0";
        String author = "작성자 0";

        BoardReqDto boardReqDto = BoardReqDto.builder()
                .title(title)
                .content(content)
                .author(author)
                .build();

        mockMvc.perform(
                post("/board/post")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(boardReqDto))
        )
                .andExpect(status().isCreated())
                .andDo(
                        document("POST-board-post",
                                requestFields(
                                        fieldWithPath("title").description("Title of the post"),
                                        fieldWithPath("content").description("Content of the post"),
                                        fieldWithPath("author").description("Author ID who posted")
                                ),
                                responseFields(
                                        fieldWithPath("timestamp").description("API requested time"),
                                        fieldWithPath("code").description("HTTP status code"),
                                        fieldWithPath("status").description("HTTP status"),
                                        fieldWithPath("result").description("Created board post info"),
                                        fieldWithPath("result.id").description("ID of board post"),
                                        fieldWithPath("result.title").description("Title of board post"),
                                        fieldWithPath("result.content").description("Content of board post"),
                                        fieldWithPath("result.author").description("Author of board post"),
                                        fieldWithPath("result.createdDate").description("Date when data created"),
                                        fieldWithPath("result.lastModifiedDate").description("Last date when data modified")
                                )
                        )
                );
    }

    @Test
    @DisplayName("02. 게시판 리스트 조회")
    void 게시판_데이터_생성_및_리스트_조회() throws Exception {
        for (int i=1; i<=10; i++) {
            String title = "게시글 제목 "+i;
            String content = "게시글 내용"+i;
            String author = "작성자 "+i;

            BoardReqDto boardReqDto = BoardReqDto.builder()
                    .title(title)
                    .content(content)
                    .author(author)
                    .build();

            mockMvc.perform(
                    post("/board/post")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(boardReqDto))
            );
        }

        mockMvc.perform(
                get("/board/list")
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andDo(
                        document("GET-board-list",
                                responseFields(
                                        fieldWithPath("timestamp").description("API requested time"),
                                        fieldWithPath("code").description("HTTP status code"),
                                        fieldWithPath("status").description("HTTP status"),
                                        fieldWithPath("result").description("List of board posts"),
                                        fieldWithPath("result.[].id").description("ID of board post"),
                                        fieldWithPath("result.[].title").description("Title of board post"),
                                        fieldWithPath("result.[].content").description("Content of board post"),
                                        fieldWithPath("result.[].author").description("Author of board post"),
                                        fieldWithPath("result.[].createdDate").description("Date when data created"),
                                        fieldWithPath("result.[].lastModifiedDate").description("Last date when data modified")

                                )
                        )
                );
    }
}
```

- MockMvc 객체는 Spinrg MVC 환경에서 HTTP request에 대한 테스트를 진행
    - HTTP 메서드, contentType, request body에 들어갈 content 작성
    - 테스트 코드에서 자바 객체를 request body에 입력할 경우 Jackson 라이브러리의 ObjectMapper 객체 사용
        - 자바 객체를 JSON 문자열로 변환
- `MockMvc.andDo`에 `document()` 메서드를 전달하여 HTTP request, response에 대한 스니펫을 생성하고 추가적으로 코드를 작성하여 request field, response field에 대해 assertion 테스트 진행 및 스니펫 생성을 할 수 있음

### .adoc 문서 작성
src/docs/asciidoc 하위에 디렉토리나 .adoc 파일을 작성해야 합니다. 경로를 지키지 않으면 Rest Docs가 생성되지 않습니다.

![](https://drive.google.com/uc?export=view&id=1qB_2ytplw-H_w2-jnVK1cFGllTbegscU){: .align-center}
&lt;화면 2. .adoc 파일 작성 경로&gt;
{: style="text-align: center;"}

```txt
= Vue-Spring 게시판 만들기 API 명세서
이상현(dev.maemi@gmail.com)
:doctype: book
:icons: font
:source-highlighter: highlightjs
:toc: left
:toclevels: 2
:sectlinks:

[[게시판-도메인]]
== 게시판(Board) 도메인

[[게시글-생성]]
=== 게시글 생성
operation::POST-board-post[snippets='http-request,http-response,request-fields,response-fields']

[[게시판-리스트-조회]]
=== 게시판 리스트 조회
operation::GET-board-list[snippets='http-request,http-response,response-fields']
```

.adoc 파일은 Asciidoc 문법을 사용하여 작성해야 합니다.

- :srouce-highlighter: highlightjs
    - 문서에 표기되는 코드를 하이라이팅하기 위해 highlightjs를 사용함
- :toc: left
    - TOC(Table Of Contents)를 문서의 좌측에 위치시킴
- =, ==, ===
    - Markdown의 #, ##, ###와 같이 헤더를 나타냄
- [[텍스트]]
    - 기입한 텍스트를 ID로 하는 링크를 헤더에 생성함
    - 링크 다음에 헤더(=, ==, ===)를 작성해야 함
- operation::디렉토리명[snippets='원하는 스니펫 조각']
    - 문서에 사용할 스니펫 디렉토리와 조각을 명시
- include::{snippets}/member-get/XXX.adoc[]
    - 원하는 특정 adoc을 본 문서에 포함시킴

#### 다른 .adoc 내용을 포함(include)시키기
내용이 많아지면 특정 헤더부터 하위 헤더까지의 내용을 별도의 .adoc 파일로 분리하여 포함(include)시킬 수 있습니다.

![](https://drive.google.com/uc?export=view&id=1o8j5lDjJaysIezeJcic0uQ-Ft0DILbiR){: .align-center}
&lt;화면 3. .adoc 내용 분리&gt;
{: style="text-align: center;"}

#### 링크 걸기
Ascii docs는 다음 문법을 통해 URL이나 서버의 절대 경로를 링크로 사용할 수 있습니다.

```txt
link:<URL 또는 서버의 절대 경로>[<링크 텍스트>, window=<window Attr 옵션>]
```

<p class=short>본문의 프로젝트에서는 다음과 같이 작성해봤습니다.</p>

```txt:/src/docs/asciidoc/index.adoc
= Vue-Spring 게시판 만들기 API 명세서
이상현(dev.maemi@gmail.com)
:doctype: book
:icons: font
:source-highlighter: highlightjs
:toc: left
:toclevels: 2
:sectlinks:
:docinfo: shared-head

[[APIs]]
== APIs

=== 게시판 도메인
* link:/docs/board/create-board-post[게시글 생성 API, window=_blank]
* link:/docs/board/get-board-list[게시판 리스트 조회 API, window=_blank]
```

```txt:/src/docs/asciidoc/board/create-board-post.adoc
= 게시글 생성 API
이상현(dev.maemi@gmail.com)

operation::POST-board-post[snippets='http-request,http-response,request-fields,response-fields']
```

```txt:/src/docs/asciidoc/board/get-board-list.adoc
= 게시글 생성 API
= 게시판 리스트 조회 API
이상현(dev.maemi@gmail.com)

operation::GET-board-list[snippets='http-request,http-response,response-fields']
```

### ./gradlew build 명령어로 프로젝트 빌드하기
```txt
$ ./gradlew build

> Task :test
2022-09-06 01:12:39.396  INFO 189736 --- [ionShutdownHook] j.LocalContainerEntityManagerFactoryBean : Closing JPA EntityManagerFactory for persistence unit 'default'
2022-09-06 01:12:39.397  INFO 189736 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-09-06 01:12:39.402  INFO 189736 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

> Task :asciidoctor
2022-09-06T01:12:40.955+09:00 [main] WARN FilenoUtil : Native subprocess control requires open access to the JDK IO subsystem
Pass '--add-opens java.base/sun.nio.ch=ALL-UNNAMED --add-opens java.base/java.io=ALL-UNNAMED' to enable.

Deprecated Gradle features were used in this build, making it incompatible with Gradle 8.0.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

See https://docs.gradle.org/7.5/userguide/command_line_interface.html#sec:command_line_warnings

BUILD SUCCESSFUL in 13s
9 actionable tasks: 9 executed
```

프로젝트 빌드 시 테스트 코드가 실행되고 `build.gradle`에 작성한 asciidoctor Task가 실행된 모습입니다. 이후 프로젝트 폴더를 확인해보면 src/main/resources/static/docs에 API 명세 html 파일이 src/docs/asciidoc 하위에 작성한 각 .adoc 파일에 대응하여 생성된 모습을 확인할 수 있습니다.

![](https://drive.google.com/uc?export=view&id=19EUQQm8G-PUltdQFZsZWknYDdY-xLx1B){: .align-center}
&lt;화면 4. 각 .adoc 파일에 대응하여 생성된 html 파일들&gt;
{: style="text-align: center;"}

### DocsController 작성 후 URL로 접속하여 생성된 Rest Docs API 명세서 확인
```java:src/main/java/.../controller/DocsController.java
@Controller
public class DocsController {

    @GetMapping("/docs")
    public String getApiDoc() {
        return "/docs/index.html";
    }

    @GetMapping("/docs/board/create-board-post")
    public String getApiCreateBoardPost() {
        return "/docs/board/create-board-post.html";
    }

    @GetMapping("/docs/board/get-board-list")
    public String getApiGetBoardList() {
        return "/docs/board/get-board-list.html";
    }
}
```

![](https://drive.google.com/uc?export=view&id=1pPvZ5oi0HJfygmVFCYUrXkraIttJAqLD){: .align-center}
&lt;화면 5. 생성된 RestDocs index 페이지&gt;
{: style="text-align: center;"}

## A. 참조
ace-T, "Spring Spring Rest Docs 사용하기," *acet.pe.kr*, Mar. 22, 2022. [Online]. Available: [https://acet.pe.kr/922](https://acet.pe.kr/922) [Accessed Sep. 5, 2022].

이호진, "Spring Spring Rest Docs 적용," *techblog.woowahan.com*, Dec. 28, 2018. [Online]. Available: [https://techblog.woowahan.com/2597/](https://techblog.woowahan.com/2597/)

backtony, "Spring REST Docs 적용 및 최적화 하기," *Velog.io*, Jun. 18, 2022. [Online]. Available: [https://velog.io/@backtony/Spring-REST-Docs-적용-및-최적화-하기](https://velog.io/@backtony/Spring-REST-Docs-적용-및-최적화-하기) [Accessed Sep. 5, 2022].

hi.anna, "[Java] Jackson 라이브러리를 이용하여 Object를 JSON으로 변환하기," *Tistory*, Sep. 5, 2021. [Online]. Available: [https://hianna.tistory.com/632](https://hianna.tistory.com/632) [Accessed Sep. 5, 2022].