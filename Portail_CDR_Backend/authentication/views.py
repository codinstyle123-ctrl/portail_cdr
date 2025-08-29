from rest_framework_simplejwt.views import TokenObtainPairView
#from rest_framework_simplejwt.views import TokenCookieDeleteView
from .serializers import MyTokenObtainPairSerializer
from .serializers import CustomUserSerializer, GetUser
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response 
from rest_framework_simplejwt.settings import api_settings
from django.views.decorators.csrf import csrf_exempt
from .forms import UserRegisterForm
from rest_framework.decorators import api_view
from django.shortcuts import render
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import logout
import jwt
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.contrib.auth import authenticate


class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            if not username or not password:
                raise ValidationError('Username and password are required.')

            user = authenticate(request=request, username=username, password=password)
            if user is not None:
                # Authentication successful, generate JWT tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                # Add the tokens to the response
                response = super().post(request, *args, **kwargs)
                if response.status_code == status.HTTP_200_OK:
                    response.data['jwt_access_token'] = access_token
                    response.data['jwt_refresh_token'] = str(refresh)

                return response
            else:
                # Authentication failed
                raise AuthenticationFailed('Invalid credentials')
        except AuthenticationFailed as e:
            # Handle authentication error
            return Response({'error_code': 'AUTHENTICATION_FAILED', 'error_message': str(e)},
                            status=status.HTTP_401_UNAUTHORIZED)
        except ValidationError as e:
            # Handle validation error (e.g., missing username or password)
            return Response({'error_code': 'VALIDATION_ERROR', 'error_message': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Handle other exceptions
            return Response({'error_code': 'INTERNAL_SERVER_ERROR', 'error_message': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CustomLogoutView(APIView):
    def post(self, request, *args, **kwargs):
        # Perform any additional logout logic here if needed
        logout(request)
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)



    

class CurrentUserView(APIView):
	def get(self, request):
		serializer = GetUser(request.user)
		return Response(serializer.data)



class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            #user = serializer.save(commit=False)
            #form = serializer.save(commit=False)
            #inactiv_user = send_verification_email(request,serializer)
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


