import { Card, Container, Unstable_Grid2 as Grid, CircularProgress, Button } from "@mui/material";
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

const AuditCSG = () => {
  // ---------------------
  // State / Hooks
  // ---------------------
  const [csgData, setCsgData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [nbrofRecords, setNbrofRecords] = useState({});
  const [nokData, setNokData] = useState({});
  const [nokData1, setNokData1] = useState({});
  const [latestDate, setLatestDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // By default, the switch is on "radio"
  // Switch states: "radio" | "imes"
  const [switchPosition, setSwitchPosition] = useState("imes");

  const navigate = useNavigate();

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
        ? `/audits/api/auditcsg/imes/`
        : `/audits/api/auditcsg/radio/`;

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
  }, [switchPosition]);

  // When csgData changes, update all relevant states
  useEffect(() => {
    if (csgData && !csgData.message) {
      setNbrofRecords(csgData.taux_de_coherence || {});
      setNokData(csgData.nok_percentage || {});
      setNokData1(csgData.nok_ip_routage_percentage || {});
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
          <div style={{ backgroundColor: "#0055a4" }}>
            <MKTypography variant="h1" align="center" mb={0} mt={1} sticky color="white">
              Audit CSG Global
            </MKTypography>

          </div>

          {isLoading && (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <CircularProgress />
              <MKTypography variant="h5" mt={2}>
                Chargement des données...
              </MKTypography>
            </div>
          )}
        </div>
      </>
    );
  }


  // ---------------------
  // Normal Render
  // ---------------------
  const chartSeries = Object.values(nokData);
  const labels = Object.keys(nokData);

  const chartSeries1 = Object.values(nokData1);
  const labels1 = Object.keys(nokData1);

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
        <div style={{ backgroundColor: "#0055a4" }}>
          <MKTypography variant="h1" align="center" mb={0} mt={1} sticky color="white">
            Audit CSG Global
          </MKTypography>
          {/* Colonne de gauche : Audit rafraîchi le ... */}
          
          {/* The SwitchButton (Radio / IMES) */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SwitchButton
              leftLabel={<MKTypography variant="body1" color="white">IMES</MKTypography>}
              rightLabel={<MKTypography variant="body1" color="white">Radio</MKTypography>}
              checked={switchPosition === "radio"}
              onChange={handleSwitchChange}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center"}}>
            <MKTypography variant="body2" color="white" mb={0}>
              Audit Rafraichit le {latestDate || "N/A"}
            </MKTypography>
          </div>
        </div>
        {/* 1) Show loader if isLoading */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <CircularProgress />
            <MKTypography variant="h5" mt={2}>
              Chargement des données...
            </MKTypography>
          </div>
        )}
        {/* Main Content */}
        {/* <Card> */}
        <div style={{ marginLeft: "6%", marginRight: "6%", padding: "8px" }}>
          <Grid container spacing={3}>

            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={nbrofRecords?.percentage ?? 0}
                positive={Boolean(nbrofRecords?.percentage > 0)}
                sx={{ height: "100%" }}
                value={nbrofRecords?.csg_count ?? 0}
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

            <Grid xs={12} lg={4} sx={{ backgroundColor: "transparent" }}>
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

            <Grid xs={12} md={6} lg={4}>
              {chartSeries1.length > 0 && labels1.length > 0 ? (
                <OverviewTraffic
                  chartSeries={chartSeries1}
                  labels={labels1}
                  sx={{ height: "100%" }}
                />
              ) : (
                <div>Téléchargement des données en cours</div>
              )}
            </Grid>

            <Grid xs={12} md={6} lg={4}>
              {chartSeries.length > 0 && labels.length > 0 ? (
                <OverviewTraffic
                  chartSeries={chartSeries}
                  labels={labels}
                  sx={{ height: "100%" }}
                  title="Responsable selon GCR NOK"
                />
              ) : (
                <div>Téléchargement des données en cours</div>
              )}
            </Grid>
          </Grid>
        </div>
        {/* </Card>  */}
      </div>
    </>
  );
};

export default AuditCSG;
