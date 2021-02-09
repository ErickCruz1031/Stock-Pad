from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer,RegisterSerializer,LoginSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
# Create your views here.

#Register View
class Register(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

#Login View

class Login(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = ()
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


#Get User View APIView
#generics.RetrieveAPIView
class RetrieveUser(APIView):
    permission_classes =[
        permissions.IsAuthenticated,
    ] #Only authenticated users can use this because you need a token
    serializer_class = UserSerializer
    def get_obj(self):
        return self.request.user


'''
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
'''