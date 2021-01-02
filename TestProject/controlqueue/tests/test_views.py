from django.test import TestCase
from django.urls import reverse
from testapp.models import User

APP_NAME = 'controlqueue'

class Restrict(TestCase):
	def setUp(self):
		self.my_admin = User(username='user_test', is_staff=True, is_superuser=True)
		self.my_admin.set_password('12345')
		self.my_admin.save()

	def test_get_as_anonymous_user(self):
		self.client.login(username='user_test', password='12345')
		response = self.client.get(reverse(f'{APP_NAME}:restrict'))

		self.assertEqual(response.status_code, 200)
