import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { Empty } from "antd";


export default function Barra({ data, type }) {
  const [graficoData, setGraficoData] = useState([]);
  
  useEffect(() => {
    if (!data || data.length === 0) {
      setGraficoData([]);
      return;
    }

    let conteoCampo = '';
    if (type === 'invitaciones') {
      conteoCampo = 'Fecha'; 
    } else if (type === 'conexiones') {
      conteoCampo = 'Connected On'; 
    }

    const conteoPorFecha = data.reduce((contador, elemento) => {
      const fecha = elemento[conteoCampo];
      if (!contador[fecha]) {
        contador[fecha] = 1;
      } else {
        contador[fecha] += 1;
      }
      return contador;
    }, {});

    const datosGrafico = Object.keys(conteoPorFecha).map((fecha) => ({
      fecha: fecha,
      [type]: conteoPorFecha[fecha],
    }));
    
    setGraficoData(datosGrafico);
  }, [data, type]);

  if (!data || data.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  const config = {
    data: graficoData,
    xField: 'fecha',
    yField: type,
    label: {
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
      transpose: true,
      position: 'bottom'
    },
    meta: {
      type: {
        alias: 'Fecha',
      },
      sales: {
        alias: 'Cantidad',
      },
    },
  };

  return <Column {...config} />;
}

