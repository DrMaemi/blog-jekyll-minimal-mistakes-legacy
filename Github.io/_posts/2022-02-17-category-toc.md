---
title: 카테고리 TOC 페이지 만들기
categories:
  - Github.io
tags:
  - Jekyll
  - Liquid
author_profile: true
toc_label: 카테고리 TOC 페이지 만들기
---
본문에서는 카테고리별 TOC(Table Of Contents) 페이지를 만들기 위한 방법에 대해 다룬다.

카테고리별 TOC 페이지를 만들기 위해서는 Jekyll 웹 서버 구조, Liquid 문법, 자바스크립트에 대해 알아야 하는데 이에 대한 모든 내용을 본문에서 다루진 않고 필요한 일부만 다룰 예정이다.

카테고리별 TOC 페이지는 1. TOC 페이지를 만들기 위해 흐름 제어를 수행하는 Liquid 파일들, 2. 만들어진 TOC 페이지를 담기 위한 레이아웃을 지정하는 html 파일들, 3. 카테고리 네비게이션 파일, 4. index.html 파일을 이용해 만들 수 있다. 필요한 파일들의 참조 관계는 <그림 1>과 같다.

<div class="mermaid" align="center">
flowchart TB
  subgraph /_includes/functions/
    make_toc_tree_v3.html
    find_matched_category_item.html
    ...
  end

  index.html --> /_layouts/archive-subtoc.html
  /_layouts/archive-subtoc.html --> /_includes/functions/
  /_layouts/archive-subtoc.html --> /_layouts/archive-toc.html
  /_layouts/archive-toc.html --> /_layouts/default.html
</div>
<그림 1. 참조 관계>
{: style="text-align: center"}

카테고리 TOC 페이지에 접속하면 <그림 1>처럼 가장 먼저 index.html 파일이 호출되며, 이후 필요한 레이아웃 파일들(archive-subtoc.html, archive-toc.html)과 Liquid 흐름제어 파일들(functions)을 순차적으로 호출한다. 이 때 `/_layouts/default.html` 파일을 제외하곤 기존 `Minimal Mistakes` 서버에는 존재하지 않는 파일이다. 

## 1. /_includes/functions
먼저 Jekyll 서버에서 다음 경로에 4개의 포스트를 작성했다고 가정한다.
- `/Category-1/_posts/yyyy-mm-dd-post-1.md`
- `/Category-1/_posts/yyyy-mm-dd-post-2.md`
- `/Category-2/_posts/yyyy-mm-dd-post-3.md`
- `/Category-2/_posts/yyyy-mm-dd-post-4.md`

`/_includes/functions` 하위 파일들은 카테고리 TOC 페이지에 들어갈 목차 트리를 만들기 위한 Liquid 함수들이 포함된 html 파일들이다. 해당 파일들은 [구글 드라이브 링크](https://drive.google.com/uc?export=download&id=1yF9hZmnZ2iX7bmOpIFngktDrztv0ywQ8)에서 얻을 수 있다. Liquid 함수들은 특정 카테고리에 포함되는 포스트와 하위 카테고리들이 상위 카테고리를 상속하는 트리 구조를 만든다. 트리 구조를 생성하기 위해 Liquid 재귀 함수를 수행하는 코드는 `/_includes/functions/make_toc_tree_v3.html`에 있다. 

그 결과 다음과 같이 목차 트리가 생성된다. `_posts` 폴더의 상위 폴더는 `_posts` 하위에 작성된 포스트의 카테고리가 된다.

- `Category-1`
  - Post-1
  - Post-2
  - `Category 2`
    - Post-3
    - Post-4

## 2. /_layouts/archive-toc.html, archive-subtoc.html
카테고리 TOC 페이지의 레이아웃을 지정하기 위한 파일들이다. [archive-toc.html](https://drive.google.com/uc?export=download&id=19dMwre_jI7mMD-6ElyCiRCIB1wXAbzap), [archive-subtoc.html](https://drive.google.com/uc?export=download&id=1IdgE04kX7ph9pNO7zrwSlB51Ko8mnszu) 각 파일을 다운받아 `/_layouts` 폴더 하위에 넣어준다.

## 3. 카테고리 네비게이션 설정
카테고리 네비게이션은 `/_data/navigation.yml` 파일을 통해 설정할 수 있다. 지난 포스트의 [카테고리 네비게이션 설정](https://drmaemi.github.io/github.io/sidebar/#1-카테고리-네비게이션-설정)을 참고하자.

## 4. index.html
3장까지 완료했다면 카테고리 TOC 페이지를 위한  index.html 파일을 작성해야 한다. 예를 들어 `Category-1`의 TOC 페이지를 보고싶다면, Jeykll 서버의 `/Category-1` 경로 밑에 `index.html` 파일을 생성하고, 본문 내용 없이 Front Matter만 다음과 같이 기입해준다.
```yml
---
layout: archive-subtoc
title: Category-1
---
```

여기까지 완료했다면 카테고리 TOC 페이지의 URL인 `https://<user-name>.github.io/Category-1/`에 접속함으로써 페이지 요청이 가능함을 확인할 수 있다. 이후엔 CSS를 적절히 입혀 꾸며주면 된다. Jekyll 웹 서버의 CSS는 `/_sass` 경로 하위에 있는 scss 파일들을 통해 적용할 수 있다.

한 편, 4장까지 내용을 적용했을 때 TOC 페이지에서 폴더 펼치기/접기 기능이 제대로 동작되지 않았다. 폴더 버튼에 자바스크립트로 구현한 기능을 적용하지 않았기 때문이다. 해당 기능을 구현한 자바스크립트 파일 [customs.min.js](https://drive.google.com/uc?export=download&id=1ku3K6Iop8dD15kYR7zP8WsOqd0a_h8Is)을 `/assets/js` 경로 하위에 위치시키고 `/_config.yml` 파일에서 `footer_scripts` 항목에 명시하여 사용할 수 있도록 했다. `Minimal Mistakes` 서버에 있는 `main.min.js` 파일 또한 사용한다.
```yml
footer_scripts:
  - /assets/js/main.min.js
  - /assets/js/customs.min.js
```

## A. 참조
Sammy Baek, "[Git Page Jekyll Blog] - [14] 목차 만들기", *ExtraBrain*, Available at [https://seungwubaek.github.io/blog/whole_toc](https://seungwubaek.github.io/blog/whole_toc) (Accessed Feb., 2022).