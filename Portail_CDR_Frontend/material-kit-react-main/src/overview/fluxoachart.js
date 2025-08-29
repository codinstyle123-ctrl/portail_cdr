import PropTypes from "prop-types";
import {
SvgIcon,
  Button,
CardActions,
Divider,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "../components/Charts/Chart";

const useChartOptions = (uniqueMonths) => {
  const theme = useTheme();

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
    colors: ["#FF2400","#008000","#FFA500"],
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
      categories: uniqueMonths,
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

const Fluxoachart = (props) => {
  const { chartData, sx } = props;
  console.log(chartData)
  const uniqueMonths = Object.keys(chartData).filter(key => key !== "success");
  const chartOptions = useChartOptions(uniqueMonths);

  const chartSeries = [
    {
      name: "Cellule en RR ou BDR uniquement",
      data: uniqueMonths.map(month => chartData[month]["Cellule en RR ou BDR uniquement"] || 0),
    },
    {
      name: "Cellule normale",
      data: uniqueMonths.map(month => chartData[month]["cellule normale"] || 0),
    },
    {
      name: "Demonte mais present dans BDE",
      data: uniqueMonths.map(month => chartData[month]["Demonte mais present dans BDE"] || 0),
    }
  ];
return (
  <Card sx={{ sx, backgroundColor: "rgba(255, 255, 255, 1)" }}>
    <CardHeader title="Evolution de la Coherence" />
    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Chart height={400} options={chartOptions} series={chartSeries} type="bar" width="100%" />
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

Fluxoachart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      success: PropTypes.bool,
      "Cellule en RR ou BDR uniquement": PropTypes.number,
      "cellule normale": PropTypes.number,
      "Demonte mais present dans BDE": PropTypes.number,
    })
  ).isRequired,
  sx: PropTypes.object.isRequired,
};

export default Fluxoachart;

