import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  // Let axios handle Content-Type based on data (JSON vs FormData)
});

/**
 * Track the current refresh promise to prevent concurrent refreshes
 */
let refreshPromise: Promise<{ success: boolean; expiry?: number }> | null = null;

/**
 * Refresh the access token
 * Returns object with success status and optional expiry
 */
export async function refreshToken(): Promise<{ success: boolean; expiry?: number }> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {}, { withCredentials: true });
      const expiry = res.data?.accessTokenExpiry;
      return { success: true, expiry };
    } catch (err) {
      // Don't log 401s, they are expected when session is invalid
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        return { success: false };
      }
      console.error("Failed to refresh token", err);
      return { success: false };
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// Response interceptor for 401 handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { success } = await refreshToken();
      if (success) {
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Custom error to preserve status and body
 */
export class FetchError extends Error {
  status: number;
  statusText: string;
  body: unknown;

  constructor(status: number, statusText: string, body: unknown) {
    super(`FetchError ${status} ${statusText}`);
    this.name = "FetchError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

function handleAxiosError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 0;
    const statusText = error.response?.statusText || error.message;
    const data = error.response?.data;
    throw new FetchError(status, statusText, data);
  }
  throw error;
}

/**
 * Generic GET
 */
export async function get<T = unknown>(
  path: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(path, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

/**
 * Generic POST
 */
export async function post<T = unknown, B = unknown>(
  path: string,
  body?: B,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance.post<T>(path, body, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

/**
 * Generic PUT
 */
export async function put<T = unknown, B = unknown>(
  path: string,
  body?: B,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance.put<T>(path, body, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

/**
 * Generic DELETE
 */
export async function del<T = unknown>(
  path: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance.delete<T>(path, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

/**
 * Convenience object
 */
export const api = {
  get,
  post,
  put,
  del,
  delete: del,
  refreshToken,
  axios: axiosInstance,
};
