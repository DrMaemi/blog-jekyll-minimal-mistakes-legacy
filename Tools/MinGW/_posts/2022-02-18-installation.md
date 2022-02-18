---
title: "[1] MinGW란? 설치 방법"
categories:
  - MinGW
tags:
  - MinGW
author_profile: true
toc_label: "[1] MinGW란? 설치 방법"
post-order: 1
---

## MinGW란?
MinGW는 마이크로소프트 윈도우로 포팅한 GNU 소프트웨어 도구 모음이다. 윈도우 API를 구현할 수 있는 파일들을 가지고 있으며 이 때문에 개발자들이 **자유롭게 쓸 수 있는** 컴파일러인 GCC를 사용할 수 있다.

## 설치
MinGW는 64비트 버전과 32비트 버전이 따로 있으므로 자신의 시스템 환경에 따라 적절히 설치할 것을 권한다.

### 64비트
MinGW 64비트 다운로드 링크 - [https://sourceforge.net/projects/mingw-w64](https://sourceforge.net/projects/mingw-w64)


![](https://drive.google.com/uc?export=view&id=18qI--SEncxTSyhLDrSSRooBKyVGH1iM9){: .align-center width="80%"}
<그림 1. 64-bit 설치 1단계 - Download 클릭 시 5초 뒤 mingw-w64-install.exe 파일 다운 시작>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1L93CZiwMAhtyxY3RqIhRIH2nOKSsvmJw){: .align-center width="80%"}
<그림 2. 64-bit 설치 2단계 - .exe 파일 실행 후 그림과 같이 설정>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1PYgvMT96-DLvY5R5g7-PUKpk0JXCGbPb){: .align-center width="80%"}
<그림 3. 하지만 설치 시도 시 그림과 같은 오류를 계속 반환할 수 있음>
{: style="text-align: center;"}

필자처럼 설치 중 위와 같은 오류를 만나게 된다면, 완전한 라이브러리 파일을 다운받아야 한다.
MinGW 64비트 라이브러리 압축 파일 다운로드 링크 - [https://sourceforge.net/projects/mingw-w64/files/mingw-w64](https://sourceforge.net/projects/mingw-w64/files/mingw-w64)

.7z 파일을 다운받고 압축 해제한 후 `mingw64` 폴더 내 파일들을 .zip 파일로 다시 압축하여 구글 드라이브에 공유하였다. [라이브러리 .zip 압축 파일 링크(Google Drive)](https://drive.google.com/file/d/1fPPXazezLQKp9OTF6UMf23TJyv5EByob/view?usp=sharing)
7z을 다운받기 싫은 사람은 위 링크를 이용해도 좋다.

![](https://drive.google.com/uc?export=view&id=1-4HRqOvs3KqFCmMxGEXmERpzP94zqTUg){: .align-center width="80%"}
<그림 4. 64-bit 설치 3단계 - 완전한 라이브러리가 압축된 .7z 파일 다운로드>
{: style="text-align: center;"}

파일을 다운받았다면 압축 해제한 후 `mingw64` 폴더만을, .zip 파일을 다운받았다면 압축 해제한 후 폴더 그대로 자신이 원하는 경로에 두면 된다.

![](https://drive.google.com/uc?export=view&id=1cNgQXzMJq2qzRh6IXxxG6dRlm3GE5amM){: .align-center width="80%"}
<그림 5. 64-bit 설치 4단계 - 환경 변수 설정>
{: style="text-align: center;"}

### 32비트
MinGW 32비트 다운로드 링크 - [https://sourceforge.net/projects/mingw](https://sourceforge.net/projects/mingw)

![](https://drive.google.com/uc?export=view&id=1EHDiNfT51zov_UBh-yfqGQRPSFRKOWP_){: .align-center width="80%"}
<그림 6. 32-bit 설치 1단계 - MinGW 공식 사이트 설치 파일 다운로드>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1M8tfu7ENBbBJpnVFoG8vhp9O0csylvrG){: .align-center width="80%"}
<그림 7. 32-bit 설치 2단계 - 설치 파일: mingw-get-setup.exe 실행>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1iRoWcVbcrMnKabrDDkILIaJZ5857Q29e){: .align-center width="80%"}
<그림 8. 32-bit 설치 3단계 - 설치 진행>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1AQ_6WCVyehIswbDrOQpkUMCqX4FqM9SO){: .align-center width="80%"}
<그림 9. 32-bit 설치 4단계 - 설치 항목 선택>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1q3QrtuMcq2CiIqottlgkjMeuSORKvzGj){: .align-center width="80%"}
<그림 10. 32-bit 설치 5단계 - Installation - Apply Changes로 설치 진행>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1S-f0_HJgfKE2CoexsYFNxt6RVf6oOFZ-){: .align-center width="80%"}
<그림 11. 32-bit 설치 6단계 - Installation: Apply Changes로 설치 진행>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1bgOb-Wc66Q8gaDHsH4XLmkwXul_lcZT7){: .align-center width="80%"}
<그림 12. 32-bit 설치 7단계 - 시스템 변수: Path 편집>
{: style="text-align: center;"}

![](https://drive.google.com/uc?export=view&id=1DOZbSXvDo2alioR_ekLZtwmsiNDaPGAF){: .align-center width="80%"}
<그림 13. 32-bit 설치 8단계 - 시스템 변수 MinGW 경로 설정>
{: style="text-align: center;"}

### 설치 확인
이후, 설치가 정상적으로 됐는지 다음과 같이 확인한다.

```
$ gcc -v
Using built-in specs.
COLLECT_GCC=C:\dev\mingw64\bin\gcc.exe
COLLECT_LTO_WRAPPER=C:/dev/mingw64/bin/../libexec/gcc/x86_64-w64-mingw32/8.1.0/lto-wrapper.exe
Target: x86_64-w64-mingw32
Configured with: ../../../src/gcc-8.1.0/configure --host=x86_64-w64-mingw32 --build=x86_64-w64-mingw32 --target=x86_64-w64-mingw32 --prefix=/mingw64 --with-sysroot=/c/mingw810/x86_64-810-posix-seh-rt_v6-rev0/mingw64 --enable-shared --enable-static --disable-multilib --enable-languages=c,c++,fortran,lto --enable-libstdcxx-time=yes --enable-threads=posix --enable-libgomp --enable-libatomic --enable-lto --enable-graphite --enable-checking=release --enable-fully-dynamic-string --enable-version-specific-runtime-libs --disable-libstdcxx-pch --disable-libstdcxx-debug --enable-bootstrap --disable-rpath --disable-win32-registry --disable-nls --disable-werror --disable-symvers --with-gnu-as --with-gnu-ld --with-arch=nocona --with-tune=core2 --with-libiconv --with-system-zlib --with-gmp=/c/mingw810/prerequisites/x86_64-w64-mingw32-static --with-mpfr=/c/mingw810/prerequisites/x86_64-w64-mingw32-static --with-mpc=/c/mingw810/prerequisites/x86_64-w64-mingw32-static --with-isl=/c/mingw810/prerequisites/x86_64-w64-mingw32-static --with-pkgversion='x86_64-posix-seh-rev0, Built by MinGW-W64 project' --with-bugurl=https://sourceforge.net/projects/mingw-w64 CFLAGS='-O2 -pipe -fno-ident -I/c/mingw810/x86_64-810-posix-seh-rt_v6-rev0/mingw64/opt/include -I/c/mingw810/prerequisites/x86_64-zlib-static/include -I/c/mingw810/prerequisites/x86_64-w64-mingw32-static/include' CXXFLAGS='-O2 -pipe -fno-ident -I/c/mingw810/x86_64-810-posix-seh-rt_v6-rev0/mingw64/opt/include -I/c/mingw810/prerequisites/x86_64-zlib-static/include -I/c/mingw810/prerequisites/x86_64-w64-mingw32-static/include' CPPFLAGS=' -I/c/mingw810/x86_64-810-posix-seh-rt_v6-rev0/mingw64/opt/include -I/c/mingw810/prerequisites/x86_64-zlib-static/include -I/c/mingw810/prerequisites/x86_64-w64-mingw32-static/include' LDFLAGS='-pipe -fno-ident -L/c/mingw810/x86_64-810-posix-seh-rt_v6-rev0/mingw64/opt/lib -L/c/mingw810/prerequisites/x86_64-zlib-static/lib -L/c/mingw810/prerequisites/x86_64-w64-mingw32-static/lib '
Thread model: posix
gcc version 8.1.0 (x86_64-posix-seh-rev0, Built by MinGW-W64 project)
```

```
$ g++ -v
Using built-in specs.
COLLECT_GCC=C:\dev\mingw64\bin\g++.exe
COLLECT_LTO_WRAPPER=C:/dev/mingw64/bin/../libexec/gcc/x86_64-w64-mingw32/8.1.0/lto-wrapper.exe
Target: x86_64-w64-mingw32
Configured with: ../../../src/gcc-8.1.0/configure --host=x86_64-w64-mingw32 --build=x86_64-w64-mingw32 --target=x86_64-w64-mingw32 --prefix=/mingw64 --with-sysroot=/c/mingw810/x86_64-810-posix-seh-rt_v6-rev0/mingw64 --enable-shared --enable-static --disable-multilib --enable-languages=c,c++,fortran,lto --enable-libstdcxx-time=yes --enable-threads=posix --enable-libgomp --enable-libatomic --enable-lto --enable-graphite --enable-checking=release --enable-fully-dynamic-string --enable-version-specific-runtime-libs --disable-libstdcxx-pch --disable-libstdcxx-debug --enable-bootstrap --disable-rpath --disable-win32-registry --disable-nls --disable-werror --disable-symvers --with-gnu-as --with-gnu-ld --with-arch=nocona --with-tune=core2 --with-libiconv --with-system-zlib --with-gmp=/c/mingw810/prerequisites/x86_64-w64-mingw32-static --with-mpfr=/c/mingw810/prerequisites/x86_64-w64-mingw32-static --with-mpc=/c/mingw810/prerequisites/x86_64-w64-mingw32-static --with-isl=/c/mingw810/prerequisites/x86_64-w64-mingw32-static --with-pkgversion='x86_64-posix-seh-rev0, Built by MinGW-W64 project' --with-bugurl=https://sourceforge.net/projects/mingw-w64 CFLAGS='-O2 -pipe -fno-ident -I/c/mingw810/x86_64-810-posix-seh-rt_v6-rev0/mingw64/opt/include -I/c/mingw810/prerequisites/x86_64-zlib-static/include -I/c/mingw810/prerequisites/x86_64-w64-mingw32-static/include' CXXFLAGS='-O2 -pipe -fno-ident -I/c/mingw810/x86_64-810-posix-seh-rt_v6
-rev0/mingw64/opt/include -I/c/mingw810/prerequisites/x86_64-zlib-static/include -I/c/mingw810/prerequisites/x86_64-w64-mingw32-static/include' CPPFLAGS=' -I/c/mingw810/x86_64-810-posix-seh-rt_v6-rev0/mingw64/opt/include -I/c/mingw810/prerequisites/x86_64-zlib-static/include -I/c/mingw810/prerequisites/x86_64-w64-mingw32-static/include' LDFLAGS='-pipe -fno-ident -L/c/mingw810/x86_64-810-posix-seh-rt_v6-rev0/mingw64/opt/lib -L/c/mingw810/prerequisites/x86_64-zlib-static/lib -L/c/mingw810/prerequisites/x86_64-w64-mingw32-static/lib '
Thread model: posix
gcc version 8.1.0 (x86_64-posix-seh-rev0, Built by MinGW-W64 project)
```