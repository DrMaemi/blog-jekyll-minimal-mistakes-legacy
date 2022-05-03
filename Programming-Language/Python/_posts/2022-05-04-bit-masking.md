---
title: '[13] 파이썬 비트마스크'
mathjax: true
author_profile: true
toc_label: '[13] 파이썬 비트마스크'
post-order: 13
---

컴퓨터의 비트 필드(Bit Field)와 그에 관련된 연산(Bitwise Operation)을 자료구조로서 활용하는 것을 마스킹(Masking), 혹은 비트마스크(Bit Mask)라 한다. $N$개의 비트는 $0$부터 $2^N-1$의 수를 표현할 수 있다.

비트마스크를 사용하면 다음과 같은 효과들을 가질 수 있다.
- 다른 자료구조에 비해 수행 시간이 더 빠르다
- 코드가 더 간결해진다
- 더 적은 메모리를 사용할 수 있다

## 비트 필드
파이썬은 정수 자료형을 가지는 변수를 비트 필드로 활용할 수 있다.

<p class=short>비트 필드 사용 예제</p>

```:CMD
>>> bitField1 = 5
>>> bin(bitField1)
'0b101'
>>> type(bin(bitField1))
<class 'str'>
>>> bitField2 = 0b00010
>>> bitField2
2
>>> type(bitField2)
<class 'int'>
>>> bitField1 & bitField2
0
>>> bitField3 = 0b00010101000000110000111
>>> bitField2 | bitField3
688519
```

예제에서 확인할 수 있듯이 `0b<bits>` 형태로 선언하면 정수 값이 할당되며, 2진수 형식 말고도 8진수 `0o`, 16진수 `0x` 형식으로 선언해도 비트 필드로 사용할 수 있다.

## 비트 연산
비트 연산에느 AND(`&`), OR(`|`), XOR(`^`), NOT(`~`), Shift(`<<`, `>>`)가 있다.

### AND(`&`)
대응되는 두 비트가 모두 1일 때에만 1을 반환한다.

```:CMD
>>> bitField1 = 0b1101
>>> bitField2 = 0b1011
>>> bin(bitField1 & bitField2)
'0b1001'
```

### OR(`|`)
대응되는 두 비트 중 하나라도 1일 때 1을 반환한다.

```:CMD
>>> bitField1 = 0b1101
>>> bitField2 = 0b1011
>>> bin(bitField1 | bitField2)
'0b1111'
```

### XOR(`^`)
대응되는 두 비트가 서로 다를 때에만 1을 반환한다.

```:CMD
>>> bitField1 = 0b1101
>>> bitField2 = 0b1011
>>> print(f'{bitField1 ^ bitField2:04b}')
0110
```

### NOT(`~`)
각 비트 값을 반전시킨다.

```:CMD
>>> bitField1 = 0b1101
>>> bin(~bitField1)
'-0b1110'
```

실행 결과에 2의 보수(two's complement)를 적용하면 `-0b1110`은 `0b0010`으로 각 비트가 반전된 것을 확인할 수 있다.

### Left Shift(`<<`)
가장 오른쪽부터 *n*번 째 비트를 *n+k*번째 비트로 옮기며, 해당 변수에 $2^k$를 곱하는 효과를 가진다.

```:CMD
>>> bitField1 = 0b1101
>>> bitField1
13
>>> bin(bitField1 << 2)
'0b110100'
>>> bitField1 << 2
52
```

### Right Shift(`>>`)
가장 오른쪽부터 *n*번 째 비트를 *n-k*번째 비트로 옮기며, 해당 변수를 $2^k$으로 나누고 나머지는 버리는 효과를 가진다.

```:CMD
>>> bitField1 = 0b1101
>>> bitField1
13
>>> bin(bitField1 >> 2)
'0b11'
>>> bitField1 >> 2
3
```

## 비트마스크와 집합
순회 가능한 어떤 자료의 `i`번째 원소($0 \le i \le len(iterable)$)를 집합에 추가/삭제/토글/확인할 때 비트마스크를 사용하면 적은 메모리로 매우 빠른 연산 속도를 가질 수 있다.

### 원소 추가
`i`번째 비트만 1로 만들고 OR 연산

```txt
S |= (1 << i)
```

### 원소 삭제
`i`번째 비트만 0으로 만들고 AND 연산

```txt
S &= ~(1 << i)
```

### 원소 토글
`i`번째 비트만 1로 만들고 XOR 연산

```txt
S ^= (1 << i)
```

### 원소 확인
확인하고자 하는 비트를 1의 자리로 옮기고(Right Shift) 1과 AND 연산

```txt
1 & S >> i
```

<p class=short>예시</p>

```:CMD
>>> bitField = 0b1101
>>> 1 & bitField >> 1
0
>>> 1 & bitField >> 2
1
```

## 추가로 알면 유용한 연산
### *N*개 비트를 모두 1로 채우기
$N$개의 비트는 최대 $2^N-1$의 값을 가지므로 변수에 $2^N-1$을 할당하면 된다.
```
>>> bitField = 2**10-1
>>> bin(bitField)
'0b1111111111'
```

## A. 참조
인생의 로그캣, "[알고리즘] 비트마스크란", *Tistory*, Mar. 23, 2019. [Online]. Available: [https://noahlogs.tistory.com/31](https://noahlogs.tistory.com/31) [Accessed May 4, 2022].

1998yuki0331, "[Python] 비트 마스킹 정리", *Velog*, Dec. 22, 2021. [Online]. Available: [https://velog.io/@1998yuki0331/Python-비트-마스킹-정리](https://velog.io/@1998yuki0331/Python-비트-마스킹-정리) [Accessed May 4, 2022].
