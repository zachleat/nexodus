---
title: api-sparkline
description: Service to return sparkline SVG images.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2021-09-11T03:53:40.000Z
metadata:
  name: 11ty/api-sparkline
  language: JavaScript
  homepage: https://v1.sparkline.11ty.dev
  archived: true
  tags:
    - eleventy
    - eleventy-api
  uuid: 11ty/import::github::11ty/api-sparkline
  type: github
  url: https://github.com/11ty/api-sparkline
  importHash: 88f19f5fb155a8c8
tags:
  - eleventy
  - eleventy-api
---
![11ty Logo](logo-github-gW5pow8pImUR.svg)

# Sparkline API

A runtime service to generate sparkline SVG images.

## Demo

![Sparkline representing frequency of posts on zachleat.com written from 2007 to 2021](-8HiF53eAJWBq.svg+xml)

## Usage

Image URLs have the formats:

```
/[height]x[width]/[values]/
/[height]x[width]/[values]/[color]/
```

-   `values` is a comma separated list of numbers
-   `color` must be URI encoded (via `encodeURIComponent`)
