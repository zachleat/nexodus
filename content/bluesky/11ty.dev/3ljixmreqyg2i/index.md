---
title: March 3, 2025 at 10:08:29 PM UTC
authors:
  - name: Build Awesome (11ty)
    url: https://bsky.app/profile/11ty.dev
date: 2025-03-03T22:08:29.254Z
metadata:
  slug: 3ljixmreqyg2i
  uuid: 11ty/import::rss::at://did:plc:i3khfmz4tvrcu7fwrdoqr4u2/app.bsky.feed.post/3ljixmreqyg2i
  type: bluesky
  url: https://bsky.app/profile/11ty.dev/post/3ljixmreqyg2i
  importHash: d085a5f11f49dde0
---
New image optimization recipe to save on build minutes.

Store your optimized output images in .cache for disk cache re-use (note: preserving .cache across builds is a host-dependent feature)

[Transform method option to put generated image disk cache in .cache folder · Issue #285 · 11ty/eleventy-img](https://github.com/11ty/eleventy-img/issues/285)  
This works today to store output images into .cache/ and then copy those assets to the output folder post-build: import fs from "node:fs"; import Image, { eleventyImageTransformPlugin } from "@11ty...
