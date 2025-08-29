/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import DualBrandNavbar from "examples/Navbars/DefaultNavbar/DualBrandNavbar";
// Material Kit 2 React examples
//import DefaultNavbar from "examples/Navbars/DefaultNavbar";
//import HomeIcon from "@mui/icons-material/Home";
// Author page sections
import Profile from "pages/LandingPages/Author/sections/Profile";
//import Posts from "pages/LandingPages/Author/sections/Posts";
//import Contact from "pages/LandingPages/Author/sections/Contact";
//import Footer from "pages/LandingPages/Author/sections/Footer";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/controle-des-livrables.jpg";
//import profilepicture from "assets/images/audit.jpg";
import profile from "assets/images/bg-presentation.jpg";
import profile2 from "assets/images/audit2.jpg";
function Author() {
  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <DualBrandNavbar routes={routes} />

        <MKBox bgColor="white">
          <MKBox
            minHeight="25rem"
            width="100%"
            sx={{
              backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.dark.main, 0.8),
                  rgba(gradients.dark.state, 0.8)
                )}, url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "grid",
              placeItems: "center",
            }}
          />
          <Card
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mt: -8,
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            
            <Profile
              title="LP71.2 Migrations des sites distants vers CSG"
              description=""
              pic={profile}
            />
          </Card>
        </MKBox>
      </div>
    </>
  );
}

export default Author;
