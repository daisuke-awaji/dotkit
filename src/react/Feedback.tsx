import { forwardRef, type DialogHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
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

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Render N text-line placeholders (the last one shorter). */
  lines?: number;
  /** Circle placeholder (avatar). */
  circle?: boolean;
  width?: number | string;
  height?: number | string;
}

/** Loading placeholder: a dot field with a slow shimmer. Decorative (`aria-hidden`); mark the region `aria-busy`. */
export function Skeleton({ lines, circle, width, height, className, style, ...rest }: SkeletonProps) {
  const size = { width, height, ...style };
  if (lines) {
    return (
      <div aria-hidden="true" className={className} style={size} {...rest}>
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className="dk-skeleton dk-skeleton--text" />
        ))}
      </div>
    );
  }
  return <div aria-hidden="true" className={cx("dk-skeleton", circle && "dk-skeleton--circle", className)} style={size} {...rest} />;
}

export type StatusState = "ok" | "warn" | "down" | "info" | "idle";

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  /** Default: `"ok"`. `down` is a square dot, `idle` a ring, so the state is not conveyed by color alone. */
  state?: StatusState;
  /** Ripple animation (stops under `prefers-reduced-motion`). */
  pulse?: boolean;
}

/** A status dot followed by its text, e.g. <StatusDot state="ok">Operational</StatusDot>. */
export function StatusDot({ state = "ok", pulse, className, ...rest }: StatusDotProps) {
  return <span data-state={state} className={cx("dk-status", pulse && "dk-status--pulse", className)} {...rest} />;
}

export type AlertState = "info" | "ok" | "warn" | "danger";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Default: `"info"`. `danger` uses square dots. */
  state?: AlertState;
  /** Bold first line. */
  title?: ReactNode;
  /** Rendered before the title (e.g. a DotIcon). */
  icon?: ReactNode;
}

/** Tinted message panel with a fading dot band. Add `role="alert"` / `role="status"` yourself when it is live. */
export function Alert({ state = "info", title, icon, children, className, ...rest }: AlertProps) {
  return (
    <div data-state={state} className={cx("dk-alert", className)} {...rest}>
      {(title !== undefined || icon !== undefined) && (
        <p className="dk-alert__title">
          {icon}
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

export interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {}

/** Native `<dialog>` with a dotted frame and veil. Open it with `ref.current.showModal()`. */
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(function Dialog({ className, ...rest }, ref) {
  return <dialog ref={ref} className={cx("dk-dialog", className)} {...rest} />;
});
