---
title: package-bundler
description: >-
  Internal package to build bundles (using esbuild) for use in various
  environments
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2025-07-02T20:11:15.000Z
metadata:
  name: 11ty/package-bundler
  language: JavaScript
  uuid: 11ty/import::github::11ty/package-bundler
  type: github
  url: https://github.com/11ty/package-bundler
  importHash: 2e4cda529d659654
---
# @11ty/package-bundler

Internal package to build Eleventy core and plugin bundles (using esbuild, with support for adapters) for use in various environments (client).

## Usage

Available on [npm as `@11ty/package-bundler`](https://www.npmjs.com/package/@11ty/package-bundler):

```
npm install @11ty/package-bundler
```

```
import bundle from "@11ty/package-bundler";

await bundle(INPUT, OUTPUT, {
  name: "Eleventy Fetch",
  fileSystemMode: "consume",
  external: [
    "fs",
    "node:fs",
    "node:crypto",
  ],
  moduleRoot: ".", // root directory to resolve node_modules paths
  esbuild: {}, // options passed to esbuild
});
```

### Sample

```
import pkg from "../package.json" with { type: "json" };
import bundle from "@11ty/package-bundler";

await bundle(import.meta.resolve("@11ty/eleventy-fetch"), `demo/lib/eleventy-fetch.js`, {
  name: "Eleventy Fetch",
});
await bundle(import.meta.resolve("@11ty/eleventy-plugin-syntaxhighlight"), `demo/lib/eleventy-plugin-syntaxhighlight.js`, {
  name: "Eleventy Syntax Highlighter",
});
await bundle(import.meta.resolve("@11ty/eleventy-navigation"), `demo/lib/eleventy-navigation.js`, {
  name: "Eleventy Navigation",
});
await bundle(import.meta.resolve("@11ty/eleventy-plugin-rss"), `demo/lib/eleventy-plugin-rss.js`, {
  name: "Eleventy RSS",
});
await bundle(import.meta.resolve("@11ty/eleventy-img"), `demo/lib/eleventy-img.js`, {
  name: "Eleventy Image",
});
```
