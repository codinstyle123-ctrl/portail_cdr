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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React components
import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
//import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";

// Images
import post1 from "assets/images/csg-fh-ptn.jpg";
import post2 from "assets/images/csg-ctr-fh.jpg";
import post3 from "assets/images/cat-audit.jpg";
//import post4 from "assets/images/examples/blog2.jpg";

function Places() {
  return (
    <MKBox component="section" py={2}>
      <div style={{ backgroundColor: "#0055a4" }}>
        <MKTypography variant="h1" align="center" mb={6} mt={4} sticky color="white">
          CATALOGUE DES AUDITS
        </MKTypography>
      </div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post2}
              title="LP31.8 DEPLOIMENT CSG: CSG<>CTR via FH"
              description=""
              action={{
                type: "internal",
                route: "/Chart",
              }}
            />
          </Grid>
      <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post1}
              title="LP31.8 DEPLOIMENT CSG: CSG<>PTN via FH"
              description=""
              action={{
                type: "internal",
                route: "/Chartcsgptn",
              }}
            />
          </Grid>
  <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post1}
              title="LP31.8 DEPLOIMENT CSG: CSG<>CSG via FH"
              description=""
              action={{
                type: "internal",
                route: "/Chartcsgfhcsg",
              }}
            />
          </Grid>
  <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post1}
              title="LP31.8 DEPLOIMENT CSG: CSG<>PTN via FTTA"
              description=""
              action={{
                type: "internal",
                route: "/chartcsgptnftta",
              }}
            />
          </Grid>
  <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post1}
              title="LP31.8 DEPLOIMENT CSG: CSG<>CSG via FTTA"
              description=""
              action={{
                type: "internal",
                route: "/chartcsgcsgftta",
              }}
            />
          </Grid>
  <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post1}
              title="LP31.8 DEPLOIMENT CSG: CSG<>CTR via FTTA"
              description=""
              action={{
                type: "internal",
                route: "/chartcsgctrftta",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TransparentBlogCard
              image={post3}
              title="AUDIT IP FH"
              description=""
              action={{
                type: "internal",
                route: "/chartFh",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Places;
