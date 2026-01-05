import Image from "next/image";
import { Star, Zap, Users, ShieldCheck, Ticket, Gift, Bell } from "lucide-react";
import Link from "next/link";
import YodhaFamSection from "@/app/(home)/_components/YodhaFamSection";
import MembershipHeroActions from "./MembershipHeroActions";
import MembershipNewsletterForm from "./MembershipNewsletterForm";

export default function MembershipContent() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-[#FFFAF5] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">

                    {/* Hero Content */}
                    <div className="flex-1 text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold text-sm mb-6 animate-fade-in-up">
                            <Star size={16} fill="currentColor" />
                            <span>Coming Soon</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            Join the <span className="text-orange-600 relative inline-block">
                                Inner Circle
                                <div className="absolute -bottom-2 left-0 w-full h-3 bg-orange-200/50 -z-10 rounded-full"></div>
                            </span> of Yodha Foods
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Unlock a closer connection with clean food, sourcing transparency, and exclusive early access. Designed for those who value heritage and health.
                        </p>

                        <MembershipHeroActions />
                    </div>

                    {/* Hero Image / Mascot */}
                    <div className="flex-1 relative w-full flex justify-center lg:justify-end">
                        <div className="relative w-80 h-80 lg:w-[500px] lg:h-[500px]">
                            {/* Abstract decorative blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-200 to-yellow-100 rounded-full blur-3xl opacity-60"></div>

                            <Image
                                src="/assets/images/mascot/2.png"
                                alt="Yodha Foods Membership Mascot"
                                fill
                                className="object-contain relative z-10 hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Planned Membership Benefits</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        We are crafting a program that offers genuine value, prioritizing transparency and product integrity over simple discounts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <BenefitCard
                        icon={<Zap className="text-yellow-500" size={32} />}
                        title="Early Access"
                        description="Be the first to try our new product launches before they hit the public store."
                        color="bg-yellow-50 border-yellow-100"
                    />
                    <BenefitCard
                        icon={<Bell className="text-blue-500" size={32} />}
                        title="Priority Alerts"
                        description="Get instant notifications for limited-stock items and seasonal harvests."
                        color="bg-blue-50 border-blue-100"
                    />
                    <BenefitCard
                        icon={<ShieldCheck className="text-emerald-500" size={32} />}
                        title="Exclusive Content"
                        description="Access deep-dive sourcing stories, nutritional guides, and members-only recipes."
                        color="bg-emerald-50 border-emerald-100"
                    />
                    <BenefitCard
                        icon={<Ticket className="text-purple-500" size={32} />}
                        title="Community Events"
                        description="Invitations to virtual or offline meetups, workshops, and future initiatives."
                        color="bg-purple-50 border-purple-100"
                    />
                </div>
                <p className="text-center text-sm text-gray-400 mt-8 italic">*Program details are subject to change during development.</p>
            </div>

            {/* Details Grid Section */}
            <div className="bg-white py-16 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 mb-4">
                                <Gift size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Cost & Billing</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Currently, Yodha Membership is <strong className="text-green-600">free</strong>. There are no hidden fees or subscriptions. If paid tiers are introduced, they will be optional and clearly announced.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 mb-4">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Who Can Join?</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Membership will be open to all registered users with an active account who have agreed to our Terms & Privacy Policy.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 mb-4">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Transparency First</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Trust is earned. We focus on genuine value—provenance, purity, and quality—rather than just volume-based incentives.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Newsletter / CTA Section */}
            <div id="newsletter" className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="bg-orange-600 rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
                        <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
                            The program is evolving. Sign up for our newsletter to get updates on the official launch and membership details.
                        </p>

                        <MembershipNewsletterForm />
                    </div>
                </div>
            </div>
            <div className="">
                <YodhaFamSection />
            </div>
        </div>
    );
}

function BenefitCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
    return (
        <div className={`p-6 rounded-2xl border ${color} hover:shadow-lg transition-all duration-300 group`}>
            <div className="mb-4 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
