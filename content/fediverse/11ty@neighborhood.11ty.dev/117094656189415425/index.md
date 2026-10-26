---
title: August 14, 2026 at 3:50:59 PM UTC
authors:
  - name: Build Awesome (11ty)
    url: https://neighborhood.11ty.dev/@11ty
date: 2026-08-14T15:50:59.141Z
metadata:
  slug: '117094656189415425'
  uuid: 11ty/import::rss::https://neighborhood.11ty.dev/@11ty/117094656189415425
  type: fediverse
  url: https://neighborhood.11ty.dev/@11ty/117094656189415425
  importHash: 0ddd5cd4b090991a
---
Add support for Drafts (in-progress content) using this five line config. This includes draft content during --serve or --watch but not with a regular build!

Learn more: [https://www.11ty.dev/docs/config-preprocessors/](https://www.11ty.dev/docs/config-preprocessors/)

![export default function ($config) { $config.addPreprocessor("drafts", "\*", (data) => { if (data.draft && process.env.ELEVENTY\_RUN\_MODE === "build") { return false; // skipped in prod, visible in --serve } }); }](d7955383add59c29-UHQfPcSPGJ7G.png)
