import type { ButtonHTMLAttributes, ElementType, HTMLAttributes, ReactNode } from "react";
export interface DotLeadersProps extends HTMLAttributes<HTMLElement> {
    /** Element to render. Default: `ul`. */
    as?: ElementType;
    /** Leader dot color. Default: `--dk-mute`. */
    color?: string;
    size?: number | string;
    gap?: number | string;
}
/** A list whose rows are joined to their values by a line of dots ("Chapter 1 ……… 12"). */
export declare function DotLeaders({ as: Tag, color, size, gap, className, style, ...rest }: DotLeadersProps): import("react").JSX.Element;
export interface LeaderProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    label: ReactNode;
    value: ReactNode;
    /** Renders the row as a link. */
    href?: string;
    /** Row element. Default: `li`. */
    as?: ElementType;
}
/** One row of `<DotLeaders>`. */
export declare function Leader({ label, value, href, as: Tag, ...rest }: LeaderProps): import("react").JSX.Element;
export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
    /** Step labels. Objects add a smaller description line. */
    items: Array<ReactNode | {
        label: ReactNode;
        description?: ReactNode;
    }>;
    /** Index of the current step (0-based). Earlier steps are shown as done. */
    current: number;
    /** Stack the steps vertically. */
    vertical?: boolean;
}
/** Progress through a sequence: dot markers joined by dot lines. */
export declare function Steps({ items, current, vertical, className, ...rest }: StepsProps): import("react").JSX.Element;
export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
}
/** Row of tabs underlined with dots. Presentational: you own the selected state and the panels. */
export declare function TabList({ className, ...rest }: TabListProps): import("react").JSX.Element;
export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Selected tab (sets `aria-selected`). */
    selected?: boolean;
}
/** A tab button for `<TabList>`. Roving `tabIndex` is applied (selected = 0, others = -1). */
export declare function Tab({ selected, ...rest }: TabProps): import("react").JSX.Element;
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
export declare function PaginationDots({ count, current, onSelect, itemLabel, size, className, style, ...rest }: PaginationDotsProps): import("react").JSX.Element;
