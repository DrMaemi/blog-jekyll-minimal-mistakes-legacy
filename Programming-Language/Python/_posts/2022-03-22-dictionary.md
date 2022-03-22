---
title: 자료형 - 딕셔너리(Dictionary)
tags:
  - Dictionary
author_profile: true
toc_label: 자료형 - 딕셔너리(Dictionary)
---

파이썬에서 사용할 수 있는, 대응 관계를 나타내는 연관 배열(Associative Array) 또는 해시(Hash) 자료구조인 딕셔너리(Dictionary)에 대해 알아보자.

## 1. 선언
```txt
>>> a = {1: 'hi', 'key2': 'value2', 'hello-key': 'hello-value'}
>>> b = {i: str(i) for i in range(12)}
>>> b
{0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11'}
```

## 2. 요소 추가
```txt
>>> a = {1: 'a'}
>>> a[2] = 'b'
>>> a
{1: 'a', 2: 'b'}
>>> a['name'] = 'pey'
>>> a
{1: 'a', 2: 'b', 'name': 'pey'}
```

## 3. 요소 삭제
`del[<key>]` 형태로 키-값 쌍을 삭제할 수 있다.
```txt
>>> del a[1]
>>> a
{2: 'b', 'name': 'pey'}
```
키를 기준으로 삭제된다.

## 4. 주의 사항
중복되는 key 값을 설정하면 가장 마지막 {key: value}쌍만 남는다.
```txt
>>> a = {1: 'a', 1: 'b', 1: 'c'}
>>> a
{1: 'c'}
```

## 5. 하위 메서드
### 5.1. `.keys()`
딕셔너리의 키들을 순회가능한 객체 `dict_keys`로 반환한다.
```txt
>>> a = {'name': 'pey', 'phone': '0119993323', 'birth': '1118'}
>>> a.keys()
dict_keys(['name', 'phone', 'birth'])
```
```python
for key in a.keys():
    print(key)
```
```txt
name
phone
birth
```

### 5.2. `.values()`
딕셔너리의 값들을 순회가능한 객체 `dict_values`로 반환한다.
```txt
>>> a.values()
dict_values(['pey', '0119993323', '1118'])
```

### 5.3. `.items()`
딕셔너리의 키-값들을 순회가능한 객체 `dict_items`로 반환한다.
```txt
>>> a.items()
dict_items([('name', 'pey'), ('phone', '0119993323'), ('birth', '1118')])
```

### 5.4. `.clear()`
딕셔너리를 비운다.
```txt
>>> a.clear()
>>> a
{}
```

### 5.5. `.get()`
`get(<key>, <default return value>)` 형식으로 사용, 원하는 키에 대한 값이 없는 경우 `<default return value>` 값을 반환한다.
```txt
>>> a = {'name':'pey', 'phone':'0119993323', 'birth': '1118'}
>>> a.get('name')
'pey'
>>> a.get('phone')
'0119993323'
>>> print(a.get('nokey'))
None
>>> print(a['nokey'])
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'nokey'
```
```txt
>>> a.get('foo', 'bar')
'bar'
```

### 5.6. 특정 키가 딕셔너리에 존재하는지 검사 `in`
```txt
>>> a = {'name':'pey', 'phone':'0119993323', 'birth': '1118'}
>>> 'name' in a
True
>>> 'email' in a
False
```
