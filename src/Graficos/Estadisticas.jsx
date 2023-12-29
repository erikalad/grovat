import React from "react";
import { Card, Statistic } from "antd";
import "./styles.css";

const Estadisticas = ({ data }) => {
  const cantidadElementos = data.length;
  return (
    <div className="contenedor-estadisticas">
      <Card bordered={false}>
        <Statistic
          title="Invitaciones"
          value={`${cantidadElementos}/800`}
          precision={0}
        />
      </Card>
    </div>
  );
};
export default Estadisticas;
