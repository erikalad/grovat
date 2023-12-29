import React from 'react';
import { Progress, Space } from 'antd';

const twoColors = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const Progreso = ({data}) => {
  console.log(data)
  const totalObjetivo = 800;
  const porcentaje = Math.min((data.length / totalObjetivo) * 100, 100);

  return(
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: 16,
    }}
  >
    <Space wrap>
      <Progress type="dashboard" percent={porcentaje} strokeColor={twoColors} />
    </Space>
  </div>
  )
  };
export default Progreso;