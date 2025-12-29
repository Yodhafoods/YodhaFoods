import LegalLayout from "@/components/legal/LegalLayout";
import { Dot } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
    return (
        <LegalLayout title="Terms & Conditions">
            <div className="flex flex-col gap-4 max-w-3xl">
                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Acceptance of Terms</h2>
                    <p className="text-md font-normal text-gray-800">By accessing or using <Link href="https://www.yodhafoods.com" className="font-semibold text-orange-600 hover:underline">yodhafoods.com</Link> (the “Website”), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and all related policies referenced herein.</p>
                    <p className="py-2 text-md font-normal text-gray-800">If you do not agree, you must immediately discontinue use of the Website and its services.</p>
                    <p className="text-md font-normal text-gray-800">These Terms apply to all visitors, users, customers, and purchasers accessing or using the Website, whether for browsing, transactions, or any services offered (free or paid).</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Eligibility & Compliance</h2>
                    <p className="text-md font-normal text-gray-800">By using the Website, you represent and warrant that:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>You are at least 18 years of age, or accessing the Website under the supervision of a legal guardian;</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>You have the legal capacity to enter into a binding contract under Indian law;</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>You will comply with all applicable laws, regulations, and Website policies.</li>
                    </ul>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Modification of Terms</h2>
                    <p className="text-md font-normal text-gray-800">We reserve the right to modify or update these Terms at any time. Continued use of the Website after changes constitutes acceptance of the revised Terms.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Products and Services</h2>

                    <h3 className="py-1 mt-1 text-xl font-semibold text-gray-800">Nature of Goods</h3>
                    <p className="text-md font-normal text-gray-800">Yodha Foods sells dehydrated food powders, including fruit powders, vegetable powders, and spices, intended for personal consumption. Products are prepared and packaged in accordance with applicable food safety and hygiene standards.</p>
                    <p className="py-2 text-md font-normal text-gray-800">Due to the natural nature of ingredients and processing methods, minor variations in color, texture, aroma, taste, or appearance may occur. Such variations are inherent to the products and shall not be considered defects or grounds for claims.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Accuracy of Information</h3>
                    <p className="text-md font-normal text-gray-800">We make reasonable efforts to ensure that information on the Website, including product descriptions, ingredients, images, pricing, and availability, is accurate and up to date.</p>
                    <p className="py-2 text-md font-normal text-gray-800">However, Yodha Foods does not warrant that any content on the Website is accurate, complete, reliable, current, or error-free at all times.</p>
                    <p className="text-md font-normal text-gray-800">Product images are for illustrative purposes only. Actual products may vary due to natural sourcing, processing variations, lighting conditions, or device display settings.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Pricing & Availability</h3>
                    <p className="text-md font-normal text-gray-800">Product prices and availability are subject to change without prior notice. Yodha Foods reserves the right to:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Correct pricing or listing errors;</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Modify prices or product information;</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Limit quantities;</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Discontinue any product or service, in whole or in part.</li>
                    </ul>
                    <p className="py-2 text-md font-normal text-gray-800">In the event of an incorrect price or product information, Yodha Foods may cancel or refuse any order, even after order confirmation or payment. Any amounts paid in such cases will be refunded to the original payment method.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Service Modifications</h3>
                    <p className="text-md font-normal text-gray-800">Yodha Foods reserves the right to modify, suspend, or discontinue the Website or any part of its services at any time, with or without notice, for maintenance, technical, or business reasons.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Consumer Rights</h2>
                    <p className="text-md font-normal text-gray-800">Nothing in these Terms shall affect the statutory rights available to consumers under applicable Indian laws, including the Consumer Protection Act, 2019.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Intellectual Property</h2>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>All content available on this Website, including text, graphics, images, design, layout, software, and other materials, is protected under applicable copyright, trademark, and intellectual property laws.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>The brand name “Yodha Foods”, the tagline “Rooted in Legacy”, the concept of “Single Ingredient Products”, and all related logos, designs, and brand elements are the exclusive intellectual property of Panchamukhi Presence Private Limited.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>No content from the Website may be copied, reproduced, modified, distributed, or exploited in any manner without prior written permission from Panchamukhi Presence Private Limited.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Unauthorized use may result in legal action under applicable laws.</li>
                    </ul>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Limitation of Liability</h2>
                    <p className="text-md font-normal text-gray-800">To the maximum extent permitted under applicable law, Panchamukhi Presence Private Limited (operating as Yodha Foods), including its directors, employees, affiliates, and partners, shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses, arising from or related to:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Access to, use of, or inability to use the Website or services;</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Acts or omissions of third parties, including logistics partners or payment gateways;</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Unauthorized access to, or alteration of, user data or transmissions.</li>
                    </ul>
                    <p className="py-2 text-md font-normal text-gray-800">Nothing in these Terms shall exclude or limit liability where such exclusion or limitation is not permitted under applicable law.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Governing Law and Jurisdiction</h2>
                    <p className="text-md font-normal text-gray-800">These Terms shall be governed by and construed in accordance with the laws of India.</p>
                    <p className="py-2 text-md font-normal text-gray-800">All disputes arising out of or relating to these Terms or use of the Website shall be subject to the exclusive jurisdiction of the competent courts at Guntur, Andhra Pradesh.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Grievance Officer</h2>
                    <p className="text-md font-normal text-gray-800">In accordance with the Information Technology Act, 2000 and rules made thereunder, the details of the Grievance Officer are as follows:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Entity: Panchamukhi Presence Private Limited (operating as Yodha Foods)</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Grievance Officer: Yodha Foods</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Phone: <Link href="tel:+919705883899" className="font-semibold text-orange-600 hover:underline">+91 9705883899</Link></li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Email: <Link href="mailto:namaste@yodhafoods.com" className="font-semibold text-orange-600 hover:underline">namaste@yodhafoods.com</Link></li>
                    </ul>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Working Hours:</h3>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Monday to Saturday, 9:00 AM to 6:00 PM (IST)</li>
                    </ul>

                    <p className="py-2 text-md font-normal text-gray-800">All grievances will be acknowledged within 48 hours and resolved within 30 days, in accordance with applicable law.</p>
                    <p className="text-md font-normal text-gray-800">The Grievance Officer identified above is appointed pursuant to the provisions of applicable laws, including the Information Technology Act, 2000 and the Consumer Protection Act, 2019, and the rules made thereunder.</p>
                </div>
            </div>
        </LegalLayout>
    );
}
