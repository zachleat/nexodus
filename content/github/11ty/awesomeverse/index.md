---
title: awesomeverse
description: An archive of the entire Awesomeverse.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2026-10-27T15:22:37.000Z
metadata:
  name: 11ty/awesomeverse
  language: Svelte
  uuid: 11ty/import::github::11ty/awesomeverse
  type: github
  url: https://github.com/11ty/awesomeverse
  importHash: a86f2049f1b15e69
---
# Across the Awesomeverse

A git-persisted archive of posts about [Font Awesome](https://fontawesome.com/), [Web Awesome](https://webawesome.com/), and [Build Awesome](https://build.awesome.me/), built with [`@11ty/import`](https://github.com/11ty/eleventy-import).

-   [Source code](https://github.com/11ty/awesomeverse)
-   Based on [Nexodus](https://github.com/zachleat/nexodus)

## Sources

-   Bluesky
-   Mastodon
-   npm
-   YouTube
-   Blogs (Blog Awesome, the Font Awesome changelog, and the 11ty blog)
-   Hacker News

Sources are configured per project in `import.config.js`. Cross-posts of the same text are grouped together.

## Stack

-   Templates use [`@11ty/eleventy-plugin-svelte`](https://github.com/11ty/plugin-template-languages/tree/main/svelte) (Svelte 5).
-   Icons use [`@11ty/font-awesome`](https://github.com/11ty/eleventy-plugin-font-awesome), and the header uses [`awesome-nav`](https://github.com/FortAwesome/awesome-nav).
-   Search uses [Pagefind](https://pagefind.app/).
-   A GitHub Action imports new posts regularly and deploys to GitHub Pages.

## Usage

-   `npm run import` fetches posts from the last two years (set env `MASTODON_ACCESS_TOKEN` if you hit rate limits).
-   `npm start` runs a local server at `http://localhost:8347/`.
-   `npm run build` builds to `_site`.
-   `npm run reset` removes all imported posts.
