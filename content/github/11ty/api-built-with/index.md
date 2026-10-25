---
title: api-built-with
description: Retreive hosting information about any given URL.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2024-03-11T14:36:42.000Z
metadata:
  name: 11ty/api-built-with
  language: JavaScript
  homepage: https://v1.builtwith.11ty.dev/
  uuid: 11ty/import::github::11ty/api-built-with
  type: github
  url: https://github.com/11ty/api-built-with
  importHash: a95dfc19b1a38055
---
![11ty Logo](logo-github-gW5pow8pImUR.svg)

# api-built-with

A runtime service to return metadata about any given web site URL.

Types of metadata currently supported:

-   Hosting provider, with support for:
    -   Cloudflare
    -   Vercel
    -   GitHub Pages
    -   Netlify
    -   Gatsby
    -   Fly.io
    -   Amazon (S3, Cloudfront)

## Usage

URLs have the formats:

```
/:url/json/
/:url/image/host/
```

-   `url` must be URI encoded (via `encodeURIComponent`).

## Examples

-   Eleventy Base Blog is hosted by: [![Eleventy Base Blog](-a8d2Ezjk56k9.png)](https://v1.builtwith.11ty.dev/https%3A%2F%2F11ty.github.io%2Feleventy-base-blog%2F/image/host/)
-   vercel.com is hosted by: [![Vercel](-aiisp3StufD4.png)](https://v1.builtwith.11ty.dev/https%3A%2F%2Fvercel.com%2Fen-us%2F/image/host/)
-   netlify.com is hosted by: [![Netlify](-DkvDARGW5BmG.png)](https://v1.builtwith.11ty.dev/https%3A%2F%2Fwww.netlify.com/image/host/)
