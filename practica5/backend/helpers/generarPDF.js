import PDFDocument from "pdfkit";
import crypto from 'crypto';

const generarPDF = async (res, username, key) => {
    // Decodificación de la llave
    const priv = key;
    console.log(priv);

    // Crear un nuevo documento PDF
    const doc = new PDFDocument();
    // Configurar el encabezado del documento
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=documentoFirmado.pdf');

    // Crear contenido para el PDF con formato
    doc.pipe(res);
    const contenido = `
        Documento importante de ${username}:
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `;
    const contenidoLimpio = contenido.replace(/\n\s+/g, '\n');
    doc.fontSize(16).text(contenidoLimpio.trim(), 50, 50);

    // Aplicamos un hash al contenido del PDF
    console.log(contenidoLimpio.trim())
    const hash = crypto.createHash('sha256');
    hash.update(contenidoLimpio.trim());
    const digest = hash.digest('base64');
    console.log(digest);

    // Firmamos con la llave privada del usuario
    const privateKeyBuffer = Buffer.from(priv, 'base64');
    const signature = crypto.sign('RSA-SHA256', Buffer.from(contenidoLimpio.trim()), privateKeyBuffer);
    console.log(signature.toString('base64'))

    // Colocamos la firma dentro del archivo
    const firma = `Documento firmado por ${username} con la firma: ${signature.toString('base64')}`;
    doc.fontSize(10).text(firma, 50, 250);

    // Finalizar y enviar el PDF
    doc.end();
};

export default generarPDF;
