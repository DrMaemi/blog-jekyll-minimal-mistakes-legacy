---
title: 포스트 수정 날짜 표시
categories:
  - Github.io
tags:
  - Jekyll
  - Liquid
author_profile: true
toc_label: 포스트 수정 날짜 표시
---
이번엔 포스트 수정 날짜를 표시하는 방법에 대해서 알아보자.
현재 블로그는 [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) 테마의 [Commit: 2632ff6](https://github.com/mmistakes/minimal-mistakes/commit/2632ff650a6efb0d856a37d675be5f1b63692181)가 완료된 시점의 코드를 기반으로 작성되었는데, 수정 날짜와 관련된 파일은 다음 세 개이다.

- `/_layouts/single.html`
- `/_includes/page__meta.html`
- `/_includes/page__date.html`

본문에서는 이 중 `page__meta.html`과 `page__date.html` 파일을 수정하여 <그림 1>과 같이 참조 관계를 형성할 것이다.

<div class="mermaid" align="center">
  graph TD
  /_layouts/single.html --> /_includes/page__meta.html
  /_includes/page__meta.html --> /_includes/page__date.html
</div>
<그림 1. 참조 관계>
{: style="text-align: center"}

## 1. page__meta.html
`{% raw %}{% include page__date.html}{% endraw %}` 코드를 포스트의 게시 날짜를 표시하는 `<time>` 태그 다음에 삽입한다. 해당 파일의 전체 코드는 다음과 같다.

```html
<!-- page__meta.html -->
{% raw %}
{% assign document = post | default: page %}
{% if document.read_time or document.show_date %}
  <p class="page__meta">
    {% if document.show_date and document.date %}
      {% assign date = document.date %}
      <span class="page__meta-date">
        <i class="far {% if include.type == 'grid' and document.read_time and document.show_date %}fa-fw {% endif %}fa-calendar-alt" aria-hidden="true"></i>
        {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
        <time datetime="{{ date | date_to_xmlschema }}">{{ date | date: date_format }}</time>
        {% include page__date.html %}
      </span>
    {% endif %}

    {% if document.read_time and document.show_date %}<span class="page__meta-sep"></span>{% endif %}

    {% if document.read_time %}
      {% assign words_per_minute = document.words_per_minute | default: site.words_per_minute | default: 200 %}
      {% assign words = document.content | strip_html | number_of_words %}

      <span class="page__meta-readtime">
        <i class="far {% if include.type == 'grid' and document.read_time and document.show_date %}fa-fw {% endif %}fa-clock" aria-hidden="true"></i>
        {% if words < words_per_minute %}
          {{ site.data.ui-text[site.locale].less_than | default: "less than" }} 1 {{ site.data.ui-text[site.locale].minute_read | default: "minute read" }}
        {% elsif words == words_per_minute %}
          1 {{ site.data.ui-text[site.locale].minute_read | default: "minute read" }}
        {% else %}
          {{ words | divided_by: words_per_minute }} {{ site.data.ui-text[site.locale].minute_read | default: "minute read" }}
        {% endif %}
      </span>
    {% endif %}
  </p>
{% endif %}
{% endraw %}
```

## 2. page__date.html
파일의 기존 내용은 포스트의 Front Matter에 변수 `last_modified_at`이 설정되어 있으면 해당 변수 내용은 마지막 수정 날짜를, 그렇지 않으면 포스트 작성 날짜를 출력하도록 작성되어 있다. `page_meta.html` 내용을 확인해보면 포스트 게시 날짜는 반드시 출력되므로 기존에 작성된 흐름 제어 코드는 필요 없다. 따라서 기존 코드를 전부 지우고 다음 코드를 삽입한다.
```html
{% raw %}
{% assign date_format = site.date_format | default: "%B %-d, %Y" %}
{% if page.last_modified_at %}
  <time lastModified="{{ page.last_modified_at | date_to_xmlschema}}"><br><i class="far {% if include.type == 'grid' and document.read_time and document.show_date %}fa-fw {% endif %}fa-calendar-alt" aria-hidden="true"></i> Last modified at: {{ page.last_modified_at | date: date_format }}</time>
{% endif %}
{% endraw %}
```

결과
![](https://drive.google.com/uc?export=view&id=1vDU2bIwv1V1Bwr_lE94__uMgXofm6432){: .align-center}
<그림 2. 포스트 수정 날짜 표시 결과>
{: style="text-align: center"}

잘 표시되는 것을 확인할 수 있다.