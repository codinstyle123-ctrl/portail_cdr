/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import axiosInstance from "AxiosApi/AxiosInstance";
// react-router-dom components
//import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
//import MuiLink from "@mui/material/Link";

// @mui icons
//import FacebookIcon from "@mui/icons-material/Facebook";
//import GitHubIcon from "@mui/icons-material/GitHub";
//import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
// Material Kit 2 React example components
//import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 React page layout routes
//import routes from "routes";
//import { useNavigate } from "react-router-dom";
// Images
import Cookies from "js-cookie";
import bgImage from "assets/images/audit2.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "AuthContext/AuthContext";
import { useContext } from "react";
function SignInBasic() {
  const [Userdata, setUserdata] = useState({ username: "", password: "" });
  const [error, setError] = useState();
  const { setIsSignedIn } = useContext(AuthContext);

  let axios = axiosInstance;
  const Navigate = useNavigate();

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...Userdata, [name]: value });
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/authentication/token/obtain/", {
        username: Userdata.username,
        password: Userdata.password,
      });

      if (response.status === 200) {
        const jwtAccessToken = response.data.jwt_access_token;
        const jwtRefreshToken = response.data.jwt_refresh_token;

        // Store the JWT tokens in the cookies with appropriate expiration and flags
        Cookies.set("jwt_access_token", jwtAccessToken, {
          expires: 1, // Set the expiration time in days, adjust as needed
          secure: false, // Set to true if using HTTPS
          sameSite: "strict", // Adjust this based on your application's needs
        });
        Cookies.set("jwt_refresh_token", jwtRefreshToken, {
          expires: 7, // Set the expiration time in days, adjust as needed
          secure: false, // Set to true if using HTTPS
          sameSite: "strict", // Adjust this based on your application's needs
        });
        console.log("print for testing");
        let base64User = response.data.access.split(".")[1];
        base64User = JSON.parse(window.atob(base64User));
        localStorage.setItem("currentUser_email", base64User.email);
        localStorage.setItem("currentUser", base64User.user);
        setIsSignedIn(true);
        Navigate("/presentation");

        // localStorage.setItem("currentUserGroups", base64User.groups);
        // localStorage.setItem("currentUserPoteur", base64User.poteur);
        // history.push("/landing"); // Push home
        // window.location.href = "/home";
      }
    } catch (error) {
        setTimeout(() => {
        setError(null);
      }, 5000);
      setError(error.response.data.error || "Authentication Error! Please Check Your Username and Password");
    }
  };

  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="solid"
                bgColor="#009dcc"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h3" fontWeight="medium" color="white" mt={1}>
                  SE CONNECTER{" "}
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}></Grid>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleLogin}>
                  <MKBox mb={2}>
                    <MKInput
                      id="email"
                      type="text"
                      label="Username"
                      name="username"
                      fullWidth
                      onChange={handleInputChanges}
                      value={Userdata.username}
                      required
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      id="password"
                      name="password"
                      fullWidth
                      onChange={handleInputChanges}
                      value={Userdata.password}
                      required
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="solid" color="#009DCC" fullWidth type="submit">
                      Connection{" "}
                    </MKButton>
                  {error && (
          <div
            className="form-group"
            style={{
              border: "2px solid red",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "4px",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center"></MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem"></MKBox>
    </>
  );
}

export default SignInBasic;
