from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate 

#User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #fields = ('username', 'email')
        fields = ('id', 'username', 'email', 'password')
        #fields = ('id', 'username', 'email') was this before

class NonAuthUser(serializers.ModelSerializer):
    class Meta:
        model = User
        #fields = ('username', 'email')
        fields = ('username')
        #fields = ('id', 'username', 'email') was this before




class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        #fields = ('username', 'email', 'password')
        extra_kwargs = {'password' : {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
        validated_data['email'],
        validated_data['password'])

        return user

#Login

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class ResetPasswordSerializer(serializers.Serializer):
    user = serializers.CharField()
    new_password = serializers.CharField()

    def validate(self, data):
        print("!!!!!!!!!!!!!!!!!!!!!!!!")
        print(data)
        print("Think this is the username: ")
        print(data)
        print("-------------------------")
        print(data['user'])
        try:
            u = User.objects.get(username= data['user'])
            print("THIS IS THE USER")
            print(u)
            u.set_password(data['new_password'])
            u.save()
            return True 
        except User.DoesNotExist:
            print("THIS USER DOES NOT EXIST")
            return False 
        



'''
class ResetPasswordSerializer(serializers.Serializer):
    #Will use username and email to see if there is a match and if so offer prompt to reset pass
    current_user = serializers.CharField()
    new_password = serializers.CharField()

    def validate(self, data):
        u = User.objects.get(username= self.context['request'].user)
        u.set_password(new_password)
        u.save()
        print("!!!!!!!!!!!!!!!!!!!!!!!!")
        print(data)
        print("Think this is the username: ")
        #print(self.context['request'].user)
        print("-------------------------")
        #u = User.objects.get(username= data.current_user)
        #u.set_password(new_password)
        #u.save()
        return True 
'''

