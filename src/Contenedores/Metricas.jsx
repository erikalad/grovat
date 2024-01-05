import React, { useEffect, useState } from "react";
import { Table, Divider, Button, Modal, Tooltip } from "antd";
import Barra from "../Graficos/Barra";
import Filtros from "../Componentes/Filtros";
import Estadisticas from "../Graficos/Estadisticas";
import Progreso from "../Graficos/Progreso";
import { BsTable } from "react-icons/bs";
import { BsInfo } from "react-icons/bs";

import "./styles.css";

export default function Metricas() {
  const invitacionesString = localStorage.getItem("invitacionesData");
  const archivos = invitacionesString ? JSON.parse(invitacionesString) : [];
  const datosConcatenados = archivos.flatMap((archivo) => archivo.datos);
  const data = { datos: datosConcatenados };
  const [mesEnCurso, setMesEnCurso] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const obtenerMesesFiltrados = () => {
    const meses = datosFiltrados.reduce((acc, item) => {
      const [_, month] = item.Fecha.split("/").map(Number);
      const nombreMes = obtenerNombreMes(month);
      if (!acc.includes(nombreMes)) {
        acc.push(nombreMes);
      }
      return acc;
    }, []);

    return meses.join(", ");
  };

  const obtenerMesEnCurso = () => {
    const mesActual = new Date().getMonth() + 1;
    return obtenerNombreMes(mesActual);
  };

  const obtenerNombreMes = (numeroMes) => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return meses[numeroMes - 1];
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const info = () => {
    Modal.info({
      title: "Mensaje importante",
      content: (
        <div>
          Esta visualización presenta exclusivamente las invitaciones enviadas
          desde la cuenta de origen. No se consideran las invitaciones recibidas
          en este conjunto de datos.
        </div>
      ),
      onOk() {},
    });
  };

  const [datosFiltrados, setDatosFiltrados] = useState(data.datos || []);

  const recibirMes = (mes) => {
    setMesEnCurso(mes);
  };

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      filterByMonth();
    }
  }, []);

  const filterByMonth = () => {
    const mesActual = new Date().getMonth() + 1;
    const datosMesActual = data?.datos.filter((item) => {
      if (item && item.Fecha) {
        const [day, month] = item.Fecha.split("/").map(Number);
        return month === mesActual;
      }
      return false;
    });
    setDatosFiltrados(datosMesActual || []);
  };

  const filterByDate = (selectedDates) => {
    if (!selectedDates || selectedDates.length !== 2) {
      setDatosFiltrados(data?.datos || []);
    } else {
      const [startDay, startMonth, startYear] = selectedDates[0]
        .split("/")
        .map(Number);
      const [endDay, endMonth, endYear] = selectedDates[1]
        .split("/")
        .map(Number);
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

  const allowedColumns = ["From", "Fecha", "Hora"];

  const primerEntrada =
    data && data.datos && data.datos.length > 0 ? data.datos[0] : {};

  const columns = Object.keys(primerEntrada).map((clave, index) => {
    const uniqueValues = Array.from(
      new Set(data.datos.map((item) => item[clave]))
    ).filter(Boolean);

    const filters = allowedColumns.includes(clave)
      ? uniqueValues.map((value) => ({ text: value, value: value }))
      : null;

    return {
      title: clave,
      dataIndex: clave,
      key: `columna_${index}`,
      filters: filters,
      onFilter: allowedColumns.includes(clave)
        ? (value, record) => record[clave] === value
        : null,
      sorter: (a, b) => a[clave].length - b[clave].length,
      sortDirections: ["descend"],
    };
  });

  const excludedColumns = [
    "Direction",
    "Message",
    "inviterProfileUrl",
    "inviteeProfileUrl",
  ];

  const filteredColumns = columns.filter(
    (column) => !excludedColumns.includes(column.title)
  );

  return (
    <>
      <Filtros
        onFilterByDate={filterByDate}
        data={data}
        recibirMes={recibirMes}
      />
      <Divider orientation="left">
        <div className="mes">
          {datosFiltrados.length > 0
            ? obtenerMesesFiltrados()
            : obtenerMesEnCurso()}
        </div>
      </Divider>
      <div className="statidistics-progress">
        <Estadisticas className="statidistics" data={datosFiltrados} />
        <Progreso data={datosFiltrados} />
      </div>
      <div className="contenedor-estadisticas-barra">
        <div className="barra-button carta">
          <Barra data={datosFiltrados} />
          <Tooltip title="Ver detalle de los datos">
            <Button
              onClick={showModal}
              shape="circle"
              icon={<BsTable />}
              style={{ marginRight: "1rem" }}
            ></Button>
          </Tooltip>
          <Tooltip title="Importante">
            <Button onClick={info} shape="circle" icon={<BsInfo />} />
          </Tooltip>
        </div>
        <Modal
          title="Invitaciones"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width={1000}
        >
          <div className="tabla">
            <Table
              columns={filteredColumns}
              dataSource={datosFiltrados}
              scroll={{ x: "max-content", y: 600 }}
            />
          </div>
        </Modal>

        <div className="barra-button carta">
          <Barra data={datosFiltrados} />
          <Tooltip title="Ver detalle de los datos">
            <Button
              onClick={showModal}
              shape="circle"
              icon={<BsTable />}
              style={{ marginRight: "1rem" }}
            ></Button>
          </Tooltip>
          <Tooltip title="Importante">
            <Button onClick={info} shape="circle" icon={<BsInfo />} />
          </Tooltip>
        </div>
        <Modal
          title="Invitaciones"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width={1000}
        >
          <div className="tabla">
            <Table
              columns={filteredColumns}
              dataSource={datosFiltrados}
              scroll={{ x: "max-content", y: 600 }}
            />
          </div>
        </Modal>

        <div className="barra-button carta">
          <Barra data={datosFiltrados} />
          <Tooltip title="Ver detalle de los datos">
            <Button
              onClick={showModal}
              shape="circle"
              icon={<BsTable />}
              style={{ marginRight: "1rem" }}
            ></Button>
          </Tooltip>
          <Tooltip title="Importante">
            <Button onClick={info} shape="circle" icon={<BsInfo />} />
          </Tooltip>
        </div>
        <Modal
          title="Invitaciones"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width={1000}
        >
          <div className="tabla">
            <Table
              columns={filteredColumns}
              dataSource={datosFiltrados}
              scroll={{ x: "max-content", y: 600 }}
            />
          </div>
        </Modal>
      </div>
    </>
  );
}
