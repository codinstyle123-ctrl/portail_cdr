
from django import forms
from .models import Fluxoa,CellDataSfr,CellDataDci

class FluxoaForm(forms.ModelForm):
    class Meta:
        model = Fluxoa
        fields = '__all__'


class CellDataSfrForm(forms.ModelForm):
    class Meta:
        model = CellDataSfr
        fields = '__all__'


class CellDataDciForm(forms.ModelForm):
    class Meta:
        model = CellDataDci
        fields = '__all__'
