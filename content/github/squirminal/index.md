---
title: squirminal
description: The squirminal is a fake antique terminal web component
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2021-11-17T23:44:46.000Z
metadata:
  name: zachleat/squirminal
  language: HTML
  license: MIT
  homepage: https://squirminal.zachleat.dev/
  tags:
    - web-components
  uuid: 11ty/import::github::zachleat/squirminal
  type: github
  url: https://github.com/zachleat/squirminal
  importHash: 588930f1a7377db7
tags:
  - web-components
---
# Squirminal

The squirminal is a fake antique terminal web component

-   [Demo](https://squirminal.zachleat.dev/)

## Installation

```
npm install @zachleat/squirminal
```

## Usage

```
<squirm-inal>
[2021-11-17T23:41:07.790Z]  "GET /favicon.ico" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
[2021-11-17T23:41:07.791Z]  "GET /favicon.ico" Error (404): "Not found"
[2021-11-17T23:41:41.895Z]  "GET /demo.html" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0"
</squirm-inal>
<script type="module" src="squirminal.js"></script>
```

## Features

-   Works with `prefers-reduced-motion`
-   Works without JavaScript (fallback to show content)
-   Blinking cursor via `<squirm-inal cursor>`
-   Autoplay (only when visible) via `<squirm-inal autoplay>`
-   Works with text nodes inside any arbitrary HTML content.
-   Play/pause/reset button via `<squirm-inal buttons>`
-   Use `<squirm-inal dimensions>` to reduce layout shift during animation.

## Changelog

A list of breaking changes:

-   `v3.0.0` removed option to override tag name in `define()` function (it wasn’t supported in the rest of the code)
-   `v2.0.0` removed extensions `<squirminal-group>` and `<squirminal-form>` to simplify component maintenance

## Credits

-   [MIT](https://github.com/zachleat/squirminal/blob/HEAD/LICENSE)
