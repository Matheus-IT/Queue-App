from django.urls import path
from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path('restrict/', views.restrict, name='restrict')
]
