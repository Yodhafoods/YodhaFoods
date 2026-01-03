
interface Specifications {
    brand: string;
    form: string;
    organic: boolean;
    ayurvedic: boolean;
    vegan: boolean;
    allergens: string;
    containerType: string;
    servingSize: string;
}

interface SpecificationsSectionProps {
    specs: Specifications;
    onChange: (field: keyof Specifications, value: any) => void;
}

export function SpecificationsSection({ specs, onChange }: SpecificationsSectionProps) {
    return (
        <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold border-b pb-2">Specifications</h3>

            <div className="flex flex-wrap gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer bg-green-50 px-3 py-1.5 rounded-full text-sm font-medium text-green-700 select-none">
                    <input type="checkbox" checked={specs.organic} onChange={e => onChange('organic', e.target.checked)} className="rounded text-green-600 focus:ring-green-500" />
                    Organic
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-amber-50 px-3 py-1.5 rounded-full text-sm font-medium text-amber-700 select-none">
                    <input type="checkbox" checked={specs.ayurvedic} onChange={e => onChange('ayurvedic', e.target.checked)} className="rounded text-amber-600 focus:ring-amber-500" />
                    Ayurvedic
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-emerald-50 px-3 py-1.5 rounded-full text-sm font-medium text-emerald-700 select-none">
                    <input type="checkbox" checked={specs.vegan} onChange={e => onChange('vegan', e.target.checked)} className="rounded text-emerald-600 focus:ring-emerald-500" />
                    Vegan
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Brand</label>
                    <input
                        placeholder="Yodha Foods"
                        value={specs.brand}
                        onChange={e => onChange('brand', e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Form</label>
                    <input
                        placeholder="e.g. Powder, Liquid"
                        value={specs.form}
                        onChange={e => onChange('form', e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Container Type</label>
                    <input
                        placeholder="e.g. Bottle, Pouch"
                        value={specs.containerType}
                        onChange={e => onChange('containerType', e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Serving Size</label>
                    <input
                        placeholder="e.g. 5g (1 teaspoon)"
                        value={specs.servingSize}
                        onChange={e => onChange('servingSize', e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-gray-500 uppercase">Allergens</label>
                    <input
                        placeholder="e.g. Contains Nuts"
                        value={specs.allergens}
                        onChange={e => onChange('allergens', e.target.value)}
                        className="input-field text-red-600"
                    />
                </div>
            </div>
        </section>
    );
}
