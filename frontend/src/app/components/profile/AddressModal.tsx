"use client";

import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import { IoMdClose } from "react-icons/io";
import { Address } from "@/types/address";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    address?: Address; // edit mode if present
}

const emptyForm = {
    label: "home",
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false,
};

export default function AddressModal({
    isOpen,
    onClose,
    onSuccess,
    address,
}: AddressModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(emptyForm);

    const isEdit = Boolean(address);

    // Populate form when editing
    useEffect(() => {
        if (address) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _id, ...rest } = address;
            setFormData({
                ...rest,
                addressLine2: rest.addressLine2 || "",
            });
        } else {
            setFormData(emptyForm);
        }
    }, [address, isOpen]);

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                await api.put(`/api/addresses/${address!._id}`, formData);
            } else {
                await api.post("/api/addresses", formData);
            }

            onSuccess();
            onClose();
        } catch (err) {
            console.error("Address save failed", err);
            alert("Failed to save address");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
            onClick={onClose}
        >
            {/* Card */}
            <div
                className="w-full max-w-4xl bg-white rounded-2xl shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {isEdit ? "Edit Address" : "Add New Address"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 bg-gray-100 p-1 rounded-md cursor-pointer"
                    >
                        <IoMdClose size={22} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="px-8 py-6 space-y-6 max-h-[75vh] overflow-y-auto"
                >
                    {/* Address Type */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">
                            Address Type
                        </label>
                        <select
                            name="label"
                            value={formData.label}
                            onChange={handleChange}
                            className="w-48 p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* LEFT COLUMN */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-600">Full Name</label>
                                <input
                                    name="fullName"
                                    value={formData.fullName}
                                    placeholder="Enter Full Name"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Phone Number</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    placeholder="Enter 10-digit Phone Number"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Address Line 1</label>
                                <input
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    placeholder="Enter street name/no., Area & Landmark"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">
                                    Address Line 2 (Optional)
                                </label>
                                <input
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-600">City</label>
                                <input
                                    name="city"
                                    value={formData.city}
                                    placeholder="Enter City"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">State</label>
                                <input
                                    name="state"
                                    value={formData.state}
                                    placeholder="Enter State"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Pincode</label>
                                <input
                                    name="pincode"
                                    value={formData.pincode}
                                    placeholder="Enter 6-digit Pincode"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Country</label>
                                <input
                                    name="country"
                                    value={formData.country}
                                    placeholder="Enter Country"
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Default */}
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                        />
                        Make this my default address
                    </label>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-5 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-orange-600 text-white cursor-pointer rounded-lg"
                        >
                            {loading
                                ? "Saving..."
                                : isEdit
                                    ? "Update Address"
                                    : "Save Address"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}
