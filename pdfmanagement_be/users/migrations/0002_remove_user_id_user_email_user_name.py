# Generated by Django 4.2.3 on 2023-07-05 08:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='id',
        ),
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.EmailField(default='DUMMY_EMAIL', max_length=254, primary_key=True, serialize=False),
        ),
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.TextField(default='XYZ', max_length=80),
        ),
    ]
