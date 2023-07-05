from django.urls import path
from users.views import create_user,login_user

urlpatterns = [
    path('signup', create_user),
    path('login' , login_user)
]
