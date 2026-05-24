import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { getServerEnv, isSupabaseServerConfigured } from "@/lib/env";
import type { Database } from "@/types/database";

export interface CurrentUser {
  id: string;
  email?: string | null;
  isDemo?: boolean;
}

export async function createSupabaseServerClient() {
  const env = getServerEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always mutate cookies. Middleware or route handlers can.
        }
      }
    }
  });
}

export function createSupabaseAdminClient() {
  const env = getServerEnv();
  return createClient<Database>(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!isSupabaseServerConfigured()) {
    const cookieStore = await cookies();
    const demoEmail = cookieStore.get("scanwise_demo_email")?.value;

    if (!demoEmail) {
      return null;
    }

    return {
      id: `demo-${demoEmail.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      email: demoEmail,
      isDemo: true
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}
