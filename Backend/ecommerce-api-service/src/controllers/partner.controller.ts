import { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail.js";

export const submitPartnerRequest = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, mobile, city, state, associationType, source, agreeToTerms } = req.body;

        if (!firstName || !email || !mobile || !city || !state || !associationType) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }

        const subject = `New Partner Request: ${firstName} ${lastName}`;
        const html = `
      <h2>New Partner / Distributor Request</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Association Type:</strong> ${associationType}</p>
      <p><strong>How did you hear about us?:</strong> ${source || 'N/A'}</p>
      <p><strong>Agreed to Terms:</strong> ${agreeToTerms ? 'Yes' : 'No'}</p>
    `;

        await sendEmail("namaste@yodhafoods.com", subject, html);

        res.status(200).json({ message: "Request submitted successfully." });
    } catch (error) {
        console.error("Error submitting partner request:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
