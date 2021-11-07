from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer,RegisterSerializer,LoginSerializer,ResetPasswordSerializer,NonAuthUser
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from .models import Placeholder
from django.http import JsonResponse
# Create your views here.
'''
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

'''
#Register View
class Register(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        print("This is the serializer")
        print(serializer)
        print(serializer.errors)
        if (len(serializer.errors) != 0):
            #This means the errors dictionary is not empty and there was an error creating the user
            return Response({
                "ok": False
            })
        else:
            #If the error dictionary is empty then the user was created successfully. In this case save the user
            user=serializer.save()
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1],
                "ok" : True
            })

#Login View

class Login(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = ()
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print("mayo")
        serializer.is_valid(raise_exception=True)
        #For bad errors, the feedback will be sent directly from the serializer
        print("hahah")
        print(serializer)
        user = serializer.validated_data
        print("This is the serializer: ")
        print(serializer)
        print("We got to the login here")
        print(user)

        return JsonResponse({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


#Get User View APIView
class RetrieveUser(generics.RetrieveAPIView):
    permission_classes =[
        permissions.IsAuthenticated,
    ] #Only authenticated users can use this because you need a token
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user



class ResetPasswordView(generics.GenericAPIView):
    #serializer_class = ResetPasswordSerializer
    permission_classes = () #No need to be authenticated for this view to work
    serializer_class = ResetPasswordSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        #For bad requests, the feedback is sent directly from the serializer
        return JsonResponse({"success": "True"})


class FindNonAuthenticated(generics.GenericAPIView):
    serializer_class = NonAuthUser
    def get_object(self):
        print("IN this new view")
        return self.request.user



'''
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
'''