---
title: 이미지 크기 조정 및 나란히 배치
categories:
  - Github.io
tags:
  - Jekyll
  - Liquid
author_profile: true
last_modified_at: 2022-02-09 02:36:00 +0900
toc_label: 이미지 크기 조정 및 나란히 배치
---
마크다운에서 이미지 크기를 조정하고 가로로 나란히 배치해보자.
결론부터 말하자면 마크다운 문법으로 이미지 각각에 캡션을 유지해서 가로로 나란히 배치하는 방법을 찾진 못했다. 본문에서는 방법을 찾기위해 시도해봤던 것들을 기록해두었다.

## 1. 캡션 없이
```markdown
![](https://drive.google.com/uc?export=view&id=1lxVr632cvKmNU0sPIVkJUmPynkz31pLg){: width="45%"}
![](https://drive.google.com/uc?export=view&id=1-AArs7kr1KkFDJqYkP8u2bjjRGXf_T9q){: width="45%"}
```
가로 길이 비율을 적절히 조정하면 마크다운 문법으로 이미지를 가로로 나란히 배치할 수 있다.

![](https://drive.google.com/uc?export=view&id=1lxVr632cvKmNU0sPIVkJUmPynkz31pLg){: width="45%"}
![](https://drive.google.com/uc?export=view&id=1-AArs7kr1KkFDJqYkP8u2bjjRGXf_T9q){: width="45%"}

마찬가지로 html 문법으로 이미지를 가로로 나란히 배치할 수 있다.

```html
<img src="https://drive.google.com/uc?export=view&id=1lxVr632cvKmNU0sPIVkJUmPynkz31pLg" width="45%" />
<img src="https://drive.google.com/uc?export=view&id=1-AArs7kr1KkFDJqYkP8u2bjjRGXf_T9q" width="45%" /> 
```

<img src="https://drive.google.com/uc?export=view&id=1lxVr632cvKmNU0sPIVkJUmPynkz31pLg" width="45%" />
<img src="https://drive.google.com/uc?export=view&id=1-AArs7kr1KkFDJqYkP8u2bjjRGXf_T9q" width="45%" /> 

그런데 이 경우 이미지를 가운데 정렬할 수 없다는 문제가 있다.

## 2. 표를 이용해 이미지 배치
표 안에 이미지를 넣어 정렬 효과를 기대할 수 있다.
```markdown
개 | 고양이
:-: | :-:
![](https://drive.google.com/uc?export=view&id=1lxVr632cvKmNU0sPIVkJUmPynkz31pLg){: width="45%"} | ![](https://drive.google.com/uc?export=view&id=1-AArs7kr1KkFDJqYkP8u2bjjRGXf_T9q){: width="45%"}

개 | 고양이
:-: | :-:
![](https://drive.google.com/uc?export=view&id=1lxVr632cvKmNU0sPIVkJUmPynkz31pLg) | ![](https://drive.google.com/uc?export=view&id=1-AArs7kr1KkFDJqYkP8u2bjjRGXf_T9q)
```

개 | 고양이
:-: | :-:
![](https://drive.google.com/uc?export=view&id=1lxVr632cvKmNU0sPIVkJUmPynkz31pLg){: width="45%"} | ![](https://drive.google.com/uc?export=view&id=1-AArs7kr1KkFDJqYkP8u2bjjRGXf_T9q){: width="45%"}

개 | 고양이
:-: | :-:
![](https://drive.google.com/uc?export=view&id=1lxVr632cvKmNU0sPIVkJUmPynkz31pLg) | ![](https://drive.google.com/uc?export=view&id=1-AArs7kr1KkFDJqYkP8u2bjjRGXf_T9q)

이 경우엔 이미지를 원하는 비율로 설정하는 것이 힘들다.