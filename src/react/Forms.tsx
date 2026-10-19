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
