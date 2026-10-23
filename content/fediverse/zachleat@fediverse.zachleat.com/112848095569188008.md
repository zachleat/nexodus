---
title: July 25, 2024 at 4:34:46 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2024-07-25T16:34:46.395Z
metadata:
  slug: '112848095569188008'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/112848095569188008
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/112848095569188008
  importHash: 5d825d11bf3651a1
---
TypeScript TIL: \`compilerOptions.noResolve: true\` will also make all of your explicitly listed \`compilerOptions.types\` disappear.

So even with \`"types": \["node"\]\` you’ll still get errors that complain about clearly installed types.

\> Cannot find name 'process'. Do you need to install type definitions for node? Try \`npm i --save-dev @types/node\` and then add 'node' to the types field in your tsconfig.

Everything is fine.
