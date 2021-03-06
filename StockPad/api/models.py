from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class StockNote(models.Model):
    ticker = models.CharField(max_length=10, default='', unique=False)
    notes = models.CharField(max_length=144, default='', unique=False)
    owner = models.ForeignKey(
        User, related_name="api", on_delete=models.CASCADE, null=True, blank=True)

    #models.IntegerField(nul=false)
    #models.DateTimeField()

    #python3 manage.py makemigrations
    #python3 manage.py migrate
    #These commands after you make changes to the models(DB)
