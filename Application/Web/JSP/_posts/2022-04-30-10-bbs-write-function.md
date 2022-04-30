---
title: '[JSP] 10. 게시판 글쓰기 기능 구현'
uml: true
author_profile: true
toc_label: '[JSP] 10. 게시판 글쓰기 기능 구현'
post-order: 10
---

게시판 메인 페이지에서 글쓰기 버튼을 클릭했을 때 게시글 작성 화면 `write.jsp`, DB 인터페이싱을 위한 DAO 클래스 `BbsDAO.java`, 사용자가 작성을 완료하면 DB와의 연동 기능을 처리하는 `writeAction.jsp`를 작성한다.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-04-30T15:27:26.346Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36\&quot; etag=\&quot;hXClqXcbqi80jgBqZg6Y\&quot; version=\&quot;17.5.0\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;EeDNSuBT1mr1XGk2IdJt\&quot; name=\&quot;10. bbs write function\&quot;&gt;7Vttc6M2EP41nrl+OAYkg/HHYF/vbiZp0zgzffmmgGzUw8gVSmzfr+8KhDEgGzdn8tIxyUzQaiWhZx+tlkUZ4Mly81mQVXzDI5oMkB1tBng6QMhxfBf+KMm2kHiuFiwEi7RSJZix71QLbS19ZBHNaoqS80SyVV0Y8jSloazJiBB8XVeb86Q+6oosaEswC0nSlv7OIhkXUh+NKvkXyhZxObLjjYuaJSmV9UyymER8vSfCnwZ4IjiXxd1yM6GJAq/EpWj384Ha3YMJmsqTGqSf7vhNIKZ09fnL+P6vX/6Z3nzUvTyR5FFPeIC8BPoLGNws1M1aMEmtv7NVWQND7Cr11OS2xEvwxzSiakhbtY2h7WxFQlW7BoaALJbLBEoO3D5RIRlgfZWwRQoyyVe7PlUd3Rycq7NDEKhH+ZJKsQWVsoE2wrYkk7bBujKh42lZvG++kRYSTZvFrusKWbjR4P4HoFE30HMuli+F8ZwlyYQnXOQ94rmrfvJnSOWevLhAnknBv9G9Gi+/zmMt3LAWNlgLmayF+rIWblnr4SG7ZxIscFZjLFkUqY7OgeKwgeJo3EbRNqHo9gTi0ATiBAimJvReYES2+8owuie66KtQMp6+M0eN7G5PPXQNcCPc19r3DHg3sKNpdKViCyjxFQVAApDo2MWB2QYRyeIcW6eOYx30ol8atSKQBnowNn8UIT3y0H6hJ4lYUHlEDx+1hm05yG3Q//DGKWhCJHuqP7zJHHq8W87Uwt+Zfogt7NrVhepM8KEaj6trVB+ggET3uR/2NIdx6wzDToM4BWZHOioV+Xye0ZpOzq8djM+n3KhNuQkaXAVf00ySFAwPpQDoAtRUj48DcKQDfAVN4MYKoNBkaLZmy4SkVG/pM12j2hK9hkMgGRUHF3cYsyS6Jlv+qPgEzxF+K0tBzAX7Dt2SktdQLaReAEO7pjFTLfXQgmagc1vy22mIbsimpnhNMqkFIU8SssrYQz4N1XAJZmNpwKXkS610vqAmIQ80CeDBF/mKLVVSnp5pl0GoGfNgy7DRmGNUv3Op3cGrEEkXKlzZBVnlUi5HdIwjYsOIw8aKIQkQJyWSBgqcrI8V4bdWxMeC7UUQlnN/JgVLFy3qg1HkHs0TOpcHSZ7Bjgd9XOc602EludOzVyIObedJ7u1jCDRyfy+4JJI87BbVSvmKHB43gF8AbGIDvC480ATKTlWGX6UugJGwugVhOWEoUH1NFd07uFfUchFR8SxWHnQ/bapu69bv4iXyetqQx4e4UMaSFza8HBs875XZUG7fx+KzhOUYFP69TNs4jR1CA9XBjN2rhabCvWLK9KPTogtu0wUbqJFb7JZnTAXrIBOFboMyXazoy7pjdJp1j+xAP2ZcUz4KZmtDhBZo5//hp8si73mRn5wv62+Vm/JlFRG0579QoX8qoFd3+O1knGVZF8P3bXj3xL2gP8O3E4gtq7+9TIyOVjszMUMz+q+SiWkm4Mee5eO9q9HjqakXp/mSOx5ZaOx4u2tc7/cNZGIcU7a1H84Bs8T2j/3Cn6pgIbcsTzf7tdNtWdowqdo5lm07ulw0xWDIolw1VYX9lrdUMEBJZX7OTf3y+2wX9d23Tf1GIv/5bG919QYIjgxOtTPXOL36tZZuVOVLxvF9ZRyHJ2Ucd+cu6t9Zj2zx/5eMI2p7/kuYeY4wEx2IdA6nF40k7C3MRIavL5eE0rnMa8gXGs3bV0YJtb8kFImE/Jv5h+pYB3RvP2ZUfJ0W91V++ZJk6N0JjIav7ARwO6t88f4vYHhTpvGFLd/ONN5sZ79dtwPclvPfe7XLYrJSesvNQp2DtZRNwxhCVCtStiSZQtF0yKYRQUaE+vPQGCmGPn2YnycW9EanxILGyOxoLPhjx8Xe5cGb8n2q++QNOmqSF33rbdof2414+9R33hH2LX//kE59BuOx5TeO7byBV+DhCQHf2XM8ljrAVMvz+J7TlehRpR7zNSdz139D1G1yzH82dTs66pWpUKxO/hfq1f9P4E//Ag==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<그림 1. 게시글 작성 동작 구조>
{: style="text-align: center;"}

## 게시글 작성 화면 `write.jsp`
![](https://drive.google.com/uc?export=view&id=1g_iwyJBe9yGIflalRWojiMfQlVv_m8jC){: .align-center}
<화면 1. 게시판 글쓰기 화면 write.jsp>
{: style="text-align: center;"}

```jsp:src/main/webapp/write.jsp:lineons
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter" %>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width" initial-scale="1">
<link rel="stylesheet" href="css/bootstrap.css">
<title>JSP 게시판 웹사이트</title>
</head>
<body>
  <%
    String userID = null;
    
    if (session.getAttribute("userID") != null) {
        userID = (String)session.getAttribute("userID"); 
    }
  %>
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed"
        data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
        aria-expanded="false">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="main.jsp">JSP 게시판 웹사이트</a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a href="main.jsp">메인</a></li>
        <li class="active"><a href="bbs.jsp">게시판</a></li>
      </ul>
      <%
        if (userID == null) {
      %>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle"
                data-toggle="dropdown" role="button" aria-haspopup="true"
                aria-expanded="false">접속하기<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="login.jsp">로그인</a></li>
                <li><a href="join.jsp">회원가입</a></li>
              </ul>
            </li>
          </ul>
      <%
        }
        else {
      %>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle"
                data-toggle="dropdown" role="button" aria-haspopup="true"
                aria-expanded="false">회원관리<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="logoutAction.jsp">로그아웃</a></li>
              </ul>
            </li>
          </ul>
       <%
        }
       %>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <form method="post" action="writeAction.jsp">
        <table class="table table-striped" style="text-align: center; border: 1px solid #dddddd">
          <thead>
            <tr>
              <th colspan="2" style="background-color; #eeeeee; text-align: center;">게시판 글쓰기 양식</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" class="form-control" placeholder="글 제목" name="bbsTitle" maxlength="50"></td>
            </tr>
            <tr>
              <td><textarea class="form-control" placeholder="글 내용" name="bbsContent" maxlength="2048" style="height: 350px;"></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" class="btn btn-primary pull-right" value="글쓰기">
      </form>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
  <script src="js/bootstrap.js"></script>
</body>
</html>
```

`bbs.jsp` 코드를 가져다 뼈대로 쓰되 사용자가 로그인되어 있지 않으면 로그인 페이지로 연결하고,  게시판 테이블 부분 코드를 수정해서 `form` 태그 안에 글 제목과 내용을 작성토록 하고, 이를 제출하여 통신할 페이지로 `writeAction.jsp`를 지정한다.

## BbsDAO 클래스
```java:src/main/java/bbs/BbsDAO.java:lineons
package bbs;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class BbsDAO {
    private Connection conn;
    private ResultSet rs;
     
    public BbsDAO() {
        try {
            String dbURL = "jdbc:mysql://localhost:3306/BBS";
            String dbID = "root";
            String dbPassword = "`rmaqlcflqpf468";

            Class.forName("com.mysql.cj.jdbc.Driver");

            conn = DriverManager.getConnection(dbURL, dbID, dbPassword);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
     
    public String getDate() {
        String SQL = "SELECT NOW()";

        try {
            PreparedStatement pstmt = conn.prepareStatement(SQL);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                return rs.getString(1);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ""; // 데이터베이스 오류
    }
     
    public int getNext() {
        String SQL = "SELECT bbsID FROM BBS ORDER BY bbsID DESC";

        try {
            PreparedStatement pstmt = conn.prepareStatement(SQL);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                return rs.getInt(1)+1;
            }

            return 1; // 첫 번째 게시글인 경우

        } catch (Exception e) {
            e.printStackTrace();
        }

        return -1; // 데이터베이스 오류
    }
     
    public int write(String bbsTitle, String userID, String bbsContent) {
        String SQL = "INSERT INTO BBS VALUES (?, ?, ?, ?, ?, ?)";

        try {
            PreparedStatement pstmt = conn.prepareStatement(SQL);

            pstmt.setInt(1, getNext());
            pstmt.setString(2, bbsTitle);
            pstmt.setString(3, userID);
            pstmt.setString(4, getDate());
            pstmt.setString(5, bbsContent);
            pstmt.setInt(6, 1);

            return pstmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return -1; // 데이터베이스 오류
    }
}

```

`.getDate()` 메서드는 DB의 게시글 스키마 중 `bbsDate` 속성 값을 위한 서버 시간 정보를 MySQL 서버로부터 받아온다. `.getNext()` 메서드는 `bbsID` 속성 값을 위해 가장 최근에 작성된 게시글 ID에 1을 더한 값을 반환한다.

## writeAction.jsp
```jsp:src/main/webapp/writeAction.jsp:lineons
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="EUC-KR"%>
<%@ page import="bbs.BbsDAO" %>
<%@ page import="java.io.PrintWriter" %>
<% request.setCharacterEncoding("UTF-8"); %>
<jsp:useBean id="bbs" class="bbs.Bbs" scope="page"/>
<jsp:setProperty name="bbs" property="bbsTitle"/>
<jsp:setProperty name="bbs" property="bbsContent"/>
<!DOCTYPE html>
<html>
<head>
  <title>JSP 게시판 웹사이트</title>
</head>
<body>
  <%
    String userID = null;
    
    if (session.getAttribute("userID") != null) {
        userID = (String)session.getAttribute("userID"); 
    }
    
    if (userID == null) {
          PrintWriter script = response.getWriter();
          script.println("<script>");
          script.println("alert('로그인을 하세요.')");
          script.println("location.href='login.jsp'");
          script.println("</script>");
    }
    
    if (bbs.getBbsTitle() == null || bbs.getBbsContent() == null) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('입력 안된 항목이 있습니다.')");
        script.println("history.back()");
        script.println("</script>");
    }
    else {
        BbsDAO bbsDAO = new BbsDAO();
        
        int result = bbsDAO.write(bbs.getBbsTitle(), userID, bbs.getBbsContent());
        
        if (result == -1) {
            PrintWriter script = response.getWriter();
            script.println("<script>");
            script.println("alert('글쓰기에 실패했습니다.')");
            script.println("history.back()");
            script.println("</script>");
        }
        else {
            PrintWriter script = response.getWriter();
            script.println("<script>");
            script.println("location.href='bbs.jsp'");
            script.println("</script>");
        }
    }
  %>
</body>
</html>
```

## 테스트
![](https://drive.google.com/uc?export=view&id=1hMSMN9RPUOMpey85xJhr9LpJh1V7SGBB){: .align-center}
<화면 2. user1 아이디 로그인 후 게시글 작성>
{: style="text-align:center;"}

<p class=short>BBS 테이블 결과 확인</p>

```txt:CMD
mysql> SELECT * FROM BBS;
+-------+------------------+--------+---------------------+------------------+--------------+
| bbsID | bbsTitle         | userID | bbsDate             | bbsContent       | bbsAvailable |
+-------+------------------+--------+---------------------+------------------+--------------+
|     1 | sadfasdfdasfadsf | user1  | 2022-04-30 14:32:34 | dasfdsafasdfdsaf |            1 |
+-------+------------------+--------+---------------------+------------------+--------------+
1 row in set (0.00 sec)
```

게시판 메인 페이지 `bbs.jsp`에는 작성된 게시글이 보이지 않는다. 다음 포스트에서는 게시판 메인 페이지에서 DB와 연동하여 작성된 게시글들을 볼 수 있도록 게시판 글 목록 기능에 대해 다룬다.

## A. 참조
동빈나, "JSP 게시판 만들기 강좌 10강 - 글쓰기 기능 구현하기 (JSP Advanced Development Tutorial #10)", *Youtube*, May 5, 2017. [Online]. Available: [https://youtu.be/EmbxlHakkfY](https://youtu.be/EmbxlHakkfY) [Accessed Apr. 30, 2022].
