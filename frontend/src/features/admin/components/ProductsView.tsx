"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductDrawer } from "./ProductDrawer";
import { ProductUploadForm } from "./ProductUploadForm";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function ProductsView() {
    const { products, loading, refetch } = useProducts();
    const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEdit = (product: any) => {
        setSelectedProduct(product);
        setIsProductDrawerOpen(true);
    };

    const handleDelete = (product: any) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedProduct) return;

        setIsDeleting(true);
        try {
            await api.del(`/api/products/${selectedProduct._id}`);
            toast.success("Product deleted successfully");
            refetch();
            setIsDeleteModalOpen(false);
            setSelectedProduct(null);
        } catch (error) {
            toast.error("Failed to delete product");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleAddNew = () => {
        setSelectedProduct(null);
        setIsProductDrawerOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <button
                    onClick={handleAddNew}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700 transition-colors"
                >
                    <Plus size={20} />
                    Add Product
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* ... table content remains same ... */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
                            <tr>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        Loading products...
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                                                {product.images && product.images[0] ? (
                                                    <Image
                                                        src={product.images[0].url}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-xs text-gray-400">No Img</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {typeof product.categoryId === 'object' && product.categoryId !== null && 'name' in product.categoryId
                                                ? (product.categoryId as any).name
                                                : "—"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-900">
                                            ₹{product.packs?.[0]?.price || 0}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${(product.packs?.[0]?.stock || 0) > 10
                                                ? "bg-green-100 text-green-700"
                                                : (product.packs?.[0]?.stock || 0) > 0
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}>
                                                {product.packs?.[0]?.stock || 0} in stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product)}
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

            <ProductDrawer
                isOpen={isProductDrawerOpen}
                onClose={() => {
                    setIsProductDrawerOpen(false);
                    setSelectedProduct(null);
                }}
                title={selectedProduct ? "Edit Product" : "Add New Product"}
            >
                <ProductUploadForm
                    onSuccess={() => {
                        setIsProductDrawerOpen(false);
                        setSelectedProduct(null);
                        refetch();
                    }}
                    initialData={selectedProduct}
                />
            </ProductDrawer>

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedProduct(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Product"
                message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
                isLoading={isDeleting}
            />
        </div>
    );
}
