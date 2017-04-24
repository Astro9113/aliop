#encoding:utf-8

class ListNode:
    def __init__(self, x):
        self.val=x
        self.next = None

def recurse(head, newHead):
    '''
    :param head: 原链表的头结点
    :param newHead: 反转后链表的头结点
    :return: newHead
    '''
    if head is None:
        return
    if head.next is None:
        newHead = head
    else:
        newHead=recurse(head.next, newHead)
        head.next.next=head
        head.next=None
    return newHead

if __name__ == '__main__':
    head = ListNode(1)
    p1 = ListNode(2)
    p2 = ListNode(3)
    p3 = ListNode(4)

    head.next = p1
    p1.next = p2
    p2.next = p3

    newHead = None
    p=recurse(head, newHead)
    while p:
        print 'p.val ', p.val
        p=p.next