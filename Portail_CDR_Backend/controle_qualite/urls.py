# urls.py
from django.urls import path
from .views import CSVUploadViewLp712Radio,CSVUploadViewLp712Csg,L712CasRadioStatisticsView,L712CasCsgStatisticsView

urlpatterns = [
    #######################  upload data lp71_2 radio ####################################
    path('lp71_2_radio/upload', CSVUploadViewLp712Radio.as_view(), name='upload-lp71_2-radio'),
    path('lp71_2_csg/upload', CSVUploadViewLp712Csg.as_view(), name='upload-lp71_2-csg'),
    path("lp71_2_radio/statistics/", L712CasRadioStatisticsView.as_view(), name="l712casradio-statistics"),
    path("lp71_2_csg/statistics/", L712CasCsgStatisticsView.as_view(), name="l712cascsg-statistics"),
]
