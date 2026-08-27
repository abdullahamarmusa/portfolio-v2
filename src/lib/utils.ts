/**
 * Lightweight class-name merge helper.
 * Joins truthy class names into a single string.
 * (Kept dependency-free instead of installing clsx/tailwind-merge.)
 */
export function cn(
  ...classes: Array<string | number | null | undefined | false>
): string {
  return classes.filter(Boolean).join(" ");
}