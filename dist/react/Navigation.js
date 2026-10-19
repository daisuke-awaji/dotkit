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
