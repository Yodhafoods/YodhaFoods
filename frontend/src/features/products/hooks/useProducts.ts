import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import { api } from '@/lib/api';

interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useProducts = (categorySlug?: string): UseProductsResult => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['products', categorySlug],
        queryFn: async () => {
            let url = '/api/products';
            if (categorySlug) {
                url = `/api/products/category/${categorySlug}`;
            }
            const res = await api.get<Product[]>(url);
            return Array.isArray(res) ? res : (res as any).products || [];
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        products: (data as Product[]) || [],
        loading: isLoading,
        error: error ? (error as Error).message : null,
        refetch,
    };
};
