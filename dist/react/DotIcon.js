import { jsx as _jsx } from "react/jsx-runtime";
import { cx, dotVars } from "./utils.js";
/** A 7x7 dot-matrix icon. Color follows `currentColor`. */
export function DotIcon({ name, step, square, label, className, style, ...rest }) {
    return (_jsx("span", { className: cx("dk-icon", `dk-icon--${name}`, square && "dk-icon--square", className), style: dotVars({ step }, style), ...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true }), ...rest }));
}
