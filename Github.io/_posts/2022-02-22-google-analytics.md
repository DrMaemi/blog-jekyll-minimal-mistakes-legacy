---
title: Google Analytics 연동
categories:
  - Github.io
tags:
  - Jekyll
  - Liquid
mermaid: true
author_profile: true
toc_label: Google Analytics 연동
last_modified_at: 2022-02-24 03:11:02 +0900
---
## 1. Google Analytics란?
본인이 운영하는 블로그는 하나의 서비스이고 이를 이용하는 사용자들을 파악하고 관리하는 것은 서비스의 향후 방향을 결정하고 문제를 해결하는데 중요한 요소로 작용한다. Google Analytics를 이용하면 무료로 블로그의 방문자 통계를 분석할 수 있다.

구글 애널리틱스(Google Analytics)는 현재 구글 마케팅 플랫폼 브랜드 내의 플랫폼으로서, 웹사이트 트래픽을 추적하고 보고하는, 구글이 제공하는 웹 애널리틱스 서비스이다. 2019년 기준 가장 널리 사용되는 웹 애널리틱스 서비스이고, 수많은 버전을 거쳐 2022년 현재 GA4 단계에 있다.

## 2. Google Analytics 등록
구글에 `Google Analytics`로 검색하면 [Google Analytics 프로비전 페이지]가 나오는데, `측정 시작` 버튼을 클릭하여 시작할 수 있다.

![](https://drive.google.com/uc?export=view&id=1QghcB7JMPJRoTBjI3s_BtLTjH98AAMeP){: .align-center}
<그림 1. Google Analytics 측정 시작>
{: style="text-align: center;"}

필자는 과거 프로젝트 진행 시 Firebase을 이용하여 서비스 개발을 진행했던 적이 있는데, 이 때 Google Analytics를 이용한 적이 있어 <그림 2> 같은 화면에서 새 계정을 생성해야 했다. 이 경우 언제든지 화면 좌측 하단에 있는 톱니바퀴 버튼(관리 탭)을 누르면 계정 및 속성 관련 설정을 할 수 있다.

![](https://drive.google.com/uc?export=view&id=1xUeDxo_IDNMfP3N867LrVzga-vZgHPCP){: .align-center}
<그림 2. Google Analytics 계정 생성(이미 존재하는 경우)>
{: style="text-align: center;"}

이후 계정 생성, 속성 설정, 데이터 스트림 설정, 기타 정보 설정 순으로 진행하면 Google Analytics 연동을 완료할 수 있다.

![](https://drive.google.com/uc?export=view&id=1_xh__elw0-XnPv-7iQ9Bi3qCFeWhBJ_-){: .align-center}
<그림 3. 계정 이름 입력>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1DKmin3xsrg0NTdvknwYGGZE-YgjFUmfQ){: .align-center}
<그림 4. 속성 설정>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1MN6OqcNe_Dpnn5fSjB_GLHS76UXR6O73){: .align-center}
<그림 5. 속성 탭 - 데이터 스트림 URL 설정>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1RdsCR0H--QjJb1CcrDzT2o8HPOHWKYcP){: .align-center}
<그림 6. 데이터 스트림 - 웹 설정>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1fTD02_8JbIhue0EvkbCjZd-v-73cKEoW){: .align-center}
<그림 7. 비즈니스 정보 설정>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1qLGEhv1gVcBAVf3BtbzmwPDBIjoxq2-Z){: .align-center}
<그림 8. 서비스 약관 동의>
{: style="text-align: center;"}

## 3. Jekyll 설정(_config.yml)
`Google Analytics`에서 <그림 9, 10, 11>과 같은 과정을 거쳐 추적 ID(tracking_id)를 확인한다.

![](https://drive.google.com/uc?export=view&id=1IqSMvcAxLNi9sFtk3kUk93z3vFRQxbEX){: .align-center}
<그림 9. 데이터 스트림 정보 확인>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1e3zm2PhtNnQxe-scZWUIBsUJUgrSkbJ2){: .align-center}
<그림 10. 데이터 스트림 인스턴스 클릭>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1cMv7B5hw1e1VFhJCV_I3tPPCOm8wswmI){: .align-center}
<그림 11. Google Analytics g-tag(tracking_id)를 클립보드에 복사>
{: style="text-align: center;"}

이후 Jekyll 웹 서버의 `/_config.yml` 파일에서 `provider` 항목에 `google-gtag`, `analytics` 항목에 `Google Analytics` 추적 ID를 기입해야 한다.

```yml
# _config.yml
...

# Analytics
analytics:
  provider               : google-gtag # false (default), "google", "google-universal", "google-gtag", "custom"
  google:
    tracking_id          : <your_tracking_id>
    anonymize_ip         : # true, false (default)
...
```

위 코드에서 `<your_tracking_id>` 부분에 추적 ID를 기입하고 git에 커밋과 푸쉬를 반영한 후 웹사이트에 접속해보면, <그림 12>와 같이 `Google Analytics` 보고서에 웹사이트 사용자 현황이 변한 것을 확인할 수 있다.

![](https://drive.google.com/uc?export=view&id=1rV6ede-hRgYU3PeDVglyF5n_ypX2HdbF){: .align-center}
<그림 12. Google Analytics 연동 결과>
{: style="text-align: center;"}

## 4. 참조 관계 구조
위 2장과 3장 과정을 모두 거쳤다면 `Google Analytics`를 사용하기 위한 모든 과정을 잘 마무리한 것이다. 한 편 `_config.yml`에 작성된 `tracking_id`를 Jekyll 서버가 어디서 어떻게 이용하는지 궁금하게 여겨 필자가 역공학을 진행한 결과 밝혀낸 참조 관계 구조를 첨부한다.

<div class="mermaid" align="center">
flowchart TB
  default.html --> scripts.html
  analytics.html --> google-gtag.html
  google-gtag.html --> _config.yml

  subgraph /_layouts/
    posts.html --> archive.html
    archive.html --> default.html
  end

  subgraph /_includes/
    scripts.html --> analytics.html

    subgraph /_includes/analytics-providers/
      google-gtag.html
    end
  end
</div>
<그림 13. 참조 관계>
{: style="text-align: center"}


## A. 참조
Wikipedia, "Evolutionary History of Life", Available at [https://en.wikipedia.org/wiki/Google_Analytics](https://en.wikipedia.org/wiki/Google_Analytics) (Accessed Feb. 2022).

Sammy Baek, "[Git Page Jekyll Blog] - [6] Google Analytics 연동", *ExtraBrain*, Available at [https://seungwubaek.github.io/blog/google_analytics/#page-title](https://seungwubaek.github.io/blog/google_analytics/#page-title) (Accessed Feb., 2022).