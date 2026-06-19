"use client";

import { useEffect } from "react";
import { useUser } from "@/lib/auth";
import { syncCollection } from "@/lib/cards";

/** Syncs the local collection to the member's account once they are signed in. */
export function CardsSync() {
  const { user } = useUser();
  useEffect(() => {
    if (user) syncCollection();
  }, [user]);
  return null;
}
