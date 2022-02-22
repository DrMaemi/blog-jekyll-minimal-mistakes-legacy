---
title: Google Analytics 연동
categories:
  - Github.io
tags:
  - Jekyll
  - Liquid
author_profile: true
toc_label: Google Analytics 연동
---
## Google Analytics란?
본인이 운영하는 블로그는 하나의 서비스이고 이를 이용하는 사용자들을 파악하고 관리하는 것은 서비스의 향후 방향을 결정하고 문제를 해결하는데 중요한 요소로 작용한다. Google Analytics를 이용하면 무료로 블로그의 방문자 통계를 분석할 수 있다.

구글 애널리틱스(Google Analytics)는 현재 구글 마케팅 플랫폼 브랜드 내의 플랫폼으로서, 웹사이트 트래픽을 추적하고 보고하는, 구글이 제공하는 웹 애널리틱스 서비스이다. 2019년 기준 가장 널리 사용되는 웹 애널리틱스 서비스이고, 수많은 버전을 거쳐 2022년 현재 GA4 단계에 있다.

## Google Analytics 연동
구글에 `Google Analytics`로 검색하면 [Google Analytics 프로비전 페이지]가 나오는데, `측정 시작` 버튼을 클릭하여 시작할 수 있다.

![](https://drive.google.com/uc?export=view&id=1QghcB7JMPJRoTBjI3s_BtLTjH98AAMeP){: .align-center}
<그림 1. Google Analytics 측정 시작>
{: style="text-align: center;"}

필자는 과거 프로젝트 진행 시 Firebase을 이용하여 서비스 개발을 진행했던 적이 있는데, 이 때 Google Analytics를 이용한 적이 있어 다음과 같은 화면에서 새 계정을 생성해야 했다.

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

## A. 참조
Wikipedia, "Evolutionary History of Life", Available at [https://en.wikipedia.org/wiki/Google_Analytics](https://en.wikipedia.org/wiki/Google_Analytics) (Accessed Feb, 2022).

Sammy Baek, "[Git Page Jekyll Blog] - [6] Google Analytics 연동", *ExtraBrain*, Available at [https://seungwubaek.github.io/blog/google_analytics/#page-title](https://seungwubaek.github.io/blog/google_analytics/#page-title)