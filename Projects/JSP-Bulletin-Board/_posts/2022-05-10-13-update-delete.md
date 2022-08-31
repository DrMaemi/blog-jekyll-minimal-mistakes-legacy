---
title: '[JSP] 13. 게시글 수정 및 삭제 기능 구현'
author_profile: true
toc_label: '[JSP] 13. 게시글 수정 및 삭제 기능 구현'
post-order: 13
---

본 포스트에서는 게시글 수정과 삭제 기능을 구현해본다.

## 글 수정 기능 구현
### BbsDAO.update()
`BbsDAO` 클래스에서 MySQL DB에 있는 게시글 테이블 `BBS` 중 해당 글을 수정하는 SQL문을 수행하는 메서드 `update()`를 구현한다.

```java:/src/main/java/bbs/BbsDAO.java
...
    public int update(int bbsID, String bbsTitle, String bbsContent) {
        String SQL = "UPDATE BBS SET bbsTitle = ?, bbsContent = ? WHERE bbsID = ?";
        
        try {
            PreparedStatement pstmt = conn.prepareStatement(SQL);
            
            pstmt.setString(1, bbsTitle);
            pstmt.setString(2, bbsContent);
            pstmt.setInt(3,  bbsID);
            
            return pstmt.executeUpdate();
          
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return -1; // 데이터베이스 오류
    }
...
```

### update.jsp
게시글 보기 화면에서 수정 버튼을 클릭하면 게시글 수정 양식 화면을 보여주는 `update.jsp`를 작성한다.

로그인이 되어 있지 않은 경우, 게시글 작성자 본인이 아닌 경우 등의 예외처리를 수행한다.

```jsp:/src/main/webapp/update.jsp:lineons
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="bbs.Bbs" %>
<%@ page import="bbs.BbsDAO" %>
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
    int bbsID = 0;
    
    if (session.getAttribute("userID") != null) {
        userID = (String)session.getAttribute("userID"); 
    }
    
    if (userID == null) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('로그인을 하세요')");
        script.println("location.href='login.jsp'");
        script.println("</script>");
    }
    
    if (request.getParameter("bbsID") != null) {
        bbsID = Integer.parseInt(request.getParameter("bbsID"));
    }
    
    if (bbsID == 0) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('유효하지 않은 글입니다.')");
        script.println("location.href='bbs.jsp'");
        script.println("</script>");
    }
    
    Bbs bbs = new BbsDAO().getBbs(bbsID);
    
    if (!userID.equals(bbs.getUserID())) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('권한이 없습니다.')");
        script.println("location.href='bbs.jsp'");
        script.println("</script>");
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
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <form method="post" action="updateAction.jsp?bbsID=<%= bbsID %>">
        <table class="table table-striped" style="text-align: center; border: 1px solid #dddddd">
          <thead>
            <tr>
              <th colspan="2" style="background-color; #eeeeee; text-align: center;">게시판 글 수정 양식</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" class="form-control" placeholder="글 제목" name="bbsTitle" maxlength="50" value="<%= bbs.getBbsTitle() %>"></td>
            </tr>
            <tr>
              <td><textarea class="form-control" placeholder="글 내용" name="bbsContent" maxlength="2048" style="height: 350px;"><%= bbs.getBbsContent() %></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" class="btn btn-primary pull-right" value="수정">
      </form>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
  <script src="js/bootstrap.js"></script>
</body>
</html>
```

### updateAction.jsp
게시글 수정 양식 작성 후 수정 버튼을 클릭하면 DAO 객체를 이용해 DB의 게시글 정보를 갱신하는 페이지 `updateAction.jsp`를 작성한다. 마찬가지로 로그인이 되지 않은 경우, 입력 항목이 없는 경우 등의 예외처리를 한다.

```jsp:/src/main/webapp/updateAction.jsp:lineons
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="EUC-KR"%>
<%@ page import="bbs.BbsDAO" %>
<%@ page import="bbs.Bbs" %>
<%@ page import="java.io.PrintWriter" %>
<% request.setCharacterEncoding("UTF-8"); %>
<!DOCTYPE html>
<html>
<head>
  <title>JSP 게시판 웹사이트</title>
</head>
<body>
  <%
    String userID = null;
    int bbsID = 0;
    
    if (session.getAttribute("userID") != null) {
        userID = (String)session.getAttribute("userID"); 
    }
    
    if (userID == null) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('로그인을 하세요')");
        script.println("location.href='login.jsp'");
        script.println("</script>");
    }
    
    if (request.getParameter("bbsID") != null) {
        bbsID = Integer.parseInt(request.getParameter("bbsID"));
    }
    
    if (bbsID == 0) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('유효하지 않은 글입니다.')");
        script.println("location.href='bbs.jsp'");
        script.println("</script>");
    }
    
    Bbs bbs = new BbsDAO().getBbs(bbsID);
    
    if (!userID.equals(bbs.getUserID())) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('권한이 없습니다.')");
        script.println("location.href='bbs.jsp'");
        script.println("</script>");
    } else {
        if (request.getParameter("bbsID") == null || request.getParameter("bbsContent") == null
            || request.getParameter("bbsID").equals("") || request.getParameter("bbsContent").equals("")) {
            PrintWriter script = response.getWriter();
            script.println("<script>");
            script.println("alert('입력 안된 항목이 있습니다.')");
            script.println("history.back()");
            script.println("</script>");
        }
        
        BbsDAO bbsDAO = new BbsDAO();
        
        int result = bbsDAO.update(bbsID, request.getParameter("bbsTitle"), request.getParameter("bbsContent"));        
        if (result == -1) {
            PrintWriter script = response.getWriter();
            script.println("<script>");
            script.println("alert('글 수정에 실패했습니다.')");
            script.println("history.back()");
            script.println("</script>");
        } else {
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

### 결과
![](https://drive.google.com/uc?export=view&id=1yPg9uT4260ZVcdj0316liUu8nHhKdHbw){: .align-center}
<화면 1. 수정 전 게시글>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=18viC56HeWqeHQ2WsLb4KKoiGYTJ7dbam){: .align-center}
<화면 2. 게시글 수정>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1qaPE6SqK63yoeDJr7Tx5hshfY0OBlBlm){: .align-center}
<화면 3. 수정 후 게시글>
{: style="text-align: center;"}

## 게시글 삭제 기능
### BbsDAO.delete()
`BbsDAO` 클래스에서 MySQL DB에 있는 게시글 테이블 `BBS` 중 해당 글을 삭제 처리하는 SQL문을 수행하는 메서드 `delete()`를 구현한다. 이 때 SQL의 `DELETE` 문을 사용하는 게 아니라 `UPDATE` 문을 사용하며, 해당 게시글의 표시 여부를 결정하는 `bbsAvailable` 속성을 변경한다.

```java:/src/main/java/bbs/BbsDAO.java
...
  public int delete(int bbsID) {
      String SQL = "UPDATE BBS SET bbsAvailable = 0 WHERE bbsID = ?";
    
      try {
          PreparedStatement pstmt = conn.prepareStatement(SQL);
          
          pstmt.setInt(1, bbsID);
          
          return pstmt.executeUpdate();
        
      } catch (Exception e) {
          e.printStackTrace();
      }
      
      return -1; // 데이터베이스 오류
  }
...
```

### deleteAction.jsp
작성했던 `updateAction.jsp` 파일을 복사하고 삭제 기능에 맞게 예외처리 몇 가지를 제거하며 DAO 객체의 `delete()` 메서드를 사용한다.

```jsp:/src/main/webapp/deleteAction.jsp:lineons
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="EUC-KR"%>
<%@ page import="bbs.BbsDAO" %>
<%@ page import="bbs.Bbs" %>
<%@ page import="java.io.PrintWriter" %>
<% request.setCharacterEncoding("UTF-8"); %>
<!DOCTYPE html>
<html>
<head>
  <title>JSP 게시판 웹사이트</title>
</head>
<body>
  <%
    String userID = null;
    int bbsID = 0;
    
    if (session.getAttribute("userID") != null) {
        userID = (String)session.getAttribute("userID"); 
    }
    
    if (userID == null) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('로그인을 하세요')");
        script.println("location.href='login.jsp'");
        script.println("</script>");
    }
    
    if (request.getParameter("bbsID") != null) {
        bbsID = Integer.parseInt(request.getParameter("bbsID"));
    }
    
    if (bbsID == 0) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('유효하지 않은 글입니다.')");
        script.println("location.href='bbs.jsp'");
        script.println("</script>");
    }
    
    Bbs bbs = new BbsDAO().getBbs(bbsID);
    
    if (!userID.equals(bbs.getUserID())) {
        PrintWriter script = response.getWriter();
        script.println("<script>");
        script.println("alert('권한이 없습니다.')");
        script.println("location.href='bbs.jsp'");
        script.println("</script>");
    } else {
        BbsDAO bbsDAO = new BbsDAO();
        int result = bbsDAO.delete(bbsID);
        
        if (result == -1) {
            PrintWriter script = response.getWriter();
            script.println("<script>");
            script.println("alert('글 삭제에 실패했습니다.')");
            script.println("history.back()");
            script.println("</script>");
        } else {
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

### view.jsp에서 삭제 확인 팝업 띄우기
게시글 삭제 기능은 사용자의 실수에 의해 수행되는 경우 치명적이기 때문에 삭제 확인 팝업창을 띄워 사용자로부터 다시 한 번 확인하도록 하는 것이 안전하다. 이를 위해서 게시글 보기 화면 `view.jsp`에서 삭제 버튼을 클릭했을 때 `confirm` 창을 반환하는 코드를 삽입한다.

```jsp:/src/main/webapp/view.jsp
...
      </table>
      <a href="bbs.jsp" class="btn btn-primary">목록</a>
      <%
        if (userID != null && userID.equals(bbs.getUserID())) {
      %>
          <a href="update.jsp?bbsID=<%= bbsID %>" class="btn btn-primary">수정</a>
          <a onclick="return confirm('정말로 삭제하시겠습니까?')" href="deleteAction.jsp?bbsID=<%= bbsID %>" class="btn btn-primary">삭제</a>
      <%
        }
      %>
...
```

## 결과
![](https://drive.google.com/uc?export=view&id=1olSD_3rU9srm_f7mib5G_I1QbqnAggJL){: .align-center}
<화면 4. 게시글 삭제 버튼 클릭 시 확인 팝업>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1gWFLG1vPHnhaIINrnUx5U5pPL8LdwTqa){: .align-center}
<화면 5. URL로 타 사용자의 게시글 삭제 요청 시 거부>
{: style="text-align: center;"}

유저 본인이 작성한 게시글은 정상적으로 삭제 완료 후 게시판 페이지에서 보이지 않게 된다.

## A. 참조
동빈나, "JSP 게시판 만들기 강좌 13강 - 게시글 수정 및 삭제 기능 구현하기 (JSP Advanced Development Tutorial #13)", *Youtube*, May 5, 2017. [Online]. Available: [https://youtu.be/W9NLm_RNMvI](https://youtu.be/W9NLm_RNMvI) [Accessed May 10, 2022].
