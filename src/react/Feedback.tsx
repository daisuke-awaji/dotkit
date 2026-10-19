import type { HTMLAttributes } from "react";
import { cx, dotVars } from "./utils.js";

export interface TypingProps extends HTMLAttributes<HTMLSpanElement> {
  /** Render inside a chat-bubble background. */
  bubble?: boolean;
  /** Dot diameter. Default: 6px. */
  size?: number | string;
  /** Accessible label. Default: "Typing". */
  label?: string;
}

/** Chat typing indicator (three bouncing dots). Stops under `prefers-reduced-motion`. */
export function Typing({ bubble, size, label = "Typing", className, style, ...rest }: TypingProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cx("dk-typing", bubble && "dk-typing--bubble", className)}
      style={dotVars({ size }, style)}
      {...rest}
    >
      <i /><i /><i />
    </span>
  );
}
