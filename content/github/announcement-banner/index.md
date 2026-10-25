---
title: announcement-banner
description: An announcement banner web component.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2020-11-27T02:58:02.000Z
metadata:
  name: zachleat/announcement-banner
  language: HTML
  license: MIT
  homepage: https://zachleat.github.io/announcement-banner/demo.html
  tags:
    - web-components
  uuid: 11ty/import::github::zachleat/announcement-banner
  type: github
  url: https://github.com/zachleat/announcement-banner
  importHash: 1f5df4e6813ed302
tags:
  - web-components
---
# announcement-banner

A reusable announcement bar banner component. If you don’t need a _Hide_ or _Close_ button on the banner (and to save the user preference), you don’t need this (just use CSS)!

-   [Demo](https://zachleat.github.io/announcement-banner/demo.html)
-   Read more at [_Ruthlessly Eliminating Layout Shift on Netlify.com_](https://www.zachleat.com/web/layout-shift/)

Features:

-   Hyperlink to a thing.
-   Limited visual style (bring your own theme)
-   JavaScript not required.
-   Close preference saved to local storage for future page loads
-   Frameworkless: Web component
-   No CLS (cumulative layout shift):
    -   Even when opted in to closed by default
    -   Even when JavaScript fails
    -   Even when JavaScript succeeds but runs after render
-   Use the `key` attribute (v1.0.5+) (or backwards compatible with `data-banner-key` 1.0.3+) to set your own storage key for comparison (defaults to the first link URL).

## Installation

1.  Install from [npm](https://www.npmjs.com/package/@zachleat/announcement-banner): `npm install @zachleat/announcement-banner --save`
2.  Inline helper script into your `<head>`

```
// Inline this into your <head>

// The current banner CTA URL
let latestBannerUrl = "YOUR_URL";
let savedKey = localStorage.getItem("banner--cta-url");

// Hide if the banner URL is the same as the saved preference banner URL
if(savedKey === latestBannerUrl) {
  document.documentElement.classList.add("banner--hide");
}
```

3.  Add `banner.css` and `banner.js` to your build CSS and JS.
4.  Add the markup:

```
<announcement-banner>
  <a href="YOUR_URL">YOUR_TEXT</a>
  <button type="button" data-banner-close>Close</button>
</announcement-banner>
```

## Changelog

-   `v1.0.6` npm package name changed from `herald-of-the-dog` to `@zachleat/announcement-banner`
