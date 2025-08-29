import PropTypes from "prop-types";

import { Box, Card, CardContent, CardHeader, Stack, useTheme } from "@mui/material";
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

      "#3f51b5", // Dark Turquoise
      "#009DCC", //purple
  
      "#ff5722", // Dark Orange
    ],
    dataLabels: {
      enabled: true,
    },
    labels,
    legend: {
      position: "bottom",
      show: true,
      stack: true,
    fontSize: "16px",
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
    },
  };
};

export const DonutChartRepartitionIncoherence = (props) => {
  const { chartSeries, labels, sx,title } = props;
  const chartOptions = useChartOptions(chartSeries, labels);

  return (
    <Card sx={{ sx, backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
      <CardHeader title={title} />
      <CardContent>
        <Chart
          height={1000}
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
              ></Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

DonutChartRepartitionIncoherence.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
  title:PropTypes.String,
};
