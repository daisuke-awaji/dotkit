import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "./utils.js";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Content rendered before the input (e.g. a DotIcon). */
  leading?: ReactNode;
  /** Content rendered after the input. */
  trailing?: ReactNode;
  /** Class name for the dotted wrapper. */
  fieldClassName?: string;
}

/** Text input with a dotted outline that densifies on focus. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { leading, trailing, fieldClassName, className, ...rest },
  ref,
) {
  return (
    <span className={cx("dk-field", fieldClassName)}>
      {leading}
      <input ref={ref} className={cx("dk-input", className)} {...rest} />
      {trailing}
    </span>
  );
});
