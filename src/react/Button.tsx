import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cx, shapeClass, type Shape } from "./utils.js";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: Shape;
}

/** Class names for a dotkit button — use it to style links or router components. */
export function buttonClassName({ variant = "solid", size = "md", shape }: ButtonStyleOptions = {}, className?: string) {
  return cx("dk-btn", `dk-btn--${variant}`, size !== "md" && `dk-btn--${size}`, shapeClass(shape), className);
}

export interface ButtonProps extends ButtonStyleOptions, ButtonHTMLAttributes<HTMLButtonElement> {}

/** Button whose surface is made of dots. Dots swell on hover. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, shape, className, type = "button", ...rest },
  ref,
) {
  return <button ref={ref} type={type} className={buttonClassName({ variant, size, shape }, className)} {...rest} />;
});
