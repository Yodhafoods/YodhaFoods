"use client";

import { useAddresses } from "@/hooks/useAddresses";
import { useAppDispatch } from "@/lib/store/hooks";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { X } from "lucide-react";
import AddressModal from "@/features/profile/components/AddressModal";
import { setSelectedAddress } from "../store/checkoutSlice";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddressSelectorModal({ isOpen, onClose }: Props) {
    const { addresses } = useAddresses();
    const dispatch = useAppDispatch();
    const [addNew, setAddNew] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center px-4">
            <div className="bg-white max-w-2xl w-full rounded-xl p-6 shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold mb-4">Select Address</h3>
                    <button onClick={onClose} className="bg-gray-200 p-1 cursor-pointer text-gray-500 hover:text-gray-800 rounded"><X size={22} className="" /></button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                    {addresses.map((address) => (
                        <div
                            key={address._id}
                            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-orange-500"
                            onClick={() => {
                                dispatch(setSelectedAddress(address));
                                onClose();
                            }}
                        >
                            <p className="font-medium">{address.fullName}</p>
                            <p className="text-sm text-gray-600">
                                {address.addressLine1}, {address.city}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setAddNew(true)}
                    className="mt-4 flex items-center gap-2 hover:bg-orange-200 p-2 rounded cursor-pointer text-orange-600 text-sm"
                >
                    <IoMdAdd size={22} className="inline" /> Add new address
                </button>

                <AddressModal
                    isOpen={addNew}
                    onClose={() => setAddNew(false)}
                    onSuccess={() => setAddNew(false)}
                />
            </div>
        </div>
    );
}
