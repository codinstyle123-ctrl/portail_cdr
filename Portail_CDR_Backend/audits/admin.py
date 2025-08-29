# In your app's admin.py file

from django.contrib import admin
from .models import Audit_ip_fh_model, Audit_csg_ctr_model, AuditCSG,AuditATR

class Audit_ip_fh_modelAdmin(admin.ModelAdmin):
    list_display = (
        'region', 'id_lien', 'equipement', 'site_geo', 'site_theo', 'installe',
        'type_extremite', 'adresse_ip', 'statut_ip', 'constructeur', 'materiel',
        'etat', 'nature', 'statut', 'statut_lp35', 'statut_swap_fh', 'ip_omc',
        'tdj_osa', 'check_ip', 'tdj_cdr', 'tdj_swap_ip', 'date_demande_swap_dci',
        'nb_fht', 'statut_coherence_adresses_ip', 'porteur', 'action_description', 'Data_Insertion_Date'
    )
    search_fields = ('id_lien', 'equipement', 'region', 'site_geo')
    list_filter = ('region', 'statut_ip', 'constructeur', 'statut')
    ordering = ('-Data_Insertion_Date',)

class Audit_csg_ctr_modelAdmin(admin.ModelAdmin):
    list_display = (
        'N_CSG', 'Constructeur_CSG', 'Architecture', 'Connexion', 'Equipment_parent',
        'Equipement_Parent_BDR', 'Delta_Equipement_parent', 'Port_CSG', 'Port_CSG_BDR',
        'Delta_Port_CSG', 'Etat_port_CSG', 'LAG_CSG', 'LAG_CSG_BDR', 'Delta_LAG_CSG',
        'Loopback0_CSG', 'Loopback0_CSG_BDR', 'Delta_Loopback0_CSG', 'Loopback1_CSG',
        'Loopback1_CSG_BDR', 'Delta_Loopback1_CSG', 'IP_Interco_CSG', 'IP_Interco_CSG_BDR',
        'Delta_IP_Interco_CSG', 'Vlan_Interco_CSG', 'VLAN_Interco_CSG_BDR', 'Delta_Vlan_Trafic_CSG',
        'IP_SUP_CSG', 'IP_Interco_SUP_CSG_BDR', 'Delta_IP_Interco_SUP_CSG_BDR', 'VLAN_SUP_CSG',
        'VLAN_Interco_SUP_CSG_BDR', 'Delta_VLAN_Interco_SUP_CSG_BDR', 'PORT_Parent',
        'PORT_CTR_BDR', 'Delta_Port_CTR', 'LAG_Parent', 'Etat_Port_Parent', 'LAG_CTR_BDR',
        'Delta_LAG_CTR', 'IP_Interco_Parent', 'IP_Interco_CTR_BDR', 'Delta_IP_Interco_CTR_BDR',
        'Vlan_Interco_Parent', 'VLAN_Interco_CTR_BDR', 'Delta_VLAN_Interco_CTR_BDR',
        'IP_SUP_Parent', 'IP_Interco_SUP_CTR_BDR', 'Delta_IP_Interco_SUP_CTR_BDR'
    )
    search_fields = ('N_CSG', 'Constructeur_CSG', 'Architecture', 'Equipment_parent')
    list_filter = ('Constructeur_CSG', 'Architecture', 'Etat_port_CSG', 'LAG_CSG')
    ordering = ('-Equipement_Parent_BDR',)

class AuditCSGAdmin(admin.ModelAdmin):
    list_display = ('n_csg', 'usine_prod', 'constructeur_csg', 'architecture','insertion_date')  # Customize the fields shown in the list view
    search_fields = ('n_csg', 'constructeur_csg')  # Add search functionality
    list_filter = ('architecture', 'connexion')  # Add filters to the admin panel
    ordering = ('n_csg',)  # Order by `n_csg`

class AuditATRAdmin(admin.ModelAdmin):
    # Customize which fields are shown in the list view.
    list_display = ('atr', 'connexion', 'equipment_parent', 'port_atr', 'lag_atr', 'insertion_date', 'created_at')
    
    # Enable search on a subset of fields.
    search_fields = ('atr', 'connexion', 'equipment_parent', 'key')
    
    list_filter = ('connexion', 'insertion_date', 'etat_final')
    
    ordering = ('-created_at',)
    date_hierarchy = 'insertion_date'


# class AuditDoublonsIPAdmin(admin.ModelAdmin):
#     # Customize which fields are shown in the list view.
#     list_display = ('doublons_adresse_ip','insertion_date' )
    
#     # Enable search on a subset of fields.
#     search_fields = ('doublons_adresse_ip')
    
#     list_filter = ('insertion_date')
    
#     ordering = ('doublons_adresse_ip')
#     date_hierarchy = 'insertion_date'
# Register the model along with its ModelAdmin.
admin.site.register(AuditATR, AuditATRAdmin)

# Register your models
admin.site.register(Audit_ip_fh_model, Audit_ip_fh_modelAdmin)
admin.site.register(Audit_csg_ctr_model, Audit_csg_ctr_modelAdmin)
admin.site.register(AuditCSG, AuditCSGAdmin)

# # Register the model along with its ModelAdmin.
# admin.site.register(AuditDoublonsIP, AuditDoublonsIPAdmin)
