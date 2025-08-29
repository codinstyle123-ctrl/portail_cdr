import React, { useState, useEffect } from "react";
import DualBrandNavbar from "examples/Navbars/DefaultNavbar/DualBrandNavbar";
import MKTypography from "components/MKTypography";
import GeneralFileInput from "components/MKInput/GeneralFileInput";
import DownloadTemplateButton from "components/MKButton/DownloadTemplateButtonLp71_2_csg";
import axiosInstance from "AxiosApi/AxiosInstance";
import { Card, Container, Grid, Box } from "@mui/material";
import routes from "routes";
import CoherenceRateChart from "components/Charts/CoherenceRateChart";
import DynamicDonutChart from "components/Charts/DynamicDonutChart";

const PageLp71_2 = () => {
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/controle/lp71_2_csg/statistics/");
      setAuditData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch audit data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const transformMonth = (yearMonthStr) => {
    // yearMonthStr is like "2024-01"
    // We can parse this and format it nicely
    const [year, month] = yearMonthStr.split("-");
    const date = new Date(`${year}-${month}-01`);
    const options = { year: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options).replace(" ", " - ");
  };

  // If we have monthly_data, transform it into arrays for the chart
  const categories = auditData?.monthly_data
    ? auditData.monthly_data.map((item) => transformMonth(item.year_month))
    : [];

  const parcNOK = auditData?.monthly_data
    ? auditData.monthly_data.map((item) => item.total_nok)
    : [];

  const parcOK = auditData?.monthly_data
    ? auditData.monthly_data.map((item) => item.total_ok)
    : [];

  const coherenceRate = auditData?.monthly_data
    ? auditData.monthly_data.map((item) => item.coherence_rate)
    : [];

  const incoherenceData = {
    series: auditData?.inconsistency_types?.map((item) => item.percentage) || [],
    labels: auditData?.inconsistency_types?.map((item) => item.type) || [],
    colors: ["#1E88E5", "#FFC107", "#9C27B0", "#8BC34A", "#FF5722", "#607D8B", "#43A047"],
    title: "Types d'incohérences",
  };

  const rootCauseData = {
    series: auditData?.root_causes?.map((item) => item.percentage) || [],
    labels: auditData?.root_causes?.map((item) => item.cause) || [],
    colors: ["#28a745", "#ffa500", "#007bff", "#ff5722", "#607d8b"],
    title: "Responsables selon GCR",
  };

  return (
    <>
      {/* Navbar */}
      <div style={{ backgroundColor: "white" }}>
        <DualBrandNavbar routes={routes || []} />
      </div>

      <div style={{ backgroundColor: "#0055a4" }}>
        <div style={{ marginLeft: "6%", marginRight: "6%", padding: "8px" }}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2 }}
          >
            <Grid item>
              {loading ? (
                <MKTypography variant="body2" color="white">
                  Chargement en cours...
                </MKTypography>
              ) : error ? (
                <MKTypography variant="body2" color="white">
                  {error}
                </MKTypography>
              ) : (
                <MKTypography variant="body2" color="white" sx={{ fontWeight: "bold", mb: 0.5 }}>
                  Audit rafraîchi le {auditData?.latest_record || "N/A"}
                </MKTypography>
              )}
            </Grid>
            <Grid item>
              <MKTypography
                variant="h3"
                color="white"
                sx={{ fontWeight: "bold", mb: 0.5 }}
              >
                LP71.2 Migrations des sites distants vers CSG : CSG
              </MKTypography>
            </Grid>
            <Grid item display="flex" >
              <Box item alignItems="center">
                {/* Bouton Importer un fichier + flèche (Download) à droite */}
                <GeneralFileInput
                  csrfTokenUrl="/fluxoa/api/get_csrf_token/"
                  uploadUrl="controle/lp71_2_csg/upload"
                  onUploadSuccess={fetchData}
                />
              </Box>
              <Box marginTop={"10px"} alignItems="center">
                <DownloadTemplateButton />
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ marginLeft: "6%", marginRight: "6%" }}>
        <Card
          sx={{
            my: 2,
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            padding: "20px",
          }}
        >
          {/* Bloc résumé */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              border: "1px solid white",
              padding: "6px", // Réduit le padding
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderBottom: "4px solid #0055a4",
              mb: 1, // Réduit la marge du bas
            }}
          >
            <Grid container spacing={1}> {/* Spacing réduit de 2 à 1 */}
              <Grid item xs={12} sm={6} md={3}>
                {/* On utilise un variant plus petit, ou on applique sx={{ fontSize }} */}
                <MKTypography variant="subtitle2" align="center" sx={{ fontWeight: "bold" }}>
                  Référentiel
                </MKTypography>
                <MKTypography variant="body2" align="center" sx={{ fontSize: "1rem" }}>
                  DRIM
                </MKTypography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <MKTypography variant="subtitle2" align="center" sx={{ fontWeight: "bold" }}>
                  Moyen d’audit
                </MKTypography>
                <MKTypography variant="body2" align="center" sx={{ fontSize: "1rem" }}>
                  Elixir/Script
                </MKTypography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <MKTypography variant="subtitle2" align="center" sx={{ fontWeight: "bold" }}>
                  Moyen de correction
                </MKTypography>
                <MKTypography variant="body2" align="center" sx={{ fontSize: "1rem" }}>
                  DRIM
                </MKTypography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <MKTypography variant="subtitle2" align="center" sx={{ fontWeight: "bold" }}>
                  Parc audité
                </MKTypography>
                <MKTypography variant="body2" align="center" sx={{ fontSize: "1rem" }}>
                  {auditData?.general_statistics?.total_equipment} équipements csg
                </MKTypography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MKTypography variant="subtitle2" align="center" sx={{ fontWeight: "bold" }}>
                  Volume d'incohérences
                </MKTypography>
                <MKTypography variant="body2" align="center" sx={{ fontSize: "1rem" }}>
                  {auditData?.general_statistics?.total_inconsistencies} incohérences /{" "}
                  {auditData?.coherence_breakdown?.total_nok} équipements csg
                </MKTypography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MKTypography variant="subtitle2" align="center" sx={{ fontWeight: "bold" }}>
                  Taux de cohérence
                </MKTypography>
                <MKTypography variant="body2" align="center" sx={{ fontSize: "1rem" }}>
                  {auditData?.general_statistics?.coherence_rate} %
                </MKTypography>
              </Grid>
            </Grid>
          </Box>


          {/* Graphiques */}
          <Grid container spacing={2} alignItems="stretch" justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, height: "100%" }}>
                <CoherenceRateChart
                  categories={categories}
                  parcNOK={parcNOK}
                  parcOK={parcOK}
                  coherenceRate={coherenceRate}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, height: "100%" }}>
                <DynamicDonutChart
                  series={rootCauseData.series}
                  labels={rootCauseData.labels}
                  colors={rootCauseData.colors}
                  title={rootCauseData.title}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, height: "100%" }}>
                <DynamicDonutChart
                  series={incoherenceData.series}
                  labels={incoherenceData.labels}
                  colors={incoherenceData.colors}
                  title={incoherenceData.title}
                />
              </Card>
            </Grid>

            {/* Impact des incohérences */}
            <Grid item xs={12}>
              <Card sx={{ p: 2, height: "100%" }}>
                <MKTypography
                  sx={{ fontSize: "20px", fontWeight: "bold", mt: 2, color: "#000" }}
                  align="center"
                >
                  Impact des incohérences:
                </MKTypography>
                <Grid container spacing={1} alignItems="stretch" justifyContent="center">
                  <Grid item xs={12} md={1}></Grid>
                  <Grid item xs={12} md={5}>
                    <MKTypography
                      variant="body1"
                      sx={{
                        fontSize: "18px",
                        color: "#ff0000",
                        mt: 3,
                        fontWeight: "bold",
                      }}
                    >
                      - Pénurie d’adresses IP csg
                    </MKTypography>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <MKTypography
                      variant="body1"
                      sx={{
                        fontSize: "18px",
                        color: "#ff0000",
                        mt: 3,
                        fontWeight: "bold",
                      }}
                    >
                      - Doublons des IP si nettoyage des @Ip incomplet (BDR/BDE)
                    </MKTypography>
                  </Grid>
                  <Grid item xs={12} md={1}></Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
};

export default PageLp71_2;
