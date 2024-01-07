import React from "react";
import { Table, Modal, Tooltip, Button } from "antd";
import Barra from "../Graficos/Barra";
import { BsTable } from "react-icons/bs";
import { BsInfo } from "react-icons/bs";
import Linea from "../Graficos/Linea";

const MetricasDetalle = ({ data, filteredColumns, type }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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

  return (
    <>
      <div className="barra-button carta">
        {type === 'invitaciones' ?
                <Barra data={data} type={type}/>
                :
                <Linea data={data} type={type}/>
                
               
        }
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
            dataSource={data}
            scroll={{ x: "max-content", y: 600 }}
          />
        </div>
      </Modal>
    </>
  );
};

export default MetricasDetalle;
