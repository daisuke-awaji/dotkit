import { type ButtonHTMLAttributes } from "react";
import { type Shape } from "./utils.js";
export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export interface ButtonStyleOptions {
    variant?: ButtonVariant;
    size?: ButtonSize;
    shape?: Shape;
}
/** Class names for a dotkit button — use it to style links or router components. */
export declare function buttonClassName({ variant, size, shape }?: ButtonStyleOptions, className?: string): string;
export interface ButtonProps extends ButtonStyleOptions, ButtonHTMLAttributes<HTMLButtonElement> {
}
/** Button whose surface is made of dots. Dots swell on hover. */
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
