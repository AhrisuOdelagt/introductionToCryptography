import React, { useState } from 'react';
import axios from 'axios';

const registrarUsuario = "http://localhost:4444/api/usuarios/registro";

const validarPassword = (password) => {
  // Al menos 8 caracteres, una mayúscula, un número y un símbolo
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const Registrar = () => {
  const [captured_usuario, setCaptured_usuario] = useState('');
  const [captured_email, setCaptured_email] = useState('');
  const [captured_hashed_pw, setCaptured_hashed_pw] = useState('');
  const [captured_confirmed_hashed_pw, setCaptured_confirmed_hashed_pw] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');

  const validarEnvio = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    // Verificamos que las contraseñas 
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
      const respuesta = await axios.post(registrarUsuario, { usuario: captured_usuario, email: captured_email, hashed_pw: captured_hashed_pw });
      console.log(respuesta);
      if (respuesta.status === 200) {
        setMensajeRespuesta(respuesta.data.msg);
        console.log(respuesta.data.msg)
        setTimeout(() => { setMensajeRespuesta('') }, 3000);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">CREAR CUENTA</h2>
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
  
            <label className="block mb-2 text-white" htmlFor="correo1">
              Correo electrónico:
            </label>
            <input
              className="w-full px-4 py-2 mb-4 rounded"
              id="correo1"
              type="text"
              placeholder="Correo Electrónico"
              value={captured_email}
              onChange={(e) => setCaptured_email(e.target.value)}
            />
  
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
              type="submit"
              className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600"
            >
              Finalizar Registro
            </button>
          </form>
        <br />
        <h4 className="mb-2 text-gray-800">¿Ya tiene una cuenta? <a href="http://localhost:5173/">Inicie Sesión</a></h4>
        </div>
  
        <div className="w-60 h-60 overflow-hidden"></div>
      </div>
    );
  };
  
  export default Registrar;