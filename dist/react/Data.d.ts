import type { HTMLAttributes } from "react";
import { type Shape } from "./utils.js";
type Datum = number | {
    value: number;
    label?: string;
};
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
export declare function Heatmap({ data, max, rows, cell, color, encode, shape, label, className, style, ...rest }: HeatmapProps): import("react").JSX.Element;
export type UptimeState = "ok" | "warn" | "down" | "none";
export interface UptimeBarProps extends HTMLAttributes<HTMLDivElement> {
    /** One entry per period (e.g. day), oldest first. */
    data: Array<UptimeState | {
        state: UptimeState;
        label?: string;
    }>;
    /** Dots per column (height). Default: 5. */
    rows?: number;
    size?: number | string;
    gap?: number | string;
    shape?: Shape;
    /** Accessible summary, e.g. "99.92% uptime over 90 days". */
    label?: string;
}
/** Status-page uptime bar. Each period is a column of dots; state drives color and height. */
export declare function UptimeBar({ data, rows, size, gap, shape, label, className, style, ...rest }: UptimeBarProps): import("react").JSX.Element;
export {};
