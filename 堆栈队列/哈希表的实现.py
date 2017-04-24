#encoding: utf-8

'''
处理冲突的方法是开放地址法，冲突表达式为Hi=（H（key）+1）mod m，m为表长。
'''

#实现哈希表（线性地址再散列）

def ChangeKey(key, m, di):
    key01 = (key +di) % m
    return key01

a = raw_input("请输入数值:\n").split()

m = len(a)

dict01 = {}

for i in a:
    print i

    key = int(i) % m

    if "%s" % key in dict01:
        NewKey = ChangeKey(key, m, 1)
        while "%s" % NewKey in dict01:
            # 因为下面的dict01的key值是以字符串来保存，因此这里作判断时也要用字符串格式
            NewKey = ChangeKey(NewKey, m , 1)
        dict01["%s" %NewKey] = int(i)
    else:
        dict01["%s"%key] = int(i)

print dict01



