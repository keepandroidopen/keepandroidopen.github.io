export const languages = {
  // English (default)
  "en": { label: "English", path: "/" },

  // Western European – Romance
  "fr": { label: "Français", path: "/fr/" },
  "es": { label: "Español", path: "/es/" },
  "ca": { label: "Català", path: "/ca/" },
  "it": { label: "Italiano", path: "/it/" },
  "pt-BR": { label: "Português", path: "/pt-BR/" },

  // Western European – Germanic & Nordic
  "de": { label: "Deutsch", path: "/de/" },
  "da": { label: "Dansk", path: "/da/" },
  "fi": { label: "Suomi", path: "/fi/" },

  // Central & Eastern European
  "pl": { label: "Polski", path: "/pl/" },
  "cs": { label: "Čeština", path: "/cs/" },
  "sk": { label: "Slovenčina", path: "/sk/" },
  "el": { label: "Ελληνικά", path: "/el/" },
  "ru": { label: "Русский", path: "/ru/" },
  "uk": { label: "Українська", path: "/uk/" },

  // Middle Eastern
  "tr": { label: "Türkçe", path: "/tr/" },
  "ar": { label: "العربية", path: "/ar/" },
  "fa": { label: "فارسی", path: "/fa/" },

  // South & Southeast Asian
  "th": { label: "ไทย", path: "/th/" },
  "id": { label: "Indonesia", path: "/id/" },
  "tl": { label: "Tagalog", path: "/tl/" },

  // CJK (East Asian)
  "zh-CN": { label: "简体中文", path: "/zh-CN/" },
  "zh-TW": { label: "正體中文", path: "/zh-TW/" },
  "ja": { label: "日本語", path: "/ja/" },
  "ko": { label: "한국어", path: "/ko/" },
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
