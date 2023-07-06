from django.db import models
from datetime import datetime
from users.models import UserModel

class Upload(models.Model):
    file_id = models.AutoField(primary_key=True, unique=True,null=False)
    uploaded_file = models.BinaryField(verbose_name='Uploaded File', blank=False)
    uploaded_by = models.ForeignKey("users.UserModel", on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(null=False, default=datetime.now)

    def __str__(self):
        return str(self.file_id)
