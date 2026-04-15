import { existsSync } from 'node:fs';

/**
 * Convert ISO 3166-1 alpha-2 code to flag emoji (e.g. "US" → 🇺🇸).
 * Returns globe emoji for missing or invalid codes.
 */
export function regionFlag(code?: string): string {
  if (!code || code.length !== 2) return "\u{1F310}";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map(c => 0x1F1E6 + c.charCodeAt(0) - 65)
  );
}

/**
 * Resolve the logo path for a signatory by checking which file format
 * exists on disk, preferring SVG over PNG over GIF.
 */
export function logoPath(url: string): string {
  for (const ext of ["svg", "png", "gif"]) {
    if (existsSync(`public/img/logos/${url}.${ext}`)) {
      return `/img/logos/${url}.${ext}`;
    }
  }
  // Fallback to PNG path even if missing (will 404 but won't break layout)
  return `/img/logos/${url}.png`;
}

// Social draft URL builders for open-letter "thank" links

export function xDraftUrl(orgName: string, xUrl: string): string {
  const handle = '@' + xUrl.split('/').pop();
  const text = `Thank you ${orgName} (${handle}) for supporting Keep @AndroidDev Open @AlteredDeal #KeepAndroidOpen`;
  return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function bskyDraftUrl(orgName: string, bskyUrl: string): string {
  const handle = '@' + bskyUrl.split('/').pop();
  const text = `Thank you ${orgName} (${handle}) for supporting Keep Android Open @keepandroidopen.bsky.social #KeepAndroidOpen`;
  return `https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`;
}

export function mastodonDraftUrl(orgName: string, mastodonUrl: string): string {
  const url = new URL(mastodonUrl);
  const user = url.pathname.split('/').pop();
  const handle = `${user}@${url.hostname}`;
  const text = `Thank you ${orgName} (${handle}) for supporting Keep Android Open at https://keepandroidopen.org/open-letter/#signatories @keepandroidopen@techhub.social #KeepAndroidOpen`;
  return `https://share.joinmastodon.org/?text=${encodeURIComponent(text)}`;
}

export function linkedinDraftUrl(orgName: string, linkedinUrl: string): string {
  const text = `Thank you ${orgName} for supporting KeepAndroidOpen at at https://keepandroidopen.org/open-letter/#signatories @keepandroidopen #KeepAndroidOpen`;
  return `https://www.linkedin.com/sharing/share-offsite/?text=${encodeURIComponent(text)}`;
}
