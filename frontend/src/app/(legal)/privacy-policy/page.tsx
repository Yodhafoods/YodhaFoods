import LegalLayout from "@/components/legal/LegalLayout";
import { Dot } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <LegalLayout title="Privacy Policy">
            <div className="flex flex-col gap-4 max-w-3xl">
                <div className="">
                    <p className="text-lg font-normal text-gray-800"> <span className="font-semibold">Effective Date:</span> 30-12-2025</p>
                    <p className="text-lg font-normal text-gray-800"> <span className="font-semibold">Controller:</span> Panchamukhi Presence Private Limited.</p>
                </div>
                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Introduction</h2>
                    <p className="text-md font-normal text-gray-800">Yodha Foods (“we”, “our”, or “us”) is committed to protecting the privacy of users who access or use
                        <Link href="https://www.yodhafoods.com" className="font-semibold text-orange-600 hover:underline">www.yodhafoods.com</Link> (the “Website”).</p>
                    <p className="py-2 text-md font-normal text-gray-800">This Privacy Policy outlines how personal data is collected, used, stored, and protected when you:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Visit or browse the Website;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Register as a user of the Website;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Place an order or make a purchase;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Communicate with us via email, WhatsApp, social media, or other electronic means;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Use any services offered through the Website;</li>
                    </ul>
                    <p className="py-2 text-md font-normal text-gray-800">By accessing or using the Website or services, you confirm that you have read, understood, and consent to this Privacy Policy.
                        If you do not agree, please discontinue use immediately.</p>
                </div>
                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Legal Basis & Compliance</h2>
                    <p>This Policy is governed by and compliant with applicable Indian laws, including:
                    </p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>The Information Technology Act, 2000;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>The IT (Reasonable Security Practices and Sensitive Personal Data) Rules, 2011;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>The Digital Personal Data Protection Act, 2023 (where applicable);</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Applicable consumer protection and e-commerce regulations.</li>
                    </ul>
                </div>
                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Scope of Applicability</h2>
                    <p className="text-md font-normal text-gray-800">This Privacy Policy applies to:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Visitors and customers;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Registered and unregistered users;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Individuals communicating with us electronically.</li>
                    </ul>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Personal Information</h2>
                    <p className="text-md font-normal text-gray-800">We collect personal information voluntarily provided by you when you access the Website or place an order, including:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Full name</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Billing and shipping address</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Email address</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Phone number</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Order-related communication details</li>
                    </ul>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Payment Information</h2>
                    <p className="text-md font-normal text-gray-800">All payments are processed through authorized third-party payment gateways (including Razorpay). We do not store, process, or retain card details, UPI information, net banking credentials, or other sensitive payment data.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Automatically Collected Information</h2>
                    <p className="text-md font-normal text-gray-800">When you access the Website, we may automatically collect technical and usage data, including:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>IP address</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Browser and device information</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Operating system</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Referring and exit URLs</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Pages visited and interaction data</li>
                    </ul>
                    <p className="py-2 text-md font-normal text-gray-800">This information is used solely for website functionality, analytics, and performance improvement.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Transaction Information</h2>
                    <p className="text-md font-normal text-gray-800">We maintain records of transactions conducted on the Website, including:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Order and product details</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Payment confirmation status</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Delivery and fulfillment information</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Customer support interactions related to orders</li>
                    </ul>
                    <p className="py-2 text-md font-normal text-gray-800">Such data is used for order processing, accounting, compliance with legal obligations, and dispute resolution.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Cookies</h2>
                    <p className="text-md font-normal text-gray-800">The Website uses cookies to enable core functionality and analyze usage. You may manage or disable cookies through browser settings; however, certain features may be affected.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Data Minimization</h2>
                    <p className="text-md font-normal text-gray-800">We collect only such information as is reasonably necessary for legitimate business and legal purposes.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">How We Use Your Information</h2>

                    <h3 className="py-1 text-xl font-semibold text-gray-800">Order Processing & Fulfilment</h3>
                    <p className="text-md font-normal text-gray-800">Personal information is used to process, confirm, package, ship, and deliver orders and to communicate essential information relating to purchases.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Account Management & Customer Support</h3>
                    <p className="text-md font-normal text-gray-800">Personal information may be used to:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Manage user accounts, where applicable;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Respond to inquiries, complaints, and service requests;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Provide customer support and grievance redressal;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Process returns, refunds, and resolve delivery or transaction-related disputes.</li>
                    </ul>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Service & Transactional Communications</h3>
                    <p className="text-md font-normal text-gray-800">We may send non-promotional communications necessary for service delivery, Including:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Order confirmations and invoices,</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Shipping and delivery updates,</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Technical notices,</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Security alerts,</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Policy updates and support-related messages.</li>
                    </ul>
                    <p className="py-2 text-md font-normal text-gray-800">These communications are considered essential service messages and cannot be opted out of.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Marketing & Promotional Communications (Opt-In)</h3>
                    <p className="text-md font-normal text-gray-800">With your explicit consent, we may send marketing communications, including promotional offers, product updates, and newsletters, via email, SMS, or WhatsApp.</p>
                    <p className="py-2 text-md font-normal text-gray-800">You may withdraw consent at any time by using the unsubscribe option or by contacting <Link href="mailto:namaste@yodhafoods.com" className="font-semibold text-orange-600 hover:underline">namaste@yodhafoods.com</Link>. Withdrawal of consent does not affect service or transactional communications.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Legal & Regulatory Compliance</h3>
                    <p className="text-md font-normal text-gray-800">Personal information may be processed to comply with:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Applicable laws and regulations;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Accounting and tax requirements;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Lawful requests from government or regulatory authorities.</li>
                    </ul>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Business Operations & Improvements</h3>
                    <p className="text-md font-normal text-gray-800">Information may be used to analyze usage trends, improve website functionality, enhance services, and maintain system security and integrity.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Data Sharing & Disclosure</h2>
                    <p className="text-md font-normal text-gray-800">Yodha Foods does not sell, rent, trade, or commercially exploit personal data. Personal information is shared only where necessary and only with trusted third parties for lawful business purposes.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Service Providers & Business Partners</h3>
                    <p className="text-md font-normal text-gray-800">We may share limited personal information with third-party service providers solely for business operations, including:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Logistics and delivery partners;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Authorized payment gateways (including Razorpay);</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>IT and technology service providers.</li>
                    </ul>
                    <p className="py-2 text-md font-normal text-gray-800">Such parties may process personal data only for the purpose of providing services on our behalf and are contractually obligated to maintain confidentiality and reasonable security safeguards.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Legal, Regulatory & Compliance Requirements</h3>
                    <p className="text-md font-normal text-gray-800">Personal information may be disclosed where required by:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Applicable laws or regulations;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Court orders or legal proceedings;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Lawful requests from government or regulatory authorities;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Statutory compliance obligations, including food safety regulations (where applicable).</li>
                    </ul>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Business Transfers (If Applicable)</h3>
                    <p className="text-md font-normal text-gray-800">In the event of a merger, acquisition, restructuring, or asset transfer, personal data may be transferred in accordance with applicable data protection laws and subject to confidentiality obligations.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Data Minimization & Safeguards</h2>
                    <p className="text-md font-normal text-gray-800">We ensure that:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Only necessary personal data is shared;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Data is used strictly for defined purposes;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Reasonable security practices are maintained.</li>
                    </ul>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Data Security</h2>
                    <p className="text-md font-normal text-gray-800">We implement reasonable and industry-standard security measures to protect personal data from unauthorized access, misuse, alteration, disclosure, or destruction, including:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>SSL encryption for data transmission;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Restricted access on a need-to-know basis;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Internal controls to maintain data confidentiality and integrity.</li>
                    </ul>
                    <p className="py-2 text-md font-normal text-gray-800">While we take reasonable safeguards, no electronic transmission or storage method is completely secure. Accordingly, we do not guarantee absolute security, and data is shared at the user’s own risk.</p>
                    <p className="py-2 text-md font-normal text-gray-800">In the event of a data breach likely to cause harm, we will comply with applicable legal notification requirements.</p>
                </div>


                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Customer Rights</h2>
                    <p className="text-md font-normal text-gray-800">Subject to applicable law, you may exercise the following rights in relation to your personal data:</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Right to Access</h3>
                    <p className="text-md font-normal text-gray-800">You may request confirmation of whether we process your personal data and obtain access to such data.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Right to Correction</h3>
                    <p className="text-md font-normal text-gray-800">You may request correction of inaccurate, incomplete, or outdated personal data.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Right to Erasure</h3>
                    <p className="text-md font-normal text-gray-800">You may request deletion of personal data where it is no longer required or where consent is withdrawn, subject to legal and regulatory retention requirements.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Right to Withdraw Consent</h3>
                    <p className="text-md font-normal text-gray-800">Where processing is based on consent, you may withdraw such consent at any time. Withdrawal does not affect prior lawful processing.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">Right to Grievance Redressal</h3>
                    <p className="text-md font-normal text-gray-800">You may raise grievances regarding data handling in accordance with applicable law.</p>

                    <h3 className="py-1 mt-2 text-xl font-semibold text-gray-800">How to Exercise Your Rights</h3>
                    <p className="text-md font-normal text-gray-800">Requests may be submitted to <Link href="mailto:namaste@yodhafoods.com" className="font-semibold text-orange-600 hover:underline">namaste@yodhafoods.com</Link>.</p>
                    <p className="py-2 text-md font-normal text-gray-800">We may require reasonable identity verification and will respond within statutory timelines.</p>
                </div>

                <div className="">
                    <h2 className="py-2 text-2xl font-bold text-gray-800">Legal Limitations</h2>
                    <p className="text-md font-normal text-gray-800">Certain rights may be restricted where data retention is required for:</p>
                    <ul className="py-1 text-md font-normal text-gray-800">
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Legal or regulatory compliance;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Accounting or tax obligations;</li>
                        <li className="flex items-center gap-2"> <span><Dot size={22} /></span>Establishment, exercise, or defense of legal claims.</li>
                    </ul>
                </div>
            </div>
        </LegalLayout>
    );
}
