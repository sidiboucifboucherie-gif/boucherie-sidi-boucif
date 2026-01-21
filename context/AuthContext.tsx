import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isConfigured } from '../lib/supabaseClient';

interface Profile {
  id: string;
  role: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Profile fetch timeout')), 5000);
      });

      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;
      
      if (error) {
        console.warn('Could not fetch profile (this is okay if profiles table doesn\'t exist yet):', error.message);
        // If profiles table doesn't exist, that's okay - continue without profile
        setLoading(false);
      } else if (data) {
        setProfile(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err: any) {
      console.warn('Profile fetch failed or timed out (continuing without profile):', err?.message || err);
      // Continue without profile - don't block the app
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // If Supabase is not configured, skip auth initialization
    if (!isConfigured) {
      console.warn('⚠️ Supabase not configured - skipping auth initialization');
      setLoading(false);
      return;
    }

    console.log('✅ Supabase configured - initializing auth...');

    // Check active session
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Set loading to false immediately so app can render
          // Fetch profile in background (non-blocking)
          setLoading(false);
          fetchProfile(session.user.id).catch((err) => {
            console.warn('Profile fetch in initAuth failed (non-critical):', err);
          });
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        setLoading(false);
      }
    };

    initAuth();

    // Listen for changes on auth state (logged in, signed out, etc.)
    let subscription: { unsubscribe: () => void } | null = null;
    
    if (isConfigured) {
      const { data: { subscription: sub } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        try {
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            // Set loading to false immediately so app can render
            // Fetch profile in background (non-blocking)
            setLoading(false);
            fetchProfile(session.user.id).catch((err) => {
              console.warn('Profile fetch in auth state change failed (non-critical):', err);
            });
          } else {
            setProfile(null);
            setLoading(false);
          }
        } catch (err) {
          console.error('Error in auth state change:', err);
          setLoading(false);
        }
      });
      subscription = sub;
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [fetchProfile]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, session, profile, isAdmin, loading, signOut }}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy-900"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
