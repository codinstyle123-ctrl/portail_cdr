from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from datetime import datetime
from .models import L712CasRadio,L712CasCsg
from .serializers import FileUploadSerializer  # Assuming you have this serializer
from django.db.models import Count, Sum, Q
from collections import Counter,defaultdict
from django.db.models.functions import TruncMonth

class CSVUploadViewLp712Csg(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        current_date = datetime.now().date()
        current_year = current_date.year
        current_month = current_date.month

        # Query the database for records created this month
        records_this_month = L712CasCsg.objects.filter(
            insertion_date__year=current_year,
            insertion_date__month=current_month
        )

        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            excel_files = request.FILES.getlist('file')
            for excel_file in excel_files:
                try:
                    self.process_excel_lp71_2_csg(excel_file)
                except Exception as e:
                    return Response({'message': f'Error processing Excel file: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'message': 'CSG Excel file processed successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def process_excel_lp71_2_csg(self, file):
        df = pd.read_excel(file)

        # Iterate over each row in the DataFrame
        for _, row in df.iterrows():
            # Create a dictionary to hold the data
            data = {
                'csg_pendulaire': row.get('CSG pendulaire', ''),
                'gcr_a': row.get('GCR A', ''),
                'gcr_b': row.get('GCR B', ''),
                'appartenance_lp': row.get("Appartenance à la LP", ''),
                'responsable': row.get('Responsable', ''),
                'phase_audit': row.get("Phase d'audit", ''),
                'nom_lien_ip': row.get('Nom Lien IP', ''),
                'equipement_a': row.get('Equipement A', ''),
                'etat': row.get('Etat', ''),
                'statut': row.get('Statut', ''),
                'site_geo_a': row.get('Site Geo A', ''),
                'lag_a_bde': row.get('Lag A BDE', ''),
                'num_lag_a': row.get('Num Lag A', ''),
                'nom_port_a': row.get('Nom Port A', ''),
                'constructeur_a': row.get('Constructeur A', ''),
                'parent_bde': row.get('Parent BDE', ''),
                'equipement_b': row.get('Equipement B', ''),
                'site_geo_b': row.get('Site Geo B', ''),
                'lag_b_bde': row.get('Lag B BDE', ''),
                'num_lag_b': row.get('Num Lag B', ''),
                'nom_port_b': row.get('Nom Port B', ''),
                'constructeur_b': row.get('Constructeur B', ''),
                'nom_interface_a': row.get('Nom Interface A', ''),
                'vlan_a_bde': row.get('Vlan A BDE', ''),
                'vlan_a': row.get('Vlan A', ''),
                'adresse_ip_a_bde': row.get('Adresse IP A BDE', ''),
                'adresse_ip_a': row.get('Adresse IP A', ''),
                'nom_interface_b': row.get('Nom Interface B', ''),
                'adresse_ip_b_bde': row.get('Adresse IP B BDE', ''),
                'vlan_b_bde': row.get('Vlan B BDE', ''),
                'vlan_b': row.get('Vlan B', ''),
                'adresse_ip_b': row.get('Adresse IP B', ''),
                'coherence_routage_ip': row.get('Cohérence Routage IP', ''),
                'lien_agg': row.get('Lien AGG', ''),
                'etat_agg': row.get('Etat AGG', ''),
                'statut_agg': row.get('Statut AGG', ''),
                'equipement_a_agg': row.get('Equipement A AGG', ''),
                'num_lag_a_agg': row.get('Num LAG A AGG', ''),
                'equipement_b_agg': row.get('Equipement B AGG', ''),
                'num_lag_b_agg': row.get('Num LAG B AGG', ''),
                'coherence_routage_agg': row.get('Cohérence Routage AGG', ''),
                'lien_pt': row.get('Lien PT', ''),
                'etat_pt': row.get('Etat PT', ''),
                'statut_pt': row.get('Statut PT', ''),
                'equipement_a_pt': row.get('Equipement A PT', ''),
                'port_a_bde_pt': row.get('Port A BDE PT', ''),
                'num_port_a_pt': row.get('Num Port A PT', ''),
                'nom_port_a_pt': row.get('Nom Port A PT', ''),
                'equipement_b_pt': row.get('Equipement B PT', ''),
                'port_b_bde_pt': row.get('Port B BDE PT', ''),
                'num_port_b_pt': row.get('Num Port B PT', ''),
                'nom_port_b_pt': row.get('Nom Port B PT', ''),
                'coherence_routage_pt': row.get('Cohérence Routage PT', ''),
                'nom_lien_zt_client': row.get('Nom Lien ZT client', ''),
                'etat_zt_client': row.get('Etat ZT client', ''),
                'statut_zt_client': row.get('Statut ZT client', ''),
                'equipement_a_zt_client': row.get('Equipement A ZT client', ''),
                'nom_port_a_zt_client': row.get('Nom Port A ZT client', ''),
                'equipement_b_zt_client': row.get('Equipement B ZT client', ''),
                'nom_port_b_zt_client': row.get('Nom Port B ZT client', ''),
                'coherence_routage_zt_client': row.get('Cohérence Routage ZT client', ''),
                'nom_lien_zt_reseau': row.get('Nom Lien ZT Reseau', ''),
                'etat_zt_reseau': row.get('Etat ZT Reseau', ''),
                'statut_zt_reseau': row.get('Statut ZT Reseau', ''),
                'equipement_a_zt_reseau': row.get('Equipement A ZT Reseau', ''),
                'nom_port_a_zt_reseau': row.get('Nom Port A ZT Reseau', ''),
                'equipement_b_zt_reseau': row.get('Equipement B ZT Reseau', ''),
                'nom_port_b_zt_reseau': row.get('Nom Port B ZT Reseau', ''),
                'coherence_routage_zt_reseau': row.get('Cohérence Routage ZT Reseau', ''),
                'routage_lien_ip': row.get('Routage lien IP', ''),
                'routage_lien_agg': row.get('Routage line AGG', ''),
                'routage_lien_pt': row.get('Routage lien PT', ''),
                'routage_lien_zt_client': row.get('Routage lien ZT Client', ''),
                'routage_lien_zt_reseau': row.get('Routage lien ZT Réseau', ''),
                'nombre_ip_present': row.get('Nombre IP Present'),
                'nombre_ip_requis': row.get('Nombre IP Requis'),
                'delta_nombre_ip_existants': row.get('Delta nombre IP existants'),
                'routage': row.get('Routage', ''),
                'delta_vlan': row.get('Delta VLAN', ''),
                'delta_equipement_lien_ip_pt': row.get('Delta Equipement lien IP<>PT', ''),
                'conformite_status': row.get('Conformité Status', ''),
                'conformite_lag_dl': row.get('Conformité Lag DL', ''),
                'conformite_port_dl': row.get('Conformité Port DL', ''),
                'conformite_lag_ul': row.get('Conformité Lag UL', ''),
                'conformite_port_ul': row.get('Conformité Port UL', ''),
                'coherence_bdr_bde_adrs_ip_a': row.get('Cohérence BDR/BDE Adrs IP A', ''),
                'coherence_bdr_bde_port_a': row.get('Cohérence BDR/BDE Port A', ''),
                'coherence_bdr_bde_lag_a': row.get('Cohérence BDR/BDE Lag A', ''),
                'coherence_bdr_bde_vlan_a': row.get('Cohérence BDR/BDE VLAN A', ''),
                'coherence_bdr_bde_extremite_b': row.get('Cohérence BDR/BDE Extremite B', ''),
                'coherence_bdr_bde_adrs_ip_b': row.get('Cohérence BDR/BDE Adrs IP B', ''),
                'coherence_bdr_bde_port_b': row.get('Cohérence BDR/BDE Port B', ''),
                'coherence_bdr_bde_lag_b': row.get('Cohérence BDR/BDE Lag B', ''),
                'coherence_bdr_bde_vlan_b': row.get('Cohérence BDR/BDE VLAN B', ''),
                'statut_coherence': row.get('Statut de cohérence', ''),
                'nb_incoherences': row.get("NB d'incohérences"),
                'etat_de_coherence_bdr': row.get('Etat de cohérence BDR', ''),
                'etat_de_coherence_bdr_bde': row.get('Etat de cohérence BDR/BDE', ''),
                'etat_de_coherence_equipment': row.get('Etat de cohérence equipment', ''),
                'insertion_date': row.get('insertion_date', ''),
            }

            # Create the L712CasCsg object
            L712CasCsg.objects.create(**data)

class CSVUploadViewLp712Radio(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        
        current_date = datetime.now().date()
        current_year = current_date.year
        current_month = current_date.month

        # Query the database for records created this month
        records_this_month = L712CasRadio.objects.filter(
            insertion_date__year=current_year,
            insertion_date__month=current_month
        )

        # If records exist, prevent the upload
        # if records_this_month.exists():
        #     return Response(
        #         {'message': 'An Excel file has already been uploaded this month.'},
        #         status=status.HTTP_400_BAD_REQUEST
        #     )

        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            excel_files = request.FILES.getlist('file')
            for excel_file in excel_files:
                try:
                    self.process_excel_lp71_2_radio(excel_file)
                except Exception as e:
                    return Response({'message': f'Error processing Excel file: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'message': 'Excel file processed successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def process_excel_lp71_2_radio(self, file):
        df = pd.read_excel(file)

        # Iterate over each row in the DataFrame
        for _, row in df.iterrows():
            # Create a dictionary to hold the data
            data = {
                'equipement_a': row.get('Equipement A', ''),
                'element_conf': row.get('Element Conf', ''),
                'responsable': row.get('Responsable', ''),
                'phase_audit': row.get("Phase d'audit", ''),
                'num_changement_parent': row.get('Num Changement Parent', ''),
                'nom_lien_ip': row.get('Nom Lien IP', ''),
                'etat': row.get('Etat', ''),
                'statut': row.get('Statut', ''),
                'site_geo_a': row.get('Site Geo A', ''),
                'nom_port_a': row.get('Nom Port A', ''),
                'constructeur_a': row.get('Constructeur A', ''),
                'adresse_ip_a': row.get('Adresse IP A', ''),
                'equipement_b': row.get('Equipement B', ''),
                'site_geo_b': row.get('Site Geo B', ''),
                'nom_port_b': row.get('Nom Port B', ''),
                'constructeur_b': row.get('Constructeur B', ''),
                'nom_interface_a': row.get('Nom Interface A', ''),
                'nom_interface_b': row.get('Nom Interface B', ''),
                'adresse_ip_b': row.get('Adresse IP B', ''),
                'coherence_routage_ip': row.get('Cohérence Routage IP', ''),
                'vlan_a': row.get('VLAN A', ''),
                'vlan_b': row.get('VLAN B', ''),
                'routage_lien_ip': row.get('routage Lien IP', ''),
                'nom_lien_pt': row.get('Nom Lien PT', ''),
                'etat_pt': row.get('Etat PT', ''),
                'statut_pt': row.get('Statut PT', ''),
                'equipement_a_pt': row.get('Equipement A PT', ''),
                'nom_port_a_pt': row.get('Nom Port A PT', ''),
                'equipement_b_pt': row.get('Equipement B PT', ''),
                'nom_port_b_pt': row.get('Nom Port B PT', ''),
                'coherence_routage_pt': row.get('Cohérence Routage PT', ''),
                'routage_lien_pt': row.get('routage Lien PT', ''),
                'nom_lien_agg': row.get('Nom Lien AGG', ''),
                'etat_agg': row.get('Etat AGG', ''),
                'statut_agg': row.get('Statut AGG', ''),
                'equipement_a_agg': row.get('Equipement A AGG', ''),
                'num_lag_a': row.get('Num LAG A', ''),
                'equipement_b_agg': row.get('Equipement B AGG', ''),
                'num_lag_b': row.get('Num LAG B', ''),
                'coherence_routage_agg': row.get('Cohérence Routage AGG', ''),
                'routage_lien_agg': row.get('routage Lien AGG', ''),
                'nom_lien_zt_client': row.get('Nom Lien ZT client', ''),
                'etat_zt_client': row.get('Etat ZT client', ''),
                'statut_zt_client': row.get('Statut ZT client', ''),
                'equipement_a_zt_client': row.get('Equipement A ZT client', ''),
                'nom_port_a_zt_client': row.get('Nom Port A ZT client', ''),
                'equipement_b_zt_client': row.get('Equipement B ZT client', ''),
                'nom_port_b_zt_client': row.get('Nom Port B ZT client', ''),
                'lien_transmission_tous': row.get('Lien Transmission (Tous)', ''),
                'liste_transmission': row.get('Liste Transmission', ''),
                'nom_lien_zt_reseau': row.get('Nom Lien ZT Reseau', ''),
                'etat_zt_reseau': row.get('Etat ZT Reseau', ''),
                'statut_zt_reseau': row.get('Statut ZT Reseau', ''),
                'equipement_a_zt_reseau': row.get('Equipement A ZT Reseau', ''),
                'nom_port_a_zt_reseau': row.get('Nom Port A ZT Reseau', ''),
                'equipement_b_zt_reseau': row.get('Equipement B ZT Reseau', ''),
                'nom_port_b_zt_reseau': row.get('Nom Port B ZT Reseau', ''),
                'ip': row.get('IP', ''),
                'adresse_ip_bde': row.get('Adresse IP BDE', ''),
                'vlan_bde': row.get('VLAN BDE', ''),
                'port_bde': row.get('Port BDE', ''),
                'interface_bde': row.get('Interface BDE', ''),
                'porteur_bde': row.get('Porteur BDE', ''),
                'radio_bde': row.get('Radio BDE', ''),
                'router_bde': row.get('Router BDE', ''),
                'statut_arp': row.get('Statut ARP', ''),
                'routage_lien_zt_client': row.get('Routage Lien ZT Client', ''),
                'nombre_ip_present': row.get('Nombre IP Present'),
                'nombre_ip_requis': row.get('Nombre IP requis'),
                'delta_nombre_ip_existants': row.get('Delta nombre IP existants'),
                'routage_radio': row.get('Routage Radio', ''),
                'delta_vlan': row.get('delta vlan'),
                'delta_equipement_lien_ip_pt': row.get('Delta Equipement Lien IP <> PT'),
                'delta_port_agg_fht': row.get('Delta Port AGG<>FHT'),
                'delta_fht_lien_agg_zt': row.get('Delta FHT Lien AGG<>ZT'),
                'conformite_status': row.get('Conformité Status', ''),
                'conformite_regles_choix_lag': row.get('Conformité Règles/Choix Lag', ''),
                'conformite_regles_choix_port': row.get('Conformité Règles/Choix Port', ''),
                'coherence_bdr_bde_extremite_a': row.get('Cohérence BDR/BDE Extrimité A', ''),
                'coherence_bdr_bde_extremite_b': row.get('Cohérence BDR/BDE Extrimité B', ''),
                'coherence_bdr_bde_vlan': row.get('Cohérence BDR/BDE - VLAN', ''),
                'statut_coherence': row.get('Statut de cohérence', ''),
                'nb_incoherences': row.get("NB d'incohérences"),
                'statut_incoherence': row.get("Statut d'incohérence", ''),
                'insertion_date': row.get("insertion_date", ''),
            }

            # Create the L712CasRadio object
            L712CasRadio.objects.create(**data)

class L712CasRadioStatisticsView(APIView):
    def get(self, request):
        # Get the latest record to show latest audit date
        latest_record = (
            L712CasRadio.objects.order_by('-insertion_date').values('insertion_date').first()
        )
        
        # If no records exist, return an empty response or handle as needed
        if not latest_record:
            return Response({"message": "No records found"}, status=200)
        
        latest_date = latest_record['insertion_date']

        # Filter data for the latest insertion_date
        rows_with_latest_date = L712CasRadio.objects.filter(insertion_date=latest_date)

        # General statistics (based on latest date)
        total_equipment = rows_with_latest_date.count()
        total_ok = rows_with_latest_date.filter(statut_coherence="OK").count()
        total_nok = rows_with_latest_date.filter(statut_coherence="NOK").count()
        total_inconsistencies = rows_with_latest_date.exclude(nb_incoherences__isnull=True).count()
        coherence_rate = (total_ok / total_equipment * 100) if total_equipment > 0 else 0

        # Build monthly data (for coherence rate over time)
        # Here we aggregate over all records (not just latest date) to show month-over-month trends
        monthly_aggregation = (
            L712CasRadio.objects
            .annotate(month=TruncMonth('insertion_date'))
            .values('month')
            .annotate(
                total_equipment=Count('id', distinct=True),
                total_ok=Count('id', filter=Q(statut_coherence="OK")),
                total_nok=Count('id', filter=Q(statut_coherence="NOK"))
            )
            .order_by('month')
        )

        monthly_data = []
        for item in monthly_aggregation:
            te = item['total_equipment']
            tok = item['total_ok']
            cr = (tok / te * 100) if te > 0 else 0
            monthly_data.append({
                'year_month': item['month'].strftime('%Y-%m'),  # Format the month as "YYYY-MM"
                'coherence_rate': round(cr),
                'total_ok': tok,
                'total_nok': item['total_nok']
            })

        # Define the mapping of database fields to display names for inconsistencies
        type_of_inconsistencies = {
            "delta_vlan": "Delta vlan",
            "coherence_bdr_bde_vlan": "Delta vlan",
            "conformite_regles_choix_lag": "Delta Lag",
            "conformite_regles_choix_port": "Delta Ports",
            "delta_port_agg_fht": "Delta Ports",
            "delta_equipement_lien_ip_pt": "Delta Equipement",
            "coherence_bdr_bde_extremite_a": "Delta Equipement",
            "coherence_bdr_bde_extremite_b": "Delta Equipement",
            "routage_radio": "Routage radio",
            "delta_nombre_ip_existants": "Delta Nb Ips",
            "conformite_status": "Conformité Status",
        }

        accumulated_results = defaultdict(lambda: {"count": 0, "percentage": 0})

        # Calculate inconsistencies for latest records
        total_inconsistencies_fields = sum(
            rows_with_latest_date.filter(**{f"{field}__icontains": "NOK"}).count()
            for field in type_of_inconsistencies
        )

        
        for inconsistency_field, display_name in type_of_inconsistencies.items():
            count = rows_with_latest_date.filter(**{f"{inconsistency_field}__icontains": "NOK"}).count()
            accumulated_results[display_name]["count"] += count

        for display_name, values in accumulated_results.items():
            values["percentage"] = round((values["count"] / total_inconsistencies_fields) * 100) if total_inconsistencies_fields > 0 else 0

        inconsistency_types = [
            {"type": display_name, "count": values["count"], "percentage": values["percentage"]}
            for display_name, values in accumulated_results.items()
        ]

        responsables = [
            r for r in rows_with_latest_date.values_list("responsable", flat=True)
            if r != "nan"
        ]

        split_responsables = []
        for responsable in responsables:
            split_responsables.extend(responsable.split(";"))
        split_responsables = [r if r and r.strip() else "N/A" for r in responsables]

        root_cause_counter = Counter(split_responsables)
        total_root_causes = sum(root_cause_counter.values())

        root_causes = [
            {
                "cause": cause.strip(),
                "count": count,
                "percentage": round((count / total_root_causes) * 100) if total_root_causes > 0 else 0,
            }
            for cause, count in root_cause_counter.items()
        ]

        def safe_value(value):
            return value if value is not None else None

        data = {
            "latest_record": safe_value(latest_date),
            "general_statistics": {
                "total_equipment": safe_value(total_equipment),
                "total_inconsistencies": safe_value(total_inconsistencies_fields),
                "coherence_rate": safe_value(round(coherence_rate)),
            },
            "coherence_breakdown": {
                "total_ok": total_ok,
                "total_nok": total_nok,
            },
            "inconsistency_types": inconsistency_types,
            "root_causes": root_causes,
            "monthly_data": monthly_data  # Added monthly_data to the response
        }

        return Response(data)

class L712CasCsgStatisticsView(APIView):

    def get(self, request):
        # Get the latest record to show the latest audit date
        latest_record = (
            L712CasCsg.objects.order_by('-insertion_date').values('insertion_date').first()
        )

        # If no records exist, return an empty response or handle as needed
        if not latest_record:
            return Response({"message": "No records found"}, status=200)

        latest_date = latest_record['insertion_date']

        # Filter data for the latest insertion_date
        rows_with_latest_date = L712CasCsg.objects.filter(insertion_date=latest_date)

        # General statistics (based on latest date)
        total_equipment = rows_with_latest_date.count()
        total_ok = rows_with_latest_date.filter(nb_incoherences="0").count()
        total_nok = total_equipment - total_ok
        total_inconsistencies_fields = rows_with_latest_date.exclude(nb_incoherences__isnull=True).count()
        coherence_rate = (total_ok / total_equipment * 100) if total_equipment > 0 else 0

        # Build monthly data (for coherence rate over time)
        monthly_aggregation = (
            L712CasCsg.objects
            .annotate(month=TruncMonth('insertion_date'))
            .values('month')
            .annotate(
                total_equipment=Count('id', distinct=True),
                total_ok=Count('id', filter=Q(nb_incoherences="0")),
                total_nok=Count('id', filter=~Q(nb_incoherences="0"))
            )
            .order_by('month')
        )

        monthly_data = []
        for item in monthly_aggregation:
            te = item['total_equipment']
            tok = item['total_ok']
            cr = (tok / te * 100) if te > 0 else 0
            monthly_data.append({
                'year_month': item['month'].strftime('%Y-%m'),
                'coherence_rate': round(cr),
                'total_ok': tok,
                'total_nok': item['total_nok']
            })

        # Define the mapping of database fields to display names for inconsistencies
        type_of_inconsistencies = {
            "routage": "Routage",
            "delta_nombre_ip_existants": "Delta Nb Ip",
            "delta_vlan": "Delta vlan",
            "coherence_bdr_bde_vlan_a": "Delta vlan",
            "coherence_bdr_bde_vlan_b": "Delta vlan",
            "coherence_bdr_bde_adrs_ip_a": "Delta vlan",
            "coherence_bdr_bde_adrs_ip_b": "Delta vlan",
            "conformite_lag_ul": "Delta Lag",
            "conformite_lag_dl": "Delta Lag",
            "coherence_bdr_bde_lag_a": "Delta Lag",
            "coherence_bdr_bde_lag_b": "Delta Lag",
            "conformite_port_dl": "Delta Ports",
            "conformite_port_ul": "Delta Ports",
            "coherence_bdr_bde_port_a": "Delta Ports",
            "coherence_bdr_bde_port_b": "Delta Ports",
            "delta_equipement_lien_ip_pt": "Delta Equipement",
            "coherence_bdr_bde_extremite_b": "Delta Equipement",
            "conformite_status": "Conformité Status",
        }

        accumulated_results = defaultdict(lambda: {"count": 0, "percentage": 0})

        # Calculate inconsistencies for latest records
        total_inconsistencies_fields = sum(
            rows_with_latest_date.filter(**{f"{field}__icontains": "NOK"}).count()
            for field in type_of_inconsistencies
        )

        for inconsistency_field, display_name in type_of_inconsistencies.items():
            count = rows_with_latest_date.filter(**{f"{inconsistency_field}__icontains": "NOK"}).count()
            accumulated_results[display_name]["count"] += count

        for display_name, values in accumulated_results.items():
            values["percentage"] = round((values["count"] / total_inconsistencies_fields) * 100) if total_inconsistencies_fields > 0 else 0

        inconsistency_types = [
            {"type": display_name, "count": values["count"], "percentage": values["percentage"]}
            for display_name, values in accumulated_results.items()
        ]

        responsables = [
            r for r in rows_with_latest_date.values_list("responsable", flat=True)
            if r != "nan"
        ]

        split_responsables = []
        for responsable in responsables:
            split_responsables.extend(responsable.split(";"))

        split_responsables = [r if r and r.strip() else "N/A" for r in responsables]
        root_cause_counter = Counter(split_responsables)
        total_root_causes = sum(root_cause_counter.values())

        root_causes = [
            {
                "cause": cause.strip(),
                "count": count,
                "percentage": round((count / total_root_causes) * 100) if total_root_causes > 0 else 0,
            }
            for cause, count in root_cause_counter.items()
        ]

        def safe_value(value):
            return value if value is not None else None

        data = {
            "latest_record": safe_value(latest_date),
            "general_statistics": {
                "total_equipment": safe_value(total_equipment),
                "total_inconsistencies": safe_value(total_inconsistencies_fields),
                "coherence_rate": safe_value(round(coherence_rate)),
            },
            "coherence_breakdown": {
                "total_ok": total_ok,
                "total_nok": total_nok,
            },
            "inconsistency_types": inconsistency_types,
            "root_causes": root_causes,
            "monthly_data": monthly_data
        }

        return Response(data)
