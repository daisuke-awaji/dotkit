import type { HTMLAttributes } from "react";
import { type IconName } from "./icon-names.js";
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
export declare function Sparkline({ data, min, max, height, size, color, area, shape, label, className, style, ...rest }: SparklineProps): import("react").JSX.Element;
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
export declare function Pictogram({ icon, value, total, step, color, label, className, style, ...rest }: PictogramProps): import("react").JSX.Element;
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
export declare function DotDigits({ value, step, square, grid, label, className, style, ...rest }: DotDigitsProps): import("react").JSX.Element;
export {};
