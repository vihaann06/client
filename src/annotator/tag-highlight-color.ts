/**
 * Map annotation tags to highlight colors.
 *
 * If an annotation has a tag that matches a color name (or a convenience alias),
 * that tag is used to choose the highlight color. Otherwise the default
 * cluster-based styling (e.g. user vs other) is used.
 */

/** Tag names that correspond to highlight color classes (same as highlight-clusters). */
const TAG_COLOR_NAMES = [
  'yellow',
  'pink',
  'orange',
  'green',
  'purple',
  'grey',
] as const;

/** Convenience mapping: tag → color class name (for user-friendly tags). */
const TAG_ALIASES: Record<string, (typeof TAG_COLOR_NAMES)[number]> = {
  important: 'orange',
  question: 'green',
  key: 'yellow',
  highlight: 'yellow',
  note: 'purple',
  review: 'pink',
  misc: 'grey',
};

const VALID_COLORS = new Set<string>(TAG_COLOR_NAMES);

/**
 * Return a CSS class for tag-based highlight color, or undefined if no tag
 * maps to a color (caller should fall back to $cluster).
 *
 * Uses the first tag that matches a color name or alias. Color names are
 * case-insensitive.
 */
export function getHighlightClassForTags(
  tags: string[] | undefined,
): string | undefined {
  if (!tags?.length) {
    return undefined;
  }
  for (const tag of tags) {
    const normalized = tag.trim().toLowerCase();
    if (VALID_COLORS.has(normalized)) {
      return `tag-${normalized}`;
    }
    const alias = TAG_ALIASES[normalized];
    if (alias) {
      return `tag-${alias}`;
    }
  }
  return undefined;
}
