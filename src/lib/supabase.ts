import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://xyzcompany.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdGJyaXBwZWZqYnZqcWJxcXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NzI5NzcsImV4cCI6MjAxNTU0ODk3N30.mock-key";

if (
  !import.meta.env.VITE_SUPABASE_URL ||
  !import.meta.env.VITE_SUPABASE_ANON_KEY
) {
  console.warn(
    "Using placeholder Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables for production use.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
