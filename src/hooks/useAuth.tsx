import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  type AuthUser,
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
} from "@/api/authService";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    login: async (e, p) => {
      const u = await loginApi(e, p);
      setUser(u);
      return u;
    },
    signup: async (e, p) => {
      const u = await signupApi(e, p);
      setUser(u);
      return u;
    },
    logout: async () => {
      await logoutApi();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}