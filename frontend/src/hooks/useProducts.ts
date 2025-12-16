import { useState, useEffect } from 'react';
import { Product } from '@/types';

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
            let url = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;
            if (categorySlug) {
                url = `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${categorySlug}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
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
