from django.test import TestCase
from django.urls import reverse

from ..apps import ControlqueueConfig
from ..consumers import QueueConsumer

APP_NAME = ControlqueueConfig.name

class TestQueueConsumer(TestCase):
	GROUP_NAME = QueueConsumer.GROUP_NAME
	
	@classmethod
	def setUpTestData(cls):
		pass

	def setUp(self):
		pass

	async def test_connect_as_anonymous_user(self):
		response = await self.async_client.get(reverse(f'{APP_NAME}:queue_group', kwargs={'group_name': self.GROUP_NAME}))
		print(response)
		print(response.status_code)
