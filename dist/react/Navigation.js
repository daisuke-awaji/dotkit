import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cx, dotVars } from "./utils.js";
/** A list whose rows are joined to their values by a line of dots ("Chapter 1 ……… 12"). */
export function DotLeaders({ as: Tag = "ul", color, size, gap, className, style, ...rest }) {
    return _jsx(Tag, { className: cx("dk-leaders", className), style: dotVars({ color, size, gap }, style), ...rest });
}
/** One row of `<DotLeaders>`. */
export function Leader({ label, value, href, as: Tag = "li", ...rest }) {
    const cells = (_jsxs(_Fragment, { children: [_jsx("span", { children: label }), _jsx("span", { children: value })] }));
    if (href) {
        return (_jsx(Tag, { ...rest, children: _jsx("a", { className: "dk-leader", href: href, children: cells }) }));
    }
    return _jsx(Tag, { ...rest, children: cells });
}
const isItem = (x) => typeof x === "object" && x !== null && "label" in x;
/** Progress through a sequence: dot markers joined by dot lines. */
export function Steps({ items, current, vertical, className, ...rest }) {
    return (_jsx("ol", { className: cx("dk-steps", vertical && "dk-steps--vertical", className), ...rest, children: items.map((it, i) => (_jsx("li", { "aria-current": i === current ? "step" : undefined, "data-state": i < current ? "done" : undefined, children: isItem(it) ? (_jsxs(_Fragment, { children: [it.label, it.description !== undefined && _jsx("small", { children: it.description })] })) : (it) }, i))) }));
}
/** Row of tabs underlined with dots. Presentational: you own the selected state and the panels. */
export function TabList({ className, ...rest }) {
    return _jsx("div", { role: "tablist", className: cx("dk-tabs", className), ...rest });
}
/** A tab button for `<TabList>`. Roving `tabIndex` is applied (selected = 0, others = -1). */
export function Tab({ selected = false, ...rest }) {
    return _jsx("button", { type: "button", role: "tab", "aria-selected": selected, tabIndex: selected ? 0 : -1, ...rest });
}
/** Carousel / pager indicator. The current dot stretches into three dots. */
export function PaginationDots({ count, current, onSelect, itemLabel = (i) => `Slide ${i + 1}`, size, className, style, ...rest }) {
    return (_jsx("nav", { className: cx("dk-pager", className), style: dotVars({ size }, style), ...rest, children: Array.from({ length: count }, (_, i) => (_jsx("button", { type: "button", "aria-label": itemLabel(i), "aria-current": i === current ? "true" : undefined, ...(onSelect ? { onClick: () => onSelect(i) } : {}) }, i))) }));
}
