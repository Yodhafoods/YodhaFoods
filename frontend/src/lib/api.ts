
// Centralized API helpers with strict typing (no `any`)
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
// console.log("API_BASE_URL", process.env.NEXT_PUBLIC_API_URL);

/**
 * Helper to build absolute URL
 */
function buildUrl(path: string) {
  // allow callers to pass either "/api/..." or full URL
  if (/^https?:\/\//.test(path)) return path;
  return `${API_BASE_URL.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"
    }${path}`;
}

/**
 * Track the current refresh promise to prevent concurrent refreshes
 */
let refreshPromise: Promise<boolean> | null = null;

/**
 * Refresh the access token
 * Returns true if successful, false otherwise
 */
export async function refreshToken(): Promise<boolean> {
  // If a refresh is already in progress, return that promise
  if (refreshPromise) {
    return refreshPromise;
  }

  // Create a new promise for the refresh
  refreshPromise = (async () => {
    try {
      const res = await fetch(buildUrl("/api/auth/refresh"), {
        method: "POST",
        credentials: "include",
      });
      // If we got a new token, the backend also sent the new expiry
      // Ideally we would capture it here, but `customFetch` or `AuthContext`
      // usage complicates "global" state update from a pure lib file.
      // For now, this ensures the cookie is updated.
      return res.ok;
    } catch (err) {
      console.error("Failed to refresh token", err);
      return false;
    } finally {
      // Clear the promise so next time we can try again
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Custom fetch wrapper that handles 401s by refreshing the token
 */
async function customFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let res = await fetch(url, options);

  // If 401 Unauthorized, try to refresh the token
  if (res.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      // Retry the original request
      res = await fetch(url, options);
    }
  }

  return res;
}

/**
 * Generic GET
 * @template T - expected response JSON shape
 */
export async function get<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await customFetch(buildUrl(path), {
    method: "GET",
    credentials: "include",
    ...init,
  });

  const text = await res.text();
  // if response has no body return undefined casted to T
  if (text === "") {
    if (!res.ok) throw new FetchError(res.status, res.statusText, text);
    return undefined as unknown as T;
  }

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    // not JSON — return as text if caller expects string
    if (!res.ok) throw new FetchError(res.status, res.statusText, text);
    return text as unknown as T;
  }

  if (!res.ok) throw new FetchError(res.status, res.statusText, json);
  return json as T;
}

/**
 * Generic POST
 * @template T - response JSON shape
 * @template B - body type
 */
export async function post<T = unknown, B = unknown>(
  path: string,
  body?: B,
  init?: RequestInit
): Promise<T> {
  const isFormData = body instanceof FormData;

  const res = await customFetch(buildUrl(path), {
    method: "POST",
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(init?.headers as Record<string, string> | undefined),
    },
    body: isFormData
      ? (body as BodyInit)
      : body === undefined
        ? undefined
        : JSON.stringify(body),
    ...init,
  });

  const text = await res.text();
  if (text === "") {
    if (!res.ok) throw new FetchError(res.status, res.statusText, text);
    return undefined as unknown as T;
  }

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    if (!res.ok) throw new FetchError(res.status, res.statusText, text);
    return text as unknown as T;
  }

  if (!res.ok) throw new FetchError(res.status, res.statusText, json);
  return json as T;
}

/**
 * Generic PUT
 */
export async function put<T = unknown, B = unknown>(
  path: string,
  body?: B,
  init?: RequestInit
): Promise<T> {
  const isFormData = body instanceof FormData;

  const res = await customFetch(buildUrl(path), {
    method: "PUT",
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(init?.headers as Record<string, string> | undefined),
    },
    body: isFormData
      ? (body as BodyInit)
      : body === undefined
        ? undefined
        : JSON.stringify(body),
    ...init,
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new FetchError(res.status, res.statusText, json);
  return json as T;
}

/**
 * Generic DELETE
 */
export async function del<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await customFetch(buildUrl(path), {
    method: "DELETE",
    credentials: "include",
    ...init,
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new FetchError(res.status, res.statusText, json);
  return json as T;
}

/**
 * Convenience object
 */
export const api = {
  get,
  post,
  put,
  del,
  refreshToken,
};

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
