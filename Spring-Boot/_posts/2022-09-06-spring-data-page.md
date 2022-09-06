---
title: '[Spring Boot] Spring Data의 Page 객체에서 제공하는 메서드'
uml: true
author_profile: true
toc_label: '[Spring Boot] Spring Data의 Page 객체에서 제공하는 메서드'
---

최근에 Spring Boot 기반 게시판 어플리케이션 API 서버를 개발해보면서 페이징 요청 기능을 구현해볼 기회가 있었습니다. 

이 때 JpaRepository에 PageRequest를 요청하는 방식으로 구현했는데, 이 때 반환하는 객체 타입이 Page 객체였고 이 객체가 어떤 메서드들을 제공하는지 궁금해졌습니다.

```java
@Transactional(readOnly=true)
public List<BoardDto> getBoardList(GetBoardListReqDto getBoardListReqDto) {
    List<BoardEntity> boardEntities = boardRepository.findAll(PageRequest.of(getBoardListReqDto.getPage(), getBoardListReqDto.getSize())).getContent();
    return boardEntities.stream().map(boardEntity -> boardEntity.toDto()).collect(Collectors.toList());
}
```

본문보다 더 자세한 내용은 [스프링 공식 문서 - Page (Spring Data Core)](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html)에서 참조하실 수 있습니다.

```java
public interface Page<T> extends Slice<T> {
    ...
}
```

메서드 | 설명
----- | -----
int getNumber() | 현재 페이지 정보
int getSize() | 한 페이지의 크기
int getTotalPages() | 전체 페이지 수
int getNumberOfElements() | 결과 데이터 수
boolean hasPreviousPage() | 이전 페이지 존재 여부
boolean hasNextPage() | 다음 페이지 존재 여부
boolean isLastPage() | 마지막 페이지 여부
Pageable nextPageable() | 다음 페이지 객체
Pageable previousPageable() | 이전 페이지 객체
List&lt;T&gt; getContent() | 해당 페이지가 포함하는 데이터 리스트
Boolean hasContent() | 결과 존재 여부
Sort getSort() | 검색 시 사용된 Sort 정보
{: .align-center}

## A. 참조
Pivotal Software, Inc., "Page (Spring Data Core 2.7.2 API)," *docs.spring.io*, [Online]. Available: [https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html) [Accessed Sep. 6, 2022].
