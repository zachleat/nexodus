---
title: December 14, 2023 at 2:42:09 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2023-12-14T14:42:09.129Z
metadata:
  slug: '111579295195494761'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/111579295195494761
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/111579295195494761
  importHash: abe63731f2b440cb
---
I see this experimental limbo for Node.js’ ESM \`vm.Module\` causing large scale problems elsewhere too, right?

Jest seems to be trying to stick to Node.js APIs (which is a good goal!) and people are migrating to Vitest for “stable” ESM support—but Vitest is using \`esbuild\` to sidestep the experimental status.
