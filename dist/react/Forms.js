import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cx, px, withVars } from "./utils.js";
function choice(type, base, role) {
    return forwardRef(function Choice({ children, controlSize, labelClassName, className, style, ...rest }, ref) {
        const input = (_jsx("input", { ref: ref, type: type, role: role, className: cx(base, className), style: withVars({ "--dk-control": px(controlSize) }, style), ...rest }));
        if (children === undefined || children === null)
            return input;
        return (_jsxs("label", { className: cx("dk-choice", labelClassName), children: [input, _jsx("span", { children: children })] }));
    });
}
/** Native checkbox whose check mark is drawn with dots. Use a ref to set `indeterminate`. */
export const Checkbox = choice("checkbox", "dk-check");
Checkbox.displayName = "Checkbox";
/** Native radio button. The checked state is a single dot that swells. */
export const Radio = choice("radio", "dk-radio");
Radio.displayName = "Radio";
/** Native checkbox with `role="switch"`. The knob is a dot that travels. */
export const Switch = choice("checkbox", "dk-switch", "switch");
Switch.displayName = "Switch";
const num = (v, d) => (v === undefined || v === "" ? d : Number(v));
/**
 * Native range input on a dot track. The filled part is computed from `value` (or `defaultValue`),
 * so use it as a controlled input to keep the fill in sync while dragging.
 */
export const Range = forwardRef(function Range({ wrapperClassName, dotSize, gap, style, ...rest }, ref) {
    const min = num(rest.min, 0);
    const max = num(rest.max, 100);
    const raw = rest.value ?? rest.defaultValue;
    const current = raw === undefined ? (min + max) / 2 : Number(Array.isArray(raw) ? raw[0] : raw);
    const ratio = max === min ? 0 : Math.min(1, Math.max(0, (current - min) / (max - min)));
    return (_jsx("span", { className: cx("dk-range", wrapperClassName), style: withVars({ "--dk-value": ratio, "--dk-size": px(dotSize), "--dk-gap": px(gap) }, style), children: _jsx("input", { ref: ref, type: "range", ...rest }) }));
});
