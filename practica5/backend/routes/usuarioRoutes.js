import express from "express";
import multer from "multer";
import {
    registrarUsuario,
    iniciarSesion,
    confirmarCuenta,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    generarDocumento,
    generarTexto,
    verificarFirma
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();
const upload = multer();

// Autenticación, Registro y del Usuario
router.post("/registro", registrarUsuario);   // Crear un nuevo administrador
router.post("/login", iniciarSesion);  // Autenticar administrador
router.get("/confirmar/:token", confirmarCuenta);  // Confirmar y crear la cuenta del usuario
router.post("/olvidePassword", olvidePassword); // Olvidé mi contraseña
router.get("/olvidePassword/cambioPassword/:token", comprobarToken);    // Comprobar token
router.post("/olvidePassword/cambioPassword/:token", nuevoPassword);    // Cambiar la contraseña

// Generación y firma del documento
router.post("/main/generarDocumento", checkAuth, generarDocumento); // Generamos un documento firmado
router.post("/main/generarTexto", checkAuth, generarTexto); // Generamos un archivo de texto firmado
// Verificación del documento
router.post("/main/verificar", checkAuth, verificarFirma);    // Ingresamos la llave a utilizar

export default router;
