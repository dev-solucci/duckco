import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

/**
 * Renders a monochrome SVG asset recolored to the current text color via CSS
 * mask. Use for the wordmark and the Luke head symbol so they adapt to any
 * background. Size with width/height utilities; color with text utilities.
 */
export function MaskedAsset({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn("mask-asset inline-block", className)}
      style={{ "--asset": `url(${src})` } as CSSProperties}
    />
  );
}
