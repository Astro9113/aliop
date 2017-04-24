import time

from aliapi import wl_get_cluster_instance_all,delete_cluster_instance

def get_list():

    task_list = wl_get_cluster_instance_all()

    leave_list = []
    for k in task_list:
        time_now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        if k['delete_at'] <= time_now:
            delete_cluster_instance(k['name'])
            print 'DELETE=>', k['name'] , 'SUCCESS'
        else:
            leave_list.append((k['name'], k['delete_at']))
            print 'NOT DELETE', k['name']

    return leave_list

test = get_list()

print test



