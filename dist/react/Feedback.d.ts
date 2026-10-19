import type { HTMLAttributes } from "react";
export interface TypingProps extends HTMLAttributes<HTMLSpanElement> {
    /** Render inside a chat-bubble background. */
    bubble?: boolean;
    /** Dot diameter. Default: 6px. */
    size?: number | string;
    /** Accessible label. Default: "Typing". */
    label?: string;
}
/** Chat typing indicator (three bouncing dots). Stops under `prefers-reduced-motion`. */
export declare function Typing({ bubble, size, label, className, style, ...rest }: TypingProps): import("react").JSX.Element;
