import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** OAuth redirect target: exchange the code for a session, then continue. */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/cartas";
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error || errorDescription) {
    console.error("OAuth callback error:", error, errorDescription);
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (!exchangeError) return NextResponse.redirect(`${origin}${next}`);
    console.error("exchangeCodeForSession failed:", exchangeError.message);
  }

  const dest = new URL(`${origin}/entrar`);
  dest.searchParams.set("erro", "1");
  if (errorDescription) dest.searchParams.set("motivo", errorDescription);
  return NextResponse.redirect(dest);
}
