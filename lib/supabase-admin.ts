import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Privileged Supabase client for server-only admin routes.
 * Prefers the service role key (bypasses RLS). Falls back to the anon key
 * only when service role is missing — useful until the key is installed;
 * after RLS is enabled, service role is required for cross-user admin access.
 */
export function createSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url) return null;

  if (serviceRoleKey) {
    return createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  if (anonKey) {
    return createClient(url, anonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return null;
}

export function hasServiceRoleKey() {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}
