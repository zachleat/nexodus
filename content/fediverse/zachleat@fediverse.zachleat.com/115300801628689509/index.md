---
title: October 1, 2025 at 8:30:10 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2025-10-01T20:30:10.789Z
metadata:
  slug: '115300801628689509'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/115300801628689509
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/115300801628689509
  importHash: c16ff450f8116663
---
is there really no low-level mechanism to intercept boolean primitive coercion in JavaScript?

why can’t I extend \`Boolean\` to make \`new MyBoolean(false)\` be \`falsy\`? (I understand why it isn’t, but I want to make it so)

\> Note: Unlike other type conversions like string coercion or number coercion, boolean coercion does not attempt to convert objects to primitives by calling user methods.

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Boolean#boolean\_coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#boolean_coercion)
