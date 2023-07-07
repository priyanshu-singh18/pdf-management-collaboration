from django.db import models
from django.contrib.auth.models import AbstractUser

class UserModel(AbstractUser):
    id = models.AutoField(primary_key=True, unique=True,null=False)
    name = models.CharField(max_length=80, null=False, default="XYZ",blank=False)
    username = models.EmailField(
 null=False, default="DUMMY_EMAIL",unique=True,blank=False)
    password = models.CharField(max_length=256, blank=True)

    USERNAME_FIELD = 'username'
    PASSWORD_FIELD = 'password'

    def __str__(self):
        return self.username
