"use client";

import { useEffect, useRef } from "react";
import { useLuck } from "@/lib/luck";

/**
 * Invisible. Rewards a small amount of luck the first time the visitor reaches
 * each scroll depth milestone in a session, so exploring the store pays off.
 */
export function ScrollRewards() {
  const { addLuck } = useLuck();
  const hit = useRef<Set<number>>(new Set());

  useEffect(() => {
    const milestones = [20, 45, 70, 95];
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const m of milestones) {
        if (pct >= m && !hit.current.has(m)) {
          hit.current.add(m);
          addLuck(3);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [addLuck]);

  return null;
}
