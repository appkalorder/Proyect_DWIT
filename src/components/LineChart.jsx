import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function LineChart() {
  const data = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
    datasets: [
      {
        label: 'Ejercicio',
        data: [3, 2, 2, 1, 5],
        fill: false,
        borderColor: 'rgb(75,192,192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );

}
