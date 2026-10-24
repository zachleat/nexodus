---
title: August 4, 2024 at 12:38:46 AM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2024-08-04T00:38:46.067Z
metadata:
  slug: '112900959506802735'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/112900959506802735
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/112900959506802735
  importHash: 36d456b9b7a1550d
---
A few things here: Vercel’s Edge Network cache is segmented into 18 regions. Further, the cache eviction policy is “best-effort” and assets may be evicted before they’re stale: [https://vercel.com/docs/edge-network/caching#limits](https://vercel.com/docs/edge-network/caching#limits)

I suspect I was getting very few cache hits—not ideal at all for a screenshots service (or any resource intensive serverless function?). I wanted those images to request once and cache for as long as possible.
