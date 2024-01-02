import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Alert, Space, Tooltip, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function Datos() {
  const numArchivosCargados = localStorage.getItem("numArchivosCargados") || 0;
  const Papa = require("papaparse");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (showSuccessMessage) {
      messageApi.open({
        type: "success",
        content: "El archivo fue eliminado correctamente",
      });
      setShowSuccessMessage(false);
    }
  }, [showSuccessMessage, messageApi]);

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 10000); // Generación de ID único simplificada
  };

  const handleCloseAlert = (id) => {
    const invitacionesString = localStorage.getItem("invitacionesData");
    let data = invitacionesString ? JSON.parse(invitacionesString) : [];

    const newData = data.filter((item) => item.id !== id);

    localStorage.setItem("invitacionesData", JSON.stringify(newData));

    const archivosRestantes = newData.length;
    localStorage.setItem("numArchivosCargados", archivosRestantes);

    setShowSuccessMessage(true);
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

      const numArchivosCargados =
        parseInt(localStorage.getItem("numArchivosCargados")) || 0;
      const nuevosArchivosCargados = numArchivosCargados + 1;

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

          const datosFiltrados = datos.filter(
            (objeto) => objeto.From === nombreMasComun
          );

          // Obtener los datos existentes del localStorage como array
          const invitacionesString = localStorage.getItem("invitacionesData");
          const data = invitacionesString ? JSON.parse(invitacionesString) : [];

          // Agregar los nuevos datos al array existente con ID único
          const nuevoArchivo = {
            id: generateUniqueId(),
            encabezados: resultado.encabezados,
            datos: datosFiltrados,
          };
          const datosFinales = [...data, nuevoArchivo];

          // Almacenar los datos combinados en el localStorage como un array de objetos
          localStorage.setItem(
            "invitacionesData",
            JSON.stringify(datosFinales)
          );
          localStorage.setItem("numArchivosCargados", nuevosArchivosCargados);
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
          marginTop: "0.5rem",
        }}
      >
        {contextHolder}

        {/* Mostrar Alert según el número de archivos cargados */}
        {Array.from({ length: numArchivosCargados }, (_, index) => {
          const invitacionesString = localStorage.getItem("invitacionesData");
          const data = invitacionesString ? JSON.parse(invitacionesString) : [];
          const archivo = data[index];

          // Verificar si archivo existe antes de usar su propiedad 'id'
          if (archivo) {
            return (
              <Alert
                key={archivo.id}
                message="Hay un archivo subido"
                type="success"
                closable
                afterClose={() => handleCloseAlert(archivo.id)}
                closeIcon={
                  <Tooltip title="Borrar archivo">
                    <DeleteOutlined />
                  </Tooltip>
                }
              />
            );
          }

          return null; // Retorna null si el archivo no está definido
        })}
      </Space>
    </div>
  );
}
