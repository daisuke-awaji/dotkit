import type { HTMLAttributes } from "react";
import { glyphSlug, type IconName } from "./icon-names.js";
import { cx, dotVars, px, shapeClass, withVars, type Shape } from "./utils.js";

type Datum = number | { value: number; label?: string };
const valueOf = (d: Datum) => (typeof d === "number" ? d : d.value);
const labelOf = (d: Datum) => (typeof d === "number" ? undefined : d.label);

export interface HeatmapProps extends HTMLAttributes<HTMLDivElement> {
  /** Cell values, filled column by column (top to bottom). Objects may carry a tooltip `label`. */
  data: Datum[];
  /** Value mapped to the biggest / darkest dot. Default: max of data. */
  max?: number;
  /** Cells per column. Default: 7 (one week). */
  rows?: number;
  /** Cell pitch (px number or CSS length). Default: 12px. */
  cell?: number | string;
  /** Dot color. Default: `--dk-ink`. */
  color?: string;
  /** What the value drives. Default: `"both"` (size and tone). */
  encode?: "both" | "tone" | "size";
  shape?: Shape;
  /** Accessible summary (rendered as `role="img"`). */
  label?: string;
}

/** Contribution-style heatmap: one dot per cell; the value drives size and/or tone. */
export function Heatmap({ data, max, rows, cell, color, encode = "both", shape, label, className, style, ...rest }: HeatmapProps) {
  const top = max ?? Math.max(1e-9, ...data.map(valueOf));
  return (
    <div
      role="img"
      aria-label={label}
      className={cx("dk-heatmap", encode !== "both" && `dk-heatmap--${encode}`, shapeClass(shape), className)}
      style={withVars({ "--dk-rows": rows, "--dk-cell": px(cell), "--dk-color": color }, style)}
      {...rest}
    >
      {data.map((d, i) => (
        <i key={i} title={labelOf(d)} style={dotVars({ value: Math.min(1, Math.max(0, valueOf(d) / top)) })} />
      ))}
    </div>
  );
}

export type UptimeState = "ok" | "warn" | "down" | "none";

export interface UptimeBarProps extends HTMLAttributes<HTMLDivElement> {
  /** One entry per period (e.g. day), oldest first. */
  data: Array<UptimeState | { state: UptimeState; label?: string }>;
  /** Dots per column (height). Default: 5. */
  rows?: number;
  size?: number | string;
  gap?: number | string;
  shape?: Shape;
  /** Accessible summary, e.g. "99.92% uptime over 90 days". */
  label?: string;
}

/** Status-page uptime bar. Each period is a column of dots; state drives color and height. */
export function UptimeBar({ data, rows, size, gap, shape, label, className, style, ...rest }: UptimeBarProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cx("dk-uptime", shapeClass(shape), className)}
      style={withVars({ "--dk-rows": rows }, dotVars({ size, gap }, style))}
      {...rest}
    >
      {data.map((d, i) => {
        const s = typeof d === "string" ? d : d.state;
        return <i key={i} data-state={s} title={typeof d === "string" ? undefined : d.label} />;
      })}
    </div>
  );
}

export interface SparklineProps extends HTMLAttributes<HTMLDivElement> {
  /** Values, oldest first. */
  data: number[];
  /** Value mapped to the bottom. Default: min of data. */
  min?: number;
  /** Value mapped to the top. Default: max of data. */
  max?: number;
  /** Chart height. Default: 40px. */
  height?: number | string;
  /** Dot diameter. Default: 4px. */
  size?: number | string;
  color?: string;
  /** Fill the area under each point with faint dots. */
  area?: boolean;
  shape?: Shape;
  /** Accessible summary, e.g. "Requests, last 30 days: 1.2k → 3.4k". */
  label?: string;
}

/** Sparkline drawn as one dot per value. The latest value gets a halo. */
export function Sparkline({ data, min, max, height, size, color, area, shape, label, className, style, ...rest }: SparklineProps) {
  const lo = min ?? Math.min(...data);
  const hi = max ?? Math.max(...data);
  const span = hi - lo || 1;
  return (
    <div
      role="img"
      aria-label={label}
      className={cx("dk-spark", area && "dk-spark--area", shapeClass(shape), className)}
      style={dotVars({ size, color }, { height, ...style })}
      {...rest}
    >
      {data.map((v, i) => (
        <i key={i} style={dotVars({ value: Math.min(1, Math.max(0, (v - lo) / span)) })} />
      ))}
    </div>
  );
}

export interface PictogramProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon used for every unit. */
  icon: IconName;
  /** How many icons are filled. Fractions fill whole dot columns (e.g. 7.4). */
  value: number;
  /** Total icons. Default: 10. */
  total?: number;
  /** Icon dot step. Default: 3px. */
  step?: number | string;
  /** Icon color. Default: `--dk-ink`. */
  color?: string;
  /** Accessible summary, e.g. "74% of users". */
  label?: string;
}

/** Isotype chart: each icon is one unit, the remainder is shown faintly. */
export function Pictogram({ icon, value, total = 10, step, color, label, className, style, ...rest }: PictogramProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cx("dk-pictogram", className)}
      style={withVars({ "--dk-icon-step": px(step) }, color ? { color, ...style } : style)}
      {...rest}
    >
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={`dk-icon dk-icon--${icon}`} style={dotVars({ value: Math.min(1, Math.max(0, value - i)) })} />
      ))}
    </div>
  );
}

export interface DotDigitsProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text to render. Supported: 0-9 and `: . , - + % /` and space. Other characters render as space. */
  value: string | number;
  /** Dot step. Glyph size = step × 5 by step × 7. Default: 3px. */
  step?: number | string;
  /** Square dots. */
  square?: boolean;
  /** Show unlit dots faintly (LED look). */
  grid?: boolean;
  /** Accessible text. Default: the value. */
  label?: string;
}

/** Numbers drawn on a 5×7 dot matrix (clocks, counters, scores). Color follows `currentColor`. */
export function DotDigits({ value, step, square, grid, label, className, style, ...rest }: DotDigitsProps) {
  const text = String(value);
  return (
    <span
      role="img"
      aria-label={label ?? text}
      className={cx("dk-digits", square && "dk-digits--square", grid && "dk-digits--grid", className)}
      style={dotVars({ step }, style)}
      {...rest}
    >
      {[...text].map((c, i) => (
        <span key={i} className={`dk-glyph dk-glyph--${(glyphSlug as Record<string, string>)[c] ?? "space"}`} />
      ))}
    </span>
  );
}
