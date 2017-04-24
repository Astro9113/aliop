#encoding: utf-8

__autor__ = "Astro"

'''
先进后出

栈可以使用python的list来实现
PUSH:list.append(x)
POP:list.pop()

'''

class UNDEREFLOW(Exception) : pass #下溢

class OVERFLOW(Exception): pass #上溢

class Stack(object):
    def __init__(self, size):
        self.top = -1 #指向最新进入的元素
        self.S = [0 for _ in range(0, size)]
        self.size = size

    #测试一个栈是否为空
    STACK_EMPTY = lambda self: self.top == -1
    STACK_FULL = lambda self: self.top == self.size - 1

    #插入元素到栈顶
    def PUSH(self, x):
        if self.STACK_FULL():
            raise OVERFLOW("stack is full")
        self.top += 1
        self.S[self.top] = x

    #将栈顶元素删除并返回
    def POP(self):
        if self.STACK_EMPTY():
            raise UNDEREFLOW("stack is empty")
        x = self.S[self.top]
        self.top -= 1
        return x
