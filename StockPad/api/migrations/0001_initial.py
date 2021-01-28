# Generated by Django 2.2.16 on 2021-01-27 05:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StockNote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ticker', models.CharField(default='', max_length=10, unique=True)),
                ('notes', models.CharField(default='', max_length=144)),
                ('userID', models.CharField(default='', max_length=10)),
            ],
        ),
    ]
