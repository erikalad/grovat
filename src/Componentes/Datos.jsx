import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Alert, Space, Tooltip } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

export default function Datos() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.invitaciones);
  const [visible, setVisible] = useState(true);
  const Papa = require("papaparse");

  const handleClose = () => {
    setVisible(false);
    dispatch({ type: "BORRAR_INVITACIONES" });
  };

  function parsearCSV(archivo) {
    return new Promise((resolve, reject) => {
      Papa.parse(archivo, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          const encabezados = results.meta.fields;
          const datos = results.data.map((objeto) => {
            if (objeto["Sent At"]) {
              const [rawFecha, hora] = objeto["Sent At"].split(", ");
              const [mes, dia, año] = rawFecha.split("/");
              const fechaFormateada = `${dia.padStart(2, "0")}/${mes.padStart(
                2,
                "0"
              )}/${año}`;
              objeto["Fecha"] = fechaFormateada || "";
              objeto["Hora"] = hora || "";
              delete objeto["Sent At"];
            }
            return objeto;
          });
          resolve({ encabezados, datos });
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }

  function handleFileUpload(info) {
    if (info.fileList.length > 0) {
      const archivo = info.fileList[info.fileList.length - 1].originFileObj;

      parsearCSV(archivo)
      .then((resultado) => {
        const { datos } = resultado;
        const nombres = datos.map((objeto) => objeto.From);
        
        const contadorNombres = nombres.reduce((contador, nombre) => {
          contador[nombre] = (contador[nombre] || 0) + 1;
          return contador;
        }, {});

        const nombreMasComun = Object.keys(contadorNombres).reduce((a, b) =>
          contadorNombres[a] > contadorNombres[b] ? a : b
        );

        const datosFiltrados = datos.filter((objeto) => {
          return objeto.From === nombreMasComun;
        });

        dispatch({
          type: "INVITACIONES",
          payload: {
            encabezados: resultado.encabezados,
            datos: datosFiltrados,
          },
        });
      })
      .catch((error) => {
        console.error("Error al cargar el archivo CSV:", error);
      });
    }
  }

  return (
    <div>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture"
        beforeUpload={() => false}
        onChange={handleFileUpload}
      >
        <Button icon={<UploadOutlined />}>Subir CSV Invitaciones</Button>
      </Upload>

      <Space
        direction="vertical"
        style={{
          width: "100%",
          marginTop: '0.5rem'
        }}
      >
        {Object.keys(data).length > 0 && visible && (
          <Alert
            message="Hay un archivo subido"
            type="success"
            closable
            afterClose={handleClose}
            closeIcon={
              <Tooltip title="Borrar archivo">
                <DeleteOutlined />
              </Tooltip>
            }
          />
        )}
      </Space>
    </div>
  );
}
