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
    colors: ["#03a9f4", "#3f51b5", "#00bcd4"],
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
        barHeight: "40%", // Adjust the height of the bars
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
      categories: ["Repartition  CSG"],
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
        },
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

export const HorizentalBarChart = (props) => {
  const { chartData, sx } = props; // Adjust the variable name to chartData
  const chartOptions = useChartOptions(chartData);

  // Process the fetched data to create chartSeries
  const chartSeries = [
    {
      name: "CSG avec 1 Incoherence",
      data: [chartData.one_nok_count],
    },
    {
      name: "CSG avec 2 Incoherences",
      data: [chartData.two_nok_count],
    },
    {
      name: "CSG avec 3 Incoherences ou plus",
      data: [chartData.three_or_more_nok_count],
    },
  ];

  return (
    <Card sx={{ sx, backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
      <CardHeader title="Volume de CSG par Nombre D'incoherence" />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}></CardActions>
    </Card>
  );
};

HorizentalBarChart.propTypes = {
  chartData: PropTypes.shape({
    one_nok_count: PropTypes.number.isRequired,
    two_nok_count: PropTypes.number.isRequired,
    three_or_more_nok_count: PropTypes.number.isRequired,
  }).isRequired,
  sx: PropTypes.object.isRequired,
};
