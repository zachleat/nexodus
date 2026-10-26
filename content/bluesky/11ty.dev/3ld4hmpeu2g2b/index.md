---
title: December 12, 2024 at 2:19:00 PM UTC
authors:
  - name: Build Awesome (11ty)
    url: https://bsky.app/profile/11ty.dev
date: 2024-12-12T14:19:00.992Z
metadata:
  slug: 3ld4hmpeu2g2b
  uuid: 11ty/import::rss::at://did:plc:i3khfmz4tvrcu7fwrdoqr4u2/app.bsky.feed.post/3ld4hmpeu2g2b
  type: bluesky
  url: https://bsky.app/profile/11ty.dev/post/3ld4hmpeu2g2b
  importHash: e57ab525e4c14cb8
---
For those following along, the AutoCopy plugin is now called Html Relative Passthrough Copy and is part of the \`addPassthroughCopy\` API.

Coming soon to an Eleventy canary release near you:

[Adds \`html-relative\` Passthrough Copy mode for relative asset references in HTML #3552 by zachleat · Pull Request #3573 · 11ty/eleventy](https://github.com/11ty/eleventy/pull/3573)  
export default async function(eleventyConfig) { // glob here is relative to project root eleventyConfig.addPassthroughCopy("content/\*\*/\*.mp4", { mode: "html-relative" }); }...
