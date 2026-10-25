---
title: line-numbers
description: A web component to add line numbers next to various HTML elements
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2025-06-05T16:55:51.000Z
metadata:
  name: zachleat/line-numbers
  language: HTML
  license: MIT
  homepage: https://zachleat.github.io/line-numbers/demo.html
  uuid: 11ty/import::github::zachleat/line-numbers
  type: github
  url: https://github.com/zachleat/line-numbers
  importHash: 2bf8e34a79c9b308
---
# Unencumbered `<line-numbers>` Web Component

-   [**Demo**](https://zachleat.github.io/line-numbers/demo.html)
-   [npm package](https://www.npmjs.com/package/@zachleat/line-numbers)

```
npm install @zachleat/line-numbers
```

## Features

-   ✅ `<pre>` supported
-   ✅ `<textarea>` supported (even when adding or removing lines)
-   ✅ CSS `overflow` supported (with obtrusive/visible or nonobtrusive scrollbars)
-   ✅ Numbers are excluded from content flow (not selectable, important for copy paste components!)
-   ✅ Use _any_ [CSS counter style](https://developer.mozilla.org/en-US/docs/Web/CSS/counter#counter-style) via `--uln-number-type`
-   ✅ Change the starting index for counter via (`<line-numbers start="999">`)
-   ✅ Numbers are unobtrusive by default to reduce layout shift (opt-in to obtrusive behavior via `<line-numbers obtrusive>`)

### Limitations

Trying to keep this one as simple as possible, so please note the following:

-   Line wrapping is **not** supported (`white-space: pre` or `white-space: nowrap` only, and this is enforced by the component)
-   Elements using `contenteditable` are **not** supported
