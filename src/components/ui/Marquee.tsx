import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. Content is duplicated so the loop is seamless.
 */
export function Marquee({
  items,
  className,
  durationSeconds = 24,
  reverse = false,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  durationSeconds?: number;
  reverse?: boolean;
  separator?: string;
}) {
  const run = [...items, ...items];
  return (
    <div
      className={cn("relative flex overflow-hidden", className)}
      style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-6 whitespace-nowrap animate-marquee",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {run.map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span>{item}</span>
            <span aria-hidden className="opacity-40">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
