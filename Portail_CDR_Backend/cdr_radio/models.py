from django.db import models

class Fluxoa(models.Model):
    ID = models.AutoField(primary_key=True)
    ID_CELL = models.CharField(max_length=255)
    ETAT_EXPLOITATION_CRS = models.CharField(max_length=255)
    PRESENCE = models.CharField(max_length=255)
    STATUS = models.CharField(max_length=255)
    PRESENCE_TABLE = models.CharField(max_length=255)
    DATE = models.DateField()

    def __str__(self):
        return f"ID: {self.ID}, ID_CELL: {self.ID_CELL}, ETAT_EXPLOITATION_CRS: {self.ETAT_EXPLOITATION_CRS}, PRESENCE: {self.PRESENCE}, STATUS: {self.STATUS}, PRESENCE_TABLE: {self.PRESENCE_TABLE}, DATE: {self.DATE}"



class CellDataDci(models.Model):
    ID = models.AutoField(primary_key=True)
    Cell_State_BDE = models.CharField(max_length=500)
    Cell_State_BDR = models.CharField(max_length=500)
    CellState_Commentaire = models.CharField(max_length=500)
    CellName = models.CharField(max_length=500)
    CELLNAME_BDE = models.CharField(max_length=500)
    CODE_ACQUITTEMENT = models.CharField(max_length=500)
    CODE_FICHIER = models.CharField(max_length=500)
    Constructeur = models.CharField(max_length=500)
    ETAT_EXPLOITATION_CRS = models.CharField(max_length=500)
    ETAT_EXPLOITATION_CRS_R = models.CharField(max_length=500)
    CELLNAME_BDE = models.CharField(max_length=500)
    ID_CELL = models.CharField(max_length=500)
    ID_CELL_cible = models.CharField(max_length=500)
    PRESENCE = models.CharField(max_length=500)
    NOM_FICHIER = models.CharField(max_length=500)
    Site_Logique = models.CharField(max_length=500)
    TECHNO = models.CharField(max_length=500)
    Site_Theorique = models.CharField(max_length=500)
    TYPE_OBJET = models.CharField(max_length=500)
    ZONE_NOK = models.CharField(max_length=500)

    def __str__(self):
        return self.CellName



class CellDataSfr(models.Model):
    
    CODE = models.CharField(max_length=500)
    CODE_FICHIER = models.CharField(max_length=500)
    IDcell = models.CharField(max_length=500)
    NOM_FICHIER = models.CharField(max_length=500)
    ID_CELL_cible = models.CharField(max_length=500)
    TYPE_OBJET = models.CharField(max_length=500)
    TECHNO = models.CharField(max_length=500)
    ZONE_NOK = models.CharField(max_length=500)

    def __str__(self):
        return self.IDcell

