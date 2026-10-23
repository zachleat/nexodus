---
title: June 14, 2024 at 1:52:30 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2024-06-14T13:52:30.778Z
metadata:
  slug: '112615302809374708'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/112615302809374708
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/112615302809374708
  importHash: bb729c5d10b1915f
---
One of the lowest low hanging fruits I see browsing the web today is layout shift when an obtrusive scrollbar toggles on/off.

It happens when navigating between pages of varying length. It happens with poorly implemented menus/modals/dialogs that toggle \`overflow: hidden\`. It can happen when a particularly heavy/long page progressively renders.

\`html { overflow-y: scroll; }\` can fix it for some of these cases.

But primarily: test for obtrusive scrollbars, please!
