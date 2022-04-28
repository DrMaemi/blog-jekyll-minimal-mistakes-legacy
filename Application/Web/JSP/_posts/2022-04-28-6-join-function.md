---
title: '[JSP] 6. 회원가입 기능 구현'
author_profile: true
toc_label: '[JSP] 6. 회원가입 기능 구현'
post-order: 6
---

사용자가 회원가입 페이지(join.jsp)를 통해 작성한 정보를 토대로 회원가입 기능을 구현한다.

## `joinAction.jsp`
지난 포스트 [4. 로그인 기능 구현 - loginAction.jsp]({{site.url}}/application/web/jsp/4-login-function/#loginactionjsp)에서 자바 빈을 활용해 사용자 정보를 페이지 간 통신한 것처럼 `joinAction.jsp`에서도 자바 빈 `user`를 활용한다. `join.jsp` 페이지에서 사용자가 작성한 정보들을 받아 MySQL에 있는 회원 정보 DB에 입력한다. 이 과정에서 1. 정보 입력 누락 2. 중복 아이디 등의 예외가 발생할 수 있으므로 각 경우에 대한 예외 처리 코드를 작성한다.

```jsp:src/main/webapp/joinAction.jsp:lineons
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="EUC-KR"%>
<%@ page import="user.UserDAO" %>
<%@ page import="java.io.PrintWriter" %>
<% request.setCharacterEncoding("UTF-8"); %>
<jsp:useBean id="user" class="user.User" scope="page"/>
<jsp:setProperty name="user" property="userID"/>
<jsp:setProperty name="user" property="userPassword"/>
<jsp:setProperty name="user" property="userName"/>
<jsp:setProperty name="user" property="userGender"/>
<jsp:setProperty name="user" property="userEmail"/>
<!DOCTYPE html>
<html>
<head>
  <title>Insert title here</title>
</head>
<body>
  <%
    if (user.getUserID() == null || user.getUserPassword() == null || user.getUserName() == null
        || user.getUserGender() == null || user.getUserEmail() == null) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('입력 안된 항목이 있습니다.')");
        script.println("history.back()");
        script.println("</script>");
    }
    
    else {
        UserDAO userDAO = new UserDAO();
        
        int result = userDAO.join(user);
        
        if (result == -1) {
            PrintWriter script = response.getWriter();
            script.println("<script>");
            script.println("alert('이미 존재하는 아이디입니다.')");
            script.println("history.back()");
            script.println("</script>");
        }
        else {
            PrintWriter script = response.getWriter();
            script.println("<script>");
            script.println("location.href='main.jsp'");
            script.println("</script>");
        }
    }
  %>
</body>
</html>
```

## 테스트
회원가입 기능에 대해 블랙박스 테스트하기 위해 서버를 실행하고 <그림 1>과 같이 회원 가입을 시도한 후 DB에 튜플이 정상적으로 생성되는지 확인해본다.

![](https://drive.google.com/uc?export=view&id=1rz9GX0egUZbo0iBlG2SjYFsAkDYwi8Vk){: .align-center}
<그림 1. 회원가입 시도>
{: style="text-align: center;"}

```txt:CMD
mysql> SELECT * FROM user;
+---------+--------------+----------+------------+-----------------------+
| userID  | userPassword | userName | userGender | userEmail             |
+---------+--------------+----------+------------+-----------------------+
| admin   | 1q2w3e4r!@#$ | 관리자   | 남자       | administrator@bbs.jsp |
| gildong | 123456       | 홍길동   | 남자       | gildong@naver.com     |
+---------+--------------+----------+------------+-----------------------+
2 rows in set (0.00 sec)
```

## A. 참조
동빈나, "JSP 게시판 만들기 강좌 5강 - 회원가입 페이지 디자인 (JSP Advanced Development Tutorial #5)", *Youtube*, May 4, 2017. [Online]. Available: [https://youtu.be/-Kbhn2TJGn4](https://youtu.be/-Kbhn2TJGn4) [Accessed Apr. 28, 2022].
