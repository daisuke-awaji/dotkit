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
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    /** Render N text-line placeholders (the last one shorter). */
    lines?: number;
    /** Circle placeholder (avatar). */
    circle?: boolean;
    width?: number | string;
    height?: number | string;
}
/** Loading placeholder: a dot field with a slow shimmer. Decorative (`aria-hidden`); mark the region `aria-busy`. */
export declare function Skeleton({ lines, circle, width, height, className, style, ...rest }: SkeletonProps): import("react").JSX.Element;
export type StatusState = "ok" | "warn" | "down" | "info" | "idle";
export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
    /** Default: `"ok"`. `down` is a square dot, `idle` a ring, so the state is not conveyed by color alone. */
    state?: StatusState;
    /** Ripple animation (stops under `prefers-reduced-motion`). */
    pulse?: boolean;
}
/** A status dot followed by its text, e.g. <StatusDot state="ok">Operational</StatusDot>. */
export declare function StatusDot({ state, pulse, className, ...rest }: StatusDotProps): import("react").JSX.Element;
