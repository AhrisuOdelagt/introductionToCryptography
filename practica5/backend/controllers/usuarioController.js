import Usuario from "../models/Usuario.js";
import { emailRegistro,
    emailRestablecer
} from "../helpers/emails.js";
import {
    generarJWT,
    generarJWT_registro
} from "../helpers/generarJWT.js";
import jwt from "jsonwebtoken"
import generarPDF from "../helpers/generarPDF.js";

// Autenticación y registro del usuario
const registrarUsuario = async (req, res) => {
    // Evitamos usuarios duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
        console.log(existeUsuario);
        const error = new Error("Este usuario ya está registrado.");
        return res.status(400).json({ msg: error.message });
    }
    // Registramos al usuario
    try {
        const usuario = new Usuario(req.body);
        console.log(usuario);
        // Generamos un JWT con la información necesaria
        const token = generarJWT_registro({
            usuario: usuario.usuario,
            email: usuario.email,
            hashed_pw: usuario.hashed_pw
        });
        console.log(token);
        // Enviamos un correo con las instrucciones de confirmación
        emailRegistro({
            email: usuario.email,
            nombre: usuario.usuario,
            token: token
        });
        res.json({ msg: "Se ha enviado un correo con instrucciones." });
    } catch (error) {
        console.log(error);
    }
};

// Confirmación y creación del usuario
const confirmarCuenta = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const creation = { usuario: decoded.usuario,
                            email: decoded.email,
                            hashed_pw: decoded.hashed_pw };
        const usuario = new Usuario(creation);
        await usuario.save();
        // Creamos finalmente el usuario
        res.redirect("http://localhost:5173/confirmar");
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Token de confirmación inválido o expirado." });
    }
};

// Inicio de sesión
const iniciarSesion = async (req, res) => {
    // Comprobamos que el usuario exista
    const { usuario, hashed_pw } = req.body;
    const usuarioEncontrado = await Usuario.findOne({ usuario });
    if (!usuarioEncontrado) {
        const error = new Error("El usuario no existe.")
        return res.status(404).json({ msg: error.message});
    }
    // Comprobamos el hash de la Password
    console.log(usuarioEncontrado)
    if (await usuarioEncontrado.comprobarPassword(hashed_pw)) {
        console.log("Acción completada");
        res.json({ 
            _id: usuarioEncontrado._id,
            usuario: usuarioEncontrado.usuario,
            email: usuarioEncontrado.email,
            token: generarJWT(usuarioEncontrado._id),
            main: "http://localhost:5173/main"
         });
        console.log({ 
            _id: usuarioEncontrado._id,
            usuario: usuarioEncontrado.usuario,
            email: usuarioEncontrado.email,
            token: generarJWT(usuarioEncontrado._id),
            main: "http://localhost:5173/main"
         })
    }
    else {
        const error = new Error("La contraseña ingresada es incorrecta.");
        return res.status(403).json({ msg: error.message});
    }
};

// Restablecer contraseña
const olvidePassword = async (req, res) => {
    let { usuario } = req.body;
    // Verificamos que el administrador exista
    const usuarioEncontrado = await Usuario.findOne({ usuario });
    if (!usuarioEncontrado) {
        const error = new Error("El usuario no existe.")
        return res.status(404).json({ msg: error.message});
    }
    try {
        // Generamos un token nuevo
        const token = generarJWT_registro({
            usuario: usuarioEncontrado.usuario,
            email: usuarioEncontrado.email
        });
        console.log(token);
        // Enviamos el email para restablecer la contraseña
        emailRestablecer({
            email: usuarioEncontrado.email,
            nombre: usuarioEncontrado.usuario,
            token: token
        });
        console.log("Se ha enviado un email con instrucciones.")
        res.json({ msg: "Se ha enviado un email con instrucciones." });
    } catch (error) {
        console.log(error);
    }
};

// Validación del token
const comprobarToken = async (req, res) => {
    const { token } = req.params;
    // Verificamos que el token sea válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
        res.redirect(`http://localhost:5173/olvide-password/${token}`);
    }
    else {
        const error = new Error("Este token es inválido.");
        return res.status(403).json({ msg: error.message});
    }
};

// Cambio de contraseña
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { hashed_pw } = req.body;
    // Obtenemos la información ingresada y buscamos al usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = decoded.usuario;
    const usuarioEncontrado = await Usuario.findOne({ usuario });
    if (usuarioEncontrado) {
        usuarioEncontrado.hashed_pw = hashed_pw;
        await usuarioEncontrado.save();
        console.log("Redirigiendo");
        res.json({ redirigir: "http://localhost:5173/confirmar" });
    }
    else {
        const error = new Error("Este token es inválido.");
        return res.status(403).json({ msg: error.message});
    }
};

// Generar documento
const generarDocumento = async (req, res) => {
    // Autenticamos al usuario
    let email;
    email = req.usuario.email;
    const usuarioAutor = await Usuario.findOne({ email });
    if (!usuarioAutor) {
        const error = new Error("Este usuario no ha iniciado sesión");
        return res.status(403).json({msg: error.message});
    }
    // Generamos el archivo
    generarPDF(res, usuarioAutor.usuario);

};

export {
    registrarUsuario,
    iniciarSesion,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    generarDocumento
};
