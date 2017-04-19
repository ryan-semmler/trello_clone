from django.conf.urls import url
from . import views

# needs a router

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/tasks/$', views.view_all_tasks, name="tasks"),
    url(r'^api/tasks/(?P<detail_id>[0-9]+)/$', views.edit_task_detail),
    url(r'^api/tasks/(?P<detail_id>[0-9]+)/delete/$', views.delete_task),
    url(r'^api/tasks/create/$', views.new_task),
    url(r'^api/tasks/users/(?P<user_id>[0-9]+)/$', views.user_detail),
    url(r'^login/', views.login, name='login')
]
