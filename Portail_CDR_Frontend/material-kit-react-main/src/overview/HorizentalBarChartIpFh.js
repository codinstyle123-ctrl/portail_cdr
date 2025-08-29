import PropTypes from "prop-types";
import { Card, CardActions, CardContent, CardHeader, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "../components/Charts/Chart";

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: true,
        tools: {
          download: '<i class="fa fa-download" style="font-size:24px"></i>',
        },
      },
      selection: {
        enabled: true,
      },
    },
    colors: ["#03a9f4", "#3f51b5", "#009DCC", "#ff5722"],
    dataLabels: {
      enabled: true,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      bar: {
        horizontal: true, // Set the horizontal property to true for a horizontal bar chart
        barHeight: "70%", // Adjust the height of the bars
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 1,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      categories: ["FHT avec incohérence"],
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
          whiteSpace: 'normal', 
        },
        maxWidth: 1000,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

export const HorizentalBarChartIpFh = (props) => {
  const { chartData, sx } = props;
  const chartOptions = useChartOptions();

  // Define expected keys and filter chartData accordingly
  const validKeys = ["PROD OPM", "DCI", "DCI DED", "DCI & Région"];
  const filteredData = validKeys.reduce((acc, key) => {
    if (chartData[key] !== undefined && !isNaN(chartData[key])) {
      acc[key] = chartData[key];
    }
    return acc;
  }, {});

  // Build chartSeries based on filteredData
  const chartSeries = [
    { name: "PROD OPM", data: [filteredData["PROD OPM"] || 0] },
    { name: "DCI", data: [filteredData["DCI"] || 0] },
    { name: "DCI DED", data: [filteredData["DCI DED"] || 0] },
    { name: "DCI & Region", data: [filteredData["DCI & Région"] || 0] },
  ];

  return (
    <Card sx={{ sx, backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
      <CardHeader title="Répartition Responsabilité des Incohérences" />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}></CardActions>
    </Card>
  );
};

HorizentalBarChartIpFh.propTypes = {
  chartData: PropTypes.shape({
    "PROD OPM": PropTypes.number,
    DCI: PropTypes.number,
    "DCI DED": PropTypes.number,
    "DCI & Région": PropTypes.number,
  }).isRequired,
  sx: PropTypes.object.isRequired,
};

