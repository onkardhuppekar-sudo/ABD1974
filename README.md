# CoreBTR Elite — Android/Samsung PWA

This package wraps the original CoreBTR Elite Question Bank HTML as a Progressive Web App. The embedded QBank content and original JavaScript logic are preserved.

## Contents
- `index.html` — complete QBank app
- `manifest.webmanifest` — install metadata
- `sw.js` — offline/service-worker layer
- `icons/` — Home-screen icons

## Important
A PWA cannot be installed by Chrome directly from `file://` on Android. Host this folder on any HTTPS static host (for example GitHub Pages, Netlify, Vercel, Cloudflare Pages, or your own HTTPS server), then open the HTTPS URL in Chrome/Samsung Internet.

### Android / Samsung tablet
1. Open the hosted HTTPS URL.
2. Let the page load once while online.
3. In Chrome: menu (⋮) → **Add to Home screen** / **Install app**.
4. Accept the name **CoreBTR**.
5. Launch it from the new Home-screen icon.

The service worker caches the app shell and dynamically caches question images/explanation images as you view them, allowing the corresponding material to remain available offline.
