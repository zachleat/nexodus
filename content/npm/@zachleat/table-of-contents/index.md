---
title: '@zachleat/table-of-contents'
description: >-
  A zero-dependency web component that progressively enhances (or optionally
  client renders) a table of contents from the headings on the page and
  highlights visible sections.
authors:
  - name: Zach Leatherman
date: 2026-09-15T01:27:50.790Z
metadata:
  name: '@zachleat/table-of-contents'
  version: 2.0.0
  license: MIT
  homepage: https://github.com/zachleat/table-of-contents#readme
  repository: https://github.com/zachleat/table-of-contents
  tags:
    - web-components
    - custom-elements
    - table-of-contents
  uuid: 11ty/import::npm::@zachleat/table-of-contents
  type: npm
  url: https://www.npmjs.com/package/@zachleat/table-of-contents
  importHash: 2d1427a7be1876b9
tags:
  - web-components
  - custom-elements
  - table-of-contents
---
# `<table-of-contents>`

A zero-dependency web component that progressively enhances (or optionally client renders) a table of contents from the headings on the page and highlights visible sections. This component includes no styles (all visuals are app-code controlled).

## Installation

```
npm install @zachleat/table-of-contents
```

## Usage

```
<script type="module" src="table-of-contents.js"></script>

<nav aria-labelledby="toc-title">
	<table-of-contents>
		<h2 id="toc-title">Table of Contents</h2>
	</table-of-contents>
</nav>
```

Child content is kept and the list is added after it. Wrap it in a labeled `<nav>` so assistive technology can find it. The element is hidden when no headings match.

Entries for headings hidden by CSS (e.g. `display: none` on an ancestor) get the `hidden` attribute and update when visibility changes. The element is hidden when every heading is hidden.

A child `<ol>` or `<ul>` (for example, server-rendered) is used instead of generating one, and its `#` links are highlighted for headings matching `selector`.

Add `?nodefine` to skip auto-registration and define it yourself:

```
import { TableOfContents } from "./table-of-contents.js?nodefine";

TableOfContents.define("my-toc");
```

`?nodefine` reads `import.meta.url`, so it only works with unbundled ES modules.

## Attributes

-   `selector`: headings to include (default `main :is(h2, h3, h4, h5, h6)`). Headings without an `id` are listed without a link.

## Styling

No styles are included. Links for sections in view get the `toc-in-view` class.

# Changelog

-   `v2.0.0` tracks display of heading elements (and hides links when display is toggled off)
