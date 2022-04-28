---
title: '[Git] 2. 저장소 생성(초기화)'
author_profile: true
toc_label: '[Git] 2. 저장소 생성(초기화)'
post-order: 2
---

로컬에서 깃 저장소를 생성(초기화)하기 위해서 사용하는 명령어는 크게 두 가지이다.
1. `git clone`
2. `git init`

## 1. `git clone`
깃 원격 저장소에 이미 존재하는 프로젝트로부터 다운로드받아 시작하길 원하는 경우 사용하는 명령어다. 깃은 해당 프로젝트 경로 하위 `.git` 파일 존재 유무로 깃 저장소인지 아닌지 판단한다.

<p class=short>사용 예제</p>

```txt:Git Bash
...>git clone https://github.com/DrMaemi/test.git
Cloning into 'test'...
remote: Enumerating objects: 12, done.
remote: Counting objects: 100% (12/12), done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 12 (delta 3), reused 10 (delta 1), pack-reused 0
Receiving objects: 100% (12/12), 84.27 KiB | 42.13 MiB/s, done.
Resolving deltas: 100% (3/3), done.
```

## 2. `git init`
로컬에 존재하는 프로젝트 루트 디렉토리에서 다음 명령어들을 사용한다.

1. `git init`
2. `git add .`
3. `git commit -m "<commit message>"`

<p class=short><c>git init</c>, <c>git add</c>, <c>git commit</c>, <c>git push</c></p>

```txt:Git Bash
$ git init
Initialized empty Git repository in C:/dev/Java/Projects/Eclipse/BBS-JSP/.git/

$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .classpath
        .project
        .settings/
        src/

nothing added to commit but untracked files present (use "git add" to track)

$ git push
fatal: No configured push destination.
Either specify the URL from the command-line or configure a remote repository using

    git remote add <name> <url>

and then push using the remote name

    git push <name>
```

위 명령어를 살펴보면 원격 저장소 URL을 등록해주지 않았기 때문에 오류가 발생한다. `git remote add <name> <remote repository URL>`로 원격 저장소를 등록해준다. 등록할 원격 저장소는 [Github](https://github.com/)에서 미리 생성되어 있어야 한다.

```txt:Git Bash
$ git remote add github https://github.com/DrMaemi/BBS-JSP.git

$ git push github master
Enumerating objects: 21, done.
Counting objects: 100% (21/21), done.
Delta compression using up to 16 threads
Compressing objects: 100% (14/14), done.
Writing objects: 100% (21/21), 1.93 MiB | 500.00 KiB/s, done.
Total 21 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/DrMaemi/BBS-JSP.git
 * [new branch]      master -> master
```
