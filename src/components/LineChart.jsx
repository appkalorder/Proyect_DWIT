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

const medidasKeys = {
  altura: { label: 'Altura (cm)', color: '#8884d8' },
  peso: { label: 'Peso (kg)', color: '#82ca9d' },
  brazo_izq: { label: 'Brazo Izq (cm)', color: '#ff6384' },
  brazo_der: { label: 'Brazo Der (cm)', color: '#36a2eb' },
  pierna_izq: { label: 'Pierna Izq (cm)', color: '#ffce56' },
  pierna_der: { label: 'Pierna Der (cm)', color: '#4bc0c0' },
  cadera: { label: 'Cadera (cm)', color: '#9966ff' },
  pecho: { label: 'Pecho (cm)', color: '#c9cbcf' },
};

function LineChart() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [medidaSeleccionada, setMedidaSeleccionada] = useState('peso');
  const [rangoTiempo, setRangoTiempo] = useState('toda-la-vida');

  // Escuchar cambios desde el HTML externo
  useEffect(() => {
    const handleMeasurementChange = (e) => setMedidaSeleccionada(e.detail.measurement);
    const handleTimeframeChange = (e) => setRangoTiempo(e.detail.timeframe);

    window.addEventListener('measurementChange', handleMeasurementChange);
    window.addEventListener('timeframeChange', handleTimeframeChange);

    return () => {
      window.removeEventListener('measurementChange', handleMeasurementChange);
      window.removeEventListener('timeframeChange', handleTimeframeChange);
    };
  }, []);

  // Cargar datos
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/obtener_medidas.php?user_id=1')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const parsed = data.map(item => ({
          ...item,
          fecha: new Date(item.fecha),
        }));

        setDatos(parsed);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los datos.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Filtrar por duración
  const ahora = new Date();
  const datosFiltrados = datos.filter(d => {
    const diff = (ahora - d.fecha) / (1000 * 60 * 60 * 24); // días

    switch (rangoTiempo) {
      case '1-mes': return diff <= 30;
      case '3-meses': return diff <= 90;
      case '6-meses': return diff <= 180;
      case '1-año': return diff <= 365;
      default: return true; // toda-la-vida
    }
  });

  const medida = medidasKeys[medidaSeleccionada] || medidasKeys['peso'];

  const data = {
    labels: datosFiltrados.map(d => d.fecha.toLocaleDateString()),
    datasets: [{
      label: medida.label,
      data: datosFiltrados.map(d => parseFloat(d[medidaSeleccionada])),
      borderColor: medida.color,
      tension: 0.2,
      fill: false,
      pointRadius: 5,
      pointHoverRadius: 7,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: context => `${medida.label}: ${context.parsed.y}`
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Fecha' }
      },
      y: {
        title: { display: true, text: medida.label },
        beginAtZero: false
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Progreso de {medida.label}</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
