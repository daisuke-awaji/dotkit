import type { ElementType, HTMLAttributes } from "react";
import { cx, dotVars, shapeClass, type Shape } from "./utils.js";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "solid";
}

export function Badge({ variant = "outline", className, ...rest }: BadgeProps) {
  return <span className={cx("dk-badge", variant === "solid" && "dk-badge--solid", className)} {...rest} />;
}

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  gap?: number | string;
  size?: number | string;
  shape?: Shape;
}

/** Horizontal rule made of dots. */
export function Divider({ gap, size, shape, className, style, ...rest }: DividerProps) {
  return <hr className={cx("dk-divider", shapeClass(shape), className)} style={dotVars({ gap, size }, style)} {...rest} />;
}

export interface MeterProps extends HTMLAttributes<HTMLDivElement> {
  /** 0 – 1. The filled part snaps to whole dots. */
  value: number;
  size?: number | string;
  gap?: number | string;
  shape?: Shape;
  /** Accessible name. */
  label?: string;
}

export function Meter({ value, size, gap, shape, label, className, style, ...rest }: MeterProps) {
  const v = Math.min(1, Math.max(0, value));
  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      aria-label={label}
      className={cx("dk-meter", shapeClass(shape), className)}
      style={dotVars({ value: v, size, gap }, style)}
      {...rest}
    />
  );
}

export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  data: Array<{ label?: string; value: number }>;
  /** Value mapped to full height. Default: max of data. */
  max?: number;
  /** Chart height. Default: 120px. */
  height?: number | string;
  size?: number | string;
  gap?: number | string;
  shape?: Shape;
  /** Accessible summary of the chart. */
  label?: string;
}

/** Bar chart whose bars are stacks of dots. Heights snap to whole dots. */
export function BarChart({ data, max, height, size, gap, shape, label, className, style, ...rest }: BarChartProps) {
  const top = max ?? Math.max(1, ...data.map((d) => d.value));
  const hasLabels = data.some((d) => d.label);
  return (
    <div role="img" aria-label={label} className={className} style={style} {...rest}>
      <div className="dk-chart" style={height !== undefined ? { height } : undefined}>
        {data.map((d, i) => (
          <i
            key={i}
            className={cx("dk-bar", shapeClass(shape))}
            style={dotVars({ value: Math.min(1, d.value / top), size, gap })}
          />
        ))}
      </div>
      {hasLabels && (
        <div className="dk-chart dk-chart__labels" aria-hidden="true" style={{ height: "auto", marginTop: 8 }}>
          {data.map((d, i) => (
            <span key={i} className="dk-chart__label">{d.label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Dot color of the outline. Default: `--dk-mute`. */
  color?: string;
  shape?: Shape;
  /** Make the outline's dots travel clockwise (stops under `prefers-reduced-motion`). */
  march?: boolean;
}

/** Container with a dotted outline. */
export function Card({ as: Tag = "div", color, shape, march, className, style, ...rest }: CardProps) {
  return <Tag className={cx("dk-card", shapeClass(shape), march && "dk-march", className)} style={dotVars({ color }, style)} {...rest} />;
}

export interface LoaderProps extends HTMLAttributes<HTMLSpanElement> {
  /** Number of dots (1 – 8). Default: 5. */
  count?: number;
  size?: number | string;
  /** Accessible label. Default: "Loading". */
  label?: string;
}

/** Dot wave loader. Stops moving under `prefers-reduced-motion`. */
export function Loader({ count = 5, size, label = "Loading", className, style, ...rest }: LoaderProps) {
  return (
    <span role="status" aria-label={label} className={cx("dk-loader", className)} style={dotVars({ size }, style)} {...rest}>
      {Array.from({ length: Math.min(8, Math.max(1, count)) }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}
