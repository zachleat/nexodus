---
title: '@zachleat/details-utils'
description: A collection of utilities to progressively enhance <details> with new features
authors:
  - name: Zach Leatherman
    url: https://zachleat.com/
date: 2022-01-31T23:30:01.006Z
metadata:
  name: '@zachleat/details-utils'
  version: 3.0.0
  license: MIT
  homepage: https://github.com/zachleat/details-utils#readme
  repository: https://github.com/zachleat/details-utils
  uuid: 11ty/import::npm::@zachleat/details-utils
  type: npm
  url: https://www.npmjs.com/package/@zachleat/details-utils
  importHash: 9473d3a54b83a267
---
# `<details-utils>`

-   [All Demos](https://zachleat.github.io/details-utils/demo.html)
-   [Blog post on zachleat.com: Add Responsive-Friendly Enhancements to `<details>` with `<details-utils>`](https://www.zachleat.com/web/details-utils/)

Related work elsewhere:

-   [`spicy-sections`](https://github.com/tabvengers/spicy-sections)

## Installation

-   [Available on npm](https://www.npmjs.com/package/@zachleat/details-utils)

```
npm install @zachleat/details-utils
```

Add `details-utils.js` to your bundle.

## Usage

Wrap `<details-utils>` around one or more `<details>` elements to add enhancements to their behavior:

-   Click outside to close (also bind an optional close button)
-   Animate open and close (obeys `prefers-reduced-motion`)
-   Force open/closed based on:
    -   JavaScript
    -   Media query
        -   (e.g. viewport size, `prefers-reduced-motion`, even `prefers-reduced-data` if browsers ever support it 😅)
        -   Optionally restores user state when media query does not match (use `force-restore` attribute)
-   Close via `esc` Key
    -   With optional Media query.
-   Toggle Document Class (toggles a class on `<html>` when active, useful for modals to disable document overflow)

## Changelog

### v2.0.0

-   Renamed attribute `force-closed` to `force-close`
-   Added `force-open` to complement `force-close`
-   Added `force-restore` to be used with `force-open` and `force-close` (restores state when media query does not match).
