
'use client';

import { useState, useEffect } from 'react';
import { usePost } from '@/hooks/usePost';
import { UploadImage } from './UploadImage';
import { toast } from 'sonner';
import { api } from '@/app/lib/api';

interface Category {
    _id: string;
    name: string;
}

export function ProductUploadForm() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        discountPrice: '',
        stock: '',
        description: '',
        categoryId: '',
    });
    const [image, setImage] = useState<{ url: string; public_id: string } | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategories(true);
            try {
                const res = await api.get<any>('/api/categories');

                if (Array.isArray(res)) {
                    setCategories(res);
                } else if (res && Array.isArray(res.data)) {
                    setCategories(res.data);
                } else if (res && Array.isArray(res.categories)) {
                    setCategories(res.categories);
                } else {
                    console.error('Unexpected categories response:', res);
                    setCategories([]);
                }
            } catch (error) {
                console.error('Failed to fetch categories', error);
                toast.error('Could not load categories');
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    const { postData, isLoading } = usePost('/api/products', {
        onSuccess: () => {
            toast.success('Product created successfully!');
            setFormData({
                name: '',
                price: '',
                discountPrice: '',
                stock: '',
                description: '',
                categoryId: '',
            });
            setImage(null);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.categoryId || !formData.stock || !image) {
            toast.error('Please fill in all required fields (Name, Price, Stock, Category, Image)');
            return;
        }

        await postData({
            ...formData,
            price: Number(formData.price),
            discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
            stock: Number(formData.stock),
            images: [image], // Send as array of objects
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (url: string, publicId?: string) => {
        if (url && publicId) {
            setImage({ url, public_id: publicId });
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-200">Product Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Product Name"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-200">Price (₹)</label>
                        <input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="0.00"
                            required
                            min="0"
                        />
                    </div>
                    {/* Discount Price */}
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-200">Discount Price (₹)</label>
                        <input
                            name="discountPrice"
                            type="number"
                            value={formData.discountPrice}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Optional"
                            min="0"
                        />
                    </div>
                </div>

                {/* Stock */}
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-200">Stock Quantity</label>
                    <input
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Available stock"
                        required
                        min="0"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-200">Category</label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    >
                        <option value="">Select Category</option>
                        {loadingCategories ? (
                            <option disabled>Loading...</option>
                        ) : (
                            categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))
                        )}
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-200">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Product details..."
                        rows={3}
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-200">Product Image</label>
                    <UploadImage onUpload={handleImageUpload} />
                    {image && (
                        <p className="text-xs text-green-500 mt-1">Image uploaded!</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                    {isLoading ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
}
