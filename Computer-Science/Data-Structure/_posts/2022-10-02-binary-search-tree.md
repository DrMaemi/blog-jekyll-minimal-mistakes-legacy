---
title: '[자료구조] 이진 탐색 트리(Binary Search Tree)'
author_profile: true
uml: true
mathjax: true
toc_label: '[자료구조] 이진 탐색 트리(Binary Search Tree)'
post-order: 4
---

## 1. 이진 탐색 트리(Binary Search Tree)란?
이진 탐색 트리(Binary Search Tree)란 이진 탐색(Binary Search)과 연결 리스트(Linked List)를 결합한 자료구조입니다. 이진 탐색의 **효율적 탐색 능력을 유지**하면서 **빈번한 자료 입력-삭제가 가능**하게끔 고안됐습니다.

기존에 정렬된 배열에서 이진 탐색에 소요되는 시간 복잡도는 $O(\log n)$으로 빠르지만 자료 입력, 삭제 시 배열을 이동시켜야 하기 때문에 $O(n)$이 소요됩니다. 연결 리스트의 경우 자료 입력, 삭제에 소요되는 시간 복잡도는 $O(1)$로 효율적이지만 탐색에는 $O(n)$이 소요됩니다.

## 2. 이진 탐색 트리 속성
이진 탐색 트리는 다음과 같은 속성을 지닙니다.

- 각 노드는 값을 지님
- 값은 전순서(Totally Ordered Set)를 지님
- 각 노드의 왼쪽 서브 트리에는 해당 노드의 값보다 작은 값을 지닌 노드들로 구성됨
- 각 노드의 오른쪽 서브 트리에는 해당 노드의 값보다 큰 값을 지닌 노드들로 구성됨
- 좌우 서브 트리는 이진 탐색 트리임

전순서(Totally Ordered Set)란 어떤 값들로 이루어진 집합에서 임의의 두 값을 선택했을 때 그 값들을 비교할 수 있는 집합을 의미합니다.
{: .notice--info}

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-03T14:52:55.445Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;XB5Hk7NDXyR6F6lVfUbY\&quot; version=\&quot;20.2.2\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;wZXT4xgjHuS1a3lyYguk\&quot; name=\&quot;그림 1. 이진 탐색 트리 개요\&quot;&gt;7Vxtk6I4EP41flwLkvD2cZxZb+qqtmqr5l7mPm1lJQp1CB7E1dlff4kENAmjyArRXfkwJQ000P30k+5OmBF8XG5/y/Eq+pSFJBkBK9yO4NMIAOQg9pcL3kqBE9ilYJHHYSk6ELzE34kQWkK6jkNSSCfSLEtovJKFsyxNyYxKMpzn2UY+bZ4l8l1XeEE0wcsMJ7r07zikUSn1gbeXP5N4EVV3tt2gPLLE1cniTYoIh9nmQAQ/juBjnmW0/LXcPpKE266yS3nd9J2j9YPlJKVtLvgEvqI8e5650Rcw//P3D/9Ziz8+CC3fcLIWL/wgnpa+VSZgapi12c5kE8WUvKzwjB/ZMH8zWUSXCduz2U9crEoXzOMtYXedzOMkecySLGeyNEu5ioLm2b+kEo4AtHYbPzlL6YG83IRc4ML22b54YpJTsn3XFHZtYAZMki0Jzd/YKeKCGl0ClLYv9jd7FztCFB14t5JhAapFrXlvd/ZDmP4MNwDNDZNfwA22K7uBPYVZN0DNDa+/gBvUaACmo8HR3KB7IQ0fOLuzvVmCiyKeycbPs3Uacqs/cWOys4XNYJPRp1Nh3PI2JNSGBMWU7FGydT4jp4mV4nxB6KnI113T0vQ5STCNv8mP2+QPcYfPWcxeZO95JHseBopLy9cUVx2OLYoiW1GEkKKotIOmaAeP+rW7I8a9dsSY8jB01JHO6eZhCE8o6tnDnubhWRSzXA5YCSkKHmkRTveWV73P2JEq9JzEi5T9TsicH+EMGrO070GIl3EY8osnOSni7/jrThFHxoq/4e6dncnIeeKa1jQrBCVrYBFE38D9czaOPAulF2BxzdOezuJ1mB4iDfZF48HAQcm36fQGgxLYFwpKTVHPQVklDg1RucgJpiS/B6bubashMJvQ1ltg2nq5cWWR2TbBMpY4BYpPVV+1jWDgKYoGTpxsveQ5BgURISEuop3vbRkUXP4ZUxb36U4CrD0cqu4JOAGeaydvzWNuR9dDtexSFfXtejQwC9RJM3Nk/vbKLxo71e4/tQ6287SV9t4kMm7DHifLLrMQUvoedlcIAccZQ8eBrG5zAghcz5H1OmjsIuS6VoAs14Ng4OzgvDr+zi0at9hqi6Urt2iK+nb90AV5HxkGaMkl0CRk1B4qBB0hY3veGO5KCuRZELrAl/VC+TAcFk96+T/QWHVpPBnDidKhA51bfWo5oyrqGwr+fVQ50/VAoQi7q+tVrlEV9e36oTtKfbAAbDmqHMwRm8CMUuBCv2uKaimKBi5wK+wfxYzZKT3xgD80k6o0Auue0wFaYANaemsxgTZ9hds3uwruwLTZ29T0t292dRwybvY2le7Nm10pTus5XmNWb1Nk3rzV67VJV2P2NrXY7ZsdXJvZz6t7rjP5rYx6Ovs12lQBasXUPftFY9+1HQgC4HmBizxl4PLHrov8wPdYnsySOE++Td+58c9QT4HWBZVjElJKyoK6tumQCii55Y+gUURBfT1xv4jqpe/bmqSQUZJSIWV1JSmvsbVbqbVNNn4h+BkA1ZqivGsa9VDXPiGAR6cSEDCKqPNWPFwpolBbRLlGEaUuC+6MKOcoRRmdm4Itei4yYE7UREfqHb04kiY2Rj9e9yizO7Ch7Kkr0kPE1MtNL/9Rhl7mM/Mt+ZrfEXDxklsvobu3t/TPNd5fXzhjFiHMkiZWGLK6dYqXccKt/BfJQ5zikfxtB+qnQ4kavu0Ihixj4dAzuX3Qr9HiVF30Cy+1SAQOvAANtuho3A5xqun4NTCnXt+/NrGmoNM7c0rLti2lsjbNnBWe7gsfujIlAmjs+NZ+Qx2JU50JOaG3Zx5FetNlcvXJUUjmeL17su5RfmkKVxf1NzC4O2jE682PRv7WP9m/O1bOgpGyMLqByy/kWba7/5cOZYTv/y8G/Pg/&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 1. 이진 탐색 트리 개요&gt;
{: style="text-align: center;"}

## 3. 이진 탐색 트리의 순회(Traversal)
이진 탐색 트리를 순회할 때는 중위 순회(In-order traversal) 방식을 사용합니다. 중위 순회를 통해 이진 탐색 트리 내 모든 값들을 **정렬된 순서대로 읽을 수 있습니다**.

<div class="mxgraph" style="max-width:100%; margin:auto;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;lightbox&quot;:false,&quot;nav&quot;:true,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-08-03T14:56:25.798Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36\&quot; etag=\&quot;n5n8mBnTpwMJppob6K4Z\&quot; version=\&quot;20.2.2\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;1XHMf9NUw31pxRIcKKfj\&quot; name=\&quot;그림 2. 이진 탐색 트리를 중위 순회 시 1, 3, 5, 7, 8, 10\&quot;&gt;5Vhbb9s2GP01BraHGLyIFPWYOHWMbt26ZVmLvBSqRcvCZNGV6Njerx9vom7u4gYO3CZ+sMXzUaR0LpToEZ6sdjdlvF6+EwnPRwgkuxG+HiEUkEB9a2BvARJBC6RlllioBdxm/3IHAodusoRXnY5SiFxm6y44F0XB57KDxWUptt1uC5F3Z13HKR8At/M4H6IfskQuLcpQ2OAznqXLemZII1tZxXVndyfVMk7EtgXhNyM8KYWQ9mi1m/Bcc1fzYs+bfqXqL6zkhTzmhPz+E5ttHt6u7z5c//XHzdtf93fZhRvlIc437obdjVVyX1OghlFsq8bVdplJfruO57qyVXorbClXuWpBdRhXayvBIttxNevVIsvzichFqbBCFHqISpbiH16DI4SB+ejOopAt3H4c7nwBmWq7K+al5LuvUgE9wcqYXKy4LPeqizvBa+JMGbnmtlGYOGjZErfGYuep1A/c0K4OHPPfoAIaqIBHiOZS87WOi44c9MtGO+Zqbqm6VMUy/Rz/pK5NTQ56Pz8bwoDm8GIRr7J8b09ZiUJUVkhfrwzJugrWO4sriuVFnGdpYQuVjEtpSvVlqKPU/pL+IkAUAxo1FvetmhFiOFHItT7WghBNAlFEPtYX+r615k8aBjXDWOZ9JWwqlnhfqbOggHYadN3kQeMmERqBpulSoQGbCw02ydC4yYaG2+mo56wTYk7zGfFVl5O6apJiJmcGa92jTcwxLPqSJ7DJENEpajiEDeNg38JZC7ex8jXSKrl4HaypmHk8bc3fl9c0vcZtsOs8129gURs0FVybtdrPL34VhGF3FYTkzMsgHiyD8DXIALsy+IfTuWQIBjKQ1yBD9J3JQAYysFcgA6Lf2aJEh4sSeAU6YHC+OMDP9+QG3F7+NsFX93/O/t4WaHZgpzJUoUgu9ZZPteZ5XFXZvEt+KTZFolm/1mSq3o4zfIh0/ZlOPZk8GewTe1SqSxGbcs4f322pl+iUy8eiP5TmSOpLnscye+he7iE93AzvRaZf/rzyDI1pGFIaERRRisOODzDuCWxv2o3R3n72hjVvhO1gh72BLCuDgYxZPAlP989wj/W8/plOXTjP4B90Tv+gKBxjY5QgBBhT3PUPO5F/8OFpTu+mj7/MwBf48fdLAj69W93dLN6j/YtYjdCRbgrO6qYgHDOKWBREMACQhUFvOYJjAmmkdnKqR0Ce6C3ce9j1n2LP7KaXsDYd6yZ8VjdBNgaMMEghZkEUEXaih1vvbQkTbUsAMQUBJbTvy2e203Af/eMtTuRIO9Fz2gmD/12cED3F4oQRGEMUMqYMhUISou4cYTRWkwcQ0JAB9cZ2KquN3N9nre7NH2f4zX8=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
&lt;그림 2. 이진 탐색 트리를 중위 순회 시 1, 3, 5, 7, 8, 10&gt;
{: style="text-align: center;"}

## 4. 이진 탐색 트리의 기능(Operations)
이진 탐색 트리의 핵심 연산은 검색(find), 삽입(insert), 삭제(erase) 세 가지가 있습니다.

```cpp
#include <iostream>
#include <vector>

using namespace std;

template <class T>
class Node {
public:
    T val;
    Node* left = NULL;
    Node* right = NULL;
    
    bool operator<(const Node& rhs) const {
        return val < rhs.val;
    }

    Node(T val) {
        this->val = val;
    }
};

template <class T>
class BinarySearchTree {
private:
    Node<T>* getPredecessor(Node<T>* cur) {
        Node<T>* node = cur->left;

        while (node->right != NULL) {
            node = node->right;
        }

        return node;
    }

    Node<T>* eraseRecursive(Node<T>* cur, const T& val) {
        if (cur == NULL)
            return NULL;
        
        if (val < cur->val) {
            cur->left = eraseRecursive(cur->left, val);

        }
        else if (cur->val < val)
            cur->right = eraseRecursive(cur->right, val);
        else {
            if (cur->left == NULL) {
                Node<T>* right = cur->right;
                free(cur);
                return right;
            }
            
            if (cur->right == NULL) {
                Node<T>* left = cur->left;
                free(cur);
                return left;
            }

            Node<T>* predecessor = getPredecessor(cur);
            cur->val = predecessor->val;
            cur->left = eraseRecursive(cur->left, predecessor->val);
        }

        return cur;
    }

    void inOrderTraversalRecursive(Node<T>* cur) {
        if (cur->left != NULL)
            inOrderTraversalRecursive(cur->left);

        cout << cur->val << " ";

        if (cur->right != NULL)
            inOrderTraversalRecursive(cur->right);
    }

public:
    Node<T>* root = NULL;

    BinarySearchTree() {}

    void insert(T val) {
        if (root == NULL) {
            root = new Node(val);
            cout << val << " inserted\n";
            return;
        }

        Node<T>* cur = root;
        bool isInserted = false;

        while (!isInserted) {
            if (val <= cur->val) {
                if (cur->left == NULL) {
                    cur->left = new Node(val);
                    isInserted = true;
                } else {
                    cur = cur->left;
                }
            } else {
                if (cur->right == NULL) {
                    cur->right = new Node(val);
                    isInserted = true;
                } else {
                    cur = cur->right;
                }
            }
        }

        cout << val << " inserted\n";
    }

    void erase(T val) {
        eraseRecursive(root, val);
        cout << val << " erased\n";
    }

    Node<T>* find(T val) {
        Node<T>* cur = root;
        
        while (cur != NULL) {
            if (val < cur->val) {
                cur = cur->left;
            } else if (cur->val < val) {
                cur = cur->right;
            } else {
                return cur;
            }
        }

        return NULL;
    }

    void inOrderTraversal() {
        if (root == NULL) {
            cout << "\n";
            return;
        }

        inOrderTraversalRecursive(root);
        cout << "\n";
    }
};

void print(vector<int>& v) {
    for (int e: v) {
        cout << e << " ";
    }
    cout << "\n";
}

int main() {
    BinarySearchTree<int> bst;

    bst.insert(1);
    bst.inOrderTraversal();
    bst.insert(3);
    bst.inOrderTraversal();
    bst.insert(5);
    bst.inOrderTraversal();
    bst.insert(7);
    bst.inOrderTraversal();
    bst.insert(2);
    bst.inOrderTraversal();
    bst.insert(6);
    bst.inOrderTraversal();
    bst.insert(4);
    bst.inOrderTraversal();

    bst.erase(3);
    bst.inOrderTraversal();
    bst.erase(8);
    bst.inOrderTraversal();

    return 0;
}
```

```txt
1 inserted
1
3 inserted
1 3
5 inserted
1 3 5
7 inserted
1 3 5 7
2 inserted
1 2 3 5 7
6 inserted
1 2 3 5 6 7
4 inserted
1 2 3 4 5 6 7
3 erased
1 2 4 5 6 7
8 erased
1 2 4 5 6 7
```

## A. 참조
ratsgo, "이진탐색트리(Binary Search Tree)," *Github.io*, Oct. 22, 2017. [Online]. Available: [https://ratsgo.github.io/data%20structure&algorithm/2017/10/22/bst/](https://ratsgo.github.io/data%20structure&algorithm/2017/10/22/bst/) [Accessed Aug. 4, 2022].

Wikipedia, "이진 탐색 트리," *wikipedia.org*, Feb. 26, 2022. [Online]. Available: [https://ko.wikipedia.org/wiki/이진_탐색_트리](https://ko.wikipedia.org/wiki/이진_탐색_트리) [Accessed Aug. 3, 2022].
