---
title: January 22, 2025 at 3:36:18 PM UTC
authors:
  - name: Zach Leatherman
    url: https://bsky.app/profile/zachleat.com
date: 2025-01-22T15:36:18.304Z
metadata:
  slug: 3lgdp2ncc2s2z
  uuid: 11ty/import::rss::at://did:plc:xpchjovbk6sxl3bv74z7cs54/app.bsky.feed.post/3lgdp2ncc2s2z
  type: bluesky
  url: https://bsky.app/profile/zachleat.com/post/3lgdp2ncc2s2z
  importHash: 08f44d38f158de64
---
A few Eleventy build server image optimization tests for a current project (×1088 images):

formats: webp, auto =>  
❄️ cold: 4m 33s  
🔥 warm: 36s

formats: avif, webp, auto =>  
❄️ cold: 11m 32s  
🔥 warm: 38s

Do y’all think the AVIF build cost is worth it if the build server cache is ~always warm?
