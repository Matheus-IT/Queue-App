from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test

def admin_user(user):
	return user.is_superuser

@user_passes_test(admin_user, login_url='/admin/')
def restrict(request):
	return render(request, 'controlqueue/restrict.html')
