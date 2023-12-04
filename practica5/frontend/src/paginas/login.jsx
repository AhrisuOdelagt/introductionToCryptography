import React, { useState } from 'react';
import axios from 'axios';

const iniciarSesion = "http://localhost:4444/api/usuarios/login";

const validarPassword = (password) => {
  // Al menos 8 caracteres, una mayúscula, un número y un símbolo
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const Login = () => {
  const [captured_usuario, setCaptured_usuario] = useState('');
  const [captured_hashed_pw, setCaptured_hashed_pw] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');

  const validarEnvio = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    if (!validarPassword(captured_hashed_pw)) {
      setMensajeRespuesta("La contraseña no cumple con los requisitos mínimos.");
      console.log("La contraseña no cumple con los requisitos mínimos.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return;
    }

    try {
      const respuesta = await axios.post(iniciarSesion, { usuario: captured_usuario, hashed_pw: captured_hashed_pw });
      if (respuesta.status === 200) {
        localStorage.setItem('nombre', respuesta.data.usuario);
        localStorage.setItem('token', respuesta.data.token);
        console.log(respuesta.data.main)
        window.location.href = respuesta.data.main;
      }
    } catch (error) {
      setMensajeRespuesta(error.response.data.msg);
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-indigo-500 font-Verdana">
      <div className="w-60 h-60 overflow-hidden"></div>
      <div className="w-full md:w-1/2">
          <h1 className="text-5xl font-bold mb-4">FLIDER</h1>
  
          <div className="w-96 h-96 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="./src/paginas/logo.jpeg"
              alt="Descripción de la imagen"
            />
          </div>
        </div>
      <div className="w-60 h-60 overflow-hidden"></div>
      <div className="formulario bg-green-500 rounded p-8 w-full md:w-1/2">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">INICIAR SESIÓN</h2>
        <form onSubmit={validarEnvio}>
          <label className="block mb-2 text-white" htmlFor="usuario1">
            Usuario:
          </label>
          <input
            className="w-full px-4 py-2 mb-4 rounded"
            id="usuario1"
            type="text"
            placeholder="Nombre de Usuario"
            value={captured_usuario}
            onChange={(e) => setCaptured_usuario(e.target.value)}
          />
          <br />
          <label className="block mb-2 text-white" htmlFor="password1">
            Contraseña:
          </label>
          <input
            className="w-full px-4 py-2 mb-4 rounded"
            id="password1"
            type="password"
            placeholder="Su contraseña"
            value={captured_hashed_pw}
            onChange={(e) => setCaptured_hashed_pw(e.target.value)}
          />
          <br />
          <br />
          <button
            type="submit"
            className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600"
          >
            Iniciar Sesión
          </button>
        </form>
        <br />
        <h4 className="mb-2 text-gray-800">¿No te has registrado? <a href="http://localhost:5173/registrar">Regístrate aquí</a></h4>
        <h4 className="mb-2 text-gray-800">¿Olvidaste tu contraseña? <a href="http://localhost:5173/olvide-password">Entra aquí</a></h4>
      </div>
      <div className="w-60 h-60 overflow-hidden"></div>
    </div>
  );
};

export default Login;