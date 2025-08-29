import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  useTheme,
  Alert,
  AlertTitle
} from "@mui/material";
import { Chart } from "../components/Charts/Chart";

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
    colors: [
      "#4472C4",
      "#92D050",
      "#f44336",
      "#279CB8",
      "#FFC107",
      "#3f51b5",
      "#ff5722",
      "#003459",
      "#e81e63",
      "#ff4000",
    ],
    dataLabels: {
      enabled: true,
      formatter: (value) => Math.round(value) + "%", // Remove decimals from data labels
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
          labels: {
            show: false,
            name: {
              fontSize: "16px",
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.text.primary,
            },
            value: {
              fontSize: "14px",
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.text.secondary,
            },
          },
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
      y: {
        formatter: (value) => Math.round(value), // Remove decimals from tooltips
      },
    },
  };
};

export const OverviewTraffic = (props) => {
  const { chartSeries, labels, sx, title } = props;
  const chartOptions = useChartOptions(chartSeries, labels);

  // Check if all values in chartSeries are zero
  const isAllZero = chartSeries.every((val) => val === 0);

  return (
    <Card sx={{ sx, backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
      <CardHeader title={title || "Types d’incohérence"} />
      <CardContent>
        {isAllZero ? (
          <Alert severity="success">
            <AlertTitle>Aucune incohérence détectée</AlertTitle>
            Félicitations, tous les éléments sont conformes !
          </Alert>
        ) : (
          <>
            <Chart
              height={380}
              options={chartOptions}
              series={chartSeries}
              type="donut"
              width="100%"
            />
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ mt: 2 }}
            >
              {chartSeries.map((item, index) => {
                const label = labels[index];
                return (
                  <Box
                    key={label}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Optionally display a legend or other relevant UI here */}
                  </Box>
                );
              })}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
};

OverviewTraffic.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
  title: PropTypes.string,
};
