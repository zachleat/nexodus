---
title: Table of Contents Web Component
authors:
  - name: Zach Leatherman
date: 2026-09-15T05:00:00.000Z
metadata:
  uuid: 11ty/import::atom::https://www.zachleat.com/web/table-of-contents/
  type: atom
  url: https://www.zachleat.com/web/table-of-contents/
  importHash: 54cc528e52ba3756
---
> …and another one.

This little (zero CSS) web component has two modes: progressively enhance a hierarchy of server rendered `<ol>` or `<ul>` elements (or conveniently client render them for you if they don’t exist) to highlight which are currently visible in the viewport.

I pulled this code out of the [`table-of-contents.webc`](https://github.com/11ty/tugboat/blob/main/_components/table-of-contents.webc) component from the [WebC Tugboat starter project](https://tugboat.11ty.dev/) for standalone use.

-   [**Demo**](https://zachleat.github.io/table-of-contents/demo.html)
    -   And a demo in the sidebar of this blog post on my website.
    -   And a server rendered demo on Blog Awesome, _e.g. [Font Awesome 7.3 Is Here!](https://blog.fontawesome.com/font-awesome-7-3-release/)_
-   [Source code](https://github.com/zachleat/table-of-contents)
-   [`@zachleat/table-of-contents` on npm](https://www.npmjs.com/package/@zachleat/table-of-contents)

You can configure a `selector` attribute to control the scope of the headings search. My site uses `main :is(h2, h3)` but the default is `main :is(h2, h3, h4, h5, h6)`.

Again, all styles for this component are application styles. There is no component CSS on this one.

## Installation

```
npm install @zachleat/table-of-contents
```

## Some sample headings

### Heading 3a

#### Heading 4 (via 3a)

### Heading 3b

#### Heading 4 (via 3b)

### Heading 3c
