# Generated by Django 2.2.16 on 2021-02-12 02:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210212_0208'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stocknote',
            name='username',
        ),
        migrations.AlterField(
            model_name='stocknote',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='api', to=settings.AUTH_USER_MODEL),
        ),
    ]
