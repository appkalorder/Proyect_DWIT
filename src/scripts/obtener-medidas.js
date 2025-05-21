export async function getLatestMeasurements() {
  try {
    const res = await fetch('http://localhost:8080/obtener_medidas.php');
    const data = await res.json();

    // Ordenar por fecha descendente y tomar el más reciente
    const latest = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];

    return {
      measurements: [
        {
          label: 'Altura',
          value: Math.trunc(latest.altura),
          unit: 'm',
        },
        {
          label: 'Peso',
          value: Math.trunc(latest.peso),
          unit: 'kg',
        },
        {
          label: 'Brazo',
          values: {
            izq: Math.trunc(latest.brazo_izq),
            der: Math.trunc(latest.brazo_der),
          },
          unit: 'cm',
        },
        {
          label: 'Pierna',
          values: {
            izq: Math.trunc(latest.pierna_izq),
            der: Math.trunc(latest.pierna_der),
          },
          unit: 'cm',
        },
        {
          label: 'Cadera',
          value: Math.trunc(latest.cadera),
          unit: 'cm',
        },
        {
          label: 'Pecho',
          value: Math.trunc(latest.pecho),
          unit: 'cm',
        },
      ],
    };
  } catch (error) {
    console.error('Error obteniendo medidas:', error);
    return { measurements: [] };
  }
}
