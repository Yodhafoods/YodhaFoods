import { sendEmail } from "../services/email.service.js";
import { emailVerificationTemplate } from "../templates/email-verification.template.js";

export async function handleEmailVerification(
  email: string,
  verificationLink: string
) {
  const { subject, html } = emailVerificationTemplate(verificationLink);
  await sendEmail(email, subject, html);
}
