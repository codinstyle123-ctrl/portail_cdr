import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MKButton
        variant="contained"
        onClick={handleClickOpen}
        color="#0055A4"
        sx={{
          width: "100%",
          maxWidth: "200px",
          height: "80px",
          fontSize: "0.9rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MKTypography color="white">Vérifier les Parametres</MKTypography>
      </MKButton>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} maxWidth="md">
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Parametres Audités
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <List>
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Routage Lien IP" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Routage Lien PT" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Routage Lien AGG" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Routage Lien ZT Réseau" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Routage Lien ZT Client" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Nombre IP Présent" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Nombre IP Requis" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Routage Radio" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Conformité Status" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Conformité Règles/Choix LAG" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Conformité Règles/Choix Port" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Cohérence BDR/BDE Extrémité A" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Cohérence BDR/BDE Extrémité B" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Cohérence BDR/BDE - VLAN" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Cohérence BDR/BDE - LAG" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    </div>
  );
}
