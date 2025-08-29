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
//import bgImage from "assets/images/bg-presentation.jpg";
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
          width: "100%", // Make sure the button fits within the card
          maxWidth: "200px", // Limit the width of the button
          height: "80px", // Adjust height if needed
          fontSize: "0.9rem", // Adjust font size to fit
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MKTypography color="white">vérifier les Parametres</MKTypography>
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
          <List align>
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Adresse Loopback" color="#00000" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Adresse Interco SUP CSG<>CTR " />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Adresse Interco Traffic CSG<>CTR" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Port CSG<>CTR" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="VLAN CSG<>CTR" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="LAG CSG<>CTR" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Modelisation Liens" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Routage Liens" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="Port Radio" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="LAG Radio" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="IP Radio" />
            </ListItem>
            <Divider />
            <ListItem button style={{ backgroundColor: "white", outlineColor: "white" }}>
              <ListItemText style={{ marginLeft: 20 }} primary="VLAN Radio" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    </div>
  );
}
