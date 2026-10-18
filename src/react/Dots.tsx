import type { ElementType, HTMLAttributes } from "react";
import { cx, densityClass, dotVars, fadeClass, shapeClass, type DotStyleProps, type Fade } from "./utils.js";

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
}

/** Wraps content with an outline drawn as a single row of dots. */
export function DotBorder({ as: Tag = "div", density, shape, size, gap, color, className, style, ...rest }: DotBorderProps) {
  return (
    <Tag
      className={cx("dk-border", densityClass(density), shapeClass(shape), className)}
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
