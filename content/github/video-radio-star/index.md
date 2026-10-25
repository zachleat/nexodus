---
title: video-radio-star
description: A lightweight web component helper for HTML5 videos.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2021-01-15T20:02:50.000Z
metadata:
  name: zachleat/video-radio-star
  language: HTML
  license: MIT
  homepage: https://zachleat.github.io/video-radio-star/demo.html
  uuid: 11ty/import::github::zachleat/video-radio-star
  type: github
  url: https://github.com/zachleat/video-radio-star
  importHash: f55246acbe38d8e3
---
# Video Radio Star

A lightweight web component helper for HTML5 videos. Intended for use with `muted` by default HTML5 videos.

-   [Demo](https://zachleat.github.io/video-radio-star/demo.html)
-   [Demo out of viewport using `preload="none"`](https://zachleat.github.io/video-radio-star/demo-preload-none.html)

## Installation

```
npm install @zachleat/video-radio-star
```

```
<video-radio-star>
  <video src="./media/flower.mp4" muted controls controlsList="nodownload" playsinline disablePictureInPicture disableRemotePlayback></video>

  <button type="button" data-play>Play</button>
  <button type="button" data-pause>Pause</button>
  <button type="button" data-mute>Toggle Mute</button>
</video-radio-star>
<script type="module" src="video-radio-star.js"></script>
```

## Features

-   Add classes for styling for:
    
    -   `radiostar-enhanced` (component initialized)
    -   `radiostar-muted`
    -   `radiostar-playing`
    -   `radiostar-paused`
    -   `radiostar-ended`
-   Only start playing when the video is visible in the viewport with `data-visible-autoplay` (via IntersectionObserver) Make sure you leave off the `autoplay` attribute in your markup.
    
    -   Optionally conditional on media query, e.g. `data-visible-autoplay="(min-width: 48em)`
    -   The `muted` attribute is required when using this feature.
    -   Don’t use the `autoplay` attribute.
-   Automatically pause video when it scrolls out of view (via IntersectionObserver)
    
-   Works as expected with `preload="none"`.
    
-   Sets `preload="none"` when [SaveData](https://caniuse.com/mdn-api_networkinformation_savedata) is true.
    
-   Disables `autoplay` when [`prefers-reduced-motion` is enabled](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
    
-   Use your own external mute/play/pause controls by adding `data-mute`, `data-play`, or `data-pause` respectively to one or more `<button>` elements.
    
-   iOS note: as of iOS version 14.4, even if you use `<track default>` iOS will not display captions by default unless it is enabled in Settings. Go to Settings -> Accessibility -> Subtitles & Captioning -> and make sure the Closed Captions + SDH option is selected.
    

## Credits

-   [MIT](https://github.com/zachleat/video-radio-star/blob/HEAD/LICENSE)
-   [Demo video from MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
