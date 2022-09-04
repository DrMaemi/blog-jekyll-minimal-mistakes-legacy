---
title: '[Spring Boot] RESTful API Response 객체 만들기'
uml: true
author_profile: true
toc_label: '[Spring Boot] RESTful API Response 객체 만들기'
---

스프링 부트로 백엔드 서버를 구축하면서 RESTful API를 설계할 때 어떻게 해야 클라이언트에게 이해하기 쉽고 직관적인 결과를 반환할 수 있을지 고민하다가, 가장 먼저 응답 형식을 통일해야겠다는 생각이 들었습니다. 그래서 RsetResponse라는 클래스를 작성하고 제네릭 타입을 이용하여 정해진 형식에 원하는 객체 데이터를 반환할 수 있도록 했습니다.

```java
@Getter
public class RestResponse<T> {
    private LocalDateTime timestamp;
    private Integer code;
    private HttpStatus status;
    private T result;

    @Builder
    public RestResponse(final Integer code, final HttpStatus status, final T result) {
        this.timestamp = LocalDateTime.now();
        this.code = code;
        this.status = status;
        this.result = result;
    }
}

@RestController
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/board/list")
    public ResponseEntity<RestResponse<List<BoardDto>>> getBoardList() {
        return new ResponseEntity<RestResponse<List<BoardDto>>>(RestResponse.<List<BoardDto>>builder()
                .code(HttpStatus.OK.value())
                .status(HttpStatus.OK)
                .result(boardService.getBoardList())
                .build(), HttpStatus.OK);
    }
}
```

## 제네릭과 Lombok 빌더 패턴
RestResponse 객체 생성에 대해 빌더 패턴을 활용했는데, 제네릭 타입과 Lombok의 빌더 패턴을 사용하려면 `RestResponse.<T>builder()` 형태로 사용해야 합니다.

## 에러 - HttpMediaTypeNotAcceptableException
`ResponseEntity`의 body에 객체를 넘기는 경우 객체 클래스에 Getter 메서드가 없는 경우 `HttpMediaTypeNotAcceptableException: Could not find acceptable representation` 에러가 발생합니다. 제 추측으론 스프링의 DispatcherServlet이 클라이언트의 요청에 응답을 반환할 때, HttpResponse의 body에 객체가 있는 경우 객체의 필드를 조회해야 하는데 private 접근 제어자에 의해 접근 불가 - Getter 메서드가 존재하지 않음 순으로 조회에 실패하여 결과적으로 JSON 형태로 결과 값 반환이 불가능한 상황에서 발생하는 오류같습니다.

## A. 참조
Allonsy, "[Lombok + Builder pattern + generic] 롬복 빌더패턴에서 generic 사용하기," *Tistory*, Apr. 19, 2021. [Online]. Available: [https://allonsyit.tistory.com/51](https://allonsyit.tistory.com/51) [Accessed Sep. 4, 2022].

테드, "[에러해결] HttpMediaTypeNotAcceptableException," *Tistory, Aug. 14, 2021. [Online]. Available: [https://taengsw.tistory.com/49](https://taengsw.tistory.com/49) [Accessed Sep. 4, 2022].
