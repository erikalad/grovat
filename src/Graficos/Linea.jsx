import React from 'react';
import { Line } from '@ant-design/plots';

export default function Linea({ data }) {
  const connectionsByDate = {};

  data.forEach(person => {
    const connectedOn = person['Connected On'];
    if (connectedOn) {
      if (connectionsByDate[connectedOn]) {
        connectionsByDate[connectedOn] += 1;
      } else {
        connectionsByDate[connectedOn] = 1;
      }
    }
  });

  // Formatear los datos para el gráfico de línea
  const formattedData = Object.keys(connectionsByDate).map(date => ({
    Date: date,
    scales: connectionsByDate[date],
  }));

  // Ordenar los datos por fecha
  formattedData.sort((a, b) => new Date(a.Date) - new Date(b.Date));

  // Configuración del gráfico de línea
  const config = {
    data: formattedData,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  return <Line {...config} />;
}
