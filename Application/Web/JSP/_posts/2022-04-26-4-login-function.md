---
title: '[JSP] 4. 로그인 기능 구현'
uml: true
author_profile: true
toc_label: '[JSP] 4. 로그인 기능 구현'
post-order: 4
---

## DAO 클래스() 작성
여기서 말하는 DAO는 Database Access Object의 약자로서 JSP로 구동되는 웹 서버가 DB 서버와 인터페이싱하기 위한 객체를 말한다. DB의 정보를 불러오거나 삽입하는 역할을 수행한다.

지난 포스트 [3. 회원 DB 구축 - 자바 빈즈(Java Beans) 구현]({{site.url}}/application/web/jsp/3-setup-db/#자바-빈즈java-beans-구현)에서 생성했던 `user` 패키지 하위에 `UserDAO` 클래스를 생성하여 DB 연동에 필요한 멤버 변수들과 클래스 생성자, 연동 코드를 다음과 같이 작성한다.

```java:src/main/java/user/UserDAO.java:lineons
package user;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {
  private Connection conn;
  private PreparedStatement pstmt;
  private ResultSet rs;

  public UserDAO() {
    try {
      String dbURL = "jdbc:mysql://localhost:3306/BBS";
      String dbID = "root";
      String dbPassword = "your password";
      Class.forName("com.mysql.cj.jdbc.Driver");

      conn = DriverManager.getConnection(dbURL, dbID, dbPassword);

    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public int login(String userID, String userPassword) {
    String SQL = "SELECT userPassword FROM USER WHERE userID = ?";
      
    try {
      pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, userID);
      rs = pstmt.executeQuery();

      if (rs.next()) {
        if (rs.getString(1).equals(userPassword)) {
          return 1;
        }
        else {
          return 0;
        }
      }

      return -1;

    } catch (Exception e) {
      e.printStackTrace();
    }
      
    return -2;
  }
}
```

`UserDAO.java`는 JDBC 연동을 위해 JDBC 드라이버를 사용한다. 생성자와 로그인 기능 메서드에서 JDBC를 사용하기 위한 코드들이 다음 순서로 작성된다.
1. `Class.forName()`를 이용해 드라이버 로드
2. `DriverManager.getConnection()`으로 연결 객체 생성
3. 연결 객체를 이용해 `Statement` 객체 생성
4. `Statement` 객체를 이용한 쿼리 결과를 `ResultSet`으로 반환받음

자바에서 `Class.forName()` 의 개념과, 코드를 살펴보면 `DriverManager` 객체의 생성 없이 사용하는 모습이 생소해서 관련 자료를 찾다가 필자와 같은 의문을 가지고 조사한 내용을 잘 정리한 [포스트](https://kyun2.tistory.com/23)를 찾게 되었다. 결론만 정리하자면 다음과 같다.
- 자바에서 클래스 `Class`는 JVM에서 동작하는 클래스들의 정보를 가지고 있는 메타 클래스(Meta-Class)이다.
- `Class.forName("some.package.SomeClass")`을 호출하면 인자로 전달된 클래스의 정보를 바탕으로 인스턴스가 생성, 초기화된다.
- 위처럼 변수에 할당되지 않은 인스턴스는 JVM이 관리하는 메모리 영역 중 정적(static) 영역에 생성되고, JVM 가비지 컬렉터(Garbage Collector)의 대상이 되지 않는다.

## MySQL JDBC Driver 설치 및 프로젝트 클래스 경로 추가
필자는 유튜브 강좌에서 제시한 대로 MySQL 공식 홈페이지에서 다운받지 않고, 윈도우 패키지 관리자 Chocolatey를 이용해 설치했다.

```txt:CMD(관리자 권한 실행)
...>choco install mysql-connector-java
```

설치가 완료되면 `C:\ProgramData\chocolatey\lib\mysql-connector-java\tools` 하위에 있는 `mysql-connector-java-8.0.15.tar` 파일을 압축 해제한다.

```txt:CMD
C:\ProgramData\chocolatey\lib\mysql-connector-java\tools>tar -xvf mysql-connector-java-8.0.15.tar
```

이후 압축 해제한 폴더 내부에 있는 `mysql-connector-java-8.0.15.jar` 파일을 JSP 프로젝트 폴더의 `src/main/webapp/WEB-INF/lib` 경로 하위에 복사하고 <그림 1>과 같이 자바 프로젝트 클래스 경로에 JDBC 드라이버를 다룰 jar 파일을 추가한다.

![](https://drive.google.com/uc?export=view&id=1sYmal8XzR_ZuwXjlNCkWxqiuir4qXJ0g){: .align-center}
<그림 1. 자바 프로젝트 클래스 경로에 JDBC 드라이버 jar 파일 추가>
{: style="text-align: center;"}

## `loginAction.jsp`
이제 방문자가 웹페이지에 작성한 아이디와 비밀번호를 DB 정보와 비교하는 등 로그인 기능을 웹페이지로 구현할 `loginAction.jsp` 파일을 작성한다.

```jsp:src/main/webapp/loginAction.jsp:lineons
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="EUC-KR"%>
<%@ page import="user.UserDAO" %>
<%@ page import="java.io.PrintWriter" %>
<% request.setCharacterEncoding("UTF-8"); %>
<jsp:useBean id="user" class="user.User" scope="page"/>
<jsp:setProperty name="user" property="userID"/>
<jsp:setProperty name="user" property="userPassword"/>
<!DOCTYPE html>
<html>
<head>
  <title>Insert title here</title>
</head>
<body>
  <%
    UserDAO userDAO = new UserDAO();

    int result = userDAO.login(user.getUserID(), user.getUserPassword());
      
    if (result == 1) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("location.href='main.jsp'");
        script.println("</script>");
    }

    else if (result == 0) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('비밀번호가 틀립니다.')");
        script.println("history.back()");
        script.println("</script>");
    }

    else if (result == -1) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('존재하지 않는 아이디입니다.')");
        script.println("history.back()");
        script.println("</script>");
    }

    else if (result == -2) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('데이터베이스 오류가 발생했습니다.')");
        script.println("history.back()");
        script.println("</script>");
    }
  %>
</body>
</html>
```

코드를 풀이하자면 다음과 같다.<br>

줄 번호 | 설명
-: | -
2~3 | - some.package.SomeClass를 import한다.
4 | - 요청으로 건너오는 모든 데이터를 UTF-8 형식으로 인코딩한다.
5~7 | - 자바 빈(Java Bean)으로서 `user` 인스턴스(변수)를 `user` 패키지의 `User` 클래스로 생성하고, `login.jsp` 페이지에서 방문자가 작성한 로그인 정보 아이디와 비밀번호를 `user` 인스턴스의 `userID`, `userPassword`에 저장한다.<br>- 해당 페이지 `loginAction.jsp`를 `user` 인스턴스의 스코프로 설정한다.<br>- <그림 2> 참조
15~47 | - `userDAO` 객체를 생성해서 `login()` 메서드를 수행하여 DB와 인터페이싱하고 각 케이스에 따라 동적으로 HTML을 생성하여 적절히 처리한다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-04-27T09:20:01.020Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36\&quot; etag=\&quot;G5bEGWSs2va-wcoqGGz0\&quot; version=\&quot;17.4.6\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;4pouObebCws_mwqrhEq5\&quot; name=\&quot;Java Bean\&quot;&gt;7Vlbj5s4FP41kXYfgjDO9TGXbrfSVMo2W3X76AEH3BocGWeSzK/fYzAkBnJpJygz0kRRxDm2j/H3fT4cnA6exbuPkqyjzyKgvOO5wa6D5x3PGyEMv9qxzx09jHJHKFmQu44cS/ZMjdM13g0LaGp1VEJwxda20xdJQn1l+YiUYmt3Wwluz7omIa05lj7hde83FqjILMsbHvx/UxZGxcxoMM5bYlJ0NitJIxKI7ZELf+jgmRRC5Vfxbka5xq7AJR/314nW8sYkTdQ1A+LJPpn53X/WD9/9bTcO1Wzx3DVRngjfmAV3vAGHeFMGF6G+4CJkifMjXRctMEXZaJam9gVeUmySgOopXWjeRkzR5Zr4unULAgFfpGIOFoLLJyoVA6wnnIUJ+JRYlzF1G92dXCsqEQTlURFTJffQpZCdwXxvm9sDg2hgfNExe0PjJEY1YRn5ACxcGGx/AWfvMs4rIeNuCPi9JaCRayONUAPUXhPUXltQ92pQb1IqP81vi2DMgkAHugmIqAJif1wH0W0Csd8Shv1GDBckTbdCBm8IyVH/zkgOrkywE18x8dbSLHYv5lmvCW0Y2BLcBf8W3hXsaBJMdGUAllhTAGQKHlN5IFjtNCBplGGLbBxt0PO4NKjVDxX0YG6xkT4993Qwd62IDKm6lNtO0uE6yOtbhHhnHnyScqLYk333TYSY+RaCwboO3OOeg+3Z0AA7GI8Pn6EdNMfBxDmuVKqh+7asvHFFLjlOZwIVHcVqlVKrT6aqEroXCK1hY8+8zmT6KUkVSYBusKYgEuiHkdaLzqAdPIEx+sr5qs2qNNMtizlJaFYOJGppWvRwYjavD+rSgU7saj9iPHgge7HROoJb8X8W1jQSkj1DWFIIGpqlMsrvuVaPpR5pppY0hT6LQtio4vpMdlbHB5Iq4/AF52SdssdsGXpgDNSxZCqUErG1kV6WiLxqGYKdhszfXPONLkr/C7xZkCSERfzqjLhhxl5FzYQDoQlRdKrzS9qGWr16WuwaIUJhlIlyqSRLwpoigROVKUWKn3QmuADpzRORS5RxXnEVKuV0pU5qNIUnFcz1kPWZ9w6eLwYk7RIwdsWzLB1BhZDlaSkUUeSx3BNrvd0zFPtT+MIiZy6w0Icbn4GNDjZ8dXepZgL2pyQs0xUFpW5pqq4V4ZlMUJfm3mb7kg69QVuPxOFJ7suC7l0BLSpgMLi3AkaXiyLOMvZylouTDvRbFJcFveH0X035vItqvOM677iBY04eKV+IlOkKGXwy71vh/m70jr3r6D3zmHnZ0ULTGQ4s14US6WuW4P/4831T35r18i3yfrt6fJ73Irm/s98C+969c3qRwo/YdxznnembM92/Mr23xzS+/PR+fUcaRdV58Uij3wz/fY40Ku90w4EzwkefSsRrzzO86rvicOh4YzQoP2M77is43ug1FRXtiA6kJff/HRvfteEA78ae745b5/vC2jGlxyHHdZGx86EYj419GKqN45ELKhmgpI9Sbq79K6V/IvO8FulXjsR/X+21UK0KHMzDn6p598M/0/jD/w==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<그림 2. login.jsp, loginAction.jsp, 자바 빈 참조 관계>
{: style="text-align: center;"}

자바 빈 액션 태그인 `useBean`, `setProperty`, `getProperty`를 활용한 자바 빈 `user`의 동작 흐름은 다음과 같다.<br>
1. `loginAction.jsp`에서 자바 빈으로 명시된 `user` 객체 생성
  - `useBean` 태그 사용, <변수> = new <클래스>와 동일한 의미
2. 방문자가 `login.jsp` 페이지에서 작성한 로그인 정보인 아이디와 비밀번호를 `user` 객체의 각 프로퍼티에 설정
  - `setProperty` 태그 사용, 관련 변수의 설정자(`setter()`) 메서드를 사용하는 것과 동일
  - `setProperty`, `getProperty`를 사용하기 위해서는 해당 자바 빈 클래스의 접근자(`getter()`), 설정자 메서드의 이름을 카멜 표기법(Camel case)으로 정확히 짓는 것이 중요(자바 빈 사용 규약)

### 발생한 오류
#### java.sql.SQLExeception: The server time zone value is unrecognized...
강좌를 보며 코드를 작성하여 서버를 구동시킨 후 로그인 테스트를 했는데 데이터베이스 오류에 대한 alert가 발생하면서 출력된 오류를 확인했더니 다음과 같은 오류였다.

<p class=short>오류 문구</p>

```txt
java.sql.SQLException: The server time zone value is unrecognized or represents more than one time zone. You must configure either the server or JDBC driver (via the serverTimezone configuration property) to use a more specifc time zone value if you want to utilize time zone support.
```

확인해보니, mysql-connector-java 5.1.X 이후 버전부터 타임존을 명시하지 않으면 시스템 시간대를 사용함으로써 JDBC 연동 시 에러를 발생시킨다. 이를 해결하기 위해 DB 시스템 변수를 다음과 같이 수정해줘야 한다.

```sql
SET GLOBAL time_zone = '+0:00' -- 권한 필요, UTC로 설정하는 경우 '+0:00', KST는 '+9:00'
SET time_zone = '+0:00'
```

<p class=short>실행 결과</p>

```txt:CMD
mysql> SELECT @@GLOBAL.time_zone, @@SESSION.time_zone;
+--------------------+---------------------+
| @@GLOBAL.time_zone | @@SESSION.time_zone |
+--------------------+---------------------+
| SYSTEM             | SYSTEM              |
+--------------------+---------------------+
1 row in set (0.00 sec)

mysql> SET GLOBAL time_zone = '+0:00';
Query OK, 0 rows affected (0.01 sec)

mysql> SET time_zone = '+0:00';
Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @@GLOBAL.time_zone, @@SESSION.time_zone;
+--------------------+---------------------+
| @@GLOBAL.time_zone | @@SESSION.time_zone |
+--------------------+---------------------+
| +00:00             | +00:00              |
+--------------------+---------------------+
1 row in set (0.00 sec)
```

## 로그인 시도
로그인 기능을 블랙박스 테스트한다. <그림 3>은 존재하지 않는 임의의 아이디와 패스워드를 입력해 로그인을 시도한 경우이고, <그림 4>는 지난 포스트 [3. 회원 DB 구축](https://drmaemi.github.io/application/web/jsp/3-setup-db/)에서 테이블에 삽입한 사용자 홍길동으로 로그인을 시도한 경우이다. URL을 확인해보면 로그인에 성공하여 `main.jsp`로 이동한 모습을 볼 수 있다.

![](https://drive.google.com/uc?export=view&id=1_kt5StCh2tWTcFIlqhg2q65De6VeNHu2){: .align-center}
<그림 3. 임의의 ID, PW를 이용해 로그인 시도>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1w2zq8r8kL4AxUL1wVvOaAoEpibZUYfdf){: .align-center}
<그림 4. 로그인 성공 후 main.jsp 페이지로 이동>
{: style="text-align: center;"}

## A. 참조
동빈나, "JSP 게시판 만들기 강좌 4강 - 로그인 기능 구현하기 (JSP Advanced Development Tutorial #4))", *Youtube*, May 4, 2017. [Online]. Available: [https://youtu.be/RYo3OGlRoJw](https://youtu.be/RYo3OGlRoJw) [Accessed Apr. 26, 2022].

kyun2world, "[Java 궁금증] Class.forName()은 어떻게 동작할까?", *Tistory*, Jan. 21, 2018. [Online]. Available: [https://kyun2.tistory.com/23](https://kyun2.tistory.com/23) [Accessed Apr. 27, 2022].

버터필드, "[MySQL] The server time zone value is unrecognized or represents more than one time zone 에러 해결 방법", *Tistory*, Feb. 9, 2020. [Online]. Available: [https://atoz-develop.tistory.com/entry/MySQL-The-server-time-zone-value-is-unrecognized-or-represents-more-than-one-time-zone](https://atoz-develop.tistory.com/entry/MySQL-The-server-time-zone-value-is-unrecognized-or-represents-more-than-one-time-zone) [Accsesed Apr. 27, 2022].

JOKER, "[JSP] 자바빈 / useBean, setProperty, getProperty", *Naver blog*, May 16, 2017. [Online]. Available: [https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=heartflow89&logNo=221006593791](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=heartflow89&logNo=221006593791) [Accessed Apr. 27, 2022].
