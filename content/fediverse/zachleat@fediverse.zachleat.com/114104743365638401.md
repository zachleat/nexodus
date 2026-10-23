---
title: March 4, 2025 at 2:56:50 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2025-03-04T14:56:50.046Z
metadata:
  slug: '114104743365638401'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/114104743365638401
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/114104743365638401
  importHash: 99ca2b6b9830759c
---
Just encountered a \*wild\* JavaScript bug.

App code:  
let myDate = DateTime.now();

Library code:  
\`myDate instanceof DateTime\` was false, why??

First thought: multiple different versions of \`DateTime\` ("luxon") package installed via npm? Nope.

Actual culprit:

App code:  
const { DateTime } = require("luxon");

Library code:  
import { DateTime } from "luxon";

Luxon exports different versions of DateTime for CommonJS and ESM 😭 I may never trust \`instanceof\` again 😬 Best friend .contructor.name now
