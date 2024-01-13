import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/plots';
import { Empty } from 'antd';

export default function Linea({ data }) {
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setLineChartData([]);
      return;
    }

    const cualificadosData = localStorage.getItem('cualificadosData');
    const cualificados = cualificadosData ? JSON.parse(cualificadosData) : [];

    const chartData = data.map(item => {
      const fecha = item['Connected On']; // Ajustar a la propiedad correcta de la fecha
      const firstName = item['First Name'];
      const lastName = item['Last Name'];
      const name = `${firstName} ${lastName}`;

      return {
        fecha,
        type: cualificados.find(cualificado => cualificado.name === name) ? 'Cualificado' : 'Conexiones',
      };
    });

    // Agrupar y contar los valores por fecha y tipo
    const groupedData = chartData.reduce((acc, item) => {
      const key = `${item.fecha}_${item.type}`;
      if (!acc[key]) {
        acc[key] = { fecha: item.fecha, type: item.type, value: 0 };
      }
      acc[key].value += 1;
      return acc;
    }, {});

    // Ajustar el valor de "Conexiones" para que sea al menos igual al de "Cualificado"
    Object.values(groupedData).forEach(item => {
      if (item.type === 'Cualificado') {
        const conexionesKey = `${item.fecha}_Conexiones`;
        if (!groupedData[conexionesKey]) {
          groupedData[conexionesKey] = { fecha: item.fecha, type: 'Conexiones', value: 0 };
        }
        groupedData[conexionesKey].value = Math.max(groupedData[conexionesKey].value, item.value);
      }
    });

    setLineChartData(Object.values(groupedData));
  }, [data]);

  const config = {
    data: lineChartData,
    xField: 'fecha',
    yField: 'value',
    seriesField: 'type',
    legend: {
      position: 'top',
    },
    smooth: true,
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
