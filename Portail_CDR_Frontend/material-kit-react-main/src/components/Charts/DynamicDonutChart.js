import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DynamicDonutChart = ({ series, labels, colors, title }) => {
  const options = {
    chart: {
      type: 'donut',
      height: 400,
    },
    labels: labels || [], // Dynamic labels
    colors: colors || ['#4CAF50', '#FFC107', '#2196F3'], // Default colors
    dataLabels: {
      enabled: false, // Disable data labels
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      labels: {
        colors: ['#333'], // Legend text color
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12, // Rounded legend markers
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%', // Donut size
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: 600,
              color: '#333',
              formatter: () => '100%', // Show total percentage
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}%`, // Tooltip percentage
      },
    },
    title: {
      text: title || 'Donut Chart', // Dynamic title
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333', 
      },
    },
    grid: {
      padding: {
        top: 30, // Adds space between the title and the donut chart
      },
    },
  };

  return (
    <div id="chart" style={{ padding: '16px', overflow: 'visible' }}>
      <ReactApexChart options={options} series={series || []} type="donut" height={450} />
    </div>
  );
};

export default DynamicDonutChart;
