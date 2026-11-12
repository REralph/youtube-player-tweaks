# YouTube Player Tweaks

![Firefox](https://img.shields.io/badge/Firefox-extension-FF7139?logo=firefoxbrowser&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-CSS-F7DF1E?logo=javascript&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

A small Firefox extension that restyles the YouTube video player and adds a **Comments** button for
cinema (theatre) mode, so you can read the comments beside a large video instead of scrolling below it.

## Features

- **Player styling**: custom colours for the progress bar, the watched part and the scrubber dot,
  plus a slimmer, cleaner bar. All the values are plain CSS in [`player.css`](player.css), with a
  comment on every line you might want to change.
- **Comments panel in cinema mode**: a speech-bubble button appears next to the Autoplay switch.
  In theatre mode it opens YouTube's own comments as a panel on the right of the video and resizes
  the player to fit. Press it again to close the panel.
- **Lightweight and private**: no background script, no permissions beyond `youtube.com`, no data
  collected or sent anywhere.

## How it works

| File | Purpose |
|---|---|
| [`manifest.json`](manifest.json) | Manifest V3 definition; injects the CSS and script into `youtube.com` pages |
| [`player.css`](player.css) | Player look: progress bar colours, scrubber and sizing |
| [`cinema-comments.js`](cinema-comments.js) | Adds the Comments button, detects theatre mode and moves the comments into a side panel. It builds its icon with DOM/SVG calls rather than `innerHTML`, because YouTube's Trusted Types policy blocks raw HTML strings |
| [`cinema-comments.css`](cinema-comments.css) | Layout of the side panel and the player while it is open |
| [`SignForFirefox.bat`](SignForFirefox.bat) | Helper the author uses to sign the add-on with Mozilla so it installs permanently |

## Install

### Try it (until Firefox restarts)

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…** and pick `manifest.json` from this folder.

### Install permanently

Firefox only keeps add-ons that Mozilla has signed. With a free
[addons.mozilla.org API key](https://addons.mozilla.org/developers/addon/api/key/):

```bash
npx web-ext sign --source-dir . --channel unlisted --api-key YOUR_KEY --api-secret YOUR_SECRET
```

Then install the `.xpi` it creates from `about:addons` → gear icon → **Install Add-on From File…**.
After any change, raise `version` in `manifest.json` before signing again.

## Customising

Change the colours in `player.css` (each one is marked `<--`), reload the add-on in
`about:debugging`, and refresh YouTube.

## Licence

[MIT](LICENSE) © 2026 Ralph Estrocio
