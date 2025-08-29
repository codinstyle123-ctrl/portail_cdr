import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const DownloadTemplateButtonCSG = ({ columns, filename }) => {
  const handleDownload = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([columns]);
    XLSX.utils.book_append_sheet(wb, ws, "Template");

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    };

    // Ensure the filename ends with .xlsx
    const finalFilename = filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`;

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), finalFilename);
  };

  return (
    <Tooltip title="Voulez-vous télécharger le modèle d'entrée ?">
      <IconButton onClick={handleDownload} color="primary">
        <GetAppIcon style={{ fontSize: 30 , color: "#ffffff"}} />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadTemplateButtonCSG;
