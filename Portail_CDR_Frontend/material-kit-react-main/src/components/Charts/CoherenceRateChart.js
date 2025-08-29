import React from 'react';
import ReactApexChart from 'react-apexcharts';


const CoherenceRateChart = ({ categories, parcNOK, parcOK, coherenceRate }) => {
  // Series for the chart
  const series = [
    {
      name: 'Parc NOK',
      type: 'bar',
      data: parcNOK,
    },
    {
      name: 'Parc OK',
      type: 'bar',
      data: parcOK,
    },
  ];

  // Calculate max for the stacked bars (left axis)
  const maxStackedValue = categories.map((_, idx) => parcNOK[idx] + parcOK[idx]);
  const maxCount = Math.max(...maxStackedValue);

  // Dynamically generate annotations for each category
  const annotations = {
    points: categories.map((category, idx) => ({
      x: category, // Dynamically place on each category
      y: coherenceRate[idx], // Corresponding coherence rate for this category
      yAxisIndex: 1, // Use the right Y-axis for placement
      label: {
        text: `${coherenceRate[idx]}%`,
        borderColor: '#0000FF',
        borderWidth: 1,
        style: {
          color: '#FFF',
          background: '#0000FF',
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
    })),
  };

  const options = {
    chart: {
      type: 'line',
      height: 450,
      stacked: true,
      toolbar: { show: false },
    },
    title: {
      text: 'Taux de cohérence',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        dataLabels: {
          position: 'top',
        },
      },
    },
    stroke: {
      width: [0, 0, 3],
      dashArray: [0, 0, 5],
    },
    markers: {
      size: 5,
      colors: ['#0000FF'],
      strokeWidth: 2,
    },
    dataLabels: {
      enabled: false,
    },
    annotations, // Add dynamic annotations
    xaxis: {
      categories: categories,
    },
    yaxis: [
      {
        labels: {
          formatter: (val) => Math.round(val),
        },
        max: maxCount,
        min: 0,
      },
      {
        opposite: true,
        max: 100,
        min: 0,
        labels: {
          formatter: (val) => `${val}%`,
        },
      },
    ],
    colors: ['#FF0000', '#008000', '#0000FF'],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value, { seriesIndex }) => {
          if (seriesIndex < 2) {
            return `${value} Equipments`;
          }
          return `${value}%`;
        },
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      markers: {
        width: 12,
        height: 12,
      },
    },
    grid: {
      padding: {
        top: 40,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
  };

  return (
    <div id="chart" style={{ padding: '16px', overflow: 'visible' }}>
      <ReactApexChart options={options} series={series} type="line" height={450} />
    </div>
  );
};

export default CoherenceRateChart;
