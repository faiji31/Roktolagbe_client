"use client";

import { createContext, useContext } from "react";
import { useSession, signOut } from "@/lib/auth-client";

const AuthContext = createContext({
  user: null,
  session: null,
  isPending: true,
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const { data, isPending } = useSession();

  const logout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user: data?.user || null,
        session: data?.session || null,
        isPending,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}