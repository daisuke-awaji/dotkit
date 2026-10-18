import { type InputHTMLAttributes, type ReactNode } from "react";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Content rendered before the input (e.g. a DotIcon). */
    leading?: ReactNode;
    /** Content rendered after the input. */
    trailing?: ReactNode;
    /** Class name for the dotted wrapper. */
    fieldClassName?: string;
}
/** Text input with a dotted outline that densifies on focus. */
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
