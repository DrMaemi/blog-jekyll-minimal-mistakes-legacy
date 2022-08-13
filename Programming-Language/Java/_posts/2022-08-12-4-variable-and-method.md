---
title: '[JAVA] 4. 변수·메서드 종류'
author_profile: true
uml: true
toc_label: '[JAVA] 4. 변수·메서드 종류'
post-order: 63
last_modified_at: 2022-08-13 21:17:21 +0900
---

## 1. 선언 위치에 따른 변수의 종류
- 클래스 변수
    - 전역 변수
    - 클래스 영역에 `static` 키워드 사용하여 선언
    - 인스턴스 생성 없이 사용 가능
        - 클래스가 메모리에 올라갈 때 생성
    - 모든 인스턴스가 공유하는 메모리
    - 프로그램 종료까지 유지
- 인스턴스 변수
    - 클래스 영역에 선언
    - 인스턴스가 생성될 때 생성
    - 인스턴스가 생성된 후 사용 가능
    - 인스턴스마다 독립적인 저장 공간을 가짐
    - 인스턴스 생명 주기에 따라 유지
- 지역변수
    - 클래스 영역 이외의 영역
        - 메서드, 생성자, 초기화 블럭 내부
    - `static`키워드 사용 불가
    - 메서드 호출 후 변수 선언문이 수행되었을 때 생성

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-12T11:52:18.749Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;vze8ynponafW8Su1DY1k\&quot; version=\&quot;20.2.3\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;2NEpFBkrniy2ZzGocc17\&quot; name=\&quot;그림 1. 선언 위치에 따른 변수 종류\&quot;&gt;7VnJbtswEP0aAukhgBZrO0pe0i1BgRQteioYi7GI0qJL0Vu/vkORsiVLits0toG2SQDTT8PhcB5HeqMgdzjf3Ai8yG55ShhyrHSD3BFyHNt3PfhQyFYjYeRqYCZoaoz2wD39QQxoGXRJU1I0DCXnTNJFE5zyPCdT2cCwEHzdNHvkrLnqAs9IC7ifYtZGP9NUZmYXTrDHXxM6y6qVbT/SV+a4MjY7KTKc8nUNcsfIHQrOpR7NN0PCVPKqvOh5k56ru8AEyeWvTPjoDK33+O7Lnfj4dZPZgXvz9t21IWOF2dJs2AQrt1UGBF/mKVFOLOQm64xKcr/AU3V1DZwDlsk5g282DB95Lid4Tpmi+01yC64mjGzg45bn3BgYlh3lr5CCfyNDzrgAKOc5UUaUsQpCjjv21S/gJlgiJNn0ZsHe5RYOJeFzIsUWTMwEJzAHclsRZr6v9+x6nqEsqzG74xGbEzXb+d4nHQYm77/BweDSHByke1L+9HHzAhy4bpMDx21z4NodHASnosBuUTBluCgA+oQFxQ8MbkGOzyCM5EHAaKZGKEg6QIMUC5w3OPS/L1Wla/KuC81erPImdForg5onICOq+YStabfagEK2YV+r8656yqXOGH4PrEqjMwJ14booi0atDxFsegKYlH8WGg9RNEJJqAZhjOIBGo9QOEDJoIYkKHFRWBqHIYrCWng6lGZ4FzlnhcSSTtVRK3MzPfWBO8spmDx1xSqpskuqEhSNFTH9nF2pUWwpbhXnAYpHpYs2t8MSjxWeeKVxObHL+NVFKb/o4isO92oQUERmPL26cCLOfY8/x3OjBy+rm63UcVQLW9YFarK6c8aBKQZdTr33yb+9FlAw6hIeo5ZCBDWmLtVkIGZ0lsOYkceyqkCxUehrYgPPaZqqyYkg8FhTEseoywWH+3wpsLwEeSPlaSm5fvSVjo9K9go6lJnHdOkJ5H3Yoe6DLnXvnUpaesfVPcnTWLWq+9TVaGxK/2f0V1jIyjuHKCpsQlm1hA6IpK1O+GjW62ntyGqFCcJAQqya7rsybVb4wLXUMKSG1kHPVvULlYuCL8WUmFn1FvjQkX/EESRmRmTLUUn8btvPPwt++yw8ITSMhgyVwV5YnKsztH3U3xnOBE4pHI6X7w1bFHX057bTcdb8UxVw8L+A/7SAfeeg4feeWcB+eMTRiQs47CjgBMURinRTN1CKXlWyqwb/ZAG3KOp4uXPeAo6OF/D5SDCJ7sn/qd64hVaDk8hqURL5L6SK4Ov+nbauu/1/BtzxTw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. 선언 위치에 따른 변수 종류&gt;
{: style="text-align: center;"}

## 2. 클래스 메서드와 인스턴스 메서드
- 클래스 메서드
    - `static` 사용
    - 인스턴스 생성 없이 사용 가능
        - 클래스가 메모리에 올라갈 때 생성
    - 인스턴스 변수나 인스턴스 메서드 사용 불가
        - 인스턴스 변수, 메서드는 인스턴스가 생성된 후에 메모리에 적재되기 때문
- 인스턴스 메서드
    - 일반 메서드
    - 인스턴스 생성 후 사용 가능
    - 클래스 변수, 메서드 사용 가능

```java
public class MemberCall {
    int iv = 10;
    static int cv = 20;

    int iv2 = cv;                   // 인스턴스 변수 → 클래스 변수 OK.
//  static int cv2 = iv;            // 클래스 변수 → 인스턴스 변수 Error.

    static void staticMethod1() {
        System.out.println(cv);
//      System.out.println(iv);     // 클래스 메서드 → 인스턴스 변수 Error.
        MemberCall c = new MemberCall();
        System.out.println(c.iv);   // 객체 생성 후 인스턴스 변수 참조 가능
    }

    void instanceMethod1() {
        System.out.println(cv);     // 인스턴스 메서드 → 클래스 변수 OK.
        System.out.println(iv);     // 인스턴스 메서드 → 인스턴스 변수 OK.
    }

    static void staticMethod2() {
        staticMethod1();
//      instanceMethod1();          // 클래스 메서드 → 인스턴스 메서드 Error.
        MemberCall c = new MemberCall();
        c.instanceMethod1();        // 객체 생성 후 호출 가능
    }
    
    void instanceMethod2() {
        staticMethod1();            // 인스턴스 메서드 → 클래스 메서드 OK.
        instanceMethod1();          // 인스턴스 메서드 → 인스턴스 메서드 OK.
    }
}
```

## 3. 변수 이름 중복과 우선순위
- 동일 영역에서 변수 이름을 중복하여 선언할 수는 없음
    - 클래스 영역의 클래스 변수, 인스턴스 변수의 이름 중복 불가
    - 이외 영역의 지역 변수의 이름 중복 불가
- 클래스 변수나 인스턴스 변수의 이름과 중복하여 지역 변수 선언 가능
    - 이후 해당 이름의 변수는 항상 지역 변수를 가리킴
    - `this`를 사용해서 클래스 변수나 인스턴스 변수 접근 가능

## A. 참조
S. Namgung, "3. 변수와 메서드," in *Java의 정석*, Jung-gu, Korea: 도우출판, 2022, ch. 6, sec. 3, pp. 246-281.
