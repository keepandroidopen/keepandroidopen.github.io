/**
 * Resolves a localizable value. If the value is a plain string, returns it directly.
 * If it's an object keyed by locale, returns the value for the given locale,
 * falling back to English ('en'), then to the first available value.
 */
export function resolve(value: string | Record<string, string>, locale: string): string {
  if (typeof value === 'string') return value;
  return value[locale] ?? value['en'] ?? Object.values(value)[0] ?? '';
}
