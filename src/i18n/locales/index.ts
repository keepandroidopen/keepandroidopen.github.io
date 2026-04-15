/**
 * Landing page string resolver.
 *
 * Loads per-locale YAML files from src/i18n/locales/{locale}.yaml,
 * falling back to English for any missing key.
 *
 * Usage:
 *   import { getLandingStrings } from '../i18n/locales';
 *   const t = getLandingStrings('fr');
 *   t.hero_lede  // French if available, English otherwise
 */

// Eagerly import all locale YAML files via Vite's glob import (sync).
// Each module default-exports the parsed YAML object.
const modules = import.meta.glob('./*.yaml', { eager: true }) as Record<string, { default: Record<string, string> }>;

function loadLocale(locale: string): Record<string, string> {
  const key = `./${locale}.yaml`;
  return modules[key]?.default ?? {};
}

const enStrings = loadLocale('en');

/**
 * Returns a merged string map for the given locale.
 * Every key present in en.yaml is guaranteed to exist in the result;
 * locale-specific overrides take precedence.
 */
export function getLandingStrings(locale: string = 'en'): Record<string, string> {
  if (locale === 'en') return { ...enStrings };
  const raw = loadLocale(locale);
  // Filter out empty strings so they fall back to English
  const localeStrings: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (v !== '') localeStrings[k] = v;
  }
  return { ...enStrings, ...localeStrings };
}

/**
 * Returns the percentage of en.yaml keys that have been translated
 * (i.e. overridden with a non-empty, non-identical value) in the given locale.
 * Returns 100 for English.
 */
export function getTranslationPercent(locale: string): number {
  if (locale === 'en') return 100;
  const raw = loadLocale(locale);
  const totalKeys = Object.keys(enStrings).length;
  if (totalKeys === 0) return 0;
  let translated = 0;
  for (const [k, v] of Object.entries(enStrings)) {
    const localeVal = raw[k];
    // Count as translated if the locale has a non-empty value different from English
    if (localeVal && localeVal !== '' && localeVal !== v) {
      translated++;
    }
  }
  return Math.round((translated / totalKeys) * 100);
}
