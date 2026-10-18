import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cx, shapeClass } from "./utils.js";
/** Class names for a dotkit button — use it to style links or router components. */
export function buttonClassName({ variant = "solid", size = "md", shape } = {}, className) {
    return cx("dk-btn", `dk-btn--${variant}`, size !== "md" && `dk-btn--${size}`, shapeClass(shape), className);
}
/** Button whose surface is made of dots. Dots swell on hover. */
export const Button = forwardRef(function Button({ variant, size, shape, className, type = "button", ...rest }, ref) {
    return _jsx("button", { ref: ref, type: type, className: buttonClassName({ variant, size, shape }, className), ...rest });
});
