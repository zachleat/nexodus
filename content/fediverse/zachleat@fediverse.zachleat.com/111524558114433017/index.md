---
title: December 4, 2023 at 10:41:47 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2023-12-04T22:41:47.556Z
metadata:
  slug: '111524558114433017'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/111524558114433017
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/111524558114433017
  importHash: a1f0c6f268bf3ab9
---
Vercel’s Next.js v14 has shipped and (as one does) I had a look at the JavaScript footprint of the production build of Hello World:

v14 (2023): 299 kB  
v13 (2022): 272 kB  
v12 (2021): 228 kB

Unfortunately the same trend continues, even with a new bundler: the bundles are growing!

(and with Tailwind included by default, too)

![A screenshot of Create Next App with the Chrome Devtools showing 299 kB of JavaScript loaded on the page from 6 requests (91.8 kB transferred)](9bcc24ac5d1c90c5-ZBoINaVMtcpo.png)
