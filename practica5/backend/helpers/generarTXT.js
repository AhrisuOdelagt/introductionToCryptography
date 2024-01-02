import crypto from 'crypto';
import {
    cifrarMensaje
} from "../helpers/AES.js";

const generarTXT = async (res, username, key, content, hexAES, hexIV) => {
    // Decodificación de la llave
    const priv = key;
    console.log(priv);
    console.log(content);

    // Crear contenido para el PDF con formato
    const contenido = `Documento importante de ${username}: \n ${content}`;
    const contenidoLimpio = contenido.replace(/\n\s+/g, '\n');

    // Aplicamos un hash al contenido del PDF
    const hash = crypto.createHash('sha256');
    hash.update(contenidoLimpio.trim());
    const digest = hash.digest('base64');
    console.log(digest);

    // Firmamos con la llave privada del usuario
    const privateKeyBuffer = Buffer.from(priv, 'base64');
    const signature = crypto.sign('RSA-SHA256', Buffer.from(contenidoLimpio.trim()), privateKeyBuffer);
    console.log(signature.toString('base64'))

    // Ciframos el contenido para colocarlo en el documento
    const cifra = await cifrarMensaje(contenidoLimpio, hexAES, hexIV);

    // Colocamos la firma dentro del archivo
    const firma = `Documento firmado por ${username} con la firma: ${signature.toString('base64')}`;
    const full = `${cifra.trim()}\n\n${firma}`;

    // Generamos el .txt
    console.log("\n" + full)
    res.status(200).send(full);
};

export default generarTXT;
