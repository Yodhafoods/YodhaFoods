import { MarkdownEditor } from "./MarkdownEditor";

interface Category {
    _id: string;
    name: string;
}

interface BasicInfoProps {
    data: {
        name: string;
        description: string;
        categoryId: string;
        ingredients: string;
        shelfLifeMonths: string;
        storageInstructions: string;
        howToUse: string;
    };
    categories: Category[];
    onChange: (field: string, value: string) => void;
}

export function BasicInfoSection({ data, categories, onChange }: BasicInfoProps) {
    return (
        <section className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-gray-200 border-b pb-2">Basic Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">Product Name *</label>
                    <input
                        value={data.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        className="input-field"
                        required
                        placeholder="e.g. Organic Turmeric Powder"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">Category *</label>
                    <select
                        value={data.categoryId}
                        onChange={(e) => onChange("categoryId", e.target.value)}
                        className="input-field"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                </div>
            </div>

            <MarkdownEditor
                label="Description"
                value={data.description}
                onChange={(val) => onChange("description", val)}
                height="h-32"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <MarkdownEditor
                        label="Ingredients *"
                        value={data.ingredients}
                        onChange={(val) => onChange("ingredients", val)}
                        height="h-40"
                    />
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium dark:text-gray-300">Shelf Life (Months) *</label>
                        <input
                            type="number"
                            value={data.shelfLifeMonths}
                            onChange={(e) => onChange("shelfLifeMonths", e.target.value)}
                            className="input-field"
                            required
                            min="1"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MarkdownEditor
                    label="Storage Instructions"
                    value={data.storageInstructions}
                    onChange={(val) => onChange("storageInstructions", val)}
                    height="h-32"
                />
                <MarkdownEditor
                    label="How to Use"
                    value={data.howToUse}
                    onChange={(val) => onChange("howToUse", val)}
                    height="h-32"
                />
            </div>
        </section>
    );
}
