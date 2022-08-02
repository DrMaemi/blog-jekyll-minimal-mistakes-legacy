---
title: '[자료구조] 연결 리스트(Linked List)'
author_profile: true
uml: true
toc_label: '[자료구조] 연결 리스트(Linked list)'
post-order: 2
---

## 연결 리스트(Linked list)란?
프로그래밍 언어에서 가장 기본적인 자료구조인 배열(Array)에서 데이터의 삽입/삭제 시 O(N)의 시간복잡도를 가졌습니다. 이를 포인터 개념을 이용해 O(1)에 데이터 삽입/삭제를 수행할 수 있도록 만든 자료구조가 바로 연결 리스트(Linked list)입니다.

![](https://drive.google.com/uc?export=view&id=1UmWPDSXFXXrT8VR2tRaL-gJe-ngxzOaD){: .align-center}
&lt;그림 1. Linked list 시간-공간 복잡도&gt;
{: style="text-align: center;"}

연결 리스트를 구성하는 요소는 실제 데이터 값과 다음 요소를 가리키는 포인터 변수로 구성된 구조체 또는 클래스입니다. 요소 간 연결 관계에 따라 단일 연결 리스트(Singly linked list), 이중 연결 리스트(Doubly linked list), 다중 연결 리스트(Multiply linked list), 원형 연결 리스트(Circular linked list)가 있습니다.

<br>
![](https://drive.google.com/uc?export=view&id=1sKG1tP27OkFt4xOOjK9C3zd6y4VKCInb){: .align-center}
<br>
&lt;그림 2. 단일 연결 리스트&gt;
{: style="text-align: center;"}

## 단일 연결 리스트

<p class=short>C++ 예제</p>

```c++::lineons
#include <iostream>

using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int data) {
        this->data = data;
        next = NULL;
    }
};

class LinkedList {
private:
    Node* head;
public:
    LinkedList() { head = NULL; }

    void append(int data) {
        if (head == NULL) {
            head = new Node(data);
            return;
        }

        Node* current = head;

        while (current->next != NULL)
            current = current->next;

        current->next = new Node(data);
    }

    void prepend(int data) {
        Node* newHead = new Node(data);
        newHead->next = head;
        head = newHead;
    }

    void deleteByValue(int data) {
        if (head == NULL)
            return;
        
        if (head->data == data) {
            Node* preHead = head;
            head = head->next;
            delete preHead;
            return;
        }

        Node* current = head;

        while (current->next != NULL) {
            if (current->next->data == data) {
                Node* next = current->next;
                current->next = current->next->next;
                delete next;
                return;
            }
            current = current->next;
        }
    }

    void printAll() {
        Node* current = head;

        while (current != NULL) {
            cout << current->data << ' ';
            current = current->next;
        }
        cout << '\n';
    }
};

int main() {
    LinkedList linkedList;

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(4);
    linkedList.append(5);

    linkedList.prepend(-1);
    linkedList.deleteByValue(3);

    linkedList.printAll();

    cout << "Program terminated successfully";

    return 0;
}
```
```txt
-1 1 2 4 5 
Program terminated successfully
```

<p class=short>Java 예제</p>

```java::lineons
package linked_list;

public class Node {
    Node next;
    int data;

    public Node(int data) {
        this.data = data;
    }
}

public class LinkedList {
    Node head;

    public void append(int data) {
        if (head == null) {
            head = new Node(data);
            return;
        }

        Node current = head;

        while (current.next != null) {
            current = current.next;
        }

        current.next = new Node(data);
    }

    public void prepend(int data) {
        Node newHead = new Node(data);
        newHead.next = head;
        head = newHead;
    }

    public void deleteByValue(int data) {
        if (head == null)
            return;

        if (head.data == data) {
            head = head.next;
            return;
        }

        Node current = head;

        while (current.next != null) {
            if (current.next.data == data) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }

    public void printAll() {
        Node current = head;

        while (current != null) {
            System.out.printf("%d ", current.data);
            current = current.next;
        }
        System.out.println();
    }
}

public class Main {
    public static void main(String[] args) {
        LinkedList linkedList = new LinkedList();

        linkedList.append(1);
        linkedList.append(2);
        linkedList.append(3);
        linkedList.append(4);
        linkedList.append(5);

        linkedList.prepend(-1);
        linkedList.deleteByValue(3);

        linkedList.printAll();

        System.out.println("Program terminated successfully");
    }
}
```
```txt
-1 1 2 4 5 
Program terminated successfully
```

## A. 참조
Big-O Cheat Sheet, "Know Thy Complexities!," *bigocheatsheet.com*, [Online]. Available: [https://www.bigocheatsheet.com/]j(https://www.bigocheatsheet.com/) [Accessed Aug. 2, 2022].
