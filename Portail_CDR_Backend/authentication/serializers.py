from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import re
from django.utils.translation import ugettext
from difflib import SequenceMatcher

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

    extra_kwargs = {
            'password': {'write_only': True},  # Ensure password is write-only
        }

    def create(self, validated_data):
        # Custom create method to handle user creation

        # Extract the password from validated_data and create the user
        password = validated_data.pop('password', None)
        user = User(**validated_data)

        # Set the password securely using the set_password method
        if password is not None:
            user.set_password(password)

        # Save the user to the database
        user.save()
        return user

    def validate(self, data):
        # Custom validation method to validate user data

        # Add your custom validation logic here
        # For example, you can check if the email is unique
        email = data.get('email')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("This email is already in use.")

        return data


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.username
        # ...
        print(token)
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class GetUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username')



class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """

    email = serializers.EmailField(required=True)
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, validated_data):
        string = "login"
        password = validated_data['password']
        email = validated_data['email']
        username = validated_data['username']
        max_similarity = 0.7
        if len(password) < 8:
            raise serializers.ValidationError("Password length must be greater than 8 characters.")
        elif not any(char in password for char in '()[\]{}|\\`~!@#$%^&*_-+=;:\'",<>./?'):
            raise serializers.ValidationError("Your password must contain at least 1 symbol.")
        elif not any(char.isdigit() for char in password):
            raise serializers.ValidationError("The password must contain at least 1 digit, 0-9.")
        elif not any(char.islower() for char in password):
            raise serializers.ValidationError("The password must contain at least 1 lowercase letter, a-z.")
        elif not any(char.isupper() for char in password):
            raise serializers.ValidationError("The password must contain at least 1 uppercase letter, A-Z.")
        elif string.upper() in password or string.lower() in password:
            raise serializers.ValidationError("The password must not contain the word 'login'.")
        elif SequenceMatcher(a=password.lower(), b=username.lower()).quick_ratio() > max_similarity:
            raise serializers.ValidationError("The password is too similar to the username.")
        elif SequenceMatcher(a=password.lower(), b=email.lower()).quick_ratio() > max_similarity:
            raise serializers.ValidationError("The password is too similar to the email.")
        return validated_data

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


