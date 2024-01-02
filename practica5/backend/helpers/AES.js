import crypto from "crypto";

// Función de cifrado de mensajes
const cifrarMensaje = async (m, key_hex, iv_hex) => {
    const key = Buffer.from(key_hex, "hex");
    const iv = Buffer.from(iv_hex, "hex");
    const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    let mensajeCifrado = cipher.update(m, "utf8", "hex");
    mensajeCifrado += cipher.final("hex");
    return mensajeCifrado;
};

const descifrarMensaje = async (c, key_hex, iv_hex) => {
    const key = Buffer.from(key_hex, "hex");
    const iv = Buffer.from(iv_hex, "hex");
    const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    let mensajeDescifrado = decipher.update(c, "hex", "utf8");
    mensajeDescifrado += decipher.final("utf8");
    return mensajeDescifrado;
};

// Pruebas
/*const mensaje = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
console.log("Mensaje:", mensaje);

const cifra = await cifrarMensaje(mensaje, "e71693c6c0651662328d804fb6d85df3", "29b26287c85e7eb797a1f1086cd3159f");
console.log("Cifra:", cifra);

const descifrado = await descifrarMensaje(cifra, "e71693c6c0651662328d804fb6d85df3", "29b26287c85e7eb797a1f1086cd3159f");
console.log("Descifrado:", descifrado);*/

export {
    cifrarMensaje,
    descifrarMensaje
};
