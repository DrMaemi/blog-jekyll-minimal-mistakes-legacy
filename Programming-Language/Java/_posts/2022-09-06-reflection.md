---
title: '[JAVA] 리플렉션(Reflection)'
author_profile: true
uml: true
toc_label: '[JAVA] 리플렉션(Reflection)'
post-order: 100
---

## 리플렉션(Reflection)이란?
> 런타임 시점에 메모리에 올라간 클래스, 메서드의 정의를 동적으로 찾아 조작할 수 있는 기술

> 구체적인 클래스 타입을 알지 못해도 멤버 변수, 하위 메서드에 접근할 수 있도록 해주는 API

## 예제

```java
public class Music {
    private String singer;
    private String title;

    public Music() { }

    public Music(String singer, String title) {
        this.singer = singer;
        this.title = title;
    }

    public String getSinger() {
        return singer;
    }

    public String getTitle() {
        return title;
    }
}
```
```java
public class Reflection {
    public static void main(String[] args) {
        Object music = new Music("IU", "YOU AND ME");
        music.getTitle(); // 컴파일 에러 발생
    }
}
```

위 코드를 보면 Music 객체를 Object 타입으로 생성했는데, 이 경우 Music 클래스의 Getter 메서드들을 사용할 수 없습니다.

이렇게 구체적 클래스 타입을 알지 못할 때 Music 클래스의 멤버를 사용할 수 있도록 하는 기능이 바로 Reflection입니다.

## Reflection 사용
```java
public class Reflection {
    public static void main(String[] args) {
        Object music = new Music("IU", "YOU AND ME");

        /* Reflection */
        try {
            Class c = Music.class;
            Method getTitle = c.getMethod("getTitle");
            String title = (String)getTitle.invoke(music, null);

            System.out.println("title = "+title);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## 알아둘만한 Reflection API
- getDeclaredConstructor() - 기본 생성자를 가져옴
- getDeclaredConstructor(&lt;Type.class, ...&gt;) - 인자로 넘긴 타입들을 인자로 갖는 생성자를 가져옴

```java
public class Reflection {
    public static void main(String[] args) {
        Object music = new Music("IU", "YOU AND ME");

        /* Reflection */
        try {
            Class c = Music.class;
            Constructor constructor = c.getDeclaredConstructor(String.class, String.class);
            System.out.println("constructor = "+constructor);
            // public Music(java.lang.String,java.lang.String)

            Field[] fields = c.getDeclaredFields();

            for (Field field: fields) {
                System.out.println("field = " + field.getName());
            }
            // field = singer
            // field = title

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## A. 참조
yebali, "Spring, JPA에 기본 생성자가 필요한 이유," *Velog.io*, Sep. 8, 2021. [Online]. Available: [https://velog.io/@yebali/Spring-JPA에-기본-생성자가-필요한-이유](https://velog.io/@yebali/Spring-JPA에-기본-생성자가-필요한-이유) [Accessed Sep. 6, 2022].
