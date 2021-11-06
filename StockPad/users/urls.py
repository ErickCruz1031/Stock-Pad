from django.urls import path, include
from .views import Register, Login, RetrieveUser,ResetPasswordView,FindNonAuthenticated
from knox import views as knox_views


urlpatterns=[
    path('register/', Register.as_view()),
    path('login/', Login.as_view()),
    path('resetpassword/', ResetPasswordView.as_view()),
    path('nonauth/', FindNonAuthenticated.as_view()),
    path('user/', RetrieveUser.as_view()),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('', include('knox.urls')),

]
