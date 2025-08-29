import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import PropTypes from 'prop-types';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function  ArchitectureFullScreenDialog({ image }) {
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
        <MKTypography color="white">Consulter l&apos;Architecture</MKTypography>
      </MKButton>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} maxWidth="md">
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Afficher L&apos;Architecture
            </Typography>
          </Toolbar>
        </AppBar>
        <img src={image} alt="Parametres Audités" style={{ width: "100%", height: "auto" }} />
      </Dialog>
    </div>
  );
}

ArchitectureFullScreenDialog.propTypes = {
  image: PropTypes.object.isRequired,
};
