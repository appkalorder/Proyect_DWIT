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
          value: latest.altura,
          unit: 'm',
        },
        {
          label: 'Peso',
          value: latest.peso,
          unit: 'kg',
        },
        {
          label: 'Brazo',
          values: {
            izq: latest.brazo_izq,
            der: latest.brazo_der,
          },
          unit: 'cm',
        },
        {
          label: 'Pierna',
          values: {
            izq: latest.pierna_izq,
            der: latest.pierna_der,
          },
          unit: 'cm',
        },
        {
          label: 'Cadera',
          value: latest.cadera,
          unit: 'cm',
        },
        {
          label: 'Pecho',
          value: latest.pecho,
          unit: 'cm',
        },
      ],
    };
  } catch (error) {
    console.error('Error obteniendo medidas:', error);
    return { measurements: [] };
  }
}