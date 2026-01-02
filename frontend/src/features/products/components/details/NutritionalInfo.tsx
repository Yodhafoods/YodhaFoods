import { Product } from "@/types";

interface NutritionalInfoProps {
    product: Product;
}

export default function NutritionalInfo({ product }: NutritionalInfoProps) {
    if (!product.nutritionTable || product.nutritionTable.length === 0) {
        return null;
    }

    const data = product.nutritionTable;

    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                Nutritional Information
                <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Per 100g</span>
            </h3>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-4 py-3">Nutrient</th>
                            <th className="px-4 py-3 text-right">Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {data.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2 font-medium text-gray-900">{item.label}</td>
                                <td className="px-4 py-2 text-right text-gray-600">{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
