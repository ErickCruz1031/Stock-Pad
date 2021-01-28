from django.contrib import admin
from django.urls import path, include
from .views import StockNoteView

urlpatterns = [
    path('request/',StockNoteView.as_view()),#Go to views.py from this app and into the main function
]
