import { MarkdownEditor } from "./MarkdownEditor";

interface Category {
    _id: string;
    name: string;
    subCategories?: { name: string; slug: string }[];
}

interface BasicInfoProps {
    data: {
        name: string;
        description: string;
        categoryId: string;
        subCategory?: string;
        ingredients: string;
        shelfLifeMonths: string;
        storageInstructions: string;
        howToUse: string;
    };
    categories: Category[];
    onChange: (field: string, value: string) => void;
}

export function BasicInfoSection({ data, categories, onChange }: BasicInfoProps) {
    const selectedCategory = categories.find(c => c._id === data.categoryId);
    const subCategories = selectedCategory?.subCategories || [];

    return (
        <section className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold border-b pb-2">Basic Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Product Name *</label>
                    <input
                        value={data.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        className="input-field"
                        required
                        placeholder="e.g. Organic Turmeric Powder"
                    />
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Category *</label>
                        <select
                            value={data.categoryId}
                            onChange={(e) => {
                                onChange("categoryId", e.target.value);
                                onChange("subCategory", ""); // Reset subcategory on category change
                            }}
                            className="input-field"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>

                    {subCategories.length > 0 && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-medium">
                                Sub Category <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <select
                                value={data.subCategory || ""}
                                onChange={(e) => onChange("subCategory", e.target.value)}
                                className="input-field border-blue-200 bg-blue-50/30"
                            >
                                <option value="">Select Subcategory</option>
                                {subCategories.map(sub => (
                                    <option key={sub.slug} value={sub.slug}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
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
                        <label className="block text-sm font-medium">Shelf Life (Months) *</label>
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
