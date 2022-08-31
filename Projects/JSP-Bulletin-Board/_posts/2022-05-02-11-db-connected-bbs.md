---
title: '[JSP] 11. 게시판 글 목록 기능 구현'
uml: true
author_profile: true
toc_label: '[JSP] 11. 게시판 글 목록 기능 구현'
post-order: 11
---

게시판 메인 페이지에서 DB와 연동하여 작성된 게시글들을 볼 수 있도록 게시판 글 목록 기능을 구현한다. 이를 위해선 게시판 페이지에 보여줄 정보들을 가져오는 메서드를 `BbsDAO` 객체에 구현하고, `bbs.jsp` 페이지 내부에서 `BbsDAO` 객체를 활용하여 DB에 있는 정보를 가져와 HTML에 삽입하는 과정이 필요하다.

## `BbsDAO` 메서드 구현
게시판 페이지에서 페이지 번호 당 보여줄 게시글 개수가 10개라고 정하면, DB에서도 정보를 가져올 때 10개씩 가져와야 한다. 요청할 페이지 번호에 해당하는 게시글이 있는지 여부를 판단하는 메서드 `.nextPage()`와 요청 페이지 번호에 해당하는 게시글들을 DB로부터 가져와 리스트로 반환하는 `.getList()` 메서드를 구현한다.

```java:src/main/java/bbs/BbsDAO.java:lineons
...
public class BbsDAO{
  ...

  public ArrayList<Bbs> getList(int pageNumber) {
    String SQL = "SELECT * FROM BBS WHERE bbsID < ? AND bbsAvailable = 1 ORDER BY bbsID DESC LIMIT 10;";
    ArrayList<Bbs> list = new ArrayList<Bbs>();
    
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, getNext()-(pageNumber-1)*10);
      rs = pstmt.executeQuery();
      
      while (rs.next() ) {
        Bbs bbs = new Bbs();
        
        bbs.setBbsID(rs.getInt(1));
        bbs.setBbsTitle(rs.getString(2));
        bbs.setUserID(rs.getString(3));
        bbs.setBbsDate(rs.getString(4));
        bbs.setBbsContent(rs.getString(5));
        bbs.setBbsAvailable(rs.getInt(6));
        
        list.add(bbs);
      }
      
    } catch (Exception e) {
      e.printStackTrace();
    }
    
    return list;
  }
    
  public boolean nextPage(int pageNumber) {
    String SQL = "SELECT * FROM BBS WHERE bbsID < ? AND bbsAvailable = 1 ORDER BY bbsID DESC LIMIT 10;";
    
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, getNext()-(pageNumber-1)*10);
      rs = pstmt.executeQuery();
      
      if (rs.next()) {
        return true;
      }
      
    } catch (Exception e) {
      e.printStackTrace();
    }
    
    return false;
  }
}

```

## `bbs.jsp`에 HTML 코드 삽입
body 부분 `<tbody>` 태그 안에 다음과 같이 `bbsDAO` 객체를 활용해 DB에서 가져온 정보를 HTML 코드로 삽입한다.
```jsp:src/main/webapp/bbs.jsp:lineons
...
        <tbody>
          <%
            BbsDAO bbsDAO = new BbsDAO();
            ArrayList<Bbs> list = bbsDAO.getList(pageNumber);
            
            for (int i=0; i<list.size(); i++) {
          %>
              <tr>
                <td><%= list.get(i).getBbsID() %></td>
                <td><a href="view.jsp?bbsID=<%= list.get(i).getBbsID() %>"><%= list.get(i).getBbsTitle() %></a></td>
                <td><%= list.get(i).getUserID() %></td>
                <td><%= list.get(i).getBbsDate().substring(0, 11)+list.get(i).getBbsDate().substring(11, 13)+"시"+list.get(i).getBbsDate().substring(14, 16)+"분" %></td>
              </tr>
          <%
            }
          %>
        </tbody>
...
```

글 목록에서 제목에 링크를 걸고 방문자가 글 제목을 클릭하면 해당 글에 대한 내용을 보여줄 `view.jsp` 페이지로 이동하게끔 한다. `view.jsp` 작성 내용은 다음 포스트에서 다룰 예정이다.

## 결과
```txt:CMD
mysql> SELECT * FROM BBS;
+-------+------------------+--------+---------------------+------------------+--------------+
| bbsID | bbsTitle         | userID | bbsDate             | bbsContent       | bbsAvailable |
+-------+------------------+--------+---------------------+------------------+--------------+
|     1 | sadfasdfdasfadsf | user1  | 2022-04-30 14:32:34 | dasfdsafasdfdsaf |            1 |
+-------+------------------+--------+---------------------+------------------+--------------+
1 row in set (0.01 sec)
```

![](https://drive.google.com/uc?export=view&id=1sEZgg8E16vsFpyyDfqGOXUU-IJqNY1Oq){: .align-center}
<화면 1. DB와 연동된 게시판 메인 페이지>
{: style="text-align: center;"}


## A. 참조
동빈나, "JSP 게시판 만들기 강좌 11강 - 게시판 글 목록 기능 구현하기 (JSP Advanced Development Tutorial #11)", *Youtube*, May 5, 2017. [Online]. Available: [https://youtu.be/Q-TzxXw2jQY](https://youtu.be/Q-TzxXw2jQY) [Accessed Apr. 30, 2022].
