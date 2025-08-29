import { Card, Container, Unstable_Grid2 as Grid, CircularProgress, Button, Box } from "@mui/material";
import { OverviewBudget } from "../../overview/overview-budget";
import { OverviewSales } from "../../overview/overview-sales-csg";
import GeneralFileInput from "components/MKInput/GeneralFileInput";
import { OverviewTotalCustomers } from "../../overview/overview-total-customers";
import { OverviewTotalProfit } from "../../overview/overview-total-profit";
import { OverviewTraffic } from "../../overview/overview-traffic";
import MKTypography from "components/MKTypography";
import routes from "routes";
import DualBrandNavbar from "examples/Navbars/DefaultNavbar/DualBrandNavbar";
import axiosInstance from "AxiosApi/AxiosInstance";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OverviewTotalProfitArchitecture } from "overview/overview-total-profit-Architecture";
import { HorizentalBarChart } from "overview/HorizentalBarChartAtr";
import post2 from "assets/images/csg-ctr-fh.jpg";
import DownloadTemplateButtonATR from "components/MKButton/DownloadTemplateButtonCSG";
import SwitchButton from "components/SwitchButton/SwitchButton";
import ArchitectureSelector from "components/MKBox/ArchitectureSelector";

const AuditAtr = () => {
  // ---------------------
  // State / Hooks
  // ---------------------
  const [atrData, setAtrData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [nbrofRecords, setNbrofRecords] = useState({});
  const [nokData, setNokData] = useState({});
  const [responsableAtr, setResponsableAtr,] = useState({});
  const [latestDate, setLatestDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // By default, the switch is on "radio"
  // Switch states: "radio" | "imes"
  const [switchPosition, setSwitchPosition] = useState("imes");

  const navigate = useNavigate();
  const { architecture } = useParams();

  // ---------------------
  // Helper Functions
  // ---------------------
  const groupDataByMonth = (data = []) => {
    const groupedData = {};

    data.forEach((item) => {
      const month = item.month.split("-")[1] || "00"; // safer fallback
      if (!groupedData[month]) {
        groupedData[month] = {
          month: item.month,
          sites_conformes: 0,
          sites_avec_incoherence: 0,
          percentage_sites_conformes: 0,
        };
      }

      groupedData[month].sites_conformes += item.sites_conformes;
      groupedData[month].sites_avec_incoherence += item.sites_avec_incoherence;

      const total =
        groupedData[month].sites_conformes +
        groupedData[month].sites_avec_incoherence;

      groupedData[month].percentage_sites_conformes =
        total > 0
          ? Math.round((groupedData[month].sites_conformes / total) * 100)
          : 0;
    });

    return Object.values(groupedData);
  };

  // ---------------------
  // Data Fetch
  // ---------------------
  useEffect(() => {
    setIsLoading(true);

    const route =
      switchPosition === "imes"
        ? `/audits/api/auditatr/imes/`
        : `/audits/api/auditatr/radio/`;

    axiosInstance
      .get(route)
      .then((response) => {
        setAtrData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ATR data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [switchPosition]);

  // When atrData changes, update all relevant states
  useEffect(() => {
    if (atrData && !atrData.message) {
      setNbrofRecords(atrData.taux_de_coherence || {});
      setNokData(atrData.nok_percentage || {});
      setResponsableAtr(atrData.responsable || {});
      setLatestDate(atrData.latest_date || "");
      setChartData(groupDataByMonth(atrData.evolution || []));

    }
  }, [atrData]);

  // ---------------------
  // Switch Handler
  // ---------------------
  const handleSwitchChange = (event) => {
    // If the Switch is now checked => use "imes", else use "radio"
    setSwitchPosition(event.target.checked ? "radio" : "imes");
  };

  // ---------------------
  // Columns for atr
  // ---------------------
  const columnsATR = [
    "Key",
    "ATR",
    "connexion",
    "equipment_parent",
    "equipement_parent_bdr",
    "delta_equipement_parent",
    "port_atr",
    "port_atr_bdr",
    "delta_port_atr",
    "lag_atr",
    "lag_atr_bdr",
    "delta_lag_atr",
    "loopback0_atr",
    "lo_ip",
    "delta_loopback0_atr",
    "loopback1_atr",
    "l1_ip",
    "delta_loopback1_atr",
    "ip_interco_atr",
    "ip_interco_bdr",
    "delta_ip_interco_atr",
    "vlan_interco",
    "vlan_interco_bdr",
    "delta_vlan_interco_atr",
    "port_parent",
    "port_parent_bdr",
    "delta_port_parent",
    "lag_parent",
    "lag_parent_bdr",
    "delta_lag_parent",
    "ip_interco_parent",
    "ip_interco_parent_bdr",
    "delta_ip_interco_parent",
    "vlan_interco_parent",
    "vlan_interco_parent_bdr",
    "delta_vlan_interco_parent",
    "port",
    "lag",
    "vlan",
    "addresse_ip",
    "etat_parent",
    "etat_des_couples",
    "etat_final",
    "etat_gcr",
    "service",
    "responsable",
    "insertion_date"
];

  // 2) If data is loaded but no latestDate, consider no data for this architecture
  if (!latestDate) {
    return (
      <>
        <div style={{ backgroundColor: "white" }}>
          <DualBrandNavbar routes={routes} />
        </div>

        <div
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          {/* Header Section */}
          <div style={{ backgroundColor: "#0055a4", padding: "10px 0" }}>
            <div style={{ marginLeft: "6%", marginRight: "6%", padding: "8px" }}>
              {/* Première ligne */}
              <Grid container alignItems="center" justifyContent="space-between">
                {/* Colonne de gauche : Audit rafraîchi le ... */}
                <Grid item xs="auto">
                  <MKTypography variant="body2" color="white" mb={0}>
                    Audit Rafraichit le {latestDate || "N/A"}
                  </MKTypography>
                </Grid>

                {/* Colonne du milieu : Titre (centré) */}
                <Grid item xs>
                  <MKTypography variant="h3" align="center" color="white" mb={0} mt={0} style={{ marginLeft: "6%" }}>
                    KPI Global Audit ATR
                  </MKTypography>
                </Grid>

                {/* Colonne de droite : Boutons Import & Download */}
                <Grid item xs="auto" mt={0}>
                  <Grid item display="flex" >
                    <Box item alignItems="center">
                      <GeneralFileInput csrfTokenUrl="/fluxoa/api/get_csrf_token/" uploadUrl="audits/audit_atr/upload" />
                    </Box>
                    <Box marginTop={"10px"} alignItems="center">
                      <DownloadTemplateButtonATR columns={columnsATR} filename="Input Template" />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* Deuxième ligne : SwitchButton centré sous le titre */}
              <Grid container justifyContent="center" mr={10} mt={0}>
                <Grid hidden>
                  <SwitchButton
                    leftLabel={<MKTypography variant="body1" color="white">IMES</MKTypography>}
                    rightLabel={<MKTypography variant="body1" color="white">Radio</MKTypography>}
                    checked={switchPosition === "radio"}
                    onChange={handleSwitchChange}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ---------------------
  // Normal Render
  // ---------------------
  const chartSeries = Object.values(nokData);
  const labels = Object.keys(nokData);

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <DualBrandNavbar routes={routes} />
      </div>

      <div
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        {/* Header Section */}
        <div style={{ backgroundColor: "#0055a4", padding: "10px 0" }}>
          <div style={{ marginLeft: "6%", marginRight: "6%", padding: "8px" }}>
            {/* Première ligne */}
            <Grid container alignItems="center" justifyContent="space-between">
              {/* Colonne de gauche : Audit rafraîchi le ... */}
              <Grid item xs="auto">
                <MKTypography variant="body2" color="white" mb={0}>
                  Audit Rafraichit le {latestDate || "N/A"}
                </MKTypography>
              </Grid>

              {/* Colonne du milieu : Titre (centré) */}
              <Grid item xs>
                <MKTypography
                  variant="h3"
                  align="center"
                  color="white"
                  mb={0}
                  mt={0}
                >
                  KPI Audit ATR Global
                </MKTypography>
              </Grid>

              {/* Colonne de droite : Boutons Import & Download */}
              <Grid item xs="auto" mt={0}>
                <Grid item display="flex" >
                  <Box item alignItems="center">
                    {/* Bouton Importer un fichier + flèche (Download) à droite */}
                    <GeneralFileInput
                      csrfTokenUrl="/fluxoa/api/get_csrf_token/"
                      uploadUrl="audits/audit_atr/upload"
                    />
                  </Box>
                  <Box marginTop={"10px"} alignItems="center">
                    <DownloadTemplateButtonATR columns={columnsATR} filename="Input Template" />
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Deuxième ligne : SwitchButton centré sous le titre */}
            <Grid container justifyContent="center" mr={10} mt={0}>
              <Grid hidden>
                <SwitchButton
                  leftLabel={<MKTypography variant="body1" color="white">IMES</MKTypography>}
                  rightLabel={<MKTypography variant="body1" color="white">Radio</MKTypography>}
                  checked={switchPosition === "radio"}
                  onChange={handleSwitchChange}
                />
              </Grid>
            </Grid>
          </div>
        </div>

        {/* Chargement / Main Content / etc. */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <CircularProgress />
            <MKTypography variant="h5" mt={2}>
              Chargement des données...
            </MKTypography>
          </div>
        )}

        {/* ... */}
        <div style={{ marginLeft: "6%", marginRight: "6%", padding: "8px" }}>
          <Grid container spacing={3}>

            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={nbrofRecords?.percentage ?? 0}
                positive={Boolean(nbrofRecords?.percentage >= 0)}
                sx={{ height: "100%" }}
                value={nbrofRecords?.atr_count ?? 0}
                architecture="atr"
              />
            </Grid>
            {atrData.evolution_de_coherance &&
              atrData.evolution_de_coherance.map((item) => (
                <Grid key={item.date} xs={12} sm={6} lg={3}>
                  <OverviewTotalCustomers
                    difference={item.difference || 0}
                    positive={item.positive || false}
                    sx={{ height: "100%" }}
                    value={item.value || 0}
                    category={item.category}

                  ></OverviewTotalCustomers>
                </Grid>
              ))}
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit
                sx={{ height: "100%" }}
                value=""
                title="Paramètres Audités"
              />
            </Grid>

            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfitArchitecture
                sx={{ height: "100%" }}
                image={post2}
                value=""
                title="Architecture"
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4} sx={{
              height: 350,
              minHeight: 350,
              maxHeight: 350
            }}
            >
              <OverviewSales
                chartData={chartData}
                chartSeries={[
                  {
                    name: "Sites conformes",
                    data: chartData.map((item) => item.sites_conformes),
                  },
                  {
                    name: "Sites avec incohérences",
                    data: chartData.map((item) => item.sites_avec_incoherence),
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4} sx={{
              height: 350,
              minHeight: 350,
              maxHeight: 350
            }}
            >
              {chartSeries.length > 0 && labels.length > 0 ? (
                <OverviewTraffic
                  chartSeries={chartSeries}
                  labels={labels}
                  sx={{ height: "100%" }}
                />
              ) : (
                <div>Téléchargement des données en cours</div>
              )}
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              {Object.keys(responsableAtr).length > 0 ? (
                <OverviewTraffic
                  chartSeries={Object.values(responsableAtr)} // Responsible values
                  labels={Object.keys(responsableAtr)} // Responsible names
                  sx={{ height: "100%" }}
                  title="Responsable selon GCR NOK"
                />
              ) : (
                <div>Téléchargement des données en cours</div>
              )}
            </Grid>

          </Grid>
        </div>
        {/* </Card> */}
      </div >
    </>
  );
};

export default AuditAtr;
