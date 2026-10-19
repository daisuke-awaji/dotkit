import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx, px, withVars } from "./utils.js";

export interface ChoiceProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label content. When given, the input is wrapped in `<label class="dk-choice">`. */
  children?: ReactNode;
  /** Control height (px number or CSS length). Sets `--dk-control`. Default: 18px. */
  controlSize?: number | string;
  /** Class name for the `<label>` wrapper (only rendered with children). */
  labelClassName?: string;
}

function choice(type: "checkbox" | "radio", base: string, role?: string) {
  return forwardRef<HTMLInputElement, ChoiceProps>(function Choice(
    { children, controlSize, labelClassName, className, style, ...rest },
    ref,
  ) {
    const input = (
      <input
        ref={ref}
        type={type}
        role={role}
        className={cx(base, className)}
        style={withVars({ "--dk-control": px(controlSize) }, style)}
        {...rest}
      />
    );
    if (children === undefined || children === null) return input;
    return (
      <label className={cx("dk-choice", labelClassName)}>
        {input}
        <span>{children}</span>
      </label>
    );
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

export interface RangeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Class name for the `.dk-range` wrapper. */
  wrapperClassName?: string;
  /** Dot diameter on the track. Default: 4px. */
  dotSize?: number | string;
  /** Dot pitch on the track. Default: 8px. */
  gap?: number | string;
}

const num = (v: unknown, d: number) => (v === undefined || v === "" ? d : Number(v));

/**
 * Native range input on a dot track. The filled part is computed from `value` (or `defaultValue`),
 * so use it as a controlled input to keep the fill in sync while dragging.
 */
export const Range = forwardRef<HTMLInputElement, RangeProps>(function Range(
  { wrapperClassName, dotSize, gap, style, ...rest },
  ref,
) {
  const min = num(rest.min, 0);
  const max = num(rest.max, 100);
  const raw = rest.value ?? rest.defaultValue;
  const current = raw === undefined ? (min + max) / 2 : Number(Array.isArray(raw) ? raw[0] : raw);
  const ratio = max === min ? 0 : Math.min(1, Math.max(0, (current - min) / (max - min)));
  return (
    <span
      className={cx("dk-range", wrapperClassName)}
      style={withVars({ "--dk-value": ratio, "--dk-size": px(dotSize), "--dk-gap": px(gap) }, style)}
    >
      <input ref={ref} type="range" {...rest} />
    </span>
  );
});
