---
title: March 24, 2025 at 2:05:57 PM UTC
authors:
  - name: Zach Leatherman
    url: https://bsky.app/profile/zachleat.com
date: 2025-03-24T14:05:57.410Z
metadata:
  slug: 3ll4whanibc2m
  uuid: 11ty/import::rss::at://did:plc:xpchjovbk6sxl3bv74z7cs54/app.bsky.feed.post/3ll4whanibc2m
  type: bluesky
  url: https://bsky.app/profile/zachleat.com/post/3ll4whanibc2m
  importHash: efcd92175cbf528f
---
Update: looks like a huge flaw somewhere in the vulnerability scanner code being used by these tools (it doesn’t support namespaced packages)

More info:  
\- [github.com/jridgewell/g...](https://github.com/jridgewell/gen-mapping/issues/12)  
\- [github.com/anchore/gryp...](https://github.com/anchore/grype/issues/1701)  
\- It’s referencing this report from 2022 [github.com/advisories/G...](https://github.com/advisories/GHSA-8rmg-jf7p-4p22)

[gen-mapping flagged as malware · Issue #12 · jridgewell/gen-mapping](https://github.com/jridgewell/gen-mapping/issues/12)  
Hey @jridgewell, our build broke recently because of github is flagging your project as malware. I hope this is a false positive :) GHSA-8rmg-jf7p-4p22 Could you dispute it? There are apparently ot...
