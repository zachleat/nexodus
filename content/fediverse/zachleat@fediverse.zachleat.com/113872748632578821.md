---
title: January 22, 2025 at 3:37:31 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2025-01-22T15:37:31.350Z
metadata:
  slug: '113872748632578821'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/113872748632578821
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/113872748632578821
  importHash: 0f7e5d3e48e65b94
---
A few Eleventy build server image optimization tests for the project I’m currently working on (×1088 images):

formats: webp, auto =>  
❄️ cold cache: 4m 33s  
🔥 warm cache: 36s

formats: avif, webp, auto =>  
❄️ cold cache: 11m 32s  
🔥 warm cache: 38s

Do y’all think the AVIF build cost is worth it if the build server cache is ~always warm?
