# Keep Android Open

**Keep Android Open** is a [community advocacy website](https://keepandroidopen.org) fighting against Google's 2025 developer verification mandate, which will require all developers to be registered with Google.

## What is this fork?
 This fork was developed by a developer named DeniusGG, and this fork adds the Kartvelian Language Family languages - Kartvelian, Svan, and Mingrelian/Laz.
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

To provide a translation into a new language like Italian (language code: "it"):

1. Edit [`src/i18n/config.ts`](https://github.com/keepandroidopen/keepandroidopen.github.io/edit/main/src/i18n/config.ts) in a fork and update the languages list with the new language code.
2. Create a new folder in [`src/content/pages/`](https://github.com/keepandroidopen/keepandroidopen.github.io/tree/main/src/content/pages/) and add the translation of the English `index.md` file. Translate the markdown headers and page content. The most important text is at the beginning; the lists of links do not all need to be translated.
3. Commit changes to your fork and file a Pull Request with your translation.

> [!IMPORTANT]
> Please do not submit machine-generated translations (using LLMs or AI tools). We need _authentic human translations_ from _native speakers_ of the language.

## License 

[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) – free reuse.
