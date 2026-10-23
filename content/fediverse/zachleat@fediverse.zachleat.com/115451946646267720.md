---
title: October 28, 2025 at 1:08:20 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2025-10-28T13:08:20.729Z
metadata:
  slug: '115451946646267720'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/115451946646267720
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/115451946646267720
  importHash: fc9806b39107143a
---
TIL that CSS attr() cannot be used to compute anything in \`url()\` as the spec considers these to be “attr()-tainted” (for very valid security reasons): [https://drafts.csswg.org/css-values-5/#attr-security](https://drafts.csswg.org/css-values-5/#attr-security)

Thought maybe there was a way forward for global custom CSS-only favicons via new advancements in attr() [https://developer.chrome.com/blog/advanced-attr](https://developer.chrome.com/blog/advanced-attr) (but alas, no — which, in hindsight — seems valid and fair)
