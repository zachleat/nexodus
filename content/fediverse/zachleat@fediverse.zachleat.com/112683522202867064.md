---
title: June 26, 2024 at 3:01:36 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2024-06-26T15:01:36.113Z
metadata:
  slug: '112683522202867064'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/112683522202867064
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/112683522202867064
  importHash: f2b5ac30b75d7b95
---
One lesson I’m taking away from the axobject-query incident: there isn’t a formal agreement about which npm packages are isomorphic JavaScript friendly (intended for both client & server).

Notably the \`browser\` key in package.json is documented as to be used \*instead\* of \`main\` (not both): [https://docs.npmjs.com/cli/v10/configuring-npm/package-json#browser](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#browser) (and axobject-query does not use \`browser\`)

Assuming that packages are client bundle friendly without tacit agreement from the maintainers of those packages is perilous!
