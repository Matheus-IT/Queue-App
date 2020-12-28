from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Queue
import json


class QueueConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

		try:
			queue = await self.get_queue()
			print(queue)
			await self.send(text_data=json.dumps({
				'queueSize': queue.num_of_people
			}))
		except Exception as e:
			print(e)
	
	@database_sync_to_async
	def get_queue(self):
		try:
			queue =  Queue.objects.all()[0]
			if queue:
				return queue
		except IndexError:
			return Queue.objects.create(num_of_people=0)
	

	@database_sync_to_async
	def save_queue(self, queueObj):
		return queueObj.save()


	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		print(text_data_json['queue_size'])

		try:
			queue = await self.get_queue()
			queue.num_of_people = text_data_json['queue_size']
			await self.save_queue(queue)
		except Exception as e:
			print(e)

	
	async def disconnect(self, close_code):
		pass
