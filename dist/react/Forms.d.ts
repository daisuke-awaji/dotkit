import { type InputHTMLAttributes, type ReactNode } from "react";
export interface ChoiceProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    /** Label content. When given, the input is wrapped in `<label class="dk-choice">`. */
    children?: ReactNode;
    /** Control height (px number or CSS length). Sets `--dk-control`. Default: 18px. */
    controlSize?: number | string;
    /** Class name for the `<label>` wrapper (only rendered with children). */
    labelClassName?: string;
}
/** Native checkbox whose check mark is drawn with dots. Use a ref to set `indeterminate`. */
export declare const Checkbox: import("react").ForwardRefExoticComponent<ChoiceProps & import("react").RefAttributes<HTMLInputElement>>;
/** Native radio button. The checked state is a single dot that swells. */
export declare const Radio: import("react").ForwardRefExoticComponent<ChoiceProps & import("react").RefAttributes<HTMLInputElement>>;
/** Native checkbox with `role="switch"`. The knob is a dot that travels. */
export declare const Switch: import("react").ForwardRefExoticComponent<ChoiceProps & import("react").RefAttributes<HTMLInputElement>>;
export interface RangeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    /** Class name for the `.dk-range` wrapper. */
    wrapperClassName?: string;
    /** Dot diameter on the track. Default: 4px. */
    dotSize?: number | string;
    /** Dot pitch on the track. Default: 8px. */
    gap?: number | string;
}
/**
 * Native range input on a dot track. The filled part is computed from `value` (or `defaultValue`),
 * so use it as a controlled input to keep the fill in sync while dragging.
 */
export declare const Range: import("react").ForwardRefExoticComponent<RangeProps & import("react").RefAttributes<HTMLInputElement>>;
