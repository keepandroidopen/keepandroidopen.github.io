/** Which self-hosted font bundle to load for a locale. */
export type FontProfile = 'latin' | 'arabic' | 'hebrew' | 'cjk' | 'indic';

const CJK = new Set(['zh-cn', 'zh-tw', 'ja', 'ko']);
const INDIC = new Set(['th', 'hi', 'bn']);

export function getFontProfile(lang: string): FontProfile {
  const code = lang.toLowerCase();
  const base = code.split('-')[0];

  if (base === 'ar' || base === 'fa') return 'arabic';
  if (base === 'he') return 'hebrew';
  if (CJK.has(code) || base === 'zh' || base === 'ja' || base === 'ko') return 'cjk';
  if (INDIC.has(base)) return 'indic';
  return 'latin';
}
