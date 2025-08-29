import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";
import GeneralFileInput from "components/MKInput/GeneralAuditInput";
import axiosInstance from "AxiosApi/AxiosInstance";

function Audits() {
  // States for dynamic audits and image modal
  const [customAudits, setCustomAudits] = useState(null);
  const [selectedAuditImage, setSelectedAuditImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // -----------------------
  // Add new audit with authentication
  // -----------------------
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addAuditTitle, setAddAuditTitle] = useState("");
  const [addAuditImage, setAddAuditImage] = useState(null);
  const [addUserData, setAddUserData] = useState({ username: "", password: "" });
  const [addAuthError, setAddAuthError] = useState(null);
  const [addLoading, setAddLoading] = useState(false);

  const handleAddOpen = () => setAddDialogOpen(true);
  const handleAddClose = () => {
    setAddDialogOpen(false);
    setAddAuditTitle("");
    setAddAuditImage(null);
    setAddUserData({ username: "", password: "" });
    setAddAuthError(null);
  };

  const handleAddFileChange = (e) => {
    setAddAuditImage(e.target.files[0]);
  };

  const handleAddAuthInputChange = (e) => {
    const { name, value } = e.target;
    setAddUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAuthSubmit = async (e) => {
    e.preventDefault();
    if (!addAuditTitle || !addAuditImage) {
      console.error("Missing audit title or image");
      return;
    }
    setAddLoading(true);
    try {
      // Authenticate using your auth endpoint
      const authResponse = await axiosInstance.post("/authentication/token/obtain/", {
        username: addUserData.username,
        password: addUserData.password,
      });
      if (authResponse && authResponse.status === 200) {
        // Retrieve CSRF token
        const csrfResponse = await axiosInstance.get("/fluxoa/api/get_csrf_token/");
        const csrfToken = csrfResponse.data.csrf_token;

        // Prepare form data for upload
        const formData = new FormData();
        formData.append("auditTitle", addAuditTitle);
        formData.append("auditImage", addAuditImage);

        // Upload the new audit
        const response = await axiosInstance.post("audits/add/catalogues", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
          },
        });
        if (response && response.status === 201) {
          console.log("Audit added successfully");
          // Optionally refresh customAudits list here
        } else {
          console.error("Unexpected response", response);
        }
        handleAddClose();
      } else {
        setAddAuthError("Échec de l'authentification. Veuillez vérifier vos identifiants.");
      }
    } catch (error) {
      console.error("Error in add audit authentication/submit", error);
      setAddAuthError("Erreur d'authentification. Veuillez réessayer.");
    } finally {
      setAddLoading(false);
    }
  };

  // -----------------------
  // Edit audit with authentication and image preview
  // -----------------------
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editAudit, setEditAudit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuditImage, setEditAuditImage] = useState(null);
  const [editPreviewImage, setEditPreviewImage] = useState(null);
  const [editUserData, setEditUserData] = useState({ username: "", password: "" });
  const [editAuthError, setEditAuthError] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const openEditDialog = (audit) => {
    setEditAudit(audit);
    setEditTitle(audit.title);
    // Load current image preview using require.context
    const fileName = audit.image.split("/").pop();
    try {
      const image = auditImages(`./${fileName}`);
      setEditPreviewImage(image);
    } catch (e) {
      setEditPreviewImage(null);
    }
    setEditUserData({ username: "", password: "" });
    setEditAuthError(null);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditAudit(null);
    setEditTitle("");
    setEditAuditImage(null);
    setEditPreviewImage(null);
    setEditUserData({ username: "", password: "" });
    setEditAuthError(null);
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    setEditAuditImage(file);
    setEditPreviewImage(URL.createObjectURL(file));
  };

  const handleEditAuthInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditAuthSubmit = async (e) => {
    e.preventDefault();
    if (!editTitle) {
      console.error("Missing audit title");
      return;
    }
    setEditLoading(true);
    try {
      const authResponse = await axiosInstance.post("/authentication/token/obtain/", {
        username: editUserData.username,
        password: editUserData.password,
      });
      if (authResponse && authResponse.status === 200) {
        const csrfResponse = await axiosInstance.get("/fluxoa/api/get_csrf_token/");
        const csrfToken = csrfResponse.data.csrf_token;
        const formData = new FormData();
        // Note: For edit endpoint the backend expects "title" and "image"
        formData.append("title", editTitle);
        if (editAuditImage) {
          formData.append("image", editAuditImage);
        }
        const response = await axiosInstance.post(`audits/edit/catalogues/${editAudit.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
          },
        });
        if (response && response.status === 200) {
          console.log("Audit updated successfully");
          location.reload();
        } else {
          console.error("Unexpected response", response);
        }
        handleEditClose();
      } else {
        setEditAuthError("Échec de l'authentification. Veuillez vérifier vos identifiants.");
      }
    } catch (error) {
      console.error("Error updating audit", error);
      setEditAuthError("Erreur d'authentification. Veuillez réessayer.");
    } finally {
      setEditLoading(false);
    }
  };

  // -----------------------
  // Delete audit with authentication
  // -----------------------
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAudit, setDeleteAudit] = useState(null);
  const [deleteUserData, setDeleteUserData] = useState({ username: "", password: "" });
  const [deleteAuthError, setDeleteAuthError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openDeleteDialog = (audit) => {
    setDeleteAudit(audit);
    setDeleteUserData({ username: "", password: "" });
    setDeleteAuthError(null);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteAudit(null);
    setDeleteUserData({ username: "", password: "" });
    setDeleteAuthError(null);
  };

  const handleDeleteAuthInputChange = (e) => {
    const { name, value } = e.target;
    setDeleteUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteAuthSubmit = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);
    try {
      const authResponse = await axiosInstance.post("/authentication/token/obtain/", {
        username: deleteUserData.username,
        password: deleteUserData.password,
      });
      if (authResponse && authResponse.status === 200) {
        const response = await axiosInstance.post(`audits/delete/catalogues/${deleteAudit.id}`);
        if (response && response.status === 204) {
          console.log("Audit deleted successfully");
          setDeleteDialogOpen(false);
          location.reload();
        } else {
          console.error("Unexpected response", response);
        }
      } else {
        setDeleteAuthError("Échec de l'authentification. Veuillez vérifier vos identifiants.");
      }
    } catch (error) {
      console.error("Error deleting audit", error);
      setDeleteAuthError("Erreur d'authentification. Veuillez réessayer.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // -----------------------
  // Utility: Create a context for all images in the audit images folder
  // -----------------------
  const auditImages = require.context(
    "assets/images/media/audit_images",
    false,
    /\.(png|jpe?g|svg)$/
  );

  const handleAuditClick = (imagePath) => {
    const fileName = imagePath.split("/").pop();
    try {
      const image = auditImages(`./${fileName}`);
      setSelectedAuditImage(image);
    } catch (e) {
      console.error("Error loading image:", e);
    }
  };

  // -----------------------
  // Fetch dynamic audits on component mount
  // -----------------------
  useEffect(() => {
    setIsLoading(true);
    const route = "audits/add/catalogues?audit_type=CAT";
    axiosInstance
      .get(route)
      .then((response) => {
        setCustomAudits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching audits data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <MKBox component="section" style={{ height: "100%" }} py={2}>
      {/* Inline CSS for hover icon overlay */}
      <style>
        {`
          .audit-card {
            position: relative;
          }
          .icon-overlay {
            position: absolute;
            top: 5px;
            right: 5px;
            display: flex;
            gap: 5px;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .audit-card:hover .icon-overlay {
            opacity: 1;
          }
        `}
      </style>

      {/* Header */}
      <div
        style={{
          backgroundColor: "#0055a4",
          padding: "10px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MKTypography variant="h1" align="center" mb={0} color="white" />
        <MKTypography variant="h2" align="center" mb={0} ml={15} color="white">
          CATALOGUE DES AUDITS
        </MKTypography>
        <GeneralFileInput
          style={{ marginRight: "10px" }}
          csrfTokenUrl="/fluxoa/api/get_csrf_token/"
          uploadUrl="audits/add/catalogues"
          audit_type="CAT"
        />
      </div>

      {isLoading && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <CircularProgress />
          <MKTypography variant="h5" mt={2}>
            Chargement des données...
          </MKTypography>
        </div>
      )}

      <Container style={{ height: "100%" }}>
        <Grid container spacing={2}>
          {/* Static Audits */}
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title="AUDIT IP FH"
                description=""
                action={{ type: "internal", route: "/chartFh", label: "" }}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title="AUDIT DOUBLONS IP"
                description=""
                action={{ type: "internal", route: "/audit/chartDoublonIpFH", label: "" }}
              />
            </div>
          </Grid>          
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title="KPI Global Audit CSG"
                description=""
                action={{ type: "internal", route: "/audit/csg/global", label: "" }}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title={
                  <div style={{ textAlign: "center", fontWeight: "bold" }}>
                    <div>Audit CSG</div>
                    <div>Par architecture</div>
                  </div>
                }
                description={
                  <div
                    style={{
                      textAlign: "center",
                      backgroundColor: "transparent",
                      color: "#344767",
                      fontWeight: "bold",
                    }}
                  >
                    {/* (via FH/FTTA) */}
                  </div>
                }
                action={{ type: "internal", route: "/audit/CSG-FH-CTR", label: "" }}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title="KPI Global Audit ATR"
                description=""
                action={{ type: "internal", route: "/audit/atr/global", label: "" }}
              />
            </div>
          </Grid>

          {/* Custom Audits (Dynamic) */}
          {customAudits &&
            customAudits.map((audit) => (
              <Grid item xs={12} lg={4} key={audit.id}>
                <div
                  className="audit-card"
                  style={{ display: "flex", flexDirection: "column", height: "100%", cursor: "pointer" }}
                  onClick={() => handleAuditClick(audit.image)}
                >
                  <FilledInfoCard
                    variant="solid"
                    color="rgba(242, 242, 242, 1)"
                    icon=""
                    title={audit.title}
                    description=""
                  />
                  <div className="icon-overlay">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditDialog(audit);
                      }}
                      size="small"
                      style={{ background: "rgba(255,255,255,0.7)" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteDialog(audit);
                      }}
                      size="small"
                      style={{ background: "rgba(255,255,255,0.7)" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </Grid>
            ))}
        </Grid>
      </Container>

      {/* --------------------------
          Add Audit Dialog with Authentication
      -------------------------- */}
      <Dialog open={addDialogOpen} onClose={handleAddClose}>
        <DialogTitle>Ajouter un nouveau Audit</DialogTitle>
        <form onSubmit={handleAddAuthSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nom d'utilisateur"
              name="username"
              fullWidth
              value={addUserData.username}
              onChange={handleAddAuthInputChange}
              required
            />
            <TextField
              margin="dense"
              label="Mot de passe"
              name="password"
              type="password"
              fullWidth
              value={addUserData.password}
              onChange={handleAddAuthInputChange}
              required
            />
            <TextField
              margin="dense"
              label="Titre de l'audit"
              fullWidth
              value={addAuditTitle}
              onChange={(e) => setAddAuditTitle(e.target.value)}
              required
            />
            <input
              accept="image/*"
              style={{ marginTop: "16px" }}
              type="file"
              onChange={handleAddFileChange}
              required
            />
            {addAuthError && (
              <MKTypography variant="body2" color="error">
                {addAuthError}
              </MKTypography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddClose}>Annuler</Button>
            <Button type="submit" variant="contained" disabled={addLoading}>
              {addLoading ? <CircularProgress size={24} /> : "S'authentifier et Télécharger"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* --------------------------
          Edit Audit Dialog with Authentication & Preview
      -------------------------- */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Modifier Audit</DialogTitle>
        <form onSubmit={handleEditAuthSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nom d'utilisateur"
              name="username"
              fullWidth
              value={editUserData.username}
              onChange={handleEditAuthInputChange}
              required
            />
            <TextField
              margin="dense"
              label="Mot de passe"
              name="password"
              type="password"
              fullWidth
              value={editUserData.password}
              onChange={handleEditAuthInputChange}
              required
            />
            <TextField
              margin="dense"
              label="Titre de l'audit"
              fullWidth
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            {editPreviewImage && (
              <div style={{ marginTop: "16px" }}>
                <img
                  src={editPreviewImage}
                  alt="Prévisualisation"
                  style={{ width: "100px", height: "auto", border: "1px solid #ccc" }}
                />
              </div>
            )}
            <input
              accept="image/*"
              style={{ marginTop: "16px" }}
              type="file"
              onChange={handleEditFileChange}
            />
            {editAuthError && (
              <MKTypography variant="body2" color="error">
                {editAuthError}
              </MKTypography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Annuler</Button>
            <Button type="submit" variant="contained" disabled={editLoading} style={{ color: "white" }}>
              {editLoading ? <CircularProgress size={24} /> : "S'authentifier et Modifier"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* --------------------------
          Delete Audit Dialog with Authentication
      -------------------------- */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Supprimer Audit</DialogTitle>
        <form onSubmit={handleDeleteAuthSubmit}>
          <DialogContent>
            <MKTypography variant="body1" mb={2}>
              Saisissez vos identifiants pour confirmer la suppression.
            </MKTypography>
            <TextField
              autoFocus
              margin="dense"
              label="Nom d'utilisateur"
              name="username"
              fullWidth
              value={deleteUserData.username}
              onChange={handleDeleteAuthInputChange}
              required
            />
            <TextField
              margin="dense"
              label="Mot de passe"
              name="password"
              type="password"
              fullWidth
              value={deleteUserData.password}
              onChange={handleDeleteAuthInputChange}
              required
            />
            {deleteAuthError && (
              <MKTypography variant="body2" color="error">
                {deleteAuthError}
              </MKTypography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Annuler</Button>
            <Button type="submit" variant="contained" disabled={deleteLoading} style={{color:"white"}}>
              {deleteLoading ? <CircularProgress size={24} /> : "S'authentifier et Supprimer"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* --------------------------
          Dialog to display clicked audit image
      -------------------------- */}
      <Dialog
        open={!!selectedAuditImage}
        onClose={() => setSelectedAuditImage(null)}
        fullScreen
        maxWidth="xl"
      >
        <DialogTitle></DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            height: "100vh",
          }}
        >
          {selectedAuditImage && (
            <img
              src={selectedAuditImage}
              alt="Audit"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedAuditImage(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </MKBox>
  );
}

export default Audits;
