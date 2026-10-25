---
title: netlify-kasa-build-status
description: A little script to update my lights with the status of a Netlify build
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2020-12-09T03:57:07.000Z
metadata:
  name: zachleat/netlify-kasa-build-status
  language: JavaScript
  license: MIT
  uuid: 11ty/import::github::zachleat/netlify-kasa-build-status
  type: github
  url: https://github.com/zachleat/netlify-kasa-build-status
  importHash: 5d5b7d901708e992
---
# netlify-kasa-build-status

I have two KL130 smart bulbs from Kasa (TPLink). I have a Netlify build that runs to deploy my site. I wanted to show the status of my last two web site builds.

-   Gnarly code warning: My lights are aliased as `Office 1` and `Office 2` and the code relies on these labels. Change the prefix in `netlify-build-lights.js`
-   Rename `sample.env` to `.env` and fill in the values.
    -   Find a [NETLIFY\_TOKEN](https://app.netlify.com/user/applications#personal-access-tokens).
    -   Find your Netlify site’s API ID on the Site details page. Mine was `https://app.netlify.com/sites/11ty/settings/general`
