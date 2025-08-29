import React, { useState, useEffect } from "react";
import { Card, Unstable_Grid2 as Grid, CircularProgress, Box } from "@mui/material";
import MKTypography from "components/MKTypography";
import DualBrandNavbar from "examples/Navbars/DefaultNavbar/DualBrandNavbar";
import routes from "routes";
import axiosInstance from "AxiosApi/AxiosInstance";
import GeneralFileInput from "components/MKInput/GeneralFileInput";
import DownloadTemplateButtonDoublonsIP from "components/MKButton/DownloadTemplateButtonCSG";
import CoherenceRateChart from "components/Charts/CoherenceRateChart";
import DynamicDonutChart from "components/Charts/DynamicDonutChart";

const columnsDoublonsIP = [
  "doublons_adresse_ip",
  "add_ip_paire",
  "add_ip_impaire",
  "equipment_radio_dans_bdr_trans",
  "equipment_trans_dans_bdr_trans",
  "equipment_radio_dans_bde_trans",
  "equipment_trans_dans_bde_trans",
  "equipment_radio_dans_bde_radio",
  "port_dans_bde_trans",
  "existe_dans_bdr_trans",
  "doublons_dans_bde_trans",
  "doublons_dans_bde_radio",
  "insertion_date"
];

const AuditDoublonsIPAddress = () => {
  const [latestDate, setLatestDate] = useState("");
  const [doublonsIPCount, setDoublonsIPCount] = useState(0);
  const [tauxDeCoherencePercentage, setTauxDeCoherencePercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [auditData, setAuditData] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/audits/audit_doublons_ip/");
      const data = response.data;
      setLatestDate(data.latest_date || "");
      setDoublonsIPCount(data.taux_de_coherence?.doublons_ip_count || 0);
      setTauxDeCoherencePercentage(data.taux_de_coherence?.percentage || 0);
      setAuditData(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // TODO: Replace these placeholders with real data from auditData
  const categories = [];
  const parcNOK = [];
  const parcOK = [];
  const coherenceRate = 0;

  return (
    <>
      {/* Navbar */}
      <div style={{ backgroundColor: "white" }}>
        <DualBrandNavbar routes={routes} />
      </div>

      <div style={{ minHeight: "100vh", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
        {/* Header Section */}
        <div style={{ backgroundColor: "#0055a4", padding: "10px 0" }}>
          <div style={{ marginLeft: "6%", marginRight: "6%", padding: "8px" }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs="auto">
                <MKTypography variant="body2" color="white" mb={0}>
                  Audit Rafraichit le {latestDate || "N/A"}
                </MKTypography>
              </Grid>

              <Grid item xs>
                <MKTypography variant="h3" align="center" color="white" mb={0} mt={0}>
                  KPI Audit Doublons IP
                </MKTypography>
              </Grid>

              <Grid item xs="auto" mt={0}>
                <Grid container spacing={1}>
                  <Box>
                    <GeneralFileInput
                      csrfTokenUrl="/fluxoa/api/get_csrf_token/"
                      uploadUrl="/audits/audit_doublons/upload"
                    />
                  </Box>
                  <Box marginTop={"10px"}>
                    <DownloadTemplateButtonDoublonsIP
                      columns={columnsDoublonsIP}
                      filename="Input Template"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <CircularProgress />
            <MKTypography variant="h5" mt={2}>
              Chargement des données...
            </MKTypography>
          </div>
        )}

        {/* Main Content */}
        {!isLoading && (
          <div style={{ marginLeft: "6%", marginRight: "6%", padding: "8px" }}>
            {/* Summary Card */}
            <Card
              sx={{
                my: 2,
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                padding: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  border: "1px solid white",
                  padding: "6px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderBottom: "4px solid #0055a4",
                  mb: 1,
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={3}>
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

              {/* Charts */}
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
              </Grid>
            </Card>

            {/* KPIs */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ padding: 2, textAlign: "center" }}>
                  <MKTypography variant="h6">Total Doublons IP</MKTypography>
                  <MKTypography variant="h4">{doublonsIPCount}</MKTypography>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ padding: 2, textAlign: "center" }}>
                  <MKTypography variant="h6">Taux de cohérence</MKTypography>
                  <MKTypography variant="h4">{tauxDeCoherencePercentage}%</MKTypography>
                </Card>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </>
  );
};

export default AuditDoublonsIPAddress;
