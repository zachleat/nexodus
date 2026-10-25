---
title: May 5, 2025 at 3:21:50 PM UTC
authors:
  - name: Zach Leatherman
    url: https://bsky.app/profile/zachleat.com
date: 2025-05-05T15:21:50.647Z
metadata:
  slug: 3logobmcuok2y
  uuid: 11ty/import::rss::at://did:plc:xpchjovbk6sxl3bv74z7cs54/app.bsky.feed.post/3logobmcuok2y
  type: bluesky
  url: https://bsky.app/profile/zachleat.com/post/3logobmcuok2y
  importHash: 902ded477f18df0f
---
TIL Chrome and Safari support dynamic creation of Import Maps in script 👀

Firefox does too but with a few \*hefty\* limitations:

1\. “Import maps are not allowed after a module load or preload has started” (separate non-module \`\<script>\`)  
2\. “Multiple import maps are not allowed.” 😭

![let importMap = { imports: { "@zachleat/noop": "https://unpkg.com/@zachleat/noop@1.0.4/index.js" } }; let s = document.createElement("script"); s.type = "importmap"; s.innerHTML = JSON.stringify(importMap); document.body.appendChild(s);](bafkreigb3vro5fweehr6jbznxiggv-IttzJ3m2Izry.webp)
