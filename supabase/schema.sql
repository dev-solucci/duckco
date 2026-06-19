-- Lucky Cards backend schema for Supabase (Postgres).
-- Run this in the Supabase SQL editor after creating your project.
-- Card definitions (the set) live in code (src/data/cards.ts); the database
-- only stores ownership, decks, matches and redeem codes, keyed by card id.

-- ---------------------------------------------------------------------------
-- profiles: one row per club member, linked to auth.users
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  handle text unique,
  luck int not null default 0,
  club_level text not null default 'rookie',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles are readable by everyone"
  on public.profiles for select using (true);

create policy "members manage their own profile"
  on public.profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Create a profile automatically on signup.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, handle)
  values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- card_ownership: which cards a member owns (one row per copy)
-- ---------------------------------------------------------------------------
create table if not exists public.card_ownership (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  card_def_id text not null,           -- matches an id in src/data/cards.ts
  serial int,                          -- printed serial for numbered cards
  source text not null default 'pack', -- pack | purchase | reward | redeem | trade
  acquired_at timestamptz not null default now()
);

create index if not exists card_ownership_user_idx
  on public.card_ownership (user_id);

alter table public.card_ownership enable row level security;

create policy "members read their own cards"
  on public.card_ownership for select using (auth.uid() = user_id);

create policy "members insert their own cards"
  on public.card_ownership for insert with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- decks: a member's saved decks for the duel
-- ---------------------------------------------------------------------------
create table if not exists public.decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null default 'Deck',
  card_ids text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.decks enable row level security;

create policy "members manage their own decks"
  on public.decks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- matches: async Fit Check duels between members
-- ---------------------------------------------------------------------------
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  challenger uuid not null references public.profiles (id) on delete cascade,
  opponent uuid references public.profiles (id) on delete set null,
  status text not null default 'pending', -- pending | active | finished
  state jsonb not null default '{}',      -- server authoritative round state
  winner uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.matches enable row level security;

create policy "participants read their matches"
  on public.matches for select
  using (auth.uid() = challenger or auth.uid() = opponent);

-- Writes go through server side functions (service role / RPC) to stay
-- authoritative; no direct insert/update policy for clients on purpose.

-- ---------------------------------------------------------------------------
-- redeem_codes: bridge a physical card to its digital twin
-- ---------------------------------------------------------------------------
create table if not exists public.redeem_codes (
  code text primary key,
  card_def_id text not null,
  serial int,
  redeemed_by uuid references public.profiles (id),
  redeemed_at timestamptz
);

alter table public.redeem_codes enable row level security;
-- Redemption is handled by a server function that validates the code; no broad
-- client policy here.
