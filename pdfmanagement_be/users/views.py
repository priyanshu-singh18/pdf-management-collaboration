from users.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
# Create your views here.


@api_view(['POST'])
def create_user(request, **kwargs):
    print(request.data)
    passw = request.data['password']
    # print(make_password(passw))
    try:

        User.objects.create(
            name=request.data['name'], email=request.data['email'], password=make_password(passw))
        return Response("Object Created")
    except:
        return Response("Error in Creating User")


@api_view(['POST'])
def login_user(request, **kwargs):
    email = request.data['email']
    passw = request.data['password']
    user = User.objects.get(pk=email)
    # print(user.password)
    if not user:
        return Response("User Doesnt Exist")
    flag = check_password(password=passw, encoded=user.password)
    # print(flag)
    if not flag:
        return Response("Incorrect Email or Password")
    return Response("Logged In")
