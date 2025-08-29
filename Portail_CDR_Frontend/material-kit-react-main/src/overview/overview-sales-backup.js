import PropTypes from "prop-types";
//import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
//import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
//import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "../components/Charts/Chart";

const useChartOptions = (chartData) => {
  const theme = useTheme();
  const uniqueMonths = chartData.map((item) => item.month);
  chartData.sort((a, b) => new Date(a.month) - new Date(b.month));
  uniqueMonths.sort((a, b) => new Date(a) - new Date(b));

  return {
    chart: {
      background: "transparent",
      stacked: true,
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
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
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
        columnWidth: "40px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: uniqueMonths, // Use uniqueMonths for X-axis categories
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}`,
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

export const OverviewSales = (props) => {
  const { chartData, sx } = props; // Adjust the variable name to chartData
  const chartOptions = useChartOptions(chartData);

  // Process the fetched data to create chartSeries
  const chartSeries = [
    {
      name: "Sites conformes",
      data: chartData.map((item) => item.sites_conformes),
    },
    {
      name: "Sites avec incohérence",
      data: chartData.map((item) => item.sites_avec_incoherence),
    },
  ];
   

  return (
    <Card sx={{ sx, backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
      <CardHeader title="Evolution de la Coherence" />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={<SvgIcon fontSize="small"></SvgIcon>}
          size="small"
        ></Button>
      </CardActions>
    </Card>
  );
};

OverviewSales.propTypes = {
  chartData: PropTypes.array.isRequired, // Rename chartSeries to chartData
  sx: PropTypes.object.isRequired,
};
