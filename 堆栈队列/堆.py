#encoding:utf-8

'''
优先队列

一个最大优先队列S支持以下操作：
INSERT(S, x)：把元素x插入集合S中。
MAXIMUM(S)：返回S中具有最大键值的元素
EXTRACT-MAX(S)：去掉并返回S中的具有最大键值的元素
INCREASE-KEY(S, x, k)：将元素x的关键字值增加到k，这里假设k的值不小于x的原关键字值。
'''


class UNDERFLOW(Exception): pass  # 下溢


class OVERFLOW(Exception): pass  # 上溢


class BADVALUE(Exception): pass  # 错误的值


# 最大堆
class Heap(object):
    def __init__(self, A):
        self.S = A[:]
        self.size = self.heap_size = len(A)
        self._BUILD_MAX_HEAP()

    PARENT = lambda self, i: i / 2  # 获得i的父结点下标
    LEFT = lambda self, i: 2 * i  # 获得i的左子树的根结点下标
    RIGHT = lambda self, i: 2 * i + 1  # 获得i的右子树的根结点下标

    def MAX_HEAPIFY(self, i):  # 维护最大堆
        left, right = self.LEFT(i), self.RIGHT(i)
        largest = left if left < self.heap_size and self.S[left] > self.S[i] else i
        largest = right if right < self.heap_size and self.S[right] > self.S[largest] else largest
        if largest != i:
            self.S[i], self.S[largest] = self.S[largest], self.S[i]
            self.MAX_HEAPIFY(largest)

    def _BUILD_MAX_HEAP(self):  # 构建最大堆
        for i in range(self.PARENT(self.size - 1), -1, -1):
            self.MAX_HEAPIFY(i)

    # 最大优先队列
    def INSERT(self, key):  # 插入key到堆中
        if self.heap_size >= self.size: raise OVERFLOW("the heap is full")
        self.heap_size += 1
        self.S[self.heap_size - 1] = float('-INF')
        self.INCREASE_KEY(self.heap_size - 1, key)

    def MAXIMUM(self):  # 获得堆中最大元素
        return self.S[0]

    def EXTRACT_MAX(self):  # 删除并返回堆中最大元素
        if self.heap_size < 1: raise UNDERFLOW("the heap is empty")
        max = self.S[0]
        self.S[0] = self.S[self.heap_size - 1]
        self.heap_size -= 1
        self.MAX_HEAPIFY(0)
        return max

    def INCREASE_KEY(self, i, key):  # 将下标为i的值增加到key值，维护最大堆
        if self.S[i] > key: raise BADVALUE("new key is smaller than current key")
        self.S[i] = key
        while i > 0 and self.S[i] > self.S[self.PARENT(i)]:
            self.S[i], self.S[self.PARENT(i)] = self.S[self.PARENT(i)], self.S[i]
            i = self.PARENT(i)