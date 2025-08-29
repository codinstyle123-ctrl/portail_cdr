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
    colors: ["#008000", "#FF2400", "#000000"], // Add transparency to green and red
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
        columnWidth: "25px",
        stacked: true, // Ensure bars are stacked
      },
    },
    stroke: {
      width: [0, 0, 2], // Set width for the line
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
      categories: uniqueMonths,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
yaxis: [
      {
        // First Y-axis configuration
        labels: {
          formatter: (value) => `${value}`,  // Formatter for Y-axis values
          offsetX: -10,
          style: {
            colors: theme.palette.text.secondary,
          },
        },
        title: {
          text: "Volume",
        },
      },
      {
        // Second Y-axis configuration
        opposite: true,  // This will position the second Y-axis on the right
        labels: {
          formatter: (value) => `${value}`,  // Formatter for second Y-axis values
          offsetX: -10,
          style: {
            colors: theme.palette.text.primary,  // Different label color for secondary Y-axis
          },
        },
        title: {
          text: "Pourcentage",
        },
      },
    ],
  };
};
export const OverviewSales = (props) => {
  const { chartData, sx } = props; // Adjust the variable name to chartData
  const chartOptions = useChartOptions(chartData);

  // Process the fetched data to create chartSeries
  const chartSeries = [
    {
      name: "Sites conformes",
      type: "bar",
      data: chartData.map((item) => item.sites_conformes),
    },
    {
      name: "Sites avec incohérence",
      type: "bar",
      data: chartData.map((item) => item.sites_avec_incoherence),
    },
     {
      name: "Percentage conformes",
      type: "line",  // Line chart for percentage conformes
      data: chartData.map((item) => item.percentage_sites_conformes),
    },
  ];
   

  return (
    <Card sx={{ sx, backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
      <CardHeader title="Evolution de la Coherence" />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="line" width="100%" />
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
