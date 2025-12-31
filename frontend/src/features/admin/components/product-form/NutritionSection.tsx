import { Trash2, Plus } from "lucide-react";

interface NutritionItem {
    name: string;
    value: string;
}

interface NutritionSectionProps {
    nutrition: NutritionItem[];
    highlights: string[];
    onNutritionChange: (items: NutritionItem[]) => void;
    onHighlightsChange: (items: string[]) => void;
}

export function NutritionSection({ nutrition, highlights, onNutritionChange, onHighlightsChange }: NutritionSectionProps) {

    // Nutrition Helpers
    const addNut = () => onNutritionChange([...nutrition, { name: '', value: '' }]);
    const removeNut = (idx: number) => onNutritionChange(nutrition.filter((_, i) => i !== idx));
    const updateNut = (idx: number, field: keyof NutritionItem, val: string) => {
        const newD = [...nutrition];
        newD[idx] = { ...newD[idx], [field]: val };
        onNutritionChange(newD);
    };

    // Highlight Helpers
    const addHigh = () => onHighlightsChange([...highlights, '']);
    const removeHigh = (idx: number) => onHighlightsChange(highlights.filter((_, i) => i !== idx));
    const updateHigh = (idx: number, val: string) => {
        const newD = [...highlights];
        newD[idx] = val;
        onHighlightsChange(newD);
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            {/* Nutrition Table */}
            <div>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-lg font-semibold dark:text-gray-200">Nutrition Facts</h3>
                    <button type="button" onClick={addNut} className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-1 rounded hover:bg-blue-100 flex items-center gap-1">
                        <Plus size={14} /> Add Row
                    </button>
                </div>
                <div className="space-y-2">
                    {nutrition.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                            <input
                                placeholder="Nutrient"
                                value={item.name}
                                onChange={e => updateNut(idx, 'name', e.target.value)}
                                className="input-field text-sm"
                            />
                            <input
                                placeholder="Value"
                                value={item.value}
                                onChange={e => updateNut(idx, 'value', e.target.value)}
                                className="input-field text-sm"
                            />
                            <button type="button" onClick={() => removeNut(idx)} className="text-gray-400 hover:text-red-500 p-1">
                                <Trash2 size={15} />
                            </button>
                        </div>
                    ))}
                    {nutrition.length === 0 && <p className="text-xs text-gray-400 italic">No nutrition facts added.</p>}
                </div>
            </div>

            {/* Highlights */}
            <div>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-lg font-semibold dark:text-gray-200">Key Highlights</h3>
                    <button type="button" onClick={addHigh} className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-1 rounded hover:bg-blue-100 flex items-center gap-1">
                        <Plus size={14} /> Add Item
                    </button>
                </div>
                <div className="space-y-2">
                    {highlights.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                            <span className="text-gray-400 text-xs">•</span>
                            <input
                                placeholder="Highlight (e.g. No Added Sugar)"
                                value={item}
                                onChange={e => updateHigh(idx, e.target.value)}
                                className="input-field text-sm"
                            />
                            <button type="button" onClick={() => removeHigh(idx)} className="text-gray-400 hover:text-red-500 p-1">
                                <Trash2 size={15} />
                            </button>
                        </div>
                    ))}
                    {highlights.length === 0 && <p className="text-xs text-gray-400 italic">No highlights added.</p>}
                </div>
            </div>
        </section>
    );
}
