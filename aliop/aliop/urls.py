from django.conf.urls import url

from . import views

urlpatterns = [
url(r'^test/$', views.test, name='test'),

    url(r'^$', views.listall, name='listall'),
    url(r'^listall$', views.listall, name='listall'),
    url(r'^display_service/(.*)$', views.display_service, name='display_service'),
    url(r'^display_container/(.*)$', views.display_container, name='display_container'),

    url(r'^create$', views.create_instances, name='create_instances'),
    url(r'^create/poc$', views.create_instance_poc, name='create_instance_poc'),
    url(r'^create/wallet$', views.create_instance_wallet, name='create_instance_wallet'),
    url(r'^create/privatenet$', views.create_instance_privatenet, name='create_instance_privatenet'),
    url(r'^destroy_instances/$', views.destroy_instances, name='destroy_instances'), #TODO: hide this, because it's only for test
    url(r'^signup/$', views.signup, name='signup'),
    url(r'^login/$', views.login, name='login'),
    url(r'^skip/$', views.skip, name='skip'),
    url(r'^logout/', views.logout, name='logout'),
    url(r'^analysis_signup_user', views.analysis_signup_user, name='analysis_signup_user'),
    url(r'^analysis_operation_record', views.analysis_operation_record, name='analysis_operation_record'),
    url(r'^start/(.*)$', views.start, name='start'),
    url(r'^stop/(.*)$', views.stop, name='stop'),
    url(r'^delete/(.*)$', views.delete, name='delete'),

    # url(r'^status/(.*)$', views.status, name='status'),

]