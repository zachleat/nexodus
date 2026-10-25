---
title: snow-fall
description: >-
  A web component to add snow to your web site (or to an element on your web
  site).
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2023-12-15T13:59:41.000Z
metadata:
  name: zachleat/snow-fall
  language: HTML
  license: MIT
  homepage: https://zachleat.github.io/snow-fall/demo.html
  uuid: 11ty/import::github::zachleat/snow-fall
  type: github
  url: https://github.com/zachleat/snow-fall
  importHash: 4d094d9b4f2d5105
---
# `<snow-fall>`

A web component to add snow to your web site (or to an element on your web site). Based off of [this Codepen](https://codepen.io/alphardex/pen/dyPorwJ) from [`alphardex`](https://codepen.io/alphardex).

-   [Demo](https://zachleat.github.io/snow-fall/demo.html)
-   [Related blog post](https://www.zachleat.com/web/snow-fall/)

## Usage

```
<script type="module" src="snow-fall.js"></script>

<!-- Add snow to the page -->
<snow-fall></snow-fall>

<!-- Add snow to the first child element -->
<snow-fall>
	<div style="width: 300px; height: 300px">
</snow-fall>
```

Installable from npm:

```
npm install @zachleat/snow-fall
```

### Use text content instead

_Added in v1.0.3_

```
<snow-fall text="❄️"></snow-fall>
<!-- works with --snow-fall-size too -->
```

### Use with `<is-land>`

This is best used with [`<is-land>`](https://www.zachleat.com/web/is-land/) to respect user preferences for reduced motion:

```
<is-land on:media="(prefers-reduced-motion: no-preference)">
	<snow-fall></snow-fall>
</is-land>
```

### Change the snow color

```
<!-- Change snow color -->
<snow-fall style="--snow-fall-color: rebeccapurple"></snow-fall>
```

### Change the number of snowflakes

```
<!-- Default: 100 -->
<snow-fall count="200"></snow-fall>
```

### Change the size of the snowflakes

_Added in v1.0.2_

```
<!-- Default: 10px -->
<snow-fall style="--snow-fall-size: 20px"></snow-fall>
```

### Force the rendering mode (page/element)

_You probably don’t need this._

```
<snow-fall mode="page"></snow-fall>
<snow-fall mode="element"></snow-fall>
```
