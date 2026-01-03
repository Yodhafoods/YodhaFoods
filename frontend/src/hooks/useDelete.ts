import { api } from '@/lib/api';
import { useState } from 'react';
import { toast } from 'sonner';

interface UseDeleteState<T> {
    isLoading: boolean;
    error: string | null;
    data: T | null;
}

interface UseDeleteOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
}

export function useDelete<T = any>(url: string, options?: UseDeleteOptions<T>) {
    const [state, setState] = useState<UseDeleteState<T>>({
        isLoading: false,
        error: null,
        data: null,
    });

    const deleteData = async () => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
            const data = await api.delete<T>(url);

            setState({ isLoading: false, error: null, data });
            if (options?.onSuccess) {
                options.onSuccess(data);
            }
            return data;
        } catch (error: any) {
            const errorMessage = error.message || 'An error occurred';
            setState({ isLoading: false, error: errorMessage, data: null });
            toast.error(errorMessage);
            if (options?.onError) {
                options.onError(error);
            }
            throw error;
        }
    };

    return { ...state, deleteData };
}
