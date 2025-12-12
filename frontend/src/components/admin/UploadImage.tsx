
'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface UploadImageProps {
    onUpload?: (url: string, publicId?: string) => void;
    onFileSelect?: (file: File | null) => void;
    label?: string;
}

export function UploadImage({ onUpload, onFileSelect, label = 'Upload Image' }: UploadImageProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);


        if (onFileSelect) {
            onFileSelect(file);
            return; // Skip direct upload
        }

        if (!onUpload) return;

        try {
            setUploading(true);

            // 1. Get Signature & Config
            const signRes = await fetch('/api/cloudinary-sign', {
                method: 'POST',
            });

            if (!signRes.ok) throw new Error('Failed to get upload signature');

            const { signature, timestamp, cloudName, apiKey } = await signRes.json();

            // 2. Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', apiKey);
            formData.append('timestamp', timestamp.toString());
            formData.append('signature', signature);
            // Optional: add folder if needed
            // formData.append('folder', 'yodhafoods');

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!uploadRes.ok) {
                throw new Error('Image upload failed');
            }

            const data = await uploadRes.json();
            if (onUpload) onUpload(data.secure_url, data.public_id);
            toast.success('Image uploaded successfully');

        } catch (error) {
            console.error(error);
            toast.error('Failed to upload image');
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setPreview(null);
        if (onUpload) onUpload('');
        if (onFileSelect) onFileSelect(null);
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>

            {preview ? (
                <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                    <button
                        onClick={removeImage}
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 hover:border-gray-400 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {uploading ? (
                                <Loader2 className="w-8 h-8 mb-2 text-gray-500 animate-spin" />
                            ) : (
                                <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                            )}
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF
                            </p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
