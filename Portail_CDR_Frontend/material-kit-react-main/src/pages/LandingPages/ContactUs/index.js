
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import DualBrandNavbar from "examples/Navbars/DefaultNavbar/DualBrandNavbar";
import routes from "routes";
import { useState } from "react";
// Material Kit 2 React examples
//import DefaultNavbar from "examples/Navbars/DefaultNavbar";
//import HomeIcon from "@mui/icons-material/Home";
// Routes
//import routes from "routes";

// Image
import bgImage from "assets/images/bg-contact.jpg";
import axiosInstance from "AxiosApi/AxiosInstance";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
function ContactUs() {
const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const csrfResponse = await axiosInstance.get("/contact/get_csrf_token/");
        const csrfToken = csrfResponse.data.csrf_token;

        const response = await axiosInstance.post(
            "/contact/send_email/",
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
            }
        );

        if (response.status === 200) {
 setUploadSuccess(true);
        } else {
            // Handle error, e.g., show an error message to the user
            console.error("Email sending failed.");
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
  const handleCloseDialog = () => {
    setUploadSuccess(false);
  };
  return (
    <>
      <div style={{ height: "150px", backgroundColor: "white" }}>
        <DualBrandNavbar routes={routes} />
      </div>
      <Grid
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "90vh", // Set minimum height to fill the viewport
        }}
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={6}
          xl={4}
          ml={{ xs: "auto", lg: 6 }}
          mr={{ xs: "auto", lg: 6 }}
        >
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
            p={0}
          >
            <MKBox
              variant="solid"
              bgColor="#0055A4"
              coloredShadow="#0055A4"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <MKTypography variant="h3" color="white" justifyContent="center" alignItems="center">
                NOUS CONTACTER{" "}
              </MKTypography>
            </MKBox>
            <MKBox p={3}>
              <MKTypography variant="body2" color="text" mb={3}>
                N&apos;hesitez pas à utiliser le formulaire pour deposer vos demandes
              </MKTypography>
              <MKBox width="100%" component="form" method="post" autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MKInput
                      variant="standard"
                      label="Nom Complet"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MKInput
                      type="email"
                      variant="standard"
                      label="Email"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MKInput
                      type="text"
                      variant="standard"
                      label="Departement"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MKInput
                      variant="standard"
                      label="Comment on peut vous aider ?"
                      placeholder="Ecrire votre message..."
                      InputLabelProps={{ shrink: true }}
                      multiline
                      fullWidth
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  <MKButton type="submit" variant="solid" color="#0055A4" onClick={handleSubmit}>
                    Envoyer le Message
                  </MKButton>
                </Grid>
              </MKBox>
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>
<Dialog open={uploadSuccess} onClose={handleCloseDialog}>
        <DialogTitle>Le mail est envoye avec succes</DialogTitle>
        <DialogContent>
          <p>Bien reçu ! Nous avons bien reçu votre message. Nous vous contacterons dès que possible. Merci !</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ContactUs;
