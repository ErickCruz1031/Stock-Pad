from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer,RegisterSerializer,LoginSerializer,ResetPasswordSerializer,NonAuthUser
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from .models import Placeholder
from django.http import JsonResponse
import boto3
import base64
import json
from botocore.exceptions import ClientError
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
        awsKey = get_secret()#Call the function to get the key

        return JsonResponse({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1],
            "key" : awsKey
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


#Function below is to retrieve the API Key 
def get_secret():

    secret_name = "arn:aws:secretsmanager:us-east-2:144067153410:secret:polygonKey-JKfwAT"
    region_name = "us-east-2"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    # In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
    # See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    # We rethrow the exception by default.
    print("About to try the function")

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        if e.response['Error']['Code'] == 'DecryptionFailureException':
            # Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InternalServiceErrorException':
            # An error occurred on the server side.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            # You provided an invalid value for a parameter.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            # You provided a parameter value that is not valid for the current state of the resource.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'ResourceNotFoundException':
            # We can't find the resource that you asked for.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
    else:
        print("In the else")
        # Decrypts secret using the associated KMS CMK.
        # Depending on whether the secret is a string or binary, one of these fields will be populated.
        if 'SecretString' in get_secret_value_response:
            #secret = get_secret_value_response['SecretString']
            secret = json.loads(get_secret_value_response['SecretString'])
            print("This is the secret")
            return secret['apiKey']
        else:
            decoded_binary_secret = base64.b64decode(get_secret_value_response['SecretBinary'])
            print("In the else")
            return 0
        