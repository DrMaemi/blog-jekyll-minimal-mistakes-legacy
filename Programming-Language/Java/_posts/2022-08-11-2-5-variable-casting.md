---
title: '[JAVA] 2.5. 변수(Variable) - 형변환(Casting)'
author_profile: true
uml: true
toc_label: '[JAVA] 2.5. 변수(Variable) - 형변환(Casting)'
post-order: 3
---

## 1. 형변환(캐스팅, Casting)이란?
변수나 리터럴의 타입을 다른 타입으로 변환하는 것을 형변환(Casting)이라고 합니다.

예를 들어 int 타입의 값과 float 타입의 값을 더하는 경우 먼저 두 값을 같은 타입으로, 즉 둘 다 float 타입으로 변환한 다음 더해야 합니다.

## 2. 형변환 방법
'(타입)피연산자' 형식으로 형변환을 할 수 있습니다.

```java
public class CastingEx1 {
    public static void main(String[] args) {
        double d = 85.4;
        int score = (int)d; // 85가 됩니다.

        System.out.println("score="+score);
        System.out.println("d="+d); // 형변환 후에도 피연산자는 변화 없음
    }
}
```
```txt
score=85
d=85.4
```

변환 | 수식 | 결과
:-: | :-: | :-:
int → char | (char)65 | 'A'
char → int | (int)'A' | 65
float → int | (int)1.6f | 1
int → float | (float)10 | 10.0f
{: .align-center}
&lt;표 1. 기본형 간 형변환&gt;
{: style="text-align: center;"}

## 3. 정수형 간 형변환
큰 타입에서 작은 타입으로의 변환은 크기의 차이만큼 버려집니다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-11T07:20:34.541Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;6870TuTlxIc3AubE9sXC\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;wJmsomsVi_HC7rLeuqli\&quot; name=\&quot;Page-3\&quot;&gt;7VnRbpswFP0aP04CDAQegZD1pZ20qJu0l8kNbrAGOHKcJenXzzYmCXGiphqilI0XLsf2xT7H+F4bAJNy95mhVX5PM1wAx8p2AE6B49g+9MRNIvsaCUJYA0tGMl3pCMzJC9agpdENyfC6VZFTWnCyaoMLWlV4wVsYYoxu29WeadF+6wotsQHMF6gw0e8k47kehTM54neYLPPmzbYf1iUlairrkaxzlNHtCQRTABNGKa+tcpfgQpLX8FK3m10pPXSM4Yrf0sDaPN59eXi5Rz9+zviDPX+0vrqftJffqNjgdm/5vqGA0U2VYenFAjDe5oTj+QotZOlWiC6wnJeFeLKF+UwrPkMlKaTe3zDLUIU0rMV1pJdnUhQJLSgTQEUrgce6J5hxvLs6RPtAnJhxmJaYs72oohs4ru69nmywmUXbo3RNlfxEtQZDerIsD56PfApDU/oGep1x0RsMjF44KnqhMzB63XHR6w+MXm9U9LrWwOj1DXrtj0zv0ELbxKDX+cj0Di20BQa9yQem1xtaaAsNeqFlrr5iwLzNIirIshL2QgwcC45iSQsR24VIF5Qky2TzmOE1eUFPypUkdkVJxdUwvBh4U+lrw+m6pl66XnNGf+Ez7i/IYSh2WdguVJt4r6rm96mabebToktpAqIJCFxpBAEIgyHpCBw4U9eZmAL31XW7ohK+5LYLpc9yI8czlQ57VdrMPUEagygEoauMCESBMnwQ9bQyXqH/mqrX50EHgp3vdC8JdthP9LPVNY8SRpUQTN77KMFc+0aVEbw7v+ZhAkinIIAgUCEmTEHg/XsLjQ1fX2hsu1ehzH2ziMhDivl/nbudzQBLXR3pecMpiNernOY+/WnP8X89b9TTe30dnfSqp3kw4LqjUrOL6HdDdtHvV2ieN4A0ArEFQgmrrZUPwtoQWberwFhVSBQIQTgdlcxGGO7uo4XnZ6UX5Lc7yn7E4/Efoyo7+VML0z8=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. 정수형 간 형변환 - 큰 타입에서 작은 타입으로&gt;
{: style="text-align: center;"}

작은 타입에서 큰 타입으로의 변환은 값 손실이 없습니다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-11T07:25:10.165Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;EphQSoImybqjeb5nfhtN\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;0cTFkW8853LrApQakXCY\&quot; name=\&quot;그림 2. 정수형 간 형변환 - 작은 타입에서 큰 타입으로(양수)\&quot;&gt;7Zlbk5owGIZ/TS47A0ROl4jY3my3nZ0ebrMQIdNAnBhX3V/fBIKK0dFOHZbS5cbw5kDyPiHJhwDG5fYjR8vigWWYAsfKtgDOgOPYHnTlj1J2jRKEsBFyTjJd6CA8kVesRUura5LhVaegYIwKsuyKKasqnIqOhjhnm26xBaPdpy5Rjg3hKUXUVH+QTBR6FI5/0D9hkhftk20vbHJK1BbWI1kVKGObIwkmAMacMdGkym2MqTKv9aWpN7+Qu+8Yx5W4pcKjl/q5heOXr49fktiZ//z2+eGDbuUF0TXu9lbsWgs4W1cZVq1YAE43BRH4aYlSlbuR0KVWiJLKO1smF6wSc1QSqnh/xzxDFdKyhuuoVhaE0phRxqVQsUrqU90TzAXeXhyivTdOzjjMSiz4ThbRFZyJ7r2ebNDX95sDurZIcUSt1ZCeLPm+5YOfMqEt/QN7nXHZGwzMXjgqe6EzMHsn47LXG5i97qjsnVgDs9cbl71D29r8cdk7tK0tMOyN/mF73aFtbaFhr21OXzle0TURUZJXMp3KcWNp0VS5QmS0EOmMkmSZqj7leEVe0XPdlPJ1yUgl6lG4U+DOVFtrwVaN86rpleDsFz6x/gwNA9h5rveAdsM74fYJrUXUpZbEIPJBMFGJIABhMCSOwIHz+jqBKXWvvm4nquRzzd6D9MnRaI/1iHTYK2kzLgXJFEQhCCd1IgJRUCc8EMX9LIwX7L9E9fI8uAOw00D3HLB9ONEPsXGFusZ5wH7jDcs2Y91RHQje3F8z2AXJDAQQBPUWEyYgcP+/hcaG1xca2+4VlBk2yx15SHv+X5/dTmaAVV934nnDR5B+z3RmmP68E/id54083evrqN8rT/O7wHtkdTWyOkPtTm+hvD38xVTnHf1RB5Pf&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 2. 정수형 간 형변환 - 작은 타입에서 큰 타입으로(양수)&gt;
{: style="text-align: center;"}

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-11T07:25:40.940Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;fgv5XSZt5BDuMoAXrUAS\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;XdH_QC5T9cffIMfcAIga\&quot; name=\&quot;그림 3. 정수형 간 형변환 - 작은 타입에서 큰 타입으로(음수)\&quot;&gt;7ZlBj6IwGIZ/TY+bCBWEIyDOZpM5md1N9taRKs0U6tY6qL9+WygKVqOTNQzLDhfL2/aDPm+h/RDAKNs9cbROn1mCKbBHyQ7AKbBty4WO/FHKvlI8H1bCipNENzoJc3LAWhxpdUsSvGk1FIxRQdZtccHyHC9ES0Ocs6LdbMlo+6prtMKGMF8gaqo/SSJSPQp7ctK/YrJK6ytbrl/VZKhurEeySVHCioYEYwAjzpioStkuwlTBq7lU/WZXao83xnEu7ulAX9/EL/ub5R5+PxXP+Xf77ZB90VHeEN3qAc/03Yp9jYCzbZ5gFWUEYFikROD5Gi1UbSFNl1oqMirPLFlcslzMUEao8vsH5gnKkZa1ubaKsiSURowyLoWc5VIP9Z1gLvDu6hCtIzg54zDLsOB72UR3sMeatZ5scKLPi5N1dZO04VqtIT1ZVsfIJ56yoJG+A689LLxez/DCQeGFds/wjoeF1+0ZXmdQeMejnuF1h4W3b0vbZFh4+7a0eQbe+B/G6/RtafMNvPVercFXjle0ISJKVrksL+S4sUQUKipEZguBrshIkqjuIccbckAvZSjFdc1ILspROCFwpirWVrBNRV6F3gjOXvEZ+gtuGIZd9vURpt3xTDhdmlbnhA3XpBRHIJgAb6wKngd8r08+AhvOyuPMTKm75XG/o0q+FPYRTp9tjY62Npz2O3XazEtBHILAB/64LAQg8MqCC4KomxfjFfzXXL0+Dx5g2Hmie8mwYzrRjWPDSnWN/YD1wQuWZea6g9oQfDhfM9kF8RR4EHjlEuPHwHP+vxeNBW+/aCyrU6PMtFmuyH1a8/9673Y2A0bl8SA/7/gI0u2ezkzTX/YCf/p5p5/O7ffopFM/ze8Cn5nVzczqgmsPegrl6ekvprKu8UcdjP8A&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 3. 정수형 간 형변환 - 작은 타입에서 큰 타입으로(음수)&gt;
{: style="text-align: center;"}

```java
public class CastingEx2 {
    public static void main(String[] args) {
        int i = 10;
        byte b = (byte)i;
        System.out.printf("[int -> byte] i=%d -> b=%d%n", i, b);

        i = 300;
        b = (byte)i;
        System.out.printf("[int -> byte] i=%d -> b=%d%n", i, b);

        b = 10;
        i = (int)b;
        System.out.printf("[byte -> int] b=%d -> i=%d%n", b, i);

        b = -2;
        i = (int)b;
        System.out.printf("[byte -> int] b=%d -> i=%d%n", b, i);
        System.out.printf("i="+Integer.toBinaryString(i));
    }
}
```
```txt
[int -> byte] i=10 -> b=10
[int -> byte] i=300 -> b=44
[byte -> int] b=10 -> i=10
[byte -> int] b=-2 -> i=-2
i=11111111111111111111111111111110
```

## 4. 실수형 간 형변환
<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-11T09:47:05.076Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;8SgcyLhONmqpxjh-j9Fq\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;_lhK7FIiJRfCD9Wrpi3q\&quot; name=\&quot;그림 4. float를 double로 형변환\&quot;&gt;7Vldc6IwFP01mdl9qEOIWHgU/OjD9smZ7nOUKOkCcTGutr9+c0PAj+AM7Vptd+TFy0lyE845XmJEJMq244Iuk0cRsxS5TrxFZIBcF/eIpz4AeSkRPyAlsCh4bDrtgAl/ZQZ0DLrmMVsddJRCpJIvD8GZyHM2kwcYLQqxOew2F+nhrEu6YBYwmdHURn/yWCbmKdz7Hf7A+CKpZsa9oGzJaNXZPMkqobHY7EFkiEhUCCHLKNtGLAXyKl7KcaMTrfXCCpbLNgOmInseR89j+TRcv6bPv3/ky/GdyfKHpmt2uFr5UlFQiHUeM8jiIBJuEi7ZZEln0LpRoisskVmq7rAK5yKXI5rxFPR+YkVMc2pgI64LWeY8TSORikJPQSJ9KdwshxWSbU8+J67ZU7ZjImOyeFFdqgGe1yFGHmM6TMxTbXYSdg2U7KlXYdSYZlEn3/GqAkPtG2h2LZqxAxe+PNu5yNmZiA5aEY3xJZkmNtPN1xcmnjitiCfOJYnv/oeVBFs81/xdq5J4JyrJly8mdtVu4hp7lyS717aYVBI4nU7nC4vQUFgaDX9Rx/uWCBbDe/zVuyxgKaarpCaepnyRq3imyGCKtxCo4mqn1zcNGY9jyAg5lpA52y5gU9sp95Fu+QlpgRun03MhBuow6WC4mad8+WAWkgs5S8zUbUVV93ulbDQCR8F6ZCF+sb2W0mt28avxQkgquYCnugucM5mj4XUfNLx1eh3Xs+3h7uCzOySwHDJPBZUKQsM+Cn0UqiBCfQf5zrcpp6vvqgmrLbwCgwHyu7pniMK+6qDjAQpCjfdStf5wWqhoAVEs1lPlkXJg4DdOAckdlxxn99WArk7tobCeksAAAAOd7sjYSi15WB/au7hgK/5KpzoVWGApeC419V6IvAHkWkuxKv2HLZuZqtJQaJpse8LdTd48gxXv7TLV5ETSUKZ6H1Wmqrev5cJjr2iLKND3S9A4ZYgC7Yh+D/UjHSibRHpQhEIMPoJuOgGkIWA2y5/aaC7q+5X7HJPhdP6yOYIbQDHEx7OGOtHNnG3M2W3nzhq7jDvtH/qTm6Dv3po26HnRPRG2DxSGNznbyamyfTo57VOLx5ucLcst+XzfTvtH+q3Y/sOZi3NtPe1zgFu1bVttsVVtr6/n/a3cvldPr+GI6Op6tjgi+pBDuBM0tzuvOd+xXRcf6OHbctx3m45k/LcLom53/1jqtr3/fcnwLw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 4. float를 double로 형변환&gt;
{: style="text-align: center;"}

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-11T09:53:59.711Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;6xnNWEVbDbr6juUy14hI\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;vhmEqYSVp4u0hwEl0l_y\&quot; name=\&quot;그림 5. double을 float로 형변환할 때 반올림 발생\&quot;&gt;7Vrbkps4EP0aVWUf4gLJgHk0vmR2qiaVxJvJ5WVLARnIYOTIcmzn61cCcRXesFMee2bLfrBF07Skcw5NSxigyWr/huF1dEcDkgBoBHuApgBC00aW+JGWQ24ZuSg3hCwOlFNlWMS/iDIayrqNA7JpOHJKEx6vm0afpinxecOGGaO7ptuSJs1e1zgkmmHh40S3fooDHqlZQKey35A4jIqeTdvNz6xw4axmsolwQHc1E5oBNGGU8ry12k9IIsErcMmvmx85Ww6MkZT3ueDhdvzlwbhhh/Djh/vlX+/9L9b9axXlJ062pDlafiggYHSbBkRGMQDydlHMyWKNfXl2J0gXtoivEnFkiuaSpnyOV3Ei+b4nLMApVmZFLpRRlnGSTGhCWdYFmmQfYVfDIYyT/dF5miV6QnaErghnB+FSak5NQSkOFVLaVfwNlSmqUVfYsFJMWEauQBUNhet/wBhqGJuG/JjnhzqlKTkNytD4PcqmeU6YkQ5z9+cFo16i/C+oI+OcqA//hwkENkEupX6pBGIdSSAvPYe0M3UX0KZ1TqRtDWkA7UT06m1FI5SN7pxiFH6i28q1YGkwGLxgmtpJp/N+OOsNUQyoxtNCA1hMmDdRxEkcpqLti4kTgZEnYYlFrTdWJ1ZxEMjLPUY28S/8LQslgV3TOOXZLCwPWFMZa8vpJodeht5wRh9IC/sOOjTGjhNby265ip7opnMunN1MvQadXcnsWYUVy6tnQ6Ze7N5dyexHZplDnw2Zekl9TbOPLCLLtHsxMvVK/Zpm+6ZZ03pmZOpLgmua7UmmZV7uzoySP+dv4ndm+vb9W+fuB2dfnduOPTiNyhqH5TaihCPAm6hcQ/RnV8RYy8irfSh3bQf5RinMf2VYCY0xsKFsS9hMNDDlwTKJ1zdqICnlfqS67rs+abI6nytWm+Kp891a5pd2RjnmMZWzeu2eSBjIaj1/O4SB7AG0dG3AynxyeegPYU0eJA3GOXXFbVYTTHOh+TimStxLwZkl5iTQdtB/i3gN0a71fWFjJBEs/2yG7wJY9fBOZqmKULuoRgtCh24zxIZumU/UVbC2dd4OpCmjFYhjFhKuBRKk4EPNTWXR/gNW/VTyySNWYioxfby+9Lrgqq9++nKGTpMuq/WI6Ksvp73D4rQCnUhf2oCdxiujp9GXXqqAmQc8CEZD2RgbYCwaEzB2gKvvZj73Isa0L1LE2MPWwt+ytGeV06F89FRFjL5zClHB80jR642Eh2y7M0m1JN8G40lmHAPPAC7Mzk6BJ5KSYSpv4SRMucfIeJVFFb5ZVPEtAuSRvKzhFqeEvNzJH1dB9RSU9mZJF1Tnm6VTKOrz9O87/9uHxXT23U5vZ3DNDj/6lMVPsod+BON+Nerpdt1HzVKgfA9S42OERjofjyFEHFb/Q8jzfvVvDjT7Bw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 5. double을 float로 형변환할 때 반올림 발생&gt;
{: style="text-align: center;"}

- 가수의 24번째 자리의 값이 1이면 반올림이 발생해 23번째 자리의 값이 1 증가

float 타입의 범위를 넘는 값을 float로 형변환하는 경우 ±무한대 또는 ±0을 결과로 얻습니다.

```java
public class DoubleToFloatInfZero {
    public static void main(String[] args) {
        double d = 1.0e100; // float의 최대값보다 큰 값을 d에 저장(1.0x10^100)
        float f = (float)d; // f는 양의 무한대가 됨
        System.out.println("f="+f);

        d = 1.0e-50; // float의 최소값보다 작은 값을 d에 저장(1.0x10^-50)
        f = (float)d; // f는 0이 됨
        System.out.println("f="+f);
    }
}
```
```txt
f=Infinity
f=0.0
```

어떤 수를 2진 부동소수점수로 표현했을 때 유효숫자의 개수가 실수형 타입의 가수 크기보다 크다면 오차가 발생하며, 결과적으로 float 타입과 double 타입에 같은 수를 저장해도 저장된 값이 서로 다를 수 있습니다.

```java
public class CastingEx3 {
    public static void main(String[] args) {
        float f = 9.1234567f;
        double d = 9.1234567;
        double d2 = (double)f;

        System.out.printf("f=%20.18f\n", f);
        System.out.printf("d=%20.18f\n", d);
        System.out.printf("d2=%20.18f\n", d2);
    }
}
```
```txt
f=9.123456954956055000
d=9.123456700000000000
d2=9.123456954956055000
```

## 5. 정수형과 실수형 간 형변환
### 정수형을 실수형으로 변환
정수는 소수점 이하의 값이 없으므로 단순히 정수를 2진수로 변환한 다음 정규화를 거쳐 실수의 표현 형식으로 저장됩니다. 실수형은 정수형보다 훨씬 큰 저장범위를 갖기 때문에 정수형을 실수형으로 변환하는 것에는 별 무리가 없습니다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-11T10:40:06.087Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;Jo6aEhtWUdeHS0jQkM3O\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;wOjy3wRLRDg9WhtIM5Nu\&quot; name=\&quot;그림 6. 정수 7이 float타입으로 형변환되는 과정\&quot;&gt;7Vhdb9owFP01fgTFNiHJIwRYtdKtUrdV6svkEkOsOnEWTIH++tmJExKStiAB2qrmJTfH3+dcX18HYD/afElJEt6IgHKArGAD8AggBHEfq5dGtjni9Ho5sEhZYCrtgDv2Qg1oGXTFArqsVZRCcMmSOjgTcUxnsoaRNBXrerW54PVRE7KgDeBuRngTvWeBDHPURc4Ov6JsERYjw76Xl0SkqGxWsgxJINYVCI8B9lMhZG5FG59yTV7BS95u8kppObGUxvKQBtdTV8xuN70fUyid0T2KfiR+x4jxTPiK1mcrtwUFqVjFAdW9WAAP1yGT9C4hM126VqIrLJQRV19QmXMRywmJGNd6/6JpQGJiYCMu0r3MGee+4CLNhsB+9ijcTIemkm5eXScs2VNuR0VEZbpVVUwDz81bbAtHMita7+TrGSisKFdgxDjMoux4x6kyDK1HUGw3Kc4fUBitJoTw4krEIqanEQHiA1TAl5QBeg0dVIwZ+2DgALenDdcFynfGQzCAwFODWE5DAEWIrLNMOFvEyuZ0rks0aUxFj4GBIxYEuvEwpUv2Qh6zjjTtiWCxzNZoD4E90j2tpFjmwuiOlzIVT3RPmRaxKnrC/tuyVzac8bWTaG07+1rbDa0hbNEan0Dru/iJRA9X2/jP70l4u7B6z9Nxp1hDReuGlBUNy8isCQnIMiy3WKHuTFFB07f0VX0kuudos9AHYTc/e1D+1t1qcqxuH2lbEwdxF+qPOWfJlZlILOQsNEMfun3ruk4mRte6+1QV3wu9JZ4KSSQTelUd70SugeGea9jNMID7XWQ3nQPt4NP7B2rGAh1urcy2YBegPtfb+VEZC5lxkQOrAtDVc0jNYLVfTWGVpooNZKGibLlKiiKFDaFOJcpWlcIjgs/77vmBww+ycd3H3KaPQe9MR027e+HP8PNPhp/yxLlY+Lm9nr8QLr7dBB7pPHz9+fydTTvN0+mjJd3IuVzS3UpxS4A3afUHSqrbWG5NtM5Gc1ugO93JabU9/7F+qPe+fti6pH7N6/+cCyJ1JjQe6duQZ2c3oyHwRtpQ16KhX70iZRcoC7iZ4Y3BwD4ibfm8M1VcoeXO5JzpztTqCs3fFOfeaSX1bRwflkCcbm/u6dGSQ/b7LXIg+3g91Ofur19WVvl3isd/AQ==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 6. 정수 7이 float타입으로 형변환되는 과정&gt;
{: style="text-align: center;"}

한 편 int의 최대값은 약 20억으로 최대 10자리의 정밀도를 요구하는데, float은 10진수 7자리의 정밀도를 제공하므로 int를 flaot으로 변환할 때 정밀도 차이에 의한 오차가 발생할 수 있습니다. 따라서 10진수로 8자리 이상의 값을 실수형으로 변환할 때는 float이 아닌 double로 형변환해야 오차가 발생하지 않습니다.

```java
public class IntToFloatOrDoubleToInt {
    public static void main(String[] args) {
        int i = 91234567;
        float f = (float)i;
        int j = (int)f;
        System.out.printf("[int -> float -> int]i=%d, f=%f, j=%d\n", i, f, j);

        double d = (double)i;
        j = (int)d;
        System.out.printf("[int -> double -> int]i=%d, d=%f, j=%d\n", i, d, j);
    }
}
```
```txt
[int -> float -> int]i=91234567, f=91234568.000000, j=91234568
[int -> double -> int]i=91234567, d=91234567.000000, j=91234567
```

### 실수형을 정수형으로 변환
실수형을 정수형으로 변환하면 실수형의 소수점 이하 값은 버려집니다. 정수형의 표현 형식으로 서수점 이하의 값을 표현할 수 없기 때문입니다. 따라서 실수형을 정수형으로 형변환할 때는 반올림이 아니라 항상 버림이 발생합니다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-11T10:51:51.691Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;OtVrw-TTVFXbMkCjPFOO\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;j2m7zSonsDso1nmefsOz\&quot; name=\&quot;그림 7. 실수 9.1234567이 int타입으로 형변환되는 과정\&quot;&gt;7Vlbk6I4FP41edQCwvVRaftSM9PTU8727OxLVxoisAPEifHWv34TCAgGS92ydbpKXgwfyQn5vpPDORFAP1vdUTSNv5AQp8DQwhWAN8AwdGhD/iOQdYk4plkCEU1C2WkDjJM3LEFNovMkxLNWR0ZIypJpGwxInuOAtTBEKVm2u01I2p51iiKsAOMApSr6IwlZXKKu4Wzwe5xEcTWzbnvlkwxVneVKZjEKybIBwRGAPiWEla1s5eNUkFfxUo673fG0fjGKc3bIgJ7jWc9z+pasPr/0vq2Dv59//dOTVhYoneP227J1RQEl8zzEwooG4HAZJwyPpygQT5dcdI7FLEv5nc6bE5KzW5QlqdD7GdMQ5UjCUlxDWJkkaeqTlNBiCugXF8fl62DK8GrnOvWaPe52mGSY0TXvUg3Q5BKkx+nVkpYb/UwJxQ3pKgxJj4lqyxtSeUPyegTHhsIxf0V+6eenOic5PhHL5n6Wdf2cNEPVlTVBtF5c4pffFs0PTLth7acdnpV2U6F9rPDL18vaJKI0iXLeDvi6MadoKFhJeNgdyAdZEoZi+JDiWfKGXgtTgtcpSXJWLMIaAutG2JozMiuZF6ZnjJJfeIv6DjUUwXbr2ohUxc7V3idSuRcOVJYi5egq5YFSOtYfJaWtSPnlKuVhUkL3YrvS/GT/zu5g9n26/Dd4/YYclP7sSNF4fB/5YOAA1xQN1wWeC0ZDMNCBx+fQvL5uQNOynSMkT/GEXVpw3b6I4Ja7/U211FTG7ZAcnkBy98fXwdOn7Ls+1nFEHxYvi+d1h+SKkg0J68JC8BGiWVxnMofvZ25jKixnq0jUcf2ydDLKX2FWcKP1bUO0BW865E4mdEmT6b18kZywIJZTH5oltWW9vZWytr2nKfhW5VDjlDDEEiJW1fNOFQq0dlTXnY5sy+5X/tL0DWMDn9w91IICGHYqtu8rb0SsWHwJzCtAJMAVyCedb3fkWD24X4FCnaK2rui2f89J2Rt6xdWEysE7Mu56ltJmNfkH+yRdKELpXjtCGZoaoQzvnBFKLbauEepPiFB1fXi2CDUgzF98XvZmK/9x9fXnYxTfTw/5gOE8HJTSVfus4TDtgny/UvW+7OJdUUqGrkoAHCpHgHvpb9Brdey7CqM45ZIv2ua72JYzPImYtbvar0/nKhMzMqcBlqOaZ39bhkxnjyGGaISZYqgQv172//eHjrMZxSE++DFjHX/PUCd0cqwexGhyC1SNruZpM4ezi/p+B5qdesJzCqoex+wt/I5IqK4FX0PqjoKv6xD1FOlUp9TqcU2hrw1cvyE0l14Dwi0LN/BuwJC7wQ3gb1+6gTsAnlk8HYKhUTjJUAwZmNJtPDXqXh3kEAfpyLff7UQgnjy6D3/dRQ94bM3QixtaT9ohCdWJQ+1xKVVn8nu64Lz/SM7uksNwjteD327+ky3zn80/23D0Hw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 7. 실수 9.1234567이 int타입으로 형변환되는 과정&gt;
{: style="text-align: center;"}

만약 실수의 소수점을 버리고 남은 정수가 정수형의 저장범위를 넘는 경우 정수의 오버플로우가 발생한 결과를 얻습니다.

## 6. 자동 형변환
경우에 따라 편의상 형변환을 생략할 수 있습니다. 그러나 이런 경우 진짜 형변환이 생략된 건 아니고 컴파일러가 생략된 형변환을 자동적으로 추가해줍니다.

```java
int i = 3;
double d = 1.0+i; // double d = 1.0+(double)i; 형변환 생략
```

모든 경우에 형변환을 생략할 수 있는 건 아닙니다. 컴파일러는 어떤 규칙을 가지고 자동 형변환을 수행하는데, 그 규칙은 **기존의 값을 최대한 보존할 수 있는 타입으로 변환한다** 입니다.

```java
long l = 50;
byte b = 50;            // OK. 리터럴의 타입이 달라도 값이 보존되는 경우 자동 형변환
byte b1 = 1000;         // 에러. byte의 범위 -128~127을 넘는 값 저장 시도
byte b2 = (int)1000;    // OK. 명시적 형변환 사용, 그러나 범위를 벗어나 오버플로우 발생
byte b3 = l;            // 컴파일 에러, 형변환 생략 불가
float f = l;            // OK.
```

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-11T11:48:17.150Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;f6jB5pSjbe7slysiNXKy\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;jMVt9eQdQ8I8yCdvdnQu\&quot; name=\&quot;그림 8. 기본형 자동 형변환 가능 방향\&quot;&gt;7Zpdj6IwFIZ/jZebCOXLy9EZ9yPZZLOT3bnuQIVmCzWljDq/foscVFocGWcMJuiN9LQ9tOd5C+3REZql668CL5OfPCJsZI+j9Qjdj2zb8pCrvkrLprIEE1QZYkEjaLQ3PNJXAsYxWAsakbzRUHLOJF02jSHPMhLKhg0LwVfNZgvOmndd4pgYhscQM9P6RCOZwCxsf2//Rmic1He2vElVk+K6McwkT3DEVwcm9DBCM8G5rK7S9YywMnh1XKp+8yO1u4EJkskuHX4k8+enYjJnQkxs+8/v7yqMX+zKywtmBUz4eSMJDFhu6igIXmQRKR2NR2i6Sqgkj0sclrUrxV3ZEpkyVbLU5YJnco5Tykrkf4mIcIbBDHwtD8ozzrjY3gKNtx9lz6Xg/0hbzYIyVtsznilPUxg+EZKsj8bF2kVbyZTwlEixUU2gQwB8QKD2GMqrPW4fTMkBaQdsGAQW7xzvGagLwPAOJMhAUhZbsahJy2bsMaNxpq5DNXmi4jQtQ0OVnO+gIqVRVHafCpLTV/y8dVUGd8lpJrdzcacj9770VUieAzCDC8S/BUkb5yNyaIP8CUR3CAGp5XdDii6F1DGQ5gkXclDLTIfS+zpzDShhgsWwmQQ9M/EMJuqhNCgkyL6yZeIbSBjP4kExcZwrYxIYTBaM42EtFNe7MigTA0rEi3J/NSQq3rXtputz5AEWAwjJorvyqFjumxnOcxo2GTSBXYxINS4SGQdSLfhq7LwQIXlj1jBHiUVM5KmNqQnzAJbbAqu2CcKwpC/N4bYRhDv84tu3+bFXHfI0EVTThF6HJ1vdka85sjRHVRwMR1tB7ab9AY1ZQ9SY01FjXp8a03e4jv6g6aox2z/h6NIaMzM1A9CY11Fjfq/PMW0n4thnasxBJxxdWmNm6mkAGvM7aizoU2OO7zakYZ37rnS1DZqjJ70urTEz7TIAjQUdNTbpU2Oe25SGFZypMV/Pv+qOLq0xM2ehgnFLoZ//o0jvGXTLTHk4N6TvQqoft/pnamZMghvTdzHVM5O9M601dlunn5bY7J+pmd64rdOPpUX7ZzrIdAKcPa47ZYW0bbiRzeycThifcHT2NlwV9/9bqprv//2FHv4D&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 8. 기본형 자동 형변환 가능 방향&gt;
{: style="text-align: center;"}

화살표 방향으로의 형변환은 단계를 건너뛰어도 상관 없으며 명시적 형변환 없이 가능하지만, 그 반대 방향으로의 형변환은 반드시 명시적 형변환을 사용해야 합니다.

- boolean을 제외한 나머지 7개 기본형은 서로 형변환 가능
- 기본형과 참조형은 서로 형변환할 수 없음
- 값의 범위가 작은 타입에서 큰 타입으로의 형변환은 생략 가능
- 리터럴의 타입이 달라도 값이 보존되는 경우 형변환 생략 가능

## A. 참조
S. Namgung, "변수(Variable)," in *Java의 정석*, Jung-gu, Korea: 도우출판, 2022, ch. 2, sec. 5, pp. 74-83.
