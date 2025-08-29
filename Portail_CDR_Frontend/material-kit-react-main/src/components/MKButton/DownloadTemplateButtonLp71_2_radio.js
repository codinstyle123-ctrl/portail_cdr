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
      "Equipement A",
      "Element Conf",
      "Responsable",
      "Phase d'audit",
      "Num Changement Parent",
      "Nom Lien IP",
      "Etat",
      "Statut",
      "Site Geo A",
      "Nom Port A",
      "Constructeur A",
      "Adresse IP A",
      "Equipement B",
      "Site Geo B",
      "Nom Port B",
      "Constructeur B",
      "Nom Interface A",
      "Nom Interface B",
      "Adresse IP B",
      "Cohérence Routage IP",
      "VLAN A",
      "VLAN B",
      "routage Lien IP",
      "Nom Lien PT",
      "Etat PT",
      "Statut PT",
      "Equipement A PT",
      "Nom Port A PT",
      "Equipement B PT",
      "Nom Port B PT",
      "Cohérence Routage PT",
      "routage Lien PT",
      "Nom Lien AGG",
      "Etat AGG",
      "Statut AGG",
      "Equipement A AGG",
      "Num LAG A",
      "Equipement B AGG",
      "Num LAG B",
      "Cohérence Routage AGG",
      "routage Lien AGG",
      "Nom Lien ZT client",
      "Etat ZT client",
      "Statut ZT client",
      "Equipement A ZT client",
      "Nom Port A ZT client",
      "Equipement B ZT client",
      "Nom Port B ZT client",
      "Lien Transmission (Tous)",
      "Liste Transmission",
      "Nom Lien ZT Reseau",
      "Etat ZT Reseau",
      "Statut ZT Reseau",
      "Equipement A ZT Reseau",
      "Nom Port A ZT Reseau",
      "Equipement B ZT Reseau",
      "Nom Port B ZT Reseau",
      "IP",
      "Adresse IP BDE",
      "VLAN BDE",
      "Port BDE",
      "Interface BDE",
      "Porteur BDE",
      "Radio BDE",
      "Router BDE",
      "Statut ARP",
      "Routage Lien IP",
      "Routage Lien PT",
      "Routage Lien AGG",
      "Routage Lien ZT Client",
      "Routage Lien ZT Reseau",
      "Nombre IP Present",
      "Nombre IP requis",
      "Delta nombre IP existants",
      "Routage Radio",
      "delta vlan",
      "Delta Equipement Lien IP <> PT",
      "Delta Port AGG<>FHT",
      "Delta FHT Lien AGG<>ZT",
      "Conformité Status",
      "Conformité Règles/Choix Lag",
      "Conformité Règles/Choix Port",
      "Cohérence BDR/BDE Extrimité A",
      "Cohérence BDR/BDE Extrimité B",
      "Cohérence BDR/BDE - VLAN",
      "Statut de cohérence",
      "NB d'incohérences",
      "Statut d'incohérence",
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
