# Backend setup (Supabase)

The Lucky Cards backend (accounts, persistent collection, decks, async duels,
physical card redemption) runs on Supabase. The app works fully in local only
mode until this is connected, so nothing breaks before setup.

## What you do (needs your account)

1. Create a project at https://supabase.com (free tier is fine).
2. In the dashboard, open **SQL Editor** and run
   [`supabase/schema.sql`](../supabase/schema.sql).
3. Open **Project Settings > API** and copy the **Project URL** and the
   **anon public** key.
4. Create `.env.local` in the project root (copy from
   [`.env.example`](../.env.example)) and paste:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
5. Restart the dev server.

You never share these with anyone; the anon key is meant for the browser. Do not
put the service role key in a `NEXT_PUBLIC_` variable.

## What is already scaffolded

- `src/lib/supabase/client.ts` and `server.ts` — typed clients.
- `isSupabaseConfigured` flag so the UI can fall back to local mode.
- `supabase/schema.sql` — tables and row level security.

## What comes next once connected

- Auth (club membership): sign in flow with the chosen method.
- Migrate the local collection (localStorage) into `card_ownership` on first
  login, then read/write from Supabase.
- Packs granted from real store purchases.
- Physical card redemption via `redeem_codes`.
- Async duel state in `matches`, resolved server side.

## Auth method

Chosen: **Google and Apple OAuth**. The app code is wired (`/entrar`, the
callback route, the nav account control). To make sign in actually work you must
enable the provider in the dashboard.

### Google (simplest, do this first)

1. In Google Cloud Console, create an OAuth 2.0 Client ID (type: Web).
2. Add this **Authorized redirect URI** exactly:
   `https://vnuqycphghyjsmwymvcf.supabase.co/auth/v1/callback`
3. Copy the Client ID and Client Secret.
4. In Supabase: **Authentication > Providers > Google** > enable > paste the
   Client ID and Secret > save.

### Apple

Heavier: needs an Apple Developer account, a Service ID, a Sign in with Apple
key, the Team ID and Key ID. Enable it in **Authentication > Providers > Apple**
with those values. Do Google first; add Apple later.

### App URLs (required)

Our app redirects back to `window.location.origin + /auth/callback`. Supabase
only allows redirect URLs on an allowlist, so run the dev server on a **stable
port** and register it.

1. Run the app on a fixed origin, for example `http://localhost:3000`.
2. In Supabase: **Authentication > URL Configuration**:
   - **Site URL:** `http://localhost:3000`
   - **Redirect URLs:** add `http://localhost:3000/auth/callback`
   - Add the production URL the same way when you deploy.

Note: the preview here runs on a random port (3000 was busy), which will not
match the allowlist. For real login testing, free port 3000 (or pick a fixed
port) and register that exact URL.
