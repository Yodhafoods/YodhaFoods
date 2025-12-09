// // src/utils/email.ts
// import nodemailer from "nodemailer";

// const transport = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || "smtp.example.com",
//   port: Number(process.env.SMTP_PORT || 587),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER || "",
//     pass: process.env.SMTP_PASS || ""
//   }
// });

// /**
//  * sendEmail: lightweight wrapper
//  * In dev, if SMTP not set it will log the email to console.
//  */
// export async function sendEmail(to: string, subject: string, html: string) {
//   if (!process.env.SMTP_USER) {
//     console.log("=== Email send (DEV MODE) ===");
//     console.log("To:", to);
//     console.log("Subject:", subject);
//     console.log("HTML:", html);
//     console.log("=============================");
//     return;
//   }

//   await transport.sendMail({
//     from: process.env.EMAIL_FROM || "no-reply@example.com",
//     to,
//     subject,
//     html
//   });
// }
