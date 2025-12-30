import { useState, useEffect } from 'react';
import { Category } from '@/types';
import { api } from '@/lib/api';

interface UseCategoriesResult {
    categories: Category[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useCategories = (): UseCategoriesResult => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data: any = await api.get('/api/categories');
            setCategories(data.categories || data);
        } catch (err: any) {
            setError(err.message || 'An error occurred fetching categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, error, refetch: fetchCategories };
};
