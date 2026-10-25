---
title: February 24, 2023 at 4:27:40 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2023-02-24T16:27:40.187Z
metadata:
  slug: '109920653160588451'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/109920653160588451
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/109920653160588451
  importHash: 63800c9ce4a0dc46
---
\`npm install\` time (in seconds)

(forcing a clean cache, average of 5 runs)

Notably, next.js seems to bypass \`npm\` by vendoring its dependencies (speedier install, without those pesky npm audits)

![npm install time (in seconds) Astro: 12.5s Eleventy: 5.8s Gatsby: 43.3s Next.js: 3.2s Nuxt: 14.9s Remix: 40.1s SvelteKit: 6.7s](58e0cccc35462cde-0gJS4yhqe1fX.png)
