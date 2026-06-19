"use client";

import { useEffect, useSyncExternalStore } from "react";
import { levelForLuck, nextLevel, type ClubLevel } from "@/data/game";

const STORAGE_KEY = "duckco.luck.v1";
const MAX = 100;

interface Snapshot {
  luck: number;
  collected: string[];
  lastSpin: string | null;
  hydrated: boolean;
}

const DEFAULT: Snapshot = {
  luck: 0,
  collected: [],
  lastSpin: null,
  hydrated: false,
};

// Module level external store, read via useSyncExternalStore. Shared across
// every component, so no React context/provider is needed.
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
        luck: next.luck,
        collected: next.collected,
        lastSpin: next.lastSpin,
      }),
    );
  } catch {
    // storage unavailable, keep in memory only
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

/** Load persisted state once, after the first client mount. */
function hydrate() {
  if (snapshot.hydrated) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      snapshot = {
        luck: typeof p.luck === "number" ? p.luck : 0,
        collected: Array.isArray(p.collected) ? p.collected : [],
        lastSpin: typeof p.lastSpin === "string" ? p.lastSpin : null,
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

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

// --- Mutations (stable references, safe as effect deps) ----------------

function addLuck(amount: number): number {
  const luck = Math.max(0, Math.min(MAX, snapshot.luck + amount));
  commit({ ...snapshot, luck });
  return luck;
}

function collect(id: string) {
  if (snapshot.collected.includes(id)) return;
  commit({ ...snapshot, collected: [...snapshot.collected, id] });
}

function markSpun() {
  commit({ ...snapshot, lastSpin: todayKey() });
}

// --- Hook --------------------------------------------------------------

interface LuckState {
  luck: number;
  level: ClubLevel;
  next: ClubLevel | null;
  /** 0 to 1 progress toward the next level. */
  progress: number;
  addLuck: (amount: number) => number;
  collected: string[];
  collect: (id: string) => void;
  spunToday: boolean;
  markSpun: () => void;
}

export function useLuck(): LuckState {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    hydrate();
  }, []);

  const level = levelForLuck(s.luck);
  const next = nextLevel(s.luck);
  const span = next ? next.min - level.min : 1;
  const progress = next ? Math.min(1, (s.luck - level.min) / Math.max(1, span)) : 1;
  const spunToday = s.hydrated && s.lastSpin === todayKey();

  return {
    luck: s.luck,
    level,
    next,
    progress,
    addLuck,
    collected: s.collected,
    collect,
    spunToday,
    markSpun,
  };
}

export { MAX as MAX_LUCK };
