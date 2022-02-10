var store = [{
        "title": "파이썬 개발 환경 설정",
        "excerpt":"문법이 간단해서 비전공자도 쉽고 재미있게 배울 수 있는 파이썬, 본문을 통해 어떻게 시작할 수 있는지 알아보자. 필자는 AI 엔진을 개발하거나 백엔드 서버에서 일부 비즈니스 로직을 다루는데 파이썬을 사용하는데, 아나콘다와 주피터 노트북, VS Code를 이용해서 개발하는게 편했다. 본문의 내용은 이와 관련된 내용으로 구성되어 있다. 목차 1. 아나콘다 1.1. 설치 1.2. 가상환경...","categories": ["Programming-Language","Python"],
        "tags": ["Anaconda","Jupyter Notebook","VSCode"],
        "url": "/programming-language/python/Python-Dev-Env/",
        "teaser": null
      },{
        "title": "Github.io 이미지 정렬",
        "excerpt":"이 블로그에 포스트할 때 이미지와 캡션을 가운데 정렬하여 보여주고 싶었다. 그런데 github의 REAMDE를 작성할 때처럼 했더니 적용이 안됐다. 결론부터 말하자면, 다음과 같은 문법을 통해 이미지 정렬을 할 수 있다. ![&lt;alt&gt;](&lt;image link&gt;){: &lt;align code&gt;} &lt;caption&gt; {: &lt;align code&gt;} alt: image link로부터 이미지 업로드에 실패하면 표시될 대체 텍스 image link: 업로드할 이미지...","categories": ["Github.io"],
        "tags": ["Jekyll","Liquid"],
        "url": "/github.io/align-image/",
        "teaser": null
      },{
        "title": "Markdown 사용법",
        "excerpt":"목차 1. 마크다운이란? 2. 기본 문법 3. 같은 문서 내 헤더로 링크 걸기 4. 중첩된 목록 1. 마크다운이란? 마크다운은 평문(plain-text) 편집기를 사용하는 정형화된(formatted) 텍스트를 위한 경량 마크업 언어다. 마크다운은 블로그나 즉석 메시지(instant messaging), 온라인 포럼, 협업 소프트웨어 그리고 리드미(REAMDE) 파일 등에 널리 사용된다. 2. 기본 문법 마크다운의 기본 문법은 두레이의...","categories": ["Programming-Language","Markdown"],
        "tags": ["Programming-Language"],
        "url": "/programming-language/markdown/how-to-use-markdown/",
        "teaser": null
      },{
        "title": "포스트 게시 날짜 표시",
        "excerpt":"결론부터 말하자면 2. _config.yml의 방법이 가장 좋다. 자료를 조사할 때 내가 찾은 자료가 언제 작성된 것인지 한 번쯤 궁금히 여겨본 적 있을 것이다. 필자도 그러했는데, 검색된 자료가 최신 자료일 수록 더 믿음이 가며 특히 논문 등에 참조 문헌으로 인용할 때에는 작성 날짜가 중요한 의미를 가진다. 따라서 블로그 포스팅을 할 때에도...","categories": ["Github.io"],
        "tags": ["Jekyll","Liquid"],
        "url": "/github.io/show-posted-time/",
        "teaser": null
      },{
        "title": "이미지 크기 조정 및 나란히 배치",
        "excerpt":"마크다운에서 이미지 크기를 조정하고 가로로 나란히 배치해보자. 결론부터 말하자면 마크다운 문법으로 이미지 각각에 캡션을 유지해서 가로로 나란히 배치하는 방법을 찾진 못했다. 본문에서는 방법을 찾기위해 시도해봤던 것들을 기록해두었다. 1. 캡션 없이 ![](https://drive.google.com/uc?export=view&amp;id=1lxVr632cvKmNU0sPIVkJUmPynkz31pLg){: width=\"45%\"} ![](https://drive.google.com/uc?export=view&amp;id=1-AArs7kr1KkFDJqYkP8u2bjjRGXf_T9q){: width=\"45%\"} 가로 길이 비율을 적절히 조정하면 마크다운 문법으로 이미지를 가로로 나란히 배치할 수 있다. 마찬가지로 html 문법으로...","categories": ["Github.io"],
        "tags": ["Jekyll","Liquid"],
        "url": "/github.io/image-resize-place-side-by-side/",
        "teaser": null
      },{
        "title": "포스트 수정 날짜 표시",
        "excerpt":"이번엔 포스트 수정 날짜를 표시하는 방법에 대해서 알아보자. 현재 블로그는 Minimal Mistakes 테마의 Commit: 2632ff6가 완료된 시점의 코드를 기반으로 작성되었는데, 수정 날짜와 관련된 파일은 다음 세 개이다. /_layouts/single.html /_includes/page__meta.html /_includes/page__date.html 본문에서는 이 중 page__meta.html과 page__date.html 파일을 수정하여 &lt;그림 1&gt;과 같이 참조 관계를 형성할 것이다. graph TD /_layouts/single.html --&gt; /_includes/page__meta.html /_includes/page__meta.html...","categories": ["Github.io"],
        "tags": ["Jekyll","Liquid"],
        "url": "/github.io/show-modified-time/",
        "teaser": null
      },{
        "title": "테스트",
        "excerpt":"    graph TD     A--&gt;B     A--&gt;C     B--&gt;D     C--&gt;D        graph LR     A--&gt;B     A--&gt;C     B--&gt;D     C--&gt;D   ","categories": ["Test"],
        "tags": ["Test"],
        "url": "/test/test/",
        "teaser": null
      }]
