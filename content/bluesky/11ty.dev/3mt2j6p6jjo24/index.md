---
title: August 14, 2026 at 3:50:57 PM UTC
authors:
  - name: Build Awesome (11ty)
    url: https://bsky.app/profile/11ty.dev
date: 2026-08-14T15:50:57.571Z
metadata:
  slug: 3mt2j6p6jjo24
  uuid: 11ty/import::rss::at://did:plc:i3khfmz4tvrcu7fwrdoqr4u2/app.bsky.feed.post/3mt2j6p6jjo24
  type: bluesky
  url: https://bsky.app/profile/11ty.dev/post/3mt2j6p6jjo24
  importHash: 47012aea67d49180
---
Add support for Drafts (in-progress content) using this five line config. This includes draft content during --serve or --watch but not with a regular build!

![export default function ($config) { $config.addPreprocessor("drafts", "\*", (data) => { if (data.draft && process.env.ELEVENTY\_RUN\_MODE === "build") { return false; // skipped in prod, visible in --serve } }); }](bafkreib2dad35kbb3x7ytjxiwqema-zkMsM1HpHIy1.webp)
