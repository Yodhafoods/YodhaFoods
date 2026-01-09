import { sendEmail } from "./sendEmail.js";

console.log("SMTP CONFIG FROM BACKEND:");
console.log("HOST =", process.env.SMTP_HOST);
console.log("PORT =", process.env.SMTP_PORT);
console.log("USER =", process.env.SMTP_USER);
console.log("PASS =", process.env.SMTP_PASS ? "LOADED" : "EMPTY");

(async () => {
  try {
    await sendEmail(
      "yourpersonalemail@example.com",
      "SMTP Test",
      "<h1>Email works! 🎉</h1>"
    );

    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Email failed:", err);
  }
})();
