from django.db import models

# Create your models here.

class StockNote(models.Model):
    ticker = models.CharField(max_length=10, default='', unique=True)
    notes = models.CharField(max_length=144, default='', unique=False)
    userID = models.CharField(max_length=10, default='', unique=False)

    #models.IntegerField(nul=false)
    #models.DateTimeField()

    #python3 manage.py makemigrations
    #python3 manage.py migrate
    #These commands after you make changes to the models(DB)