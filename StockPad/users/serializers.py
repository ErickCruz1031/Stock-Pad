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
        print("Validating whether or not user exists")
        try:
            u = User.objects.get(username= data['user'])
            u.set_password(data['new_password'])
            u.save()
            print("User did exist. Changed password and saved changes.")
            return True 
        except User.DoesNotExist:
            print("This user does not exist. No changes to be made")
            feedback = {'error': 'Username does not exist.'}
            raise serializers.ValidationError(feedback)
        




