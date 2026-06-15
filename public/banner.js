/**
 * Keep Android Open – Countdown Banner
 * Licensed under the GNU General Public License v3.0
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * A self-contained, embeddable script that injects a countdown banner into any
 * web page. No external dependencies.
 *
 * Usage:
 *   <script src="https://keepandroidopen.org/banner.js"></script>
 *
 * Query parameters (appended to the script src URL):
 *   lang=fr        Override the browser language (default: auto-detected)
 *   id=myDiv       Insert the banner inside the element with this id
 *                  (default: prepend to <body>)
 *   size=normal    Banner size: "normal" (default), "mini" or "minimal"
 *   link=URL       Make the banner text a link (default: https://keepandroidopen.org)
 *                  Set link=none to disable the link
 *   hidebutton=on  Show an X close button (default: on)
 *                  Set hidebutton=off to hide the close button
 *   animation=on   Add animation to the banner (default: on)
 *                  Set animation=off to disable
 *   theme=auto     Color theme: "auto" (default), "light", or "dark"
 *   style=modern   Visual style: "modern" (default) or "classic"
 *                  classic = the pre-2026 bold all-caps red design
 */
(function () {
  "use strict";

  // ── Localized banner strings ──────────────────────────────────────────
  var messages = {
    fa:      "اندروید، یک سکّوی بسته خواهد شد!",
    ar:      "سيصبح نظام أندرويد منصة مغلقة في",
    he:      "אנדרואיד תהפוך לפלטפורמה נעולה בעוד",
    en:      "Android will become a locked-down platform in",
    ca:      "Android es convertirà en una plataforma tancada",
    cs:      "Android se stane uzamčenou platformou za",
    de:      "Android wird eine geschlossene Plattform werden.",
    da:      "Android vil blive en lukket platform om",
    nl:      "Android zal een gesloten platform worden over",
    el:      "Το Android θα γίνει μία κλειστή πλατφόρμα",
    es:      "Android se convertirá en una plataforma cerrada en",
    fr:      "Android va devenir une plateforme fermée dans",
    id:      "Android akan menjadi platform yang terkunci.",
    it:      "Android diventerà una piattaforma bloccata",
    ko:      "Android가 폐쇄된 플랫폼이 되기까지 남은 시간:",
    pl:      "Android stanie się platformą zamkniętą za",
    "pt-BR": "O Android se tornará uma plataforma fechada em",
    ru:      "Android станет закрытой платформой через",
    sk:      "Android sa stane uzamknutou platformou",
    th:      "Androidจะเป็นแพลตฟอร์มที่ถูกล็อก",
    tr:      "Android kısıtlı bir platform haline gelecek.",
    uk:      "Android стане закритою платформою",
    "zh-CN": "安卓将成为一个封闭平台",
    "zh-TW": "Android 將成為一個封閉平台",
    ja:      "Androidは閉鎖的なプラットフォームになろうとしています",
    fi:      "Androidista tulee suljettu alusta",
    hu:      "Az Android egy lezárt platform lesz",
    vi:      "Android sẽ trở thành một hệ điều hành đóng",
    bg:      "Android ще стане заключена платформа след",
    be:      "Android стане закрытай плафтормай    ",
  };

  // ── Parse query parameters from the script's own src URL ──────────────
  function getScriptParams() {
    var params = {};
    try {
      var src = document.currentScript && document.currentScript.src;
      if (!src) return params;
      var q = src.indexOf("?");
      if (q === -1) return params;
      var pairs = src.substring(q + 1).split("&");
      for (var i = 0; i < pairs.length; i++) {
        var kv = pairs[i].split("=");
        params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
      }
    } catch (e) {}
    return params;
  }

  var params = getScriptParams();

  // ── Determine locale ──────────────────────────────────────────────────
  function resolveLocale(tag) {
    if (!tag) return "en";
    // Exact match
    if (messages[tag]) return tag;
    // Case-insensitive exact match (e.g. "pt-br" → "pt-BR")
    var lower = tag.toLowerCase();
    for (var key in messages) {
      if (key.toLowerCase() === lower) return key;
    }
    // Fallback to base language (e.g. "de-CH" → "de", "zh-Hans" → "zh")
    var base = lower.split("-")[0];
    for (var key2 in messages) {
      if (key2.toLowerCase() === base) return key2;
    }
    // Fallback to any regional variant of the base language (e.g. "pt" → "pt-BR")
    for (var key3 in messages) {
      if (key3.toLowerCase().split("-")[0] === base) return key3;
    }
    return "en";
  }

  var locale = resolveLocale(
    params.lang ||
    document.documentElement.lang ||
    navigator.language ||
    navigator.userLanguage
  );

  // ── Size variant ──────────────────────────────────────────────────────
  var size = params.size === "mini" ? "mini"
      : params.size === "minimal"
        ? "minimal"
        : "normal";

  // ── Theme (new) ───────────────────────────────────────────────────────
  var theme = params.theme === "dark" ? "dark"
      : params.theme === "light"
        ? "light"
        : "auto";

  // ── Style (new): "modern" (default) or "classic" (the original look) ──
  var styleMode = params.style === "classic" ? "classic" : "modern";

  // ── Link ────────────────────────────────────────────────────────────
  var linkParam = params.link;
  var defaultLink = "https://keepandroidopen.org" + (locale === "en" ? "" : "/" + locale + "/");
  var linkUrl = linkParam === "none" ? null : (linkParam || defaultLink);

  // ── Close button ────────────────────────────────────────────────────
  var showClose = params.hidebutton !== "off";
  var storageKey = "kao-banner-hidden";
  var dismissDays = 30;
  var noAnim = params.animation === "off";

  // ── CSS: tokens (light + dark + auto) ────────────────────────────────
  var cssTokens =
    ".kao-banner.kao-banner--style-modern{" +
      "--kao-bg-from:#fff1d0;--kao-bg-to:#ffe1a0;" +
      "--kao-fg:#4a3000;--kao-fg-strong:#2a1a00;" +
      "--kao-accent:#b85d00;--kao-accent-strong:#7a3d00;" +
      "--kao-border:rgba(184,93,0,.32);--kao-pill-bg:rgba(184,93,0,.14);" +
      "--kao-stripe:rgba(184,93,0,.10);--kao-glow:rgba(255,184,77,.45);" +
    "}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--theme-dark{" +
      "--kao-bg-from:#2a1f08;--kao-bg-to:#3a2c10;" +
      "--kao-fg:#ffd9a3;--kao-fg-strong:#fff1dc;" +
      "--kao-accent:#ffb84d;--kao-accent-strong:#ffce80;" +
      "--kao-border:rgba(255,184,77,.34);--kao-pill-bg:rgba(255,184,77,.14);" +
      "--kao-stripe:rgba(255,184,77,.10);--kao-glow:rgba(255,184,77,.30);" +
    "}" +
    "@media(prefers-color-scheme:dark){" +
      ".kao-banner.kao-banner--style-modern.kao-banner--theme-auto{" +
        "--kao-bg-from:#2a1f08;--kao-bg-to:#3a2c10;" +
        "--kao-fg:#ffd9a3;--kao-fg-strong:#fff1dc;" +
        "--kao-accent:#ffb84d;--kao-accent-strong:#ffce80;" +
        "--kao-border:rgba(255,184,77,.34);--kao-pill-bg:rgba(255,184,77,.14);" +
        "--kao-stripe:rgba(255,184,77,.10);--kao-glow:rgba(255,184,77,.30);" +
      "}" +
    "}";

  // ── CSS: modern base + reset ────────────────────────────────────────
  var cssBase =
    ".kao-banner.kao-banner--style-modern{" +
      "position:relative;box-sizing:border-box;width:100%;" +
      "font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;" +
      "font-size:14px;font-weight:400;line-height:1.4;letter-spacing:normal;" +
      "text-shadow:none;text-transform:none;text-align:start;" +
      "color:var(--kao-fg);" +
      "background:" +
        "repeating-linear-gradient(-45deg,transparent 0,transparent 22px," +
        "var(--kao-stripe) 22px,var(--kao-stripe) 24px)," +
        "linear-gradient(95deg,var(--kao-bg-from) 0%,var(--kao-bg-to) 100%);" +
      "border-bottom:1px solid var(--kao-border);" +
      "box-shadow:0 6px 18px -10px var(--kao-glow);" +
      "contain:layout style;" +
    "}" +
    ".kao-banner.kao-banner--style-modern *{box-sizing:border-box;}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__inner{" +
      "position:relative;display:flex;align-items:center;" +
      "gap:12px;min-width:0;max-width:1200px;margin:0 auto;" +
      "padding:0 16px;height:100%;" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__icon{" +
      "flex-shrink:0;width:22px;height:22px;" +
      "color:var(--kao-accent);" +
      "filter:drop-shadow(0 1px 2px var(--kao-glow));" +
      "animation:kao-warn-pulse 2.4s ease-in-out infinite;" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__icon-mark{" +
      "fill:#1a0e00;" +
    "}" +
    "@keyframes kao-warn-pulse{" +
      "0%,100%{opacity:1;transform:scale(1);}" +
      "50%{opacity:.78;transform:scale(.94);}" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__text{" +
      "margin:0;flex:0 1 auto;min-width:0;overflow:hidden;" +
      "text-overflow:ellipsis;white-space:nowrap;" +
      "font-size:.875rem;font-weight:500;" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__brand{" +
      "font-weight:700;color:var(--kao-fg-strong);" +
      "text-transform:uppercase;font-size:.8125rem;" +
      "letter-spacing:.04em;margin-inline-end:6px;" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__verify{" +
      "opacity:.92;margin-inline-end:6px;color:inherit;" +
    "}" +
    ".kao-banner.kao-banner--style-modern a.kao-banner__verify{" +
      "text-decoration:none;color:inherit;" +
    "}" +
    ".kao-banner.kao-banner--style-modern a.kao-banner__verify:hover{" +
      "text-decoration:underline;" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__count{" +
      "flex-shrink:0;margin-inline-start:auto;" +
      "font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Monaco,Consolas,monospace;" +
      "font-variant-numeric:tabular-nums;font-weight:600;" +
      "color:var(--kao-accent-strong);padding:2px 7px;border-radius:6px;" +
      "background:var(--kao-pill-bg);border:1px solid var(--kao-border);" +
      "font-size:.8125rem;letter-spacing:.02em;white-space:nowrap;" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__cta{" +
      "display:inline-flex;align-items:center;gap:4px;" +
      "font-size:.8125rem;font-weight:700;color:var(--kao-accent-strong);" +
      "text-decoration:none;flex-shrink:0;padding:5px 12px;" +
      "border-radius:999px;border:1px solid var(--kao-border);" +
      "background:transparent;" +
      "transition:background .2s,transform .2s,border-color .2s;" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__cta:hover{" +
      "background:var(--kao-pill-bg);" +
      "border-color:var(--kao-accent);" +
      "transform:translateX(2px);" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__cta:focus-visible{" +
      "outline:2px solid var(--kao-fg-strong);outline-offset:2px;" +
    "}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--has-close .kao-banner__inner{" +
      "padding-inline-end:40px;" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__close{" +
      "position:absolute;inset-inline-end:8px;top:50%;" +
      "transform:translateY(-50%);background:none;border:0;" +
      "-webkit-appearance:none;appearance:none;cursor:pointer;" +
      "color:var(--kao-fg);opacity:.6;font-size:14px;line-height:1;" +
      "padding:6px 8px;" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__close:hover{opacity:1;}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__close:focus-visible{" +
      "outline:2px solid var(--kao-fg-strong);outline-offset:2px;opacity:1;" +
    "}" +
    ".kao-banner.kao-banner--style-modern .kao-banner__a11y-status{" +
      "position:absolute;width:1px;height:1px;padding:0;margin:-1px;" +
      "overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;" +
    "}";

  // ── CSS: modern size variants ────────────────────────────────────────
  var cssSizes =
    ".kao-banner.kao-banner--style-modern.kao-banner--normal{height:48px;}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--mini{height:36px;}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--mini .kao-banner__icon{" +
      "width:18px;height:18px;" +
    "}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--mini .kao-banner__text{" +
      "font-size:.75rem;" +
    "}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--mini .kao-banner__brand{" +
      "font-size:.75rem;" +
    "}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--mini .kao-banner__count{" +
      "font-size:.6875rem;padding:1px 5px;" +
    "}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--minimal{height:28px;}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--minimal .kao-banner__inner{" +
      "padding:0 12px;gap:6px;" +
    "}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--minimal .kao-banner__text{" +
      "font-size:.75rem;" +
    "}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--minimal .kao-banner__count{" +
      "font-size:.6875rem;padding:1px 5px;" +
    "}";

  // ── CSS: media queries (responsive truncation) ───────────────────────
  // At narrow widths the verify (and eventually brand) text is hidden, leaving
  // the text element empty. Drop the count's auto inline-start margin so the
  // right-side cluster sits next to the brand/icon instead of being pushed to
  // the far edge — otherwise the layout reads as right-aligned.
  var cssMedia =
    "@media(max-width:860px){" +
      ".kao-banner.kao-banner--style-modern .kao-banner__verify{display:none;}" +
      ".kao-banner.kao-banner--style-modern .kao-banner__count{margin-inline-start:0;}" +
    "}" +
    "@media(max-width:640px){" +
      ".kao-banner.kao-banner--style-modern.kao-banner--normal{height:44px;}" +
      ".kao-banner.kao-banner--style-modern .kao-banner__inner{gap:8px;padding:0 12px;}" +
      ".kao-banner.kao-banner--style-modern.kao-banner--has-close .kao-banner__inner{padding-inline-end:40px;}" +
      ".kao-banner.kao-banner--style-modern .kao-banner__icon{width:18px;height:18px;}" +
      ".kao-banner.kao-banner--style-modern .kao-banner__cta__label{display:none;}" +
      ".kao-banner.kao-banner--style-modern .kao-banner__cta{padding:5px 8px;}" +
    "}" +
    "@media(max-width:380px){" +
      ".kao-banner.kao-banner--style-modern .kao-banner__brand{display:none;}" +
    "}";

  // ── CSS: motion preferences ──────────────────────────────────────────
  var cssMotion =
    "@media(prefers-reduced-motion:reduce){" +
      ".kao-banner.kao-banner--style-modern .kao-banner__icon{animation:none;}" +
      ".kao-banner.kao-banner--style-modern .kao-banner__cta{transition:none;}" +
      ".kao-banner.kao-banner--style-modern .kao-banner__cta:hover{transform:none;}" +
    "}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--no-anim .kao-banner__icon{" +
      "animation:none;" +
    "}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--no-anim .kao-banner__cta{" +
      "transition:none;" +
    "}" +
    ".kao-banner.kao-banner--style-modern.kao-banner--no-anim .kao-banner__cta:hover{" +
      "transform:none;" +
    "}";

  // ── CSS: RTL adjustments ─────────────────────────────────────────────
  var cssRtl =
    "[dir=rtl] .kao-banner.kao-banner--style-modern .kao-banner__cta__arrow," +
    ".kao-banner.kao-banner--style-modern[dir=rtl] .kao-banner__cta__arrow{" +
      "transform:scaleX(-1);" +
    "}";

  // ── CSS: classic style (original look preserved 1:1) ─────────────────
  var cssClassicNormal =
    ".kao-banner.kao-banner--style-classic.kao-banner--normal{" +
      "position:relative;" +
      "font-variant-numeric:tabular-nums;" +
      "background:linear-gradient(180deg,#d32f2f 0%,#b71c1c 100%);" +
      "border-bottom:4px solid #801313;" +
      "color:#fff;" +
      "font-family:'Arial Black',sans-serif;" +
      "font-weight:900;" +
      "text-transform:uppercase;" +
      "letter-spacing:2px;" +
      "font-size:1.5rem;" +
      "text-align:center;" +
      "text-shadow:" +
        "0px 1px 0px #9e1a1a," +
        "0px 2px 0px #8a1515," +
        "0px 3px 0px #751111," +
        "0px 4px 0px #5e0d0d," +
        "0px 6px 10px rgba(0,0,0,0.5);" +
      "padding:0.5rem 2.5rem;" +
      "line-height:1.6;" +
      "box-sizing:border-box;" +
    "}";

  var cssClassicMini =
    ".kao-banner.kao-banner--style-classic.kao-banner--mini{" +
      "position:relative;" +
      "font-variant-numeric:tabular-nums;" +
      "background:linear-gradient(180deg,#d32f2f 0%,#b71c1c 100%);" +
      "border-bottom:2px solid #801313;" +
      "color:#fff;" +
      "font-family:'Arial Black',sans-serif;" +
      "font-weight:900;" +
      "text-transform:uppercase;" +
      "letter-spacing:1px;" +
      "font-size:0.75rem;" +
      "text-align:center;" +
      "text-shadow:" +
        "0px 1px 0px #9e1a1a," +
        "0px 2px 0px #8a1515," +
        "0px 3px 5px rgba(0,0,0,0.4);" +
      "padding:0.25rem 1.5rem;" +
      "line-height:1.4;" +
      "box-sizing:border-box;" +
    "}";

  var cssClassicMinimal =
    ".kao-banner.kao-banner--style-classic.kao-banner--minimal{" +
      "position:relative;" +
      "font-variant-numeric:tabular-nums;" +
      "background:linear-gradient(180deg,#d32f2f 0%,#b71c1c 100%);" +
      "border-bottom:2px solid #801313;" +
      "color:#fff;" +
      "font-family:'Arial Black',sans-serif;" +
      "font-weight:900;" +
      "text-transform:uppercase;" +
      "letter-spacing:1px;" +
      "font-size:0.75rem;" +
      "text-align:center;" +
      "text-shadow:" +
        "0px 1px 0px #9e1a1a," +
        "0px 2px 0px #8a1515," +
        "0px 3px 5px rgba(0,0,0,0.4);" +
      "padding:0.25rem 1.5rem;" +
      "line-height:1.4;" +
      "box-sizing:border-box;" +
    "}";

  var cssClassicCommon =
    ".kao-banner.kao-banner--style-classic a{color:#fff;text-decoration:none;}" +
    ".kao-banner.kao-banner--style-classic a:hover{text-decoration:underline;}" +
    ".kao-banner.kao-banner--style-classic .kao-banner-close,"+
    ".kao-banner.kao-banner--style-classic .kao-banner__close{" +
      "position:absolute;" +
      "right:0.5rem;" +
      "top:50%;" +
      "transform:translateY(-50%);" +
      "background:none;" +
      "border:none;" +
      "color:#fff;" +
      "font-size:0.8em;" +
      "cursor:pointer;" +
      "opacity:0.7;" +
      "padding:0.25rem 0.5rem;" +
      "line-height:1;" +
      "text-shadow:none;" +
    "}" +
    ".kao-banner.kao-banner--style-classic .kao-banner-close:hover,"+
    ".kao-banner.kao-banner--style-classic .kao-banner__close:hover{opacity:1;}";

  var cssClassicPulse =
    ".kao-banner.kao-banner--style-classic:not(.no-animation):not(.kao-banner--no-anim){" +
      "animation:kao-pulse 2s infinite;" +
    "}" +
    "@keyframes kao-pulse{" +
      "0%{box-shadow:0 0 0 0 rgba(211,47,47,0.7)}" +
      "70%{box-shadow:0 0 0 15px rgba(211,47,47,0)}" +
      "100%{box-shadow:0 0 0 0 rgba(211,47,47,0)}" +
    "}" +
    "@media(prefers-reduced-motion:reduce){" +
      ".kao-banner.kao-banner--style-classic{animation:none!important;}" +
    "}";

  var cssClassic =
    cssClassicNormal +
    cssClassicMini +
    cssClassicMinimal +
    cssClassicCommon +
    cssClassicPulse;

  // ── Inject single <style> ────────────────────────────────────────────
  var styleEl = document.createElement("style");
  styleEl.textContent =
    cssTokens + cssBase + cssSizes + cssMedia + cssMotion + cssRtl + cssClassic;
  document.head.appendChild(styleEl);

  // ── Check if previously dismissed (reappears after dismissDays) ─────
  if (showClose) {
    try {
      var dismissed = localStorage.getItem(storageKey);
      if (dismissed) {
        var elapsed = Date.now() - Number(dismissed);
        if (elapsed < dismissDays * 24 * 60 * 60 * 1000) return;
        localStorage.removeItem(storageKey);
      }
    } catch (e) {}
  }

  // ── Build banner DOM ─────────────────────────────────────────────────
  var banner = document.createElement("div");
  var classes = ["kao-banner", "kao-banner--" + size];
  if (styleMode === "classic") {
    classes.push("kao-banner--style-classic");
    if (noAnim) classes.push("no-animation");
  } else {
    classes.push("kao-banner--style-modern");
    classes.push("kao-banner--theme-" + theme);
    if (showClose) classes.push("kao-banner--has-close");
  }
  if (noAnim) classes.push("kao-banner--no-anim");
  banner.className = classes.join(" ");
  banner.setAttribute("role", "status");
  banner.setAttribute("aria-live", "polite");
  banner.setAttribute("aria-atomic", "false");

  var messageText = messages[locale] || messages.en;
  var countdownSpan;

  if (styleMode === "classic") {
    // ── Classic DOM (preserve original structure 1:1) ────────────────
    if (linkUrl) {
      var classicLink = document.createElement("a");
      classicLink.href = linkUrl;
      classicLink.target = "_blank";
      classicLink.rel = "noopener";
      classicLink.textContent = messageText;
      banner.appendChild(classicLink);
    } else {
      banner.appendChild(document.createTextNode(messageText));
    }

    if (size === "minimal") {
      banner.appendChild(document.createTextNode(" "));
    } else {
      banner.appendChild(document.createElement("br"));
    }

    countdownSpan = document.createElement("span");
    countdownSpan.textContent = " ";
    banner.appendChild(countdownSpan);
  } else {
    // ── Modern DOM ────────────────────────────────────────────────────
    var inner = document.createElement("div");
    inner.className = "kao-banner__inner";

    // Warning icon (hidden in minimal). ISO-7010-style filled triangle
    // with a high-contrast exclamation drawn on top — much crisper at
    // 18–22 px than a hollow outline.
    if (size !== "minimal") {
      var SVG_NS = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("class", "kao-banner__icon");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");

      // Filled triangle with rounded corners (color = currentColor = --kao-accent)
      var tri = document.createElementNS(SVG_NS, "path");
      tri.setAttribute("d", "M12 2.5L1 21.5h22L12 2.5z");
      tri.setAttribute("fill", "currentColor");
      tri.setAttribute("stroke", "currentColor");
      tri.setAttribute("stroke-width", "1.2");
      tri.setAttribute("stroke-linejoin", "round");
      svg.appendChild(tri);

      // Exclamation mark (rect + dot) in fixed dark color for contrast
      var mark = document.createElementNS(SVG_NS, "path");
      mark.setAttribute("class", "kao-banner__icon-mark");
      mark.setAttribute("d", "M11 9h2v6h-2zm0 8h2v2h-2z");
      svg.appendChild(mark);

      inner.appendChild(svg);
    }

    // Text container (brand + verify)
    var textEl = document.createElement("p");
    textEl.className = "kao-banner__text";

    if (size !== "minimal") {
      var brand = document.createElement("span");
      brand.className = "kao-banner__brand";
      brand.textContent = "Keep Android Open";
      textEl.appendChild(brand);
    }

    // For minimal mode with linkUrl, the verify text itself becomes a link
    // (since CTA is hidden in minimal). For other sizes, verify is plain text
    // and the CTA carries the link.
    var verify;
    if (size === "minimal" && linkUrl) {
      verify = document.createElement("a");
      verify.href = linkUrl;
      verify.target = "_blank";
      verify.rel = "noopener";
    } else {
      verify = document.createElement("span");
    }
    verify.className = "kao-banner__verify";
    verify.textContent = messageText;
    textEl.appendChild(verify);

    inner.appendChild(textEl);

    // Countdown pill (per-tick, aria-hidden)
    countdownSpan = document.createElement("span");
    countdownSpan.className = "kao-banner__count";
    countdownSpan.setAttribute("aria-hidden", "true");
    countdownSpan.textContent = " ";
    inner.appendChild(countdownSpan);

    // CTA (normal + mini, when linkUrl present)
    if (size !== "minimal" && linkUrl) {
      var cta = document.createElement("a");
      cta.className = "kao-banner__cta";
      cta.href = linkUrl;
      cta.target = "_blank";
      cta.rel = "noopener";
      cta.setAttribute("aria-label", "Read why this matters");

      var ctaLabel = document.createElement("span");
      ctaLabel.className = "kao-banner__cta__label";
      ctaLabel.textContent = "Read why";
      cta.appendChild(ctaLabel);

      var ctaArrow = document.createElement("span");
      ctaArrow.className = "kao-banner__cta__arrow";
      ctaArrow.setAttribute("aria-hidden", "true");
      ctaArrow.textContent = "→";
      cta.appendChild(ctaArrow);

      inner.appendChild(cta);
    }

    banner.appendChild(inner);
  }

  // ── Close button (both modes) ────────────────────────────────────────
  if (showClose) {
    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    // Both class names: legacy `kao-banner-close` for back-compat with any
    // embedder CSS overrides, plus the new `kao-banner__close` BEM name.
    closeBtn.className = "kao-banner-close kao-banner__close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.textContent = "✕";
    closeBtn.addEventListener("click", function () {
      banner.style.display = "none";
      try { localStorage.setItem(storageKey, String(Date.now())); } catch (e) {}
    });
    banner.appendChild(closeBtn);
  }

  // ── Visually-hidden a11y status (modern only, daily updates) ────────
  var a11yStatus = null;
  if (styleMode === "modern") {
    a11yStatus = document.createElement("span");
    a11yStatus.className = "kao-banner__a11y-status";
    a11yStatus.setAttribute("aria-live", "polite");
    a11yStatus.setAttribute("aria-atomic", "true");
    banner.appendChild(a11yStatus);
  }

  // ── Insert into DOM (target id, or prepend to body) ─────────────────
  var targetId = params.id;
  if (targetId) {
    var target = document.getElementById(targetId);
    if (target) {
      target.appendChild(banner);
    } else {
      document.body.insertBefore(banner, document.body.firstChild);
    }
  } else {
    document.body.insertBefore(banner, document.body.firstChild);
  }

  // ── Countdown logic (unchanged formatter, retargeted span) ──────────
  var countDownDate = new Date("Sep 1, 2026 00:00:00").getTime();

  var unitFormatters = {
    day: new Intl.NumberFormat(locale, { style: "unit", unit: "day", unitDisplay: "narrow" }),
    hour: new Intl.NumberFormat(locale, { style: "unit", unit: "hour", unitDisplay: "narrow" }),
    minute: new Intl.NumberFormat(locale, { style: "unit", unit: "minute", unitDisplay: "narrow" }),
    second: new Intl.NumberFormat(locale, { style: "unit", unit: "second", unitDisplay: "narrow" })
  };

  var dayFormatter = new Intl.NumberFormat(locale, {
    style: "unit", unit: "day", unitDisplay: "long"
  });

  function formatUnit(value, unit) {
    return unitFormatters[unit].format(value);
  }

  var remaining = new Array(7);
  var separator = " ";
  var timer = null;
  var lastA11yDay = -1;

  function updateBanner() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var parts = 0;
    remaining[0] = days > 0 ? formatUnit(days, "day") : null;
    if (remaining[0]) parts++;
    remaining[1] = parts ? separator : null;
    remaining[2] =
      parts || hours > 0
        ? formatUnit(hours, "hour")
        : null;
    if (remaining[2]) parts++;
    remaining[3] = parts ? separator : null;
    remaining[4] =
      parts || minutes > 0
        ? formatUnit(minutes, "minute")
        : null;
    if (remaining[4]) parts++;
    remaining[5] = parts ? separator : null;
    remaining[6] = formatUnit(seconds, "second");

    countdownSpan.textContent = remaining.join("");

    // Update screen-reader status only when the day count changes.
    if (a11yStatus && days !== lastA11yDay) {
      lastA11yDay = days;
      a11yStatus.textContent = days > 0 ? dayFormatter.format(days) : "";
    }

    if (distance < 0) {
      clearInterval(timer);
    }
  }

  timer = setInterval(updateBanner, 1000);
  updateBanner();
})();
