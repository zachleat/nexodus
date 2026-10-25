---
title: infinity-burger
description: A new kind of hamburger menu
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2015-12-09T02:23:41.000Z
metadata:
  name: zachleat/infinity-burger
  language: JavaScript
  license: MIT
  homepage: http://zachleat.github.io/infinity-burger/demo.html
  tags:
    - web-components
  uuid: 11ty/import::github::zachleat/infinity-burger
  type: github
  url: https://github.com/zachleat/infinity-burger
  importHash: 2e9fc1c28d0970cc
tags:
  - web-components
---
# infinity-burger

A new kind of hamburger menu.

No library dependencies. Cuts the mustard on [`CSSStyleSheet#replaceSync`](https://caniuse.com/mdn-api_cssstylesheet_replacesync). Demo on [zachleat.com](http://www.zachleat.com/web/) and [GitHub Pages](http://zachleat.github.io/infinity-burger/demo.html).

1.  Click once to start the animation. Uses a meandering horizontal position.
2.  Click again to reset to the initial state, a three layer hamburger menu.

## Markup:

```
<script type="module" src="infinity-burger.js"></script>
<infinity-burger></infinity-burger>
```

## Release Notes

-   `v1.0` and `v2.0`: Click states: (a) single vertical column (b) random position and rotation (c) resets back to vertical column (d) reset to three bars
-   `v3.0`: Simplifies the thing to two states (on and off), the menu just meanders a bit on the horizontal axis.
-   `v4.0`: Uses a custom element with Shadow DOM, simplifies markup and removes external stylesheet.
