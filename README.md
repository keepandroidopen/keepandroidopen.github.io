# Keep Android Open

**Keep Android Open** is a [community advocacy website](https://keepandroidopen.org) fighting against Google's 2025 developer verification mandate, which will require all developers to be registered with Google.

## Purpose

Launched in direct response to the Google announcement, the site defends Android's core promise: an open platform where anyone can build, share, and install apps without centralized gatekeeping.
It aims to inform on the impacts on consumers, developers, states and coordinate resistance.

## Contributing

1. Identify [issues](https://github.com/keepandroidopen/keepandroidopen.github.io/issues).  
2. Fork this repository.
3. Make the changes.
4. Create a pull request.

## Running the site locally

This is an Astro site, so you should be able to check out your fork locally and run it as per the [docs](https://docs.astro.build/en/develop-and-build/#start-the-astro-dev-server) with:

```
npm run dev
```

The site should run locally and be browsable at [http://localhost:4321/](http://localhost:4321/).

## Translations Needed!

All translatable strings live in YAML files under [`src/i18n/locales/`](https://github.com/keepandroidopen/keepandroidopen.github.io/tree/main/src/i18n/locales/). The English source is [`en.yaml`](https://github.com/keepandroidopen/keepandroidopen.github.io/blob/main/src/i18n/locales/en.yaml).

### Updating an existing translation

1. Open the locale file (e.g. `src/i18n/locales/fr.yaml`) in a fork.
2. Each commented-out key shows the English value. Uncomment it and replace the English text with your translation.
3. Use markdown for formatting: `**bold**`, `*italic*`, `[link text](url)`. Do not use raw HTML tags.
4. Keep YAML quoting intact: use double quotes for values with special characters, or `>-` for long values.
5. Validate your file at <https://onlineyamltools.com/validate-yaml>.
6. Submit a pull request.

### Adding a new language

1. Add the language code and label to [`src/i18n/config.ts`](https://github.com/keepandroidopen/keepandroidopen.github.io/blob/main/src/i18n/config.ts).
2. Copy an existing locale file (e.g. `de.yaml`) to `src/i18n/locales/{code}.yaml` and translate the values.
3. Submit a pull request.

> [!IMPORTANT]
> Translations MAY be drafted with the assistance of a machine translation tool or LLM, but they MUST be reviewed and submitted by a native speaker of the target language. We do not accept unreviewed machine translations. Fluency, natural phrasing, and cultural accuracy matter.

## License 

[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) – free reuse.
