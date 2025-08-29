//import Head from "next/head";
import { Container, Unstable_Grid2 as Grid } from "@mui/material";
import { AuditIpFhCard } from "overview/Audit-Ip-Fh-Card";
import { DonutChartRepartitionIncoherence } from "../../overview/DonutChartRepartitionIncoherence";
import { Card } from "@mui/material";
import MKTypography from "components/MKTypography";
import bgImage from "assets/images/audit.jpg";
import routes from "routes";
import DualBrandNavbar from "examples/Navbars/DefaultNavbar/DualBrandNavbar";
import axiosInstance from "AxiosApi/AxiosInstance";
import { useState } from "react";
import { useEffect } from "react";
import {HorizentalBarChartIpFh} from "overview/HorizentalBarChartIpFh";
import SwitchButton from "components/SwitchButton/SwitchButton";
import { DonutChartIpFh } from "overview/DonutChartIpFh";

//const now = new Date();
import bgImage2 from "assets/images/auditfh.JPG";

const PageIpFhnew = () => {
  const [data, setData] = useState([]);
  const [nokData, setNokData] = useState([]);
  const [nbrofIncoherence, setNbrofIncoherence] = useState([]);
  const [latestDate, setLatestDate] = useState([]);
  const [switchPosition, setSwitchPosition] = useState("left");
  const [repporteur, setRepporteur] = useState([]);
  const [volume, setVolume] = useState([]);
  const [detailincoherencecdrbdr,setDetailincoherencecdrbdr] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const [chartSeriesdatabdr, setChartSeriesdatabdr] = useState([]);
  const [detailincoherencecdrbdroubde,setDetailincoherencecdrbdroubde] = useState([]);
  const [chartSeriesdatabdroubde, setChartSeriesdatabdroubde] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      if (switchPosition === "left") {
        axiosInstance
          .get("/audits/api/auditipfh/tauxdecoherence")
          .then((response) => setNokData(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/audits/api/auditipfh/volumetdjcdr")
          .then((response) => setVolume(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/audits/api/auditipfh/getlatestdate")
          .then((response) => setLatestDate(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/audits/api/auditipfh/incoherencetdjcdrnew")
          .then((response) => setNbrofIncoherence(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/api/audits/api/auditipfh/evolutiontauxdecoherence")
          .then((response) => setData(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/api/audits/api/auditipfh/repartitionporteurtdjcdr")
          .then((response) => setRepporteur(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/audits/api/auditipfh/incoherenceendetailstdjcdr")
          .then((response) => setDetailincoherencecdrbdr(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/audits/api/auditipfh/incoherenceendetailstdjcdrbdroubde")
          .then((response) => setDetailincoherencecdrbdroubde(response.data))
          .catch((error) => console.error("Error fetching data:", error));
      
      }
      if (switchPosition === "right") {
        axiosInstance
          .get("/audits/api/auditipfh/volumetdjosa")
          .then((response) => setVolume(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/audits/api/auditipfh/tauxdecoherencetdjosa")
          .then((response) => setNokData(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/audits/api/auditipfh/incoherencetdjosanew")
          .then((response) => setNbrofIncoherence(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/audits/api/auditipfh/evolutiontauxdecoherencetdjosa")
          .then((response) => setData(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/audits/api/auditipfh/repartitionporteurtdjosa")
          .then((response) => setRepporteur(response.data))
          .catch((error) => console.error("Error fetching data:", error))
        axiosInstance
          .get("/audits/api/auditipfh/incoherenceendetailstdjosa")
          .then((response) => setDetailincoherencecdrbdr(response.data))
          .catch((error) => console.error("Error fetching data:", error));
        axiosInstance
          .get("/audits/api/auditipfh/incoherenceendetailstdjosabdroubde")
          .then((response) => setDetailincoherencecdrbdroubde(response.data))
          .catch((error) => console.error("Error fetching data:", error));
          
      }
    };

    fetchData();
  }, [switchPosition]);

  const labelsToShow = ["FHT_Coherent", "FHT_Incoherent"];
  const labels = Object.keys(detailincoherencecdrbdr);
  const labelsbdroubde = Object.keys(detailincoherencecdrbdroubde);
  const handleSwitchChange = (event) => {
    const newChecked = event.target.checked;
    setSwitchPosition(newChecked ? "right" : "left");
  };
    
  useEffect(() => {
    // Update chartSeries when nokData changes
    const newChartSeries = Object.values(nokData);
   
    // Update the state variable
    setChartSeries(newChartSeries);
  }, [nokData]);
    

    useEffect(() => {
    // Update chartSeries when nokData changes
    
    const chartSeriesdatabdr = Object.values(detailincoherencecdrbdr);
    
    // Update the state variable
    setChartSeriesdatabdr(chartSeriesdatabdr);
  }, [detailincoherencecdrbdr]);
    
    useEffect(() => {
    // Update chartSeries when nokData changes
    
    const chartSeriesdatabdroubde = Object.values(detailincoherencecdrbdroubde);
    
    // Update the state variable
    setChartSeriesdatabdroubde(chartSeriesdatabdroubde);
  }, [detailincoherencecdrbdroubde]);

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <DualBrandNavbar routes={routes} />
      </div>
      <div
        style={{
          backgroundSize: "cover", // Adjust the background image size as needed.
          backgroundRepeat: "no-repeat", // Prevent the background image from repeating.
          minHeight: "100vh", // Set a minimum height to cover the entire viewport.
        }}
      >
        <div style={{ backgroundColor: "#0055a4" }}>
          <MKTypography
            variant="h1"
            align="center"
            mb={0}
            mt={1}
            sticky
            color="white"
            justifyContent=""
          >
            Audit IP FH
          </MKTypography>
          <MKTypography variant="body2" align="center" mb={0} mt={1} sticky color="white">
            Audit Rafraichit le {latestDate.latest_date}
          </MKTypography>
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            marginBottom: "20px",
            display: "flex",
          }}
        >
          <img src={bgImage2} style={{}} />

          <div style={{ fontSize: "24px", color: "red", marginLeft: "680px", marginTop: "30px" }}>
            ✅
          </div>
          <div style={{ fontSize: "18px", marginTop: "30px" }}>FHT incohérents justifiés</div>
          <div style={{ fontSize: "18px", marginTop: "25px", marginLeft: "170px" }}>
            <SwitchButton leftLabel="TDJ CDR" rightLabel="OSA" onChange={handleSwitchChange} />
          </div>
        </div>

        <Container maxWidth="XXl">
          <Card sx={{ marginBottom: "20px", backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
            {switchPosition === "left" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  border: "1px solid white",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <MKTypography variant="h5" color="#000000">
                  Parc FHT considéré FHT avec @IP dans OMC ou SDL : {nbrofIncoherence.total_records}
                </MKTypography>
              </div>
            )}
            {switchPosition === "right" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  border: "1px solid white",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <MKTypography variant="h5" color="#000000">
                  Parc FHT considér Supervisé OMC : {nbrofIncoherence.total_records}
                </MKTypography>
              </div>
            )}
            <Grid container spacing={3} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={3} style={{ margin: 0 }}>
                <div style={{ marginBottom: "20px" }}>
                  <AuditIpFhCard
                    title="IP Conformes BDR & BDE"
                    description=""
                    difference={nbrofIncoherence ? nbrofIncoherence.percentage_ip_coherent : 0}
                    positive={
                      nbrofIncoherence ? nbrofIncoherence.percentage_ip_coherent > 0 : false
                    }
                    value={nbrofIncoherence ? nbrofIncoherence.ip_coherent_bdr_bde : 0}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <AuditIpFhCard
                    title="IP non conformes BDR & BDE"
                    description="du Parc"
                    difference={nbrofIncoherence ? nbrofIncoherence.percentage_ip_incoherent : 0}
                    positive={
                      nbrofIncoherence ? nbrofIncoherence.percentage_ip_incoherent > 0 : false
                    }
                    value={nbrofIncoherence ? nbrofIncoherence.ip_incoherent_bdr_bde : 0}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <AuditIpFhCard
                    title="IP Existant BDR Uniquement"
                    description="du Parc"
                    difference={nbrofIncoherence ? nbrofIncoherence.percentage_ip_bdr_uniquement : 0}
                    positive={
                      nbrofIncoherence ? nbrofIncoherence.percentage_ip_bdr_uniquement > 0 : false
                    }
                    value={nbrofIncoherence ? nbrofIncoherence.ip_bdr_uniquement : 0}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <AuditIpFhCard
                    title="IP Existant BDE Uniquement"
                    description="du Parc"
                    difference={
                      nbrofIncoherence ? nbrofIncoherence.percentage_ip_bde_uniquement : 0
                    }
                    positive={
                      nbrofIncoherence
                        ? nbrofIncoherence.percentage_ip_bde_uniquement > 0 : false}

                    value={nbrofIncoherence ? nbrofIncoherence.ip_bde_uniquement : 0}
                  />
                </div>
              </Grid>

              <Grid xs={12} md={6} lg={5}>
                <DonutChartIpFh
                  difference={data ? data.Difference : 0}
                  positive={data ? data.Positive_Variation : false}
                  sx={{ height: "100%" }}
                  value={data ? data.FHT_Coherent : 0}
                  chartSeries={chartSeries}
                  labels={labelsToShow}
                  category={data ? data.Coherent_Category : ""}
                  volumeCoherent={volume ? volume.Nbr_FHT_Coherent : 0}
                  volumeIncoherent={volume ? volume.Nbr_FHT_Incoherent : 0}
                />
                 
              </Grid>

              <Grid item xs={12} sm={3} style={{ margin: 0 }}>
                {switchPosition === "right" && <div style={{ marginBottom: "480px" }}></div>}
                {switchPosition === "left" && <div style={{ marginBottom: "240px" }}></div>}
                 <div style={{ marginBottom: "20px" }}>
                  <AuditIpFhCard
                    title="FHT concerné par un SWAP Prévu"
                    description="du Parc"
                    difference={nbrofIncoherence ? nbrofIncoherence.percentage_incoherence_swap : 0}
                    positive={
                      nbrofIncoherence ? nbrofIncoherence.percentage_incoherence_swap > 0 : false
                    }
                    value={nbrofIncoherence ? nbrofIncoherence.fht_incoherence_swap_count : 0}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  {switchPosition === "left" && (
                    <AuditIpFhCard
                      title="Parc FHT à déployer"
                      description="du Parc"
                      difference={
                        nbrofIncoherence ? nbrofIncoherence.percentage_incoherence_fhtadeployer : 0
                      }
                      positive={
                        nbrofIncoherence
                          ? nbrofIncoherence.percentage_incoherence_fhtadeployer > 0
                          : false
                      }
                      value={
                        nbrofIncoherence ? nbrofIncoherence.fht_incoherence_adeployer_count : 0
                      }
                    />
                  )}
                </div>
                <div style={{ marginBottom: "20px" }}></div>
              </Grid>
            </Grid>
          </Card>
     <div style={{ marginBottom: "20px" }}>
          <Card sx={{ marginBottom: "20px", backgroundColor: "rgba(255, 255, 255, 0)" }}>
          
          {repporteur && Object.keys(repporteur).length > 0 ? (
                  <HorizentalBarChartIpFh chartData={repporteur} sx={{ height: "100%" }} />
                ) : (
                  <div>Telechargement des données en cours</div>
                )}
           
          
          </Card>
</div>
          <div style={{ marginBottom: "20px" }}>
           <Grid container spacing={2}>
           <Grid xs={12} md={8} lg={6}>
              {chartSeriesdatabdr && chartSeriesdatabdr.length > 0 && labels && labels.length > 0 ? (
                <DonutChartRepartitionIncoherence
                  chartSeries={chartSeriesdatabdr}
                  labels={labels}
                  title="Repartition Incoherence BDR"
                  sx={{ height: "100%" }}
                />
              ) : (
                <div>Telechargement des données en cours</div>
              )}
            </Grid>
            <Grid xs={12} md={8} lg={6}>
              {chartSeriesdatabdroubde && chartSeriesdatabdroubde.length > 0 && labelsbdroubde && labelsbdroubde.l>
                <DonutChartRepartitionIncoherence
                  chartSeries={chartSeriesdatabdroubde}
                  labels={labelsbdroubde}
                  title="Repartition Incoherence BDR ou BDE"
                  sx={{ height: "100%" }}
                />
              ) : (
                <div>Telechargement des données en cours</div>
              )}
            </Grid>
          
            </Grid>
            
            </div>
        </Container>
      </div>
    </>
  );
};
export default PageIpFhnew;
