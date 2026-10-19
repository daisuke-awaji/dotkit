import type { ReactNode } from "react";
import { useT } from "../../i18n";

export function Tile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="tile">
      {children}
      <span className="tile-label">{label}</span>
    </div>
  );
}

/** "New in vX.Y" marker next to a catalog heading. */
export function Since({ v }: { v: string }) {
  const t = useT();
  return <span className="dk-badge since" title={t(`v${v} で追加`, `Added in v${v}`)}>v{v}</span>;
}

/** Deterministic pseudo-random numbers so previews don't change between renders. */
export function rand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Contribution-like counts: quieter weekends, a few busy streaks. */
export function contributions(weeks: number, seed = 7) {
  const r = rand(seed);
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const day = i % 7;
    const weekend = day === 0 || day === 6;
    const streak = Math.sin(i / 17) > 0.55 ? 6 : 0;
    const v = r() < (weekend ? 0.55 : 0.2) ? 0 : Math.round(r() * (weekend ? 4 : 10) + streak * r());
    return v;
  });
}

export const week = [32, 48, 41, 66, 90, 58, 37];
export const sample = `${import.meta.env.BASE_URL}halftone-sample.jpg`;
