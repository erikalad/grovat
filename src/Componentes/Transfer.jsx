import React, { useEffect, useState } from 'react';
import { Button, Transfer } from 'antd';

export default function TransferCualificados({ data }) {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const positions = [...new Set(data.map((item) => item.position))].filter(
    (position) => position
  );
  const [noCualificados, setNoCualificados] = useState(positions);
  const [cualificados, setCualificados] = useState([]);
  console.log(noCualificados,cualificados)

  useEffect(() => {
    const tempMockData = positions.map((position, index) => ({
      key: index.toString(),
      title: position,
      chosen: false,
    }));

    setMockData(tempMockData);
  }, [data]);

  const handleChange = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);

    if (direction === 'left') {
      // Elementos movidos a la izquierda son "NO CUALIFICADOS"
      const noCualificadosKeys = moveKeys.map((key) => mockData.find((item) => item.key === key).title);
      setNoCualificados([...noCualificados, ...noCualificadosKeys]);

      // Quitar puestos cualificados que fueron movidos a la izquierda
      setCualificados(cualificados.filter((item) => !noCualificadosKeys.includes(item)));
    } else {
      // Elementos movidos a la derecha son "CUALIFICADOS"
      const cualificadosKeys = moveKeys.map((key) => mockData.find((item) => item.key === key).title);
      setCualificados([...cualificados, ...cualificadosKeys]);

      // Quitar puestos no cualificados que fueron movidos a la derecha
      setNoCualificados(noCualificados.filter((item) => !cualificadosKeys.includes(item)));
    }
  };

  const renderFooter = (_, { direction }) => {
    return (
      <Button
        size="small"
        style={{
          float: direction === 'left' ? 'left' : 'right',
          margin: 5,
        }}
        onClick={() => setTargetKeys([])}
      >
        Limpiar filtros
      </Button>
    );
  };

  return (
    <div>
      <Transfer
        dataSource={mockData}
        showSearch
        pagination
        listStyle={{
          width: 400,
          height: 500,
        }}
        operations={['Agregar', 'Quitar']}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={(item) => item.title}
        footer={renderFooter}
        titles={['No cualificados', 'Cualificados']}
      />
    </div>
  );
}
