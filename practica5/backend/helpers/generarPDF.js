import PDFDocument from "pdfkit";

const generarPDF = (res, username) => {
    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Configurar el encabezado del documento
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=ejemplo.pdf");

    // Crear contenido para el PDF
    doc.pipe(res);
    const contenido = `Documento importante de ${username}: \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    doc.fontSize(16).text(contenido, 50, 50);

    // Finalizar y enviar el PDF
    doc.end();
};

export default generarPDF;
