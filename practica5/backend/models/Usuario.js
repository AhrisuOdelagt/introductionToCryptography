// Importamos Mongoose
import mongoose from "mongoose";
// Importamos funciones criptográficas para aplicar un hash a la contraseña
import * as crypto from 'crypto';

const usuarioSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    hashed_pw: {
        type: String,
        required: true,
        trim: true
    }
});

// Aplicamos un Hash a la contraseña antes de guardarla en la base de datos
usuarioSchema.pre("save", async function(next){
    if (!this.isModified("hashed_pw")) {
        next();
    }
    const sha256 = crypto.createHash('sha256');
    this.hashed_pw = sha256.update(this.hashed_pw).digest('hex');
    next();
});

usuarioSchema.methods.comprobarPassword = async function(passwordForm) {
    const sha256 = crypto.createHash('sha256');
    const hashedPasswordForm = sha256.update(passwordForm).digest('hex');
    return await this.hashed_pw === hashedPasswordForm;
};

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
