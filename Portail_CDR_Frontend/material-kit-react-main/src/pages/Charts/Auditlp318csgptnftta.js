//import Head from "next/head";
import { Container, Unstable_Grid2 as Grid } from "@mui/material";
import { OverviewBudget } from "../../overview/overview-budget";
import { OverviewSales } from "../../overview/overview-sales";
//import { OverviewTasksProgress } from "../../overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "../../overview/overview-total-customers";
import { OverviewTotalProfit } from "../../overview/overview-total-profit";
import { OverviewTraffic } from "../../overview/overview-traffic";
import MKTypography from "components/MKTypography";
import bgImage from "assets/images/audit.jpg";
import routes from "routes";
import DualBrandNavbar from "examples/Navbars/DefaultNavbar/DualBrandNavbar";
import axiosInstance from "AxiosApi/AxiosInstance";
import { useState } from "react";
import { useEffect } from "react";
import { OverviewTotalProfitArchitecture } from "overview/overview-total-profit-Architecture";
import { HorizentalBarChart } from "overview/HorizentalBarChart";
import post1 from "assets/images/csg-fh-ptn.jpg";
import DownloadTemplateButtonCSG from "components/MKButton/DownloadTemplateButtonCSG";
//const now = new Date();
import GeneralFileInput from "components/MKInput/GeneralFileInput";
const PageCsgPtnFtta = () => {
  const [chartData, setChartData] = useState([]);
  const [nbrofRecords, setNbrofRecords] = useState([]);
  const [data, setData] = useState(null);
  const [nokData, setNokData] = useState([]);
  const [repcsg, setRepcsg] = useState([]);
  const [latestDate, setLatestDate] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/audits/api/auditcsgfttaptn/tauxdecoherence")
      .then((response) => setNbrofRecords(response.data))
      .catch((error) => console.error("Error fetching data:", error));
    axiosInstance
      .get("/audits/api/auditcsgctr/getlatestdate")
      .then((response) => setLatestDate(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    axiosInstance
      .get("/audits/api/auditcsgfttaptn/repartitioncsg")
      .then((response) => setRepcsg(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    axiosInstance
      .get("/audits/api/auditcsgfttaptn/repartionincoherence")
      .then((response) => setNokData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/audits/api/auditcsgfttaptn/evolutiontauxdecoherence")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const columnsCSGPTNFTTA = [
    "id","N_CSG","Constructeur_CSG","Architecture","Connexion","Equipment_parent",
    "Equipement_Parent_BDR","Delta_Equipement_parent","Port_CSG","Port_CSG_BDR",
    "Delta_Port_CSG","Etat_port_CSG","LAG_CSG","LAG_CSG_BDR","Delta_LAG_CSG",
    "Loopback0_CSG","Loopback0_CSG_BDR","Delta_Loopback0_CSG","Loopback1_CSG",
    "Loopback1_CSG_BDR","Delta_Loopback1_CSG","IP_Interco_CSG","IP_Interco_CSG_BDR",
    "Delta_IP_Interco_CSG","Vlan_Interco_CSG","VLAN_Interco_CSG_BDR","Delta_Vlan_Trafic_CSG",
    "IP_SUP_CSG","IP_Interco_SUP_CSG_BDR","Delta_IP_Interco_SUP_CSG_BDR","VLAN_SUP_CSG",
    "VLAN_Interco_SUP_CSG_BDR","Delta_VLAN_Interco_SUP_CSG_BDR","PORT_Parent","PORT_CTR_BDR",
    "Delta_Port_CTR","LAG_Parent","Etat_Port_Parent","LAG_CTR_BDR","Delta_LAG_CTR","IP_Interco_Parent",
    "IP_Interco_CTR_BDR","Delta_IP_Interco_CTR_BDR","Vlan_Interco_Parent","VLAN_Interco_CTR_BDR",
    "Delta_VLAN_Interco_CTR_BDR","IP_SUP_Parent","IP_Interco_SUP_CTR_BDR","Delta_IP_Interco_SUP_CTR_BDR",
    "VLAN_SUP_Parent","VLAN_SUP_CTR_BDR","Delta_VLAN_SUP_CTR_BDR","IP_RADIO","IP_Radio_BDR",
    "Delta_IP_Radio_BDR","PORT_RADIO","Port_Radio_BDR","Delta_Port_Radio_BDR","LAG_RADIO",
    "LAG_Radio_BDR","Delta_LAG_Radio_BDR","VLAN_RADIO","VLAN_Radio_BDR","Delta_VLAN_Radio_BDR",
    "ETAT_BDR_BDE","Lien_IP_Interco","Routage_Lien_IP","Lien_IP_SUP","Routage_Lien_IP_SUP","Lien_AGG",
    "Routage_Lien_AGG","Lien_ZT","Routage_Lien_ZT","Lien_LO","LAG","VLAN","Adresse_IP_Interco","Adresse_IP_SUP",
    "Adresse_IP_Loopback0_1","Adresse_IP_Radio","Modelisation_des_Liens","Port","Routage_des_Liens",
    "ETAT_CSG","Date_column","Usine_Prod"
  ];
  const chartSeries = Object.values(nokData);
  const labels = Object.keys(nokData);
  useEffect(() => {
    // Fetch chart data and handle the response
    axiosInstance
      .get("/audits/api/auditcsgfttaptn/")
      .then((response) => {
        const groupedData = groupDataByMonth(response.data);
        setChartData(groupedData);
      })
      .catch((error) => console.error("Error fetching chart data:", error));
  }, []);

const groupDataByMonth = (data) => {
  const groupedData = {};

  data.forEach((item) => {
    const month = item.month.split("-")[1]; // Get the month part of the date string

    if (!groupedData[month]) {
      groupedData[month] = {
        month: item.month,
        sites_conformes: 0,
        sites_avec_incoherence: 0,
        percentage_sites_conformes: 0, // Initialize the percentage
      };
    }

    // Sum the values for "Sites conformes" and "Sites avec incohérence"
    groupedData[month].sites_conformes += item.sites_conformes;
    groupedData[month].sites_avec_incoherence += item.sites_avec_incoherence;

    // Calculate the total records for that month
    const totalRecords = groupedData[month].sites_conformes + groupedData[month].sites_avec_incoherence;

if (totalRecords > 0) {
  groupedData[month].percentage_sites_conformes = Math.round((groupedData[month].sites_conformes / totalRecords) * 100);
} else {
  groupedData[month].percentage_sites_conformes = 0; // Handle division by zero
}
  });

  console.log(Object.values(groupedData)); // Log the final grouped data with percentage
  return Object.values(groupedData); // Return grouped data as an array
};
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
            Audit CSG PTN VIA FTTA <GeneralFileInput csrfTokenUrl="/fluxoa/api/get_csrf_token/" 
  uploadUrl="audits/api/uploadcsvcsg" />
          <DownloadTemplateButtonCSG columns={columnsCSGPTNFTTA} filename="file.xlsx" />
          </MKTypography>
          <MKTypography variant="body2" align="center" mb={2} mt={0} sticky color="white">
            {/* Audit Rafraichit le {latestDate.latest_date} */}
          </MKTypography>
        </div>

        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={nbrofRecords ? nbrofRecords.percentage : 0}
                positive={nbrofRecords ? nbrofRecords.percentage > 0 : false}
                sx={{ height: "100%" }}
                value={nbrofRecords ? nbrofRecords.csg_fh_ctr_count : 0}
              />
            </Grid>
            {data &&
              data.map((item) => (
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
              <OverviewTotalProfit sx={{ height: "100%" }} value="" title="Parametres Audités" />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfitArchitecture
                sx={{ height: "100%" }}
                image={post1}
                value=""
                title="Architecture"
              />
            </Grid>
            <Grid xs={12} lg={4} sx={{ backgroundColor: "transparent" }}>
              <OverviewSales
                chartData={chartData && chartData.length > 0 ? chartData : []}
                chartSeries={[
                  {
                    name: "Sites conformes",
                    data: chartData.map((item) => item.sites_conformes || 0),
                  },
                  {
                    name: "Sites avec incohérence",
                    data: chartData.map((item) => item.sites_avec_incoherence || 0),
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              {repcsg && Object.keys(repcsg).length > 0 ? (
                <HorizentalBarChart chartData={repcsg} sx={{ height: "100%" }} />
              ) : (
                <div>Telechargement des données en cours</div>
              )}
            </Grid>

            <Grid xs={12} md={6} lg={4}>
              {chartSeries && chartSeries.length > 0 && labels && labels.length > 0 ? (
                <OverviewTraffic
                  chartSeries={chartSeries}
                  labels={labels}
                  sx={{ height: "100%" }}
                />
              ) : (
                <div>Telechargement des données en cours</div>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default PageCsgPtnFtta;
