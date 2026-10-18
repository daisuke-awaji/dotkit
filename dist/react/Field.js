import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cx } from "./utils.js";
/** Text input with a dotted outline that densifies on focus. */
export const Input = forwardRef(function Input({ leading, trailing, fieldClassName, className, ...rest }, ref) {
    return (_jsxs("span", { className: cx("dk-field", fieldClassName), children: [leading, _jsx("input", { ref: ref, className: cx("dk-input", className), ...rest }), trailing] }));
});
