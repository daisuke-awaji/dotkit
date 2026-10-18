import type { CSSProperties } from "react";
/** Joins truthy class names. */
export declare function cx(...parts: Array<string | false | null | undefined>): string;
type Px = number | string | undefined;
/** Builds the dotkit CSS variables, skipping undefined values. */
export declare function dotVars(vars: {
    size?: Px;
    gap?: Px;
    color?: string;
    value?: number;
    step?: Px;
    tone?: string;
}, style?: CSSProperties): CSSProperties;
export type Density = "sparse" | "normal" | "dense";
export type Shape = "round" | "square" | "ring";
export type Fade = "r" | "l" | "t" | "b" | "radial";
export declare const densityClass: (d?: Density) => string | undefined;
export declare const shapeClass: (s?: Shape) => string | undefined;
export declare const fadeClass: (f?: Fade) => string | undefined;
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
export {};
