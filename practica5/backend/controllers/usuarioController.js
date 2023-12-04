import Usuario from "../models/Usuario.js";
import { emailRegistro,
    emailRestablecer,
    emailClave
} from "../helpers/emails.js";
import {
    generarJWT,
    generarJWT_registro
} from "../helpers/generarJWT.js";
import jwt from "jsonwebtoken"
import generarPDF from "../helpers/generarPDF.js";
import generateRSAKeys from "../helpers/generateKeys.js";
// import PDFParser from "pdf-parse";
import fs from "fs";
import crypto from "crypto";
import generarTXT from "../helpers/generarTXT.js";

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
        console.log(decoded);

        // Generación de llaves RSA
        generateRSAKeys().then(keys => {
            const { publicKey, privateKey } = keys;
            console.log("Clave Pública: ", publicKey, "\n");
            console.log("Clave Privada: ", privateKey, "\n");

            const creation = {
                usuario: decoded.usuario,
                email: decoded.email,
                hashed_pw: decoded.hashed_pw,
                public_key: publicKey
            };

            // Creamos finalmente el usuario
            const usuario = new Usuario(creation);
            usuario.save().then(() => {
                // Enviamos un correo con la llave privada
                emailClave({
                    email: usuario.email,
                    nombre: usuario.usuario,
                    key: privateKey
                });

                res.redirect("http://localhost:5173/confirmar");
            });
        });

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
    const { priv_key } = req.body;
    generarPDF(res, usuarioAutor.usuario, priv_key);
};

// Generar archivo de texto
const generarTexto = async (req, res) => {
    // Autenticamos al usuario
    let email;
    email = req.usuario.email;
    const usuarioAutor = await Usuario.findOne({ email });
    if (!usuarioAutor) {
        const error = new Error("Este usuario no ha iniciado sesión");
        return res.status(403).json({msg: error.message});
    }
    // Generamos el archivo
    const { priv_key } = req.body;
    // Verificamos que la llave privada no esté vacía
    if (priv_key == "") {
        const error = new Error("La llave privada está vacía");
        return res.status(403).json({msg: error.message});
    }
    generarTXT(res, usuarioAutor.usuario, priv_key);
};

const verificarFirma = async (req, res) => {
    try {
        // Autenticamos al usuario
        let email;
        email = req.usuario.email;
        const usuarioAutor = await Usuario.findOne({ email });
        if (!usuarioAutor) {
            const error = new Error("Este usuario no ha iniciado sesión");
            return res.status(403).json({ msg: error.message });
        }

        // Buscamos la llave pública
        const { public_key, file_path } = req.body;
        const usuarioConLlave = await Usuario.findOne({ public_key });
        if (!usuarioConLlave) {
            const error = new Error("No hay ningún usuario con esta llave.");
            console.log("No hay ningún usuario con esta llave.")
            return res.status(403).json({ msg: error.message });
        }

        // Leemos el .txt
        const txtContent = fs.readFileSync(file_path, "utf-8");
        try {
            console.log("Texto:", txtContent);
            // Realizamos la verificación
            const [contenido, firmaPart] = txtContent.split('Documento firmado por');

            // Limpiamos los espacios en blanco adicionales en la firma
            const firma = firmaPart.split(' con la firma:')[1].trim();
            const contenidoLimpio = contenido.replace(/\n\s+/g, '\n');
            console.log("contenido: " + contenidoLimpio.trim());
            console.log("firma: " + firma.trim());

            // Verificamos
            // Generamos el Hash para comparar
            const hash = crypto.createHash('sha256');
            hash.update(contenidoLimpio.trim());
            const digest = hash.digest('base64');
            console.log("Hash:", digest);
            const publicKeyBuffer = Buffer.from(public_key, 'base64');
            const signatureBuffer = Buffer.from(firma, 'base64');
            const isSignatureValid = crypto.verify('RSA-SHA256', Buffer.from(contenidoLimpio.trim()), publicKeyBuffer, signatureBuffer);

            // Verificamos si la firma es o no válida
            if (isSignatureValid) {
                console.log("\n" + "Verificación completa. Exitosa.")
                res.json({ redirigir: "http://localhost:5173/verificado" });
                console.log({ redirigir: "http://localhost:5173/verificado" })
            }
            else {
                console.log("\n" + "Verificación completa. Fallida.")
                res.json({ redirigir: "http://localhost:5173/no-verificado" });
                console.log({ redirigir: "http://localhost:5173/no-verificado" })
            }
        } catch (error) {
            console.error('Hubo un error en la lectura del archivo.', error);
        return res.status(500).json({ msg: "Hubo un error en la lectura del archivo." });
        }
    } catch (error) {
        console.error('Error during verification:', error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
};

export {
    registrarUsuario,
    iniciarSesion,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    generarDocumento,
    generarTexto,
    verificarFirma
};
