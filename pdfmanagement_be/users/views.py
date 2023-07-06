from users.models import UserModel
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password,make_password



@api_view(['POST'])
def signup(request):

    if request.method == 'POST':
        username = request.data['username']
        name = request.data['name']
        password = request.data['password']

        if UserModel.objects.filter(pk=username).exists():
            return Response({"message": "You are already Registered"}, status=status.HTTP_400_BAD_REQUEST)
        user = UserModel.objects.create(username=username,name=name)
        user.set_password(password)


        user.is_superuser=False        
        user.save()
        refresh = RefreshToken.for_user(user)

        return Response({"message": "Account created successfully", "Token" : str(refresh.access_token) ,"Refresh_Token" : str(refresh)}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):

    if request.method == 'POST':
        username = request.data['username']
        password = request.data['password']

        if UserModel.objects.filter(username=username).exists():
            user = UserModel.objects.get(username=username)
            haspassword = user.password
            if check_password(password, haspassword):
                user = authenticate(username=username, password=password)
                refresh = RefreshToken.for_user(user)
                return Response({
                    "message": "Login successfully",
                    "access": str(refresh.access_token),
                    "refresh": str(refresh)
                })
            else:
                return Response({"message":"Enter correct Password. Forgot?"})
        else:
            return Response({"message": "This username is not registered yet"}, status=status.HTTP_400_BAD_REQUEST)