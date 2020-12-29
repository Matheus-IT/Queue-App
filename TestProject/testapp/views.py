from django.shortcuts import render


def index(request):
	from controlqueue.consumers import QueueConsumer
	
	ROOM_NAME = QueueConsumer.GROUP_NAME
	return render(request, 'testapp/index.html', { 'room_name': ROOM_NAME })
