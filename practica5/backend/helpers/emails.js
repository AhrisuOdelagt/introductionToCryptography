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
        from: '"Flider — Administrador de la Base de Datos" «arisuodelagtv@gmail.com»»',
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
      from: '"Flider — Administrador de la Base de Datos" «arisuodelagtv@gmail.com»»',
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

export {
    emailRegistro,
    emailRestablecer,
    emailClave
};
