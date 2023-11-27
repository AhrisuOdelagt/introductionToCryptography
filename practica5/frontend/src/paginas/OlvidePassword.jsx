import React, { useState } from 'react';
import axios from 'axios';

const olvidePassword = "http://localhost:4444/api/usuarios/olvidePassword";

const OlvidePassword = () => {
  const [captured_usuario, setCaptured_usuario] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');

  const validarEnvio = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    try {
      const respuesta = await axios.post(olvidePassword, { usuario: captured_usuario });
      if (respuesta.status === 200) {
        setMensajeRespuesta(respuesta.data.msg);
        console.log(respuesta.data.msg)
        setTimeout(() => { setMensajeRespuesta('') }, 3000);
      }
    } catch (error) {
      setMensajeRespuesta(error.response.data.msg);
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
    }
  };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-700 to-indigo-500">
        <div className="flex flex-col md:flex-row items-center">
        <div className="w-60 h-60 overflow-hidden"></div>
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-8">FLIDER</h1>
            <img
              className="w-full h-full object-cover"
              src="./src/paginas/logo.jpeg"
              alt="Descripción de la imagen"
            />
          </div>
          <div className="w-60 h-60 overflow-hidden"></div>
          <div className="bg-green-500 rounded p-8 w-full md:w-1/2">
            <h2 className="text-2xl mb-4 font-bold text-gray-800">Olvidé mi contraseña</h2>
            <h3 className="text-2xl mb-4 font-bold text-gray-800">Rellene los campos</h3>
            <form onSubmit={validarEnvio}>
              <label className="block mb-2 text-white" htmlFor="usuario1">
                Ingrese su usuario:
              </label>
              <input
                className="w-full px-4 py-2 mb-4 rounded"
                id="usuario1"
                type="text"
                placeholder="Nombre de Usuario"
                value={captured_usuario}
                onChange={(e) => setCaptured_usuario(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600"
              >
                Restablecer
              </button>
            </form>
            <br />
        <h4 className="mb-2 text-gray-800">¿Quiere volver al inicio? <a href="http://localhost:5173/">Inicie Sesión</a></h4>
          </div>
          <div className="w-60 h-60 overflow-hidden"></div>
        </div>
      </div>
    )
}

export default OlvidePassword;
