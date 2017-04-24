#!/usr/bin/env python
# encoding:utf-8

from django.shortcuts import render
from django import forms
from models import User,Record
from django.shortcuts import render,render_to_response
from django.http import HttpResponse,HttpResponseRedirect

from django.utils.safestring import SafeString

import aliapi
import json
import time
#from forms import *
anonymous_user = "Skip_Anonymous_Username"
cluster_ip = "120.27.119.220"


def test(request):
    Dict = [{'site': u'zixueketang', 'author': u'Astro'}, {'site': u'zixueketang2', 'author': u'zsun'}]

    return render_to_response('listall.html', {'Dict': Dict})


class record_operation(object):
    def __init__(self,func):
        self.func = func
    def __call__(self,request,*args):
        Record.objects.create(cur=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()), username=request.COOKIES.get("username", "First_Visit_Username"), method=request.method, url=request.path)
        return self.func(request,*args)
def generate_app_information(ssh_port="", web_port=""):
    global cluster_ip
    info = {}
    info["public_ip"] = cluster_ip
    info["ssh_port"] = ssh_port
    info["web_port"] = web_port
    return info
def handle_create_error(res,insname):
    info = {}
    if res.status_code / 100 != 2 and res.content and json.loads(res.content)["message"]:
        info["result"] = "failed"
        info["error_message"] = json.loads(res.content)["message"]
        return info

    time.sleep(3)
    ins = aliapi.get_cluster_instance_detail(insname)
    while ins["project_status_detail"]["action_status"] != "finished":
        time.sleep(1)
        ins = aliapi.get_cluster_instance_detail(insname)
    if ins["project_status_detail"].get("is_error", False):
        info["result"] = "error"
        info["error_message"] = ins["project_status_detail"]["error_containers"][0]["error_msg"]
        return info



@record_operation
def create_instance_poc(request):
    if request.method == 'POST':
        name = request.POST.get("name", "")
        desc = request.POST.get("desc", "")
        webport = request.POST.get("webport", "")
        res = aliapi.create_cluster_instance_poc(name, webport, description=desc)
        info = handle_create_error(res, name)
        if info:
            return render_to_response('instance_infor.html', {"info":info})
        else:
            info = generate_app_information(ssh_port="", web_port=webport)
            info["result"] = "success"
            return render_to_response('instance_infor.html', {"info":info})
    else:
        init = []
        init.append(("name", aliapi.generate_free_insname("wlpoc")))
        init.append(("desc",""),)
        init.append(("webport",aliapi.generate_free_port(10000, 19999)))
        return render_to_response('application_instance.html', {"init":init})

@record_operation
def create_instance_wallet(request):
    if request.method == 'POST':
        name = request.POST.get("name", "")
        desc = request.POST.get("desc", "")
        webport = request.POST.get("webport", "")
        sshport = request.POST.get("sshport", "")
        ethport = request.POST.get("ethport", "")
        res = aliapi.create_cluster_instance_wallet(name, sshport,webport,ethport, description=desc)
        info = handle_create_error(res, name)
        if info:
            return render_to_response('instance_infor.html', {"info":info})
        else:
            info = generate_app_information(ssh_port=sshport, web_port=webport)
            info["result"] = "success"
            return render_to_response('instance_infor.html', {"info":info})
    else:
        init = []
        init.append(("name", aliapi.generate_free_insname("wallet")))
        init.append(("desc",""),)
        init.append(("sshport",aliapi.generate_free_port(30000, 39999)))
        init.append(("webport",aliapi.generate_free_port(30000, 39999)))
        init.append(("ethport",aliapi.generate_free_port(30000, 39999)))
        return render_to_response('application_instance.html',{"init":init})

@record_operation
def create_instance_privatenet(request):
    if request.method == 'POST':
        name = request.POST.get("name", "")
        desc = request.POST.get("desc", "")
        webport = request.POST.get("webport", "")
        sshport = request.POST.get("sshport", "")
        ethport = request.POST.get("ethport", "")
        networkid = request.POST.get("networkid", "")
        res = aliapi.create_cluster_instance_privatenet(name, sshport,webport,ethport, networkid, description=desc)
        info = handle_create_error(res, name)
        if info:
            return render_to_response('instance_infor.html', {"info":info})
        else:
            info = generate_app_information(ssh_port=sshport, web_port=webport)
            info["result"] = "success"
            return render_to_response('instance_infor.html', {"info":info})
    else:
        init = []
        init.append(("name", aliapi.generate_free_insname("wlprn")))
        init.append(("desc",""))
        init.append(("networkid", aliapi.generate_networkid()))
        init.append(("sshport",aliapi.generate_free_port(20000, 29999)))
        init.append(("webport",aliapi.generate_free_port(20000, 29999)))
        init.append(("ethport",aliapi.generate_free_port(20000, 29999)))
        return render_to_response('application_instance.html',{"init":init})
def skip(request):
    global anonymous_user
    response = HttpResponseRedirect('/listall')
    response.set_cookie('username', anonymous_user, 3600 * 24)
    return response

def signup(request):
    if request.method == 'POST':
        username = request.POST.get("username", "")
        password = request.POST.get("password", "")
        email = request.POST.get("email", "")
        tel = request.POST.get("tel", "")
        User.objects.create(username= username,password=password, email=email,tel=tel)
        response = HttpResponseRedirect('/listall')
        response.set_cookie('username', username, 3600*24*100)
        return response
    else:
        return render_to_response('signup.html')

def login(request):
    if request.method == 'POST':
        username = request.POST.get("username", "")
        password = request.POST.get("password", "")
        user = User.objects.filter(username__exact=username, password__exact=password)
        if user:
            response = HttpResponseRedirect('/listall')
            response.set_cookie('username', username, 3600 * 24 * 100)
            return response
        else:
            return render_to_response('login.html',{'errors':'Username or Password is wrong, please try again.'})
    else:
        return render_to_response('login.html')

def logout(request):
    response = HttpResponseRedirect('/login')
    response.delete_cookie('username')
    return response

@record_operation
def listall(request):
    #check, if no cookie, redirect to signup
    username = request.COOKIES.get('username', '')
    if username == '':
        return HttpResponseRedirect('/signup')

    return render_to_response('listall.html', {'Dict': aliapi.wl_get_cluster_instance_all()})

@record_operation
def destroy_instances(request):
    if request.method == 'POST':
        prefix = request.POST.get("prefix", "")
        aliapi.destroy_cluster_instance_all(prefix)
        return HttpResponseRedirect('/listall')
    else:
        return render_to_response('destroy_instances.html')


@record_operation
def create_instances(request):
    if request.method == 'POST':
        apptype = request.POST.get("apptype", "")
        if apptype == "poc":
            return HttpResponseRedirect("create/poc")
        elif apptype == "wallet":
            return HttpResponseRedirect("create/wallet")
        elif apptype == "privatenet":
            return HttpResponseRedirect("create/privatenet")
        return HttpResponseRedirect('listall')
    else:
        return render_to_response('application_type.html')

def get_appone_json(ins_name):
    myins = aliapi.list_one_obj(ins_name)
    jsondata = json.dumps(myins, indent=2, sort_keys=True, ensure_ascii=False)
    return jsondata


@record_operation
def display_service(request,args):
    if "" == args:
        return HttpResponseRedirect('/listall')
    ins_name = args
    myins = aliapi.list_one_obj(ins_name)
    jsondata = json.dumps(myins, indent=2, sort_keys=True, ensure_ascii=False)
    # return HttpResponse(jsondata)

    return render_to_response('display_service.html', {'myins': myins})

@record_operation
def display_container(request,args):
    if "" == args:
        return HttpResponseRedirect('/listall')
    ins_name = args
    myins = aliapi.list_one_obj(ins_name)
    jsondata = json.dumps(myins, indent=2, sort_keys=True, ensure_ascii=False)

    return render_to_response('display_container.html', {'myins': myins})


@record_operation
def start(request,args):
    pro_name = request.GET['name']
    aliapi.start_cluster_instance(pro_name)
    return HttpResponseRedirect('/listall')

@record_operation
def stop(request,args):
    # print request.GET['name']
    pro_name = request.GET['name']
    # print 'args',args
    aliapi.stop_cluster_instance(pro_name)
    # return HttpResponse('{"status":"ok"}')
    return HttpResponseRedirect('/listall')

@record_operation
def delete(request,args):
    pro_name = request.GET['name']
    aliapi.delete_cluster_instance(pro_name)
    return HttpResponseRedirect('/listall')


def analysis_signup_user(request):
    objs = User.objects.all()
    return render_to_response('list_user.html',{'objs':objs})




def analysis_operation_record(request):
    username = request.GET.get("username", "")
    if username == "":
        objs = Record.objects.all()
    else:
        objs = Record.objects.filter(username=username)

    return render_to_response('list_record.html',{'objs':objs})

