import type { ElementType, HTMLAttributes, ImgHTMLAttributes } from "react";
import { cx, densityClass, dotVars, fadeClass, px, shapeClass, withVars, type DotStyleProps, type Fade } from "./utils.js";

export interface DotsProps extends DotStyleProps, HTMLAttributes<HTMLElement> {
  /** Fade the field out towards a direction using a mask. */
  fade?: Fade;
  /** Element to render. Default: `div`. */
  as?: ElementType;
}

/** A surface filled with a dot grid. */
export function Dots({ as: Tag = "div", density, shape, size, gap, color, fade, className, style, ...rest }: DotsProps) {
  return (
    <Tag
      className={cx("dk-dots", densityClass(density), shapeClass(shape), fadeClass(fade), className)}
      style={dotVars({ size, gap, color }, style)}
      {...rest}
    />
  );
}

export interface DotBorderProps extends DotStyleProps, HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Make the outline's dots travel clockwise (stops under `prefers-reduced-motion`). */
  march?: boolean;
}

/** Wraps content with an outline drawn as a single row of dots. */
export function DotBorder({ as: Tag = "div", density, shape, size, gap, color, march, className, style, ...rest }: DotBorderProps) {
  return (
    <Tag
      className={cx("dk-border", densityClass(density), shapeClass(shape), march && "dk-march", className)}
      style={dotVars({ size, gap, color }, style)}
      {...rest}
    />
  );
}

export interface DotTextProps extends DotStyleProps, HTMLAttributes<HTMLElement> {
  /** Element to render. Default: `span`. */
  as?: ElementType;
}

/** Text whose glyphs are filled with dots. Works with any font. */
export function DotText({ as: Tag = "span", density, shape, size, gap, color, className, style, ...rest }: DotTextProps) {
  return (
    <Tag
      className={cx("dk-text", densityClass(density), shapeClass(shape), className)}
      style={dotVars({ size, gap, color }, style)}
      {...rest}
    />
  );
}

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
export function Halftone({ direction = "to-right", gap, tone, invert, className, style, ...rest }: HalftoneProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "dk-halftone",
        direction !== "to-right" && `dk-halftone--${direction}`,
        invert && "dk-halftone--invert",
        className,
      )}
      style={dotVars({ gap, tone }, style)}
      {...rest}
    />
  );
}

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
export function HalftoneImage({ src, alt, gap, toneFilter, invert, imgProps, children, className, style, ...rest }: HalftoneImageProps) {
  return (
    <div
      className={cx("dk-halftone-img", invert && "dk-halftone-img--invert", className)}
      style={withVars({ "--dk-gap": px(gap), "--dk-tone-filter": toneFilter }, style)}
      {...rest}
    >
      {children ?? <img src={src} alt={alt ?? ""} {...imgProps} />}
    </div>
  );
}

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
export function HalftoneText({ as: Tag = "span", direction = "to-bottom", gap, tone, className, style, ...rest }: HalftoneTextProps) {
  return (
    <Tag
      className={cx("dk-text-halftone", direction !== "to-bottom" && `dk-text-halftone--${direction}`, className)}
      style={dotVars({ gap, tone }, style)}
      {...rest}
    />
  );
}

export type PatternKind = "dots" | "checker" | "stripes" | "grid" | "diagonal" | "cross" | "stipple";

export interface PatternProps extends DotStyleProps, HTMLAttributes<HTMLElement> {
  /** Arrangement of the dots. Default: `"dots"`. */
  kind?: PatternKind;
  as?: ElementType;
}

/** A surface filled with a dot pattern (checker, stripes, grid, diagonal, cross, stipple). */
export function Pattern({ kind = "dots", as: Tag = "div", density, shape, size, gap, color, className, style, ...rest }: PatternProps) {
  return (
    <Tag
      className={cx("dk-pattern", kind !== "dots" && `dk-pattern--${kind}`, densityClass(density), shapeClass(shape), className)}
      style={dotVars({ size, gap, color }, style)}
      {...rest}
    />
  );
}

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
export function Duotone({ color2, ramp, angle, as: Tag = "div", density, shape, size, gap, color, className, style, ...rest }: DuotoneProps) {
  return (
    <Tag
      className={cx("dk-duotone", ramp && "dk-duotone--ramp", densityClass(density), shapeClass(shape), className)}
      style={withVars({ "--dk-color-2": color2, "--dk-angle": angle }, dotVars({ size, gap, color }, style))}
      {...rest}
    />
  );
}
