from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FileUploadParser, FormParser
from uploads.models import Upload,Comments
from users.models import UserModel
from django.core import serializers
from django.http import HttpResponse
import base64,json
import requests

import json

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_file(request, **kwargs):
    parser_classes = [MultiPartParser, FileUploadParser, FormParser]
    # print(request.FILES)
    file = request.FILES['file']
    # print(file.content_type)
    file= file.read()
    # print(type(file))
    
    dummy_email = request.user
    print({"email": dummy_email.username})
    user = UserModel.objects.get(username = dummy_email.username)
    Upload.objects.create(uploaded_by_id = user , uploaded_file = file ,uploaded_by_email = dummy_email.username)
    # print(user)
    return Response("Working upload")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_file(request, **kwargs):
    user_email = request.user
    data = Upload.objects.filter(uploaded_by_email = user_email)
   
    # data[0].__dict__['uploaded_file'] = data[0].__dict__['uploaded_file'].write('utf-8')
    # print(data[0].__dict__)
    responseList=[]
    for x in data:
        del x.__dict__['_state']
        file_data = x.__dict__['uploaded_file']
        data = base64.b64encode(file_data)
        x.__dict__['uploaded_file'] = data
        responseList.append(x.__dict__)
    # print(responseList)

    # with open(file_data, "wb") as f:
    #     f.write(base64.b64decode(data))
    # r = HttpResponse(body_contents, mimetype='application/pdf')

    return Response(responseList)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def shared_files(request, **kwargss):
    user_email = request.user.username
    
    if not user_email:
        return Response("Error in finding user")
    
    user = UserModel.objects.filter(username=user_email)
    
    response = []
    if user[0].access_shared_ids == None:
        return Response([]) 

    for file_id in user[0].access_shared_ids:
        obj = Upload.objects.get(file_id = file_id) 
        if not obj:
            continue
        del obj.__dict__['_state']
        data = base64.b64encode(obj.__dict__['uploaded_file'])
        obj.__dict__['uploaded_file'] = data
        response.append(obj.__dict__)

    return Response(response)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def share_file(request, **kwargss):
    user_email = request.user.username
    
    print(request.data)
    share_to = request.data['share_to']
    file_id = request.data['file_id']
    user = UserModel.objects.get(username = share_to)
    if not user:
        return Response("Error in finding user")
    
    user.access_shared_ids.append(file_id)
    
    user.save()
    print(user.access_shared_ids)

    
    return Response("Share Working")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_comment(request,**kwargs):
    # print(request.data)
    user_email = request.user.username
    # print(user_email)
    file_id = request.data.get('file_id')
    parent_id = request.data.get('parent_id', None)
    content = request.data.get('content')
    user = UserModel.objects.get(username = user_email)
    file = Upload.objects.get(file_id=file_id)
    comment = Comments(author=user,content=content,author_email = user_email,post=file)
    if parent_id is not None:
        comment.parent_id_id = parent_id
    comment.save()

    return Response("Comment Saved")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_comments(request,**kwargs):
    file_id= request.GET.get('file_id', '')
    print(file_id)
    comments = Comments.objects.filter(parent_id=None, post = file_id) 

    comment_list = []
    for comment in comments:
        comment_data = {
            'comment_id': comment.comment_id,
            'content': comment.content,
            'author': comment.author.username,
            'timestamp': comment.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            'replies': []
        }

        replies = Comments.objects.filter(parent_id=comment.comment_id) 
        for reply in replies:
            reply_data = {
                'comment_id': reply.comment_id,
                'content': reply.content,
                'author': reply.author.username,
                'timestamp': reply.timestamp.strftime('%Y-%m-%d %H:%M:%S')
            }
            comment_data['replies'].append(reply_data)

        comment_list.append(comment_data)

    return Response({'comments': comment_list})
