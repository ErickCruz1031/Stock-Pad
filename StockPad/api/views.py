from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import StockNoteSerializer, createStockNote
from .models import StockNote
from rest_framework.views import APIView 
from rest_framework.response import Response 

class StockNoteView(generics.ListAPIView):
    queryset = StockNote.objects.all()
    serializer_class = StockNoteSerializer





class getStockNote(APIView):
    serializer_class = StockNoteSerializer
    lookup_url_kwarg = 'symbol'

    def get(self, request, format=None):
        symbol = request.GET.get(self.lookup_url_kwarg)

        if symbol != None:
            target = StockNote.objects.filter(ticker=symbol)
            print(target)
            if len(target) > 0: #If the query matches something
                data = StockNoteSerializer(target[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Ticker Not Found: Invalid Ticker'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request: Parameter Not Included'}, status=status.HTTP_400_BAD_REQUEST)




class CreateStockNoteView(APIView):
    serializer_class = createStockNote

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            ticker = serializer.data.get('ticker')
            notes = serializer.data.get('notes')
            userID = self.request.session.session_key
            queryset = StockNote.objects.filter(ticker=ticker, userID=userID)
            #queryset = StockNote.objects.filter(userID=userID)

            if queryset.exists():
                Object = queryset[0]
                Object.ticker = ticker
                Object.notes = notes
                Object.save(update_fields=['ticker', 'notes'])
                return Response(StockNoteSerializer(Object).data, status=status.HTTP_200_OK)
            else:
                Object = StockNote(userID=userID, ticker=ticker, notes=notes)
                Object.save()
                return Response(StockNoteSerializer(Object).data, status=status.HTTP_201_CREATED)

            return Response({'Bad Request: Invalid Data...'}, status=status.HTTP_400_BAD_REQUEST)


    # Create your views here.
#def main(request):
#   return HttpResponse("Hello")
#CreateAPIView
