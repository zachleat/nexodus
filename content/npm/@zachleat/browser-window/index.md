---
title: '@zachleat/browser-window'
description: Used in demos as a way to fake a Safari-esque web browser window.
authors:
  - name: Zach Leatherman
    url: https://zachleat.com/
date: 2023-10-25T20:46:53.205Z
metadata:
  name: '@zachleat/browser-window'
  version: 3.0.1
  license: MIT
  homepage: https://github.com/zachleat/browser-window#readme
  repository: https://github.com/zachleat/browser-window
  uuid: 11ty/import::npm::@zachleat/browser-window
  type: npm
  url: https://www.npmjs.com/package/@zachleat/browser-window
  importHash: c68a3cad47a30842
---
# `browser-window`

A small themed zero-dependency Web Component for demos with a fake browser window (Safari-esque).

-   [**Go to the Demo**](https://zachleat.github.io/browser-window/demo.html)
-   [Read the blog post](https://www.zachleat.com/web/browser-window/)

> “this is maybe my favoritest \[web component\] yet.”—[Dave Rupert, President of Web Components](https://mastodon.social/@davatron5000/111301972550207963)

## Installation

Via [`npm`](https://www.npmjs.com/package/@zachleat/browser-window) or download [`browser-window.js`](https://github.com/zachleat/browser-window/blob/HEAD/browser-window.js) directly for use in your project.

```
npm install @zachleat/browser-window
```

## Changelog

-   `v3.0.0` swaps to use `light-dark` and `color-scheme` for easier light/dark mode configuration! This has browser support implications!
-   `v2.0.0` URL bar now shows the full url by default (including pathname, searchParams, et al). Use `url-mode="hostname-only"` to swap back to previous behavior.
