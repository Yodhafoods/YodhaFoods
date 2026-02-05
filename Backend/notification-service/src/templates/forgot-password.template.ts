export function forgotPasswordTemplate(link: string) {
  return {
    subject: "Reset your Yodha Foods password",
    html: `
      <h2>Password Reset Request 🔐</h2>
      <p>We received a request to reset your Yodha Foods account password.</p>
      <p>Click the button below to set a new password:</p>

      <a href="${link}"
         style="background:#FF4500;color:#fff;padding:10px 16px;
         border-radius:6px;text-decoration:none;display:inline-block;">
         Reset Password
      </a>

      <p>This link expires in 10 minutes.</p>
      <p>If you didn’t request a password reset, you can safely ignore this email.</p>

      <br/>
      <p>— Team Yodha Foods</p>
    `,
  };
}
