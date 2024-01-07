import React from 'react';
import { Progress, Space } from 'antd';

const twoColors = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const ProgresoConexiones = ({ data, invitaciones }) => {
  const totalInvitaciones = invitaciones.length; 
  const totalConexiones = data.length; 

  const porcentaje = Math.min((totalConexiones / totalInvitaciones) * 100, 100).toFixed(0);

  return (
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
  );
};

export default ProgresoConexiones;

