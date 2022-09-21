---
title: '[JAVA] 7. 생성자(Constructor)'
author_profile: true
uml: true
toc_label: '[JAVA] 7. 생성자(Constructor)'
post-order: 7
---

## 1. 생성자란?
생성자는 인스턴스가 생성될 때 호출되는 **인스턴스 초기화 메서드**입니다.

생성자의 조건은 다음과 같습니다.

> 1. 생성자의 이름은 클래스의 이름과 같아야 한다.
2. 생성자는 반환 값이 없다.

생성자도 메서드이기 때문에 반환 값이 없다는 의미의 void를 붙여야 하지만, 모든 생성자가 반환 값이 없으므로 void를 생략할 수 있도록 한 것입니다.
{: .notice--info}

생성자는 다음과 같이 정의합니다.

```java
class Card {
    Care() { // 매개변수가 없는 생성자
        ...
    }

    Card(String k, int num) { // 매개변수가 있는 생성자
        ...
    }
}
```

연산자 new가 인스턴스를 생성하는 것이지 생성자가 인스턴스를 생성하는 것이 아닙니다.
{: .notice--warning}

<p class=short>Card 클래스의 인스턴스를 생성하는 코드를 설명하면 다음과 같습니다.</p>

```java
Card c = new Card();
```

1. 연산자 new에 의해 JVM 메모리 영역 중 힙(Heap)에 Card 클래스의 인스턴스가 생성됨
2. 생성자 Card()가 호출되어 수행됨
3. 연산자 new의 결과로 생성된 Card 인스턴스의 주소가 반환되어 참조변수 c에 저장됨

## 2. 기본 생성자(Default Constructor)
자바의 모든 클래스에는 반드시 하나 이상의 생성자가 정의되어 있어야 합니다. 그러나 클래스에 생성자를 정의하지 않고도 인스턴스 생성이 가능했던 이유는 컴파일러가 제공하는 기본 생성자 덕분입니다.

<p class=short>컴파일할 때 소스파일(*.java)의 클래스에 생성자가 하나도 정의지 않은 경우 컴파일러는 자동적으로 아래와 같은 내용의 기본 생성자를 추가하여 컴파일합니다.</p>

```java
클래스이름() {}
```

컴파일러가 추가하는 기본 생성자는 매개변수가 없으며 아무런 내용이 없는 간단한 것입니다.

<p class=short>기본생성자 예제</p>

```java
class Data1 {
    int value;
}

class Data2 {
    int value;

    Data2(int x) {
        value = x;
    }
}

class ConstructorTest {
    public static void main(String[] args) {
        Data d1 = new Data1();
        Data d2 = new Data2(); // 컴파일 에러 발생
    }
}
```

위 예제를 컴파일하면 Data2 클래스의 생성자가 정의되어 있지 않다는 에러를 볼 수 있습니다. **컴파일러는 정의된 생성자가 하나도 없는 클래스에만 기본 생성자를 추가합니다.**

## 3. 매개변수가 있는 생성자
생성자도 메서드처럼 매개변수를 선언하여 호출 시 값을 넘겨받아 인스턴스의 초기화 작업에 사용할 수 있습니다.

인스턴스마다 각기 다른 값으로 초기화되어야 하는 경우가 많기 때문에 매개변수를 사용한 초기화는 매우 유용합니다.

```java
class Car {
    String color;       // 색상
    String gearType;    // 변속기 종류
    int door;           // 문의 개수

    Car() { }

    Car(String c, String g, int d) {
        color = c;
        gearType = g;
        door = d;
    }
}
```

매개변수를 갖는 생성자를 이용하면 코드를 보다 간결하고 직관적으로 작성할 수 있습니다.

<p class=short>전</p>

```java
Car c = new Car();
c.color = "white";
c.gearType = "auto";
c.door = 4;
```

<p class=short>후</p>

```java
Car c = new Car("white", "auto", 4);
```

## 4. 생성자에서 다른 생성자 호출하기 - this(), this
같은 클래스의 멤버들 간 호출이 가능한 것처럼 생성자 간 호출도 가능합니다. 단, 다음과 같은 조건이 있습니다.

> - 생성자의 이름으로 클래스이름 대신 `this`를 사용한다.
- 한 생성자에서 다른 생성자를 호출할 때는 반드시 첫 줄에서만 호출이 가능하다.

생성자 내부에서 다른 생성자를 첫 줄에서만 호출이 가능하도록 한 이유는, 생성자 내에서 초기화 작업 중 다른 생성자를 호출했을 때 호출된 다른 생성자 내에서도 초기화 작업을 진행하면 다른 생성자를 호출하기 이전의 초기화 작업이 무의미해질 수 있기 때문입니다.
{: .notice--info}

`this`는 참조변수로 인스턴스 자신을 가리키며, 참조변수를 통해 인스턴스 멤버에 접근할 수 있는 것처럼 `this`로 인스턴스변수에 접근할 수 있습니다.

그러나 `this`를 사용할 수 있는 것은 인스턴스 멤버 뿐입니다. static 메서드(클래스 메서드)에서는 인스턴스 멤버에 접근할 수 없는 것처럼 `this` 역시 사용할 수 없습니다.

```java
public class Car {
    String color;
    String gearType;
    int door;

    /**
     * color = "white";
     * gearType = "auto";
     * door = 4;
     * 위 코드로 작성하지 않고 다른 생성자를 이용해 이와 같이 더 간략히 할 수 있습니다.
     */
    Car() {
        this("white", "auto", 4);
    }

    Car(String color) {
        this(color, "auto", 4);
    }

    /**
     * 매개변수로 선언된 지역변수 color와 인스턴스변수 color를 구분하기 위해
     * 인스턴스변수에는 this를 사용해 this.color로 구분합니다.
     * 만약 color = color와 같이 작성하면 둘 다 지역변수로 인식합니다.
     */
    Car(String color, String gearType, int door) {
        this.color = color;
        this.gearType = gearType;
        this.door = door;
    }

    @Override
    public String toString() {
        return String.format("%s : (%s, %s, %d)", this.getClass().getName(), color, gearType, door);
    }
}

public class CarTest {
    public static void main(String[] args) {
        Car c1 = new Car();
        Car c2 = new Car("blue");

        System.out.println(c1);
        System.out.println(c2);
    }
}
```

<p class=short>실행 결과</p>

```txt
Car : (white, auto, 4)
Car : (blue, auto, 4)
```

이것은 마치 실생활에서 자동차를 생산할 때 아무 옵션을 주지 않으면 기본적으로 흰색(white)에 자동변속기어(auto) 그리고 문의 개수가 4개인 자동차가 생산되도록 하는 것에 비유할 수 있습니다.

## 5. 생성자를 이용한 인스턴스 복사
생성자를 이용하여 기존 객체의 깊은 복사 결과를 얻을 수 있습니다.

```java
class Car {
    Car(String color, String gearType, int door) {
        ...
    }

    /* 생성자를 이용한 인스턴스 복사 */
    Car(Car c) {
        this(c.color, c.gearType, c.door);
    }
}
```


## A. 참조
S. Namgung, "5. 생성자(Contsructor)" in *Java의 정석*, Jung-gu, Korea: 도우출판, 2022, ch. 6, sec. 5., pp. 291-299.
