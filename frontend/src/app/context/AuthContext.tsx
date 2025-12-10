"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api, FetchError } from "../lib/api";

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
  refreshUser: async () => {},
  logout: async () => {},
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

  // FETCH USER (auto-run on page load)
  const refreshUser = async () => {
    try {
      const res = await api.get<{ user: User }>("/api/auth/me");

      Promise.resolve().then(() => {
        setUser(res.user);
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
    } catch {}
    setUser(null);
  }

  // --------------------------------------------------------
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
