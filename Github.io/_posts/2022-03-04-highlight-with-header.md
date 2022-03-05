---
title: 코드 블럭 파일 이름 명시
categories:
  - Github.io
tags:
  - Jekyll
  - Javascript
author_profile: true
toc_label: 코드 블럭 파일 이름 명시
---
깃을 이용하기 시작할 무렵, 코드 블럭을 이용해 코드를 기입할 때 파일 이름을 명시하는 것이 이해하는데 도움이 많이 된다고 생각했지만 깃은 그런 기능을 지원하지 않았다. 이 때 필자는 코드 블럭 내에 주석 처리로 파일 이름을 명시하거나, 코드 블럭 바깥에 평문으로 작성하여 안내하곤 했다. 그러나 깃 블로그를 시작하고 이와 관련된 내용을 적용할 수 있을 것이라 생각했다.

관련 기본기를 공부하고 적용 및 테스트까지 하는 데에 약 일주일 정도 걸렸던 것 같다. 그 결과 다음과 같이 작성했을 때 코드 블럭에 파일 이름을 명시할 수 있었다.

작성 예시
{% highlight markdown %}
```c++:test.cpp
#include <iostream>
using namespace std;

int main() {
    return 0;
}
```
{% endhighlight %}

결과

```c++:test.cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World !";
    return 0;
}
```

위 구문을 활용하기 위해서는 다음과 같은 과정을 거쳐야 한다.
1. 문서 구문 분석을 위한 자바스크립트 작성
2. 렌더링하여 보여줄 CSS 작성
3. 하이라이터 변경

## 1. 문서 구문 분석을 위한 자바스크립트 작성
기본 마크다운 문법에는 필자가 소개하는 기능이 없다. 따라서 우리가 직접 기능을 구현해야 한다. `/assets/js/highlight-with-header.js`에 다음과 같이 코드를 작성한다.

```javascript:/assets/js/highlight-with-header.js
document.addEventListener('DOMContentLoaded', () => {
  const code = document.getElementsByTagName('code');

  Array.from(code).forEach(el => {
    if (el.className) {
      const s = el.className.split(':');
      const highlightLang = s[0];
      const filename = s[1];
      if (filename) {
        el.classList.remove(el.className);
        el.classList.add(highlightLang);
        el.parentElement.setAttribute('data-lang', filename);
        el.parentElement.classList.add('code-block-header');
      }
    }
  });
});
```

위 코드를 간략히 설명하자면,
1. `DOMContentLoaded` 이벤트를 감지해서, HTML 로드가 완료되면 `<code>` 태그가 있는 요소를 가져온다. 그 결과를 `HTMLCollection`으로 반환한다.
2. `HTMLCollection` 내부를 `forEach`문으로 순회하고, 요소가 클래스 이름을 가지고 있다면 클래스 이름을 `:` 문자로 분할한다. 분할하여 알게 된 파일 명은 `<pre>` 태그에 `file-name` 이란 속성으로 추가되며 해당 태그는 `with-header` 클래스를 가진다.

이후에 이 자바스크립트를 최종 렌더링될 HTML 파일에 위치시켜야 하는데, Jekyll의 `_config.yml`의 `footer_scripts` 항목에 추가하거나 등 다양한 방법이 있지만 필자는 uglify를 이용한 `customs.min.js`만을 `_config.yml`의 `footer_scripts` 항목에 기입하였다.

uglify 하려면 `npm`의 `uglify-js` 모듈이 필요하다. `npm`을 이용하기 위해 `Node.js`를 설치하고, `package.json`의 `scripts` 항목에 다음과 같이 커스텀 자바스크립트의 uglify를 위한 명령어를 기입한다. 필자의 블로그 서버에는 `/assets/js/customs` 경로 하위에 본문의 하이라이트 헤더를 위한 자바스크립트나 사이드바 동작에 필요한 자바스크립트 등의 코드가 존재한다.

```json:/package.json
{
  ...
  "scripts": {
    ...
    "uglify-customs": "uglifyjs assets/js/customs/common.js assets/js/customs/nav-remocon.js assets/js/customs/whole-toc.js assets/js/customs/simple-notice.js assets/js/customs/sidebar.js assets/js/customs/auto-scroll.js assets/js/customs/responsive-topbar.js assets/js/customs/copy-to-clipboard.js assets/js/customs/fold-code-block.js assets/js/customs/statistics.js assets/js/customs/lang-pack.js assets/js/customs/right-widget.js assets/js/customs/site-pagination.js assets/js/customs/magnific-popup.js assets/js/customs/post-utility.js assets/js/customs/highlight-with-header.js -c -m -o assets/js/customs.min.js",
    ...
    
  }
}
```

이후 터미널에서 `npm run uglify-customs` 를 실행하여 uglify된 `customs.min.js`을 얻는다.

## 2. 렌더링하여 보여줄 CSS 작성
`/_sass` 경로 하위에 다음 코드를 작성한다. 기존 .scss 파일 중 적절한 위치에 삽입해도 좋고, 새로 파일을 만들어 저장해도 된다. 새로 파일을 만들어 저장할 경우 Jekyll 구조에 따라 `/assets/css/main.scss`에 참조를 명시해야 한다.

```scss:_code-block-header.scss
.code-block-header {
  position: relative;
  padding-top: 23px;
  border-radius: $border-radius;

  &::before {
    content: attr(data-lang);
    background: darken(#afafaf, 8%);
    color: darken(#ffffff, 0%);
    display: block;
    font-size: 14px;
    font-weight: 700;
    padding: 1px 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    border-top-right-radius: $border-radius;
  }
}
```

여기까지 하고, 터미널에서 `bundle exec jekyll serve`로 서버를 실행시켜보면 <그림 1>과 같이 `code-block-header` 클래스에 속한 코드 블럭은 하이라이트가 제대로 적용되지 않는 모습을 확인할 수 있다. 필자의 Jekyll 서버는 `rouge` 하이라이터를 사용하는데, 특정 태그의 클래스가 `highlight-rouge`를 포함하는 부분만 하이라이트 CSS를 적용시키기 때문인 듯하다.

![](https://drive.google.com/uc?export=view&id=1XF5FOdgF6kqEt7MlxAlvzjLP7H3mpXJt){: .align-center}
<그림 1. CSS 파일까지 작성 후 테스트 화면>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1LZ55kWMVojExQn80zmbX8y0LsySrCgex){: .align-center}
<그림 2. 변환된 HTML 구문이 다르다>
{: style="text-align: center;"}

## 3. 하이라이터 변경
2장 마지막에서 언급한 문제를 해결하기 위해서 시행착오를 몇 번 겪었는데, `highlight.js`를 적용하는 것이 가장 쉬운 해결책이었다. 겪었던 시행착오에 대해서는 [4장 보충](#4-보충)에서 추가로 다루겠다.

`highlight.js`를 사용하기 위해 [https://highlightjs.org/usage/](https://highlightjs.org/usage/)를 참고했다. NPM 패키지를 이용하거나 소스를 빌드하는 방법 등 여러가지 방법이 있으나 필자는 가장 간단한 방법인 cdnjs 서버를 이용하는 방법을 사용했다. `/_includes/head/custom.html`에 다음과 같이 코드를 작성한다.

```html:/_includes/head/custom.html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/vs2015.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js"></script> -->
<!-- and it's easy to individually load additional languages -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/languages/go.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

작성한 SCSS를 활용하기 위해선 `/assets/css/main.scss`에 명시해야 한다. 필자의 Jekyll 서버는 <그림 3>의 호출 구조로 SCSS를 이용하고 있다.

<div class="mermaid" align="center">
flowchart TB
  subgraph /assets/css/
    main.scss
  end

  subgraph /_sass/
    drmaemi-devlog.scss

    subgraph /_sass/drmaemi-devlog/
      _highlight-with-header.scss
    end
  end

  main.scss --> drmaemi-devlog.scss
  drmaemi-devlog.scss --> _highlight-with-header.scss
</div>
<그림 3. SCSS 호출 구조>
{: style="text-align: center"}


여기까지 진행했다면 <그림 4>와 같이 정상적으로 코드 블럭 헤더(빨간색으로 표시)와 변경한 하이라이트가 적용된 것을 확인할 수 있다.

![](https://drive.google.com/uc?export=view&id=17AVerRafuNCcMxmw8o7fyakJqwYSKn44){: .align-center}
<그림 4. 코드 블럭 헤더와 하이라이트>
{: style="text-align: center;"}


## 4. 보충
필자는 프론트 엔드를 전문적으로 공부하지 않은 주니어로, 프론트 엔드를 다뤄봤던 기회는 이번 블로그 경험이 전부다. 따라서 본문에 적힌 방법과 디테일에서 부족한 부분이 있을 수 있다.

한가지 예로, 1장과 3장의 방법이 가장 효율적인 방법이 아닐 수 있다. 1장과 3장과 같이 자바스크립트 코드와 highlight.js를 사용하는 이유는, 파일 이름을 명시하기 위해 마크다운 구문을 변경했을 때 `Kramdown`이 변경된 구문을 제대로 변환하지 못하기 때문이다. 이 문제를 해결하는 방법을 필자가 아직 찾지 못했기 때문에 본문의 방식을 사용한 것이다.

# A. 참조
hachy, "GitHub Pagesでコードブロックにファイル名を表示する", *Hachy*, Available at [https://hachy.github.io/2018/11/14/add-file-name-to-code-block-in-jekyll-on-github-pages.html](https://hachy.github.io/2018/11/14/add-file-name-to-code-block-in-jekyll-on-github-pages.html) (Accessed Mar. 4, 2022).