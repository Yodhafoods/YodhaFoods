"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, Layers } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useDelete } from "@/hooks/useDelete";
import Modal from "./Modal";
import { AdminDrawer } from "./AdminDrawer";
import { CategoryUploadForm } from "./CategoryUploadForm";
import { SubCategoryForm } from "./SubCategoryForm";
import { toast } from "sonner";

import { Category } from "@/types";

export default function CategoriesView() {
    const { categories, loading, refetch } = useCategories();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);

    // Delete Confirmation State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const { deleteData, isLoading: isDeleting } = useDelete(
        categoryToDelete ? `/api/categories/${categoryToDelete._id}` : '',
        {
            onSuccess: () => {
                toast.success('Category deleted successfully');
                setIsDeleteModalOpen(false);
                setCategoryToDelete(null);
                refetch();
            }
        }
    );

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsModalOpen(true); // Reuse the same modal for create/edit
    };

    const handleDeleteClick = (category: Category) => {
        setCategoryToDelete(category);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (categoryToDelete) {
            await deleteData();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null); // Reset selection on close to switch back to create mode if needed
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                <button
                    onClick={() => {
                        setSelectedCategory(null); // Ensure create mode
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    Add Category
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-700 text-sm font-medium">
                            <tr>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        Loading categories...
                                    </td>
                                </tr>
                            ) : categories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No categories found.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                                {category.imageUrl ? (
                                                    <Image
                                                        src={category.imageUrl}
                                                        alt={category.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-xs text-gray-400">No Img</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm truncate max-w-xs">{category.description || "—"}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setIsSubCategoryModalOpen(true);
                                                    }}
                                                    title="Add Subcategory"
                                                    className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                                                >
                                                    <Layers size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(category)}
                                                    className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create / Edit Drawer */}
            <AdminDrawer
                isOpen={isModalOpen}
                onClose={closeModal}
                title={selectedCategory && !isSubCategoryModalOpen ? "Edit Category" : "Add New Category"}
            >
                <CategoryUploadForm
                    initialData={selectedCategory && !isSubCategoryModalOpen ? selectedCategory : null}
                    onSuccess={() => {
                        closeModal();
                        refetch();
                    }}
                />
            </AdminDrawer>

            {/* Subcategory Modal */}
            <Modal
                isOpen={isSubCategoryModalOpen}
                onClose={() => setIsSubCategoryModalOpen(false)}
                title={selectedCategory ? `Manage Subcategories: ${selectedCategory.name}` : "Manage Subcategories"}
            >
                {selectedCategory && (
                    <SubCategoryForm
                        categoryId={selectedCategory._id}
                        categoryName={selectedCategory.name}
                        existingSubCategories={selectedCategory.subCategories || []}
                        onSuccess={() => {
                            setIsSubCategoryModalOpen(false);
                            refetch();
                        }}
                    />
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Category"
            >
                <div className="p-4">
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete <span className="font-bold">{categoryToDelete?.name}</span>?
                        This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            disabled={isDeleting}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
