import { sendEmail } from "../services/email.service.js";
import { forgotPasswordTemplate } from "../templates/forgot-password.template.js";


export async function handleForgotPassword(
  email: string,
  resetPasswordLink: string
) {
  const { subject, html } = forgotPasswordTemplate(resetPasswordLink);
  await sendEmail(email, subject, html);
}