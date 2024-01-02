import React, { useState } from 'react';
import axios from 'axios';

const generarTexto = "http://localhost:4444/api/usuarios/main/generarTexto";
const verificacion = "http://localhost:4444/api/usuarios/main/verificar";

const MainPage = () => {
  // Generales
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [llavePublica, setLlavePublica] = useState('');
  const [llavePrivada_2, setLlavePrivada_2] = useState('');
  const [rutaArchivo, setRutaArchivo] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [contenido, setContenido] = useState('');
  // Diffie-Hellman para cifrar
  const [n_1, setN_1] = useState('');
  const [s1_1, setS1_1] = useState('');
  const [s2_1, setS2_1] = useState('');
  const [ks1_1, setKS1_1] = useState('');
  const [ks2_1, setKS2_1] = useState('');
  // Diffie-Hellman para descifrar
  const [n_2, setN_2] = useState('');
  const [s1_2, setS1_2] = useState('');
  const [s2_2, setS2_2] = useState('');
  const [ks1_2, setKS1_2] = useState('');
  const [ks2_2, setKS2_2] = useState('');

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

    if (contenido === "") {
      setMensajeRespuesta("No hay contenido para generar el archivo.");
      console.log("No hay contenido para generar el archivo.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    if (n_1 === "") {
      setMensajeRespuesta("No se escribió el parámetro n.");
      console.log("No se escribió el parámetro n.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    if (s1_1 === "") {
      setMensajeRespuesta("No se escribió el parámetro s_1.");
      console.log("No se escribió el parámetro s_1.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    if (s2_1 === "") {
      setMensajeRespuesta("No se escribió el parámetro s2.");
      console.log("No se escribió el parámetro s2.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    if (ks1_1 === "") {
      setMensajeRespuesta("No se escribió el parámetro ks1.");
      console.log("No se escribió el parámetro ks1.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    if (ks2_1 === "") {
      setMensajeRespuesta("No se escribió el parámetro ks2.");
      console.log("No se escribió el parámetro ks2.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    try {
      // Enviar la información como JSON
      const data = { priv_key: llavePrivada_2,
                    content: contenido,
                    n_params: n_1,
                    s1_params: s1_1,
                    s2_params: s2_1,
                    ks1_params: ks1_1,
                    ks2_params: ks2_1 };
      const respuesta = await axios.post(generarTexto, data, cabecera);

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

    if (n_2 === "") {
      setMensajeRespuesta("No se escribió el parámetro n.");
      console.log("No se escribió el parámetro n.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    if (s1_2 === "") {
      setMensajeRespuesta("No se escribió el parámetro s_1.");
      console.log("No se escribió el parámetro s_1.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    if (s2_2 === "") {
      setMensajeRespuesta("No se escribió el parámetro s2.");
      console.log("No se escribió el parámetro s2.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    if (ks1_2 === "") {
      setMensajeRespuesta("No se escribió el parámetro ks1.");
      console.log("No se escribió el parámetro ks1.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    if (ks2_2 === "") {
      setMensajeRespuesta("No se escribió el parámetro ks2.");
      console.log("No se escribió el parámetro ks2.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }
  
    try {
      // Leer el contenido del archivo
      const fileContent = await readFileAsync(selectedFile);
  
      // Enviar la información como JSON
      const data = { public_key: llavePublica, 
                    file_content: fileContent,
                    n_params: n_2,
                    s1_params: s1_2,
                    s2_params: s2_2,
                    ks1_params: ks1_2,
                    ks2_params: ks2_2 };
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
              <a href="http://localhost:5173/main/diffie_hellman">Iniciar un secreto Diffie-Hellman</a>
            </li>
            <br />
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
              <label className="block mb-2 text-white" htmlFor="contenido_arch">
                Contenido:
              </label>
              {/* Cambia el input a un textarea */}
              <textarea
                className="w-full px-4 py-2 mb-4 rounded"
                id="contenido_arch"
                placeholder="Contenido del archivo:"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
              />
              <label className="block mb-2 text-white" htmlFor="n_value_1">
                Valor de n:
              </label>
              <input
                className="w-full px-4 py-2 mb-4 rounded"
                id="n_value_1"
                type="text"
                placeholder="Su parámetro público n"
                value={n_1}
                onChange={(e) => setN_1(e.target.value)}
              />
              <label className="block mb-2 text-white" htmlFor="secret_value_1">
                Mi secreto de Clave AES:
              </label>
              <input
                className="w-full px-4 py-2 mb-4 rounded"
                id="secret_value_1"
                type="text"
                placeholder="Secreto de Clave AES"
                value={s1_1}
                onChange={(e) => setS1_1(e.target.value)}
              />
              <label className="block mb-2 text-white" htmlFor="secret_value_2">
                Mi secreto de IV:
              </label>
              <input
                className="w-full px-4 py-2 mb-4 rounded"
                id="secret_value_2"
                type="text"
                placeholder="Secreto de IV"
                value={s2_1}
                onChange={(e) => setS2_1(e.target.value)}
              />
              <label className="block mb-2 text-white" htmlFor="public_value_1">
                Clave pública para Clave AES (De la otra entidad):
              </label>
              <input
                className="w-full px-4 py-2 mb-4 rounded"
                id="public_value_1"
                type="text"
                placeholder="Clave pública para Clave AES (no la mía)"
                value={ks1_1}
                onChange={(e) => setKS1_1(e.target.value)}
              />
              <label className="block mb-2 text-white" htmlFor="public_value_2">
                Clave pública para IV (De la otra entidad):
              </label>
              <input
                className="w-full px-4 py-2 mb-4 rounded"
                id="public_value_2"
                type="text"
                placeholder="Clave pública para IV (no la mía)"
                value={ks2_1}
                onChange={(e) => setKS2_1(e.target.value)}
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
              <label className="block mb-2 text-white" htmlFor="n_value_2">
                Valor de n:
              </label>
              <input
                className="w-full px-4 py-2 mb-4 rounded"
                id="n_value_2"
                type="text"
                placeholder="Su parámetro público n"
                value={n_2}
                onChange={(e) => setN_2(e.target.value)}
              />
              <label className="block mb-2 text-white" htmlFor="secret_value_3">
                Mi secreto de Clave AES:
              </label>
              <input
                className="w-full px-4 py-2 mb-4 rounded"
                id="secret_value_3"
                type="text"
                placeholder="Secreto de Clave AES"
                value={s1_2}
                onChange={(e) => setS1_2(e.target.value)}
              />
              <label className="block mb-2 text-white" htmlFor="secret_value_4">
                Mi secreto de IV:
              </label>
              <input
                className="w-full px-4 py-2 mb-4 rounded"
                id="secret_value_4"
                type="text"
                placeholder="Secreto de IV"
                value={s2_2}
                onChange={(e) => setS2_2(e.target.value)}
              />
              <label className="block mb-2 text-white" htmlFor="public_value_3">
                Clave pública para Clave AES (De la otra entidad):
              </label>
              <input
                className="w-full px-4 py-2 mb-4 rounded"
                id="public_value_3"
                type="text"
                placeholder="Clave pública para Clave AES (no la mía)"
                value={ks1_2}
                onChange={(e) => setKS1_2(e.target.value)}
              />
              <label className="block mb-2 text-white" htmlFor="public_value_2">
                Clave pública para IV (De la otra entidad):
              </label>
              <input
                className="w-full px-4 py-2 mb-4 rounded"
                id="public_value_4"
                type="text"
                placeholder="Clave pública para IV (no la mía)"
                value={ks2_2}
                onChange={(e) => setKS2_2(e.target.value)}
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