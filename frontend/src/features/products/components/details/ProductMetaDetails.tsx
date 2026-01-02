import { Product } from "@/types";
import { Timer, Archive, Info } from "lucide-react";

interface ProductMetaDetailsProps {
    product: Product;
}

export default function ProductMetaDetails({ product }: ProductMetaDetailsProps) {
    // If no meta details at all, return null
    if (!product.ingredients && !product.shelfLifeMonths && !product.storageInstructions) {
        return null;
    }

    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Product Details</h3>

            <div className="space-y-4">
                {product.ingredients && (
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                            <Info size={18} className="text-orange-500" />
                            Ingredients
                        </h4>
                        <p className="text-gray-600 pl-7 text-sm">{product.ingredients}</p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    {product.shelfLifeMonths && (
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                                <Timer size={18} className="text-orange-500" />
                                Shelf Life
                            </h4>
                            <p className="text-gray-600 pl-7 text-sm">{product.shelfLifeMonths} Months</p>
                        </div>
                    )}

                    {product.storageInstructions && (
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                                <Archive size={18} className="text-orange-500" />
                                Storage
                            </h4>
                            <p className="text-gray-600 pl-7 text-sm">{product.storageInstructions}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
