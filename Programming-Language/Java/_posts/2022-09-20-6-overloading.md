---
title: '[JAVA] 6. 오버로딩(Overloading)'
author_profile: true
uml: true
toc_label: '[JAVA] 6. 오버로딩(Overloading)'
post-order: 6
---

## 1. 오버로딩이란?
메서드도 변수와 마찬가지로 같은 클래스 내에서 서로 구별될 수 있어야 하기 때문에 각기 다른 이름을 가져야 합니다.

그러나 자바에서는 한 클래스 내에 이미 같은 이름을 가진 메서드가 있더라도 매개변수의 개수 또는 타입이 다르면 같은 이름을 사용해서 메서드를 정의할 수 있습니다.

이처럼 한 클래스 내에 같은 이름의 메서드를 여러 개 정의하는 것을 메서드 오버로딩(Method Overloading), 또는 간단히 오버로딩이라 합니다.

## 2. 오버로딩의 조건
오버로딩이 성립하기 위해서는 다음과 같은 조건을 만족해야 합니다.

> 1. 메서드 이름이 같아야 한다.
2. 매개변수의 개수 또는 타입이 달라야 한다.

오버로딩된 메서드들은 매개변수에 의해서만 구별되고, **반환 타입은 오버로딩 구현에 아무런 영향을 주지 못합니다.**

## 3. 오버로딩 예시
가장 대표적인 예시는 자바 라이브러리의 println 메서드입니다. println 메서드를 호출할 때 매개변수로 지정하는 값의 타입에 따라 호출되는 println 메서드가 다릅니다.

```java
void println()
void println(boolean x)
void println(char x)
void println(char[] x)
void println(double x)
void println(String x)
void println(Object x)
...
```

```java
int add(int a, int b)
long add(long a, long b)
long add(int[] a) {
    long result = 0;
    for (int i=0; i<a.length; i++) {
        result += a[i];
    }
    return result;
}
```

## 4. 오버로딩의 장점
메서드도 변수처럼 단지 이름만으로 구별된다면 한 클래스 내의 모든 메서드들은 이름이 달라야합니다.

그렇다면 예로 들었던 엄청나게 많은 println 메서드들은 다음과 같이 각기 다른 이름을 가져야 합니다.

```java
void println()
void printlnChar(char x)
void printlnString(String x)
```

같은 기능을 하는 메서드지만 서로 다른 이름을 가져야 하기 때문에 메서드를 작성하는데 어려움이 생기고, 사용하는 쪽에서도 메서드 이름을 일일이 구분해서 기억해야 하기 때문에 어려움이 생깁니다.

그러나 오버로딩을 통해 여러 메서드들이 println이라는 하나의 이름으로 정의될 수 있다면 작성하는데도, 사용하는데도 편리하므로 오류 가능성을 많이 줄일 수 있습니다.

또한 메서드의 이름을 보고 같은 이름은 같은 기능을 할 것임을 쉽게 예측할 수 있습니다.

```java
public class MyMath {
    int add(int a, int b) {
        System.out.print("int add(int a, int b): ");
        return a+b;
    }

    long add(long a, long b) {
        System.out.print("long add(long a, long b): ");
        return a+b;
    }

    long add(long a, int b) {
        System.out.print("long add(long a, int b): ");
        return a+b;
    }

    long add(int a, long b) {
        System.out.print("long add(int a, long b): ");
        return a+b;
    }

    int add(int[] a) {
        System.out.print("int add(int[] a): ");
        int result = 0;
        for (int i=0; i<a.length; i++) {
            result += a[i];
        }
        return result;
    }
}

public class OverloadingTest {
    public static void main(String[] args) {
        MyMath mm = new MyMath();
        System.out.println("mm.add(3, 3) 결과 - "+mm.add(3, 3));
        System.out.println("mm.add(3L, 3) 결과 - "+mm.add(3, 3));
        System.out.println("mm.add(3, 3L) 결과 - "+mm.add(3, 3));
        System.out.println("mm.add(3L, 3L) 결과 - "+mm.add(3, 3));
        System.out.println("mm.add(new int[]{100, 200, 300}) 결과 - "+mm.add(new int[]{100, 200, 300}));
    }
}
```

<p class=short>실행 결과</p>

```txt
int add(int a, int b): mm.add(3, 3) 결과 - 6
int add(int a, int b): mm.add(3L, 3) 결과 - 6
int add(int a, int b): mm.add(3, 3L) 결과 - 6
int add(int a, int b): mm.add(3L, 3L) 결과 - 6
int add(int[] a): mm.add(new int[]{100, 200, 300}) 결과 - 600
```

실행 결과에서 `int add(...)`가 먼저 출력되는 점에 주의합시다. add 메서드가 먼저 실행되어야 println 메서드가 결과를 출력할 수 있기 때문입니다.

## 5. 가변인자(varargs)와 오버로딩
기존에는 메서드의 매개변수 개수가 고정적이었으나 JDK 1.5부터 동적으로 지정해줄 수 있게 되었는데, 이 기능을 가변인자(Variable arguments)라 합니다.

가변인자는 `<타입>... <변수명>` 형식으로 선언하며, PrintStream 클래스의 printf()가 대표적입니다.

```java
public PrintStrema printf(String format, Object... args)
```

위와 같이, 가변인자 외에 매개변수가 있다면 가변인자를 매개변수 중 가장 마지막에 선언해야 합니다.

그렇지 않으면 컴파일 에러가 발생합니다. 가변인자인지 아닌지 구별할 방법이 없기 때문에 허용하지 않습니다.

```java
public PrintStream printf(Object... args, String format) // 컴파일 에러 발생
```

예를 들어 여러 문자열을 하나로 결합하여 반환하는 concatenate 메서드를 작성한다면, 가변인자를 사용하지 않으면 다음과 같이 여러 개의 메서드를 작성해야할 것입니다.

```java
String concatenate(String s1, String s2)
String concatenate(String s1, String s2, String s3)
String concatenate(String s1, String s2, String s3, String s4)
...
```

이럴 때 가변인자를 사용하면 메서드 하나로 간단히 대체할 수 있습니다.

```java
String concatenate(String... strs)
```

<p class=short>사용 예시</p>

```java
System.out.println(concatenate()); // 인자 없음
System.out.println(concatenate("a")); // 인자 하나
System.out.println(concatenate("a", "b")); // 인자 둘
System.out.println(concatenate(new String[]{"A", "B"})); // 배열 가능
```

가변인자는 내부적으로 배열을 이용하기 때문에 배열을 인자로 넘겨도 동작합니다.

가변인자가 선언된 메서드를 호출할 때마다 배열이 새로 생성되기 때문에 상황에 따라 필요한 경우에만 가변인자를 사용하는 것이 좋습니다. 배열을 생성하는 비용이 들기 때문입니다.

한 편 다음과 같이 가변인자를 가진 메서드를 오버로딩할 때 컴파일러가 메서드를 구분하지 못하는 불편한 상황이 생길 수 있습니다.

```java
String concatenate(String delim, String... strs)
String concatenate(String... strs)
```

이런 경우 때문에 가능하면 가변인자를 사용한 메서드는 오버로딩하지 않는 것이 좋다는 의견이 있습니다.

## A. 참조
S. Namgung, "4. 오버로딩(overloading)" in *Java의 정석*, Jung-gu, Korea: 도우출판, 2022, ch. 6, sec. 4., pp. 282-290.
