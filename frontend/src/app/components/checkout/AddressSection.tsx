"use client";

import { useEffect, useState } from "react";
import { useAddresses } from "@/hooks/useAddresses";
import { useAppSelector } from "@/lib/store/hooks";
import { useAppDispatch } from "@/lib/store/hooks";
import AddressSelectorModal from "./AddressSelectorModal";
import { setSelectedAddress } from "@/lib/store/features/checkout/checkoutSlice";


export default function AddressSection() {
    const { addresses, loading } = useAddresses();
    const dispatch = useAppDispatch();
    const selectedAddress = useAppSelector(
        (state) => state.checkout.selectedAddress
    );

    const [open, setOpen] = useState(false);

    // auto-select default address once
    useEffect(() => {
        if (!selectedAddress && addresses.length) {
            const def = addresses.find((a) => a.isDefault);
            if (def) dispatch(setSelectedAddress(def));
        }
    }, [addresses, selectedAddress, dispatch]);

    return (
        <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Delivery Address</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="text-orange-600 text-sm"
                >
                    Change
                </button>
            </div>

            {loading && <p>Loading addresses...</p>}

            {!loading && selectedAddress && (
                <div className="text-sm text-gray-700">
                    <p className="font-medium">{selectedAddress.fullName}</p>
                    <p>
                        {selectedAddress.addressLine1}, {selectedAddress.city},{" "}
                        {selectedAddress.state} – {selectedAddress.pincode}
                    </p>
                    <p>Phone: {selectedAddress.phone}</p>
                </div>
            )}

            {!loading && !selectedAddress && (
                <p className="text-sm text-red-500">
                    Please select a delivery address
                </p>
            )}

            <AddressSelectorModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
}
