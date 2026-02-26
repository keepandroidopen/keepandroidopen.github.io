export const languages = {
  "en": { label: "English", path: "/" },
  "fr": { label: "Français", path: "/fr/" },
  "de": { label: "Deutsch", path: "/de/" },
  "ca": { label: "Català", path: "/ca/" },
  "es": { label: "Español", path: "/es/" },
  "id": { label: "Indonesia", path: "/id/" },
  "it": { label: "Italiano", path: "/it/" },
  "pl": { label: "Polski", path: "/pl/" },
  "pt-BR": { label: "Português", path: "/pt-BR/" },
  "cs": { label: "Čeština", path: "/cs/" },
  "sk": { label: "Slovenčina", path: "/sk/" },
  "ar": { label: "العربية", path: "/ar/"},
  "fa": { label: "فارسی", path: "/fa/"},
  "tr": { label: "Türkçe", path: "/tr/" },
  "tl": { label: "Tagalog", path: "/tl/" },
  "el": { label: "Ελληνικά", path: "/el/" },
  "th": { label: "ไทย", path: "/th/" },
  "ru": { label: "Русский", path: "/ru/" },
  "uk": { label: "Українська", path: "/uk/" },
  "ko": { label: "한국어", path: "/ko/" },
  "zh-CN": { label: "简体中文", path: "/zh-CN/" },
  "zh-TW": { label: "正體中文", path: "/zh-TW/" },
  "ja": { label: "日本語", path: "/ja/" },
} as const;

export type Locale = keyof typeof languages;
export const defaultLocale: Locale = "en";

const rtlLanguages = new Set(["ar", "he", "fa", "ur"]);

/** Returns true if the given language code is a right-to-left script. */
export function isRtl(lang: string): boolean {
  return rtlLanguages.has(lang.split("-")[0].toLowerCase());
}

import { marked } from "marked";

/** Render a markdown string to inline HTML (no wrapping <p> tags). */
export function markdownify(text: string): string {
  return marked.parseInline(text) as string;
}
