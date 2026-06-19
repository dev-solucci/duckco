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

Decide one to start (can add more later):
- **Magic link (email):** simplest, no passwords. Recommended.
- **OAuth (Google / Apple):** one tap, needs provider setup in Supabase.
- **Email + password:** classic, more friction.
