---
title: March 22, 2023 at 2:57:24 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2023-03-22T14:57:24.687Z
metadata:
  slug: '110067518320134393'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/110067518320134393
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/110067518320134393
  importHash: 387abf379e16f624
---
[https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides) to override a outdated shrinkwrapped dependency was clutch today.

Trying to use \`lodash-cli\` with the latest version of \`lodash\` and this \`package.json\` addition did the trick:

!["devDependencies": { "lodash-cli": "^4.17.5" }, "overrides": { "lodash": "4.17.21" }](f98aa7dda79ee5bc-tuxgOZSNnna5.png)
