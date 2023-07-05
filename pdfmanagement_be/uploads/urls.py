from django.urls import path
from uploads.views import upload_file, fetch_file

urlpatterns = [
    path('upload', upload_file),
    path('fetch', fetch_file)
]
