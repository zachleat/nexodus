---
title: May 9, 2023 at 7:31:27 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2023-05-09T19:31:27.365Z
metadata:
  slug: '110340386806795987'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/110340386806795987
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/110340386806795987
  importHash: eda9e35e8d79a2ab
---
I need to issue a correction for an earlier (deleted) toot about Next.js’ \<Image> and WebP support.

The default \`formats\` value is \`image/webp\` [https://nextjs.org/docs/pages/api-reference/components/image#formats](https://nextjs.org/docs/pages/api-reference/components/image#formats)

And using the Accept header to fallback to the original format: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Content\_negotiation/List\_of\_default\_Accept\_values#values\_for\_an\_image](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation/List_of_default_Accept_values#values_for_an_image)

With that reading it suggests that a JPEG or PNG source would work fine on Safari (prior to Mac OS Big Sur)—though I doubt a newer format input would work there but that’s a much smaller problem.

Appreciate the pushback [@flq](https://freiburg.social/@flq)!
