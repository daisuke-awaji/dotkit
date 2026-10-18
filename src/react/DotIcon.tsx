import type { HTMLAttributes } from "react";
import type { IconName } from "./icon-names.js";
import { cx, dotVars } from "./utils.js";

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
export function DotIcon({ name, step, square, label, className, style, ...rest }: DotIconProps) {
  return (
    <span
      className={cx("dk-icon", `dk-icon--${name}`, square && "dk-icon--square", className)}
      style={dotVars({ step }, style)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      {...rest}
    />
  );
}
