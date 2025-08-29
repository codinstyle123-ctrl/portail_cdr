import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const DownloadTemplateButton = () => {

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();

    // Column headers provided by you
    const columns = [
      "CSG pendulaire",
      "GCR A",
      "GCR B",
      "Appartenance à la LP",
      "Responsable",
      "Phase d'audit",
      "Nom Lien IP",
      "Equipement A",
      "Etat",
      "Statut",
      "Site Geo A",
      "Lag A BDE",
      "Num Lag A",
      "Nom Port A",
      "Constructeur A",
      "Parent BDE",
      "Equipement B",
      "Site Geo B",
      "Lag B BDE",
      "Num Lag B",
      "Nom Port B",
      "Constructeur B",
      "Nom Interface A",
      "Vlan A BDE",
      "Vlan A",
      "Adresse IP A BDE",
      "Adresse IP A",
      "Nom Interface B",
      "Adresse IP B BDE",
      "Vlan B BDE",
      "Vlan B",
      "Adresse IP B",
      "Cohérence Routage IP",
      "Lien AGG",
      "Etat AGG",
      "Statut AGG",
      "Equipement A AGG",
      "Num LAG A AGG",
      "Equipement B AGG",
      "Num LAG B AGG",
      "Cohérence Routage AGG",
      "Lien PT",
      "Etat PT",
      "Statut PT",
      "Equipement A PT",
      "Port A BDE PT",
      "Num Port A PT",
      "Nom Port A PT",
      "Equipement B PT",
      "Port B BDE PT",
      "Num Port B PT",
      "Nom Port B PT",
      "Cohérence Routage PT",
      "Nom Lien ZT client",
      "Etat ZT client",
      "Statut ZT client",
      "Equipement A ZT client",
      "Nom Port A ZT client",
      "Equipement B ZT client",
      "Nom Port B ZT client",
      "Cohérence Routage ZT client",
      "Nom Lien ZT Reseau",
      "Etat ZT Reseau",
      "Statut ZT Reseau",
      "Equipement A ZT Reseau",
      "Nom Port A ZT Reseau",
      "Equipement B ZT Reseau",
      "Nom Port B ZT Reseau",
      "Cohérence Routage ZT Reseau",
      "Routage lien IP",
      "Routage line AGG",
      "Routage lien PT",
      "Routage lien ZT Client",
      "Routage lien ZT Réseau",
      "Nombre IP Present",
      "Nombre IP Requis",
      "Delta nombre IP existants",
      "Routage",
      "Delta VLAN",
      "Delta Equipement lien IP<>PT",
      "Conformité Status",
      "Conformité Lag DL",
      "Conformité Port DL",
      "Conformité Lag UL",
      "Conformité Port UL",
      "Cohérence BDR/BDE Adrs IP A",
      "Cohérence BDR/BDE Port A",
      "Cohérence BDR/BDE Lag A",
      "Cohérence BDR/BDE VLAN A",
      "Cohérence BDR/BDE Extremite B",
      "Cohérence BDR/BDE Adrs IP B",
      "Cohérence BDR/BDE Port B",
      "Cohérence BDR/BDE Lag B",
      "Cohérence BDR/BDE VLAN B",
      "Statut de cohérence",
      "NB d'incohérences",
      "Etat de cohérence BDR",
      "Etat de cohérence BDR/BDE",
      "Etat de cohérence equipment",
      "insertion_date"
    ];

    // Create a worksheet with the column headers
    const ws = XLSX.utils.aoa_to_sheet([columns]);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    };
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'template.xlsx');
  };

  return (
    <Tooltip title="Voulez-vous télécharger le modèle d'entrée ?">
    <IconButton onClick={handleDownload} color="primary">
      <GetAppIcon style={{ fontSize: 30, color:"#ffffff" }} />
    </IconButton>
  </Tooltip>
  );
};

export default DownloadTemplateButton;
