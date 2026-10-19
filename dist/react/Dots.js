import { jsx as _jsx } from "react/jsx-runtime";
import { cx, densityClass, dotVars, fadeClass, px, shapeClass, withVars } from "./utils.js";
/** A surface filled with a dot grid. */
export function Dots({ as: Tag = "div", density, shape, size, gap, color, fade, className, style, ...rest }) {
    return (_jsx(Tag, { className: cx("dk-dots", densityClass(density), shapeClass(shape), fadeClass(fade), className), style: dotVars({ size, gap, color }, style), ...rest }));
}
/** Wraps content with an outline drawn as a single row of dots. */
export function DotBorder({ as: Tag = "div", density, shape, size, gap, color, className, style, ...rest }) {
    return (_jsx(Tag, { className: cx("dk-border", densityClass(density), shapeClass(shape), className), style: dotVars({ size, gap, color }, style), ...rest }));
}
/** Text whose glyphs are filled with dots. Works with any font. */
export function DotText({ as: Tag = "span", density, shape, size, gap, color, className, style, ...rest }) {
    return (_jsx(Tag, { className: cx("dk-text", densityClass(density), shapeClass(shape), className), style: dotVars({ size, gap, color }, style), ...rest }));
}
/** Decorative halftone: tone is expressed by dot size. Do not put content inside. */
export function Halftone({ direction = "to-right", gap, tone, invert, className, style, ...rest }) {
    return (_jsx("div", { "aria-hidden": "true", className: cx("dk-halftone", direction !== "to-right" && `dk-halftone--${direction}`, invert && "dk-halftone--invert", className), style: dotVars({ gap, tone }, style), ...rest }));
}
/** Renders an image as newspaper-style halftone dots (CSS only). */
export function HalftoneImage({ src, alt, gap, toneFilter, invert, imgProps, children, className, style, ...rest }) {
    return (_jsx("div", { className: cx("dk-halftone-img", invert && "dk-halftone-img--invert", className), style: withVars({ "--dk-gap": px(gap), "--dk-tone-filter": toneFilter }, style), ...rest, children: children ?? _jsx("img", { src: src, alt: alt ?? "", ...imgProps }) }));
}
