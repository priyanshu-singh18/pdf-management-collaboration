from django.db import models
from django.contrib.auth.models import AbstractUser

class UserModel(AbstractUser):
    id = models.TextField(default=123)
    name = models.TextField(max_length=80, null=False, default="XYZ")
    username = models.EmailField(
        primary_key=True, null=False, default="DUMMY_EMAIL")
    password = models.TextField(max_length=256, blank=True)

    USERNAME_FIELD = 'username'
    PASSWORD_FIELD = 'password'

    def __str__(self):
        return self.username
