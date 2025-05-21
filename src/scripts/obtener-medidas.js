export async function getLatestMeasurements() {
  try {
    // const user = JSON.parse(localStorage.getItem("user"));
    // const res = await fetch(`http://localhost:8080/obtener_medidas.php?user_id=${user.id}`);
    const res = await fetch(`http://localhost:8080/obtener_medidas.php?user_id=1`);
    const data = await res.json();

    if (!data.length) return { measurements: [] };

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
      allMeasurements: data.map(item => ({
        ...item,
        fecha: new Date(item.fecha).toISOString() // Asegurar formato consistente
      }))
    };
  } catch (error) {
    console.error('Error obteniendo medidas:', error);
    return { measurements: [] };
  }
}