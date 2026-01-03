import { useState, useEffect } from 'react';
import { usePost } from '@/hooks/usePost';
import { usePut } from '@/hooks/usePut';
import { UploadImage } from './UploadImage';
import { toast } from 'sonner';
import { Category } from '@/types';

interface CategoryUploadFormProps {
    initialData?: Category | null;
    onSuccess?: () => void;
}

export function CategoryUploadForm({ initialData, onSuccess }: CategoryUploadFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);

    // Initialize form with data if available
    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description || '');
            // We don't set image file here as it's already uploaded. 
            // We could show preview but generic logic is simpler for now:
            // if new image selected -> upload, else backend keeps old one (if API supports it)
        } else {
            setName('');
            setDescription('');
            setImage(null);
        }
    }, [initialData]);

    const isEditing = !!initialData;
    const url = isEditing ? `/api/categories/${initialData._id}` : '/api/categories';

    const { postData, isLoading: isCreating } = usePost(url, {
        onSuccess: () => {
            toast.success('Category created successfully!');
            resetForm();
            if (onSuccess) onSuccess();
        },
    });

    const { putData, isLoading: isUpdating } = usePut(url, {
        onSuccess: () => {
            toast.success('Category updated successfully!');
            resetForm();
            if (onSuccess) onSuccess();
        },
    });

    const resetForm = () => {
        setName('');
        setDescription('');
        setImage(null);
    };

    const isLoading = isCreating || isUpdating;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            toast.error('Please provide a name');
            return;
        }

        if (!isEditing && !image) {
            toast.error('Please provide an image for new category');
            return;
        }

        const payload = new FormData();
        payload.append('name', name);
        if (description) payload.append('description', description);
        if (image) payload.append('image', image);

        if (isEditing) {
            await putData(payload);
        } else {
            await postData(payload);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Category Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                            placeholder="e.g. Spices"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input-field min-h-[100px]"
                            placeholder="Optional description..."
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Category Image</label>
                        {isEditing && !image && initialData?.imageUrl && (
                            <div className="mb-2 text-sm text-gray-500">
                                Current image will be kept if no new image is selected.
                            </div>
                        )}
                        <UploadImage onFileSelect={(file) => setImage(file)} />
                        {image && (
                            <p className="text-xs text-green-500 mt-1 font-medium">New image selected!</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg hover:shadow-blue-500/30"
                    >
                        {isLoading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Category' : 'Create Category')}
                    </button>
                </form>
            </div>

            {/* Global Styles to match Product Form */}
            <style jsx global>{`
                .input-field {
                    width: 100%;
                    padding: 0.625rem;
                    border-radius: 0.5rem;
                    border: 1px solid #e5e7eb;
                    background-color: #f9fafb;
                    transition: border-color 0.15s ease-in-out;
                    font-size: 0.875rem;
                    color: #111827;
                }
                .input-field:focus {
                    outline: none;
                    border-color: #3b82f6;
                    background-color: #ffffff;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
            `}</style>
        </div>
    );
}
