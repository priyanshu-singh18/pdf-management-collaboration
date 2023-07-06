from django.db import models
from datetime import datetime

class Upload(models.Model):
    file_id = models.AutoField(primary_key=True, unique=True,null=False)
    uploaded_file = models.BinaryField(verbose_name='Uploaded File', blank=False)
    uploaded_by = models.EmailField(null=False,unique=False)
    uploaded_at = models.DateTimeField(null=False, default=datetime.now)
