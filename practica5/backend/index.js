import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"

// Declaramos la aplicación
const app = express();
app.use(express.json())

// Ocultamos la información confidencial
dotenv.config();
// Conectar con la Base de Datos
conectarDB();
// Permitimos peticiones por CORS
app.use(cors());

// Routing
app.use("/api/usuarios", usuarioRoutes);

// Iniciamos la aplicación
const PORT = process.env.PORT || 4444
app.listen(PORT, () => {
    console.log(`Este servidor se encuentra corriendo en el puerto ${PORT}.`)
});
