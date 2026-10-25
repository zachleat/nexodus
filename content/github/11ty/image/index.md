---
title: image
description: Utility to perform build-time image transformations.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2020-04-18T02:38:42.000Z
metadata:
  name: 11ty/image
  language: JavaScript
  homepage: https://www.11ty.dev/docs/plugins/image/
  tags:
    - eleventy
    - eleventy-utility
  uuid: 11ty/import::github::11ty/image
  type: github
  url: https://github.com/11ty/image
  importHash: d8af118859a5c87d
tags:
  - eleventy
  - eleventy-utility
---
![eleventy Logo](logo-github-gW5pow8pImUR.svg)

# Image utility

Requires Node 22+

Low level utility to perform build-time image transformations for both vector and raster images. Output multiple sizes, save multiple formats, cache remote images locally. Uses the [sharp](https://sharp.pixelplumbing.com/) image processor.

You maintain full control of your HTML. Use with `<picture>` or `<img>` or CSS `background-image`, or others! Works great to add `width` and `height` to your images!

## [The full Image utility documentation is on 11ty.dev](https://www.11ty.dev/docs/plugins/image/).

-   _This is a plugin for the [Eleventy static site generator](https://www.11ty.dev/)._
-   Find more [Eleventy plugins](https://www.11ty.dev/docs/plugins/).
-   Please star [Eleventy on GitHub](https://github.com/11ty/eleventy/), follow [@eleven\_ty](https://twitter.com/eleven_ty) on Twitter, and support [11ty on Open Collective](https://opencollective.com/11ty)

[![npm Version](image-9QCyzuE81Wr5.svg)](https://www.npmjs.com/package/@11ty/image) [![GitHub issues](image-DEUjBYDY6P9m.svg)](https://github.com/11ty/image/issues)

## Installation

```
npm install --save-dev @11ty/eleventy-img
```

_[The full Image utility documentation is on 11ty.dev](https://www.11ty.dev/docs/plugins/image/)._

## Tests

```
npm run test
```

-   We use the [Node.js test runner](https://nodejs.org/api/test.html) with [`node:assert/strict`](https://nodejs.org/api/assert.html).
-   ℹ️ To keep tests fast, thou shalt try to avoid writing files in tests.

## Community Roadmap

-   [Top Feature Requests](https://github.com/11ty/image/issues?q=label%3Aneeds-votes+sort%3Areactions-%2B1-desc+label%3Aenhancement) (Add your own votes using the 👍 reaction)
-   [Top Bugs 😱](https://github.com/11ty/image/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Areactions-%2B1-desc) (Add your own votes using the 👍 reaction)
-   [Newest Bugs 🙀](https://github.com/11ty/image/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
