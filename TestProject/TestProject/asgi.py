import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import controlqueue.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TestProject.settings')

application = ProtocolTypeRouter({
	'http': get_asgi_application(),
	'websocket': AuthMiddlewareStack(
		URLRouter(controlqueue.routing.websocket_urlpatterns)
	)
})
