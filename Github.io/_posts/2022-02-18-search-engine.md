---
title: 검색 엔진 최적화
categories:
  - Github.io
tags:
  - Jekyll
  - Liquid
author_profile: true
toc_label: 검색 엔진 최적화
last_modified_at: 2022-02-20 19:31:00 +0900
---
## 검색 엔진 최적화(SEO)란?
SEO, Search Engine Optimization, 검색 엔진 최적화란 크롤러(Crawler)가 웹사이트의 정보를 탐색하면 이를 적절히 수정·조율하여 최적화를 진행하고 검색 결과(SERPs) 상단에 웹사이트를 노출시켜 트래픽(방문자)을 높이는 디지털 마케팅 전략을 말한다.

대부분의 사람들이 온라인에 접속할 때 첫 번째로 하는 것이 검색이며 구글에서는 2020년 10월 기준 그 해 동안 이미 2조 3천억범의 검색이 이루어졌다는 것을 감안하면, 온라인 상에는 그만큼 많은 자료들이 존재함을 짐작할 수 있다.

유용하고 좋은 글을 썼고 그 내용이 공유됐을 때 많은 가치를 가질 수 있다면, 가늠할 수 없을 만큼 매우 큰 인터넷 공간 속에서는 구글과 같은 저명한 검색 엔진에게 알리는 것이 좋다. 그리고 검색 결과 상단에 위치시키기 위해서는 각 검색 엔진의 데이터 수집 정책에 알맞게 웹사이트를 구성해야 한다.

SEO를 위해서는 다음과 같은 작업들이 필요하다.
- 웹페이지 구조화
- robots.txt 작성
- 사이트맵(sitemap.xml) 작성
- 검색 엔진에 등록

## 웹페이지 구조화
웹페이지의 구조를 일정 형식에 따라 구성하면 구글이나 네이버 등에서 검색 결과를 사용자에게 보여줄 때 더 이해하기 쉽고 체계적으로 보여줄 수 있다. 다양한 구조가 있을 수 있지만 구글을 비롯한 대부분의 검색 엔진은 [https://schema.org](https://schema.org)에 정의된 구조를 권장한다.

`Minimal Mistakes`는 구글 검색 센터에서 가이드하는 페이지 구조 중 [article](https://developers.google.com/search/docs/advanced/structured-data/article?hl=ko) 구조를 따르도록 설계되었다. <그림 1>과 같이 블로그의 Jekyll 엔진이 생성한 html 소스 코드를 살펴보면 관련 구조를 확인할 수 있다.

![](https://drive.google.com/uc?export=view&id=1FBpxQxSLRyskMvIy_0sEMRktUZw8T6Bb){: .align-center}
<그림 1. 웹 화면 및 DevTools 소스 캡처>
{: style="text-align: center;"}

이외에도 `meta` 태그를 활용한 페이지 메타 정보 설정도 웹페이지 구조화에 포함되는데, 이 또한 `Minimal Mistakes` 페이지 레이아웃을 통해 기본적으로 설정되어 있다.

## robots.txt 작성
각 검색 엔진의 크롤러가 웹사이트 정보를 크롤링할 때, 크롤러가 접근하지 말아야할 부분을 웹사이트 작성자가 명시하는 검색 엔진과의 규약으로 웹사이트의 루트 경로 바로 밑에 `robots.txt` 파일을 작성한다. robots.txt에 대한 좀 더 상세한 내용과 작성 방법에 대해서는 [http://www.robotstxt.org/](http://www.robotstxt.org/)를 참고하면 된다.

자신의 웹사이트의 robots.txt가 어떻게 작성되어 있는지 궁금하다면 `<웹사이트 홈 URL>/robots.txt`로 접속하여 확인할 수 있다.

robots.txt 작성 예시
```
user-agent: *
allow: /
disallow: /assets/

Sitemap: https://drmaemi.github.io/sitemap.xml
```

## 사이트맵(sitemap.xml) 작성
사이트맵은 웹사이트의 구조를 알려주는 파일이다. 검색 엔진의 크롤러가 해당 파일을 참조하여 웹사이트의 구조를 파악하고 이를 검색 결과 노출 우선순위에 반영한다. 이 파일은 본인이 직접 만들 수도 있지만 Jekyll Plugin을 이용해서 자동화할 수 있다. `Minimal Mistakes`를 사용하면 해당 플러그인이 내장되어 있고, `/_config.yml` 파일에서 `plugins` 항목에 `jekyll-sitemap`을 명시함으로써 사용할 수 있다.

```yml
# _config.yml
...
# Plugins (previously gems:)
plugins:
  - jekyll-paginate
  - jekyll-sitemap
  - jekyll-gist
  - jekyll-feed
  - jekyll-include-cache
...
```

## 검색 엔진에 등록
구글에 `Google Search Console`로 검색하면 최상단에 나오는 [Google Search Console 홈페이지](https://search.google.com/search-console/about)로 접속한다.

시작하기를 누르면 <그림 2>와 같이 검색 엔진에 등록하고자 하는 도메인 또는 URL 접두어를 기입해야 하는데, 사설 도메인을 가지고 있는 사람은 도메인에, 필자와 같이 Github 페이지에 웹 서버를 호스팅하는 사람은 URL 접두어에 기입하면 된다.


![](https://drive.google.com/uc?export=view&id=1v-sAgd4zppfVAVXwYXs_H5jua7dDU96m){: .align-center}
<그림 2. URL 접두어 기입>
{: style="text-align: center;"}

다음으로 소유권 확인 방법에 대한 안내 페이지가 나오는데, 필자는 `HTML 태그` 방법이 가장 쉬웠다. 해당 방법을 선택하면 <그림 3>처럼 웹페이지 `head` 태그 안에 `meta` 태그로 `google-site-verification` 코드를 삽입하도록 안내하는데, <그림 4>처럼 서버의 `/_config.yml` 파일에서 `google_site_verification` 항목에 `content`의 해쉬 값을 기입하면 된다.

![](https://drive.google.com/uc?export=view&id=1Kxol399Q0Zei4dwtwQQ4Rr2zRNq5IXuA){: .align-center}
<그림 3. HTML 태그: google-site-verification 코드 안내>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1uEVBPj0UyCg5mLoqh7lSEZrsPYEFq6Va){: .align-center}
<그림 4. _config.yml 파일에 google_site_verification 값 기입>
{: style="text-align: center;"}

위 단계를 모두 수행한 뒤 서버를 구동하고 접속해본 웹페이지에서 개발자 도구(`F12`)를 열어 소스코드를 확인해보면 <그림 5>처럼 `head` 태그 안에 `<meta name="google-site-verification>"`으로 메타 태그가 삽입되어 있는 것을 확인할 수 있다.

![](https://drive.google.com/uc?export=view&id=1X3meQcJrKJsR5aAcrv2pur-WKT3eFeed){: .align-center}
<그림 5. 삽입된 meta 태그 확인>
{: style="text-align: center;"}

이후에 코드를 github에도 커밋-푸쉬하여 반영하고 Google Search Console 등록 화면에서 확인 버튼을 누르면 소유권 확인이 정상적으로 이루어진 것을 확인할 수 있다.

![](https://drive.google.com/uc?export=view&id=16W_TvGn1uxUS6xxq0MDIMCdEGYHi-geg){: .align-center}
<그림 6. 소유권 확인 완료>
{: style="text-align: center;"}

## A. 참조
루크의 IT이야기, "SEO의 기본, Robotx.txt 세팅하기", *brunch*, Available at [https://brunch.co.kr/@webbible/5](https://brunch.co.kr/@webbible/5) (Accessed Feb. 2022).

Sammy Baek, "[Git Page Jekyll Blog] - [5] 검색 엔진에 노출 시키기 (SEO, robots 등)", *ExtraBrain*, Available at [https://seungwubaek.github.io/blog/seo_robots/#page-title](https://seungwubaek.github.io/blog/seo_robots/#page-title) (Accessed Feb., 2022).