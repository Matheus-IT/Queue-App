from channels.generic.websocket import AsyncWebsocketConsumer


class QueueConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

	
	async def disconnect(self, close_code):
		pass
