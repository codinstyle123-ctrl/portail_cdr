from rest_framework import serializers
from .models import L712CasRadio

class L712CasRadio_Serializer(serializers.ModelSerializer):
    class Meta:
        model = L712CasRadio
        fields = '__all__'

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
