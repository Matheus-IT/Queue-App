from django.urls import path

from . import views

app_name = 'controlqueue'

urlpatterns = [
	path('', views.restrict, name='restrict')
]
