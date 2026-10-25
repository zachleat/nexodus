---
title: api-indieweb-avatar
description: Return an optimized avatar image from a domain name input.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2021-09-19T20:01:08.000Z
metadata:
  name: 11ty/api-indieweb-avatar
  language: JavaScript
  homepage: https://v1.indieweb-avatar.11ty.dev/
  tags:
    - eleventy
    - eleventy-api
  uuid: 11ty/import::github::11ty/api-indieweb-avatar
  type: github
  url: https://github.com/11ty/api-indieweb-avatar
  importHash: 001eeb2a171b2cd5
tags:
  - eleventy
  - eleventy-api
---
![11ty Logo](logo-github-gW5pow8pImUR.svg)

# IndieWeb Avatar API

A runtime service to extract avatar images from:

1.  `<link rel="apple-touch-icon">`
2.  `<link rel="apple-touch-icon-precomposed">`
3.  `<link rel="icon">`
4.  `favicon.ico` (added September 20, 2021)
5.  `favicon.ico` that isn’t an `.ico` file (added December 1, 2023)
6.  First `<img>` in `<header>` (added December 1, 2023)
7.  TODO: Support Data URIs in attribute values. (e.g. [https://joshcrain.io](https://joshcrain.io))
8.  TODO: `<link rel="mask-icon">`
9.  TODO (maybe): `<link rel="manifest">`
10.  TODO (maybe): `<meta name="msapplication-config">`

All `rel` lookups match against attribute values that are space separated lists.

Update July 22, 2024: Supports `svg` favicons but converts to `png` for performance reasons (some folks had _huge_ SVG favicons).

## Usage

URLs have the formats:

```
/:url/
```

-   `url` must be URI encoded.
