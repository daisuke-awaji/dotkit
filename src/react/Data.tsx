import type { HTMLAttributes } from "react";
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
