import React, { useState } from "react";
import PropTypes from "prop-types";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import MKTypography from "components/MKTypography";
import axiosInstance from "AxiosApi/AxiosInstance";

function FileInput({ csrfTokenUrl, uploadUrl, onUploadSuccess }) {
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
      console.error("Aucun fichier sélectionné");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const csrfResponse = await axiosInstance.get(csrfTokenUrl);
      const csrfToken = csrfResponse.data.csrf_token;
      const response = await axiosInstance.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfToken,
        },
      });

      if (response && response.status === 201) {
        setUploadSuccess(true);
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } else if (response && response.status === 400) {
        setUploadDuplicate(true);
      } else {
        console.error("Réponse inattendue :", response);
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier", error);
      setUploadDuplicate(true);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const inputRef = React.useRef(null);

  const handleCloseDialog = () => {
    if (uploadSuccess) {
      window.location.reload(); // Reload the page if upload was successful
    }
    setUploadSuccess(false);
    setUploadDuplicate(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Button
        variant="outlined"
        onClick={handleButtonClick}
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
        style={{ marginLeft: "auto", marginTop: 10, color: "white" }}
      >
        <InsertDriveFileIcon style={{ marginRight: 5 }} /> Importer un fichier Excel
      </Button>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".xlsx, .xls"
        required
        multiple
        ref={inputRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
          width: "100%",
          height: "100%",
        }}
      />
      {files.length > 0 && (
        <div style={{ marginTop: 10, marginLeft: "auto", color: "white" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {files.map((file, index) => (
              <li
                key={index}
                style={{
                  fontSize: 12,
                  marginBottom: 5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <MKTypography variant="h6" color="white">
                  {file.name}
                </MKTypography>
              </li>
            ))}
          </ul>
          <Button
            variant="outlined"
            onClick={handleUpload}
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            style={{ marginTop: 10, color: "white" }}
            disabled={loading}
          >
            Envoyer le fichier sélectionné
          </Button>
          {loading && (
            <div
              style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      )}
      <Dialog open={uploadSuccess || uploadDuplicate} onClose={handleCloseDialog}>
        <DialogTitle>Statut de l'envoi</DialogTitle>
        <DialogContent>
          {uploadSuccess && <p>Le fichier a été envoyé avec succès.</p>}
          {uploadDuplicate && <p>Une erreur s'est produite. Veuillez vérifier vos fichiers.</p>}
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

FileInput.propTypes = {
  csrfTokenUrl: PropTypes.string.isRequired,
  uploadUrl: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func, // rendre l'appel de retour optionnel
};

export default FileInput;
