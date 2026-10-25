---
title: May 20, 2026 at 4:41:29 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2026-05-20T16:41:29.774Z
metadata:
  slug: '116607896110608228'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/116607896110608228
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/116607896110608228
  importHash: d0952fc40ddf00fd
---
TIL Lighthouse is adding an Agentic Browsing metric:

[https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring](https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring)

That CLS is listed as a sub-metric seems like a big ol’ code smell to me (and reveals some brittle implementation?): are agents relying on element dimensions?

![1/2 Agentic Browsing (Lighthouse score report): Cumulative Layout Shift — 0.184](c6c549a2ce7f7848-7l8cCF4zP3Sm.png)
