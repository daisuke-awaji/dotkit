import type { ElementType, HTMLAttributes } from "react";
import { type DotStyleProps, type Fade } from "./utils.js";
export interface DotsProps extends DotStyleProps, HTMLAttributes<HTMLElement> {
    /** Fade the field out towards a direction using a mask. */
    fade?: Fade;
    /** Element to render. Default: `div`. */
    as?: ElementType;
}
/** A surface filled with a dot grid. */
export declare function Dots({ as: Tag, density, shape, size, gap, color, fade, className, style, ...rest }: DotsProps): import("react").JSX.Element;
export interface DotBorderProps extends DotStyleProps, HTMLAttributes<HTMLElement> {
    as?: ElementType;
}
/** Wraps content with an outline drawn as a single row of dots. */
export declare function DotBorder({ as: Tag, density, shape, size, gap, color, className, style, ...rest }: DotBorderProps): import("react").JSX.Element;
export interface DotTextProps extends DotStyleProps, HTMLAttributes<HTMLElement> {
    /** Element to render. Default: `span`. */
    as?: ElementType;
}
/** Text whose glyphs are filled with dots. Works with any font. */
export declare function DotText({ as: Tag, density, shape, size, gap, color, className, style, ...rest }: DotTextProps): import("react").JSX.Element;
export interface HalftoneProps extends HTMLAttributes<HTMLDivElement> {
    /** Direction of the tone ramp. Default: `to-right`. */
    direction?: "to-right" | "to-left" | "to-bottom" | "radial";
    /** Cell size of the halftone grid. Default: 8px. */
    gap?: number | string;
    /** Custom tone ramp (black = biggest dots, ~#8a8a8a = none). Overrides `direction`. */
    tone?: string;
    /** Render white dots on black. Automatic inside `.dk-theme-dark`. */
    invert?: boolean;
}
/** Decorative halftone: tone is expressed by dot size. Do not put content inside. */
export declare function Halftone({ direction, gap, tone, invert, className, style, ...rest }: HalftoneProps): import("react").JSX.Element;
