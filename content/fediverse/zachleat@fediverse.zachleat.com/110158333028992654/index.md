---
title: April 7, 2023 at 3:52:47 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2023-04-07T15:52:47.171Z
metadata:
  slug: '110158333028992654'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/110158333028992654
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/110158333028992654
  importHash: 66da53b3cd3ffd6b
---
Here’s an HTML-only check for Declarative Shadow DOM support that I used in a demo just now:

\`\`\`  
\<div>  
\<p>Declarative Shadow DOM is \<strong>⚠️ not supported\</strong> in your browser.\</p>  
\<template shadowrootmode="open">  
\<p>Declarative Shadow DOM \<strong>✅ is supported\</strong> in your browser.\</p>  
\</template>  
\</div>  
\`\`\`
