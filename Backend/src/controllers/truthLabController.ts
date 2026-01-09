import { Request, Response } from "express";
import Product from "../models/Product.js";
import { generateReportPdf } from "../services/pdfService.js";
import { sendEmail } from "../utils/sendEmail.js";

export const submitReportRequest = async (req: Request, res: Response) => {
    try {
        const { name, email, whatsapp, productId, consumptionKg } = req.body;

        // 1. Validation
        if (!name || !email || !productId || !consumptionKg) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // 2. Fetch Product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // 3. Generate PDF
        const pdfBuffer = await generateReportPdf({
            userName: name,
            product,
            consumptionKg: Number(consumptionKg),
        });

        // 4. Send Email
        // Using nodemailer attachments
        await sendEmail(
            email,
            "Your Truth Lab Nutrition Report - Yodha Foods",
            `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <p>Hi ${name},</p>
            <p>Thank you for using the Truth Lab! Please find your personalized <strong>Nutritional Savings Report</strong> attached as a PDF.</p>
            <p><strong>Summary:</strong></p>
            <ul>
                <li>Product: <strong>${product.name}</strong></li>
                <li>Weekly Consumption: <strong>${consumptionKg} kg</strong></li>
            </ul>
            <p>The report includes deeper insights, including our "Myth Buster" and "Did You Know" facts.</p>
            <br/>
            <p>Stay Healthy,<br/>Team Yodha Foods</p>
        </div>
        `,
            [
                {
                    filename: `TruthLab_Report_${name.replace(/\s+/g, "_")}.pdf`,
                    content: pdfBuffer,
                    contentType: "application/pdf",
                },
            ]
        );

        // Wait, I need to update sendEmail.ts to support attachments! 
        // I can't do it in this file easily without duplication.
        // I will write this file, then update sendEmail.ts.

        return res.status(200).json({ message: "Report generated and sent successfully" });
    } catch (error) {
        console.error("Truth Lab Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
