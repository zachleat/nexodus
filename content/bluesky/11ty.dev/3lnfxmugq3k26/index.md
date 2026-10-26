---
title: April 22, 2025 at 3:11:20 PM UTC
authors:
  - name: Build Awesome (11ty)
    url: https://bsky.app/profile/11ty.dev
date: 2025-04-22T15:11:20.572Z
metadata:
  slug: 3lnfxmugq3k26
  uuid: 11ty/import::rss::at://did:plc:i3khfmz4tvrcu7fwrdoqr4u2/app.bsky.feed.post/3lnfxmugq3k26
  type: bluesky
  url: https://bsky.app/profile/11ty.dev/post/3lnfxmugq3k26
  importHash: 77a1ff0019ffd449
---
New in Eleventy Bundle v3.0.4: a new option to populate per-route bundles with content right out of your HTML.

[github.com/11ty/elevent...](https://github.com/11ty/eleventy-plugin-bundle)

Here’s an example that puts all \`\<style>\` element content into a \`css\` bundle:

![// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle eleventyConfig.addBundle("css", { // Add all \<style> content to \`css\` bundle (use \<style eleventy:ignore> to opt-out) // Supported selectors: https://www.npmjs.com/package/posthtml-match-helper bundleHtmlContentFromSelector: "style", });](bafkreiagvs27jjvxoikd3ktiqlomb-tomXy2qzcUtN.webp)
