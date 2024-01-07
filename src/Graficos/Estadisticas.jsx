import React from "react";
import { Card, Statistic } from "antd";
import "./styles.css";

const Estadisticas = ({ data, cantArchivos }) => {
  const cantidadElementos = data.length;
  const valorBase = 800;
  const totalObjetivo = valorBase * cantArchivos;

  return (
    <div className="contenedor-estadisticas">
      <Card bordered={false}>
        <Statistic
          title="Invitaciones"
          value={`${cantidadElementos}/${totalObjetivo}`}
          precision={0}
        />
      </Card>
    </div>
  );
};
export default Estadisticas;

