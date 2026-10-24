---
title: January 30, 2023 at 9:37:57 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2023-01-30T21:37:57.084Z
metadata:
  slug: '109780315477387128'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/109780315477387128
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/109780315477387128
  importHash: 83392ca08f482e20
---
For everyone that uses GitHub Actions to run automated tests on a library that uses the \`sharp\` image processing module WITH the \`ava\` JS test runner in Node…

For \*all\* of those people that are doing that exact combination of things—make sure you run ava with \`--no-worker-threads\` or it will fail with a non-descriptive exitCode error message without any more information.
