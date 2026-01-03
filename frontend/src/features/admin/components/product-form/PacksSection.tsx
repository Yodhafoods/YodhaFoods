import { Plus, Trash2 } from "lucide-react";

export interface Pack {
    label: string;
    weightInGrams: number;
    price: number;
    discountPrice?: number;
    stock: number;
    sku?: string;
    isDefault: boolean;
}

interface PacksSectionProps {
    packs: Pack[];
    onChange: (packs: Pack[]) => void;
}

export function PacksSection({ packs, onChange }: PacksSectionProps) {

    const addPack = () => {
        onChange([...packs, { label: '', weightInGrams: 0, price: 0, stock: 0, isDefault: false }]);
    };

    const removePack = (index: number) => {
        if (packs.length <= 1) return;
        onChange(packs.filter((_, i) => i !== index));
    };

    const updatePack = (index: number, field: keyof Pack, value: any) => {
        const newPacks = [...packs];
        newPacks[index] = { ...newPacks[index], [field]: value };

        // Ensure only one default
        if (field === 'isDefault' && value === true) {
            newPacks.forEach((p, i) => i !== index && (p.isDefault = false));
        }
        onChange(newPacks);
    };

    return (
        <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold">Packs & Pricing</h3>
                <button type="button" onClick={addPack} className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-100 flex items-center gap-1 font-medium transition-colors">
                    <Plus size={16} /> Add Variant
                </button>
            </div>

            <div className="space-y-4">
                {packs.map((pack, idx) => (
                    <div key={idx} className="p-4 border rounded-lg bg-gray-50 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all hover:border-blue-200">
                        {packs.length > 1 && (
                            <button type="button" onClick={() => removePack(idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1">
                                <Trash2 size={16} />
                            </button>
                        )}

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Label *</label>
                            <input
                                placeholder="e.g. 500g Pouch"
                                value={pack.label}
                                onChange={e => updatePack(idx, 'label', e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Weight (grams) *</label>
                            <input
                                type="number"
                                placeholder="500"
                                value={pack.weightInGrams || ''}
                                onChange={e => updatePack(idx, 'weightInGrams', Number(e.target.value))}
                                className="input-field"
                                required
                                min="1"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Stock *</label>
                            <input
                                type="number"
                                placeholder="100"
                                value={pack.stock || ''}
                                onChange={e => updatePack(idx, 'stock', Number(e.target.value))}
                                className="input-field"
                                required
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Price (₹) *</label>
                            <input
                                type="number"
                                placeholder="MRP"
                                value={pack.price || ''}
                                onChange={e => updatePack(idx, 'price', Number(e.target.value))}
                                className="input-field"
                                required
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Discount Price (Optional)</label>
                            <input
                                type="number"
                                placeholder="Selling Price"
                                value={pack.discountPrice || ''}
                                onChange={e => updatePack(idx, 'discountPrice', Number(e.target.value))}
                                className="input-field"
                                min="0"
                            />
                        </div>

                        <div className="flex items-center pt-6">
                            <label className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={pack.isDefault}
                                    onChange={e => updatePack(idx, 'isDefault', e.target.checked)}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                Default Variant
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
