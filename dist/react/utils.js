/** Joins truthy class names. */
export function cx(...parts) {
    return parts.filter(Boolean).join(" ");
}
const px = (v) => (typeof v === "number" ? `${v}px` : v);
/** Builds the dotkit CSS variables, skipping undefined values. */
export function dotVars(vars, style) {
    const out = {};
    if (vars.size !== undefined)
        out["--dk-size"] = px(vars.size);
    if (vars.gap !== undefined)
        out["--dk-gap"] = px(vars.gap);
    if (vars.color !== undefined)
        out["--dk-color"] = vars.color;
    if (vars.value !== undefined)
        out["--dk-value"] = vars.value;
    if (vars.step !== undefined)
        out["--dk-icon-step"] = px(vars.step);
    if (vars.tone !== undefined)
        out["--dk-tone"] = vars.tone;
    return { ...out, ...style };
}
export const densityClass = (d) => d && `dk-${d}`;
export const shapeClass = (s) => (s && s !== "round" ? `dk-${s}` : undefined);
export const fadeClass = (f) => f && `dk-fade-${f}`;
