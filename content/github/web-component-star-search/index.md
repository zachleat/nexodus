---
title: web-component-star-search
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2026-10-09T03:06:59.000Z
metadata:
  name: zachleat/web-component-star-search
  language: JavaScript
  license: MIT
  homepage: components.zachleat.dev
  uuid: 11ty/import::github::zachleat/web-component-star-search
  type: github
  url: https://github.com/zachleat/web-component-star-search
  importHash: 720f5eaf46306b03
---
# Web Component Star Search

A searchable catalog of custom elements, built with Eleventy and indexed with Pagefind.

## Run

-   `npm start` serves the site locally and rebuilds the search index on every change.
-   `npm run build` writes the site and search index to `_site/`.

## Add a component

Add one markdown file per custom element to `components/<author-or-library>/<tag-name>.md`:

```
---
tagName: snow-fall
description: A web component to add snow to your web site.
package: "@zachleat/snow-fall"
author: Zach Leatherman
authorUrl: https://www.zachleat.com/
repository: https://github.com/zachleat/snow-fall
demo: https://zachleat.github.io/snow-fall/demo.html
documentation: https://www.zachleat.com/web/snow-fall/
license: MIT
category: Effects
builtWith: Vanilla
keywords: [winter, animation]
---

Optional notes (rendered and searchable).
```

Components from a larger library get one file each plus a `library` field:

```
library:
  name: Web Awesome
  url: https://webawesome.com/
```

Optional API fields: `status`, `attributes`, `slots`, `events`, `cssParts`. Set `commercial: true` for components that need a paid license.

`builtWith` is a key in `_data/baseLibraries.js` (the npm importer detects it from dependencies). `category` must be one of the names in `_data/categories.js`; run `npm run categorize` to fill in any that are missing.

## Import

Generate entries from npm packages, using each package’s [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/) when it has one and scanning its code for `customElements.define` otherwise (existing files are skipped unless `--overwrite` is passed):

```
npm run import:npm -- github @github/relative-time-element --author GitHub --author-url https://github.com/
```

Or from a manifest URL directly:

```
npm run import:cem -- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3.14.0/dist/custom-elements.json webawesome \
  --library "Web Awesome" --library-url https://webawesome.com/ \
  --package @awesome.me/webawesome --author "Web Awesome" --author-url https://webawesome.com/ \
  --repository https://github.com/shoelace-style/webawesome --license MIT
```

Then run `npm run categorize`. Run `npm run measure` to record `jsSize` and `cssSize` (minified + gzipped; JS bundled with its dependencies) for entries with a `package`; code shared by every component in a library is measured once into `_data/librarySizes.json` and left out of each component’s `jsSize`. Run `npm run find-demos` to fill in missing `demo` links from READMEs. Run `npm run check-status` (requires `gh auth login`) to record deprecated npm packages (`deprecated`), archived GitHub repositories (`archived: true`) and GitHub `stars`.
