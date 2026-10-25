---
title: kickstarter-api
description: Web scraper for Kickstarter Campaign stats
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2026-05-14T19:05:45.000Z
metadata:
  name: 11ty/kickstarter-api
  language: JavaScript
  homepage: https://11ty.github.io/kickstarter-api/build-awesome-pro.json
  uuid: 11ty/import::github::11ty/kickstarter-api
  type: github
  url: https://github.com/11ty/kickstarter-api
  importHash: c47b3f22b5dbba9b
---
# kickstarter-api

Scheduled GitHub Actions scraper that publishes Kickstarter campaign stats as a static JSON endpoint via GitHub Pages.

## How it works

1.  A GitHub Actions cron job runs at a regular frequency determined by the YAML configuration file on the `gh-pages` branch
2.  Puppeteer scrapes `?format=json` from the Kickstarter campaign page
3.  Stats are written to `build-awesome-pro.json` and committed back to `gh-pages`
4.  GitHub Pages serves the file at:```
    https://11ty.github.io/kickstarter-api/build-awesome-pro.json
    ```
    

## Setup

### Create the repo and enable GitHub Pages

-   Create a new GitHub repo named `kickstarter-api`
-   Go to **Settings → Pages**
-   Set source to **Deploy from a branch**, branch `gh-pages`, folder `/docs`

### Consuming the endpoint in Eleventy

```
// _data/campaign.js
import Fetch from "@11ty/eleventy-fetch";

export default async function () {
  return Fetch(
    "https://11ty.github.io/kickstarter-api/build-awesome-pro.json",
    { duration: "1h", type: "json" }
  );
}
```

## Response shape

```
{
  "backers": 616,
  "pledged": 75921.0,
  "currency": "USD",
  "goal": 30000,
  "percentFunded": 253,
  "updatedAt": "2026-05-14T12:00:00.000Z"
}
```
