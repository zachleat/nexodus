---
title: April 16, 2026 at 3:38:01 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2026-04-16T15:38:01.560Z
metadata:
  slug: '116415127981916435'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/116415127981916435
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/116415127981916435
  importHash: 3881091af9bde3d0
---
JavaScript addition using the new and upcoming Math.sumPrecise():

❌ 1 + 0.1 - 1 = 0.10000000000000009  
✅ Math.sumPrecise(\[1,.1,-1\]) = 0.1

❌ 1e20 + 0.1 - 1e20 = 0  
✅ Math.sumPrecise(\[1e20,.1,-1e20\]) = 0.1

❌ 0.1 + 0.2 = 0.30000000000000004  
❌ Math.sumPrecise(\[.1,.2\]) = 0.30000000000000004

Read more on MDN: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Math/sumPrecise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise)
