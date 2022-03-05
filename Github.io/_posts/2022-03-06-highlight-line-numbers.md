---
title: 코드 블럭 선택적 줄 번호 매기기
categories:
  - Github.io
tags:
  - Jekyll
  - Javascript
  - SCSS
author_profile: true
toc_label: 코드 블럭 선택적 줄 번호 매기기
---
코드 블럭에 줄 번호를 매기는 것이 좋을 것 같다는 생각이 들었다. 그런데 무작정 넣기 보다는 필자가 원하는 코드 블럭을 지정해서 줄 번호를 매기는 것을 원했다. 그렇게 기능을 구현할 경우, 필자가 포스트한 글에서 다음과 같은 두 가지 상황에 대한 설명이 더 용이할 것이라고 판단했다.
1. 특정 파일의 전체 코드를 설명할 때
2. 특정 파일의 전체 코드가 너무 길어 부분 생략하고 설명할 때

1은 코드 길이가 길지 않거나, 특정 파일에 기재된 코드 외에 다른 코드가 기입되면 안되는 경우, 알고리즘과 같이 전체 코드를 설명해야 하는 등의 상황에 해당한다. 이 경우엔 줄 번호 매김을 통해 설명하는 것이 설명하는 필자도, 그것을 읽는 독자도 더 편할 것이다. 반대로 2의 경우는 줄 번호 매김을 하면 오해의 소지가 있다. 예를 들어 아래 코드 `/package.json`을 살펴 보자.

```json:/package.json
{
  ...
  "scripts": {
    ...
    "uglify-customs": "uglifyjs ... -c -m -o assets/js/customs.min.js",
    ...
    
  }
}
```

필자는 지난 어떤 포스트에서 위 코드를 `/package.json` 파일에 추가 기재할 것을 설명했다. 실제로 `package.json` 파일 내엔 훨씬 더 많은 코드가 있다. 그 모든 코드를 표시하고 설명하는 것은 매우 비효율적이다. 상반된 두 가지 경우에 대한 적절한 설명을 위해 본문에서 어떻게 코드 블럭에 선택적으로 줄 번호 매김을 할 수 있는지 알아보고자 한다.

선택적 줄 번호 매김을 위해 다음 과정이 필요하다.
1. 줄 번호 매김 자바스크립트 적용
2. 렌더링하여 보여줄 CSS 작성

모든 과정이 끝나면 다음과 같은 구문을 통해 코드 블럭에 선택적으로 줄 번호를 매길 수 있다.

예시 1
{% highlight markdown %}
```js
console.log("It's code block with");
console.log("only lang.");
```
{% endhighlight %}

결과 1
```js
console.log("It's code block with");
console.log("only lang.");
```


예시 2
{% highlight markdown %}
```js:test.js:lineons
console.log("It's code block with");
console.log("lang, file-name, lineons.");
```
{% endhighlight %}

결과 2
```js:test.js:lineons
console.log("It's code block with");
console.log("lang, file-name, lineons.");
```

예시 3
{% highlight markdown %}
```js::lineons
console.log("It's code block with");
console.log("lang, lineons.");
```
{% endhighlight %}

결과 3
```js::lineons
console.log("It's code block with");
console.log("lang, lineons.");
```

## 1. 줄 번호 매김 자바스크립트 적용
줄 번호 매김을 위해 HTML 구문을 처리할 자바스크립트 `highlightjs-line-numbers.js`를 적용해야 한다. CDN 라이브러리 서버를 이용해서 Jekyll이 렌더링할 HTML의 `header`나 `footer` 스크립트에 사용할 수도 있고, [공식 Github](https://github.com/wcoder/highlightjs-line-numbers.js/blob/master/src/highlightjs-line-numbers.js)에서 해당 파일을 다운받고 사용할 수 있다.

필자는 후자의 방식을 사용했다. 필자는 이미 코드 블럭의 파일 이름을 명시하기 위해 자바스크립트로 HTML 문서를 조작하고 있었는데, 전자의 방식을 취하면 조작된 문서에 줄 번호 매김이 제대로 적용되지 않기 때문이다.

전자의 방식을 사용하고자 한다면 `/_includes/head/custom.html`에 다음 코드를 삽입하면 된다.
```html:/_includes/head/custom.html
<script src="//cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js"></script>
<script>hljs.initLineNumbersOnLoad();</script>
```

### 1.1. highlightjs-line-numbers.js
후자의 방식인 경우 다운받은 파일을 `/assets/js/` 하위의 적당한 경로에 위치시킨다. 필자는 여기서 필자의 블로그에 포스팅될 HTML 문서에서 `<code>` 태그 중 `lineons` 클래스를 지닌 태그에 해당하는 곳에만 줄 번호를 매길 생각이었다. 공식 Github의 `c2d9209` 커밋 기준으로 다운받은 기존 `highlightjs-line-numbers.js` 파일 내부 코드를 살펴보면 `<code>` 태그 중 `hljs` 클래스를 지닌 태그에 해당하는 곳에 줄 번호 매김을 수행하는 코드가 있다. 바로 `documentReady` 함수인데, 내부의 `querySelectorAll()`에 인자를 `code.lineons`로 대체한다.

```js:highlightjs-line-numbers.js
...
    function documentReady (options) {
        try {
            // var blocks = d.querySelectorAll('code.hljs,code.nohighlight');
            var blocks = d.querySelectorAll('code.lineons');
            ...
        } catch (e) {
            w.console.error('LineNumbers error: ', e);
        }
    }
...
```

그리고 파일 마지막에 `hljs.initLineNumbersOnLoad();`를 삽입해준다.

### 1.2. highlight-parser.js
지난 [포스트: 코드 블럭 파일 이름 명시](https://drmaemi.github.io/github.io/highlight-with-header/#1-문서-구문-분석을-위한-자바스크립트-작성)에서 문서 구문 분석을 위한 자바스크립트 작성을 위해 `/assets/js/highlight-with-header.js` 파일을 작성했었다. 파일 이름을 `highlight-parser.js`로 변경하고(다루고 있는 코드에 더 적합한 이름이라 생각해서 변경했다), 코드를 다음과 같이 수정한다.

```js:/assets/js/customs/highlight-parser.js:lineons
document.addEventListener('DOMContentLoaded', () => {
  const code = document.getElementsByTagName('code');

  Array.from(code).forEach(el => {
    if (el.className) {
      const s = el.className.split(':');
      const highlightLang = s[0];
      const filename = s[1];
      const lineons = s[2];
      
      if (filename) {
        el.classList.remove(el.className);
        el.classList.add(highlightLang);
        el.parentElement.setAttribute('file-name', filename);
        el.parentElement.classList.add('with-header');
      }

      if (lineons) {
        if (!filename) {
          el.classList.remove(el.className);
          el.classList.add(highlightLang);
        }
        
        el.classList.add(lineons);
      }
    }
  });
});
```

위 코드를 간략히 설명하자면, lineons을 명시한 코드 블럭의 경우 적절한 CSS를 적용시키기 위해 클래스에 `lineons` 변수에 있는 값을 할당한다.

이로써 줄 번호 매김을 위한 자바스크립트 준비는 끝났다.

## 2. 렌더링하여 보여줄 CSS 작성
### 2.1. _highlight-customs.scss
지난 [포스트: 코드 블럭 파일 이름 명시](https://drmaemi.github.io/github.io/highlight-with-header/#2-렌더링하여-보여줄-css-작성)에서 코드 블럭 헤더를 렌더링하여 보여줄 `_code-block-header.scss` 파일을 작성했었다. 파일 이름을 `_highlight-customs.scss`로 변경하고(다루고 있는 코드에 더 적합한 이름이라 생각해서 변경했다), 다음 코드를 추가로 기입한다.

```scss:_highlight-customs.scss
.hljs-ln td.hljs-ln-numbers {
  text-align: right;
  color: #ccc;
  border-right: 1px solid #ccc;
  vertical-align: top;
  padding-right: 7px;
}

.hljs-ln td.hljs-ln-code {
  padding-left: 10px;
}
```

변경한 내용에 대해 Jekyll 구조에 따라 `/assets/css/main.scss`에 참조를 명시한다([지난 포스트](https://drmaemi.github.io/github.io/highlight-with-header/#2-렌더링하여-보여줄-css-작성) 참조).

### 2.2. table 관련 CSS 수정
1장의 자바스크립트 적용이 정상적으로 됐다면 렌더링된 HTML 문서의 `<code>` 태그 하위에 `<table>` 태그를 활용해서 코드 블럭을 렌더링하고 있음을 확인할 수 있다. 이 때 블로그의 기반 테마인 `Minimal Mistakes`가 제공하는 `<table>`과 그 하위 태그의 CSS를 코드 블럭에 적용하지 않도록 처리해야 한다.

서버에서 테스트 문서를 작성하고, 터미널에서 `bundle exec jekyll serve`로 테스트 서버를 구동하여 확인한 결과 <그림 1>처럼 코드 블럭 내 `<table>` 하위 태그 `<td>`에서 `hljs-line` 클래스를 공통으로 지니고, `<table>` 태그는 `hljs-ln` 클래스를 지니고 있었다. <그림 1>은 모든 처리가 끝난 후 캡처한 것이라 줄 별 밑줄이 없지만, 지금 따라하고 계시는 독자 여러분들은 밑줄이 있을 것이다.

![](https://drive.google.com/uc?export=view&id=1VaP6cv2P2uV09UtBWs8IUQIdZqIWoLVC){: .align-center}
<그림 1. 코드 블럭 내 태그 클래스 확인>
{: style="text-align: center;"}

필자가 사용한 `Minimal Mistakes` 테마에서는 테이블 관련 SCSS 설정이 `/_sass` 경로 하위에 `_tables.scss` 파일에 기재되어 있었다. 해당 부분에 다음 코드와 같이 `:not()` 구문을 활용하여 특정 클래스에 대한 CSS 적용을 제외시킨다.

```scss:_tables.scss
table:not(.hljs-ln) {
  ...
}
...
td:not(.hljs-ln-line) {
  ...
}
...
```

여기까지 진행했다면 독자 분들도 코드 블럭에 줄 별로 밑줄이 사라져있는 것을 확인할 수 있을 것이다.

## A. 참조
wcoder, "highlightjs-line-numbers.js", *Github*, Available at [https://github.com/wcoder/highlightjs-line-numbers.js](https://github.com/wcoder/highlightjs-line-numbers.js) (Accessed Mar. 5, 2022).

congcoding, "티스토리 highlight.js line number(줄 번호) 적용하기 + 커스텀", *Tistory*, Available at [https://congcoding.tistory.com/5](https://congcoding.tistory.com/5) (Accessed Mar. 5, 2022).