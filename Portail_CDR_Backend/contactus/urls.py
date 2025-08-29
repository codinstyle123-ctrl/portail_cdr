# urls.py
from django.urls import path
from .views import SendEmailView,GetCsrfTokenView

urlpatterns = [
     path('send_email/', SendEmailView.as_view(), name='send_email'),
     path('get_csrf_token/', GetCsrfTokenView.as_view(), name='get_csrf_token'),
 ]