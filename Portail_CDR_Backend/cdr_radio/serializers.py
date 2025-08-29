from rest_framework import serializers
from .models import Fluxoa

class FluxoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fluxoa
        fields = '__all__'


class CellDataSfrSerializer(serializers.ModelSerializer):
    class Meta:
        model = CellDataSfr
        fields = '__all__'

class CellDataDciSerializer(serializers.ModelSerializer):
    class Meta:
        model = CellDataDci
        fields = '__all__'
