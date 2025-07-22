// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// export const sendPasswordResetEmail = async (
//   email: string,
//   resetToken: string,
// ): Promise<void> => {
//   const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

//   const message = {
//     from: `"Soporte" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Restablecimiento de contraseña",
//     html: `
//         <h1>Has solicitado restablecer tu contraseña</h1>
//         <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
//         <a href="${resetURL}" target="_blank">Restablecer contraseña</a>
//         <p>Este enlace caducará en 1 hora.</p>
//         <p>Si no has solicitado restablecer tu contraseña, puedes ignorar este correo.</p>
//       `,
//   };

//   await transporter.sendMail(message);
// };
