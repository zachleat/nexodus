---
title: February 2, 2024 at 1:41:35 AM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2024-02-02T01:41:35.428Z
metadata:
  slug: '111859341421559511'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/111859341421559511
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/111859341421559511
  importHash: 960a4b20ac012ead
---
Wanted to make a global CSS change to my site (that wasn’t using scoped CSS) and wanted to know which pages would be affected.

Trotted out this still-useful old CLI tool to spider a URL and search for any matching CSS selectors: [https://www.zachleat.com/web/spider-pig/](https://www.zachleat.com/web/spider-pig/)

![spiderpig http://localhost:8090/web/ --selector="main .favicon-optin a\[href\] .z-avatar" Found 421 urls. Looking for urls with CSS selector "main .favicon-optin a\[href\] .z-avatar": 1: http://localhost:8090 ❌  No 2: http://localhost:8090/about/ ❌  No 3: http://localhost:8090/search/ ❌  No 4: http://localhost:8090/web/speaking/ ❌  No 5: http://localhost:8090/web/eleventy/ ❌  No 6: http://localhost:8090/web/feed/ ❌  No 7: http://localhost:8090/web/11tyconf/ ❌  No 8: http://localhost:8090/web/best-of/ ❌  No 9: http://localhost:8090/web/good-bad-web-components/ ✅  Yes (5 results) 10: http://localhost:8090/web/a-taxonomy-of-web-component-types/ ✅  Yes (11 results) 11: http://localhost:8090/web/jamstack-future/ ❌  No 12: http://localhost:8090/web/eleventy-v3-esm/ ❌  No 13: http://localhost:8090/web/thejam/ ❌  No 14: http://localhost:8090/web/what-the-jam/ ❌  No 15: http://localhost:8090/web/icymi/2023/ ✅  Yes (11 results) 16: http://localhost:8090/web/taylor-swift-fansite/ ❌  No 17: http://localhost:8090/web/netlify-and-nextjs/ ❌  No 18: http://localhost:8090/web/eleventy-v3-alpha/ ❌  No 19: http://localhost:8090/web/snow-fall/ ❌  No 20: http://localhost:8090/web/youtube-embeds/ ❌  No 21: http://localhost:8090/web/is-land/ ❌  No 22: http://localhost:8090/web/pagefind-search/ ❌  No 23: http://localhost:8090/web/live-editing-cloudcannon/ ❌  No 24: http://localhost:8090/web/w3c-banner-web-component/ ❌  No](5aaa0b7227dcc95f-2nFqZ1O3UCgW.png)
