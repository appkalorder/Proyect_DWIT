import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

export default function LineChart() {
  const [datos, setDatos] = useState([]);

  // Cambia esto manualmente por 'altura', 'peso', etc.
  const medidaSeleccionada = 'cadera';

  useEffect(() => {
    fetch('/data/medidas.json')
      .then((res) => res.json())
      .then((data) => setDatos(data));
  }, []);

  if (datos.length === 0) return <p>Cargando datos...</p>;

  const fechas = datos.map((d) => d.fecha);

  const medidasKeys = {
    altura: { label: 'Altura (cm)', color: '#8884d8' },
    peso: { label: 'Peso (kg)', color: '#82ca9d' },
    brazo_izq: { label: 'Brazo Izq (cm)', color: '#ff6384' },
    brazo_der: { label: 'Brazo Der (cm)', color: '#36a2eb' },
    pierna_izq: { label: 'Pierna Izq (cm)', color: '#ffce56' },
    pierna_der: { label: 'Pierna Der (cm)', color: '#4bc0c0' },
    cadera: { label: 'Cadera (cm)', color: '#9966ff' },
    pecho: { label: 'Pecho (cm)', color: '#c9cbcf' }
  };

  const medida = medidasKeys[medidaSeleccionada];

  const dataset = {
    label: medida.label,
    data: datos.map((d) => d[medidaSeleccionada]),
    borderColor: medida.color,
    tension: 0.2,
    fill: false,
  };

  const data = {
    labels: fechas,
    datasets: [dataset]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha'
        }
      },
      y: {
        title: {
          display: true,
          text: medida.label
        },
        beginAtZero: false
      }
    }
  };

  return (
    <div>
      <h2>Progreso de {medida.label}</h2>
      <Line data={data} options={options} />
    </div>
  );
}