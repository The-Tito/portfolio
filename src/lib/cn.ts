/** Joins truthy class names. Tiny replacement for `clsx` — conditional classes are all we need. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
