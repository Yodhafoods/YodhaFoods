import { api } from '@/lib/api';
import { useState } from 'react';
import { toast } from 'sonner';

interface UsePutState<T> {
    isLoading: boolean;
    error: string | null;
    data: T | null;
}

interface UsePutOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
}

export function usePut<T = any, B = any>(url: string, options?: UsePutOptions<T>) {
    const [state, setState] = useState<UsePutState<T>>({
        isLoading: false,
        error: null,
        data: null,
    });

    const putData = async (payload: B) => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
            const data = await api.put<T, B>(url, payload);

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

    return { ...state, putData };
}
