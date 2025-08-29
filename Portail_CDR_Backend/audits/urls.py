# urls.py
from django.urls import path
from .views import (
    # ATR Views
    ATRUploadView,
    AuditAtrRadio,
    AuditAtrImes,

    #Doublons IP
    AuditDoublonsIPView,
    AuditDoublonsIPUploadView,

    #custom
    CustomAuditView,
    EditCustomAuditView,
    DeleteCustomAuditView,
    # CSG Views
    AuditCSGRadio,
    AuditCSGImes,
    AuditCSGRadioGlobal,
    AuditCSGImesGlobal,
    CSGUploadView,
    ExcelUploadView,


    # IP/FH Views
    AuditIpFhIncoherenceTdjCdrNew,
    AuditIpFhIncoherenceTdjCdrendetailsBdrouBde,
    AuditIpFhIncoherenceTdjCdrendetailsBdr,
    AuditIpVolumeTdjCdr,
    GetLatestDataInsertionDateAuditIpFhView,
    AuditIpFhTauxDeCoherence,
    AuditIpFhEvolutionTauxDeCoherence,

    # Other/Aggregate Views
    CountPorteurOccurrencesTdjCdrView,
    
    # Export Views
    ExportAuditIpFhToExcelView,
    ExportAuditCSG
)

urlpatterns = [
    ############################# Audit ATR #############################
    path('api/auditatr/radio/', AuditAtrRadio.as_view(), name='audit-atr-radio'),
    path('api/auditatr/imes/', AuditAtrImes.as_view(), name='audit-atr-imes'),
    
    ############################# Audit CSG #############################
    path('api/auditcsg/radio/<str:architecture>/', AuditCSGRadio.as_view(), name='audit-csg-radio'),
    path('api/auditcsg/imes/<str:architecture>/', AuditCSGImes.as_view(), name='audit-csg-imes'),
    
    path('api/auditcsg/export/<str:architecture>', ExportAuditCSG.as_view(), name='audit-csg-export'),
    path('api/auditcsg/export/', ExportAuditCSG.as_view(), name='audit-csg-export'),

    ############################# Audit CSG Global #############################
    path('api/auditcsg/radio/', AuditCSGRadioGlobal.as_view(), name='audit-csg-global-radio'),
    path('api/auditcsg/imes/', AuditCSGImesGlobal.as_view(), name='audit-csg-global-radio'),
    ######################## Audit IP FH #######################
    path('api/auditipfh/tauxdecoherence', AuditIpFhTauxDeCoherence.as_view(), name='ip-fh-taux-de-coherence'),
    path('api/auditipfh/evolutiontauxdecoherence', AuditIpFhEvolutionTauxDeCoherence.as_view(), name='ip-fh-evolution-taux-de-coherence'),
    path('api/auditipfh/incoherencetdjcdrnew', AuditIpFhIncoherenceTdjCdrNew.as_view(), name='ip-fh-incoherence-tdj-cdr-new'),
    path('api/auditipfh/exportauditipfh', ExportAuditIpFhToExcelView.as_view(), name='export-auditipfh-to-excel'),
    path('api/auditipfh/getlatestdate', GetLatestDataInsertionDateAuditIpFhView.as_view(), name='get-latest-date'),
    path('api/auditipfh/volumetdjcdr', AuditIpVolumeTdjCdr.as_view(), name='ip-fh-volume-tdj-cdr'),
    path('api/auditipfh/incoherenceendetailstdjcdr', AuditIpFhIncoherenceTdjCdrendetailsBdr.as_view(), name='ip-fh-incoherence-tdj-cdrbdr--en-details'),
    path('api/auditipfh/incoherenceendetailstdjcdrbdroubde', AuditIpFhIncoherenceTdjCdrendetailsBdrouBde.as_view(), name='ip-fh-incoherence-tdj-cdr-bdroubde-en-details'),
    path('api/auditipfh/repartitionporteurtdjcdr', CountPorteurOccurrencesTdjCdrView.as_view(), name='repartition-porteur-tdj-cdr'),
    #######################  upload csv csg ####################################
    path('audit_csg/upload', CSGUploadView.as_view(), name='upload_csg'),
    path('api/uploadexcelipfh/', ExcelUploadView.as_view(), name='upload-excel-fh'),
    #######################  upload doublons IP ####################################
    path('audit_doublons/upload', AuditDoublonsIPUploadView.as_view(), name='upload_doublons_ip'),
    #######################  Audit doublons IP Views ####################################
    path('audit_doublons_ip/', AuditDoublonsIPView.as_view(), name='audit-doublons-ip-view'),


    #######################  Upload ATR data ####################################
    path('audit_atr/upload', ATRUploadView.as_view(), name='upload_atr'),

    ############################ Custom Audits #################################
    path('add/catalogues', CustomAuditView.as_view(), name='add_audit_catalogue'),
    path('edit/catalogues/<int:pk>', EditCustomAuditView.as_view(), name='edit_audit_catalogue'),
    path('delete/catalogues/<int:pk>', DeleteCustomAuditView.as_view(), name='delete_audit_catalogue'),

]
