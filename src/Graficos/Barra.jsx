import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';


export default function Barra({ data }) {
  const [graficoData, setGraficoData] = useState([]);
  useEffect(() => {
    if (!data || !data) {
      setGraficoData([]);
      return;
    }

    const conteoPorFecha = data.reduce((contador, elemento) => {
      const fecha = elemento.Fecha;
      if (!contador[fecha]) {
        contador[fecha] = 1;
      } else {
        contador[fecha] += 1;
      }
      return contador;
    }, {});

    const datosGrafico = Object.keys(conteoPorFecha).map((fecha) => ({
      fecha: fecha,
      invitaciones: conteoPorFecha[fecha],
    }));
    
    datosGrafico.reverse();


    setGraficoData(datosGrafico);
  }, [data]);

  

  const config = {
    data: graficoData,
    xField: 'fecha',
    yField: 'invitaciones',
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

  return <Column {...config}/>;
}
