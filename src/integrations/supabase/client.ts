import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Debug logging
if (typeof window !== 'undefined') {
  console.log('Supabase Debug:');
  console.log('  URL:', SUPABASE_URL ? '✓ Loaded' : '✗ MISSING');
  console.log('  Key:', SUPABASE_PUBLISHABLE_KEY ? '✓ Loaded' : '✗ MISSING');
}

// Create client with fallback values to prevent crashes
export const supabase = createClient<Database>(
  SUPABASE_URL || 'https://ghgxsyeninorvkhfzerx.supabase.co',
  SUPABASE_PUBLISHABLE_KEY || 'ghgxsyeninorvkhfzerx',
  {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
