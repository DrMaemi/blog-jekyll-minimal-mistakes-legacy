---
title: "Github.io 이미지 정렬"
categories:
  - Github.io
tags:
  - Jekyll
  - Liquid
author_profile: true
sidebar:
  nav: "main"
last_modified_at: 2022-02-08 05:21:00 +0900
---
이 블로그에 포스트할 때 이미지와 캡션을 가운데 정렬하여 보여주고 싶었다. 그런데 github의 REAMDE를 작성할 때처럼 했더니 적용이 안됐다.

결론부터 말하자면, 다음과 같은 문법을 통해 이미지 정렬을 할 수 있다.

```liquid
![<alt>](<image link>){: <align code>}
<caption>
{: <align code>}
```
- `alt`: `image link`로부터 이미지 업로드에 실패하면 표시될 대체 텍스
- `image link`: 업로드할 이미지 링크
- `align code`: 정렬 명령어
  - `.align-left`: 왼쪽 정렬
  - `align-center`: 가운데 정렬
  - `align-right`: 오른쪽 정렬
- `caption`: 이미지 캡션 텍스트

<br>
예시
```markdown
![](https://drive.google.com/uc?export=view&id=1pYF0eZ-IpPk24s0fQF6J7fbby_TGXWwy){: .align-center}
예시 사진(gif)
{: style="text-align: center;"}
```
![](https://drive.google.com/uc?export=view&id=1pYF0eZ-IpPk24s0fQF6J7fbby_TGXWwy){: .align-center}
예시 사진(gif)
{: style="text-align: center;"}
예시 코드를 보면 이미지 링크로 구글 드라이브와 연동도 가능하다.