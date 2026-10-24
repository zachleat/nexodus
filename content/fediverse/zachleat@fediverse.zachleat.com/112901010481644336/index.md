---
title: August 4, 2024 at 12:51:43 AM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2024-08-04T00:51:43.881Z
metadata:
  slug: '112901010481644336'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/112901010481644336
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/112901010481644336
  importHash: a00fcba22ff487e1
---
Worth noting that Netlify’s On-demand Builders provide global persistence across all edge nodes: [https://www.netlify.com/blog/2021/10/25/faster-more-reliable-page-loads-with-update-to-on-demand-builders/](https://www.netlify.com/blog/2021/10/25/faster-more-reliable-page-loads-with-update-to-on-demand-builders/)

Alternatively, CloudFront has 13 Regional Edge Caches that (in my tests with a VPN) seem to be segmented too: [https://aws.amazon.com/cloudfront/features/?whats-new-cloudfront.sort-by=item.additionalFields.postDateTime&whats-new-cloudfront.sort-order=desc](https://aws.amazon.com/cloudfront/features/?whats-new-cloudfront.sort-by=item.additionalFields.postDateTime&whats-new-cloudfront.sort-order=desc)

CloudFront also offers an Origin Shield product that appears to provide a similar feature but I have not enabled it: [https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-hit-ratio.html#cache-hit-ratio-use-origin-shield](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-hit-ratio.html#cache-hit-ratio-use-origin-shield)
