"use client";

import { IoMdClose } from "react-icons/io";
import { Address } from "@/types/address";
import { useAddresses } from "@/hooks/useAddresses";

interface DeleteAddressModalProps {
    address?: Address;
    isOpen: boolean;
    onClose: () => void;
}

export default function DeleteAddressModal({
    address,
    isOpen,
    onClose,
}: DeleteAddressModalProps) {
    const { deleteAddress, actionLoading } = useAddresses();

    if (!isOpen || !address) return null;

    const handleConfirm = async () => {
        try {
            await deleteAddress(address._id);
            onClose();
        } catch {
            alert("Failed to delete address");
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30  px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-white rounded-2xl shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Delete Address</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 bg-gray-200 rounded cursor-pointer"
                    >
                        <IoMdClose size={22} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6 text-sm flex flex-col gap-2 items-center justify-center text-gray-700">
                    <p>
                        Are you sure you want to delete this address?
                    </p>
                    <span className="text-red-500 font-medium">
                        This action cannot be undone.
                    </span>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200  cursor-pointer rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleConfirm}
                        disabled={actionLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                    >
                        {actionLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
