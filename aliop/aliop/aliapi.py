

import requests
import json
import pytz
import time,datetime
import random

fca = "aliop/certFiles/ca.pem"
fcert = "aliop/certFiles/cert.pem"
fkey = "aliop/certFiles/key.pem"

wl_public_ip_ofali = "120.27.119.220"
wl_delete_after = 60*60*2

compose_wallet_template = """
wallet:
  restart: always
  ports:
    - '%s:22/tcp'
    - '%s:8000/tcp'
    - '%s:8545/tcp'
  expose:
    - 22/tcp
    - 8545/tcp
    - 8000/tcp
  labels:
    aliyun.scale: '1'
  image: %s
  environment:
    - PUBLICIP=%s
    - WEBPORT=%s
    - ETHPORT=%s
"""
compose_poc_template = """
poc:
  restart: always
  ports:
    - '%s:8080/tcp'
  expose:
    - 22/tcp
    - 8545/tcp
    - 8080/tcp
  labels:
    aliyun.scale: '1'
  image: %s
"""
#need supply instance name , image name , container number, networkid
compose_privatenet_template = """
wl-ethereum-bootnode:
  command:
    - '-nodekey=boot.key'
  entrypoint:
    - /usr/bin/bootnode
  expose:
    - 30301/udp
  image: '%s'
  labels:
    aliyun.scale: '1'
  restart: always
wl-ethereum-miner:
  entrypoint:
    - /usr/bin/create_prnet.sh
  expose:
    - 30303
    - 8545
  image: '%s'
  labels:
    aliyun.scale: '%d'
  environment:
    - NETWORKID=%s
  restart: always
wl-admin:
  image: '%s'
  environment:
    - NETWORKID=%s
    - PUBLICIP=%s
    - ETHPORT=%s
  ports:
    - "%s:22"
    - "%s:8080"
    - "%s:8545"
"""

# registry.cn-hangzhou.aliyuncs.com/wanglutech/ubun_eth_ssh_curl_node_wallet_ali:6.4
compose_standalone = """
wl:
  environment:
    - INSNAME=%s
  image: '%s'
  ports:
    - "%s:22"
    - "%s:8000"
"""
def utc_to_local(utc_time_str, utc_format='%Y-%m-%dT%H:%M:%S'):
    local_tz = pytz.timezone('Asia/Chongqing')
    local_format = "%Y-%m-%d %H:%M:%S"
    utc_dt = datetime.datetime.strptime(utc_time_str, utc_format)
    local_dt = utc_dt.replace(tzinfo=pytz.utc).astimezone(local_tz)
    local_str = local_dt.strftime(local_format)
    return local_str

default_app_instances = ["acslogging", "acsmonitoring", "acsrouting", "acsvolumedriver", "baas-deploy"]
#hide default application name
def get_cluster_instance_list():
    res = requests.get("https://master4g2.cs-cn-qingdao.aliyun.com:17234/projects/?instances=0&containers=0", verify=fca, cert=(fcert, fkey))
    data = json.loads(res.content)
    cluster_instance = []
    for it in data:
        if it["name"] in default_app_instances:
            continue
        cluster_instance.append(it["name"])

    return cluster_instance
def get_cluster_instance_all():
    ins_list = get_cluster_instance_list()
    appall = []
    for it in ins_list:
        myins = list_one_obj(it)
        appall.append(myins)
    return appall
def wl_get_cluster_instance_all():
    global wl_delete_after
    ins_list = get_cluster_instance_list()
    appall = []
    for it in ins_list:
        myins = list_one_obj(it)
        created_time = time.mktime(time.strptime(myins["created"], '%Y-%m-%d %H:%M:%S'))
        todelete_time = time.localtime(created_time+wl_delete_after)
        str_delete_time = time.strftime('%Y-%m-%d %H:%M:%S', todelete_time)
        myins["delete_at"] = str_delete_time
        appall.append(myins)
    return appall

def get_cluster_instance_detail(name):
    res = requests.get("https://master4g2.cs-cn-qingdao.aliyun.com:17234/projects/%s" %(name), verify=fca, cert=(fcert, fkey))
    if(res.status_code != 200):
        return ""
    data = json.loads(res.content)
    return data

def stop_cluster_instance(name):
    res = requests.post("https://master4g2.cs-cn-qingdao.aliyun.com:17234/projects/%s/stop" %(name), verify=fca, cert=(fcert, fkey))
    print res

def start_cluster_instance(name):
    res = requests.post("https://master4g2.cs-cn-qingdao.aliyun.com:17234/projects/%s/start" %(name), verify=fca, cert=(fcert, fkey))
    print res

def delete_cluster_instance(name):
    stop_cluster_instance(name)
    res = requests.delete("https://master4g2.cs-cn-qingdao.aliyun.com:17234/projects/%s" %(name), verify=fca, cert=(fcert, fkey))
    print res

def destroy_cluster_instance_all(filter="wl-prefix"):
    if(filter == ""):
        return
    ins_list = get_cluster_instance_list()
    for it in ins_list:
        if it.startswith(filter):
            stop_cluster_instance(it)
            delete_cluster_instance(it)

def create_cluster_instance_poc(name, poc_port="8080",images='registry.cn-hangzhou.aliyuncs.com/wanglutech/df_poc:1.1', description=""):
    compose_poc = compose_poc_template %(poc_port, images)
    return create_cluster_instance(name, compose_poc,description)
def create_cluster_instance_wallet(name, ssh_port='22',web_port="8000",eth_port="8545", image='registry.cn-hangzhou.aliyuncs.com/wanglutech/df_wallet:1.1', description=""):
    global wl_public_ip_ofali
    compose_wallet = compose_wallet_template %(ssh_port, web_port, eth_port,image,wl_public_ip_ofali,web_port,eth_port)
    return create_cluster_instance(name, compose_wallet, description)

def create_cluster_instance(name,template, description=""):
    param = {}
    param["name"] = name
    param["description"] = description
    param["template"] = template
    param["version"] = "1.0"
    jdata = json.dumps(param)
    res = requests.post("https://master4g2.cs-cn-qingdao.aliyun.com:17234/projects/", verify=fca, cert=(fcert, fkey),data=jdata)
    return res
    #print res.content


def create_cluster_instance_privatenet(name, ssh_port="22", web_port="80",eth_port="8545", \
        networkid="789651234", miner_number=2, description="", \
        image_eth="registry.cn-hangzhou.aliyuncs.com/wanglutech/df_ethereum:2.2", \
        image_app = "registry.cn-hangzhou.aliyuncs.com/wanglutech/df_admin:1.6"):
    global wl_public_ip_ofali
    compose_privatenet = compose_privatenet_template %(\
        image_eth, image_eth, miner_number, networkid, \
        image_app, networkid,wl_public_ip_ofali,eth_port, ssh_port, web_port, eth_port)
    return create_cluster_instance(name, compose_privatenet,description)


def list_one_obj(insname):
    content = get_cluster_instance_detail(insname)
    if not content:
        return {}
    cservices = content["services"]
    myins = {}
    myins["name"] = insname
    myins["created"] = utc_to_local(content["created"].split('.')[0])
    myins["current_state"] = content["current_state"]
    myins["description"] = content.get("description", "")
    myins["services"] = []
    running_containers = 0
    stop_containers = 0
    for item in cservices:
        my_service = {}
        my_service["name"] = item["name"]
        my_service["current_state"] = item["current_state"]
        my_service["image"] = item["definition"]["image"]
        my_service["containers"] = []
        my_containers = item.get("containers",[])
        for key in my_containers:
            container = {}
            container["name"] = my_containers[key]["name"][1:]
            container["node"] = my_containers[key]["node"]
            container["status"] = my_containers[key]["status"]
            if "running" == container["status"]:
                running_containers += 1
            else:
                stop_containers += 1
            container["ip"] = my_containers[key]["ip"]
            container["ports"] = ""
            ports = my_containers[key]["ports"]
            for pubport in ports:
                if ports[pubport]:
                    container["ports"] += "%s->%s " %(pubport, ports[pubport][0]["host_port"])
            my_service["containers"].append(container)
        myins["services"].append(my_service)
        myins["running_containers"] = running_containers
        myins["stop_containers"] = stop_containers
    return myins

def check_port_isfree(port):
    ins_list = get_cluster_instance_list()
    for insname in ins_list:
        insobj = list_one_obj(insname)
        try:
            for service in insobj["services"]:
                for containers in service:
                    for container in containers:
                        portpair = container["ports"]
                        for priport in portpair:
                            if port == portpair[priport]:
                                return False
        except:
            continue

    return True
def generate_free_port(min, max):
    for i in range(1,100):
        tport = random.randint(min,max)
        if check_port_isfree(tport):
            return str(tport)
    return ""
def generate_networkid():
    return str(int(time.time()))

def generate_free_insname(prefix):
    for i in range(1,100):
        suffix = random.randint(10000,90000)
        tname = prefix+str(suffix)
        if get_cluster_instance_detail(tname) == "":
            return tname
    return ""

def generate_free_port(min, max):
    for i in range(1,100):
        tport = random.randint(min,max)
        if check_port_isfree(tport):
            return str(tport)
    return ""