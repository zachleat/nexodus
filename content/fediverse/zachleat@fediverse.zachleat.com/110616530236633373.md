---
title: June 27, 2023 at 1:58:21 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2023-06-27T13:58:21.711Z
metadata:
  slug: '110616530236633373'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/110616530236633373
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/110616530236633373
  importHash: 9798eb31bd44a21b
---
Next.js bundles a Canary version of React to support a feature that Next has marked as stable (app dir): [https://nextjs.org/blog/next-13-4#nextjs-app-router](https://nextjs.org/blog/next-13-4#nextjs-app-router)

This follows React design goals: [https://react.dev/blog/2023/05/03/react-canaries#tldr](https://react.dev/blog/2023/05/03/react-canaries#tldr)

However, the weak link here is that React doesn’t guarantee semver in Canary releases, so \*of course\* things are going to break. If any deps up the chain break semver, your release also breaks semver.

Fred is right to call this out: [https://twitter.com/FredKSchott/status/1673342700651704330](https://twitter.com/FredKSchott/status/1673342700651704330)
