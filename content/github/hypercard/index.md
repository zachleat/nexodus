---
title: hypercard
description: Web component to add a three-dimensional hover effect to a card.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2024-02-16T16:14:36.000Z
metadata:
  name: zachleat/hypercard
  language: HTML
  license: MIT
  homepage: https://zachleat.github.io/hypercard/demo.html
  uuid: 11ty/import::github::zachleat/hypercard
  type: github
  url: https://github.com/zachleat/hypercard
  importHash: 815f417998f2454c
---
# hypercard

A web component to add a three-dimensional hover effect to any arbitrary content.

**Full credit to this [3D card hover effect CodePen](https://codepen.io/markmiro/pen/wbqMPa) from [Mark Mironyuk](https://www.markmiro.com/).**

-   [Demo](https://zachleat.github.io/hypercard/demo.html)
    -   In use on the registration flow for [`conf.11ty.dev`](https://conf.11ty.dev/).
-   [Blog post](https://www.zachleat.com/web/hypercard/)

## Features

-   Respects `prefers-reduced-motion`.
-   Customize scale with `--hypercard-scale` CSS custom property.

## Installation

You can install via `npm` ([`@zachleat/hypercard`](https://www.npmjs.com/package/@zachleat/hypercard)) or download the `hypercard.js` JavaScript file manually.

```
npm install @zachleat/hypercard --save
```

Add `hypercard.js` to your site’s JavaScript assets.

## Usage

```
<hyper-card>Hello.</hyper-card>
```

### Not quite as big on hover

The default value is `1.07`.

```
<hyper-card style="--hypercard-scale: 1.03">Hello.</hyper-card>
```

### Make it perspectivier (change amount of tilt)

The default value is `min(2000px, 100vw)`.

```
<hyper-card style="--hypercard-perspective: 20vw">Hello.</hyper-card>
```

### Make the glow more or less opaque

The default value is `0.03`.

```
<hyper-card style="--hypercard-glow-opacity: .5">Hello.</hyper-card>
```

## Changelog

-   `v2.0.3` adds `--hypercard-glow-color`. Thanks [@chriskirknielsen](https://github.com/chriskirknielsen) (via [#5](https://github.com/zachleat/hypercard/pull/5))!
-   `v2.0.2` better transition on hover. Thanks [@chriskirknielsen](https://github.com/chriskirknielsen) (via [#3](https://github.com/zachleat/hypercard/pull/3))!
-   `v2.0.1` adds `--hypercard-glow-opacity`. Thanks [@ZackBoe](https://github.com/ZackBoe) (via [#2](https://github.com/zachleat/hypercard/pull/2))!
-   `v2.0.0` changes default perspective, configurable via `--hypercard-perspective`. Thanks [@chriskirknielsen](https://github.com/chriskirknielsen) (via [#1](https://github.com/zachleat/hypercard/pull/1))!
