import React from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface RequestProductCardProps {
    className?: string;
}

const RequestProductCard: React.FC<RequestProductCardProps> = ({ className }) => {
    const handleRequestProduct = () => {
        toast.success("Request feature coming soon!");
    };

    return (
        <div
            className={` group
        bg-gray-50 rounded-2xl p-2.5 sm:p-4 shadow-sm cursor-pointer overflow-hidden
        transition-all duration-300 hover:-translate-y-2 hover:shadow-md 
        relative group w-full snap-start
        flex flex-col h-full dashed border-2 border-gray-300
        items-center justify-center text-center
        ${className || ""}
      `}
            onClick={handleRequestProduct}
        >
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                <Plus className="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </div>

            <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-2">
                Not finding what you want?
            </h3>

            <button
                className="text-xs sm:text-sm font-medium border border-gray-300 rounded-full px-4 py-2 text-orange-600 group-hover:text-white group-hover:bg-orange-500 transition-colors cursor-pointer"
            >
                Request a Product
            </button>
        </div>
    );
};

export default RequestProductCard;
