import React, { useState } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import MKTypography from 'components/MKTypography';
import axiosInstance from 'AxiosApi/AxiosInstance';

function FileInput() {
  const [files, setFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadDuplicate, setUploadDuplicate] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...selectedFiles]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      console.error('No file selected');
      return;
    }
setLoading(true);
const formData = new FormData();
  files.forEach((file) => {
    formData.append(file.name, file); // Append each file with its original name as the key
  });
  
  console.log(formData); 
    try {
      const csrfResponse = await axiosInstance.get("/fluxoa/api/get_csrf_token/");
      const csrfToken = csrfResponse.data.csrf_token;
      const response = await axiosInstance.post('/fluxoa/api/upload_excel/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken
        }
      });
      const url = '/fluxoa/api/mail_generation/'
      const res = await axiosInstance.post(url);
      if (res && response && response.status === 200) {
        setUploadSuccess(true);
      } else if (response && response.status === 400) {
        console.log("test duplicate");
        setUploadDuplicate(true);
      }
    } catch (error) {
      console.error('Error uploading file', error);
setUploadDuplicate(true);
    }finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const inputRef = React.useRef(null);

  const handleCloseDialog = () => {
    setUploadSuccess(false);
    setUploadDuplicate(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button
        variant="outlined"
        onClick={handleButtonClick}
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
        style={{ marginLeft: 'auto', marginTop: 10, color: 'white' }}
      >
        <InsertDriveFileIcon style={{ marginRight: 5 }} /> Upload Excel
      </Button>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".xlsx, .xls"
        required
        multiple
        ref={inputRef}
        style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%' }}
      />
      {files.length > 0 && (
        <div style={{ marginTop: 10, marginLeft: 'auto', color: 'white' }}>
          <MKTypography variant="h3" color="white"> Selected files:</MKTypography>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {files.map((file, index) => (
              <li key={index} style={{ fontSize: 12, marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <MKTypography variant="h6" color="white"> {file.name}</MKTypography>
              </li>
            ))}
          </ul>
          <Button
            variant="outlined"
            onClick={handleUpload}
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            style={{ marginTop: 10, color: 'white' }}
            disabled={loading}
          >
            Upload
          </Button>
{loading && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
              <CircularProgress />
            </div>
          )}
        </div>
      )}
      <Dialog open={uploadSuccess || uploadDuplicate} onClose={handleCloseDialog}>
        <DialogTitle>Statut Telchargement</DialogTitle>
        <DialogContent>
          {uploadSuccess && <p>Le Fichier est telecharge avec succes.</p>}
          {uploadDuplicate && <p>Un Fichier de cette semaine est deja deployer.</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FileInput;
