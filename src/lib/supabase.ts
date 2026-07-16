import { createClient } from '@supabase/supabase-js';

// Hardcoding temporarily to test the connection!
const supabaseUrl = 'https://nzgaknvrngpyksdkbmik.supabase.co/rest/v1/';
const supabaseAnonKey = 'sb_publishable_p4Y0JNvwc-eyarYTfGGWZA_ol608O7T'; // Paste your FULL publishable key here

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase credentials!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);