import { X, Upload } from "lucide-react";
import Image from "next/image";

interface MediaSectionProps {
    images: File[];
    previews: string[];
    onAdd: (files: File[]) => void;
    onRemove: (index: number) => void;
}

export function MediaSection({ images, previews, onAdd, onRemove }: MediaSectionProps) {

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onAdd(Array.from(e.target.files));
        }
    };

    return (
        <section className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-gray-200 border-b pb-2">Product Images</h3>

            <div className="flex flex-wrap gap-4">
                {previews.map((src, idx) => (
                    <div key={idx} className="relative w-32 h-32 border rounded-lg overflow-hidden group shadow-sm bg-gray-50">
                        <Image src={src} alt="preview" fill className="object-cover" />
                        <button
                            type="button"
                            onClick={() => onRemove(idx)}
                            className="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-red-700"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}

                <label className="w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                    <Upload className="text-gray-400 group-hover:text-blue-500 transition-colors" size={24} />
                    <span className="text-xs text-gray-500 mt-2 font-medium">Upload</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                    />
                </label>
            </div>

            {images.length === 0 && <p className="text-xs text-red-500">At least one image is required.</p>}
        </section>
    );
}
