import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cx, dotVars } from "./utils.js";

export interface DotLeadersProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Default: `ul`. */
  as?: ElementType;
  /** Leader dot color. Default: `--dk-mute`. */
  color?: string;
  size?: number | string;
  gap?: number | string;
}

/** A list whose rows are joined to their values by a line of dots ("Chapter 1 ……… 12"). */
export function DotLeaders({ as: Tag = "ul", color, size, gap, className, style, ...rest }: DotLeadersProps) {
  return <Tag className={cx("dk-leaders", className)} style={dotVars({ color, size, gap }, style)} {...rest} />;
}

export interface LeaderProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  label: ReactNode;
  value: ReactNode;
  /** Renders the row as a link. */
  href?: string;
  /** Row element. Default: `li`. */
  as?: ElementType;
}

/** One row of `<DotLeaders>`. */
export function Leader({ label, value, href, as: Tag = "li", ...rest }: LeaderProps) {
  const cells = (
    <>
      <span>{label}</span>
      <span>{value}</span>
    </>
  );
  if (href) {
    return (
      <Tag {...rest}>
        <a className="dk-leader" href={href}>{cells}</a>
      </Tag>
    );
  }
  return <Tag {...rest}>{cells}</Tag>;
}
