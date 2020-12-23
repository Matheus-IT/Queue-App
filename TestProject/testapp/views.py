from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test


def index(request):
	return render(request, 'testapp/index.html')

def admin_user(user):
	return user.is_superuser

@user_passes_test(admin_user, login_url='/admin/')
def restrict(request):
	return render(request, 'testapp/restrict.html')
