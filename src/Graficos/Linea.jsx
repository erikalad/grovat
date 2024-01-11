import React from 'react';
import { Line } from '@ant-design/plots';
import { Empty } from 'antd';

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
    Fecha: date,
    Conexiones: connectionsByDate[date],
  }));

  // Ordenar los datos por fecha
  formattedData.sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha));

  const config = {
    data: formattedData,
    padding: 'auto',
    xField: 'Fecha',
    yField: 'Conexiones',
    legend: {
      position: 'top',
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  if (!data || data.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return <Line {...config} />;
}
