export const languages = {
  en: { label: 'English', path: '/' },
  fr: { label: 'Français', path: '/fr/' },
  de: { label: 'Deutsch', path: '/de/' },
  es: { label: 'Español', path: '/es/' },
  id: { label: 'Indonesia', path: '/id/' },
  it: { label: 'Italiano', path: '/it/' },
  'pt-BR': { label: 'Português', path: '/pt-BR/' },
  cs: { label: 'Čeština', path: '/cs/' },
  sk: { label: 'Slovenčina', path: '/sk/' },
  th: { label: 'ไทย', path: '/th/' },
  tr: { label: 'Türkçe', path: '/tr/' },
  uk: { label: 'Українська', path: '/uk/' },
  'zh-CN': { label: '简体中文', path: '/zh-CN/' },
  'zh-TW': { label: '正體中文', path: '/zh-TW/' },
  ko: { label: '한국어', path: '/ko/' },
  el: { label: 'Ελληνικά', path: '/el/'},
  pl: { label: 'Polski', path: '/pl/'},    
} as const;

export type Locale = keyof typeof languages;
export const defaultLocale: Locale = 'en';

import { marked } from 'marked';

/** Render a markdown string to inline HTML (no wrapping <p> tags). */
export function markdownify(text: string): string {
  return marked.parseInline(text) as string;
}
