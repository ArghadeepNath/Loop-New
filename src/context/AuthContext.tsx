import React, { createContext, useContext, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null; data: any | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null; data: any | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Create a mock user with the provided email
      const mockUser = {
        id: "mock-" + Date.now(),
        email: email,
        user_metadata: { full_name: email.split('@')[0] },
        created_at: new Date().toISOString(),
      };

      const mockSession = {
        access_token: "mock-token-" + Date.now(),
        refresh_token: "mock-refresh-" + Date.now(),
        expires_at: Date.now() + 3600000, // 1 hour from now
        user: mockUser,
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setSession(mockSession as any);
      setUser(mockUser as any);
      
      navigate("/dashboard");

      return {
        data: { user: mockUser, session: mockSession },
        error: null,
      };
    } catch (error) {
      return { data: null, error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      // Create a mock user with the provided email and name
      const mockUser = {
        id: "mock-" + Date.now(),
        email: email,
        user_metadata: { full_name: name },
        created_at: new Date().toISOString(),
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        data: { user: mockUser, session: null },
        error: null,
      };
    } catch (error) {
      return { data: null, error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setSession(null);
    setUser(null);
    navigate("/");
  };

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

