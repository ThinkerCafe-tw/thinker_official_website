import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

/**
 * Admin client for server-side operations that require elevated permissions
 * Uses SERVICE_ROLE_KEY which bypasses RLS and has full admin access
 * DO NOT expose this client to the frontend
 *
 * Note: This client does NOT use cookies since admin operations don't need session management
 */
export async function createAdminClient() {
  // Use static import to ensure proper type definitions
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js')

  const client = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  // Verify admin API is available
  if (!client.auth.admin) {
    throw new Error('Admin API not available. Check SERVICE_ROLE_KEY.')
  }

  return client
}
