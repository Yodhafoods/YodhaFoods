import { Product } from "@/types";

interface GeneralSpecsProps {
    product: Product;
}

export default function GeneralSpecs({ product }: GeneralSpecsProps) {
    // Only show what we have. For now, mappings are limited as product schema is evolving.
    const specs = [
        { label: "Brand", value: "Yodha Foods" }, // Static for now
        { label: "Type", value: product.categoryId?.name },
        { label: "Shelf Life", value: product.shelfLifeMonths ? `${product.shelfLifeMonths} Months` : null },
        { label: "Form", value: "Powder" }, // Could be dynamic
    ].filter(s => s.value);

    if (specs.length === 0) return null;

    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">General Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 border-dashed">
                        <span className="text-gray-500 text-sm">{spec.label}</span>
                        <span className="text-gray-900 text-sm font-semibold">{spec.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
