from rest_framework import serializers
from .models import StockNote

class StockNoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StockNote
        fields = ('id', 'ticker', 'notes', 'userID') #id is given by default

#ModelSerializers