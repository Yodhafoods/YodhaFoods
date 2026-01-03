"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api, FetchError } from "@/lib/api";
import { useAppDispatch } from "@/lib/store/hooks";
import { resetCheckout } from "@/features/checkout/store/checkoutSlice";
import { clearLocalCart, fetchCartItems } from "@/features/cart/store/cartSlice";
import { clearLocalWishlist } from "@/features/wishlist/store/wishlistSlice";

// User Type
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
}

// AuthContext Type
export interface AuthContextType {
  user: User | null;
  loading: boolean;

  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

// ------------------------
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => { },
  logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

// PROVIDER
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to schedule refresh
  const scheduleRefresh = (expiryObj: unknown) => {
    // If we have an expiry, schedule a refresh for 1 minute before it
    const expiry = Number(expiryObj);
    if (!expiry || isNaN(expiry)) return;

    const now = Date.now();
    const timeUntilExpiry = expiry - now;
    // Refresh 60s before expiry. If timeUntilExpiry is already small, do it soon.
    const buffer = 60 * 1000;
    const delay = Math.max(1000, timeUntilExpiry - buffer);

    console.log(`[Auth] Token expires in ${Math.round(timeUntilExpiry / 1000)}s. Scheduling refresh in ${Math.round(delay / 1000)}s`);

    setTimeout(() => {
      silentRefresh();
    }, delay);
  };

  const silentRefresh = async () => {
    try {
      console.log("[Auth] Attempting silent refresh...");
      const { success, expiry } = await api.refreshToken();
      if (success) {
        // If successful, we use the returned expiry to schedule the next refresh.
        // Fallback to 14m if backend doesn't return expiry (though it should now).
        const nextExpiry = expiry || Date.now() + 14 * 60 * 1000;
        scheduleRefresh(nextExpiry);
        console.log("[Auth] Silent refresh successful.");
      } else {
        console.warn("[Auth] Silent refresh failed.");
        // If failed, we don't logout immediately, we let the normal 401 flow handle it
        // or the user will get kicked next time they request.
      }
    } catch (err) {
      // console.error("[Auth] Silent refresh error", err);
      // Silent refresh might fail if token is invalid, no need to spam console
    }
  };


  // FETCH USER (auto-run on page load)
  const refreshUser = async () => {
    try {
      // The /me endpoint now returns { user, accessTokenExpiry }
      // This saves us an extra "refresh_token" call on load.
      const res = await api.get<{ user: User; accessTokenExpiry?: number }>("/api/auth/me");

      Promise.resolve().then(async () => {
        setUser(res.user);

        // Fetch cart immediately after user is set
        dispatch(fetchCartItems());

        if (res.accessTokenExpiry) {
          // If backend provided expiry, schedule next refresh based on it.
          scheduleRefresh(res.accessTokenExpiry);
        } else {
          // Fallback if not provided (shouldn't happen with new backend)
          await silentRefresh();
        }
      });
    } catch {
      Promise.resolve().then(() => {
        setUser(null);
      });
    }
  };

  // Run only once when app loads
  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        await refreshUser();
      } catch (err) {
        // Ignore errors on initial load
        console.log("[Auth] Initial load check failed (expected if not logged in)");
      } finally {
        if (active) {
          // React sees this setState as async → no warnings
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      active = false;
    };
  }, []);

  // --------------------------------------------------------
  // LOGOUT
  // --------------------------------------------------------

  async function logout() {
    try {
      await api.post("/api/auth/logout", {});
    } catch { }
    setUser(null);
    dispatch(resetCheckout());
    dispatch(clearLocalCart());
    dispatch(clearLocalWishlist());
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
