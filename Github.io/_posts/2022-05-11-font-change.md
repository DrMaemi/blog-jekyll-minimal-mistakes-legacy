---
title: '[Jekyll] 폰트 변경'
uml: true
author_profile: true
toc_label: '[Jekyll] 폰트 변경'
---

본 블로그에서는 평문으로 *에스코어 드림*, 코드 블럭에는 *IBM Plex Mono* 폰트를 사용하고 있다.

Minimal Mistake 템플릿의 `/_sass/_variables.scss` 파일에서 폰트와 폰트 크기에 대한 구성을 설정할 수 있다. `$sans-serif`와 `$monospace` 변수에 폰트에 대한 정보가 담겨있는데, 해당 정보가 CSS의 `font-family` 속성으로 사용된다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-05-11T03:00:57.156Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36\&quot; etag=\&quot;mCCtquzo-4uyMqYh5rM3\&quot; version=\&quot;18.0.2\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;LNVabtKVJgwG_svkFxIw\&quot; name=\&quot;Page-1\&quot;&gt;1VhLc5swEP41zLQHe3gTjrGdtD2005kcOtNLR4AAJQIRIb/y6yshybxM4nicSeKL0cdqtbvfalfCcJbF7hsFVf6TJBAbtpnsDGdl2LZl2Vf8TyB7ifiWL4GMokQJtcAdeoIKNBW6Rgmse4KMEMxQ1QdjUpYwZj0MUEq2fbGU4P6qFcjgCLiLAR6jf1DCcole2UGLf4coy/XKlh/KNwXQwsqTOgcJ2XYg58ZwlpQQJp+K3RJiETwdFznvduLtwTAKS3bKhPvdX7IKgvtH+9caPOUPP0hyP7Ollg3Aa+XwvwjUcF7Hda3MZnsdC0rWZQKFOtNwFtscMXhXgVi83XL2OZazAvORxR83kDLE43iNUVZyjBEhkJKSKZJ5IvAxwnhJMKHNCk6aQj+OOV4zSh5g500ShJEpllUGc+1wNxkJ6xBfnpiQFJDRPRfRE3xFicpJ21Xjbcvwgba8w66jMKCSKjuobuPOH1ToX0GDN6LBsH3MVMCa9NaR8B/XImMWTbQiLzC7kJ+J/4gkwlsjWGgt3CipSApoOKI9grUeITqrG5auuYDlVjs5abCOVlNXoLyIIm6m1NWHn4tBGMZxmh5VCQqRcWVUV83YnM/nn8fxofGNxhQUCO+lTsN2M0wigGc1KOtZDVH6eb3rUPO2qXrOdjKCVdcKCQ6SaeTwMR/OWTzmHfWkvXzmJpnwYJL7S+dwQUpSN03kZf4vSuUFOXpFIlyyoxYoSYSiBVAAhql2QfdYd9xjXdu98UIl1+u94nes9x5mvEXvDU7svVbwVs03GJ+BNoAiEGFYv99BKLUnDkJ+5Hv+ZchwP9xBKDzrIDRV354t0l3EbXtoU5gmJspqBaoYPiv2ql5xcveYLMkqJMIgmkVfLM8xbB590zZd9eB5XydKtz5DHCvNKia0PVhc9nz2HjVTbr7PVDBHe/T9C6a+m/d26YAlWCbX4vrNR6SCZZ+VPoWj8PfDHIbL5S03d8FV3iJh6aq9B8JkdH0fBJZbRdY0hi/fvhigGWQvFacxUR0ivCM8aIxCDBja9M09xo1a4TdBzbbSeeD188C78voqpJtqVvc7wECRZw4UOQNFMg4jRU2qHNw+lj182H7OkOLtRyHn5j8=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<그림 1. 폰트 CSS 호출 관계>
{: style="text-align: center;"}

폰트를 변경하고 싶다면 앞부분에 원하는 폰트 명을 추가 기입하면 된다. 이 때 기본으로 제공하는 폰트(폰트 CSS 파일을 가져오는 위치가 있을 텐데 이를 확인해보진 않음)가 아니라면 `@import` 문으로 해당 폰트의 CSS 정보를 가져올 위치를 명시한다.

```scss:_sass/_variables.scss
...

/* system typefaces */
@import url('https://webfontworld.github.io/SCoreDream/SCoreDream.css');
// @import url('https://webfontworld.github.io/naver/MaruBuri.css');
// "Malgun Gothic"
$serif: Georgia, Times, serif !default;
$sans-serif: -apple-system, BlinkMacSystemFont, "SCoreDream", "Roboto",
  "Segoe UI", "Helvetica Neue", "Lucida Grande", Arial, sans-serif !default;
$monospace: "IBM Plex Mono", Monaco, Consolas, "Lucida Console", monospace !default;
...

```

위 코드와 같이 `SCoreDream` 폰트를 사용하기 위해서 `SCoreDream.css` 파일을 가져와야 한다. 코드 블럭의 폰트는 `IBM Plex Mono`를 사용한다. `$sans-seif`, `$monospace` 각 변수에 할당되는 폰트 그룹 제일 앞 부분에 원하는 폰트 명을 추가한다.

`$sans-serif`의 `-apple-system`, `BlinkMacSystemFont`는 애플 머신이 블로그를 방문한 경우 사용하는 폰트임을 지정하는 키워드이다.

## A. 참조
LongQi, "Can I set the font and font size?", *Github*, Nov. 15, 2017. [Online]. Available at [https://github.com/mmistakes/minimal-mistakes/discussions/1352](https://github.com/mmistakes/minimal-mistakes/discussions/1352) [Accessed May 11. 2022].
