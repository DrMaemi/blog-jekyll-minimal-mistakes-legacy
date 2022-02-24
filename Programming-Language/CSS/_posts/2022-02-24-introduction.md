---
title: CSS 개요
categories:
  - CSS
tags:
  - CSS
author_profile: true
toc_label: CSS 개요
---
CSS를 알아야 할 계기는 여러 가지가 있을 수 있는데, 필자가 본문을 작성하게 된 계기는 **블로그의 코드 블럭에 파일 이름을 명시하기 위해서 공부한 내용을 정리하기 위해**이다. 이걸 좀 더 확장해서 말하자면 내가 원하는 디자인을 내 블로그에 적용하기 위해서랄까.. 즉 웹/앱 상의 컨텐츠를 꾸미기 위해서 CSS를 사용한다.

## 1. CSS란?
Cascading Style Sheets를 줄여서 CSS라 한다. HTML 요소를 화면에 그릴 때 **어떻게** 그려낼지 설명하는 역할을 수행한다. `.css` 파일 확장자로 작성하는데, 아래 코드에 간단한 예시가 있다.

```css
body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}
```

## 2. CSS 문법 구조
다음 <그림 1>을 살펴보면 CSS의 작성 양식이 대략 어떤 구조로 이루어져 있는지 파악할 수 있다.

![](https://drive.google.com/uc?export=view&id=10DLkax1mOnOqpu6jGTmmEwHtziu84jMS){: .align-center}
<그림 1. CSS Syntax>
{: style="text-align: center;"}

CSS는 `selector`, `property`, `value` 부분으로 이루어져 있다. 다음 예시를 살펴보자.
```css
p {
  color: red;
  text-align: center;
}
```

- `p`는 selector이다. HTML에서 p 요소(element)를 중괄호로 명시한 declaration처럼 꾸미겠다는 뜻이다.
- `color`와 `text-align`은 property다. property는 HTML과 CSS 파일을 렌더링하기 위한 웹 엔진이 정한 약속어다.
- `red`와 `center`는 value이다.

## A. 참조
w3schools, "CSS Introduction", Available at [https://www.w3schools.com/css/css_intro.asp](https://www.w3schools.com/css/css_intro.asp) (Accessed Feb, 2022).

w3schools, "CSS Syntax", Available at [https://www.w3schools.com/css/css_syntax.asp](https://www.w3schools.com/css/css_syntax.asp) (Accessed Feb, 2022).