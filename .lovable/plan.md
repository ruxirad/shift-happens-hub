## Goal

Convert the project from TanStack Start (SSR on Cloudflare Workers) to a plain Vite + React SPA so `npm run build` produces a static `/dist` deployable to GitHub Pages at `/shift-happens-hub/`.

The app itself is already fully client-side (single `ShiftHappensApp` component, no loaders, no server functions), so this is purely a build/runtime swap.

## Changes

### 1. Replace dependencies (`package.json`)

Remove:
- `@tanstack/react-start`, `@tanstack/router-plugin`, `@cloudflare/vite-plugin`
- `@lovable.dev/vite-tanstack-config`
- (keep `@tanstack/react-query` — still used; drop `@tanstack/react-router` since we'll use `react-router-dom` for HashRouter — simpler for GH Pages and avoids deep-link 404s)

Add:
- `react-router-dom`

### 2. New `vite.config.ts`

Standard Vite + React + Tailwind v4 + tsconfig-paths. `base: '/shift-happens-hub/'`. No Cloudflare, no TanStack Start plugin.

### 3. New entry files

- `index.html` at project root (Vite SPA convention) with `<div id="root">` and `<script type="module" src="/src/main.tsx">`, plus the Google Fonts `<link>` tags currently in `__root.tsx`, viewport, title, meta description.
- `src/main.tsx` — `ReactDOM.createRoot` mounting `<App />` inside `QueryClientProvider` and `HashRouter` (HashRouter avoids GH Pages 404 on refresh without needing a 404.html hack).
- `src/App.tsx` — minimal `<Routes>` with one route rendering `<ShiftHappensApp />`. (We can use BrowserRouter with basename `/shift-happens-hub/` if the user prefers clean URLs; HashRouter is the safer default for GH Pages.)

### 4. Delete TanStack Start scaffolding

- `src/routes/` (entire directory, including `__root.tsx`, `index.tsx`)
- `src/routeTree.gen.ts`
- `src/router.tsx`
- `src/server.ts`, `src/start.ts`
- `src/lib/error-capture.ts`, `src/lib/error-page.ts` (server-only)
- `wrangler.jsonc`

### 5. Keep as-is

All `src/components/shift/*`, `src/components/ui/*`, `src/hooks/*`, `src/lib/utils.ts`, `src/styles.css`. The app component does not import any TanStack Start APIs.

### 6. GitHub Pages workflow

`github/workflows/deploy.yml` already exists and is correct (npm install → npm run build → publish `./dist`). No change needed, though I'll note it should live at `.github/workflows/deploy.yml` (with the leading dot) for GitHub Actions to pick it up — will move/rename if it's not already there.

## Result

`npm run build` → `dist/index.html` + `dist/assets/*`, all asset URLs prefixed with `/shift-happens-hub/`. Push to `main` → GitHub Action publishes to Pages → app loads at `https://<user>.github.io/shift-happens-hub/`.

## Open question

HashRouter (URLs like `/#/`) vs BrowserRouter with basename (clean URLs but needs a `404.html` copy of `index.html` for refresh to work on GH Pages). The app is single-page with no deep links, so HashRouter is simpler and bulletproof — I'll use it unless you prefer clean URLs.
