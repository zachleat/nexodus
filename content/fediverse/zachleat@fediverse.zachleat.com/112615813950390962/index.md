---
title: June 14, 2024 at 4:02:30 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2024-06-14T16:02:30.170Z
metadata:
  slug: '112615813950390962'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/112615813950390962
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/112615813950390962
  importHash: 7ab2f5304fa93710
---
The vast official Windows terminal application landscape unfortunately complicates basic tasks.

Want to educate folks on the basic command used to create a file on the command line? The instructions are different for Command Prompt, Terminal/Windows PowerShell, and PowerShell Core.

POSIX and PowerShell Core:  
echo "# Header" > index.md

Command Prompt (no quotes):  
echo # Header > index.md

Windows PowerShell (\`>\` defaults to UTF16):  
echo "# Header" | out-file -encoding utf8 "index.md"
