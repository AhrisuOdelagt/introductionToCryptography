import nodemailer from "nodemailer";

// Email para el registro de usuario (confirmación por Token)
const emailRegistro = async (datos) => {
    const {email, nombre, token} = datos;

    const transport = nodemailer.createTransport({
        host: process.env.MASTER_H,
        port: 465,
        secure: true,
        auth: {
          user: process.env.MASTER_EM,
          pass: process.env.MASTER_P
        }
      });
    // Información del email
    const info = await transport.sendMail({
        from: '"Flider — Administrador de la Base de Datos" «arisuodelagtv@gmail.com»',
        to: email,
        subject: "Flider — Confirme su cuenta",
        text: "Compruebe su cuenta en Flider",
        html: `
        <p>Hola, ${nombre}, compruebe su cuenta en Flider.</p>
        <p>Su cuenta está casi lista.</p>
        <p>Para finalizar este proceso, sólo debe hacer clic en <a href="http://localhost:4444/api/usuarios/confirmar/${token}">este enlace</a>.</p>
        <p>Si usted no creó esta cuenta, ignore este correo electrónico.</p>
        `
    })
};

// Email para la modificación de contraseña
const emailRestablecer = async (datos) => {
    const {email, nombre, token} = datos;
  
    const transport = nodemailer.createTransport({
        host: process.env.MASTER_H,
        port: 465,
        secure: true,
        auth: {
          user: process.env.MASTER_EM,
          pass: process.env.MASTER_P
        }
      });
    // Información del email
    const info = await transport.sendMail({
        from: '"Flider — Administrador de la Base de Datos" «arisuodelagtv@gmail.com»',
        to: email,
        subject: "Flider — Restablecer contraseña",
        text: "Restablezca su contraseña en Flider",
        html: `
        <p>Hola, ${nombre}, restablezca su constraseña en Flider.</p>
        <p>Para restablecer su contraseña, sólo debe hacer clic en <a href="http://localhost:4444/api/usuarios/olvidePassword/cambioPassword/${token}">este enlace</a>.</p>
        <p>Para continuar con este proceso, ingrese su nueva contraseña en la ventana emergente.</p>
        <p>Si usted no estaba a la espera de este servicio, ignore este correo electrónico.</p>
        `
    })
};

// Email para compartir llave privada con el usuario
const emailClave = async (datos) => {
  const {email, nombre, key} = datos;

  const transport = nodemailer.createTransport({
      host: process.env.MASTER_H,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MASTER_EM,
        pass: process.env.MASTER_P
      }
    });
  // Información del email
  const info = await transport.sendMail({
      from: '"Flider — Administrador de la Base de Datos" «arisuodelagtv@gmail.com»',
      to: email,
      subject: "Flider — Llave privada",
      text: "Almacene su llave privada de Flider",
      html: `
      <p>Hola, ${nombre}, gracias por confirmar su cuenta en Flider.</p>
      <p>Se le hará entrega de una clave privada para firmar sus documentos.</p>
      <p>${nombre}, su clave privada es: ${key}</p>
      <p>Si usted no estaba a la espera de este servicio, ignore este correo electrónico.</p>
      `
  })
};

// Email para enviar parámetros de DH con el creador de los parámetros
const emailSender_DH = async (datos) => {
  const {email, nombre, n, g, s1, s2} = datos;

  const transport = nodemailer.createTransport({
      host: process.env.MASTER_H,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MASTER_EM,
        pass: process.env.MASTER_P
      }
    });
  // Información del email
  const info = await transport.sendMail({
      from: '"Flider — Administrador de la Base de Datos" «arisuodelagtv@gmail.com»',
      to: email,
      subject: "Flider — Parámetros Diffie-Hellman",
      text: "Conozca sus parámetros públicos y almacene sus secretos DH",
      html: `
      <p>Hola, ${nombre}, gracias por utilizar el servicio Diffie-Hellman en Flider.</p>
      <p>Se le hará entrega de una serie de parámetros para establecer su secreto Diffie-Hellman.</p>
      <p>Parámetros públicos: </p>
      <p>n: ${n}</p>
      <p>g: ${g}</p>
      <p>${nombre}, también se le entregan sus parámetros secretos:</p>
      <p>Para clave AES: ${s1}</p>
      <p>Para IV: ${s2}</p>
      <p>NO COMPARTA SUS PARÁMETROS SECRETOS</p>
      <p>Si usted no estaba a la espera de este servicio, ignore este correo electrónico.</p>
      `
  })
};

// Email para enviar parámetros de DH con el remitente de los parámetros
const emailAddressee_DH = async (datos) => {
  const {email, nombreRemitente, nombreDestinatario, n, g, s1, s2} = datos;

  const transport = nodemailer.createTransport({
      host: process.env.MASTER_H,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MASTER_EM,
        pass: process.env.MASTER_P
      }
    });
  // Información del email
  const info = await transport.sendMail({
      from: '"Flider — Administrador de la Base de Datos" «arisuodelagtv@gmail.com»',
      to: email,
      subject: "Flider — Parámetros Diffie-Hellman",
      text: "Conozca sus parámetros públicos y almacene sus secretos DH",
      html: `
      <p>Hola, ${nombreDestinatario}, gracias por utilizar el servicio Diffie-Hellman en Flider.</p>
      <p>El usuario ${nombreRemitente} quiere establecer un secreto Diffie-Hellman en Flider.</p>
      <p>Se le hará entrega de una serie de parámetros para establecer su secreto Diffie-Hellman.</p>
      <p>Parámetros públicos: </p>
      <p>n: ${n}</p>
      <p>g: ${g}</p>
      <p>${nombreDestinatario}, también se le entregan sus parámetros secretos:</p>
      <p>Secreto para clave AES: ${s1}</p>
      <p>Secreto para IV: ${s2}</p>
      <p>NO COMPARTA SUS PARÁMETROS SECRETOS</p>
      <p>Si usted no estaba a la espera de este servicio, ignore este correo electrónico.</p>
      `
  })
};

// Email para enviar claves públicas DH a algún destino
const emailPublicKeys_DH = async (datos) => {
  const {email, nombreRemitente, nombreDestinatario, ksec1, ksec2} = datos;

  const transport = nodemailer.createTransport({
      host: process.env.MASTER_H,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MASTER_EM,
        pass: process.env.MASTER_P
      }
    });
  // Información del email
  const info = await transport.sendMail({
      from: '"Flider — Administrador de la Base de Datos" «arisuodelagtv@gmail.com»',
      to: email,
      subject: "Flider — Claves públicas Diffie-Hellman",
      text: "Conozca las claves públicas que envía la otra entidad para su secreto Diffie-Hellman",
      html: `
      <p>Hola, ${nombreDestinatario}, gracias por utilizar el servicio Diffie-Hellman en Flider.</p>
      <p>El usuario ${nombreRemitente} le envía sus claves públicas Diffie-Hellman en Flider.</p>
      <p>${nombreDestinatario}, se le entregan las claves públicas de ${nombreRemitente}:</p>
      <p>Clave pública para clave AES: ${ksec1}</p>
      <p>Clave pública para IV: ${ksec2}</p>
      <p>Si usted no estaba a la espera de este servicio, ignore este correo electrónico.</p>
      `
  })
};

export {
    emailRegistro,
    emailRestablecer,
    emailClave,
    emailSender_DH,
    emailAddressee_DH,
    emailPublicKeys_DH
};
