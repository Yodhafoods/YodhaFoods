import LegalLayout from "@/components/legal/LegalLayout";
import { Dot } from "lucide-react";
import Link from "next/link";

export default function ShippingPolicyPage() {
    return (
        <LegalLayout title="Shipping Policy">
            <div className="flex flex-col gap-4 max-w-3xl">
                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Processing Time</h2>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Orders placed on yodhafoods.com are processed within 1 to 2 business days following successful payment confirmation. Business days exclude Sundays and public holidays.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Upon processing, orders undergo quality checks and packaging before dispatch. Shipment confirmation, including tracking details where available, will be shared via email or WhatsApp after handover to the logistics partner.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Processing timelines may be extended due to high order volumes, operational constraints, or circumstances beyond reasonable control. In such cases, reasonable efforts will be made to keep customers informed.</li>
                    </ul>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Shipping Rates & Estimates</h2>

                    <h3 className="py-1 mt-1 text-xl font-semibold text-gray-800">Shipping Charges</h3>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Shipping charges for domestic orders within India are calculated at checkout based on order weight, package dimensions, and delivery location.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Free shipping is available on orders with a cart value above ₹300.</li>
                    </ul>
                    <p className="text-md font-normal text-gray-800">Applicable shipping charges for orders below ₹300 are displayed at checkout prior to payment confirmation.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Estimated Delivery Timeline</h3>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Orders shipped within India are typically delivered within 4 to 7 business days from the date of dispatch.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Delivery timelines are indicative and may vary based on delivery location, courier serviceability, and local operational conditions. Timelines provided are estimates and not guaranteed.</li>
                    </ul>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Delivery Delays</h2>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Delivery delays may occur due to factors beyond our reasonable control, including courier delays, adverse weather, natural calamities, government actions, strikes, or other force majeure events.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Yodha Foods shall not be liable for delays caused by third-party logistics providers or force majeure circumstances.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Customers are advised to place orders in advance during peak or promotional periods.</li>
                    </ul>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">International Shipping</h2>

                    <h3 className="py-1 mt-1 text-xl font-semibold text-gray-800">International Delivery Availability</h3>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Yodha Foods ships to select international destinations, subject to destination-specific regulations and courier serviceability.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Applicable international shipping options, charges, and estimated delivery timelines (where available) are displayed at checkout.</li>
                    </ul>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Customs, Duties & Taxes</h3>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>International orders may be subject to customs duties, import taxes, VAT, or other charges imposed by the destination country.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Such charges are not included in product prices or shipping fees and are the sole responsibility of the customer, payable to the relevant authorities or courier partner upon delivery.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Yodha Foods has no control over, and bears no liability for, such additional charges.</li>
                    </ul>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Customs Delays & Refusals</h3>
                    <p className="text-md font-normal text-gray-800">Customs processing may cause delivery delays beyond estimated timelines.</p>
                    <p className="py-2 text-md font-normal text-gray-800">Yodha Foods is not liable for delays, holds, non-delivery, or returns arising from customs inspections, regulatory restrictions, incomplete or incorrect customer documentation, or refusal to pay applicable duties or taxes.</p>
                    <p className="text-md font-normal text-gray-800">Orders refused, abandoned, or returned due to customs-related issues are not eligible for refunds, including shipping charges.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Compliance with Local Laws</h3>
                    <p className="text-md font-normal text-gray-800">Customers are responsible for ensuring that products ordered are permitted for import into the destination country in accordance with applicable food, health, and customs regulations.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Order Status</h2>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Upon dispatch, shipment confirmation including tracking number and courier details will be shared via email or WhatsApp.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Tracking information may take up to 48 hours from dispatch to become active due to courier system updates.</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Tracking data is provided by third-party logistics partners. Yodha Foods does not control or guarantee real-time accuracy of tracking updates.</li>
                    </ul>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Damaged or Lost Orders</h2>
                    <p className="text-md font-normal text-gray-800">If an order is received in a damaged condition, customers must notify us within 72 hours of delivery by writing to <Link href="mailto:namaste@yodhafoods.com" className="font-semibold text-orange-600 hover:underline">namaste@yodhafoods.com</Link> along with:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Order ID; and</li>
                        <li className="flex items-start gap-2"> <span><Dot size={22} className="shrink-0" /></span>Clear photographs of the damaged product and outer packaging.</li>
                    </ul>
                    <p className="py-2 text-md font-normal text-gray-800">All damage claims are subject to verification and are reviewed on a case-by-case basis. Upon confirmation, appropriate corrective action, including replacement or refund, may be provided at our discretion.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Lost Shipments</h2>
                    <p className="text-md font-normal text-gray-800">Shipments are handled by third-party courier partners. Yodha Foods shall not be liable for loss of products during transit due to circumstances beyond our control.</p>
                    <p className="py-2 text-md font-normal text-gray-800">If a shipment appears lost or shows no movement for an extended period, customers may contact <Link href="mailto:namaste@yodhafoods.com" className="font-semibold text-orange-600 hover:underline">namaste@yodhafoods.com</Link>. We will coordinate with the courier partner to initiate an investigation or claim, where applicable. Any resolution is subject to confirmation and policies of the courier partner.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Important Note</h2>
                    <p className="text-md font-normal text-gray-800">Resolution timelines may be affected by delays or losses caused by courier partners, incorrect delivery information provided by the customer, or force majeure events.</p>
                </div>
            </div>
        </LegalLayout>
    );
}
