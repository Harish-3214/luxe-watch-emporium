// Supabase client placeholder.
// Wire this up after enabling Lovable Cloud — the env vars will be available automatically.
// Usage:
//   import { supabase } from "@/services/supabase";
//   const { data } = await supabase.from("watches").select("*");

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

// When Lovable Cloud is enabled, replace this stub with:
// import { createClient } from "@supabase/supabase-js";
// export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
export const supabase = null as unknown as {
  from: (table: string) => any;
  auth: any;
};