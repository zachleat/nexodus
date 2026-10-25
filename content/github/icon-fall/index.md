---
title: icon-fall
description: A web component to rain Font Awesome icons down your web site.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2026-09-16T00:37:10.000Z
metadata:
  name: zachleat/icon-fall
  language: HTML
  license: MIT
  homepage: https://zachleat.github.io/icon-fall/demo.html
  uuid: 11ty/import::github::zachleat/icon-fall
  type: github
  url: https://github.com/zachleat/icon-fall
  importHash: 937b47b4f397f47f
---
# `<icon-fall>`

A web component to rain [Font Awesome](https://fontawesome.com/) icons down your web site. Extracted from [blog.fontawesome.com](https://blog.fontawesome.com/) and based on [`<snow-fall>`](https://github.com/zachleat/snow-fall).

-   [Demo](https://zachleat.github.io/icon-fall/demo.html)

## Installation

```
npm install @zachleat/icon-fall
```

```
<script type="module" src="icon-fall.js"></script>
```

## Usage

Child elements are the icons that fall. Multiple children are used in rotation.

```
<icon-fall>
	<i class="fa-solid fa-snowflake"></i>
</icon-fall>
```

### Font Awesome setups

-   **SVG+JS or Kits**: works as-is, `<i>` elements replaced with `<svg>` are picked up automatically.
-   **Web fonts (CSS)**: works as-is when the stylesheet URL includes `fontawesome` or `font-awesome` (it is copied into the shadow root, where page CSS doesn’t reach).
-   **Inline SVG** (copied from fontawesome.com or rendered with `@fortawesome/fontawesome-svg-core`): works as-is.
-   **SVG sprites**: `<svg><use href="#id"></use></svg>` references to same-document `<symbol>`s (e.g. from [`@11ty/font-awesome`](https://github.com/11ty/font-awesome)) are copied in automatically. Same-origin external sprites (`/sprites/solid.svg#star`) work too.

### Count

```
<!-- Default: 100 -->
<icon-fall count="200"></icon-fall>
```

A `ready` attribute is added after the first render.

### Colors and size

```
<!-- Colors are used in rotation, default: inherits `color` -->
<icon-fall style="--icon-fall-colors: #ff6b6b, #51cf66, #339af0"></icon-fall>

<!-- Default: 2em -->
<icon-fall style="--icon-fall-size: 3em"></icon-fall>
```

`--icon-fall-colors` is read when the icons render, so later changes (a dark mode toggle, say) don’t restyle existing icons.

### Use with `<is-land>`

Use [`<is-land>`](https://www.zachleat.com/web/is-land/) to respect reduced motion preferences:

```
<is-land on:media="(prefers-reduced-motion: no-preference)">
	<icon-fall>
		<i class="fa-solid fa-snowflake"></i>
	</icon-fall>
</is-land>
```

### Custom tag name

```
import { IconFall } from "@zachleat/icon-fall?nodefine";

class MyIconFall extends IconFall {
	static tagName = "my-icon-fall";
}

MyIconFall.define();
```
