
from django.urls import path
from .views import UploadExcelView,GetCsrfTokenView,GroupByDateAndStatusView,TableDataView,RecordCountView

urlpatterns = [
    path('api/upload_excel/', UploadExcelView.as_view(), name='upload_excel_api'),
    path('api/get_csrf_token/', GetCsrfTokenView.as_view(), name='get_csrf_token'),
    path('api/get_cellule_normal_count/', GroupByDateAndStatusView.as_view(), name='get_cellule_normal_count'),
    path('api/get_table_data/', TableDataView.as_view(), name='get_table_data'),
    path('api/mail_generation/', RecordCountView.as_view(), name='mail_generation'),
]
