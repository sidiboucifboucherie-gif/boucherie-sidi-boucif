import { createClient } from '@supabase/supabase-js';

// Access environment variables securely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseAnonKey !== 'your_supabase_anon_key';

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ Missing or default Supabase environment variables. App will run in demo mode without database features.'
  );
  console.warn(
    'To enable full features, create a .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
  );
}

// Create and export the Supabase client
// Fallback to placeholder values if not configured
const url = supabaseUrl && supabaseUrl !== 'your_supabase_project_url' 
  ? supabaseUrl 
  : 'https://placeholder.supabase.co';
  
const key = supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key'
  ? supabaseAnonKey 
  : 'placeholder-key';

export const supabase = createClient(url, key, {
  auth: {
    persistSession: isSupabaseConfigured, // Only persist sessions if configured
    autoRefreshToken: isSupabaseConfigured,
    detectSessionInUrl: isSupabaseConfigured,
  },
});

// Export flag to check if Supabase is configured
export const isConfigured = isSupabaseConfigured;
