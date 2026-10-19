import type { HTMLAttributes } from "react";
import { cx, px, withVars } from "./utils.js";

/** FNV-1a 32-bit over UTF-16 code units. */
function fnv1a(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/**
 * Deterministic 5×5, left-right mirrored dot pattern for a string (user id, email, hash …).
 * Pure function — use it from any framework and render 25 cells yourself.
 */
export function identicon(seed: string): { cells: boolean[]; hue: number } {
  let h = fnv1a(seed);
  const next = () => {
    h ^= h << 13; h >>>= 0;
    h ^= h >>> 17;
    h ^= h << 5; h >>>= 0;
    return h;
  };
  const bits = next();
  const cells: boolean[] = [];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const col = x < 3 ? x : 4 - x;
      cells.push(((bits >>> (y * 3 + col)) & 1) === 1);
    }
  }
  // never render an (almost) empty face
  if (cells.filter(Boolean).length < 5) [7, 12, 17].forEach((i) => (cells[i] = true));
  return { cells, hue: next() % 360 };
}

export interface IdenticonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Any string. The same value always gives the same pattern and color. */
  value: string;
  /** Cell size. Icon size ≈ cell × 6.2. Default: 8px. */
  cell?: number | string;
  /** Override the generated color. */
  color?: string;
  /** Accessible name. Without it the identicon is decorative. */
  label?: string;
}

/** Avatar placeholder generated from a string: a mirrored 5×5 dot pattern. */
export function Identicon({ value, cell, color, label, className, style, ...rest }: IdenticonProps) {
  const { cells, hue } = identicon(value);
  return (
    <span
      className={cx("dk-identicon", className)}
      style={withVars({ "--dk-cell": px(cell), "--dk-color": color ?? `oklch(.6 .16 ${hue})` }, style)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      {...rest}
    >
      {cells.map((on, i) => (
        <i key={i} data-on={on ? "" : undefined} />
      ))}
    </span>
  );
}
