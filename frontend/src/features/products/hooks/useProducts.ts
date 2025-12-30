import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { api } from '@/lib/api';

interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useProducts = (categorySlug?: string): UseProductsResult => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            let url = '/api/products';
            if (categorySlug) {
                url = `/api/products/category/${categorySlug}`;
            }

            const data: any = await api.get(url);
            setProducts(data.products || data);
        } catch (err: any) {
            setError(err.message || 'An error occurred fetching products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categorySlug]);

    return { products, loading, error, refetch: fetchProducts };
};
