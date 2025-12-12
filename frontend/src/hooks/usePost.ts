

import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '../app/lib/api';

interface UsePostState<T> {
    isLoading: boolean;
    error: string | null;
    data: T | null;
}

interface UsePostOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
}

export function usePost<T = any, B = any>(url: string, options?: UsePostOptions<T>) {
    const [state, setState] = useState<UsePostState<T>>({
        isLoading: false,
        error: null,
        data: null,
    });

    const postData = async (payload: B) => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
            const data = await api.post<T, B>(url, payload);

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

    return { ...state, postData };
}

