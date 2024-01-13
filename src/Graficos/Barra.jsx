import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { Empty } from 'antd';

export default function Barra({ data }) {
  const [graficoData, setGraficoData] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      setGraficoData([]);
      return;
    }

    const conteoPorFecha = data.reduce((contador, elemento) => {
      const fecha = elemento.Fecha;

      // Conteo total de objetos para la fecha actual
      if (!contador[fecha]) {
        contador[fecha] = { fecha, type: 'invitaciones', value: 1 };
      } else {
        contador[fecha].value += 1;
      }

      // Conteo de objetos con propiedad position para la fecha actual
      if (elemento.position) {
        if (!contador[fecha + '-cualificados']) {
          contador[fecha + '-cualificados'] = { fecha, type: 'cualificados', value: 1 };
        } else {
          contador[fecha + '-cualificados'].value += 1;
        }
      }

      return contador;
    }, {});

    const datosGrafico = Object.values(conteoPorFecha);

    setGraficoData(datosGrafico);
  }, [data]);

  if (!data || data.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  const config = {
    data: graficoData,
    xField: 'fecha',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,

  };

  return <Column {...config} />;
}
