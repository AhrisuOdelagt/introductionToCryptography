import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const validarPassword = (password) => {
  // Al menos 8 caracteres, una mayúscula, un número y un símbolo
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const NuevoPassword = () => {
  const [captured_hashed_pw, setCaptured_hashed_pw] = useState('');
  const [captured_confirmed_hashed_pw, setCaptured_confirmed_hashed_pw] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  
  const token = useParams();

  // Generamos el Endpoint hacia el Back
  const tokenString = token.token;
  const nuevoPassword = `http://localhost:4444/api/usuarios/olvidePassword/cambioPassword/${tokenString}`;

  const validarEnvio = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

// Verificamos que las contraseñas coincidan
  if (!validarPassword(captured_hashed_pw)) {
    setMensajeRespuesta("La contraseña no cumple con los requisitos mínimos.");
    console.log("La contraseña no cumple con los requisitos mínimos.")
    setTimeout(() => { setMensajeRespuesta('') }, 3000);
    return;
  }

  // Verificamos que las contraseñas coincidan
  if (captured_hashed_pw !== captured_confirmed_hashed_pw) {
    setMensajeRespuesta("Las contraseñas no coinciden.");
    console.log("Las contraseñas no coinciden.")
    setTimeout(() => { setMensajeRespuesta('') }, 3000);
    return;
  }

  try {
    const respuesta = await axios.post(nuevoPassword, { hashed_pw: captured_hashed_pw });
    console.log(respuesta);
    if (respuesta.status === 200) {
      window.location.href = respuesta.data.redirigir;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
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
          </div>
          <div className="w-60 h-60 overflow-hidden"></div>
          <div className="bg-green-500 rounded p-8 w-full md:w-1/2">
            <h2 className="text-2xl mb-4 font-bold text-gray-800">Restablezca su contraseña</h2>
            <h3 className="text-2xl mb-4 font-bold text-gray-800">Rellene los campos</h3>
            <form onSubmit={validarEnvio}>
            <label className="block mb-2 text-white" htmlFor="password1">
              Nueva Contraseña:
            </label>
            <input
              className="w-full px-4 py-2 mb-4 rounded"
              id="password1"
              type="password"
              placeholder="Su nueva contraseña"
              value={captured_hashed_pw}
              onChange={(e) => setCaptured_hashed_pw(e.target.value)}
            />
  
            <label className="block mb-2 text-white" htmlFor="passwordR">
              Confirmar contraseña:
            </label>
            <input
              className="w-full px-4 py-2 mb-4 rounded"
              id="passwordR"
              type="password"
              placeholder="Su contraseña, nuevamente"
              value={captured_confirmed_hashed_pw}
              onChange={(e) => setCaptured_confirmed_hashed_pw(e.target.value)}
            />
              <button
                className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600"
                type="submit"
              >
                Restablecer
              </button>
            </form>
          </div>
          <div className="w-60 h-60 overflow-hidden"></div>
        </div>
      </div>
    )
}

export default NuevoPassword;
