---
title: 포스트 게시 날짜 표시
categories:
  - Github.io
tags:
  - Jekyll
  - Liquid
author_profile: true
last_modified_at: 2022-02-10 15:30:00 +0900
toc_label: 포스트 게시 날짜 표시
---
**결론부터 말하자면 [2. _config.yml](#2-configyml)의 방법이 가장 좋다.**

자료를 조사할 때 내가 찾은 자료가 언제 작성된 것인지 한 번쯤 궁금히 여겨본 적 있을 것이다. 필자도 그러했는데, 검색된 자료가 최신 자료일 수록 더 믿음이 가며 특히 논문 등에 참조 문헌으로 인용할 때에는 작성 날짜가 중요한 의미를 가진다.

따라서 블로그 포스팅을 할 때에도 작성 날짜에 관련된 정보가 중요하며, 중요한 정보일 수록 가장 먼저 눈에 띄는 것이 바람직하다고 생각한다. 본문에서는 `Minimal Mistakes` 기반 블로그 포스트에서 게시/수정 날짜를 표시하는 방법을 다룬다.

## 1. /_includes/page__meta.html
필자가 판단하기에 page__meta.html 파일을 수정하는 것보다 후술할 [2. _config.yml](#2-configyml)의 방법이 더 효율적이다. 본문의 1장은 필자가 시도해봤던 방법으로 포스트 게시 날짜를 표시할 수 있으나 코드를 직접 수정해야 한다. 그보다는 2장처럼 Jekyll의 기능을 사용하는 것이 더 바람직하다고 생각한다.

`/_includes` 경로 하위에 있는 `page__meta.html` 파일은 블로그 포스트의 메타 데이터 구성을 설정하는 파일이다.

먼저 해당 파일 내부에서 읽은 시간과 관련된 코드를 주석처리한다. `document.read_time`과 관련된 if 문을 통째로 주석처리하면 된다.
이후 다음 코드를 주석처리한 부분에 삽입한다.
ㅠㅕㅜ
```markdown
<!-- Describe last modified date -->
{% raw %}{% if post.date %}
  <i class="far fa-fw fa-calendar-alt" aria-hidden="true"></i> {{ post.date | date: "%B %d %Y" }}
{% endif %}{% endraw %}
```

## 2. _config.yml
`_config.yml`은 Jekyll로 구현된 서버를 구동할 때 필요한 설정값들을 담고 있는 파일이다. 해당 파일 내부의 값들이 어떤 의미를 가지는지 알기 위한 내용은 본문에서 다루기엔 양이 너무 방대하니 [Jeykll 튜토리얼](http://jekyllrb-ko.github.io/docs/step-by-step/01-setup/)을 참조하자.

본문의 주제에 필요한 것은 `_config.yml` 파일의 `defaults` 값을 수정하는 것이다.

```yaml
...
# Defaults
defaults:
  # default
  - scope:
      path: ""
    values:
      layout: home
      author_profile: true
      sidebar:
        nav: main-sidebar
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      show_date: true
      show_header-meta: true
      read_time: false
      comments: true
      share: true
      related: true
      toc: true
      toc_sticky: true
      sidebar:
        nav: main-sidebar
...
```
위와 같이 멤버 변수 중 `read_time`, `show_date`, `show_header-meta` 값을 설정하면 포스트별 읽은 시간 대신 게시 날짜를 표시할 수 있다.

![](https://drive.google.com/uc?export=view&id=1UnWJfv6FolYIhS5BR1FB_GtJ__xwvmhe){: .align-center}
<그림 1. 게시 날짜 표시 전>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1CKmi-_MzVk12jxZwwtiE-Sb-TqOvsX0M){: .align-center}
<그림 2. 게시 날짜 표시 후>
{: style="text-align: center;"}