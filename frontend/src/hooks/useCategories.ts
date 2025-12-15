import { useState, useEffect } from 'react';
import { Category } from '@/types';

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
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
