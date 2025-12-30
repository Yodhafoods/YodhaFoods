import { useQuery } from '@tanstack/react-query';
import { Category } from '@/types';
import { api } from '@/lib/api';

interface UseCategoriesResult {
    categories: Category[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useCategories = (): UseCategoriesResult => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res: any = await api.get('/api/categories');
            return res.categories || res;
        },
        staleTime: 60 * 60 * 1000, // 1 hour
    });

    return {
        categories: (data as Category[]) || [],
        loading: isLoading,
        error: error ? (error as Error).message : null,
        refetch,
    };
};
