import {
    Truck, ShieldCheck, Ban, Package,
    CreditCard, Sprout, Banknote, Gift,
    Sun, Zap, Pill, Gem
} from "lucide-react";

export default function TrustBadges() {
    // Row 1: Delivery & Transaction (Minimalist Blue/Gray)
    const row1 = [
        { icon: Truck, label: "Free Delivery", color: "text-blue-600" },
        { icon: Ban, label: "Non-Returnable", color: "text-red-500" },
        { icon: Package, label: "Amazon Delivered", color: "text-orange-500" },
        { icon: ShieldCheck, label: "Secure Transaction", color: "text-blue-600" },
    ];

    // Row 2: Services (Card Style)
    const row2 = [
        { icon: Gift, label: "Free Shipping > ₹1499", bg: "bg-orange-50", border: "border-orange-100", iconColor: "text-orange-600" },
        { icon: CreditCard, label: "Secure Payments", bg: "bg-blue-50", border: "border-blue-100", iconColor: "text-blue-600" },
        { icon: Sprout, label: "Farmers Empowerment", bg: "bg-green-50", border: "border-green-100", iconColor: "text-green-600" },
        { icon: Banknote, label: "COD Available", bg: "bg-purple-50", border: "border-purple-100", iconColor: "text-purple-600" },
    ];

    // Row 3: Product Highlights (Green Circles)
    const row3 = [
        { icon: Sun, label: "Naturally Dried", sub: "Sun Dried" },
        { icon: Zap, label: "Antioxidant", sub: "Superfood" },
        { icon: Pill, label: "Rich Vitamin C", sub: "Immunity" },
        { icon: Gem, label: "Loaded with", sub: "Minerals" },
    ];

    return (
        <div className="space-y-6 py-6">

            {/* Row 1: Product Highlights (Green Theme) - Originally Row 3 */}
            <div className="grid grid-cols-4 gap-2">
                {row3.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center text-center gap-1.5">
                        <div className="w-12 h-12 rounded-full border-2 border-green-600 flex items-center justify-center text-green-700 bg-green-50 mb-1">
                            <item.icon size={20} strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-green-800 uppercase leading-none">{item.label}</span>
                            <span className="text-[9px] font-medium text-green-600 leading-tight mt-0.5">{item.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Row 2: Key Info - Originally Row 1 */}
            {/* <div className="grid grid-cols-4 gap-2">
                {row1.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center text-center gap-2 group cursor-default">
                        <div className={`p-2.5 rounded-full bg-white shadow-sm ring-1 ring-gray-100 group-hover:scale-110 transition-transform ${item.color.replace('text-', 'ring-').replace('600', '100').replace('500', '100')}`}>
                            <item.icon className={`w-5 h-5 ${item.color}`} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 leading-tight">{item.label}</span>
                    </div>
                ))}
            </div> */}

            {/* Row 3: Service Cards - Originally Row 2 */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {row2.map((item, idx) => (
                    <div key={idx} className={`flex flex-col items-center justify-center p-3 rounded-xl border ${item.bg} ${item.border} text-center hover:shadow-md transition-all`}>
                        <item.icon className={`w-6 h-6 ${item.iconColor} mb-2`} strokeWidth={1.5} />
                        <span className="text-[10px] font-bold text-gray-700 uppercase tracking-tight">{item.label}</span>
                    </div>
                ))}
            </div> */}

        </div>
    );
}
