from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def upload_file(request, **kwargs):
    return Response("Working upload")


@api_view(['GET'])
def fetch_file(request, **kwargs):
    return Response("Working fetch")
