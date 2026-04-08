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

    const initAuth = async () => {
      try {
        // Set up listener for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
          if (mounted) {
            console.log('[Auth] State changed:', _event);
            setSession(sess);
            setUser(sess?.user ?? null);
            setLoading(false);
          }
        });

        // Get current session
        const { data: { session: sess }, error } = await supabase.auth.getSession();
        
        if (mounted) {
          if (error) {
            console.warn('[Auth] Session error:', error);
          }
          setSession(sess ?? null);
          setUser(sess?.user ?? null);
          setLoading(false);
        }

        return () => subscription.unsubscribe();
      } catch (err) {
        console.error('[Auth] Init error:', err);
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    // Safety timeout
    const timeout = setTimeout(() => {
      if (mounted && loading) {
        console.warn('[Auth] Loading timeout');
        setLoading(false);
      }
    }, 8000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, []);

  // REAL signUp implementation
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('[Auth] Signing up:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        console.error('[Auth] SignUp error:', error);
        return { error: error as Error };
      }

      console.log('[Auth] SignUp success:', data);
      
      // Create profile record
      if (data.user) {
        await supabase.from('profiles').insert([
          {
            user_id: data.user.id,
            full_name: fullName,
            email: email,
          }
        ]).catch(err => console.warn('[Auth] Profile creation error:', err));
      }

      return { error: null };
    } catch (err) {
      console.error('[Auth] SignUp exception:', err);
      return { error: err as Error };
    }
  };

  // REAL signIn implementation
  const signIn = async (email: string, password: string) => {
    try {
      console.log('[Auth] Signing in:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('[Auth] SignIn error:', error);
        return { error: error as Error };
      }

      console.log('[Auth] SignIn success:', data);
      
      // Session will be updated by the listener
      return { error: null };
    } catch (err) {
      console.error('[Auth] SignIn exception:', err);
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    try {
      console.log('[Auth] Signing out');
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('[Auth] SignOut error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
