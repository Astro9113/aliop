#encoding:utf-8

'''
函数内部调用自身
eg: fact(n) = n! = 1*2*3...*(n-1)*n = fact(n-1)*n

使用递归函数需要注意防止栈溢出
在计算机中，函数调用是通过栈（stack）这种数据结构实现的，
每当进入一个函数调用，栈就会加一层栈帧，
每当函数返回，栈就会减一层栈帧。由于栈的大小不是无限的，
所以，递归调用的次数过多，会导致栈溢出。可以试试fact(1000)
'''

def fact(n):
    if n == 1:
        return 1
    else:
        return fact(n-1)*n

#改进
def fact2(n):
    return fact_filter(n, 1)

def fact_filter(n, project):
    if n == 1:
        return project
    return fact_filter(n-1, n*project)


if __name__ == '__main__':
    print fact(5)
    # print fact(1000)
    print fact2(5)
    # print fact2(1000)