---
title: carouscroll
description: Add next/previous buttons to a horizontal scrollable container.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2024-01-31T14:03:16.000Z
metadata:
  name: zachleat/carouscroll
  language: HTML
  license: MIT
  homepage: https://zachleat.github.io/carouscroll/demo.html
  uuid: 11ty/import::github::zachleat/carouscroll
  type: github
  url: https://github.com/zachleat/carouscroll
  importHash: 859aa65c5ef4bed2
---
# carouscroll

A web component to add next/previous buttons to a horizontal scrollable container.

-   [Demos](https://zachleat.github.io/carouscroll/demo.html)

## Features

-   Interaction compatible with scroll or touch.
-   No layout shift. Make sure you include the CSS snippet!
-   (Optional) Smooth scrolling with `scroll-behavior: smooth`.
-   (Optional) `loop` attribute to enable looping around from start/end.
-   (Optional) Next/Previous buttons can be placed anywhere in the document.
-   (Optional) `<output>` element can accessibly announce the current slide number (out of total number of slides).

## Installation

You can install via `npm` ([`@zachleat/carouscroll`](https://www.npmjs.com/package/@zachleat/carouscroll)) or download the `carouscroll.js` JavaScript file manually.

```
npm install @zachleat/carouscroll --save
```

Add `carouscroll.js` to your site’s JavaScript assets.

## Usage

First you need to add some critical CSS to your page. These styles are **crucial** to reduce Layout Shift (CLS), set the aspect ratio of the slides, and to avoid loading `loading="lazy"` images on off-screen slides.

```
carou-scroll {
	display: flex;
	overflow-x: scroll;
	overflow-y: hidden;
}
carou-scroll > * {
	min-width: 100%;
	aspect-ratio: 16/9;
}
```

Next, add the HTML:

```
<carou-scroll id="my-scroller">
	<div class="demo-slide">1</div>
	<div class="demo-slide">2</div>
	<!-- … -->
</carou-scroll>
```

That’s it!

### Add buttons (optional)

For maximum flexibility, these buttons can be placed anywhere in the document and are tied by an `id` back to the parent scroller.

Make sure you think about the before/after JavaScript experience here. This component will remove `disabled` for you but you can add additional styling via your own CSS: `carou-scroll:defined {}`.

```
<button type="button" disabled data-carousel-previous="my-scroller">Previous</button>
<button type="button" disabled data-carousel-next="my-scroller">Next</button>
```

### Add output (optional)

This will update (and accessibly announce) a current status element with e.g. `Slide 1 of 10` text.

For maximum flexibility, this element can be placed anywhere in the document and is tied by an `id` back to the parent scroller.

```
<output data-carousel-output="my-scroller"></output>
```

### Make it loop around (optional)

Add the `loop` attribute.

```
<carou-scroll id="my-scroller" loop>
```

### Smooth scrolling CSS (optional)

```
carou-scroll {
	scroll-behavior: smooth;
}
```

### Add your own scroll snap CSS (optional)

```
carou-scroll {
	scroll-snap-type: x mandatory;
}
carou-scroll > * {
	scroll-snap-align: center;
}
```
