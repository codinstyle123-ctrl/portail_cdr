import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Alert,
  AlertTitle
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "../components/Charts/Chart";

const useChartOptions = (chartData) => {
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
    },
    colors: ["#1E90FF", "#6495ED", "#87CEFA"], // Distinct colors for bars
    dataLabels: {
      enabled: true,
      formatter: (val) => (val > 0 ? val : ""), // Only show labels for non-zero values
      offsetX: 10, // Adjust position of labels
      style: {
        colors: ["#000"], // Black labels for visibility
        fontSize: "12px",
        fontWeight: "bold",
      },
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
        horizontal: true, // Ensure bars are horizontal
        barHeight: "40%", // Minimum bar height
        dataLabels: {
          position: "top", // Place labels above bars
        },
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
      categories: ["Répartition CSG"],
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : ""),
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => `${value}`, // Tooltip formatting
      },
    },
  };
};

export const HorizentalBarChart = (props) => {
  const { chartData, sx } = props;
  const chartOptions = useChartOptions(chartData);

  // Prepare chart series with dynamic data
  const chartSeries = [
    {
      name: "CSG avec 1 Incohérence",
      data: [chartData.one_nok_count || 0],
    },
    {
      name: "CSG avec 2 Incohérences",
      data: [chartData.two_nok_count || 0],
    },
    {
      name: "CSG avec 3 Incohérences ou plus",
      data: [chartData.three_or_more_nok_count || 0],
    },
  ];

  // Check if all values are zero
  const isAllZero =
    (chartData.one_nok_count || 0) === 0 &&
    (chartData.two_nok_count || 0) === 0 &&
    (chartData.three_or_more_nok_count || 0) === 0;

  return (
    <Card sx={{ sx, backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
    <CardHeader title="Volume de CSG par Nombre D'incoherence" />
    <CardContent>
        {isAllZero ? (
          <Alert severity="success">
            <AlertTitle>Aucune incohérence détectée</AlertTitle>
            Félicitations, toutes les CSG sont conformes !
          </Alert>
        ) : (
          <Chart
            height={350}
            options={chartOptions}
            series={chartSeries}
            type="bar"
            width="100%"
          />
        )}
      </CardContent>
    </Card>
  );
};

HorizentalBarChart.propTypes = {
  chartData: PropTypes.shape({
    one_nok_count: PropTypes.number.isRequired,
    two_nok_count: PropTypes.number.isRequired,
    three_or_more_nok_count: PropTypes.number.isRequired,
  }).isRequired,
  sx: PropTypes.object,
};
