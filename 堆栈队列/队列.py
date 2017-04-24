#encoding:utf-8

__autor__ = 'Astro'

'''
先进先出

可以使用python中的collections.deque来实现队列。
ENQUEUE相当于deque.append(),
DEQUEUE相当于deque.popleft()
'''

class UNDERFLOW(Exception):pass # 下溢
class OVERFLOW(Exception):pass # 上溢

class Queue(object):
    def __init__(self,size):
        self.head = self.tail = 0
        self.S = [0 for _ in range(0,size)]
        self.size = size
    # 判断队列是否已满
    QUEUE_FULL = lambda self: self.head == (self.tail+1)%self.size
    # 判断队列是否为空
    QUEUE_EMPTY = lambda self: self.head == self.tail
    # 入队
    def ENQUEUE(self, x):
        if self.QUEUE_FULL(): raise OVERFLOW("the queue is full")
        self.S[self.tail] = x
        print 'tail:', self.tail
        print 'size:', self.size
        self.tail = (self.tail+1) % self.size
    # 出队
    def DEQUEUE(self):
        if self.QUEUE_EMPTY(): raise UNDERFLOW("the queue is empty")
        x = self.S[self.head]
        print self.head
        self.head = (self.head+1) % self.size
        return x


if __name__ == '__main__':

    testClass = Queue(4)
    testClass.ENQUEUE(6)
    print testClass.S

    testClass.ENQUEUE(7)
    print testClass.S

    print testClass.DEQUEUE()
    print testClass.S

    print testClass.DEQUEUE()
    print testClass.S