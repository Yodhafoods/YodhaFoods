export function emailVerificationTemplate(link: string) {
  return {
    subject: "Verify your Yodha Foods account",
    html: `
      <h2>Welcome to Yodha Foods 👋</h2>
      <p>Please verify your email by clicking below:</p>
      <a href="${link}"
         style="background:#FF4500;color:#fff;padding:10px 16px;
         border-radius:6px;text-decoration:none;">
         Verify Email
      </a>
      <p>This link expires in 10 minutes.</p>
    `,
  };
}
