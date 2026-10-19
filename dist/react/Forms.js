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
