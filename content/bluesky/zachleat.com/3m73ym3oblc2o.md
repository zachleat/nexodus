---
title: December 3, 2025 at 5:35:40 PM UTC
authors:
  - name: Zach Leatherman
    url: https://bsky.app/profile/zachleat.com
date: 2025-12-03T17:35:40.265Z
metadata:
  slug: 3m73ym3oblc2o
  uuid: 11ty/import::rss::at://did:plc:xpchjovbk6sxl3bv74z7cs54/app.bsky.feed.post/3m73ym3oblc2o
  type: bluesky
  url: https://bsky.app/profile/zachleat.com/post/3m73ym3oblc2o
  importHash: 8e2668a25c755027
---
For interested folks, here’s the React PR that fixes CVE-2025-55182 affecting React Server Components (CVSS 10.0 Critical Severity): [github.com/facebook/rea...](https://github.com/facebook/react/pull/35277)

Relevant blog post: [react.dev/blog/2025/12...](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)

[Patch FlightReplyServer with fixes from ReactFlightClient by sebmarkbage · Pull Request #35277 · facebook/react](https://github.com/facebook/react/pull/35277)  
FlightReplyServer are for client-&gt;server and ReactFlightClient is for server-&gt;client. They&#39;re not 100% symmetrical. We did a number of refactors to ReactFlightClient in PRs like #29823 an...
