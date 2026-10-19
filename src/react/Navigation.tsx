import type { ButtonHTMLAttributes, ElementType, HTMLAttributes, ReactNode } from "react";
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

export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
  /** Step labels. Objects add a smaller description line. */
  items: Array<ReactNode | { label: ReactNode; description?: ReactNode }>;
  /** Index of the current step (0-based). Earlier steps are shown as done. */
  current: number;
  /** Stack the steps vertically. */
  vertical?: boolean;
}

const isItem = (x: unknown): x is { label: ReactNode; description?: ReactNode } =>
  typeof x === "object" && x !== null && "label" in (x as object);

/** Progress through a sequence: dot markers joined by dot lines. */
export function Steps({ items, current, vertical, className, ...rest }: StepsProps) {
  return (
    <ol className={cx("dk-steps", vertical && "dk-steps--vertical", className)} {...rest}>
      {items.map((it, i) => (
        <li key={i} aria-current={i === current ? "step" : undefined} data-state={i < current ? "done" : undefined}>
          {isItem(it) ? (
            <>
              {it.label}
              {it.description !== undefined && <small>{it.description}</small>}
            </>
          ) : (
            it
          )}
        </li>
      ))}
    </ol>
  );
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {}

/** Row of tabs underlined with dots. Presentational: you own the selected state and the panels. */
export function TabList({ className, ...rest }: TabListProps) {
  return <div role="tablist" className={cx("dk-tabs", className)} {...rest} />;
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected tab (sets `aria-selected`). */
  selected?: boolean;
}

/** A tab button for `<TabList>`. Roving `tabIndex` is applied (selected = 0, others = -1). */
export function Tab({ selected = false, ...rest }: TabProps) {
  return <button type="button" role="tab" aria-selected={selected} tabIndex={selected ? 0 : -1} {...rest} />;
}

export interface PaginationDotsProps extends Omit<HTMLAttributes<HTMLElement>, "onSelect"> {
  /** Number of pages / slides. */
  count: number;
  /** Current index (0-based). */
  current: number;
  /** Called with the index of the dot that was pressed. Omit to render static dots. */
  onSelect?: (index: number) => void;
  /** Accessible label for each dot. Default: `Slide ${i + 1}`. */
  itemLabel?: (index: number) => string;
  /** Dot diameter. Default: 8px. */
  size?: number | string;
}

/** Carousel / pager indicator. The current dot stretches into three dots. */
export function PaginationDots({ count, current, onSelect, itemLabel = (i) => `Slide ${i + 1}`, size, className, style, ...rest }: PaginationDotsProps) {
  return (
    <nav className={cx("dk-pager", className)} style={dotVars({ size }, style)} {...rest}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={itemLabel(i)}
          aria-current={i === current ? "true" : undefined}
          {...(onSelect ? { onClick: () => onSelect(i) } : {})}
        />
      ))}
    </nav>
  );
}
