
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FileInput from "components/MKInput/FileInput";
import DataTable from "components/Table/DataTable";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import axiosInstance from "AxiosApi/AxiosInstance";
import { useState, useEffect } from "react";
import Fluxoachart from "../../../../overview/fluxoachart";
import bgImage from "assets/images/audit.jpg";
function PlacesCdrRadio() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/fluxoa/api/get_cellule_normal_count/")
      .then((response) => setChartData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
return (
  <div
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <MKBox component="section" py={2} style={{ flex: 1 }}>
      <div style={{ backgroundColor: "#0055a4" }}>
        <MKTypography variant="h1" align="center" mb={6} sticky color="white">
          FLUX OA <FileInput />
        </MKTypography>
      </div>
      <Container style={{ flex: 1 }}>
        <Grid container spacing={1} style={{ height: "100%" }}>
          <Grid item xs={12} sm={6} md={4} style={{ display: "flex" }}>
            <Fluxoachart
              chartData={chartData ? chartData : {}}
              sx={{ height: "100%", width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={7} ml={1} style={{ display: "flex" }}>
            <DataTable />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  </div>
);}

export default PlacesCdrRadio;

