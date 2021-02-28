from django.contrib import admin
from django.urls import path, include
from .views import StockNoteView, CreateStockNoteView, getStockNote, CreateNewStocknoteView

urlpatterns = [
    path('request/',StockNoteView.as_view()),
    path('create-stocknote/', CreateStockNoteView.as_view()),
    path('create-new/', CreateNewStocknoteView.as_view()),
    path('get-stocknote/', getStockNote.as_view()),#Go to views.py from this app and into the main function
]
