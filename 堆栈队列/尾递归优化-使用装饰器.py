#encoding: utf-8

import sys

class TailRecurseException:
    def __init__(self, args, kwargs):
        self.args = args
        self.kwargs = kwargs

def tailCallOptimized(g):
    def func(*args, **kwargs):
        #sys._getframe([depth]): 返回depth深度调用的栈帧对象.

        f = sys._getframe()

        # 为什么是grandparent, 函数默认的第一层递归是父调用,
        # 对于尾递归, 不希望产生新的函数调用(即:祖父调用),
        # 所以这里抛出异常, 拿到参数, 退出被修饰函数的递归调用栈!
        if f.f_back and f.f_back.f_back and f.f_back.f_back.f_code == f.f_code:
            '''
            sys._getframe().f_code.co_filename  # 当前文件名
            sys._getframe().f_code.co_name  # 当前函数名
            sys._getframe().f_lineno # 当前行号
            sys._getframe().f_back # 调用者的帧
            '''
            raise TailRecurseException(args, kwargs)
        else:
            while 1:
                try:
                    return g(*args, **kwargs)
                except TailRecurseException, e:
                    # 捕获异常, 拿到参数, 退出被修饰函数的递归调用栈
                    args = e.args
                    kwargs = e.kwargs

    func.__doc__ = g.__doc__
    return func

@tailCallOptimized
def factorial(n, acc=1):
    if n == 0:
        return acc
    return factorial(n-1, n*acc)

if __name__ == '__main__':
    print factorial(5)
    print factorial(10000)