import type { ElementType, HTMLAttributes, ImgHTMLAttributes } from "react";
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
    /** Make the outline's dots travel clockwise (stops under `prefers-reduced-motion`). */
    march?: boolean;
}
/** Wraps content with an outline drawn as a single row of dots. */
export declare function DotBorder({ as: Tag, density, shape, size, gap, color, march, className, style, ...rest }: DotBorderProps): import("react").JSX.Element;
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
export interface HalftoneImageProps extends HTMLAttributes<HTMLDivElement> {
    /** Image URL. Alternatively pass an `<img>` / `<picture>` / `<video>` / `<canvas>` as children. */
    src?: string;
    /** Alternative text of the image. Required when `src` is used (pass `""` if decorative). */
    alt?: string;
    /** Halftone cell size. Default: 6px. */
    gap?: number | string;
    /** CSS filter applied to the image before thresholding. Default: `grayscale(1) contrast(1.4) brightness(.75)`. */
    toneFilter?: string;
    /** White dots on black. Automatic inside `.dk-theme-dark`. */
    invert?: boolean;
    /** Extra props for the generated `<img>`. */
    imgProps?: ImgHTMLAttributes<HTMLImageElement>;
}
/** Renders an image as newspaper-style halftone dots (CSS only). */
export declare function HalftoneImage({ src, alt, gap, toneFilter, invert, imgProps, children, className, style, ...rest }: HalftoneImageProps): import("react").JSX.Element;
export interface HalftoneTextProps extends HTMLAttributes<HTMLElement> {
    /** Element to render. Default: `span`. */
    as?: ElementType;
    /** Direction of the tone ramp. Default: `to-bottom`. */
    direction?: "to-bottom" | "to-right" | "radial";
    /** Halftone cell size. Default: 6px. */
    gap?: number | string;
    /** Custom tone ramp (black = biggest dot). Overrides `direction`. */
    tone?: string;
}
/** Large display text printed as halftone dots. Still real, selectable text. */
export declare function HalftoneText({ as: Tag, direction, gap, tone, className, style, ...rest }: HalftoneTextProps): import("react").JSX.Element;
export type PatternKind = "dots" | "checker" | "stripes" | "grid" | "diagonal" | "cross" | "stipple";
export interface PatternProps extends DotStyleProps, HTMLAttributes<HTMLElement> {
    /** Arrangement of the dots. Default: `"dots"`. */
    kind?: PatternKind;
    as?: ElementType;
}
/** A surface filled with a dot pattern (checker, stripes, grid, diagonal, cross, stipple). */
export declare function Pattern({ kind, as: Tag, density, shape, size, gap, color, className, style, ...rest }: PatternProps): import("react").JSX.Element;
export interface DuotoneProps extends DotStyleProps, HTMLAttributes<HTMLElement> {
    /** Second dot color. Default: `--dk-mute`. */
    color2?: string;
    /** Instead of interleaving, show one gradient from `color` to `color2` through the dots. */
    ramp?: boolean;
    /** Gradient angle for `ramp`. Default: 90deg. */
    angle?: string;
    as?: ElementType;
}
/** Two-color dot field: interleaved dots, or a gradient seen through the dots (`ramp`). */
export declare function Duotone({ color2, ramp, angle, as: Tag, density, shape, size, gap, color, className, style, ...rest }: DuotoneProps): import("react").JSX.Element;
