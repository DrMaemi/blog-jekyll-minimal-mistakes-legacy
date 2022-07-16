---
title: '[운영체제] 03. 운영체제 구조'
author_profile: true
uml: true
toc_label: '[운영체제] 03. 운영체제 구조'
post-order: 3
---

*본문은 2019년도 하반기 아주대학교의 컴퓨터공학과 교수로 재직하셨던 김상훈 교수님의 운영체제 과목 강의 자료를 기반으로 작성되었음을 알립니다.*

## 1. 현대 운영체제의 동작 순서
1. PDU(Power Distribution Unit, 전원분배장치)가 시스템의 CPU와 장치들에게 전원을 공급한다
2. 부트스트랩 프로그램(e.g., BIOS) 자동 로드
3. Boot loader(e.g., grub)가 OS 커널 로드 및 실행
4. BIOS → Boot loader → kernel phase 1 → kernel phase 2

컴퓨터가 켜질 때 처음부터 운영체제의 코드를 읽을 수 없다. 기본적으로 운영체제는 File system이라는 형태인데, 이는 몹시 복잡하다. 따라서 운영체제는 기본적으로 그 File system 앞부분에 Bootloader 라는, 파일 시스템의 일부 내용을 간단히 포함하고 있는 프로그램을 담고 있고, 컴퓨터가 실행될 때 Boot loader를 실행시킴으로써 bootstrap을 행한다(운영체제 실행).

## 2. 운영체제 구조 종류
- Simple - MS-DOS
- Monolithic - UNIX
- Layered(Abstraction-based)
- Microkernel - Mach
- Hybrid - Modern OSes

## 2.1. Simple
Simple structure를 따르는 대표적인 OS는 MS-DOS가 있다. Simple structure는 최소한의 저장 공간에 모든 기능을 담기 위한 목적으로 만들어졌다. 완벽히 모듈화되어 설계되지 않았고, 인터페이스와 기능 계층이 분리되어 있지 않다.

어플리케이션이 하드웨어에 직접 접근 가능했다(user mode, kernel mode 존재x).

<div class="mxgraph" style="max-width:100%;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-07-15T05:20:51.689Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;XSRn7jj-2kybDV_DlfuQ\&quot; version=\&quot;20.1.1\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;8GutSCba3COvzZyJwegq\&quot; name=\&quot;그림 1. Simple Structure - MS-DOS\&quot;&gt;5Zhdb5swFIZ/DZedwE4IXLZpu01T1GrRNK13Bg5gzWBmnJDs188U852sWxsyaclN7Nc+h/h5j45FDLxMdu8FyeIVD4AZyAx2Br41ELJM7KivUtlXiu3gSogEDfSmVljTn1BHanVDA8h7GyXnTNKsL/o8TcGXPY0IwYv+tpCz/lMzEsFIWPuEjdWvNJBxpTpo0eofgEZx/WTLdquVhNSb9UnymAS86Ej4zsBLwbmsRsluCayEV3Op4u6PrDY/TEAq/ySgiD7h7bf7HxZ+Sr94s8fCQ/RKZ9kSttEHvs4yRn0iKU/L9IJHgiT6BHJfYxF8kwZQZjYNfFPEVMI6I365WqhCUFosE6ZmlhqGlLElZ1w8x+JgDk4wU3ouBf8OnRUHedi21Yr+VSAk7I4e12ogquoDnoAUe7VFBzga+74/LVoTEdZa3DFwpjWi6yZqErdo1UDT/QvSaERaQK5qW51Gkd3nEpKpeBNwQv8Qb9t3wAsn4W3Nx8At95zA8Qj4an11+7AumxFsqWKnBoKqQ+cnxR2GIfIP4g5sz55PU95Nl+ninp8T92yE+/PDSgk3H8+BHOwjyBeuZ5rTIHf/dUtZjJCPqEIaXJe3oJr5jOQ59fsg+9SrcAhGV+KLiDoMDlVdrQlg6mbZ9tMf4qKf8Mjpc3+sLUODJoMGaHO+ET7oqO5d+FKi+SCRJCICOUr0bFNz7Nc751ygc+/Mzsey+vzd1xv5u7xoWCAT++pemq9NnrcaOUyEhokmdq5+37gc64Y9ENknaqZnt278EvOfW9cQfus9OEx0OuvUtH21rba3fxDgu18=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. Simple Structure - MS-DOS&gt;
{: style="text-align: center;"}

## 2.2. Monolithic
Monolithic의 사전적 의미는 *The Big Mess*로 하나의 큰 SW 시스템을 의미한다. Monolithic structure는 Simple structure와 구조적 차이는 없으나 그 크기와 규모가 방대해진 것을 뜻한다(필자의 추측입니다). Kernel structure라고도 한다. Monolihic structure를 따르는 대표적인 OS는 UNIX가 있다. 인터페이스와 기능 계층이 분리되어 있지 않고, 시스템 콜 인터페이스와 물리적인 하드웨어 사이의 모든 기능(파일 시스템, CPU 스케쥴링, 메모리 관리, 입출력 등)이 단일 계층에 구현되어 있다.

Monolithic은 처리 속도와 성능이 좋다는 장점이 있으나, 유지보수 및 업데이트가 힘들고 보안과 안정성, 신뢰성, 확장성을 갖기 어렵다.
- 모든 OS 코드가 단일 메모리 공간에서 동작, OS를 구성하는 어떤 기능이라도 시스템에서 동작 등의 문제가 있음

## 2.3. Layered
운영체제 내부적으로 여러 개의 계층으로 나뉘어 상위 계층은 하위 계층의 인터페이스만을 이용하여 동작하도록 설계한 Layered 아키텍처를 사용한다. Layered 아키텍처의 특징은 상위 계층이 하위 계층을 이용할 때 추상화 기능을 이용한 인터페이스를 통해서만 수행한다는 말이며, 이런 개념이 후술할 Microkernel 아키텍처의 OS를 개발하는데 사용됐다.

## 2.4. Microkernel
기능이나 모듈 단위로 구성 요소들을 분리하고 메세지 큐를 활용하여 구성 요소들이 각각 완전히 독립적인 기능을 수행하도록 설계한 구조를 Microkernel 아키텍처라 한다. Mode의 개념이 있어 user mode, kernel mode 등을 가진다.

Microkernel 아키텍처는 Monolithic의 장단점을 반대로 가지고 있다. 안정성, 신뢰성, 확장성을 가지며 유지보수가 쉬운 반면 메세지 큐를 이용한 기능 간 통신이나 모드 간 전환 등에 대한 오버헤드가 존재하여 성능이 비교적 떨어진다.

처음으로 Microkernel 아키텍처의 OS로 소개됐던 Mach는 스레드 스케쥴링, 메시지 패싱(통신), 가상 메모리, 장치 드라이버 기능만을 포함했다. IBM OS/2, Windows NT/XP, MacOS X 등이 Mach의 일부 구조를 기반으로 개발됐다.

## 2.5. Hybrid
현대의 운영체제들은 위에서 소개한 특정 모델이나 아키텍처가 아니라 여러 가지 모델을 이용하여 설계된다. 성능과 보안, 사용성 등에서 필요 시 적절한 모델을 시스템 내부에 적재적소에 적용하여 설계된다.

예를 들어 Linux와 Solaris는 전체적으로 Layered 아키텍처를 따라 설계됐지만 address performance가 필요한 OS kernel 영역은 단일 kernel address space를 사용하는 Monolithic 설계를 따른다. 윈도우는 전체적으로 Monolithic 설계를 따르지만 부분적으로 하위 시스템들은 Microkernel로 설계됐다. Android, MacOS도 Hybrid 아키텍처로 설계됐다.
