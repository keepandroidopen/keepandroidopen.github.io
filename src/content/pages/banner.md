---
title: "Add the Countdown Banner to Your Site"
description: "Embed the Keep Android Open countdown banner on your own website with a single script tag."
lang: en
---

Add the Keep Android Open countdown banner to your website with a single `<script>` tag. The banner is self-contained with no external dependencies — all styling and 20 localizations are built in. It auto-detects the visitor's browser language and displays a live countdown to the September 2026 lockdown date.

## Basic usage

Inserts a full-width banner at the top of the page:

```html
<script src="https://keepandroidopen.org/banner.js"></script>
```

## Query parameters

Customize the banner by appending query parameters to the script URL:

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `lang` | `en`, `fr`, `de`, `es`, … | Browser language | Override the display language |
| `id` | Any element id | _(prepend to body)_ | Insert the banner inside the element with this id |
| `size` | `normal`, `mini` | `normal` | Banner size variant |
| `link` | Any URL, or `none` | `https://keepandroidopen.org` | Make the banner text a clickable link; set to `none` to disable |
| `hidebutton` | `on`, `off` | `on` | Show or hide the X close button (dismissed state is remembered per-site via localStorage) |

## Examples

Basic usage, displays at the top of the page:

```html
<script src="https://keepandroidopen.org/banner.js"></script>
```

<script src="/banner.js"></script>

French, mini size, inserted into a specific element:

```html
<div id="my-banner"></div>
<script src="https://keepandroidopen.org/banner.js?lang=fr&size=mini&id=my-banner"></script>
```

<div id="my-banner"></div>
<script src="/banner.js?lang=fr&size=mini&id=my-banner"></script>


Link to a custom page, no close button:

```html
<script src="https://keepandroidopen.org/banner.js?link=https://example.com/android&hidebutton=off"></script>
```

<div id="my-banner-custom"></div>
<script src="/banner.js?link=https://example.com/android&hidebutton=off&size=mini&id=my-banner-custom"></script>

