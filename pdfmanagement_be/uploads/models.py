from django.db import models
from datetime import datetime
from users.models import UserModel

class Upload(models.Model):
    file_id = models.AutoField(primary_key=True, unique=True,null=False)
    file_name = models.CharField(default="PDF File",max_length=120)
    file_description = models.TextField(default="A short description about PDF File")
    uploaded_file = models.BinaryField(verbose_name='Uploaded File', blank=False)
    uploaded_by_id = models.ForeignKey("users.UserModel", on_delete=models.CASCADE)
    uploaded_by_email = models.EmailField(null=False,default="DUMMY_EMAIL",blank=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.file_id)


class Comments(models.Model):
    comment_id = models.AutoField(primary_key=True)
    parent_id = models.ForeignKey('self' , null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    content = models.TextField()
    post = models.ForeignKey('Upload' , on_delete=models.CASCADE)
    author = models.ForeignKey('users.UserModel',on_delete=models.CASCADE)
    author_email = models.EmailField(null=False,default="DUMMY_EMAIL",blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)