---
title: seven-minute-tabs
description: A minimal no-theme Tabs web component.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2020-04-27T14:28:12.000Z
metadata:
  name: zachleat/seven-minute-tabs
  language: JavaScript
  homepage: https://zachleat.github.io/seven-minute-tabs/demo.html
  uuid: 11ty/import::github::zachleat/seven-minute-tabs
  type: github
  url: https://github.com/zachleat/seven-minute-tabs
  importHash: 6dc6cdde011ff337
---
# Seven Minute Tabs

Tabs web component. Based heavily on the [Tabs with Automatic Activation example](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html) from [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel)

-   [Demo](https://zachleat.github.io/seven-minute-tabs/demo.html)

## Installation

```
npm install @zachleat/seven-minute-tabs
```

## Features

-   Code converted to be a web component.
-   All styles have been removed and this component operates correctly without CSS. For longevity of the code all styling is left to independent project-specific themes.
-   Progressively enhances from \<a> with anchor links pointing to content panels.
-   Adds `hidden` attribute to panels using JavaScript so that content still shows when JavaScript is not available.
-   Adds `tabindex` using JavaScript so that content remains accessibile without JavaScript.
-   Arrow key support. Adjusts for vertical `aria-orientation` values.
-   Home/end key support.
-   (Option to delete tabs was removed from the original example)

## Changelog

-   `v3.0.3` Add `autoheight` attribute to set a `--smt-height` CSS Custom Property (maximum height across all tabs) to maintain a consistent component height when switching tabs (e.g. `seven-minute-tabs [role="tabpanel"]) { min-height: var(--smt-height); }`)
-   `v3.0.1` Add `sync` attribute to activate all other matching tabs (in other tab groups) with the same `data-tab-persist="group:value"`.
-   `v3.0.0` New tab selection persistence (via `persist` attribute) logic with `data-tab-persist="group:value"`. Defaults to `localStorage`. Use `persist="session"` for `sessionStorage`.
-   `v2.0.2` Add `prune` attribute option to remove buttons that don’t have a matching panel.
-   `v2.0.1` Add `persist` attribute option to persist selected tab to sessionStorage.
-   `v2.0.0` Previous versions of this component required the `aria-selected`, `aria-labelledby`, `aria-controls`, and button/tab `id` attributes to exist in server rendered markup. If they don’t exist, they are now added automatically.

## License

-   [W3C](https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document)
