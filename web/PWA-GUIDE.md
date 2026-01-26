# Running Improvisator as a PWA

## Quick Start

### 1. Install dependencies

```bash
# From the root
npm install

# Or manually for each workspace
cd core && npm install
cd ../web && npm install
```

### 2. Build the core package

```bash
cd core
npm run build
```

### 3. Run the PWA in development

```bash
cd web
npm run dev
```

This opens `http://localhost:5173` in your browser automatically. You'll see the Improvisator app with the Headline Game.

## Features

- **Offline Support**: Service worker caches the app and assets
- **Installable**: Can be installed as an app on phones/desktops
- **Fast**: Vite for lightning-fast development
- **Shared Code**: Uses the core game logic from `core/`

## Building for Production

```bash
cd web
npm run build
```

Creates an optimized build in `web/dist/`:
- All assets are minified and hashed
- Service worker is auto-generated
- Web manifest is included
- Ready to deploy to any static host

## Deployment

Deploy the `web/dist/` folder to:
- **Netlify**: Drag & drop the dist folder
- **Vercel**: `vercel deploy`
- **GitHub Pages**: `npm run build && git add dist && git commit && git push`
- **Any static host**: Copy dist folder to web root

### Example: Netlify

```bash
npm run build
# Then drag web/dist folder to Netlify
```

### Example: Vercel

```bash
npm run build
vercel --prod
```

## Testing the PWA

### In Development
1. Open DevTools (F12)
2. Go to **Application** tab
3. Look at **Manifest** and **Service Workers**
4. Toggle offline in DevTools to test offline functionality

### Installation
- **Desktop (Chrome)**: Click install icon in address bar
- **Mobile (iOS)**: Share → Add to Home Screen
- **Mobile (Android)**: Menu → Install app

## Important Files

- [web/vite.config.ts](../web/vite.config.ts) - Vite + PWA plugin config
- [web/public/manifest.json](../web/public/manifest.json) - App manifest (name, icons, display mode)
- [web/src/sw.ts](../web/src/sw.ts) - Service worker (caching strategy)
- [web/src/App.tsx](../web/src/App.tsx) - Main React component

## Adding Icons

The app references these icon files (create them or use placeholders):
- `web/public/icon-192.png` (192×192)
- `web/public/icon-512.png` (512×512)
- `web/public/icon-192-maskable.png` (192×192, for adaptive icons)
- `web/public/icon-512-maskable.png` (512×512)
- `web/public/screenshot-wide.png` (540×720)
- `web/public/screenshot-narrow.png` (270×540)

For now, the app works without these (they're optional). Add real icons before publishing.

## Caching Strategy

The service worker uses:
- **Network first for API calls** (`/api/*`): Always try network, fall back to cache
- **Cache first for assets**: Use cached version if available, fetch fresh in background

Edit [web/src/sw.ts](../web/src/sw.ts) to change caching behavior.

## Troubleshooting

**Service worker not updating?**
- Open DevTools → Application → Service Workers → Unregister
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

**Icons not showing?**
- Run `npm run build` and check that icons are in `dist/`
- Icons are optional; app works without them

**Can't install app?**
- Must be served over HTTPS in production (localhost works in dev)
- Manifest must be valid and referenced in HTML
- Service worker must be registered

See [TESTING.md](../TESTING.md) for web component testing.
