from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import StockNoteSerializer
from .models import StockNote

class StockNoteView(generics.ListAPIView):
    queryset = StockNote.objects.all()
    serializer_class = StockNoteSerializer

    # Create your views here.
#def main(request):
#   return HttpResponse("Hello")
#CreateAPIView
