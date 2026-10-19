export declare const iconNames: readonly ["arrow-right", "arrow-left", "arrow-up", "arrow-down", "chevron-right", "chevron-down", "check", "close", "plus", "minus", "search", "menu", "home", "user", "mail", "heart", "star", "info", "alert", "play", "pause", "sun", "moon", "copy", "github", "external"];
export type IconName = (typeof iconNames)[number];
/** Characters available in <DotDigits> / .dk-glyph--{slug}. */
export declare const glyphChars: readonly ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ".", ",", "-", "+", "%", "/", " "];
export type GlyphChar = (typeof glyphChars)[number];
/** Character -> class-name slug (e.g. ":" -> "colon"). */
export declare const glyphSlug: Record<GlyphChar, string>;
