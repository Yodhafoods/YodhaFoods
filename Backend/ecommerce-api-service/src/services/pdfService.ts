import puppeteer from "puppeteer";
import { IProduct } from "../models/Product.js";

interface ReportData {
    userName: string;
    product: IProduct;
    consumptionKg: number;
}

const generateHtml = (data: ReportData) => {
    const { userName, product, consumptionKg } = data;
    const weeklyConsumptionGrams = consumptionKg * 1000;

    // Basic calculation: value per 100g * (total grams / 100)
    // Note: This assumes nutritionTable values are numbers or simple strings.
    // Real implementation needs robust parsing.

    const nutritionRows = product.nutritionTable?.map(nut => {
        return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${nut.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${nut.value}</td>
      </tr>
    `;
    }).join("") || "";

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; margin-bottom: 40px; }
          .header h1 { color: #d97706; margin: 0; }
          .section { margin-bottom: 30px; border-radius: 12px; border: 1px solid #eee; padding: 20px; }
          .section h2 { margin-top: 0; color: #4b5563; font-size: 18px; }
          table { width: 100%; border-collapse: collapse; }
          .myth-box { background: #fffbeb; border: 1px solid #fcd34d; color: #92400e; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
          .did-you-know { background: #eff6ff; border: 1px solid #93c5fd; color: #1e40af; padding: 15px; border-radius: 8px; }
          .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #9ca3af; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Truth Lab Report</h1>
          <p>Prepared for ${userName}</p>
        </div>

        <div class="section">
          <h2>Your Selection</h2>
          <p><strong>Product:</strong> ${product.name}</p>
          <p><strong>Weekly Consumption:</strong> ${consumptionKg} Kg</p>
        </div>

        <div class="section">
          <h2>Nutrition Analysis (Per 100g)</h2>
          <table>
            <thead>
              <tr style="text-align: left; background: #f9fafb;">
                <th style="padding: 8px;">Nutrient</th>
                <th style="padding: 8px;">Value</th>
              </tr>
            </thead>
            <tbody>
              ${nutritionRows}
            </tbody>
          </table>
          <p style="font-size: 12px; color: #666; margin-top: 10px;">*Values are based on standard serving sizes.</p>
        </div>

        <div class="myth-box">
          <strong>Myth Buster:</strong> "Eating fat makes you fat."<br/>
          <span style="font-weight: normal;">Fact: Healthy fats are essential for body function and can actually help with weight management!</span>
        </div>

        <div class="did-you-know">
          <strong>Do You Know?</strong><br/>
          Approximately 70% of your immune system is located in your gut. What you eat matters!
        </div>

        <div class="footer">
          &copy; ${new Date().getFullYear()} Yodha Foods. All rights reserved.<br/>
          Truth in the Box Initiative.
        </div>
      </body>
    </html>
  `;
};

export const generateReportPdf = async (data: ReportData): Promise<Buffer> => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        const html = generateHtml(data);
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Uint8Array from pdf method
        const pdfUint8Array = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
        });

        await browser.close();

        // Convert Uint8Array to Buffer
        return Buffer.from(pdfUint8Array);
    } catch (error) {
        console.error("PDF Generation Error:", error);
        throw new Error("Failed to generate PDF report");
    }
};
