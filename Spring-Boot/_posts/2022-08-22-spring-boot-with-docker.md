---
title: '[Spring Boot] 스프링 부트와 도커 - 어플리케이션 배포'
uml: true
author_profile: true
toc_label: '[Spring Boot] 스프링 부트와 도커 - 어플리케이션 배포'
last_modified_at: 2022-08-23 12:50:34 +0900
---

본문에서는 스프링 부트 기반의 간단한 웹 어플리케이션을 도커 이미지로 빌드하고 클라우드에 배포하는 방법에 대해서 다룹니다.

[Spring 공식 가이드 - Spring Boot with Docker](https://spring.io/guides/gs/spring-boot-docker/)를 참조하여 작성했습니다.

## 0. 전체 구조
<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-22T10:24:01.958Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;DT4rDJJ_tGd00o7GT3PI\&quot; version=\&quot;20.2.5\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;UzluEDZWUzGHqfqN0hp-\&quot; name=\&quot;그림 1. 어플리케이션 배포 전체 흐름\&quot;&gt;7VrbjuI4EP0aHkGJcyE8Ql92V5qVRuqH2d2XkUlM4sXEyHG4zNdvOXEgsYNgZsN0t6b7hbjs+FLn+FQV9Mh72Bx+E3ib/ckTwkbISQ4j73GEkIucGXwoy7G2RK5XG1JBEz3obHih34g2Otpa0oQUnYGScybptmuMeZ6TWHZsWAi+7w5bcdZddYtTYhleYsxs6xeayEyfAk3P9t8JTbNmZTfUB97gZrA+SZHhhO9bJu9p5D0IzmX9tDk8EKac1/ilfu/5Qu9pY4Lk8pYXwvV2t/8yX4/TJIyW/whyWOdjPcsOs1If+BOHw+sdy2PjBsHLPCFqJnfkLfYZleRli2PVuwfgwZbJDdPdK8rYA2dcQDvnOQxa7IiQFCaeM5rmYF5yKflGjeW51Ki7YdPW6zabg3fJ4eKp3ZMvgYSEb4gURxjSvBBo92v+IV+392c0vam2ZW0kZ9qINYPS09xnJ8OD9vN3+DywfG65G7iyVY90U9Gz7VzTk5JvW9ZPeEnYZ15QSXnHz0x1LHC8TisoG3hGyFtVfzCkWmxebOtr5IAFN40VPSjwF3o/j5mU6v7NlSPQc5zk7oTCDVxRIImYxLAiek6wxPCh7AV8FjymmI03JKF4DNc7BBvyTx1fq46vnQbjKf+a8HhNxNhF0WSbp/3sMkk0AG+8G3gDe+rhTWMcnDczizePlW/AIeRXYJDrOOMlLmg8XnExLgtgBc0lnF/pEHr2lHun/li5o00XgxuFFHx90vILclXtcsEF7OVsHEKNZgarQt9iVdQjRtG9tKgJsxapwPZHBZVJLDi87PIJax7FRKHRQ7ANTRL1+kKQgn7Dy2oqxY4tBwCrIwWLUfCo5iolUK9G6wSWedtfRQA8P+oRgB6svLthZQdrCx2SJ3OV9Sg4GC7gsnSxOsdx56LbSGKlRIbTYEleiphcFyuJRUrktWBog9ByctDj48YmCMOS7rrb7XO8XuGzIlwL46mBsYldfUz9Vju3MibykXGvzQtb+8GaqOLB6dj/gxrIpsYTGs3c0Rw24ixLCmnvu7zJQ+eDJ8U1kbqiwPe71d73p4M/GqsTssIlkxdzgP5o3Qno/fE7If/iXZkd+SSlMiuXE8rBCvpDpIrcdJOqbM9BDjAVkr+xTuqqyaCxzxnHST3QcVwduQdA23e79zK0wUZeNAm8njzOuRvi/r11nByo/Ev1TQLd+luPVM+Ph3bjqBsDan9wo/bX1H8t8Q/MXAz9oPiHRhSBLG8ya//93FBgl5cPjJeJSujyQuI8tnO6d1vdB+Gbq+7hnB/l/Zsv78PIvUqcn1zeu5FFnI9STIP11kox1FOK6XzbVUcri+x9ojW0QHvTsAOd+9rpNrpBnq8lX6bT4lLsTtFzwDyqCSXXE6nwNROpqVH8+mZsvTWRmhr33L+xigaw8LE1TN+OixuOzIQt7PxyAg/1jIPmZcj++raRDE9hUOYfilGBY6Z00cxSjL6M7m6K0Ux8x3Ith33W9RoKmvapYlONc8lWte5QszVfQ1zXmlf9xi4wrq6Vx9+sNb4xkXub1gwlB97lDKKCsGT2j7C/pB6ETnQ1gxhID6B5/jm+Bvr8Tw3e038=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. 어플리케이션 배포 전체 흐름&gt;
{: style="text-align: center;"}

1. 스프링부트 어플리케이션 빌드(.jar)
2. Dockerfile 작성 및 도커 이미지 빌드(Dockerize)
3. Docker Hub에 이미지 배포(Push)
4. 배포 서버(ex. AWS EC2 instance)에서 이미지 내려받기(Pull)
5. 이미지 실행(컨테이너화, Run)

## 1. 프로젝트 준비, 어플리케이션 빌드
[Spring Initializer](https://start.spring.io/)에서 Gradle로 Spring Web 의존성을 추가하여 간단히 프로젝트를 생성해서 사용합니다. 도커 이미지를 배포한 뒤 URL 요청을 통해 컨테이너가 정상 동작함을 확인할 수 있도록 어플리케이션 코드를 작성합니다.

```java::lineons
package maemi.dr.DockerDemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DockerDemoApplication {

	@RequestMapping("/")
	public String home() {
		return "Hello Spring Boot Docker World";
	}

	public static void main(String[] args) {
		SpringApplication.run(DockerDemoApplication.class, args);
	}

}
```

이후 배포하고자 하는 어플리케이션을 .jar 파일로 빌드해야 합니다. 빌드하는 방법은 크게 IDE를 이용하거나 CLI로 하는 방법 두 가지가 있습니다. 저는 IntelliJ IDE를 이용해서 빌드했습니다.

![](https://drive.google.com/uc?export=view&id=108ebxGo0Qdnl_X5beO2-_YsdlavQJA3D){: .align-center}
&lt;그림 2. IntelliJ Gradle 프로젝트 빌드&gt;
{: style="text-align: center;"}

성공적으로 빌드를 마치면 프로젝트 루트 디렉토리 하위에 `/build` 디렉토리가 생성되며 jar 파일은 `/build/libs` 하위에 위치하게 됩니다.

## 2. Dockerfile 작성 및 도커 이미지 빌드
스프링부트 프로젝트 디렉토리에서 Dockerfile이란 이름의 파일을 생성하고 다음과 같이 작성합니다. 프로젝트 JDK 버전에 따라 <a href="https://hub.docker.com/_/openjdk">https://hub.docker.com/_/openjdk</a>를 참고하여 필요한 JDK 버전을 FROM 구문에 작성합니다.

```txt:Dockerfile:lineons
FROM openjdk:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

이후 터미널 창에서 프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다.

```txt
docker build --build-arg JAR_FILE=build/libs/*.jar -t <자신의 Docker Hub 계정 명>/<이미지 명> .
```

<p class=short>예시</p>

```txt
docker build --build-arg JAR_FILE=build/libs/*.jar -t drmaemi/spring-boot-docker-example .
```

Docker Hub 계정은 [Docker hub 공식 페이지](https://hub.docker.com/)에서 생성할 수 있습니다. 로컬 서버에서 개발한 어플리케이션을 이미지로 빌드하여 원격 서버에 배포하기 위해서는 Docker Hub가 필수입니다.

Dockerfile 작성 문법과 도커 실행 명령어에 대해서는 [도커 공식 문서 - Dockerfile reference](https://docs.docker.com/engine/reference/builder/), [도커 공식 문서 - Use the Docker command line](https://docs.docker.com/engine/reference/commandline/cli/)를 참조하시면 좋을 것 같습니다.

<p class=short>이미지 빌드 성공 확인</p>

```txt
$ docker images
REPOSITORY                           TAG       IMAGE ID       CREATED        SIZE
drmaemi/spring-boot-docker-example   latest    96e89e7a4c6f   2 hours ago    343MB
```

<p class=short>이미지 실행 테스트</p>

```txt
$ docker run -p 8080:8080 -t drmaemi/spring-boot-docker-example

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-08-22 11:31:43.351  INFO 1 --- [           main] m.dr.DockerDemo.DockerDemoApplication    : Starting DockerDemoApplication using Java 17-ea on fd037f245ef4 with PID 1 (/app.jar started by root in /)
2022-08-22 11:31:43.355  INFO 1 --- [           main] m.dr.DockerDemo.DockerDemoApplication    : No active profile set, falling back to 1 default profile: "default"
2022-08-22 11:31:44.395  INFO 1 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2022-08-22 11:31:44.407  INFO 1 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2022-08-22 11:31:44.408  INFO 1 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.65]
2022-08-22 11:31:44.499  INFO 1 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2022-08-22 11:31:44.499  INFO 1 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 1077 ms
2022-08-22 11:31:44.864  INFO 1 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2022-08-22 11:31:44.873  INFO 1 --- [           main] m.dr.DockerDemo.DockerDemoApplication    : Started DockerDemoApplication in 1.937 seconds (JVM running for 2.323)
```

![](https://drive.google.com/uc?export=view&id=1ApVIl4fANmYMF6yvNMebWVyVhEKS2ulL){: .align-center}
&lt;그림 3. 로컬 환경 이미지 실행 테스트&gt;
{: style="text-align: center;"}

## 3. Docker Hub에 도커 이미지 배포
빌드한 도커 이미지를 Docker Hub 원격 저장소에 배포합니다.

```txt
$ docker push drmaemi/spring-boot-docker-example
Using default tag: latest
The push refers to repository [docker.io/drmaemi/spring-boot-docker-example]
6cefadad0e5a: Pushed
34f7184834b2: Mounted from library/openjdk
5836ece05bfd: Mounted from library/openjdk
72e830a4dff5: Mounted from library/openjdk
latest: digest: sha256:301c8cc3ffd992307eb90756ecfdd1bdc1c5825d8e9f7e22978b510ff749b100 size: 1163
```

### Docker push - denied 오류
자신의 로컬 PC가 Docker Hub에 로그인되어 있지 않은 상태라서 발생하는 문제입니다. Docker Hub에 로그인하면 됩니다.

```txt
$ docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: drmaemi
Password:
Login Succeeded
```

## 4. 배포 서버에서 이미지 내려받기
AWS EC2 t2.micro 스펙의 Ubuntu 18.04 머신에서 도커 환경을 구축한 뒤, 배포한 이미지를 내려받기까지 다음 명령어를 통해 수행합니다.

<p class=short>도커 환경 구축 - 도커 설치, 권한 부여</p>

```txt
sudo apte update && sudo apt install docker.io -y
sudo usermod -aG docker ${USER} && newgrp docker
```

<p class=short>이미지 내려받기(Pull)</p>

```txt
ubuntu@ip-172-31-47-158:~$ docker pull drmaemi/spring-boot-docker-example
Using default tag: latest
latest: Pulling from drmaemi/spring-boot-docker-example
5843afab3874: Pull complete 
53c9466125e4: Pull complete 
d8d715783b80: Pull complete 
eb7802350481: Pull complete 
Digest: sha256:301c8cc3ffd992307eb90756ecfdd1bdc1c5825d8e9f7e22978b510ff749b100
Status: Downloaded newer image for drmaemi/spring-boot-docker-example:latest
docker.io/drmaemi/spring-boot-docker-example:latest
```

## 5. 배포 서버에서 이미지 실행 및 요청 테스트

<p class=short>어플리케이션 이미지 실행</p>

```txt
ubuntu@ip-172-31-47-158:~$ docker run -p 8080:8080 -t drmaemi/spring-boot-docker-example

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.3)

2022-08-22 12:28:01.630  INFO 1 --- [           main] m.dr.DockerDemo.DockerDemoApplication    : Starting DockerDemoApplication using Java 17-ea on 9ee8e953f2ee with PID 1 (/app.jar started by root in /)
2022-08-22 12:28:01.642  INFO 1 --- [           main] m.dr.DockerDemo.DockerDemoApplication    : No active profile set, falling back to 1 default profile: "default"
2022-08-22 12:28:04.127  INFO 1 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2022-08-22 12:28:04.158  INFO 1 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2022-08-22 12:28:04.161  INFO 1 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.65]
2022-08-22 12:28:04.349  INFO 1 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2022-08-22 12:28:04.356  INFO 1 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 2543 ms
2022-08-22 12:28:05.793  INFO 1 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2022-08-22 12:28:05.825  INFO 1 --- [           main] m.dr.DockerDemo.DockerDemoApplication    : Started DockerDemoApplication in 5.336 seconds (JVM running for 6.514)
```

![](https://drive.google.com/uc?export=view&id=1TcGe6tBU7k3IJR1wArUAMC91MJ6dlGC7){: .align-center}
&lt;그림 4. 배포 서버에 URL 요청 성공&gt;
{: style="text-align: center;"}

## A. 참조
coco3o, "[Spring Boot] Gradle jar  빌드 및 배포하기," *Tistory*, Jun. 28, 2021. [Online]. Available: [https://dev-coco.tistory.com/68](https://dev-coco.tistory.com/68) [Accessed Aug. 22, 2022].

개발하자, "[#4] Docker를 이용해 스프링부트 앱 배포하기," *Tistory*, Oct. 20, 2021. [Online]. Available: [https://souljit2.tistory.com/74](https://souljit2.tistory.com/74) [Accessed Aug. 22, 2022].

VMWare, Inc., "Spring Boot with Docker," *spring.io*, [Online]. Available: [https://spring.io/guides/gs/spring-boot-docker/](https://spring.io/guides/gs/spring-boot-docker/) [Accessed Aug. 22, 2022].
