---
title: April 16, 2026 at 3:38:41 PM UTC
authors:
  - name: Zach Leatherman
    url: https://bsky.app/profile/zachleat.com
date: 2026-04-16T15:38:41.718Z
metadata:
  slug: 3mjmqkbzosc24
  uuid: 11ty/import::rss::at://did:plc:xpchjovbk6sxl3bv74z7cs54/app.bsky.feed.post/3mjmqkbzosc24
  type: bluesky
  url: https://bsky.app/profile/zachleat.com/post/3mjmqkbzosc24
  importHash: 24c36e1fb4e0725c
---
JavaScript addition using the new and upcoming Math.sumPrecise():

❌ 1 + 0.1 - 1 = 0.10000000000000009  
✅ Math.sumPrecise(\[1,.1,-1\]) = 0.1

❌ 1e20 + 0.1 - 1e20 = 0  
✅ Math.sumPrecise(\[1e20,.1,-1e20\]) = 0.1

❌ 0.1 + 0.2 = 0.30000000000000004  
❌ Math.sumPrecise(\[.1,.2\]) = 0.30000000000000004

[Math.sumPrecise() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise)  
The Math.sumPrecise() static method takes an iterable of numbers and returns the sum of them. It is more precise than summing them up in a loop, because it avoids floating point precision loss in inte...
