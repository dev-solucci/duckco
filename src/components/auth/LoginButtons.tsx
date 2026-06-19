"use client";

import { useState } from "react";
import { signInWith, type OAuthProvider } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const providers: { id: OAuthProvider; label: string }[] = [
  { id: "google", label: "Entrar com Google" },
  { id: "apple", label: "Entrar com Apple" },
];

export function LoginButtons() {
  const [busy, setBusy] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function go(provider: OAuthProvider) {
    setError(null);
    setBusy(provider);
    const err = await signInWith(provider);
    if (err) {
      setBusy(null);
      setError(
        "Não foi possível entrar agora. Verifique se o provedor está habilitado no Supabase.",
      );
    }
    // On success the browser is redirected to the provider.
  }

  if (!isSupabaseConfigured) {
    return (
      <p className="border-2 border-dashed border-duck-cream/20 p-4 font-mono text-sm text-chrome-silver">
        O clube online ainda não está configurado neste ambiente.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {providers.map((p) => (
        <button
          key={p.id}
          onClick={() => go(p.id)}
          disabled={busy !== null}
          className={cn(
            "inline-flex items-center justify-center gap-2 border-2 px-7 py-4 font-display text-xl uppercase tracking-wide transition",
            busy === p.id
              ? "border-chrome-silver/40 text-chrome-silver"
              : "border-lucky-yellow bg-lucky-yellow text-lucky-black hover:bg-transparent hover:text-lucky-yellow",
          )}
        >
          {busy === p.id ? "Abrindo" : p.label}
        </button>
      ))}
      {error && (
        <p className="font-mono text-xs text-signal-red">{error}</p>
      )}
    </div>
  );
}
