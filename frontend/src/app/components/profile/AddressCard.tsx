import { Address } from "@/types/address";
import { FiEdit2, FiTrash2, FiPhone } from "react-icons/fi";

interface AddressCardProps {
    address: Address;
    onEdit: () => void;
    onDelete?: () => void; // optional for now
}

export default function AddressCard({
    address,
    onEdit,
    onDelete,
}: AddressCardProps) {
    return (
        <div className="bg-white rounded-xl shadow p-5 border border-gray-100 relative">
            {/* Default Badge */}
            {address.isDefault && (
                <span className="absolute top-4 right-4 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    DEFAULT
                </span>
            )}

            {/* Name */}
            <p className="font-semibold text-gray-900">{address.fullName}</p>

            {/* Phone */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <FiPhone size={14} />
                <span>{address.phone}</span>
            </div>

            {/* Address */}
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {address.addressLine1}
                {address.addressLine2 ? `, ${address.addressLine2}` : ""}
                <br />
                {address.city}, {address.state} – {address.pincode}
            </p>

            {/* Actions */}
            <div className="mt-4 flex gap-6 text-sm">
                <button
                    onClick={onEdit}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 transition cursor-pointer"
                >
                    <FiEdit2 size={14} />
                    Edit
                </button>

                {onDelete && (
                    <button
                        onClick={onDelete}
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 transition cursor-pointer"
                    >
                        <FiTrash2 size={14} />
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}
