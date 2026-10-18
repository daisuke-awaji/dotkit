import type { CSSProperties } from "react";

/** Joins truthy class names. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

type Px = number | string | undefined;
const px = (v: Px) => (typeof v === "number" ? `${v}px` : v);

/** Builds the dotkit CSS variables, skipping undefined values. */
export function dotVars(
  vars: { size?: Px; gap?: Px; color?: string; value?: number; step?: Px; tone?: string },
  style?: CSSProperties,
): CSSProperties {
  const out: Record<string, string | number> = {};
  if (vars.size !== undefined) out["--dk-size"] = px(vars.size)!;
  if (vars.gap !== undefined) out["--dk-gap"] = px(vars.gap)!;
  if (vars.color !== undefined) out["--dk-color"] = vars.color;
  if (vars.value !== undefined) out["--dk-value"] = vars.value;
  if (vars.step !== undefined) out["--dk-icon-step"] = px(vars.step)!;
  if (vars.tone !== undefined) out["--dk-tone"] = vars.tone;
  return { ...out, ...style } as CSSProperties;
}

export type Density = "sparse" | "normal" | "dense";
export type Shape = "round" | "square" | "ring";
export type Fade = "r" | "l" | "t" | "b" | "radial";

export const densityClass = (d?: Density) => d && `dk-${d}`;
export const shapeClass = (s?: Shape) => (s && s !== "round" ? `dk-${s}` : undefined);
export const fadeClass = (f?: Fade) => f && `dk-fade-${f}`;

/** Props shared by every dot-painting component. */
export interface DotStyleProps {
  /** Preset density. `size` / `gap` override it. */
  density?: Density;
  /** Dot shape. Default: `round`. */
  shape?: Shape;
  /** Dot diameter (px number or any CSS length). */
  size?: number | string;
  /** Distance between dot centers (px number or any CSS length). */
  gap?: number | string;
  /** Dot color. Default: `currentColor`. */
  color?: string;
}
