import LegalLayout from "@/components/legal/LegalLayout";
import { Dot } from "lucide-react";
import Link from "next/link";

export default function RefundPolicyPage() {
    return (
        <LegalLayout title="Refund & Cancellation Policy">
            <div className="flex flex-col gap-4 max-w-3xl">
                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Damaged Products or Product Concerns</h2>
                    <p className="text-md font-normal text-gray-800">If a product is received in a damaged condition or there are concerns regarding an order, customers must notify us within 72 hours of delivery by providing the Order ID along with clear photographs of the product and packaging through any of the following channels:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Email: <Link href="mailto:namaste@yodhafoods.com" className="font-semibold text-orange-600 hover:underline">namaste@yodhafoods.com</Link></li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Instagram: <Link href="https://instagram.com/yodhafoods" className="font-semibold text-orange-600 hover:underline">@yodhafoods</Link></li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>WhatsApp: <Link href="https://wa.me/919154081687" className="font-semibold text-orange-600 hover:underline">+91 9154081687</Link></li>
                    </ul>
                    <p className="py-2 text-md font-normal text-gray-800">All requests are subject to verification and will be reviewed on a case-by-case basis. Appropriate assistance will be provided upon validation.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Order Cancellation (Post Dispatch)</h2>
                    <p className="text-md font-normal text-gray-800">Once an order has been dispatched, it cannot be cancelled. Customers may refuse delivery at the time of handover; however, orders once delivered are not eligible for return.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Order Marked as Delivered but Not Received</h2>
                    <p className="text-md font-normal text-gray-800">If an order is marked as delivered but has not been received, customers must contact <Link href="mailto:namaste@yodhafoods.com" className="font-semibold text-orange-600 hover:underline">namaste@yodhafoods.com</Link>. We will coordinate with the delivery partner to investigate and resolve the issue, subject to courier confirmation.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Shipping Charges</h2>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Free shipping is available on all orders with a cart value above ₹300.</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>For orders below ₹300, applicable shipping charges will be displayed at checkout prior to payment.</li>
                    </ul>
                </div>
            </div>
        </LegalLayout>
    );
}
