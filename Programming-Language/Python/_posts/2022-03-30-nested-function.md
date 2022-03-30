---
title: '[10] 파이썬 중첩 함수와 LEGB 규칙'
author_profile: true
toc_label: '[10] 파이썬 중첩 함수와 LEGB 규칙'
post-order: 10
---

## 1. 중첩 함수(Nested Function)
파이썬의 함수 안에 함수를 정의해서 사용할 수 있는데, 이를 중첩 함수라 한다.

```python::lineons
def f1():
    print('f1() called.')

    def f2():
        print('f2() called.')

    f2()

f1()
```
```txt
f1() called.
f2() called.
```

이 때, 함수 `f1` 외부에 선언된 변수에 대해 함수 `f1`과 `f2` 내부에서 참조할 수 있다.

```python::lineons
def f1():
    print('f1() called.')
    print(f'a:{a}')

    def f2():
        print('f2() called.')
        print(f'a:{a}')

    f2()

a = [1, 2, 3]
f1()
```
```txt
f1() called.
a:[1, 2, 3]
f2() called.
a:[1, 2, 3]
```

## 2. 파이썬의 LEGB 규칙
[1장](#1-중첩-함수nested-function)처럼 함수 외부에 선언된 변수를 함수 내부에서 접근할 수 있는 이유는, 파이썬에서 변수에 객체(값)를 바인딩하거나 참조할 때 LEGB 규칙에 따르기 때문이다.

<div class="notice--info" markdown="1">
파이썬에서 바인딩이란 변수가 어떤 정보를 저장하고 있는 메모리 위치를 가리키도록 설정하는 것이다. 예를 들어, `a = 10`이란 코드를 실행하면 정수 `10`에 대한 정보가 메모리의 어느 위치에 저장되고, 그 위치는 파이썬 프로그램 내에서 `a`로 명명된다. 이후 프로그램에서 변수 `a`를 참조하면 `a`에 바인딩된 메모리를 참조하여 정보를 알 수 있다.
</div>

L, E, G, B는 각각 다음과 같은 의미를 가진다.
- **L**ocal
    - 함수 안, 지역
- **E**nclosed function locals
    - 함수 자신의 외부 함수 영역
- **G**lobal
    - 최외각 함수 바깥 모듈 영역, 전역
- **B**uilt-in
    - `open`, `range`와 같은 파이썬 내장 함수

파이썬에서는 변수를 참조할 때 LEGB 순으로 해당 스코프(Scope) 내에서 변수를 탐색하여 참조한다. 본문에서는 이를 **LEGB 규칙**이라 한다. 이 LEGB 규칙은 객체지향 프로그래밍 설계 원리에서 객체의 유효 범위(스코프, Scope)와 연관이 있다.

### 2.1. 변수 참조
<p class=short>다음 코드를 보면, 함수 <c>f</c> 내부에서 전역 변수 <c>a</c>의 값을 참조할 수 있음을 확인할 수 있다.</p>

```python::lineons
a = 10

def f():
    print('f() called.')
    print(f'a:{a}, b:{b}')

f()
```
```txt
f() called.
a:20
a:10
```

함수 `f` 안에서 변수 `a`를 참조할 때 다음과 같이 LEGB 순으로 각 범위에서 변수를 탐색한다.
- **L**ocal(함수 안)을 탐색했을 때 변수 `a`는 존재하지 않는다.
- **E**nclosed function locals(외부 함수 영역)은 존재하지 않는다.
- **G**lobal(현재 모듈 영역)에 변수 `a`가 존재하므로 이를 참조한다.

<p class=short>네 개의 중첩 함수 예제</p>

```python::lineons
def f1():
    print('f1() called.')
    b = 'f1'
    print(f'a:{a}, b:{b}')

    def f2():
        print('f2() called.')
        print(f'a:{a}, b:{b}')

    
        def f3():
            print('f3() called.')
            print(f'a:{a}, b:{b}')
    

            def f4():
                print('f4() called.')
                print(f'a:{a}, b:{b}')
        
            
            f4()

        f3()

    f2()

a = 'g'
f1()
```
```txt
f1() called.
a:g, b:f1
f2() called.
a:g, b:f1
f3() called.
a:g, b:f1
f4() called.
a:g, b:f1
```

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-03-30T06:55:48.256Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36\&quot; etag=\&quot;JS8HVHwbLxdnp-LMtfqV\&quot; version=\&quot;17.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;dFIygIs9Rqg9KwOah2Or\&quot; name=\&quot;refer\&quot;&gt;7Vtdc5s4FP01nu4+JIMkEPgxtpvuy37MpjPdPgoQNhOMXCzHdn/9SiCMJeHGmwWcOsmDg64+EOfeo3uE7BGaLnefCrJa/M5imo2gE+9GaDaCEIDAE/+kZV9ZMAwqw7xIY9WoMTyk36kyOsq6SWO61hpyxjKernRjxPKcRlyzkaJgW71ZwjL9risyp5bhISKZbf2SxnxRWQPoN/bfaDpf1HcGeFzVLEndWD3JekFitj0yoY8jNC0Y49XVcjelmQSvxqXqd3+i9jCxgub8nA7b9OGb+/jl69Nn8id/EtUP3/MbNcoTyTbqgdVk+b5GoGCbPKZyEGeEJttFyunDikSydit8LmwLvsxECYjLJM2yKctYUfZFSRDRKBL2NS/YIz2qCQPP9eSAagK04HR38snAAS8RaJQtKS/2oonq4CqE93px2/gLIWVbHPlK3r+KExUj88PIDYziQiH5H1CFLajiTNx2EmrY4m8b6f1JwnJ+sy5j/040AHi1K5Gp68XVXP7/VA8jZhXWxoyFJLO8JtDkumtIls5zcR0JVKnwwkRinopIv1MVyzSOZfdJQcVcSFgOJV20YmnOS4y8ycibybE2nFXzLYfWvZuznBqhoExVu5pHQD25Ij3AqnxPlmkmffk5XQrqQ+cPuhWff7MlyYcKGNwSL7CvcEH9kvB+NptO7tpIGPvj0OmIhIGvYQqAZ4EKXWSjinpjoWvBmoBffn1nSsdedYekitdzvkoS2J6vYhxiD3cDKnAMVIMWrjgtXDksS53jim2uwHeudO/WQcni90uW2KNB7LaRJYAhwl2RBeqoQs9GFeAWsgC/L1wDmyzonSzdu3VQstQbziOvElEsr5wP8w8/oA44gzrPg2r6wfZUB7BjXfn6NujYHxJ0e/8ZNqAn4EpQBwDdenpucC+NvK2Ou00OhAZJq5LCUUDDpCNgXX0VQbAlOcCW5BD0hqutUBP3PTl079Zhk4Od8skrWJpisl4cbtgF7shIyrDlVdqguI/b8sP14R44Rn64OPLwjDfDNI/v5Ct2UWIrmutA68lDQywjIc0mJHqcl43qRSimCdlk/GVOkmV7IH3hO7IvyEp2VacGsnYinuY+lSCVExaeK/b/yMKtWHxU+at6gLIw2x03ne1VqUKJxtaxghEMAkm2KSJ6xqrDSTGn/FntaofXUfB4LcFT2wqaEZ4+6RNuiyh1h79kvmmi1zNepwJkBGX1oKoXPDqhMAdy/FskFn8YeL78dF1tXDNnV7BYw4qQJPujZio7npy+b6x5SDtGERfVgA2VDgD/D3bBt82uLkkyPpckJ9bggUgCDZK4LySJG+iZYtwPK8AY6/NV+/N+aWGfhFylzDLk7cGHF0v29mbwKmXW2JJZF0f+jAONa04Er0Fm1avOK5dZN2M9g8CXZpAb4JVoa8u74w0hrpAzhLiyD7PeFKe6pIb7U4gr16TGS3cgru/ejlHzp29AAO6HJIfptrPk2fbDaDP7NPEqtRk2Vix8aYVgv3q8Rm0mMpChzS6PvP3y8U3lkVehzfyfQpsZm3tkfvXg3PwDjIUd9LO5N1WZP4Aqq6n7VtnUJSnOfi98WVXmG6rM/Kbn2arM+6EqC3pSZV47qU+qMq9TVSaKzW8DqubNLyzQx38B&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

각 함수의 LE에 대한 변수 탐색 범위와 순서를 설명하면 다음과 같다.
- `f1`
    - L: `f1`의 내부
    - E: 존재하지 않음
- `f2`
    - L: `f2`의 내부
    - E: `f1`의 내부
- `f3`
    - L: `f3`의 내부
    - E: `f2`의 내부, `f1`의 내부 순
- `f4`
    - L: `f4`의 내부
    - E: `f3`의 내부, `f2`의 내부, `f1`의 내부 순

함수 `f1`은 변수 `a`를 G에서, `b`는 L에서 참조했고 함수 `f2`, `f3`, `f4`는 변수 `a`를 G에서, `b`는 E에서 참조한다.

### 2.2. 변수 바인딩
변수 바인딩은 LEGB 규칙에 따르되 특별한 키워드를 사용하지 않으면 반드시 L에서 수행된다. `nonlocal`, `global` 키워드를 사용하면 각각 E, G 스코프의 변수에 바인딩할 수 있다.

### 2.2.1. `global`
`global` 키워드를 사용하면 **해당 변수는 반드시 전역에서 바인딩된다**. 이 때문에 함수 안에서 `global` 키워드로 명시한 변수를 선언하면 함수 바깥에서 이를 참조할 수 있다.

<p class=short>다음 코드의 결과를 살펴보면 어떻게 동작하는지 자세히 알 수 있다.</p>

```python::lineons
def f1():
    print("함수 f1 호출됨")

    def f2():
        print("함수 f2 호출됨")
        print("a = 'f2'")
        a = 'f2'

        def f3():
            global a
            print("함수 f3 호출됨")
            print("global a = 'f3'")
            a = 'f3'
            print(f"함수 f3에서, a:{a}")
        
        print("함수 f2에서 함수 f3를 호출함")
        f3()
        print(f"함수 f2에서, a:{a}")

    print("함수 f1에서 함수 f2를 호출함")
    f2()
    print(f"함수 f1에서, a:{a}")

def o4():
    print("함수 o4 호출됨")
    print("a = 'o4'")
    a = 'o4'
    print(f"함수 o4에서, a:{a}")

def o5():
    global a
    print("함수 o5 호출됨")
    print("global a = 'o5'")
    a = 'o5'
    print(f"함수 o5에서, a:{a}")

print("전역에서 함수 f1을 호출함")
f1()
o4()
o5()
print(f"전역에서, a:{a}")
```
```txt
전역에서 함수 f1을 호출함
함수 f1 호출됨
함수 f1에서 함수 f2를 호출함
함수 f2 호출됨
a = 'f2'
함수 f2에서 함수 f3를 호출함
함수 f3 호출됨
global a = 'f3'
함수 f3에서, a:f3
함수 f2에서, a:f2
함수 f1에서, a:f3
함수 o4 호출됨
a = 'o4'
함수 o4에서, a:o4
함수 o5 호출됨
global a = 'o5'
함수 o5에서, a:o5
전역에서, a:o5
```

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-03-30T06:26:48.445Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36\&quot; etag=\&quot;8BSKn5qv1Yj-NRpVP157\&quot; version=\&quot;17.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;E18hHLaA2yfh51nBC1s6\&quot; name=\&quot;global\&quot;&gt;7Vpdk5s2FP01njQPyQiEBDwaezedafPVTWenfckIEJgJRl4sx/b++ggQBiF2626Buh3vwxpdfSCde47uRTCDi/XhXU42q/cspOnMBOFhBpcz0zQMB4mfwnKsLNh0KkOcJ6Fs1BjukkcqjUBad0lIt0pDzljKk41qDFiW0YArNpLnbK82i1iq3nVDYqoZ7gKS6tb7JOSryuqYdmP/mSbxqr6zgd2qZk3qxnIl2xUJ2b5lgjczuMgZ49XV+rCgaQFejUvV7/aJ2tPEcprxczpgcP8pfvy8y3751fkd3L//I1l+fSNH+U7SnVywnCw/1gjkbJeFtBgEzKC3XyWc3m1IUNTuhc+FbcXXqSgZ4jJK0nTBUpaXfWHkBDQIhH3Lc/aNtmp8B1moGFBOgOacHp5cmXHCSxCNsjXl+VE0kR0sifBRLe4bf0EsbauWr3DtGSI5Ep9GbmAUFxLJv4Eq7EEVp+K2nq9gix92hfe9iGX8zbbk/lw0MPDmUCJT14uruPh9Vw8jZuXXxpT5JNW8JtDkqmtImsSZuA4EqlR4wSswTwTT57JinYRh0d3LqZgL8cuhChdtWJLxEiPkzdCyGGvHWTXfcmjVuxnLaIcK0lS1q3VkyJVL0RtYlm/JOkkLX35J1kL6JvhA9+L/b2xNsqkI08eX0ehijSvC2+Vy4c37RBjarg8GEqEBVFAdHVQT9aAKR4MVabBGxk+vr0oZ2KvWlFLBI8erKDL741WIfYzwQKCaKqinclsrRh+sxli42rpWzKtWhnfrpGJxxhVLiKgTWn1icUwf4qHEglRUzR5Ujb7A4o4Fq6trBV61MrxXJ9VKvbOOJhZCnag3suDAoX40Tri28JlicUbDVX/CZNZVLcO7dVq1mOOqhRoiuNh9anGxDclQoaUDK0L/ulr0kwOGrmoZ3q3TqkVPxMgzcjHOkMtfA9nFXvfOEFCbSN2Y6nL77G1SqPXkTEANyivwKjJf/U9w75xgGcjVcMf2hLibevoUy4NJ0HYAvAQHhGS7Ot1wCG/YUPGG2HH0OAImdYceny9hxxkc+M72A3t2+km3H1M/c9Rgp1k4L15MiRLb0EyFWU2aFLxS4tPUI8G3uGxUB9+QRmSX8pe5qCjrA6kBv2VfkU3RVb5rK2o9sZrbpABp2Zwj01B7p9bxqACE7fKAnkFhTvKY8mcaVtFV50iLA305XG3LaUp48l2dcB8x5B0+FelSQ0HTgm9VEtpddlVLlf0agulDud2hsN0ZqgJDG6rk6mnp/4C+Z5wYXel7Fn1h/bL6wumLNPrCF9IXAo2+3eekJ+gr+ESOrWbyieTpSdepTX0fAJ6dWbe9BVFHPdUMBtUS1DOiViLErEtIhAYJwZ2HLaCH4EkzUagfOPVlogxdggOGT4g63nB7TjR63ywN4A7Pfth/fPAXH+5u/px//PL50c6zcz4wuUaU8xIi8N+IKIb71gZu8+cojIQWemF29Py4Fhgp1piDxg5RbL74qpo3383Bmx8=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

몇 가지 유의할 점을 꼽아보면,
- 함수 내부에서 `global`로 명시하여 처음으로 선언된 변수 a는 전역에서 참조할 수 있다.
- 내부 함수 어디에서나 모듈 전역에 속한 변수를 `global` 키워드를 이용해 바인딩할 수 있다.

### 2.2.2. `nonlocal`
`nonlocal` 키워드를 사용하면 해당 함수의 **E**nclosed function locals 에서만 변수를 탐색한다. 이 때 E에 변수가 존재하지 않으면 오류를 발생시킨다.

#### 2.2.2.1. 예제 1 - 전역은 탐색하지 못함
```python::lineons
def f1():
    global a
    print("함수 f1 호출됨")
    print("global a = 'f1'")
    a = 'f1'

    def f2():
        nonlocal a # 오류 발생
        print("함수 f2 호출됨")
        print(f"함수 f2에서, nonlocal a:{a}")
        
    print("함수 f1에서 함수 f2를 호출함")
    f2()

print("전역에서,")
print("a = [1, 2, 3]")
a = [1, 2, 3]
print(f"전역에서, a:{a}")
```

<p class=short>실행 결과</p>

```txt
SyntaxError: no binding for nonlocal 'a' found
```

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-03-30T06:26:02.620Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36\&quot; etag=\&quot;ozF8cRjTSpY9xaXxsY0c\&quot; version=\&quot;17.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;sD9mAf88FV6OUDOjX0pw\&quot; name=\&quot;nonlocal error\&quot;&gt;7Vnfk5s2EP5rmLQPvkFgMDyCbdJm2k6m1x+PNwKE0UQgDsuxnb++KxA2IHx3Se1rpnN+sKWVtBLffrvLyoa9LA7va1zlv/KUMMMy04NhrwzL8j0E31JwbAWOZbaCTU3TVoTOgnv6hShhN21HU7IdTBScM0GroTDhZUkSMZDhuub74bSMs+GuFd4QTXCfYKZL/6apyFupZy3O8p8I3eTdzsj125ECd5PVk2xznPJ9T2SvDXtZcy7aVnFYEiax63Bp10UXRk8Hq0kpXrKA1I/pI7cKexd/KYIPefFhfZgpLZ8x26kHVocVxw6Bmu/KlEglpmGH+5wKcl/hRI7uweQgy0XBoIegmVHGlpzxullrZ15CkgTkW1HzT6Q3EnvO3JEK1QFILcjh4pOhE17AM8ILIuojTFEL5grh47C7P9vLcpQs79nK7jiGFUc2J81nGKGhkPwKVK0JVF0G24bxAFv3cSetH2a8FLNtw/0AJiC3OjTIdOPQ2sjf950aOFXcCRmPMdOsBmiKoWkwo5sS2gmgSsAKocScAtMDNVDQNJXLw5rAWXDcqJImqjgtRYORExrOSuraCd6et1E9tG7JSzKighK18zo/QurJldMjV/UjXFAmbfkHLcD1LfM3sofv33mBy9cijDvBF+tWdLFv64TRarUMgyknTBd+bF7JCRdDTD0dU+RPgHoSXh3VuYZqhn748c1RrmvU+Ws6inPjbJVl1nS2St3YddzrYOoPMUVzX/eUqXSFTHQjWF3dU6w3T7m6VV/VVTrX6BkVP+Es6AXO8jyOY+h141w/JtmmHpTsV0VaT98b9U5mAuRmIzLfZejdd4B/irf5acMb0B5NpH3zVa2hp30NdlKmgSwNoccrUg5hHiaQAV4Mx4SFOPm0aSZ1kSglGd4x8W0mkn1d0TD69eQ5ruRSVe3K0RCeJqISpNX5TY6kWlU7sigAwnd1Qp6CUhFb4HpDxLOxRudIjwRTCa2T1YRhQT8PDzxFDLXDR5k7zhS0vREHx2+U7YOqVf0C+RlF1twZKmqB0BQBl/CxN03ltosHdkbnHdftT0/vqtazk7T7n13mZIEXedHiz/yhTP86Wl8C/oD4o7mO4olrAUi3jCddUPvfxbFT4OqM4vl3jhbKvBtFskkbTF0ivAWyZwLZU2x+Po7Z/2kcsy/k0q+OY2NF7m3imGWO4qX5dCAbzx8FvttEshfcrXRcpEVzF9z3oXE9I3jVk/4i3egjVC2CcjkacyF4cdm/2hITPjCl2SzYVu2dtSQ87joZPUhPDdV5VrkQ8rI7kEhZUZKW9h0Fv8kouHd9l8COVpRiAWE5knKwWJQBE2c4kefazhrhDOqRaOFLuJeMb8nDzyCdIcu7q8rNOD7c3v31qu3CndU1YvuoYkCOp0V2e677dSe7emTXrzHWEMVrjZjfZcH9DeV1nxvStpENn06Velx0DUOPqxFXT+G3utidNLR+sWKsl0aAjHAuG/7aCJbGemX4juF7zdDCkO8YZjPqGF7QNFaGt3wjx78lhzUkhz9RqVrXIQd0z3/rtYns/N+ovf4H&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

#### 2.2.2.2. 예제 2 - 변수 1개
```python::lineons
def f1():
    print("함수 f1 호출됨")
    print("a = 'f1'")
    a = 'f1'

    def f2():
        nonlocal a
        print("함수 f2 호출됨")
        print("nonlocal a = 'f2'")
        a = 'f2'

        def f3():
            print("함수 f3 호출됨")
            print("a = 'f3'")
            a = 'f3'

            def f4():
                nonlocal a
                print("함수 f4 호출됨")
                print("nonlocal a = 'f4'")
                a = 'f4'
                print(f"함수 f4에서, a:{a}")
            
            print("함수 f3에서 함수 f4를 호출함")
            f4()
            print(f"함수 f3에서, a:{a}")
            
        print("함수 f2에서 함수 f3를 호출함")
        f3()
        print(f"함수 f2에서, a:{a}")
    
    print("함수 f1에서 함수 f2를 호출함")
    f2()
    print(f"함수 f1에서, a:{a}")

print("전역에서")
print("a = 'g'")
a = 'g'
print("전역에서 함수 f1을 호출함")
f1()
print(f"전역에서, a:{a}")
```
```txt
전역에서
a = 'g'
전역에서 함수 f1을 호출함
함수 f1 호출됨
a = 'f1'
함수 f1에서 함수 f2를 호출함
함수 f2 호출됨
nonlocal a = 'f2'
함수 f2에서 함수 f3를 호출함
함수 f3 호출됨
a = 'f3'
함수 f3에서 함수 f4를 호출함
함수 f4 호출됨
nonlocal a = 'f4'
함수 f4에서, a:f4
함수 f3에서, a:f4
함수 f2에서, a:f2
함수 f1에서, a:f2
전역에서, a:g
```

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-03-30T06:25:35.518Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36\&quot; etag=\&quot;FmpISf6fYPyGQykGCD21\&quot; version=\&quot;17.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;ThFVN1UPG8LgpUO0GNHC\&quot; name=\&quot;nonlocal #var=1\&quot;&gt;7VnRkps2FP0aT5qH7CABgn00dnYzaZPJdDvTad8ECMNEIAfLsd2vrwTCIKTNbrfgZDJ+sI2upCvpnHukK7xwV+Xxvsbb/ANLCV1AJz0u3PUCQgBCX/xIy6m1IBi2hk1dpKpRb3go/iHK6CjrvkjJTmvIGaO82OrGhFUVSbhmw3XNDnqzjFF91C3eEMPwkGBqWv8sUp631hAGvf0dKTZ5NzJAt21NibvGaiW7HKfsMDC5bxfuqmaMt0/lcUWoBK/Dpe1390jteWI1qfhzOnz56/BrlL+/D5e/BfgTPP2dU++N8vIV071asJosP3UI1GxfpUQ6cRZudMgLTh62OJG1B8G5sOW8pKIExGNWULpilNVNXzcLE5Ikwr7jNftMBjVx6Hu+dKgmQGpOjo+uDJzxEoFGWEl4fRJNVAdPIXzSi4eeLzdUtnzAlRy/jRMVI5uz5x5G8aCQ/A+oQguqiIpho1jDFn3ZS/ajjFX8za6J/aVoAND22CDT1Yunjfy979yIWcWdkbIYU4M1gSbXqcG02FTiORGoEsFCJDEvRKQvVUVZpKnsHtVEzAXHjStJ0ZYVFW8w8qOFv5a+9py1821c6+xWrCKjUFCmtl2nI6BWrkQPkCrf4bKgkss/ilJIHzofyUF8/85KXF0qYJAlXuBc4eLOK8K79XoVLW0iTIPb2JlIhGGgYQqAb4AKu8NgiKo7mwo9A9YM/PL6qpSJWfUuKRV/5vMqy6D9vEpRjHw0DajAGaEaWrTiWbRy3pYmxxWZWoFXrUxP60XFEswrltQnYerZxBLC2EVTiQXqqELfIhbHIhYQzIVraIrFvYplelovKhZgpgsCMsoSmVw7WHwao/Mqg6++ISPwDBk9DfCYE5O1FO/y84BT8OG6N77OiOWsF/f5G9u5NNtFyrxJDZjY/AhETIA90q8jgYk7Ci4JuqmEYfiDnwR1AMYRD7zvjfwz0ltSpUv5XkuU2JZUOrb6ca7tERTHhEY4+bxpGnXHQkoyvKf8ZbzIsulIP4oG9hxvZVf1qk7WRmI1d4UEad1fQ0lqvJIbcSoAYfs6Ic/YzjmuN4Q/Ge1mlAxiwLecQ52tJhTz4qs+YVtgqBE+yYO8D0J/nDN2Idi5aBeqeg3f7j3hCDqjIG2BMBw1cXpe9v8IXfMGMdw03J9l0/BGMFty/MtuGXMn+ZiEmfVGjJKQxNk8sLrQknsgS+YRzoarJcn3rkn+9LReNMmHtwarjyT53o+wYU2e5KMRH5ZLF4CXTPBd55rxTJTxdLH9dMaDvmfGAwLvBnji3AzUt36ewhfmP8C/vel9eh0YXVoVjNy+OBsSxf4v27Z5/8e3+/Zf&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

- **E**nclosed function locals에서 변수를 탐색할 때 가까운 외부 함수 순으로 탐색하는 것에 유의한다.

#### 2.2.2.3. 예제 3 - 변수 2개
```python::lineons
def f1():
    print("함수 f1 호출됨")
    print("a = 'f1'")
    a = 'f1'

    def f2():
        nonlocal a
        print("함수 f2 호출됨")
        print("nonlocal a = 'f2'")
        a = 'f2'

        def f3():
            print("함수 f3 호출됨")
            print("b = 'f3'")
            b = 'f3'

            def f4():
                nonlocal a, b
                print("함수 f4 호출됨")
                print("nonlocal a = 'f4'")
                print("nonlocal b = 'f4'")
                a = b = 'f4'
                print(f"함수 f4에서, a:{a}, b:{b}")
            
            print("함수 f3에서 함수 f4를 호출함")
            f4()
            print(f"함수 f3에서, a:{a}, b:{b}")
            
        print("함수 f2에서 함수 f3를 호출함")
        f3()
        print(f"함수 f2에서, a:{a}")
    
    print("함수 f1에서 함수 f2를 호출함")
    f2()
    print(f"함수 f1에서, a:{a}")

print("전역에서")
print("a = 'g'")
a = 'g'
print("전역에서 함수 f1을 호출함")
f1()
print(f"전역에서, a:{a}")
```
```txt
전역에서
a = 'g'
전역에서 함수 f1을 호출함
함수 f1 호출됨
a = 'f1'
함수 f1에서 함수 f2를 호출함
함수 f2 호출됨
nonlocal a = 'f2'
함수 f2에서 함수 f3를 호출함
함수 f3 호출됨
b = 'f3'
함수 f3에서 함수 f4를 호출함
함수 f4 호출됨
nonlocal a = 'f4'
nonlocal b = 'f4'
함수 f4에서, a:f4, b:f4
함수 f3에서, a:f4, b:f4
함수 f2에서, a:f4
함수 f1에서, a:f4
전역에서, a:g
```

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-03-30T06:25:04.948Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36\&quot; etag=\&quot;Oer-IwaOuJqEvcBsYpMb\&quot; version=\&quot;17.2.4\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;tEZ9QvHjHKbQGEAJWwLh\&quot; name=\&quot;nonlocal #var=2\&quot;&gt;7Vpbc6M2FP41nm0f1oMkbn4M9jp9aDOdzU4705eOAIHZlZGLcez011cYYdDFseMFbyb1QxxxJB2k71z06QwjNF3u7gu8WvzGYkJH0Ip3IzQbQQiA7/B/leS5lrjQrwVpkcViUCt4zP4lQmgJ6SaLyVoaWDJGy2wlCyOW5yQqJRkuCraVhyWMym9d4ZRogscIU136ZxaXi1rqQ6+V/0KydNG8GbiTumeJm8FiJ+sFjtm2I0KfRmhaMFbWreVuSmgFXoNLPW9+pPewsILk5TkT/t7+BTAsvtzTJKaF9ZV6MP0otDxhuhEbFostnxsECrbJY1IpsUYo2C6ykjyucFT1brnNuWxRLil/AryZZJROGWXFfi5K/IhEEZevy4J9I52e0Hdsp1IoFkCKkuyO7gwc8OKORtiSlMUzHyIm2ALhZ/lx29oL+UK26NjKboRY+Eh60NzCyBsCyVegCg2oupS/NgglbN1/NpX1g4Tl5cf13vfv+ADgrnZ7ZJp+3kqr//eNGr6qsBFSFmKqWY2jWcqmwTRLc96OOKqEWyGoMM+4p9+JjmUWx9X0oCB8LTjcq6pMtGJZXu4xcoKRM6t0bUpWr3evWrZuznKiuIIQ1eOaOAJi5yLogSue53iZ0cqWX7IlD31oPZAt//3Mlji/lsO4Bn+BQ7kLGjYI57PZNLgzBWHsTUKrpyD0PQlTABwNVNgcBl1UUSPsHVZbgzUBP/18i5SerWpfM1Scgc+rJIHm8yp2Q9dx+wEVWAqqviFWbEOswMlQseLqsQJvsdK/Wa8aLN6wwRI7xI9tU7D4MERuX8ECZVShYwgWyxQs1lDB4uvBgm7B0r9ZrxosE82oHDHKoopbW5j/7YXWhwR+eCGKwBlRdBpf1SS60WK8Xhxe2Ic5EBo7skEMRz2/zo+NkTaQTZoiQMcoHUukb8EQPWDvyrcRT8fd9a4Jul4T6Lo/eCeoA6B6PLB/NPKmuoGCNcnju6qsxZ/YiuQytvJpLuUIikNCAxx9S/eDmlMhJgne0PIyu1TPuiL5JOrIF3hVTRWVuqo34LuZZxVIs/YWSmKtIqfYlAPCNkVETmfzEhcpKU86u+4kHRdwDKdQIysIxWX2JK/X5BfiDb9Xx3jrg47KGG2FstT7FLO6tb0TiqCl+GgNhKZo76aHbX+H5+oljLCTM9B7yRm2ArOB4V83Y+g1jheQvoDiY+InxvuwG/kkTIaBFUED9XANxGOw6zDQ6wyJfaP4/Zv1qhQf6FWOIxzffgsJq3eO7yr2MFy5ALwqvz+jQnEjPGcRnsa33zjjAZ49BjY/Nz3xK5+n8EL+A5zJuNVpw4lMqzxF7RE2xP0MP3eGiYx8dDPIkm9uSJxRx1apjgeONJ436hX0S830alUn6XVZ2v8j6Rko25WTnl5puiW9C5Oef27SQz8y6TlQjvuD3temOdv3xgi2+dO97Nb36jynrB9NTuQ5db+TfvPcg+PNn76G01+h/wdeBpvPD+HW8CULfo/pTOHUNjJ87DIQpzbCfitZXZDMXnLgN07gkAXlXKByq7Mp28RS66/uQDRN/dzHtl5cmTr+O2kaf2w/8quHt59Kok//AQ==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

- `f4`가 `nonlocal a`로 `f1`의 `a`를 수정할 수 있음에 유의한다.

## A. 참조
조대표 & 유대표, "함수 안의 함수" in 
*레벨업 파이썬*, Mar. 27, 2022. [Online]. Available: [https://wikidocs.net/80520](https://wikidocs.net/80520) [Accessed Mar. 29, 2022].

조대표 & 유대표, "LEGB 규칙" in  
*레벨업 파이썬*, Mar. 27, 2022. [Online]. Available: [https://wikidocs.net/80519](https://wikidocs.net/80519) [Accessed Mar. 29, 2022].

Jinku Hu, "Python의 중첩 함수", *DelftStack*, Aug. 10, 2021. [Online]. Available: [https://www.delftstack.com/ko/howto/python/nested-functions-python/](https://www.delftstack.com/ko/howto/python/nested-functions-python/) [Accessed Mar. 29, 2022].