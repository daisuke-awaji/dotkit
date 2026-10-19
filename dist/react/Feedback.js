import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx, dotVars } from "./utils.js";
/** Chat typing indicator (three bouncing dots). Stops under `prefers-reduced-motion`. */
export function Typing({ bubble, size, label = "Typing", className, style, ...rest }) {
    return (_jsxs("span", { role: "status", "aria-label": label, className: cx("dk-typing", bubble && "dk-typing--bubble", className), style: dotVars({ size }, style), ...rest, children: [_jsx("i", {}), _jsx("i", {}), _jsx("i", {})] }));
}
