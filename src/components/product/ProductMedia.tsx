import { LuckyBadge } from "@/components/ui/LuckyBadge";
import { brandAssets } from "@/data/assets";
import { isLightTone } from "@/lib/product";
import { cn } from "@/lib/utils";

/**
 * The tonal product visual: a colored panel with the Luke head watermark and an
 * optional race plate number. Shared by the grid card, hero card and the
 * product detail page so products read consistently everywhere.
 */
export function ProductMedia({
  tone,
  number,
  className,
  hover = false,
}: {
  tone: string;
  number?: string;
  className?: string;
  /** Drift the watermark on parent hover (use inside a `group`). */
  hover?: boolean;
}) {
  const light = isLightTone(tone);
  return (
    <div className={cn("relative overflow-hidden", tone, className)}>
      {number && (
        <span className="absolute left-2 top-2 z-10">
          <LuckyBadge className={light ? "text-lucky-black" : "text-duck-cream"}>
            {number}
          </LuckyBadge>
        </span>
      )}
      <span
        aria-hidden
        className={cn(
          "mask-asset absolute inset-[12%]",
          hover &&
            "transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105",
          light ? "text-lucky-black/15" : "text-duck-cream/15",
        )}
        style={{ "--asset": `url(${brandAssets.symbol.src})` } as React.CSSProperties}
      />
    </div>
  );
}
