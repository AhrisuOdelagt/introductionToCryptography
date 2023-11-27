import React, { useState } from 'react';
import axios from 'axios';

const generarDocumento = "http://localhost:4444/api/usuarios/main/generarDocumento";

const MainPage = () => {
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');

  const validarEnvio = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'arraybuffer', // Asegúrate de que la respuesta sea tratada como un array de bytes
    };

    try {
      const respuesta = await axios.get(generarDocumento, cabecera);

      if (respuesta.status === 200) {
        // Crear un Blob a partir de los datos del PDF
        const blob = new Blob([respuesta.data], { type: 'application/pdf' });

        // Crear un enlace para descargar el PDF
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'documento.pdf');

        // Agregar el enlace al cuerpo del documento
        document.body.appendChild(link);

        // Simular un clic en el enlace para iniciar la descarga
        link.click();

        // Eliminar el enlace del cuerpo del documento
        document.body.removeChild(link);
      }
    } catch (error) {
      setMensajeRespuesta(error.response.data.msg);
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-700 to-indigo-500 min-h-screen text-white font-sans">
      <header className="bg-gradient-to-r from-purple-200 to-indigo-300">
        {/* ... tu código de encabezado ... */}
      </header>
      <main>
        <div className="formulario p-8 bg-green-500 rounded mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">ETAPA II</h2>
          <ul>
            <li>
              <a href="#">Criptografía Clásica</a>
            </li>
            <br />
            <li>
              <a href="#">Criptografía Moderna</a>
            </li>
            <br />
            <li>
              <a href="#">Tendencia Cripto</a>
            </li>
          </ul>
          <br />
          <button type="button" onClick={validarEnvio}>Generar Documento</button>
        </div>
      </main>
    </div>
  );
};

export default MainPage;