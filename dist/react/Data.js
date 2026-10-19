import { jsx as _jsx } from "react/jsx-runtime";
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
