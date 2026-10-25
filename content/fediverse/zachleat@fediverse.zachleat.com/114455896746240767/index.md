---
title: May 5, 2025 at 3:19:45 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2025-05-05T15:19:45.411Z
metadata:
  slug: '114455896746240767'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/114455896746240767
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/114455896746240767
  importHash: 94d6d5767593d8d8
---
TIL Chrome and Safari support dynamic creation of Import Maps in script 👀

Firefox does too but with a few \*hefty\* limitations:

1\. “Import maps are not allowed after a module load or preload has started” (separate non-module \`\<script>\`)  
2\. “Multiple import maps are not allowed.” 😭

![let importMap = { imports: { "@zachleat/noop": "https://unpkg.com/@zachleat/noop@1.0.4/index.js", } }; let s = document.createElement("script"); s.type = "importmap"; s.innerHTML = JSON.stringify(importMap); document.body.appendChild(s);](a3f9a83e673face8-th6pMrrGfwdo.png)
