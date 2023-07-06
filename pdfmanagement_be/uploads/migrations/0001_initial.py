# Generated by Django 4.2.3 on 2023-07-06 07:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Upload',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('uploaded_file', models.BinaryField(verbose_name='Uploaded File')),
                ('uploaded_by', models.EmailField(max_length=254)),
                ('uploaded_at', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
    ]
