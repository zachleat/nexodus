---
title: api-opengraph-image
description: 'A service that returns an optimized OpenGraph Image from a domain name input. '
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2021-10-27T21:53:50.000Z
metadata:
  name: 11ty/api-opengraph-image
  language: JavaScript
  homepage: https://v1.opengraph.11ty.dev/
  tags:
    - eleventy
    - eleventy-api
  uuid: 11ty/import::github::11ty/api-opengraph-image
  type: github
  url: https://github.com/11ty/api-opengraph-image
  importHash: b9d9c3733bf68a1b
tags:
  - eleventy
  - eleventy-api
---
![11ty Logo](logo-github-gW5pow8pImUR.svg)

# Open Graph Image API

A runtime service to return optimized Open Graph images from a URL. Works with:

1.  `<meta name="og:image:secure_url">`
2.  `<meta name="og:image">`
3.  `<meta property="og:image">`
4.  `<meta name="twitter:image">`

GitHub repository URLs skip the page and use GitHub’s own image service.

## Usage

URLs have the formats:

```
/:url/
/:url/:size/
/:url/:size/:format/
/:url/:size/:format/onerror/
```

-   `url` must be URI encoded.
-   `size` (optional) can be `small` (375×_), `medium` (650×_), or `auto` (keep original width)
-   `format` must by an output image format supported by [Eleventy Image](https://www.11ty.dev/docs/plugins/image/) (`auto` is supported)

```
/:url/onerror/
/:url/:size/onerror/
/:url/:size/:format/onerror/
```

-   Appending the string value `onerror` to any valid URL format will return empty content (no default image) if an opengraph image is not found at the target URL. This will trigger `<img onerror>` in the browser which you can handle on the client (e.g. `<img onerror="this.remove()">` to remove the image).

## Demos

`<img src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.netlify.com/small/" alt="OpenGraph Image for netlify.com">`

![OpenGraph Image for netlify.com](-VT3DFZsgDKX9.png)

`<img src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.11ty.dev/small/" alt="OpenGraph Image for 11ty.dev">`

![OpenGraph Image for 11ty.dev](-POTpIGtjAfGt.png)

`<img src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.zachleat.com/small/" alt="OpenGraph Image for zachleat.com">`

![OpenGraph Image for zachleat.com](-auPwgOAY13WU.png)

### Advanced: Manual Cache Busting

If the images aren’t updating at a high enough frequency you can pass in your own cache busting key using an underscore prefix `_` after your URL.

This can be any arbitrary string tied to your unique build, here’s an example that uses today’s date.

```
/:url/_20210802/
/:url/:size/_20210802/
/:url/:size/:format/_20210802/
```
