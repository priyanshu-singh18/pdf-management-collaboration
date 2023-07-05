from django.urls import path
from users.views import check_pdf

urlpatterns = [
    path('check', check_pdf)
]
