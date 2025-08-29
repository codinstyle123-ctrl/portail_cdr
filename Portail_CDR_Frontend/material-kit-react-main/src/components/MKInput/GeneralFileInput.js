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
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import axiosInstance from "AxiosApi/AxiosInstance";

function FileInputWithAuth({ csrfTokenUrl, uploadUrl, onUploadSuccess }) {
  // Define the authentication URL as a constant inside the component
  const AUTH_URL = "/authentication/token/obtain/";

  // File and upload states
  const [files, setFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Authentication states (inspired by SignInBasic)
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [authError, setAuthError] = useState(null);

  // Trigger file selection
  const inputRef = React.useRef(null);
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...selectedFiles]);
  };

  // Open authentication dialog when user clicks upload
  const handleUploadClick = () => {
    if (files.length === 0) {
      console.error("Aucun fichier sélectionné");
      return;
    }
    setAuthDialogOpen(true);
  };

  // Handle changes for authentication input fields
  const handleAuthInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle the authentication submit (styled like SignInBasic)
  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const authResponse = await axiosInstance.post(AUTH_URL, {
        username: userData.username,
        password: userData.password,
      });
      if (authResponse && authResponse.status === 200) {
        // Authentication successful; close auth dialog and proceed with file upload
        setAuthDialogOpen(false);
        await handleFileUpload();
      } else {
        setAuthError("Échec de l'authentification. Veuillez vérifier vos identifiants.");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setAuthError("Erreur d'authentification. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Perform the file upload after successful authentication
  const handleFileUpload = async () => {
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
      // Retrieve CSRF token
      const csrfResponse = await axiosInstance.get(csrfTokenUrl);
      const csrfToken = csrfResponse.data.csrf_token;

      // Upload file(s) using the token
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
      } else {
        setUploadError(true);
        console.error("Réponse inattendue :", response);
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier", error);
      setUploadError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseStatusDialog = () => {
    setUploadSuccess(false);
    setUploadError(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Button
        variant="outlined"
        onClick={handleButtonClick}
        style={{ marginLeft: "auto", marginTop: 10, color: "white" }}
      >
        <InsertDriveFileIcon style={{ marginRight: 5 }} /> Importer un fichier Excel
      </Button>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".xlsx, .xls"
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
          <MKTypography variant="h6" color="white">
            Fichiers sélectionnés :
          </MKTypography>
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
                {file.name}
              </li>
            ))}
          </ul>
          <MKButton
            variant="outlined"
            onClick={handleUploadClick}
            style={{ marginTop: 10, color: "white" }}
            disabled={loading}
          >
            Envoyer le fichier sélectionné
          </MKButton>
          {loading && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <CircularProgress />
            </div>
          )}
        </div>
      )}

      {/* Authentication Dialog styled with MK components */}
      <Dialog
            open={authDialogOpen}
            onClose={() => setAuthDialogOpen(false)}
            maxWidth="xs"         // <--- controls maximum dialog width (xs, sm, md, lg, xl)
            fullWidth             // <--- makes the dialog expand to the maxWidth
          >
        <DialogTitle>
          <MKTypography variant="h4" fontWeight="medium">
            Authentification
          </MKTypography>
        </DialogTitle>
        <DialogContent>
          <MKBox component="form" role="form" onSubmit={handleAuthSubmit}>
            <MKBox mb={2}>
              <MKInput
                label="Nom d'utilisateur"
                name="username"
                fullWidth
                onChange={handleAuthInputChange}
                value={userData.username}
                required
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                label="Mot de passe"
                name="password"
                type="password"
                fullWidth
                onChange={handleAuthInputChange}
                value={userData.password}
                required
              />
            </MKBox>
            {authError && (
              <MKTypography variant="body2" color="error">
                {authError}
              </MKTypography>
            )}
            <MKBox mt={4} mb={1}>
              <MKButton variant="solid" fullWidth type="submit" disabled={loading}>
                S'authentifier
              </MKButton>
            </MKBox>
          </MKBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAuthDialogOpen(false)}>Annuler</Button>
        </DialogActions>
      </Dialog>

      {/* Upload Status Dialog */}
      <Dialog open={uploadSuccess || uploadError} onClose={handleCloseStatusDialog}>
        <DialogTitle>Statut de l'envoi</DialogTitle>
        <DialogContent>
          {uploadSuccess && (
            <MKTypography color="success">
              Le fichier a été envoyé avec succès.
            </MKTypography>
          )}
          {uploadError && (
            <MKTypography variant="body2" color="error">
              Une erreur s'est produite. Veuillez vérifier vos fichiers.
            </MKTypography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FileInputWithAuth.propTypes = {
  csrfTokenUrl: PropTypes.string.isRequired,
  uploadUrl: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func,
};

export default FileInputWithAuth;
