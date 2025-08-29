from django.contrib import admin
from .models import L712CasRadio,L712CasCsg

class L712CasRadioAdmin(admin.ModelAdmin):  # Inherit from admin.ModelAdmin
    list_display = ('equipement_a', 'nom_lien_ip', 'etat', 'statut', 'statut_incoherence','insertion_date')
    search_fields = ('equipement_a', 'nom_lien_ip', 'etat', 'statut')
    list_filter = ('etat', 'statut', 'statut_incoherence','insertion_date','created_by')

# Register the model with the customized admin class
admin.site.register(L712CasRadio, L712CasRadioAdmin)

class L712CasCsgAdmin(admin.ModelAdmin):
    list_display = ('equipement_a', 'nom_lien_ip', 'etat', 'statut', 'statut_coherence', 'insertion_date')
    search_fields = ('equipement_a', 'nom_lien_ip', 'etat', 'statut')
    list_filter = ('etat', 'statut', 'statut_coherence', 'insertion_date', 'created_by')

admin.site.register(L712CasCsg, L712CasCsgAdmin)