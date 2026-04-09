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

    // 1. Get initial session
    const initAuth = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (mounted) {
          if (error) {
            console.warn('[Auth] Session error:', error);
          }
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          setLoading(false);
        }
      } catch (err) {
        console.error('[Auth] Init error:', err);
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    // 2. Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (mounted) {
        console.log('[Auth] State changed:', _event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false); // Ensure loading is false once we have a state change
      }
    });

    // Safety timeout - force stop loading after 5 seconds if something hangs
    const timeout = setTimeout(() => {
      if (mounted && loading) {
        console.warn('[Auth] Loading timeout - forcing completion');
        setLoading(false);
      }
    }, 5000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array: only run once on mount

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

      console.log('[Auth] SignUp success');
      
      // Create profile record manually if user was created
      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            user_id: data.user.id,
            full_name: fullName,
            email: email,
          }
        ]);
        
        if (profileError) {
          console.warn('[Auth] Profile creation error:', profileError);
        }
      }

      return { error: null };
    } catch (err) {
      console.error('[Auth] SignUp exception:', err);
      return { error: err as Error };
    }
  };

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

      // Note: onAuthStateChange will handle setting the user/session state
      console.log('[Auth] SignIn success');
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
      {!loading ? children : (
        // Optional: Show a simple loader or nothing while checking auth
        <div className="min-h-screen bg-background flex items-center justify-center">
           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-secondary"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
