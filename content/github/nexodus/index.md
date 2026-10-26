---
title: nexodus
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2026-10-23T22:15:24.000Z
metadata:
  name: zachleat/nexodus
  language: Svelte
  homepage: http://zachleat.github.io/nexodus/
  uuid: 11ty/import::github::zachleat/nexodus
  type: github
  url: https://github.com/zachleat/nexodus
  importHash: e524455bf9454b38
---
# Nexodus

A demo of [`@11ty/import`](https://github.com/11ty/eleventy-import) to build a git-persisted archive of social posts (from Mastodon and Bluesky) for one or more users.

-   [Demo](https://zachleat.github.io/nexodus/)
-   [Source code](https://github.com/zachleat/nexodus)

## Sources

-   Mastodon
-   Bluesky

Cross-posts of the same text are grouped together.

## Stack

-   Templates use [`@11ty/eleventy-plugin-svelte`](https://github.com/11ty/plugin-template-languages/tree/main/svelte) (Svelte 5).
-   Search uses [Pagefind](https://pagefind.app/).
-   A GitHub Action imports new posts regularly and deploys to GitHub Pages.

## Usage

-   `npm run import` fetches new posts (set env `MASTODON_ACCESS_TOKEN` if you hit rate limits).
-   `npm start` runs a local server at `http://localhost:8347/`.
-   `npm run build` builds to `_site`.
