// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React components
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Images
import post1 from "assets/images/csg-fh-ptn.jpg";
import post2 from "assets/images/csg-ctr-fh.jpg";
import post3 from "assets/images/cat-audit.jpg";

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
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title="LP31.8 DEPLOIMENT CSG: CSG<>CTR via FH"
                description=""
                action={{
                  type: "internal",
                  route: "/Chart",
                  label: "",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title="LP31.8 DEPLOIMENT CSG: CSG<>PTN via FH"
                description=""
                action={{
                  type: "internal",
                  route: "/Chartcsgptn",
                  label: "",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title="LP31.8 DEPLOIMENT CSG: CSG<>CSG via FH"
                description=""
                action={{
                  type: "internal",
                  route: "/Chartcsgfhcsg",
                  label: "",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title="LP31.8 DEPLOIMENT CSG: CSG<>PTN via FTTA"
                description=""
                action={{
                  type: "internal",
                  route: "/chartcsgptnftta",
                  label: "",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title="LP31.8 DEPLOIMENT CSG: CSG<>CSG via FTTA"
                description=""
                action={{
                  type: "internal",
                  route: "/chartcsgcsgftta",
                  label: "",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title="LP31.8 DEPLOIMENT CSG: CSG<>CTR via FTTA"
                description=""
                action={{
                  type: "internal",
                  route: "/chartcsgctrftta",
                  label: "",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <FilledInfoCard
                variant="solid"
                color="rgba(242, 242, 242, 1)"
                icon=""
                title="AUDIT IP FH"
                description=""
                action={{
                  type: "internal",
                  route: "/chartFh",
                  label: "",
                }}
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
                action={{
                  type: "internal",
                  route: "/globalcsg",
                  label: "",
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Places;

