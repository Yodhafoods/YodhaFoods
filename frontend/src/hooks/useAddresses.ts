import { useEffect, useState, useCallback } from "react";
import { Address } from "@/types/address";
import { api } from "@/app/lib/api";

export function useAddresses() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchAddresses = useCallback(() => {
        setLoading(true);
        api
            .get<{ addresses: Address[] }>("/api/addresses")
            .then((res) => setAddresses(res.addresses))
            .catch((err) => console.error("Fetch addresses failed", err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    /** ==========================
     * Delete Address
     * ========================== */
    const deleteAddress = async (addressId: string) => {
        try {
            setActionLoading(true);
            await api.del(`/api/addresses/${addressId}`);
            await fetchAddresses(); // refresh list
        } catch (err) {
            console.error("Delete address failed", err);
            throw err;
        } finally {
            setActionLoading(false);
        }
    };

    return {
        addresses,
        loading,
        actionLoading,
        refetch: fetchAddresses,
        deleteAddress,
    };
}
