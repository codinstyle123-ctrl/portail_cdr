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
import { HorizentalBarChart } from "overview/HorizentalBarChartCsg";
import post2 from "assets/images/csg-ctr-fh.jpg";
import DownloadTemplateButtonCSG from "components/MKButton/DownloadTemplateButtonCSG";
import SwitchButton from "components/SwitchButton/SwitchButton";
import ArchitectureSelector from "components/MKBox/ArchitectureSelector";

const AuditCSG = () => {
  // ---------------------
  // State / Hooks
  // ---------------------
  const [csgData, setCsgData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [nbrofRecords, setNbrofRecords] = useState({});
  const [nokData, setNokData] = useState({});
  const [repcsg, setRepcsg] = useState({});
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

    // If switchPosition = "radio", call /radio/<architecture>
    // If switchPosition = "imes", call /imes/<architecture>
    const route =
      switchPosition === "imes"
        ? `/audits/api/auditcsg/imes/${architecture}`
        : `/audits/api/auditcsg/radio/${architecture}`;

    axiosInstance
      .get(route)
      .then((response) => {
        setCsgData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching CSG data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [switchPosition, architecture]);

  // When csgData changes, update all relevant states
  useEffect(() => {
    if (csgData && !csgData.message) {
      setNbrofRecords(csgData.taux_de_coherence || {});
      setNokData(csgData.nok_percentage || {});
      setRepcsg(csgData.repartition_data || {});
      setLatestDate(csgData.latest_date || "");
      setChartData(groupDataByMonth(csgData.evolution || []));

    }
  }, [csgData]);

  // ---------------------
  // Switch Handler
  // ---------------------
  const handleSwitchChange = (event) => {
    // If the Switch is now checked => use "radio", else use "imes"
    setSwitchPosition(event.target.checked ? "radio" : "imes");
  };

  // ---------------------
  // Columns for CTR or CSG
  // ---------------------
 

  let columnsCSG = [
    "n_csg",
    "usine_prod",
    "constructeur_csg",
    "architecture",
    "connexion",
    "equipment_parent",
    "equipement_parent_bdr",
    "delta_equipement_parent",
    "port_csg",
    "port_csg_bdr",
    "delta_port_csg",
    // "etat_port_csg",
    "lag_csg",
    "lag_csg_bdr",
    "delta_lag_csg",
    "loopback0_csg",
    "loopback0_csg_bdr",
    "delta_loopback0_csg",
    "loopback1_csg",
    "loopback1_csg_bdr",
    "delta_loopback1_csg",
    "ip_interco_csg",
    "ip_interco_csg_bdr",
    "delta_ip_interco_csg",
    "vlan_interco_csg",
    "vlan_interco_csg_bdr",
    "delta_vlan_interco_csg",
    "ip_sup_csg",
    "ip_sup_csg_bdr",
    "delta_ip_sup_csg",
    "vlan_sup_csg",
    "vlan_sup_csg_bdr",
    "delta_vlan_sup_csg",
    "port_ctr",
    "port_ctr_bdr",
    "delta_port_ctr",
    // "etat_port_ctr",
    "lag_ctr",
    "lag_ctr_bdr",
    "delta_lag_ctr",
    "ip_interco_ctr",
    "ip_interco_ctr_bdr",
    "delta_ip_interco_ctr",
    "vlan_interco_ctr",
    "vlan_interco_ctr_bdr",
    "delta_vlan_interco_ctr",
    "ip_sup_ctr",
    "ip_sup_ctr_bdr",
    "delta_ip_sup_ctr",
    "vlan_sup_ctr",
    "vlan_sup_ctr_bdr",
    "delta_vlan_sup_ctr_bdr",
    "ip_radio",
    "ip_radio_bdr",
    "delta_ip_radio_bdr",
    "port_radio",
    "port_radio_bdr",
    "delta_port_radio_bdr",
    "lag_radio",
    "lag_radio_bdr",
    "delta_lag_radio_bdr",
    "vlan_radio",
    "vlan_radio_bdr",
    "delta_vlan_radio_bdr",
    "etat_bdr_bde",
    "lien_ip_interco",
    "routage_lien_ip_interco",
    "lien_ip_supp",
    "routage_lien_ip_supp",
    "lien_agg",
    "routage_lien_agg",
    "lien_pt",
    "routage_lien_pt",
    "lien_zt_csg_fht",
    "lag",
    "lag_global",
    "vlan",
    "vlan_global",
    "port_csg_ctr",
    "port_global",
    "adresse_ip_interco",
    "adresse_ip_sup",
    "adresse_ip_loopback0_1",
    // "adresse_ip_radio",
    "modelisation_des_liens",
    "routage_des_liens",
    "etat_de_coherence_imes",
    "etat_de_coherence_radio",
    "etat_csg",
    "insertion_date",
  ];

  // If architecture includes "ctr", use columnsCTR
  if (architecture.toLowerCase().includes("csg-ftta-ctr")) {
    columnsCSG = columnsCTR;
  }


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
                  <Box mt={1} width={180}>
                    <ArchitectureSelector />
                  </Box>
                </Grid>

                {/* Colonne du milieu : Titre (centré) */}
                <Grid item xs>
                  <MKTypography variant="h3" align="center" color="white" mb={0} mt={0}>
                    Audit {architecture}
                  </MKTypography>
                </Grid>

                {/* Colonne de droite : Boutons Import & Download */}
                <Grid item xs="auto" mt={0}>
                  <Grid item display="flex" >
                    <Box item alignItems="center">
                      <GeneralFileInput csrfTokenUrl="/fluxoa/api/get_csrf_token/" uploadUrl="audits/audit_csg/upload" />
                    </Box>
                    <Box marginTop={"10px"} alignItems="center">
                      <DownloadTemplateButtonCSG columns={columnsCSG} filename="Input Template" />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* Deuxième ligne : SwitchButton centré sous le titre */}
              <Grid container justifyContent="center" mr={10} mt={0}>
                <Grid item>
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
                <Box mt={1} width={180}>
                  <ArchitectureSelector />
                </Box>
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
                  Audit {architecture}
                </MKTypography>
              </Grid>

              {/* Colonne de droite : Boutons Import & Download */}
              <Grid item xs="auto" mt={0}>
                <Grid item display="flex" >
                  <Box item alignItems="center">
                    {/* Bouton Importer un fichier + flèche (Download) à droite */}
                    <GeneralFileInput
                      csrfTokenUrl="/fluxoa/api/get_csrf_token/"
                      uploadUrl="audits/audit_csg/upload"
                    />
                  </Box>
                  <Box marginTop={"10px"} alignItems="center">
                    <DownloadTemplateButtonCSG columns={columnsCSG} filename="Input Template" />
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Deuxième ligne : SwitchButton centré sous le titre */}
            <Grid container justifyContent="center" mr={10} mt={0}>
              <Grid item>
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
                value={nbrofRecords?.csg_count ?? 0}
                architecture={architecture}
              />
            </Grid>
            {csgData.evolution_de_coherance &&
              csgData.evolution_de_coherance.map((item) => (
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
                    name: "Sites avec incohérence",
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
              {repcsg && Object.keys(repcsg).length > 0 ? (
                <HorizentalBarChart chartData={repcsg} sx={{ height: "100%" }} />
              ) : (
                <div>Téléchargement des données en cours</div>
              )}
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
          </Grid>
        </div>
        {/* </Card> */}
      </div >
    </>
  );
};

export default AuditCSG;
