import React from 'react';
import { Bar as BarChart } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 100,
  },
  Normal: {
    min: 100,
    max: 200,
  },
  Expensive: {
    min: 200,
    max: 10000000,
  },
};

const BookingsChart = (props) => {
  const chartData = {
    labels: Object.keys(BOOKINGS_BUCKETS), // Use keys for labels
    datasets: [
      {
        label: 'Bookings',
        backgroundColor: [
          'rgba(220,220,220,0.5)',
          'rgba(151,187,205,0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(220,220,220,0.8)',
          'rgba(151,187,205,0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          'rgba(220,220,220,0.75)',
          'rgba(151,187,205,0.75)',
          'rgba(255, 99, 132, 0.75)',
        ],
        hoverBorderColor: [
          'rgba(220,220,220,1)',
          'rgba(151,187,205,1)',
          'rgba(255, 99, 132, 1)',
        ],
        data: [], // Updated data array
      },
    ],
  };

  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);

    chartData.datasets[0].data.push(filteredBookingsCount);
  }

  const scales = {
    x: {
      type: 'category',
    },
    y: {
      type: 'linear',
      position: 'left',
    },
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <BarChart data={chartData} options={{ scales: scales }} />
    </div>
  );
};

export default BookingsChart;
