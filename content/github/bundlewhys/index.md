---
title: bundlewhys
description: A static site reporting browser bundle sizes of front-end npm packages.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2026-09-16T13:56:33.000Z
metadata:
  name: zachleat/bundlewhys
  language: JavaScript
  homepage: https://zachleat.github.io/bundlewhys/
  uuid: 11ty/import::github::zachleat/bundlewhys
  type: github
  url: https://github.com/zachleat/bundlewhys
  importHash: bc0f319744f3df74
---
# Bundlewhys

A static site reporting browser bundle sizes of front-end npm packages.

-   Type any package on the home page to bundle it in the browser (esbuild-wasm, straight from the npm registry).
-   `npm run measure` records the sample packages in `packages.json` (or only those passed as arguments) to `src/_data/sizes.json` using the same code in `lib/measure.js`.
-   `npm start` serves the site locally; `npm run build` writes it to `_site/`.
