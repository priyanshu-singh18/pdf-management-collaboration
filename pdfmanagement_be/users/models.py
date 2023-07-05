from django.db import models


class User(models.Model):
    name = models.TextField(max_length=80, null=False, default="XYZ")
    email = models.EmailField(
        primary_key=True, null=False, default="DUMMY_EMAIL")
    password = models.TextField(max_length=256, blank=True)
