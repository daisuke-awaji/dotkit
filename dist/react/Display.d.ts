import type { ElementType, HTMLAttributes } from "react";
import { type Shape } from "./utils.js";
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: "outline" | "solid";
}
export declare function Badge({ variant, className, ...rest }: BadgeProps): import("react").JSX.Element;
export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    gap?: number | string;
    size?: number | string;
    shape?: Shape;
}
/** Horizontal rule made of dots. */
export declare function Divider({ gap, size, shape, className, style, ...rest }: DividerProps): import("react").JSX.Element;
export interface MeterProps extends HTMLAttributes<HTMLDivElement> {
    /** 0 – 1. The filled part snaps to whole dots. */
    value: number;
    size?: number | string;
    gap?: number | string;
    shape?: Shape;
    /** Accessible name. */
    label?: string;
}
export declare function Meter({ value, size, gap, shape, label, className, style, ...rest }: MeterProps): import("react").JSX.Element;
export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
    data: Array<{
        label?: string;
        value: number;
    }>;
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
export declare function BarChart({ data, max, height, size, gap, shape, label, className, style, ...rest }: BarChartProps): import("react").JSX.Element;
export interface CardProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    /** Dot color of the outline. Default: `--dk-mute`. */
    color?: string;
    shape?: Shape;
}
/** Container with a dotted outline. */
export declare function Card({ as: Tag, color, shape, className, style, ...rest }: CardProps): import("react").JSX.Element;
export interface LoaderProps extends HTMLAttributes<HTMLSpanElement> {
    /** Number of dots (1 – 8). Default: 5. */
    count?: number;
    size?: number | string;
    /** Accessible label. Default: "Loading". */
    label?: string;
}
/** Dot wave loader. Stops moving under `prefers-reduced-motion`. */
export declare function Loader({ count, size, label, className, style, ...rest }: LoaderProps): import("react").JSX.Element;
