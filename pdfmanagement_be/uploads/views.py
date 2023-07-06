from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser
from uploads.models import Upload
from users.models import UserModel
import json

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_file(request, **kwargs):
    parser_classes = [MultiPartParser, FileUploadParser, FormParser]
    file = request.FILES['uploaded_file']
    file= file.read()
    # print(type(file))
    
    dummy_email = request.user
    # print(dummy_email)
    user = UserModel.objects.get(pk=dummy_email)
    Upload.objects.create(uploaded_by = user , uploaded_file = file)
    # print(user)
    return Response("Working upload")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_file(request, **kwargs):
    user_email = request.user
    data = Upload.objects.filter(uploaded_by = user_email)
    temp = data.values_list()
    print(temp)

    return Response("Working Fetch")
