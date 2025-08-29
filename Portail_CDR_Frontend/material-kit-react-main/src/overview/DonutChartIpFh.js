import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import { Chart } from "../components/Charts/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faMeh, faFrown } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MKButton from "components/MKButton";
import axiosInstance from "AxiosApi/AxiosInstance";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import TwoValuesCard from "examples/Cards/SmallCard/TwoValuesCard";
const useChartOptions = (chartSeries, labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      toolbar: {
        show: true,
        tools: {
          download: '<i class="fa fa-download" style="font-size:24px"></i>',
        },
      },
    },

    colors: ["#008000", "#FF2400"],
    dataLabels: {
      enabled: true,
    },
    labels,
    legend: {
      position: "bottom",
      show: true,
      stack: true,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {},
        },
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 1,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
    annotations: {
      text: [
        {
          x: "0.5",
          y: "0.5",
          text: "Custom Text",
          fontSize: "16px",
          backgroundColor: "#FF5733",
        },
      ],
    },
  };
};

export const DonutChartIpFh = (props) => {
  const {
    volumeCoherent,
    volumeIncoherent,
    category,
    chartSeries,
    labels,
    sx,
    difference,
    positive,
    value,
    total,
  } = props;

  const chartOptions = useChartOptions(chartSeries, labels);
  const getCategoryEmoji = () => {
    if (category === "low") {
      return <FontAwesomeIcon icon={faFrown} style={{ color: "#FF2400" }} />;
    } else if (category === "medium") {
      return <FontAwesomeIcon icon={faMeh} style={{ color: "orange" }} />;
    } else if (category === "high") {
      return <FontAwesomeIcon icon={faSmile} style={{ color: "#008000" }} />;
    } else {
      return "";
    }
  };
  const [showCard, setShowCard] = useState(false); // State for showing the card
  const [loading, setLoading] = useState(false);

  const handleMouseEnter = () => {
    setShowCard(true); // Show the small card on mouse enter
  };

  const handleMouseLeave = () => {
    setShowCard(false); // Hide the small card on mouse leave
  };

  const handleExportClick = () => {
    setLoading(true);
    axiosInstance({
      method: "get",
      url: "audits/api/auditipfh/exportauditipfh", // Replace with your API endpoint
      responseType: "arraybuffer", // Important: responseType should be 'arraybuffer' to handle binary data
    })
      .then((response) => {
        setLoading(false);
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "audit_records.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };
  return (
    <Card
      sx={{
        sx,
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <CardHeader title="" />
      <CardContent>
        <Stack alignItems="center" direction="row" justifyContent="center" spacing={3}>
          <Typography variant="h1" sx={{ marginRight: "25px" }}>
            {getCategoryEmoji()}
          </Typography>
          <Stack spacing={1}>
            <Typography variant="h6">Taux de Coherence</Typography>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h5">{value}%</Typography>
            </Stack>

            <Typography variant="h6">{total}</Typography>
            <MKButton onClick={handleExportClick}> Telecharger les données </MKButton>
          </Stack>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            justifyContent="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack alignItems="center" justifyContent="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography color={positive ? "success.main" : "error.main"} variant="body2">
                {difference}%
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="h6">
              variation du taux de coherence par rapport M-1
            </Typography>
          </Stack>
        )}
        <Chart
          height={1000}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
          onMouseEnter={handleMouseEnter} // Attach mouse enter event handler
          onMouseLeave={handleMouseLeave}
        />

        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        ></Stack>
        {showCard && (
          <div>
            <TwoValuesCard
              title1="FHT Coherent"
              value1={volumeCoherent}
              title2="FHT Incoherent"
              value2={volumeIncoherent}
            />
          </div>
        )}
      </CardContent>
      <Dialog
        open={loading}
        onClose={() => setLoading(false)}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle>Telechargement en Cours...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez patienter pendant que le téléchargement est en cours de traitement.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MKButton onClick={() => setLoading(false)}>Cancel</MKButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

DonutChartIpFh.propTypes = {
  category: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  volumeCoherent: PropTypes.number.isRequired,
  volumeIncoherent: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
