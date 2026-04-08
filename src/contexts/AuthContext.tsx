import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const initAuth = async () => {
      try {
        // Set up listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
          if (mounted) {
            setSession(sess);
            setUser(sess?.user ?? null);
            setLoading(false);
          }
        });

        // Get session
        const { data: { session: sess }, error } = await supabase.auth.getSession();
        
        if (mounted) {
          if (error) {
            console.warn('Auth error:', error);
          }
          setSession(sess ?? null);
          setUser(sess?.user ?? null);
          setLoading(false);
        }

        return () => subscription.unsubscribe();
      } catch (err) {
        console.error('Auth init error:', err);
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    // Force finish loading after 5 seconds max
    const timeout = setTimeout(() => {
      if (mounted) {
        setLoading(false);
      }
    }, 5000);

    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp: async () => ({ error: null }), signIn: async () => ({ error: null }), signOut: async () => {} }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
