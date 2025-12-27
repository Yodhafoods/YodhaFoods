import { useState } from "react";
import { useAddresses } from "@/hooks/useAddresses";
import AddressCard from "./AddressCard";
import AddressModal from "./AddressModal";
import DeleteAddressModal from "./DeleteAddressModal";
import { IoMdAdd } from "react-icons/io";
import { Address } from "@/types/address";

export default function AddressList() {
    const { addresses, loading, refetch, deleteAddress, actionLoading } = useAddresses();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | undefined>();
    const [deletingAddress, setDeletingAddress] = useState<Address | undefined>();

    const handleDelete = async () => {
        if (deletingAddress) {
            try {
                await deleteAddress(deletingAddress._id);
                setDeletingAddress(undefined);
            } catch (error) {
                // error handled in hook
            }
        }
    };

    if (loading) return <p className="text-gray-500">Loading addresses...</p>;

    return (
        <div className="space-y-4">
            <button
                onClick={() => {
                    setEditingAddress(undefined);
                    setIsModalOpen(true);
                }}
                className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 cursor-pointer rounded"
            >
                <IoMdAdd /> Add New Address
            </button>

            {addresses.map((address) => (
                <AddressCard
                    key={address._id}
                    address={address}
                    onEdit={() => {
                        setEditingAddress(address);
                        setIsModalOpen(true);
                    }}
                    onDelete={() => setDeletingAddress(address)}
                />
            ))}

            {/* Add / Edit */}
            <AddressModal
                isOpen={isModalOpen}
                address={editingAddress}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    setIsModalOpen(false);
                    refetch();
                }}
            />

            {/* Delete */}
            <DeleteAddressModal
                isOpen={!!deletingAddress}
                address={deletingAddress}
                onClose={() => setDeletingAddress(undefined)}
                onConfirm={handleDelete}
                loading={actionLoading}
            />
        </div>
    );
}
