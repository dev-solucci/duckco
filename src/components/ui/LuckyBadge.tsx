import { cn } from "@/lib/utils";

/**
 * Race plate style badge for lucky numbers, drop ids and labels. Mono type,
 * hard border, technical feel.
 */
export function LuckyBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border-2 border-current px-2 py-0.5",
        "font-mono text-[0.65rem] font-bold uppercase leading-none tracking-widest",
        className,
      )}
    >
      {children}
    </span>
  );
}
