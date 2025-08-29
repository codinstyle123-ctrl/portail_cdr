from rest_framework import serializers
from .models import Audit_csg_ctr_model,Audit_ip_fh_model,CustomAudit,AuditDoublonsIP

class Audit_csg_ctr_model_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Audit_csg_ctr_model
        fields = '__all__'

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

class AuditIPFHSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audit_ip_fh_model
        fields = '__all__'


class AuditDoublonsIPSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditDoublonsIP
        fields = '__all__'

class CustomAuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomAudit
        fields = '__all__'  # This will include 'title' and 'image' fields

    # You can also manually define fields if necessary for customization
    title = serializers.CharField(max_length=255)
    image = serializers.ImageField()
