import express from "express";
import {
    registrarUsuario,
    iniciarSesion,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    generarDocumento
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// Autenticación, Registro y del Usuario
router.post("/registro", registrarUsuario);   // Crear un nuevo administrador
router.post("/login", iniciarSesion);  // Autenticar administrador
router.get("/confirmar/:token", confirmarCuenta);  // Confirmar y crear la cuenta del usuario
router.post("/olvidePassword", olvidePassword); // Olvidé mi contraseña
router.get("/olvidePassword/cambioPassword/:token", comprobarToken);    // Comprobar token
router.post("/olvidePassword/cambioPassword/:token", nuevoPassword);    // Cambiar la contraseña

// Generación del documento
router.get("/main/generarDocumento", checkAuth, generarDocumento); // Generamos un documento firmado

export default router;
