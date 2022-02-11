---
title: "Mermaid를 이용해 UML 그리기"
categories:
  - Github.io
tags:
  - Jekyll
  - Liquid
  - Mermaid
author_profile: true
toc_label: "Mermaid를 이용해 UML 그리기"
---
## 1. Mermaid란?
Mermaid란 javascript 기반으로 구현된 다이어그램 및 차트 작성 도구이다.
Mermaid는 정형화된 텍스트를 렌더링하여 다이어그램을 동적으로 생성하거나 수정 가능하다.

예를 들어 몇 개의 노드와 엣지로 구성된 그래프를 그리고 싶다면 다음과 같이 코드를 작성할 수 있다.
```markdown
<div class="mermaid" align="center">
graph TD
  A --> B
  A --> C
  B --> D
  C --> D
</div>

<div class="mermaid" align="center">
graph LR; A --> B; A --> C; B --> D; C --> D;
</div>
```
<br>
결과
<div class="mermaid" align="center">
graph TD
  A --> B
  A --> C
  B --> D
  C --> D
</div>
<그림 1. Top-Down 그래프>
{: style="text-align: center"}

<div class="mermaid" align="center">
graph LR; A --> B; A --> C; B --> D; C --> D;
</div>
<그림 2. Left-Right 그래프>
{: style="text-align: center"}


더 자세한 내용은 [Mermaid 공식 홈페이지](https://mermaid-js.github.io/mermaid/#/)를 참조하여 확인할 수 있다.

## 2. Mermaid 이용 환경 구성
VS Code에서 마크다운으로 작성한 문서를 Preview로 간단히 확인하고 싶을 때에는 VS Code에서 관련 플러그인을 설치하면 된다. 그러나 Github Page에서 사용하기 위해서는 다른 방법을 사용해야 한다.
Github Page가 관련 플러그인을 지원해주면 Github Page로 호스팅된 블로그에서 렌더링하여 보여줄 수 있지만, 작성 날짜 기준으로 지원하지 않기 때문에 **1. Mermaid의 CDN 서버로부터 모듈을 임베딩**하거나 **2. Mermaid의 javascript 코드를 통째로 들여오는** 방식으로 사용해야 한다. 편의상 전자의 방식을 Embedding CDN, 후자의 방식을 Importing Implementation이라 하겠다. 본문에서는 두 가지 방법을 모두 다룬다.

### 2.1. Embedding CDN
CDN으로부터 모듈을 스크립트로 임베딩하기 위해서는 각 html 문서의 헤드 부분에 명시해야 하는데, Jekyll에서는 `/_includes/head/custom.html`에 명시함으로써 목적한 효과를 이룰 수 있다. 해당 파일에 다음과 같은 코드를 삽입한다.
```html
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>
```

이후에 Mermaid 양식의 코드를 작성하면 <그림 1>과 <그림 2>처럼 웹 페이지에서 적절히 렌더링된 그림을 볼 수 있다.

### 2.2. Importing Implementation
우선, 텍스트를 다이어그램 등으로 렌더링하기 위한 자바스크립트 코드를 다운받아야 한다. 해당 파일은 [https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js](https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js) 링크를 통해 다운받을 수 있다.

2.1장과 같은 원리로 `/_includes/head/custom.html`에 다음과 같은 코드를 삽입한다.

```html
<script src="/assets/js/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>
```

이후에 Mermaid 양식의 코드를 작성하면 <그림 1>과 <그림 2>처럼 웹 페이지에서 적절히 렌더링된 그림을 볼 수 있다.