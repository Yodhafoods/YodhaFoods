'use client';

import { useState } from 'react';
import { usePost } from '@/hooks/usePost';
import { toast } from 'sonner';

interface SubCategoryFormProps {
    categoryId: string;
    categoryName: string;
    existingSubCategories: { name: string; slug: string }[];
    onSuccess?: () => void;
}

export function SubCategoryForm({ categoryId, categoryName, existingSubCategories, onSuccess }: SubCategoryFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { postData, isLoading } = usePost(`/api/categories/${categoryId}/subcategories`, {
        onSuccess: () => {
            toast.success('Subcategory added successfully!');
            setName('');
            setDescription('');
            if (onSuccess) onSuccess();
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) {
            toast.error('Please provide a name');
            return;
        }

        const payload = {
            name,
            description,
            isActive: true
        };

        await postData(payload);
    };

    return (
        <div className="bg-white p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Add SubCategory for {categoryName}</h2>

            <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex justify-between items-center bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700"
                >
                    <span>View Existing Subcategories ({existingSubCategories.length})</span>
                    <span className="text-xs">{isDropdownOpen ? '▲' : '▼'}</span>
                </button>

                {isDropdownOpen && (
                    <div className="bg-white p-4 border-t border-gray-200 max-h-40 overflow-y-auto">
                        {existingSubCategories.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">No subcategories yet.</p>
                        ) : (
                            <ul className="space-y-2">
                                {existingSubCategories.map((sub) => (
                                    <li key={sub.slug} className="text-sm text-gray-600 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                        {sub.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">New Subcategory Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white"
                        placeholder="e.g. Diabetes Care"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white"
                        placeholder="Optional description..."
                        rows={3}
                    />
                </div>

                <div className="flex gap-2 justify-end mt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors w-full sm:w-auto"
                    >
                        {isLoading ? 'Adding...' : 'Add SubCategory'}
                    </button>
                </div>
            </form>
        </div>
    );
}
