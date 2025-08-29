import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const DownloadTemplateButton = () => {

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      [
        "id", "region", "id_lien", "equipement", "site_geo", "site_theo", "region_1", 
        "installe", "type_extremite", "adresse_ip", "statut_ip", "constructeur", 
        "materiel", "etat", "nature", "statut", "statut_lp35", "statut_swap_fh", 
        "ip_omc", "tdj_osa", "check_ip", "tdj_cdr", "tdj_swap_ip", "date_demande_swap_dci", 
        "nb_fht", "statut_coherence_adresses_ip", "porteur", "action_description", 
        "Data_Insertion_Date", "type_incoherence"
      ]
    ]);

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
        <GetAppIcon style={{ fontSize: 30,color:"#ffffff" }} />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadTemplateButton;
