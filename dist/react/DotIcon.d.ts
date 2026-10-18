import type { HTMLAttributes } from "react";
import type { IconName } from "./icon-names.js";
export interface DotIconProps extends HTMLAttributes<HTMLSpanElement> {
    name: IconName;
    /** Distance between dots in the 7x7 matrix. Icon size = step * 7. Default: 3px. */
    step?: number | string;
    /** Use square dots. */
    square?: boolean;
    /** Accessible label. Without it the icon is treated as decorative. */
    label?: string;
}
/** A 7x7 dot-matrix icon. Color follows `currentColor`. */
export declare function DotIcon({ name, step, square, label, className, style, ...rest }: DotIconProps): import("react").JSX.Element;
