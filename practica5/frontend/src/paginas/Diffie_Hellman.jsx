import React, { useState } from 'react';
import axios from 'axios';

// Enlaces del Backend
const iniciar_secreto = "http://localhost:4444/api/usuarios/main/diffie-hellman";
const iniciar_publicos = "http://localhost:4444/api/usuarios/main/diffie-hellman/public"

const Diffie_Hellman = () => {
    // Variables a manejar
    const [mensajeRespuesta, setMensajeRespuesta] = useState('');
    const [addressee_1, setAddressee_1] = useState('');
    const [addressee_2, setAddressee_2] = useState('');
    const [n, setN] = useState('');
    const [g, setG] = useState('');
    const [s1, setS1] = useState('');
    const [s2, setS2] = useState('');

    // Iniciar secreto
    const validarEnvio_iniciarSecreto = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const cabecera = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'arraybuffer', // Asegúrate de que la respuesta sea tratada como un array de bytes
        };

        // Verificamos que si se haya escrito un correo
        if (addressee_1 === "") {
            setMensajeRespuesta("No se escribió un correo destinatario.");
            console.log("No se escribió un correo destinatario.")
            setTimeout(() => { setMensajeRespuesta('') }, 3000);
            return;
        }

        // Ejecutamos la función
        try {
            // Enviar la información como JSON
            const data = { toEmail: addressee_1 };
            const respuesta = await axios.post(iniciar_secreto, data, cabecera);

            if (respuesta.status === 200) {
                setMensajeRespuesta("Se ha iniciado el secreto y se han enviado los correos con los datos.");
                console.log("Se ha iniciado el secreto y se han enviado los correos con los datos.");
                setTimeout(() => { setMensajeRespuesta('') }, 3000);
            }
        } catch (error) {
            setMensajeRespuesta(error.response.data.msg);
            setTimeout(() => { setMensajeRespuesta('') }, 3000);
        }
    };

    // Generar claves públicas
    const validarEnvio_generarPublicos = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const cabecera = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'arraybuffer', // Asegúrate de que la respuesta sea tratada como un array de bytes
        };

        // Verificamos que si se haya escrito un correo
        if (addressee_2 === "") {
            setMensajeRespuesta("No se escribió un correo destinatario.");
            console.log("No se escribió un correo destinatario.")
            setTimeout(() => { setMensajeRespuesta('') }, 3000);
            return;
        }

        // Verificamos que no esté vacío ningún otro parámetro
        if (n === "") {
            setMensajeRespuesta("No se escribió el parámetro n.");
            console.log("No se escribió el parámetro n.")
            setTimeout(() => { setMensajeRespuesta('') }, 3000);
            return;
        }
        if (g === "") {
            setMensajeRespuesta("No se escribió el parámetro g.");
            console.log("No se escribió el parámetro g.")
            setTimeout(() => { setMensajeRespuesta('') }, 3000);
            return;
        }
        if (s1 === "") {
            setMensajeRespuesta("No se escribió el secreto de la clave AES.");
            console.log("No se escribió el secreto de la clave AES.")
            setTimeout(() => { setMensajeRespuesta('') }, 3000);
            return;
        }
        if (s2 === "") {
            setMensajeRespuesta("No se escribió el secreto del IV.");
            console.log("No se escribió el secreto del IV.")
            setTimeout(() => { setMensajeRespuesta('') }, 3000);
            return;
        }

        // Ejecutamos la función
        try {
            // Enviar la información como JSON
            const data = { toEmail: addressee_2,
                            n_params: n,
                            g_params: g,
                            s1_params: s1,
                            s2_params: s2 };
            const respuesta = await axios.post(iniciar_publicos, data, cabecera);

            if (respuesta.status === 200) {
                setMensajeRespuesta("Se ha enviado el correo con los parámetros públicos al destinatario.");
                console.log("Se ha enviado el correo con los parámetros públicos al destinatario.");
                setTimeout(() => { setMensajeRespuesta('') }, 3000);
            }
        } catch (error) {
            setMensajeRespuesta(error.response.data.msg);
            setTimeout(() => { setMensajeRespuesta('') }, 3000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-1000 to-indigo-500">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Bienvenid@ {localStorage.getItem("nombre")}</h1>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Iniciar y gestionar un secreto Diffie-Hellman</h2>

            <div className="formulario bg-green-600 rounded p-8 w-full md:w-1/2">
                <div className="formulario p-8 bg-green-600 rounded mt-10">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Establecer Secreto Diffie-Hellman</h2>
                    <form onSubmit={validarEnvio_iniciarSecreto}>
                        <label className="block mb-2 text-white" htmlFor="addressee_1">
                            Correo del destinatario (¿Con quién quiero establecer un secreto?):
                        </label>
                        <input
                            className="w-full px-4 py-2 mb-4 rounded"
                            id="addressee_1"
                            type="text"
                            placeholder="Correo Destinatario"
                            value={addressee_1}
                            onChange={(e) => setAddressee_1(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600"
                        >
                            Iniciar secreto
                        </button>
                    </form>
                </div>

                <div className="formulario p-8 bg-green-600 rounded mt-10">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Generar parámetros públicos</h2>
                    <form onSubmit={validarEnvio_generarPublicos}>
                        <label className="block mb-2 text-white" htmlFor="addressee_2">
                            Correo del destinatario (¿Con quién tengo el secreto?):
                        </label>
                        <input
                            className="w-full px-4 py-2 mb-4 rounded"
                            id="addressee_2"
                            type="text"
                            placeholder="Correo Destinatario"
                            value={addressee_2}
                            onChange={(e) => setAddressee_2(e.target.value)}
                        />
                        <label className="block mb-2 text-white" htmlFor="n">
                            Valor de n:
                        </label>
                        <input
                            className="w-full px-4 py-2 mb-4 rounded"
                            id="n"
                            type="text"
                            placeholder="Valor del parámetro público n"
                            value={n}
                            onChange={(e) => setN(e.target.value)}
                        />
                        <label className="block mb-2 text-white" htmlFor="g">
                            Valor de g:
                        </label>
                        <input
                            className="w-full px-4 py-2 mb-4 rounded"
                            id="g"
                            type="text"
                            placeholder="Valor del parámetro público g"
                            value={g}
                            onChange={(e) => setG(e.target.value)}
                        />
                        <label className="block mb-2 text-white" htmlFor="s_AES">
                            Secreto Clave AES:
                        </label>
                        <input
                            className="w-full px-4 py-2 mb-4 rounded"
                            id="s_AES"
                            type="text"
                            placeholder="Valor de su secreto para la clave AES"
                            value={s1}
                            onChange={(e) => setS1(e.target.value)}
                        />
                        <label className="block mb-2 text-white" htmlFor="s_IV">
                            Secreto IV:
                        </label>
                        <input
                            className="w-full px-4 py-2 mb-4 rounded"
                            id="s_IV"
                            type="text"
                            placeholder="Valor de su secreto para el IV"
                            value={s2}
                            onChange={(e) => setS2(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600"
                        >
                            Generar y enviar parámetros
                        </button>
                    </form>
                </div>
            </div>
            <h2 className="block mb-2 text-white"><a href="http://localhost:5173/main">Volver al índice</a></h2>
        </div>
    )
}

export default Diffie_Hellman;
