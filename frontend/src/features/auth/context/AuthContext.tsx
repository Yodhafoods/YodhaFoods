"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api, FetchError } from "@/lib/api";

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
      const success = await api.refreshToken();
      if (success) {
        // If successful, we assume the token is fresh for another 15m.
        // Ideally the refresh endpoint returns the new expiry.
        // Let's refetch user to get new expiry IF the refresh endpoint doesn't return it
        // OR we can just add 15m manually.
        // Better: let's just re-fetch "me" to sync everything/get new expiry if needed,
        // or just rely on the fact that we extended the session.
        // Wait, `refreshToken` logic in `api.ts` updates cookie.
        // We know it's 15m. Let's just set the next timer manually for ~14m from now
        // to avoid an extra network call to `/me` just for a timestamp.
        const nextExpiry = Date.now() + 15 * 60 * 1000;
        scheduleRefresh(nextExpiry);
        console.log("[Auth] Silent refresh successful.");
      } else {
        console.warn("[Auth] Silent refresh failed.");
        // If failed, we don't logout immediately, we let the normal 401 flow handle it
        // or the user will get kicked next time they request.
      }
    } catch (err) {
      console.error("[Auth] Silent refresh error", err);
    }
  };


  // FETCH USER (auto-run on page load)
  const refreshUser = async () => {
    try {
      // The `me` endpoint now might return expiry? No, we didn't update `meController`.
      // We only updated `login` and `refresh`.
      // Getting "me" is usually done with a valid token.
      // If we want preemptive refresh to work after a reload, we need to know when the current token expires.
      // Since we can't read the cookie, we should probably update `meController` too?
      // OR, we can just trigger a refresh "soon" after load to be safe?
      // Actually, let's just trigger a Refresh immediately on mount?
      // Tricky. If we don't know the expiry, we can't schedule accurately.
      // Let's assume on reload we are "fresh enough" OR we just try to refresh once to get a timeline.
      // A better approach for `me`: `me` usually returns "User".
      // Let's just trust that if we are valid, we are valid.
      // But to schedule the *next* refresh, we need a reference.
      // Hack/Workaround: On page load, if we successfully get user, we can just *assume* we have some time,
      // OR we can perform a `refreshToken` call immediately in the background to sync the timer.
      // Let's do the latter: After `refreshUser` successfully gets a user, verify/extend the session.

      const res = await api.get<{ user: User }>("/api/auth/me");

      Promise.resolve().then(async () => {
        setUser(res.user);

        // Since we don't know when the current token expires (cookie is HttpOnly and we didn't update /me),
        // let's do a proactive refresh right now to reset the clock and get a known expiry.
        // This ensures consistent state after a reload.
        await silentRefresh();
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
