import { Product } from "@/types";

interface ProductSpecsTableProps {
    product: Product;
}

export default function ProductSpecsTable({ product }: ProductSpecsTableProps) {
    // Mocking some static compliance data that usually applies to all products, 
    // but ensuring we default from product object where possible.
    const specs = [
        { label: "Generic Name", value: product.name },
        { label: "Net Weight", value: product.packs?.[0]?.label },
        { label: "Country of Origin", value: "India" },
    ].filter(s => s.value);

    if (specs.length === 0) return null;

    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Information</h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden text-sm">
                <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                        {specs.map((spec, idx) => (
                            <tr key={idx} className="bg-white">
                                <td className="w-1/3 px-4 py-3 font-medium text-gray-500 bg-gray-50">{spec.label}</td>
                                <td className="w-2/3 px-4 py-3 text-gray-900 font-medium">{spec.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
