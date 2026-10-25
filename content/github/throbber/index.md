---
title: throbber
description: A loading indicator overlay for images (and maybe other things later).
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2024-02-15T18:35:24.000Z
metadata:
  name: zachleat/throbber
  language: JavaScript
  license: MIT
  homepage: https://zachleat.github.io/throbber/demo.html
  uuid: 11ty/import::github::zachleat/throbber
  type: github
  url: https://github.com/zachleat/throbber
  importHash: 2f9252b716765e80
---
# `<throb-ber>` Web Component

A web component to add a little baby rainbow gradient overlay until all of the images nested inside have finished loading. Works best with expensive dynamically generated images (like screenshots).

-   [Demos](https://zachleat.github.io/throbber/demo.html)
-   Used on the registration flow for [`conf.11ty.dev`](https://conf.11ty.dev/)

## Features

-   Customize minimum `delay` before the loading indicator is shown.
-   Customize loading indicator bar height.

## Installation

You can install via `npm` ([`@zachleat/throbber`](https://www.npmjs.com/package/@zachleat/throbber)) or download the `throbber.js` JavaScript file manually.

```
npm install @zachleat/throbber --save
```

Add `throbber.js` to your site’s JavaScript assets.

## Usage

```
<throb-ber>
	<img src="myimage.png" alt="" width="600" height="400">
</throb-ber>
```

### Change minimum delay

The minimum time before the loading indicator is shown. `delay` is in milliseconds (0.5 seconds shown).

```
<throb-ber delay="500">
	<img src="myimage.png" alt="" width="600" height="400">
</throb-ber>
```

### Customize appearance

Dark background while the image is loading, loading indicator fills up the component:

```
<throb-ber style="background-color: #666; --throbber-height: 100%;">
	<img src="myimage.png" alt="" width="600" height="400">
</throb-ber>
```

Use your own custom gradient:

```
<throb-ber style="--throbber-image: linear-gradient(to right, white, rebeccapurple); --throbber-opacity: 1">
	<img src="myimage.png" alt="" width="600" height="400">
</throb-ber>
```
