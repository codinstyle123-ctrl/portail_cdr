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

function AuditInputWithAuth({ csrfTokenUrl, uploadUrl, onUploadSuccess, audit_type }) {
  const AUTH_URL = "/authentication/token/obtain/";

  // File and upload states
  const [files, setFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Authentication states
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [authError, setAuthError] = useState(null);

  // Fields for the audit form
  const [auditTitle, setAuditTitle] = useState(""); // For the title entered by the user
  const [auditType] = useState(audit_type); // Accepting audit_type as a prop

  const inputRef = React.useRef(null);

  // Open the dialog when user clicks the button
  const handleButtonClick = () => {
    setAuthDialogOpen(true);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...selectedFiles]);
  };

  // Handle authentication input change
  const handleAuthInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle the authentication submit
  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const authResponse = await axiosInstance.post(AUTH_URL, {
        username: userData.username,
        password: userData.password,
      });

      if (authResponse && authResponse.status === 200) {
        // Authentication successful, proceed with file upload
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

  // Handle file upload after authentication
  const handleFileUpload = async () => {
    if (files.length === 0 || !auditTitle) {
      console.error("Aucun fichier sélectionné ou Titre de l'audit manquant");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("image", file);
    });

    // Append audit title and type to FormData
    formData.append("title", auditTitle);
    formData.append("audit_type", auditType);

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

  // Handle closing the status dialog (success or error)
  const handleCloseStatusDialog = () => {
    setUploadSuccess(false);
    setUploadError(false);
    location.reload();
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Button to trigger the popup */}
      <Button
        variant="outlined"
        onClick={handleButtonClick}
        style={{ marginLeft: "auto", marginTop: 10, color: "white" }}
      >
        <InsertDriveFileIcon style={{ marginRight: 5 }} /> Ajouter un audit
      </Button>

      {/* Authentication and Upload Dialog */}
      <Dialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <MKTypography variant="h4" fontWeight="medium">
            Authentification et Importer un Audit
          </MKTypography>
        </DialogTitle>
        <DialogContent>
          <MKBox component="form" role="form" onSubmit={handleAuthSubmit}>
            {/* Authentication Fields */}
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

            {/* Audit Title and File Upload Fields */}
            <MKBox mb={2}>
              <MKInput
                label="Titre de l'audit"
                name="auditTitle"
                fullWidth
                value={auditTitle}
                onChange={(e) => setAuditTitle(e.target.value)} // Update title as the user types
                required
              />
            </MKBox>

            <MKBox mb={2}>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".png, .jpg, .jpeg, .JPEG, .JPG"
                multiple
                style={{ width: "100%" }}
              />
            </MKBox>

            <MKBox mt={4} mb={1}>
              <MKButton variant="solid" fullWidth type="submit" disabled={loading}>
                S'authentifier et Télécharger
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

AuditInputWithAuth.propTypes = {
  csrfTokenUrl: PropTypes.string.isRequired,
  uploadUrl: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func,
  audit_type: PropTypes.string.isRequired, // Accept audit_type as a prop
};

export default AuditInputWithAuth;
