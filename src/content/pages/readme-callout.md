---
title: "Add a Warning to Your README"
description: "A simple markdown callout to warn users that your app may be affected by Android's 2026 installation restrictions."
lang: en
---

If your app can be installed outside the Google Play Store, it may stop working on Android in 2026 due to Google's upcoming installation restrictions. You can help raise awareness by adding the following callout to your README.

## Callout
```markdown
> [!IMPORTANT]
> **Android application installation restrictions are coming September 2026.**
> This app may be affected by upcoming changes to Android that limit how applications can be installed outside the Play Store. Visit [keepandroidopen.org](https://keepandroidopen.org) to learn more and take action.
```

This renders as a highlighted callout on GitHub, GitLab, and most other platforms that support the `[!IMPORTANT]` syntax. On platforms that don't, it falls back gracefully to a plain blockquote.

## If your project also has a website

You can embed a live countdown banner instead — see [Add the Countdown Banner to Your Site](/banner).
