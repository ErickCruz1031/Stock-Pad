from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status, permissions
from .serializers import StockNoteSerializer, createStockNote, getStockNoteByOwner
from .models import StockNote
from rest_framework.views import APIView 
from rest_framework.response import Response 

class StockNoteView(generics.ListAPIView):
    permission_classes= [
        permissions.IsAuthenticated,
    ]

    serializer_class = StockNoteSerializer

    def get_queryset(self):
        return self.request.user.api.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)





class getStockNote(APIView):
    permission_classes= [
        permissions.IsAuthenticated,
    ]
    serializer_class = StockNoteSerializer

    def get(self, request, format=None):
        target = StockNote.objects.filter(owner=self.request.user)
        #Filter all the objects that belong to the user
        if len(target) > 0: #If the query matches something
            #Turn the queryset object into a list to serialize
            val_list = []
            for value in target:
                data = StockNoteSerializer(value).data
                val_list.append(data)
            print("This is the serialized data", val_list)
            return Response(val_list, status=status.HTTP_200_OK)
        return Response({'Owner Not Found: Invalid Owner'}, status=status.HTTP_404_NOT_FOUND)


class CreateStockNoteView(APIView):
    serializer_class = StockNoteSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        #Serialize the data passed into the request
        if serializer.is_valid():
            ticker = serializer.data.get('ticker')
            notes = serializer.data.get('notes')
            #Extract the notes and ticker from the serialized data
            queryset = StockNote.objects.filter(ticker=ticker, owner=self.request.user)
            #Check if the user already has an entry with this ticker
            if queryset.exists():
                Object = queryset[0]
                Object.ticker = ticker
                Object.notes = notes
                Object.save(update_fields=['ticker', 'notes'])
                #If the user has an entry with this ticker only update the notes and ticker
                return Response(StockNoteSerializer(Object).data, status=status.HTTP_200_OK)
            else:
                #Otherwise youre going to enter a new object into DB
                Object = StockNote(ticker=ticker, notes=notes, owner=self.request.user)
                Object.save()
                return Response(StockNoteSerializer(Object).data, status=status.HTTP_200_OK)
        return Response({'Bad Request: Invalid Data or Entry for Ticker Already Exists'}, status=status.HTTP_400_BAD_REQUEST)
