---
title: '[1] 파이썬 개발 환경 설정'
tags:
  - Anaconda
  - Jupyter-Notebook
  - VSCode
author_profile: true
last_modified_at: 2022-02-08 15:13:00 +0900
toc_label: '[1] 파이썬 개발 환경 설정'
post-order: 1
---

문법이 간단해서 비전공자도 쉽고 재미있게 배울 수 있는 파이썬, 본문을 통해 어떻게 시작할 수 있는지 알아보자.

필자는 AI 엔진을 개발하거나 백엔드 서버에서 일부 비즈니스 로직을 다루는데 파이썬을 사용하는데, 아나콘다와 주피터 노트북, VS Code를 이용해서 개발하는게 편했다. 본문의 내용은 이와 관련된 내용으로 구성되어 있다.

## 목차
- [1. 아나콘다](#1-아나콘다)
  - [1.1. 설치](#11-설치)
  - [1.2. 가상환경 생성](#12-가상환경-생성)
  - [1.3. 패키지 설치](#13-패키지-설치)
  - [1.4. 설치된 패키지 삭제](#14-설치된-패키지-삭제)
  - [1.5. 가상환경 복제](#15-가상환경-복제)
- [2. 주피터 노트북 - 가상 환경 연동](#2-주피터-노트북---가상-환경-연동)
- [3. VS Code - 가상환경 연동](3-vs-code---가상환경-연동)

<br><br>

## 1. 아나콘다
### 1.1. 설치
[https://www.anaconda.com/products/individual](https://www.anaconda.com/products/individual) - 공식 배포 버전<br>
[https://repo.anaconda.com/archive/](https://repo.anaconda.com/archive/) - 버전 별 다운, 쉘 명령어 `wget` 혹은 `curl`로 다운 가능

<p>

i386 은 Intel 의 80386 CPU 계열의 CPU
i586 은 Intel 의 80586 CPU 계열의 Pentium CPU
i686 은 Intel 의 80686 CPU 계열의 Pentium Pro 이상의 CPU
</p>
<p>

x86  - 위에 언급한 CPU들을 의미
</p>
<p>

리눅스의 여러 패키지를 다운 받을 때 i386, i586, i686, x86, x86_64 등 여러가지가 표시되어 있는데, 이것들의 의미는 해당 코드가 타겟 CPU에 적합하게 컴파일되어 있다는 것을 의미
</p>
<p>

그러므로 x86 은 i386, i586, i686 의 모든 플랫폼에서 동작할 수 있고, x86_64 는 i386, i586, i686 의 64bit 환경에서 동작하는 것을 의미
</p>

### 1.2. 가상환경 생성
다음과 같이 가상환경을 생성할 수 있다.
```
conda create --name(-n) [가상환경명] [설치할패키지]
```
<br>
예시
```
conda create -n testenv python=3.6
```

<br>
이후 다음과 같이 가상환경 활성화, 비활성화할 수 있다.
```
conda activate testenv
conda deactivate
```

<br>
가상환경 삭제 - base(root) 계정으로 활성화(activate) 후 삭제하는 게 좋음
```
conda activate root
conda remove --name [가상환경명] --all
```

### 1.3. 패키지 설치
```
conda activate [가상환경 명]
conda install [패키지 명]
pip install [패키지 명]
```

<br>
다음과 같이 패키지 버전을 명시하여 설치할 수 있다.
```
pip install numpy==1.19.4
```


### 1.4. 설치된 패키지 삭제
```
conda uninstall [패키지 명]
```

### 1.5. 가상환경 복제
기존에 세팅해둔 가상환경에서 약간의 변경 후 사용하고 싶을 때 사용한다.
```
conda create --name [새로운 가상환경 명] --clone [기존 가상환경 명]
```

<br>

## 2. 주피터 노트북 - 가상 환경 연동

![](https://drive.google.com/uc?export=view&id=1FdSXpvQKyCVjyo5JKjEeqNqTCz7RaLVY){: .align-center}
파이썬 파일 생성
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1Z-Qq12cfMYxzpejDN9R4MvuoknsLfbQr){: .align-center}
가상환경 커널이 아직 존재하지 않는다
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1EEiCy2I6G3qhx8HQ5L7uDEPnPpgxCLqD){: .align-center}
testenv라는 가상환경이 존재
{: style="text-align: center;"}


이 상태에서 testenv를 활성화하고 `jupyter --version`를 커맨드로 입력하면 ipykernel이 설치되어 있음을 확인한다.


만약 그렇지 않다면 활성화한 가상환경에서 `pip install jupyter`로 설치한다.


확인했다면 비활성화 후 가상환경 커널을 생성한다.
```
conda deactivate
python -m ipykernel install --user --name [가상환경명] --display-name [커널명]
```

<br>
예시
```
python -m ipykernel install --user --name testenv --display-name testenv
```

![](https://drive.google.com/uc?export=view&id=1L2cEAmqzgJhX4aGE1bOBYjb4ef8W70yP){: .align-center}
ipykernel 명령어 입력
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1jvQqaTjcTknZVBo140tkSC01srO4EaUr){: .align-center}
주피터 노트북 새로고침 후 가상환경 확인
{: style="text-align: center;"}

<br>

## 3. VS Code - 가상환경 연동
[Ctrl] + [Shift] + [P]를 입력하면 command pallet가 나타난다.

나타난 창에 'Python: Select Interpreter'을 입력하면, 원하는 파이썬 버전의 가상환경을 선택할 수 있다.

만약 Select Interpreter를 검색했음에도 나타나지 않는다면, VS Code의 Python extension을 설치해야 한다.