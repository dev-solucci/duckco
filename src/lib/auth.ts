"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export type OAuthProvider = "google" | "apple";

/** Current signed in club member, or null. */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { user, loading };
}

export async function signInWith(provider: OAuthProvider) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback?next=/cartas`,
    },
  });
  return error;
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

/** A short display handle from the user record. */
export function handleFor(user: User): string {
  const name = (user.user_metadata?.name as string | undefined) ?? user.email;
  return name?.split("@")[0] ?? "membro";
}
