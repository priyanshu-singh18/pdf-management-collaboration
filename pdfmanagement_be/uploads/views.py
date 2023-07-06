from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser
from uploads.models import Upload

@api_view(['POST'])
def upload_file(request, **kwargs):
    parser_classes = [MultiPartParser, FileUploadParser, FormParser]
    file = request.FILES['uploaded_file']
    file= file.read()
    print(type(file))
    dummy_email = "trialupload@email.com"

    op = Upload.objects.create(uploaded_by = dummy_email , uploaded_file = file)
    return Response("Working upload")


@api_view(['GET'])
def fetch_file(request, **kwargs):
    return Response("Working fetch")
