import django
import os
from django.utils.translation import gettext
django.utils.translation.ugettext = gettext
from pathlib import Path
import ldap
from django_auth_ldap.config import LDAPSearch,LDAPSearchUnion, PosixGroupType, LDAPGroupQuery, ActiveDirectoryGroupType, GroupOfNamesType, NestedActiveDirectoryGroupType


BASE_DIR = Path(__file__).resolve().parent.parent

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = '172.18.43.44'
EMAIL_PORT = 25
EMAIL_USE_TLS = False 
DEFAULT_FROM_EMAIL = 'supporttft@bouyguestelecom.fr'


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-tt%u!wcg70s&7khj9%j!z*x3py=0c&(y-l+$)j=bazzuxo-h)-'

DEBUG = True

ALLOWED_HOSTS = ['*']

CORS_ALLOWED_ORIGINS = [
    "http://vmwres-outi268:3035",
    "http://10.101.70.250:3035",
    "http://10.101.70.250:8035",
    "http://localhost:3035",
    "http://localhost:8035",
]

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3035',
    'http://localhost:8035',
    'http://vmwres-outi268',
    'http://10.101.70.250:3035',
    'http://10.101.70.250:8035',
]

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

FILE_UPLOAD_HANDLERS = [
    'django.core.files.uploadhandler.MemoryFileUploadHandler',
    'django.core.files.uploadhandler.TemporaryFileUploadHandler',
]


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'authentication',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'verify_email',
    'audits',
    'cdr_radio',
    'controle_qualite',
]

MIDDLEWARE = [
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
]


CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True

ROOT_URLCONF = 'portail_cdr.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portail_cdr.wsgi.application'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

TIME_ZONE = 'UTC'
USE_TZ = True


DATABASES = {
       'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'portailcdr',
        'USER': 'tftno008',
        'PASSWORD': 'Elers@bo4317',
        'HOST': 'localhost',
        'PORT': '',           
    }

}



AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

ldap.set_option(ldap.OPT_DEBUG_LEVEL, 4095)


AUTH_LDAP_SERVER_URI = "ldap://bt1svmvfh0.bpa.bouyguestelecom.fr"
AUTH_LDAP_BIND_DN = "opm_cdr"

AUTH_LDAP_BIND_PASSWORD=r"jGb8_QWMP\3A"

ldap_timeout = float(os.getenv('LDAP_TIMEOUT') or 10.0)
AUTH_LDAP_CONNECTION_OPTIONS = {
    ldap.OPT_REFERRALS: 0,
    ldap.OPT_NETWORK_TIMEOUT: ldap_timeout,
    ldap.OPT_TIMEOUT: ldap_timeout,
}

AUTH_LDAP_START_TLS = False

AUTH_LDAP_USER_SEARCH = LDAPSearchUnion(
LDAPSearch("OU=ACS Authenticated Users,DC=res,DC=bouyguestelecom,DC=fr", ldap.SCOPE_SUBTREE, "(samAccountName=%(user)s)"),  
LDAPSearch("OU=Compte de Test,OU=Comptes,DC=res,DC=bouyguestelecom,DC=fr", ldap.SCOPE_SUBTREE, "(samAccountName=%(user)s)"),     
)

# Populate the Django user from the LDAP directory.
AUTH_LDAP_USER_ATTR_MAP = {
    "username": "sAMAccountName",
    "first_name": "givenName",
    "last_name":  "sn",
    "email":      "mail"
}
# Group Search
AUTH_LDAP_GROUP_SEARCH =LDAPSearchUnion(
LDAPSearch(
    #'CN=yabderra,OU=APP - PROCESSUS INDUSTRIEL ET SERVICES,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr',
    #'ou=Applications,dc=res,dc=bouyguestelecom,dc=fr',
    'OU=APP - ADVNETCHECK,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr',
    ldap.SCOPE_SUBTREE,
    '(objectClass=group)',),
LDAPSearch(
    #'CN=yabderra,OU=APP - PROCESSUS INDUSTRIEL ET SERVICES,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr',
    #'ou=Applications,dc=res,dc=bouyguestelecom,dc=fr',
    'OU=ACS Authenticated Users,DC=res,DC=bouyguestelecom,DC=fr',
    ldap.SCOPE_SUBTREE,
    '(objectClass=group)',),
LDAPSearch(
    #'CN=yabderra,OU=APP - PROCESSUS INDUSTRIEL ET SERVICES,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr',
    #'ou=Applications,dc=res,dc=bouyguestelecom,dc=fr',
    'OU=Groupes Applicatifs metiers DOR,OU=Groupes,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr',
    ldap.SCOPE_SUBTREE,
    '(objectClass=group)',),
LDAPSearch(
    #'CN=yabderra,OU=APP - PROCESSUS INDUSTRIEL ET SERVICES,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr',
    #'ou=Applications,dc=res,dc=bouyguestelecom,dc=fr',
    'OU=ACS Mapping Groups,DC=res,DC=bouyguestelecom,DC=fr',
    ldap.SCOPE_SUBTREE,
    '(objectClass=group)',),
LDAPSearch(
    #'CN=yabderra,OU=APP - PROCESSUS INDUSTRIEL ET SERVICES,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr',
    #'ou=Applications,dc=res,dc=bouyguestelecom,dc=fr',
    'OU=Groupes Applicatifs metiers Hors DOR,OU=Groupes,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr',
    ldap.SCOPE_SUBTREE,
    '(objectClass=group)',),
LDAPSearch(
    'CN=CDRNO012,OU=ACS Authenticated Users,DC=res,DC=bouyguestelecom,DC=fr',
    ldap.SCOPE_SUBTREE,
    '(objectClass=group)',),
LDAPSearch(
    'CN=CDRNO015,OU=ACS Authenticated Users,DC=res,DC=bouyguestelecom,DC=fr',
    ldap.SCOPE_SUBTREE,
    '(objectClass=group)',)
)
AUTH_LDAP_GROUP_TYPE = NestedActiveDirectoryGroupType()
print("#"*80)
#print(AUTH_LDAP_GROUP_TYPE)
IS_SUPER_USER_FLAG = (
    LDAPGroupQuery("CN=GRP_APP_OPM_ADVNETCHECK_USER,OU=APP - ADVNETCHECK,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("OU=DOR_OSD_SN2_GRP_APPLICATIF_PROJET_IP,OU=Groupes Applicatifs metiers Hors DOR,OU=Groupes,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("CN=DOR_OSA_SN2_APP_SUPPORT_IP_SOCLE,OU=Groupes Applicatifs metiers DOR,OU=Groupes,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("CN=DOR_OCR_GRP_SN1_TRANSPORT,OU=ACS Mapping Groups,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("OU=DOR_OSD_GRP_SUPPORT_IP,OU=ACS Mapping Groups,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("OU=DOR_OSA_GRP_APPLICATIF_PROJETS_ACCES_TRANSMISSION,OU=Groupes Applicatifs metiers DOR,OU=Groupes,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("OU=DOR_OPM_GRP_APPLICATIF_INFOGERANCE_BUILD_TRANS_DATA,OU=Groupes Applicatifs metiers DOR,OU=Groupes,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr")
)

IS_STAFF_FLAG = (
      LDAPGroupQuery("OU=DOR_OSD_SN2_GRP_APPLICATIF_PROJET_IP,OU=Groupes Applicatifs metiers Hors DOR,OU=Groupes,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("CN=DOR_OSA_SN2_APP_SUPPORT_IP_SOCLE,OU=Groupes Applicatifs metiers DOR,OU=Groupes,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("CN=DOR_OCR_GRP_SN1_TRANSPORT,OU=ACS Mapping Groups,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("OU=DOR_OSD_GRP_SUPPORT_IP,OU=ACS Mapping Groups,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("OU=DOR_OSA_GRP_APPLICATIF_PROJETS_ACCES_TRANSMISSION,OU=Groupes Applicatifs metiers DOR,OU=Groupes,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("OU=DOR_OPM_GRP_APPLICATIF_INFOGERANCE_BUILD_TRANS_DATA,OU=Groupes Applicatifs metiers DOR,OU=Groupes,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr")
    | LDAPGroupQuery("CN=GRP_APP_OPM_ADVNETCHECK_USER,OU=APP - ADVNETCHECK,OU=Applications,DC=res,DC=bouyguestelecom,DC=fr")
)

AUTH_LDAP_USER_FLAGS_BY_GROUP = {
    'is_active': IS_SUPER_USER_FLAG | IS_STAFF_FLAG,
    'is_staff': IS_SUPER_USER_FLAG | IS_STAFF_FLAG,
    'is_superuser': IS_SUPER_USER_FLAG,
}


AUTH_LDAP_ALWAYS_UPDATE_USER = True
AUTH_LDAP_FIND_GROUP_PERMS = True
AUTH_LDAP_GROUP_CACHE_TIMEOUT = 0
AUTH_LDAP_CACHE_GROUPS = 0


AUTHENTICATION_BACKENDS = (
    "django_auth_ldap.backend.LDAPBackend",
    "django.contrib.auth.backends.ModelBackend",
)




LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True



STATIC_URL = '/api/static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
