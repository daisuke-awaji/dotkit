import { jsx as _jsx } from "react/jsx-runtime";
import { glyphSlug } from "./icon-names.js";
import { cx, dotVars, px, shapeClass, withVars } from "./utils.js";
const valueOf = (d) => (typeof d === "number" ? d : d.value);
const labelOf = (d) => (typeof d === "number" ? undefined : d.label);
/** Contribution-style heatmap: one dot per cell; the value drives size and/or tone. */
export function Heatmap({ data, max, rows, cell, color, encode = "both", shape, label, className, style, ...rest }) {
    const top = max ?? Math.max(1e-9, ...data.map(valueOf));
    return (_jsx("div", { role: "img", "aria-label": label, className: cx("dk-heatmap", encode !== "both" && `dk-heatmap--${encode}`, shapeClass(shape), className), style: withVars({ "--dk-rows": rows, "--dk-cell": px(cell), "--dk-color": color }, style), ...rest, children: data.map((d, i) => (_jsx("i", { title: labelOf(d), style: dotVars({ value: Math.min(1, Math.max(0, valueOf(d) / top)) }) }, i))) }));
}
/** Status-page uptime bar. Each period is a column of dots; state drives color and height. */
export function UptimeBar({ data, rows, size, gap, shape, label, className, style, ...rest }) {
    return (_jsx("div", { role: "img", "aria-label": label, className: cx("dk-uptime", shapeClass(shape), className), style: withVars({ "--dk-rows": rows }, dotVars({ size, gap }, style)), ...rest, children: data.map((d, i) => {
            const s = typeof d === "string" ? d : d.state;
            return _jsx("i", { "data-state": s, title: typeof d === "string" ? undefined : d.label }, i);
        }) }));
}
/** Sparkline drawn as one dot per value. The latest value gets a halo. */
export function Sparkline({ data, min, max, height, size, color, area, shape, label, className, style, ...rest }) {
    const lo = min ?? Math.min(...data);
    const hi = max ?? Math.max(...data);
    const span = hi - lo || 1;
    return (_jsx("div", { role: "img", "aria-label": label, className: cx("dk-spark", area && "dk-spark--area", shapeClass(shape), className), style: dotVars({ size, color }, { height, ...style }), ...rest, children: data.map((v, i) => (_jsx("i", { style: dotVars({ value: Math.min(1, Math.max(0, (v - lo) / span)) }) }, i))) }));
}
/** Isotype chart: each icon is one unit, the remainder is shown faintly. */
export function Pictogram({ icon, value, total = 10, step, color, label, className, style, ...rest }) {
    return (_jsx("div", { role: "img", "aria-label": label, className: cx("dk-pictogram", className), style: withVars({ "--dk-icon-step": px(step) }, color ? { color, ...style } : style), ...rest, children: Array.from({ length: total }, (_, i) => (_jsx("span", { className: `dk-icon dk-icon--${icon}`, style: dotVars({ value: Math.min(1, Math.max(0, value - i)) }) }, i))) }));
}
/** Numbers drawn on a 5×7 dot matrix (clocks, counters, scores). Color follows `currentColor`. */
export function DotDigits({ value, step, square, grid, label, className, style, ...rest }) {
    const text = String(value);
    return (_jsx("span", { role: "img", "aria-label": label ?? text, className: cx("dk-digits", square && "dk-digits--square", grid && "dk-digits--grid", className), style: dotVars({ step }, style), ...rest, children: [...text].map((c, i) => (_jsx("span", { className: `dk-glyph dk-glyph--${glyphSlug[c] ?? "space"}` }, i))) }));
}
