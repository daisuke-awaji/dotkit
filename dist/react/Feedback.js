import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cx, dotVars } from "./utils.js";
/** Chat typing indicator (three bouncing dots). Stops under `prefers-reduced-motion`. */
export function Typing({ bubble, size, label = "Typing", className, style, ...rest }) {
    return (_jsxs("span", { role: "status", "aria-label": label, className: cx("dk-typing", bubble && "dk-typing--bubble", className), style: dotVars({ size }, style), ...rest, children: [_jsx("i", {}), _jsx("i", {}), _jsx("i", {})] }));
}
/** Loading placeholder: a dot field with a slow shimmer. Decorative (`aria-hidden`); mark the region `aria-busy`. */
export function Skeleton({ lines, circle, width, height, className, style, ...rest }) {
    const size = { width, height, ...style };
    if (lines) {
        return (_jsx("div", { "aria-hidden": "true", className: className, style: size, ...rest, children: Array.from({ length: lines }, (_, i) => (_jsx("div", { className: "dk-skeleton dk-skeleton--text" }, i))) }));
    }
    return _jsx("div", { "aria-hidden": "true", className: cx("dk-skeleton", circle && "dk-skeleton--circle", className), style: size, ...rest });
}
/** A status dot followed by its text, e.g. <StatusDot state="ok">Operational</StatusDot>. */
export function StatusDot({ state = "ok", pulse, className, ...rest }) {
    return _jsx("span", { "data-state": state, className: cx("dk-status", pulse && "dk-status--pulse", className), ...rest });
}
/** Tinted message panel with a fading dot band. Add `role="alert"` / `role="status"` yourself when it is live. */
export function Alert({ state = "info", title, icon, children, className, ...rest }) {
    return (_jsxs("div", { "data-state": state, className: cx("dk-alert", className), ...rest, children: [(title !== undefined || icon !== undefined) && (_jsxs("p", { className: "dk-alert__title", children: [icon, title] })), children] }));
}
/** Native `<dialog>` with a dotted frame and veil. Open it with `ref.current.showModal()`. */
export const Dialog = forwardRef(function Dialog({ className, ...rest }, ref) {
    return _jsx("dialog", { ref: ref, className: cx("dk-dialog", className), ...rest });
});
