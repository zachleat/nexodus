---
title: demo-eleventy-img-netlify-cache
description: >-
  A demo to show how to re-use Eleventy Image’s disk cache across Netlify
  builds.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2022-02-24T17:48:04.000Z
metadata:
  name: 11ty/demo-eleventy-img-netlify-cache
  language: JavaScript
  homepage: https://demo-eleventy-img-netlify-cache.netlify.app/
  tags:
    - eleventy
    - eleventy-demo
    - eleventy-image
  uuid: 11ty/import::github::11ty/demo-eleventy-img-netlify-cache
  type: github
  url: https://github.com/11ty/demo-eleventy-img-netlify-cache
  importHash: 2bb010cbb3d2070d
tags:
  - eleventy
  - eleventy-demo
  - eleventy-image
---
# Re-use Eleventy Image Disk Cache across Netlify Builds

-   [Live Demo](https://demo-eleventy-img-netlify-cache.netlify.app/)

This repository takes all of the [high resolution browser logos](https://github.com/alrra/browser-logos) and processes them through Eleventy Image, writing output images directly to the Eleventy output directory at `_site/img/generated/`.

Customize the Cache Directory (default `_site/img/generated/`) in:

1.  [`.eleventy.js`](https://github.com/11ty/demo-eleventy-img-netlify-cache/blob/main/.eleventy.js) (specifically the `outputDir` and `urlPath` properties)
2.  [`netlify.toml`](https://github.com/11ty/demo-eleventy-img-netlify-cache/blob/main/netlify.toml)

## Benchmarks:

222 source images, outputs AVIF and PNG formats at 40px width.

### Local

Cold start:

```
[11ty] Writing _site/index.html from ./index.liquid
[11ty] Wrote 1 file in 13.05 seconds (v1.0.0)
```

Warm start:

```
[11ty] Writing _site/index.html from ./index.liquid
[11ty] Wrote 1 file in 1.64 seconds (v1.0.0)
```

### Netlify servers

Cold start:

```
[11ty] Writing _site/index.html from ./index.liquid
[11ty] Wrote 1 file in 27.59 seconds (v1.0.0)
```

Warm start:

```
[11ty] Writing _site/index.html from ./index.liquid
[11ty] Wrote 1 file in 4.01 seconds (v1.0.0)
```
