import React, { useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import Barra from "../Graficos/Barra";
import Filtros from "../Componentes/Filtros";

export default function Metricas() {
  const data = useSelector((state) => state.invitaciones);

  const [datosFiltrados, setDatosFiltrados] = useState(data?.datos || []);
  

  const filterByDate = (selectedDates) => {
    if (!selectedDates || selectedDates.length !== 2) {
      setDatosFiltrados(data?.datos || []);
    } else {
      const [startDay, startMonth, startYear] = selectedDates[0].split("/").map(Number);
      const [endDay, endMonth, endYear] = selectedDates[1].split("/").map(Number);
      const startDate = new Date(startYear + 2000, startMonth - 1, startDay);
      const endDate = new Date(endYear + 2000, endMonth - 1, endDay);
  
      const filteredData = data?.datos.filter((item) => {
        if (item && item.Fecha) {
          const [day, month, year] = item.Fecha.split("/").map(Number);
          const itemDate = new Date(year + 2000, month - 1, day);
          return itemDate >= startDate && itemDate <= endDate;
        }
        return false;
      });
  
      const sortedData = filteredData?.sort((a, b) => {
        const [dayA, monthA, yearA] = a.Fecha.split("/").map(Number);
        const dateA = new Date(yearA + 2000, monthA - 1, dayA);
  
        const [dayB, monthB, yearB] = b.Fecha.split("/").map(Number);
        const dateB = new Date(yearB + 2000, monthB - 1, dayB);
  
        return dateA - dateB;
      });
  
      setDatosFiltrados(sortedData || []);
    }
  };
  
  
  
  
  

  const primerEntrada = data && data.datos && data.datos.length > 0 ? data.datos[0] : {};
  const columns = Object.keys(primerEntrada).map((clave, index) => ({
    title: clave,
    dataIndex: clave,
    key: `columna_${index}`,
  }));

  return (
    <>
      <Filtros onFilterByDate={filterByDate} data={data}/> 
      <Barra data={datosFiltrados} />
      <Table columns={columns} dataSource={datosFiltrados} />
    </>
  );
}
