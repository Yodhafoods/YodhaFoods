import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface Attachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export const sendEmail = async (to: string, subject: string, html: string, attachments?: Attachment[]) => {
  return transporter.sendMail({
    from: `"Yodha Foods" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    attachments,
  });
};
