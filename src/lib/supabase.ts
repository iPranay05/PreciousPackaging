import { createClient as createBaseClient } from "@supabase/supabase-js";

let client: ReturnType<typeof createBaseClient> | null = null;

export function createClient() {
  if (!client) {
    client = createBaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          // Root Error Fix: Explicitly disable navigator locks
          navigatorLock: false, 
          storageKey: "precious-packaging-auth",
          flowType: "pkce",
        },
      } as any
    );
  }
  return client;
}

// A lightweight client strictly for unauthenticated public catalog queries. Bypasses GoTrue lock contention completely.
export const supabasePublic = createBaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key) => null,
        setItem: (key, value) => {},
        removeItem: (key) => {},
      }
    }
  }
);
