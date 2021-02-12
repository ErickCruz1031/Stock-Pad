from rest_framework import serializers
from .models import StockNote

#class StockNoteSerializer(serializers.HyperlinkedModelSerializer):
class StockNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockNote
        fields = ('ticker', 'notes')
        #fields ='__all__'
        #fields = ('ticker', 'notes') #id is given by default

#class createStockNote(serializers.HyperlinkedModelSerializer):
class createStockNote(serializers.ModelSerializer):
    class Meta:
        model = StockNote
        fields =('ticker', 'notes', 'owner')
#ModelSerializers

class getStockNoteByOwner(serializers.ModelSerializer):
    class Meta:
        model = StockNote
        fields = ('owner')