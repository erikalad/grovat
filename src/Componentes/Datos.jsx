import React from "react";
import { useDispatch } from "react-redux";

export default function Datos() {
  const dispatch = useDispatch();
  const Papa = require("papaparse");

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
              const fechaFormateada = `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${año}`;
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
  
  function handleFileUpload(event) {
    const archivo = event.target.files[0];

    parsearCSV(archivo)
      .then((resultado) => {
        console.log("Encabezados:", resultado.encabezados);
        console.log("Datos:", resultado.datos);
        dispatch({ type: "INVITACIONES", payload: resultado });
      })
      .catch((error) => {
        console.error("Error al cargar el archivo CSV:", error);
      });
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}
