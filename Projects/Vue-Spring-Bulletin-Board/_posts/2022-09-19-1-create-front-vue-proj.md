---
title: '[Vue-Spring 게시판] 1. 프론트 Vue.js 프로젝트 생성'
author_profile: true
toc_label: '[Vue-Spring 게시판] 1. 프론트 Vue.js 프로젝트 생성'
last_modified_at: 2022-05-06 02:48:15 +0900
post-order: 1
---

## 0. 들어가며
저는 웹 어플리케이션 관련 프레임워크를 익힐 때 게시판 어플리케이션을 만들어보면서 익히는 편입니다.

간단한 로그인 기능부터 게시판에 데이터 CRUD 기능을 구현해볼 수 있기 때문입니다.

본 프로젝트에서는 자바스크립트 프레임워크 Vue와 자바 웹 프레임워크 Spring Boot를 활용해서 게시판 어플리케이션을 구현해보고, 정리한 내용을 시리즈에 작성해나갈 예정입니다.

본문에서는 프론트의 Vue.js 프로젝트를 생성하는 방법에 대해서 다룹니다.

## 1. Node.js(npm) 다운로드
Vue 프로젝트를 설치하기 위해선 먼저 npm(Node Package Manager)을 다운받아야 합니다.

[Nodejs.org](https://nodejs.org/ko/download/)에서 자신의 개발 환경에 맞는 인스톨러나 소스코드를 받아 다운받아줍니다.

정상적으로 설치됐다면 터미널에서 다음과 같이 노드 버전을 확인할 수 있습니다.

```txt
$ node -v
v16.14.0
```

## 2. Vue-cli 설치
Vue-cli는 vue 개발 환경을 설정해주는 도구로, npm으로 설치할 수 있습니다.

<p class=short>다음 명령어를 터미널에 입력해 Vue-cli를 설치합니다.</p>

```txt
npm install -g @vue/cli
```

<p class=short>이후 다음과 같이 Vue-cli 버전을 확인할 수 있습니다.</p>

```txt
$ vue --version
@vue/cli 5.0.8
```

## 3. Vue-cli로 프로젝트 생성

<p class=short>Vue-cli로 다음 명령어를 통해 Vue 프로젝트를 생성할 수 있습니다.</p>


```txt
vue create <프로젝트 명>
```

<p class=short>저는 frontend-vue 라는 프로젝트 명으로 생성해보았습니다.</p>

```txt
vue create frontend-vue
```

<p class=short>위 명령어를 실행하면 중간에 preset을 선택하는 단계를 거치게 되는데, Vue 3 환경에서 개발할 것이므로 Vue 3을 선택해줍니다.</p>

```txt
Vue CLI v5.0.8
? Please pick a preset: (Use arrow keys)
> Default ([Vue 3] babel, eslint)
  Default ([Vue 2] babel, eslint)
  Manually select features
```

## 4. 서버 실행
설치가 완료됐다면 프로젝트 루트 디렉토리로 이동해 `npm run serve` 명령어를 실행하여 Vue 서버를 실행해볼 수 있습니다.

```txt
$ cd frontend-vue
$ npm run serve

DONE  Compiled successfully in 4742ms


App running at:
- Local:   http://localhost:8080/
- Network: http://192.168.35.59:8080/

Note that the development build is not optimized.
To create a production build, run npm run build.
```

![](https://drive.google.com/uc?export=view&id=1ASmRTwcwUutJlo_WeZedaXs7Hnz0S6-y){: .align-center}
&lt;화면 1. Vue 서버 실행 화면&gt;
{: style="text-align: center;"}

## A. 참조
simpleVue, "01. vue-cli 알아보기," *gitbook.io*, [Online]. Available: [https://simplevue.gitbook.io/intro/01.-vue-cli](https://simplevue.gitbook.io/intro/01.-vue-cli) [Accessed Sep. 18, 2022].
