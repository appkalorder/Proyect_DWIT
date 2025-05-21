import React, { useEffect, useState, useMemo } from 'react';
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
  const [medidaSeleccionada, setMedidaSeleccionada] = useState('peso');
  const [timeframe, setTimeframe] = useState('1-mes');

  const medidasKeys = {
    altura: { label: 'Altura', color: '#8884d8' },
    peso: { label: 'Peso', color: '#82ca9d' },
    brazo_izq: { label: 'Brazo Izquierdo', color: '#ff6384' },
    brazo_der: { label: 'Brazo Derecho', color: '#36a2eb' },
    pierna_izq: { label: 'Pierna Izquierda', color: '#ffce56' },
    pierna_der: { label: 'Pierna Derecha', color: '#4bc0c0' },
    cadera: { label: 'Cadera', color: '#9966ff' },
    pecho: { label: 'Pecho', color: '#c9cbcf' }
  };

  useEffect(() => {
    // Fetch initial data
    fetch('/data/medidas.json')
      .then((res) => res.json())
      .then((data) => setDatos(data));

    // Listen for measurement changes
    const handleMeasurementChange = (event) => {
      setMedidaSeleccionada(event.detail.measurement);
    };

    // Listen for timeframe changes
    const handleTimeframeChange = (event) => {
      setTimeframe(event.detail.timeframe);
    };

    window.addEventListener('measurementChange', handleMeasurementChange);
    window.addEventListener('timeframeChange', handleTimeframeChange);

    // Cleanup listeners
    return () => {
      window.removeEventListener('measurementChange', handleMeasurementChange);
      window.removeEventListener('timeframeChange', handleTimeframeChange);
    };
  }, []);

  // Filter data based on selected timeframe
  const filteredData = useMemo(() => {
    if (!datos.length) return [];
    
    const now = new Date();
    const timeframeMap = {
      '1-mes': 30,
      '3-meses': 90,
      '6-meses': 180,
      '1-año': 365,
      'toda-la-vida': Infinity
    };

    const days = timeframeMap[timeframe] || 30;
    
    if (days === Infinity) return datos;

    const cutoffDate = new Date(now.setDate(now.getDate() - days));
    return datos.filter(d => new Date(d.fecha) >= cutoffDate);
  }, [datos, timeframe]);

  if (filteredData.length === 0) return <p>Cargando datos...</p>;

  const medida = medidasKeys[medidaSeleccionada];
  const fechas = filteredData.map((d) => d.fecha);

  const dataset = {
    label: medida.label,
    data: filteredData.map((d) => d[medidaSeleccionada]),
    borderColor: medida.color,
    backgroundColor: medida.color + '20',
    borderWidth: 2,
    tension: 0.2,
    fill: true,
    pointBackgroundColor: medida.color,
    pointRadius: 4
  };

  const data = {
    labels: fechas,
    datasets: [dataset]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#666',
        bodyColor: '#666',
        borderColor: '#ccc',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: medida.label,
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div className="w-full h-[400px] p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200">
        Progreso de {medida.label}
      </h2>
      <div className="w-full h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}