---
title: '[MySQL] 에러들'
author_profile: true
toc_label: '[MySQL] 에러들'
last_modified_at: 2022-05-03 02:36:43 +0900
post-order: 2
---

## ERROR 2003 (HY000): Can't connect to MySQL server localhost
로컬에서 MySQL 서버가 구동되고 있지 않아 발생하는 문제다.

**윈도우**<br>
1. 제어판 > 시스템 및 보안 > 관리 도구 > 서비스
2. MySQL 서비스 시작

## java.sql.SQLExeception: The server time zone value is unrecognized...
JDBC를 이용해 MySQL과 인터페이싱을 하던 중 겪은 문제로, MySQL 서버를 구동할 때 서버 시간을 명시하지 않으면 시스템 시간을 사용하는데, DB 커넥터가 이에 대해 오류를 발생시키는 것이다. 해결 방법은 1. 런타임 때마다 서버와 세션의 시간대를 변수에 명시하는 방법 2. MySQL 서버 설정 정보를 담고 있는 `my.ini` 파일에 `default_time_zone`을 명시하는 방법이다.

<p class=short>1. 런타임 때마다 서버와 세션 시간대 변수 명시</p>

```sql
SET GLOBAL time_zone = '+0:00'; -- 권한 필요, UTC로 설정하는 경우 '+0:00', KST는 '+9:00'
SET time_zone = '+0:00';
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

<p class=short>2. MySQL 설정 파일 <c>my.ini</c>에 <c>default_time_zone</c> 명시</p>

```txt:<MySQL가 설치된 최상위 폴더>/current/my.ini
...
default_time_zone="+00:00"
```

## A. 참조
버터필드, "[MySQL] The server time zone value is unrecognized or represents more than one time zone 에러 해결 방법", *Tistory*, Feb. 9, 2020. [Online]. Available: [https://atoz-develop.tistory.com/entry/MySQL-The-server-time-zone-value-is-unrecognized-or-represents-more-than-one-time-zone](https://atoz-develop.tistory.com/entry/MySQL-The-server-time-zone-value-is-unrecognized-or-represents-more-than-one-time-zone) [Accsesed Apr. 27, 2022].

ggomjae, "MySQL TimeZone 설정 - serverTimezone=Asia/Seoul 로 수정할 때", *Tistory*, Apr. 4, 2021. [Online]. Available: [https://velog.io/@ggomjae/MySQL-TimeZone-설정-serverTimezoneAsiaSeoul-로-수정할-때](설정-serverTimezoneAsiaSeoul-로-수정할-때) [Accessed May 3, 2022].
