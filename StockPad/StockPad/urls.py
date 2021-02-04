
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')) #Any URL, dipatch it to the file at api > urls.py
]
