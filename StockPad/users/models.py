from django.db import models

class Placeholder(models.Model):
    Placeholder = models.CharField(max_length=10, default='', unique=False)

# Create your models here.
