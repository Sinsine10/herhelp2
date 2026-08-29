import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProfile, type AuthUser } from "./api";
import { deleteStoredItem, getStoredItem, setStoredItem } from "./storage";

const TOKEN_KEY = "herhelp.authToken";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  ready: boolean;
  isAdmin: boolean;
  setSession: (token: string, user: AuthUser) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function restore() {
      try {
        const saved = await getStoredItem(TOKEN_KEY);
        if (!saved) {
          return;
        }
        const profile = await getProfile(saved);
        setToken(saved);
        setUser(profile.user);
      } catch {
        await deleteStoredItem(TOKEN_KEY);
      } finally {
        setReady(true);
      }
    }

    restore();
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      ready,
      isAdmin: user?.role === "admin",
      setSession: async (nextToken: string, nextUser: AuthUser) => {
        await setStoredItem(TOKEN_KEY, nextToken);
        setToken(nextToken);
        setUser(nextUser);
      },
      signOut: async () => {
        await deleteStoredItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      },
      refreshUser: async () => {
        const saved = token ?? (await getStoredItem(TOKEN_KEY));
        if (!saved) {
          return;
        }
        const profile = await getProfile(saved);
        setUser(profile.user);
      },
    }),
    [user, token, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
