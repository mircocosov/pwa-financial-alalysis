from django.urls import path
from .views import refresh_portfolio

urlpatterns = [
    path("refresh/", refresh_portfolio),
]
