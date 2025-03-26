import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{
    error: Error | null;
    data: any | null;
  }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null;
    data: any | null;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Check if we're in development without real Supabase credentials
      const isDevelopmentWithoutCredentials =
        (!import.meta.env.VITE_SUPABASE_URL ||
          !import.meta.env.VITE_SUPABASE_ANON_KEY) &&
        import.meta.env.DEV;

      if (isDevelopmentWithoutCredentials) {
        console.log("Using mock signup in development mode");
        // Simulate a successful signup with mock data
        const mockUser = {
          id: "mock-user-id-" + Date.now(),
          email,
          user_metadata: { full_name: name },
          created_at: new Date().toISOString(),
        };

        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        return {
          data: { user: mockUser, session: null },
          error: null,
        };
      }

      // Real Supabase signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;

      // If successful, create a user profile in the profiles table
      if (data.user) {
        try {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([
              {
                id: data.user.id,
                name,
                email,
                xp: 0,
                rank: "Beginner",
                streak: 0,
                daily_progress: 0,
              },
            ]);

          if (profileError)
            console.error("Error creating profile:", profileError);
        } catch (profileError) {
          console.error("Error creating profile:", profileError);
          // Continue even if profile creation fails
        }
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error signing up:", error);
      return { data: null, error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Check if we're in development without real Supabase credentials
      const isDevelopmentWithoutCredentials =
        (!import.meta.env.VITE_SUPABASE_URL ||
          !import.meta.env.VITE_SUPABASE_ANON_KEY) &&
        import.meta.env.DEV;

      if (isDevelopmentWithoutCredentials) {
        console.log("Using mock signin in development mode");
        // Simulate a successful login with mock data
        const mockUser = {
          id: "mock-user-id",
          email,
          user_metadata: { full_name: "Mock User" },
          created_at: new Date().toISOString(),
        };

        const mockSession = {
          access_token: "mock-token",
          refresh_token: "mock-refresh-token",
          expires_at: Date.now() + 3600,
          user: mockUser,
        };

        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Update the session state
        setSession(mockSession as any);
        setUser(mockUser as any);

        // Redirect to dashboard on successful login
        navigate("/dashboard");

        return {
          data: { user: mockUser, session: mockSession },
          error: null,
        };
      }

      // Real Supabase signin
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Redirect to dashboard on successful login
      navigate("/dashboard");

      return { data, error: null };
    } catch (error) {
      console.error("Error signing in:", error);
      return { data: null, error: error as Error };
    }
  };

  const signOut = async () => {
    // Check if we're in development without real Supabase credentials
    const isDevelopmentWithoutCredentials =
      (!import.meta.env.VITE_SUPABASE_URL ||
        !import.meta.env.VITE_SUPABASE_ANON_KEY) &&
      import.meta.env.DEV;

    if (isDevelopmentWithoutCredentials) {
      console.log("Using mock signout in development mode");
      // Clear the session state
      setSession(null);
      setUser(null);
      navigate("/");
      return;
    }

    // Real Supabase signout
    await supabase.auth.signOut();
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

// Create the hook as a separate function first
function useAuthHook() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Then export it as a constant
export const useAuth = useAuthHook;
