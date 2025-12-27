"use client";

import { X } from "lucide-react";
import Image from "next/image";

// Actually, I should use a simple detailed modal implementation since I don't know if generic Modal exists/works given the refactor.
// But KitchenView used `import Modal from "./Modal"`.
// Let's make a self-contained modal.

interface RecipeModalProps {
    isOpen: boolean;
    onClose: () => void;
    recipe: any;
}

export default function RecipeModal({ isOpen, onClose, recipe }: RecipeModalProps) {
    if (!isOpen || !recipe) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 text-gray-800 dark:text-white rounded-full transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row h-full max-h-[80vh] overflow-y-auto">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                        {recipe.image ? (
                            <Image
                                src={recipe.image}
                                alt={recipe.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 space-y-4">
                        <span className="text-orange-600 font-bold tracking-widest text-xs uppercase">
                            Recipe
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                            {recipe.title}
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {recipe.description}
                        </p>

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
                            <h4 className="font-bold text-sm mb-2">Ingredients</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                {recipe.ingredients?.map((ing: string, i: number) => (
                                    <li key={i}>{ing}</li>
                                )) || <li>No ingredients listed</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
