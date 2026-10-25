---
title: May 20, 2026 at 4:40:40 PM UTC
authors:
  - name: Zach Leatherman
    url: https://bsky.app/profile/zachleat.com
date: 2026-05-20T16:40:40.786Z
metadata:
  slug: 3mmcdugia322h
  uuid: 11ty/import::rss::at://did:plc:xpchjovbk6sxl3bv74z7cs54/app.bsky.feed.post/3mmcdugia322h
  type: bluesky
  url: https://bsky.app/profile/zachleat.com/post/3mmcdugia322h
  importHash: 3d46bfde752f4935
---
TIL Lighthouse is adding an Agentic Browsing metric:

[developer.chrome.com/docs/lightho...](https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring)

That CLS is listed as a sub-metric seems like a big ol’ code smell to me (and reveals some brittle implementation?): are agents relying on element dimensions?

![1/2 Agentic Browsing (Lighthouse score report): Cumulative Layout Shift — 0.184](bafkreifyl3qkwot3se6kf7dstppoa-4aKYojUgoQ8i.webp)
