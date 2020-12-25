from django.urls import path

from . import views

app_name = 'controlqueue'

urlpatterns = [
	path('', views.restrict, name='restrict'),
	path('notice_admin_only/', views.notice_admin_only, name='notice_admin_only')
]
