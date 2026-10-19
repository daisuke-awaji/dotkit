import type { HTMLAttributes } from "react";
/**
 * Deterministic 5×5, left-right mirrored dot pattern for a string (user id, email, hash …).
 * Pure function — use it from any framework and render 25 cells yourself.
 */
export declare function identicon(seed: string): {
    cells: boolean[];
    hue: number;
};
export interface IdenticonProps extends HTMLAttributes<HTMLSpanElement> {
    /** Any string. The same value always gives the same pattern and color. */
    value: string;
    /** Cell size. Icon size ≈ cell × 6.2. Default: 8px. */
    cell?: number | string;
    /** Override the generated color. */
    color?: string;
    /** Accessible name. Without it the identicon is decorative. */
    label?: string;
}
/** Avatar placeholder generated from a string: a mirrored 5×5 dot pattern. */
export declare function Identicon({ value, cell, color, label, className, style, ...rest }: IdenticonProps): import("react").JSX.Element;
