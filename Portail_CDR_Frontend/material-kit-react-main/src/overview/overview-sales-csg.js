import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "../components/Charts/Chart";

const useChartOptions = (chartData) => {
  const theme = useTheme();
  const uniqueMonths = chartData.map((item) => item.month);
  chartData.sort((a, b) => new Date(a.month) - new Date(b.month));
  uniqueMonths.sort((a, b) => new Date(a) - new Date(b));
  const maxVolume = Math.max(...chartData.map(
    item => item.sites_conformes + item.sites_avec_incoherence
  ));
  return {
    chart: {
      background: "transparent",
      stacked: true,
      toolbar: {
        show: false, // Disable the toolbar to remove the zoom and home icons
      },
    },
    colors: ["#008000", "#FF2400", "#000000"], // Green for conformes, red for incohérences, black for percentage
    dataLabels: {
      enabled: true,
      enabledOnSeries: [2], // Only enable data labels for the "Percentage conformes" line
      formatter: (val) => `${val}%`, // Format as percentage
      style: {
        colors: ["#000000"], // Black color for percentage labels
        fontWeight: "bold",
        fontSize: "12px",
      },
      offsetY: -10, // Position labels above data points
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
        columnWidth: "35%", // Adjusted for better spacing
        borderRadius: 4,
        dataLabels: {
          position: "top", // Position bar labels at the top
        },
      },
    },
    stroke: {
      width: [0, 0, 2], // Line width for percentage conformes
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
        // Y-axis for volume
        labels: {
          formatter: (value) => Math.round(value).toString(),
          offsetX: -10,
          style: {
            colors: theme.palette.text.secondary,
          },
        },
        title: {
          text: "Volume",
        },
        max: maxVolume, 
      },
      {
        // Y-axis for percentage
        opposite: true,
        show:false,
        labels: {
          formatter: (value) => `${value}`,
          offsetX: -10,
          style: {
            colors: theme.palette.text.primary,
          },
        },
        max: 100,
        min: 0,
      },
    ]
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
      type: "line", // Line chart for percentage conformes
      data: chartData.map((item) => item.percentage_sites_conformes),
    },
  ];

  return (
    <Card sx={{ sx, backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
      <CardHeader title="Evolution de la Coherence" />
      <CardContent >
        <Chart height={350} options={chartOptions} series={chartSeries} type="line" width="100%" />
      </CardContent>
    </Card>
  );
};

OverviewSales.propTypes = {
  chartData: PropTypes.array.isRequired, // Rename chartSeries to chartData
  sx: PropTypes.object.isRequired,
};
