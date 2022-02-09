---
title: "포스트 게시 날짜 표시"
categories:
  - Github.io
tags:
  - Jekyll
  - Liquid
author_profile: true
sidebar:
  nav: "main"
last_modified_at: 2022-02-08 19:31:00 +0900
toc: true
toc_sticky: true
toc_label: "포스트 게시 날짜 표시"
toc_icon: none # toc icon
---
자료를 조사할 때 내가 찾은 자료가 언제 작성된 것인지 한 번쯤 궁금히 여겨본 적 있을 것이다. 필자도 그러했는데, 검색된 자료가 최신 자료일 수록 더 믿음이 가며 특히 논문 등에 참조 문헌으로 인용할 때에는 작성 날짜가 중요한 의미를 가진다.

따라서 블로그 포스팅을 할 때에도 작성 날짜에 관련된 정보가 중요하며, 중요한 정보일 수록 가장 먼저 눈에 띄는 것이 바람직하다고 생각한다. 본문에서는 `Minimal Mistakes` 기반 블로그 포스트에서 게시/수정 날짜를 표시하는 방법을 다룬다.

## /_includes/archive-single.html
`/_includes` 경로 하위에 있는 `archive-single.html` 파일은 블로그의 포스트에 사용되는 레이아웃 구성 일부를 설정하는 파일이다. 해당 파일 내부에 다음 코드를 적절한 위치에 삽입한다.

```markdown
<!-- Describe last modified date -->
{% raw %}{% if post.date %}
  <p class="page__meta"><i class="far fa-fw fa-calendar-alt" aria-hidden="true"></i> {{ post.date | date: "%B %d %Y" }}</p>
{% endif %}{% endraw %}
```

필자는 `archive-single.html` 파일 내에서 포스트의 제목을 기재하는 코드 밑에 삽입했다.

![](https://drive.google.com/uc?export=view&id=1h6OL9Dh9-TXEBg1QwfVjWRtFmoCjJs7Y){: .align-center}
게시 날짜 표시 결과
{: style="text-align: center;"}

## /_includes/page__meta.html
다음으로 읽은 시간을 삭제해야 한다. 해당 코드는 `/_includes` 경로 하위에 있는 `page__meta.html` 파일에 있다. `documnet.read_time`과 관련된 if문을 통째로 주석처리하여 읽은 시간을 삭제할 수 있다.

![](https://drive.google.com/uc?export=view&id=1Kd1_UZI97mCmnDMnIhulDpTWqRRCbgiC){: .align-center}
읽은 시간 삭제 결과
{: style="text-align: center;"}