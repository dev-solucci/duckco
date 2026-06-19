"use client";

import { useEffect, useSyncExternalStore } from "react";
import { cards, rarityWeight, TOTAL_CARDS } from "@/data/cards";
import { albumCardIds, chapters } from "@/data/album";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { CardDef } from "@/types";

const STORAGE_KEY = "duckco.cards.v1";
const PACK_SIZE = 3;
const STARTER_PACKS = 3;
const DAILY_PACKS = 2;

interface Snapshot {
  owned: Record<string, number>;
  packs: number;
  lastClaim: string | null;
  hydrated: boolean;
}

const DEFAULT: Snapshot = {
  owned: {},
  packs: STARTER_PACKS,
  lastClaim: null,
  hydrated: false,
};

let snapshot: Snapshot = DEFAULT;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function commit(next: Snapshot) {
  snapshot = next;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        owned: next.owned,
        packs: next.packs,
        lastClaim: next.lastClaim,
      }),
    );
  } catch {
    // memory only
  }
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return DEFAULT;
}

function hydrate() {
  if (snapshot.hydrated) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      snapshot = {
        owned: p.owned && typeof p.owned === "object" ? p.owned : {},
        packs: typeof p.packs === "number" ? p.packs : STARTER_PACKS,
        lastClaim: typeof p.lastClaim === "string" ? p.lastClaim : null,
        hydrated: true,
      };
    } else {
      snapshot = { ...snapshot, hydrated: true };
    }
  } catch {
    snapshot = { ...snapshot, hydrated: true };
  }
  emit();
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

/** Weighted random draw of a single card (client side only). */
function drawOne(): CardDef {
  const total = cards.reduce((s, c) => s + rarityWeight[c.rarity], 0);
  let r = Math.floor(Math.random() * total);
  for (const c of cards) {
    r -= rarityWeight[c.rarity];
    if (r < 0) return c;
  }
  return cards[cards.length - 1];
}

// --- Mutations ---------------------------------------------------------

function openPack(): CardDef[] {
  if (snapshot.packs <= 0) return [];
  const drawn: CardDef[] = [];
  const owned = { ...snapshot.owned };
  for (let i = 0; i < PACK_SIZE; i++) {
    const c = drawOne();
    drawn.push(c);
    owned[c.id] = (owned[c.id] ?? 0) + 1;
  }
  commit({ ...snapshot, owned, packs: snapshot.packs - 1 });
  return drawn;
}

function claimDaily(): boolean {
  if (snapshot.lastClaim === todayKey()) return false;
  commit({
    ...snapshot,
    packs: snapshot.packs + DAILY_PACKS,
    lastClaim: todayKey(),
  });
  return true;
}

/**
 * Reconcile the local collection with the signed in member's cloud collection:
 * pull what the cloud has, keep the higher count per card, and push back the
 * copies the cloud is missing. Offline first; safe to call repeatedly.
 */
export async function syncCollection() {
  if (!isSupabaseConfigured) return;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: rows, error } = await supabase
    .from("card_ownership")
    .select("card_def_id")
    .eq("user_id", user.id);
  if (error) return;

  const cloud: Record<string, number> = {};
  for (const r of rows ?? []) {
    cloud[r.card_def_id] = (cloud[r.card_def_id] ?? 0) + 1;
  }

  const ids = new Set([...Object.keys(snapshot.owned), ...Object.keys(cloud)]);
  const merged: Record<string, number> = {};
  const toInsert: { user_id: string; card_def_id: string; source: string }[] = [];

  for (const id of ids) {
    const local = snapshot.owned[id] ?? 0;
    const remote = cloud[id] ?? 0;
    const total = Math.max(local, remote);
    merged[id] = total;
    for (let i = 0; i < total - remote; i++) {
      toInsert.push({ user_id: user.id, card_def_id: id, source: "sync" });
    }
  }

  if (toInsert.length) await supabase.from("card_ownership").insert(toInsert);
  commit({ ...snapshot, owned: merged });
}

// --- Hook --------------------------------------------------------------

interface CardsState {
  owned: Record<string, number>;
  packs: number;
  canClaim: boolean;
  ownedCount: (id: string) => number;
  collectedCount: number;
  totalCards: number;
  openPack: () => CardDef[];
  claimDaily: () => boolean;
  /** Album chapter progress, filled slots out of total. */
  albumProgress: { filled: number; total: number; complete: boolean };
}

export function useCards(): CardsState {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    hydrate();
  }, []);

  const ownedCount = (id: string) => s.owned[id] ?? 0;
  const collectedCount = Object.keys(s.owned).filter(
    (id) => s.owned[id] > 0,
  ).length;

  const albumTotal = albumCardIds.length;
  const albumFilled = albumCardIds.filter((id) => (s.owned[id] ?? 0) > 0).length;

  return {
    owned: s.owned,
    packs: s.packs,
    canClaim: s.hydrated && s.lastClaim !== todayKey(),
    ownedCount,
    collectedCount,
    totalCards: TOTAL_CARDS,
    openPack,
    claimDaily,
    albumProgress: {
      filled: albumFilled,
      total: albumTotal,
      complete: albumTotal > 0 && albumFilled === albumTotal,
    },
  };
}

export { chapters, PACK_SIZE };
