from django import forms
from .models import Audit_csg_ctr_model

class AuditCSGCtrForm(forms.ModelForm):
    class Meta:
        model = Audit_csg_ctr_model
        fields = '__all__' 
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        for field_name, field in self.fields.items():
            if field_name in self.Meta.model._meta.fields:
                model_field = self.Meta.model._meta.get_field(field_name)
                if model_field.null:
                    field.required = False


class AuditIPFHForm(forms.ModelForm):
    class Meta:
        model = Audit_ip_fh_model
        fields = '__all__'
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        for field_name, field in self.fields.items():
            if field_name in self.Meta.model._meta.fields:
                model_field = self.Meta.model._meta.get_field(field_name)
                if model_field.null:
                    field.required = False
