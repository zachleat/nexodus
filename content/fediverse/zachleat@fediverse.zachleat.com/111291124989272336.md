---
title: October 24, 2023 at 5:16:40 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2023-10-24T17:16:40.739Z
metadata:
  slug: '111291124989272336'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/111291124989272336
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/111291124989272336
  importHash: 5afd3333b6387453
---
This code might be useful to someone!

Here’s the Eleventy global data file used on 11ty.dev to show the lifetime npm downloads for the package in the footer.

[https://github.com/11ty/11ty-website/blob/main/src/\_data/npm.js](https://github.com/11ty/11ty-website/blob/main/src/_data/npm.js)

Features:  
1\. Works around the 18 month data limitation in the npm API.  
2\. Only the current year is refetched and updated. Previous years are cached forever (assuming your cache folder sticks around).
