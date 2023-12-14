import React, { useState } from 'react';
import axios from 'axios';

const generarDocumento = "http://localhost:4444/api/usuarios/main/generarDocumento";
const generarTexto = "http://localhost:4444/api/usuarios/main/generarTexto";
const verificacion = "http://localhost:4444/api/usuarios/main/verificar";

const MainPage = () => {
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [llavePublica, setLlavePublica] = useState('');
  const [llavePrivada_1, setLlavePrivada_1] = useState('');
  const [llavePrivada_2, setLlavePrivada_2] = useState('');
  const [rutaArchivo, setRutaArchivo] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Manejador de cambio para el campo de carga de archivos
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setRutaArchivo(event.target.value);
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        resolve(event.target.result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsText(file);
    });
  };

  const validarEnvio_generarDocumento = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'arraybuffer', // Asegúrate de que la respuesta sea tratada como un array de bytes
    };

    if (llavePrivada_1 === "") {
      setMensajeRespuesta("El apartado de llave privada está vacío.");
      console.log("El apartado de llave privada está vacío.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    try {
      const respuesta = await axios.post(generarDocumento, { priv_key: llavePrivada_1 }, cabecera);

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

  const validarEnvio_generarTexto = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'arraybuffer', // Asegúrate de que la respuesta sea tratada como un array de bytes
    };

    if (llavePrivada_2 === "") {
      setMensajeRespuesta("El apartado de llave privada está vacío.");
      console.log("El apartado de llave privada está vacío.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    try {
      const respuesta = await axios.post(generarTexto, { priv_key: llavePrivada_2 }, cabecera);

      if (respuesta.status === 200) {
        // Crear un Blob a partir de los datos del PDF
        const blob = new Blob([respuesta.data], { type: 'text/plain' });

        // Crear un enlace para descargar el PDF
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'documento.txt');

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

  const validarEnvio_verificacion = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    if (llavePublica === "") {
      setMensajeRespuesta("El apartado de llave pública está vacío.");
      console.log("El apartado de llave pública está vacío.");
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }
  
    // Validar si se está enviando un archivo
    if (!selectedFile) {
      setMensajeRespuesta("Por favor, coloque su archivo.");
      console.log("Por favor, coloque su archivo.");
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }
  
    try {
      // Leer el contenido del archivo
      const fileContent = await readFileAsync(selectedFile);
  
      // Enviar la información como JSON
      const data = { public_key: llavePublica, file_content: fileContent };
      const respuesta = await axios.post(verificacion, data, cabecera);
  
      if (respuesta.status === 200) {
        window.location.href = respuesta.data.redirigir;
      }
    } catch (error) {
      setMensajeRespuesta(error.response.data.msg);
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
    }
  };

  const cerrar_sesion = async(e) => {
    e.preventDefault();
    try {
      console.log("Cerrando sesión");
      localStorage.clear();
      window.location.href = "http://localhost:5173/";
    } catch (error) {
      console.log(error);
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
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Bienvenid@ {localStorage.getItem("nombre")}</h1>
      <div className="formulario p-8 bg-purple-500 rounded mt-10">
        <form onSubmit={cerrar_sesion}>
          <button
            type="submit"
            className="px-6 py-3 bg-purple-800 text-white rounded hover:bg-green-600"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
        <div className="formulario p-8 bg-green-500 rounded mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">ETAPA II</h2>
          <ul>
            <li>
              <a href="http://localhost:5173/criptoclasica">Criptografía Clásica</a>
            </li>
            <br />
            <li>
              <a href="http://localhost:5173/criptomoderna">Criptografía Moderna</a>
            </li>
            <br />
            <li>
              <a href="http://localhost:5173/criptotendencia">Tendencia Cripto</a>
            </li>
          </ul>
          <br />
          <div className="formulario bg-green-600 rounded p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">GENERAR PDF</h2>
            <form onSubmit={validarEnvio_generarDocumento}>
            <label className="block mb-2 text-white" htmlFor="privada1">
              Llave Privada:
            </label>
            <input
            className="w-full px-4 py-2 mb-4 rounded"
            id="privada1"
            type="text"
            placeholder="Su llave privada"
            value={llavePrivada_1}
            onChange={(e) => setLlavePrivada_1(e.target.value)}
            />
            <button
            type="submit"
            className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600"
            >
            Generar PDF
            </button>
            </form>
            <br />
            <div className="formulario p-8 bg-green-600 rounded mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">GENERAR TXT</h2>
              <form onSubmit={validarEnvio_generarTexto}>
              <label className="block mb-2 text-white" htmlFor="privada2">
                Llave Privada:
              </label>
              <input
              className="w-full px-4 py-2 mb-4 rounded"
              id="privada2"
              type="text"
              placeholder="Su llave privada"
              value={llavePrivada_2}
              onChange={(e) => setLlavePrivada_2(e.target.value)}
              />
              <button
              type="submit"
              className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600"
              >
              Generar TXT
              </button>
              </form>
            </div>
            <br />
            <div className="formulario p-8 bg-green-600 rounded mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">VERIFICAR FIRMA</h2>
              <form onSubmit={validarEnvio_verificacion}>
              <label className="block mb-2 text-white" htmlFor="publica">
                Llave Pública:
              </label>
              <input
              className="w-full px-4 py-2 mb-4 rounded"
              id="publica"
              type="text"
              placeholder="Llave pública de quien busca hacer verificación"
              value={llavePublica}
              onChange={(e) => setLlavePublica(e.target.value)}
              />
              <label className="block mb-2 text-white" htmlFor="archivo">
                Seleccione un archivo:
              </label>
              <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="w-full px-4 py-2 mb-4 rounded"
              />
              <button
              type="submit"
              className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600"
              >
              Verificar firma
              </button>
              </form>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;