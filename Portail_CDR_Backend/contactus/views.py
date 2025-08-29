from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.middleware.csrf import get_token
from django.core.mail import send_mail, EmailMessage
from django.http import JsonResponse
import json

class SendEmailView(APIView):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        name = data.get('name', '')
        email = data.get('email', '')
        department = data.get('department', '')
        message = data.get('message', '')

        subject = f"[PORTAIL CDR] requête envoyée par {name}"
        message_body = f"Name: {name}\nEmail: {email}\nDepartment: {department}\nMessage: {message}"

        try:
            smtp_server = "172.18.43.44"
            smtp_port = 25
            to_email = "maurice.rizkallah.ext@nokia.com"  # Main recipient
            cc_emails = [
                "ghofrane.ben_omrane@nokia.com",
                "mdazafra@bouyguestelecom.fr",
                "fredy.geagea.ext@nokia.com",
                "maurice.rizkallah.ext@nokia.com"
            ]

            self.send_email(subject, message_body, to_email, cc_emails)

            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'error': str(e)})

    def send_email(self, subject, body, to_email, cc_emails):
        email = EmailMessage(
            subject,
            body,
            'contactCDR@bouyguestelecom.fr',  # Sender email
            [to_email],  # Main recipient
            cc=cc_emails,  # CC recipients
        )
        email.send(fail_silently=False)

class GetCsrfTokenView(APIView):
    def get(self, request, *args, **kwargs):
        csrf_token = get_token(request)
        return JsonResponse({'csrf_token': csrf_token})


# from rest_framework.views import APIView
# from rest_framework.authentication import SessionAuthentication
# from rest_framework.permissions import IsAuthenticated
# from django.middleware.csrf import get_token
# from django.core.mail import send_mail
# from django.http import JsonResponse
# import json

# class SendEmailView(APIView):


#     def post(self, request, *args, **kwargs):
#         data = json.loads(request.body)
#         name = data.get('name', '')
#         email = data.get('email', '')
#         department = data.get('department', '')
#         message = data.get('message', '')

#         subject = f"[PORTAIL CDR] requête envoyée par {name}"
#         message_body = f"Name: {name}\nEmail: {email}\nDepartment: {department}\nMessage: {message}"

#         try:
#             # Sending the email using smtplib
#             smtp_server = "172.18.43.44"
#             smtp_port = 25
#             to_email = "maurice.rizkallah.ext@nokia.com"
#             # to_email = "maurice.rizkallah.ext@nokia.com;ghofrane.ben_omrane@nokia.com;mdazafra@bouyguestelecom.fr;fredy.geagea.ext@nokia.com"

#             self.send_email(subject, message_body, to_email, smtp_server, smtp_port)

#             return JsonResponse({'status': 'success'})
#         except Exception as e:
#             return JsonResponse({'status': 'error', 'error': str(e)})

#     def send_email(self, subject, body, to_email, smtp_server, smtp_port):
#         send_mail(
#             subject,
#             body,
#             'supporttft@bouyguestelecom.fr',  # Replace with your email
#             [to_email],  # Replace with the recipient's email
#             fail_silently=False,
#         )

# class GetCsrfTokenView(APIView):
#     def get(self, request, *args, **kwargs):
#         csrf_token = get_token(request)
#         return JsonResponse({'csrf_token': csrf_token})
    
