---
title: '[Spring Boot] GET 요청에 RequestParam을 객체로 매핑하기'
uml: true
author_profile: true
toc_label: '[Spring Boot] GET 요청에 RequestParam을 객체로 매핑하기'
---

## RequestParam
HTTP의 GET 메서드를 사용하면 URL에 파라미터를 전달할 수 있습니다.

예를 들어 http://localhost:8080/board/list?page=1&keyword=keyword 형태의 URL 요청을 처리하는 컨트롤러를 다음과 같이 작성할 수 있습니다.

```java
@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardRestController {

        @GetMapping("/list")
        public ResponseEntity<RestResponse<List<BoardDto>>> getBoardList(
                @RequestParam(required=false, defaultValue="0", value="page") int page,
                @RequestParam(required=false, defaultValue="", value="keyword") int keyword
        ) {
        return new ResponseEntity<>(RestResponse.<List<BoardDto>>builder()
                .code(HttpStatus.OK.value())
                .status(HttpStatus.OK)
                .result(boardService.getBoardList(page, keyword))
                .build(), HttpStatus.OK);
        }

        ...
}
```

## RequestParam과 DTO 조합
그런데 파라미터의 수가 더욱 많아지면 어떨까요?

예를 들어 http://localhost:8080/board/list?page=1&keyword=keyword&prop1=x&prop2=y&prop3=z 와 같이 prop1, 2, 3에 대한 파라미터가 필요하다고 가정해봅시다.

이 때 계속 @RequestParam을 추가해나간다면 코드 가독성을 해칠 것입니다.

따라서 이 때는 요청 파라미터를 DTO 클래스의 멤버로 작성하는 것이 좋습니다.

모든 파라미터를 DTO 클래스로 작성할 수 있지만, 다음과 같이 @RequestParam과 DTO 클래스를 혼용할 수도 있습니다.

```java
@Getter
@ToString
@NoArgsConstructor
public class Props {
    private String prop1;
    private String prop2;
    private String prop3;
}

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardRestController {

        @GetMapping("/list")
        public ResponseEntity<RestResponse<List<BoardDto>>> getBoardList(
                @RequestParam(required=false, defaultValue="0", value="page") int page,
                @RequestParam(required=false, defaultValue="", value="keyword") int keyword,
                Props props
        ) {
            String prop1 = props.getProp1();
            String prop2 = props.getProp2();
            String prop3 = props.getProp3();
            ...
        }

        ...
}
```

컨트롤러 메서드의 매개변수에 Props 인자를 전달하면 Spring이 해당 인자의 인스턴스에 요청 파라미터 값을 깔끔하게 바인딩해줍니다.

## A. 참조
리뷰나라, "[java] Spring MVC : GET @RequestParam과 같은 복잡한 객체," *daplus.net*, [Online]. Available: [http://daplus.net/java-spring-mvc-get-requestparam과-같은-복잡한-객체/](http://daplus.net/java-spring-mvc-get-requestparam과-같은-복잡한-객체/) [Accessed Sep. 6, 2022].
