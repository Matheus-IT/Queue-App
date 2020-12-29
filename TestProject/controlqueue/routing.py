from django.urls import path

from . import consumers


websocket_urlpatterns = [
	path('ws/queue/', consumers.QueueConsumer.as_asgi()),
	path('ws/queue/<str:group_name>/', consumers.QueueConsumer.as_asgi()),
]
