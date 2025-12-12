
'use client';

import { useState } from 'react';
import { usePost } from '@/hooks/usePost';
import { UploadImage } from './UploadImage';
import { toast } from 'sonner';

export function CategoryUploadForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const { postData, isLoading } = usePost('/api/categories', {
        onSuccess: () => {
            toast.success('Category created successfully!');
            setName('');
            setDescription('');
            setImage(null);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !image) {
            toast.error('Please provide name and image');
            return;
        }

        const payload = new FormData();
        payload.append('name', name);
        if (description) payload.append('description', description);
        payload.append('image', image);

        await postData(payload);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Add New Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-200">Category Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="e.g. Spices"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-200">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Optional description..."
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-200">Category Image</label>
                    <UploadImage onFileSelect={(file) => setImage(file)} />
                    {image && (
                        <p className="text-xs text-green-500 mt-1">Image selected!</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    {isLoading ? 'Creating...' : 'Create Category'}
                </button>
            </form>
        </div>
    );
}
