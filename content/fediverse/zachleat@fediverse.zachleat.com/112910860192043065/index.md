---
title: August 5, 2024 at 6:36:38 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2024-08-05T18:36:38.535Z
metadata:
  slug: '112910860192043065'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/112910860192043065
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/112910860192043065
  importHash: 2eeed00a5b88e622
---
TIL about Vercel’s Pro Tier:

1 vCPU (default) = 1.72 GB memory

The UX of the GB-Hrs metric for usage pricing feels a bit like a dark pattern to me (given that default).

For example, the 1000 GB-Hrs of included execution time is 581 hours (using 1 vCPU). Overages advertised at $0.18/GB-Hr are $0.31/hour (using 1 vCPU).

Gonna change my stuff there to use 0.6 vCPU (since they’re services, not SSR): [https://vercel.com/docs/functions/configuring-functions/memory#setting-your-default-function-memory-/-cpu-size](https://vercel.com/docs/functions/configuring-functions/memory#setting-your-default-function-memory-/-cpu-size)
