---
title: SCSS 개요
categories:
  - CSS
tags:
  - CSS
  - SCSS
author_profile: true
toc_label: SCSS 개요
---
필자는 아주 기초적인 CSS만 알고 있었는데, 블로그 개발을 하다 보니 CSS를 직접 사용해야 하는 상황을 만나고 SCSS도 다뤄야 하는 상황에 처하게 됐다. Jekyll의 Minimal Mistakes 테마를 사용하는 내 블로그에 SCSS를 내가 직접 수정하고 활용하기 위해 공부했던 것들을 간략히 정리해보고자 한다.

## 1. CSS 전처리기(Preprocessor)란?
웹과 앱에서 표준 CSS로만 컨텐츠를 꾸밀 수 있기 때문에 CSS를 사용하지 않는다는 선택지는 생각하기 힘들다. 하지만 이런 CSS도 단점이 존재한다. Selector의 오·남용, 연산 기능의 한계, 구문(Statement) 부재 등이 그것이다. 이런 문제들을 해결하기 위해 등장한 것이 CSS 전처리기다. 결론부터 말하자면 SCSS로 작성한 내용은 바로 웹에서 동작하지 않기 때문에 전처리기가 이를 처리하여 CSS로 변환한다. 전처리기 종류에는 Sass, Less, Stylus 등이 있다. 각 전처리기에는 고유의 장단점이 존재하지만, Sass는 Less와 Stylus가 지닌 장점을 모두 가지고 있으며 Sass로부터 SCSS가 파생됐기 때문에 본문에선 Sass에 대해 다루고자 한다.

## 2. Sass와 SCSS란?
Sass(Syntatically Awesome Style Sheets) 3 버전에서 등장한 SCSS는 CSS 구문과 완전히 호환되도록 설계된 CSS의 상위 집합이면서 Sass 컴파일러의 기능을 사용할 수 있다. 웹 서버는 SCSS로 작성된 파일을 Sass 컴파일러로 컴파일하여 CSS로 변환 후 사용할 수 있다.

## 3. SCSS 문법
[HEROPY, "Sass(SCSS) 완전 정복!", *HEROPY Tech*](https://heropy.blog/2018/01/31/sass/) 참조


## A. 참조
HEROPY, "Sass(SCSS) 완전 정복!", *HEROPY Tech*, Available at [https://heropy.blog/2018/01/31/sass/](https://heropy.blog/2018/01/31/sass/) (Accessed Feb, 2022).