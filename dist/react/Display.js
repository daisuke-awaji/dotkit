import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx, dotVars, shapeClass } from "./utils.js";
export function Badge({ variant = "outline", className, ...rest }) {
    return _jsx("span", { className: cx("dk-badge", variant === "solid" && "dk-badge--solid", className), ...rest });
}
/** Horizontal rule made of dots. */
export function Divider({ gap, size, shape, className, style, ...rest }) {
    return _jsx("hr", { className: cx("dk-divider", shapeClass(shape), className), style: dotVars({ gap, size }, style), ...rest });
}
export function Meter({ value, size, gap, shape, label, className, style, ...rest }) {
    const v = Math.min(1, Math.max(0, value));
    return (_jsx("div", { role: "meter", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(v * 100), "aria-label": label, className: cx("dk-meter", shapeClass(shape), className), style: dotVars({ value: v, size, gap }, style), ...rest }));
}
/** Bar chart whose bars are stacks of dots. Heights snap to whole dots. */
export function BarChart({ data, max, height, size, gap, shape, label, className, style, ...rest }) {
    const top = max ?? Math.max(1, ...data.map((d) => d.value));
    const hasLabels = data.some((d) => d.label);
    return (_jsxs("div", { role: "img", "aria-label": label, className: className, style: style, ...rest, children: [_jsx("div", { className: "dk-chart", style: height !== undefined ? { height } : undefined, children: data.map((d, i) => (_jsx("i", { className: cx("dk-bar", shapeClass(shape)), style: dotVars({ value: Math.min(1, d.value / top), size, gap }) }, i))) }), hasLabels && (_jsx("div", { className: "dk-chart dk-chart__labels", "aria-hidden": "true", style: { height: "auto", marginTop: 8 }, children: data.map((d, i) => (_jsx("span", { className: "dk-chart__label", children: d.label }, i))) }))] }));
}
/** Container with a dotted outline. */
export function Card({ as: Tag = "div", color, shape, march, className, style, ...rest }) {
    return _jsx(Tag, { className: cx("dk-card", shapeClass(shape), march && "dk-march", className), style: dotVars({ color }, style), ...rest });
}
/** Dot wave loader. Stops moving under `prefers-reduced-motion`. */
export function Loader({ count = 5, size, label = "Loading", className, style, ...rest }) {
    return (_jsx("span", { role: "status", "aria-label": label, className: cx("dk-loader", className), style: dotVars({ size }, style), ...rest, children: Array.from({ length: Math.min(8, Math.max(1, count)) }, (_, i) => (_jsx("i", {}, i))) }));
}
