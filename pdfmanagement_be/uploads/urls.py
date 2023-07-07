from django.urls import path
from uploads.views import upload_file, fetch_file, shared_files,share_file

urlpatterns = [
    path('upload', upload_file),
    path('fetch', fetch_file),
    path('shared', shared_files),
    path('share',share_file)
]
