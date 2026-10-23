---
title: October 28, 2024 at 9:07:01 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2024-10-28T21:07:01.250Z
metadata:
  slug: '113387085578296827'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/113387085578296827
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/113387085578296827
  importHash: 302f209be5f2416d
---
TIL Markdown hyperlink and image syntax doesn’t support whitespace in targets (\`href\` or \`src\` HTML attributes, respectively).

!\[Image\](space in filename.jpg)

is rendered as:

\<p>!\[Image\](space in filename.jpg)\</p>

😭
