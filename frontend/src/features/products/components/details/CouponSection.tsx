import { Ticket, ArrowRight } from "lucide-react";

export default function CouponSection() {
    return (
        <div className="space-y-3 py-2">
            {/* Input */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none uppercase"
                    />
                </div>
                <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors">
                    Apply
                </button>
            </div>

            {/* Available Coupons */}
            <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Available Offers</h4>

                <div className="p-2 bg-red-50 border border-red-100 border-dashed rounded-md flex items-center justify-between group cursor-pointer hover:bg-red-100 transition-colors">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-red-700">YODHA20</span>
                        <span className="text-[10px] text-red-600">Get 20% off on orders above ₹999</span>
                    </div>
                    <button className="flex items-center text-[10px] font-bold text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        APPLY <ArrowRight size={10} className="ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}
