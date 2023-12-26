import React from 'react'

export default function Datos() {  
  function parsearCSV(archivo) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const contenido = event.target.result;
        const lineas = contenido.split('\n');
        const encabezados = lineas[0].split(',');
  
        const datos = lineas.slice(1).map((linea) => {
          const valores = linea.split(',');
          const objeto = {};
          encabezados.forEach((encabezado, index) => {
            objeto[encabezado] = valores[index];
          });
          return objeto;
        });
  
        resolve({ encabezados, datos });
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsText(archivo);
    });
  }
  
  function handleFileUpload(event) {
    const archivo = event.target.files[0];
  
    parsearCSV(archivo)
      .then((resultado) => {
        console.log('Encabezados:', resultado.encabezados);
        console.log('Datos:', resultado.datos);
        // Aquí puedes trabajar con los encabezados y datos obtenidos
      })
      .catch((error) => {
        console.error('Error al cargar el archivo CSV:', error);
      });
  }
  

  return (
    <div>
    <input type="file" onChange={handleFileUpload} />
    </div>
  )
}
