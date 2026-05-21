## Problem
The GitHub Actions workflow currently lives at `github/workflows/deploy.yml` (missing the leading dot). GitHub only picks up workflows from `.github/workflows/`.

## Changes

1. **Move workflow to correct path**
   - Move `github/workflows/deploy.yml` → `.github/workflows/deploy.yml`
   - Clean up empty `github/workflows/` directory

2. **Update build command from npm to bun**
   - The project uses `bun` (evident from `bun.lock`). The workflow currently runs `npm install` and `npm run build`.
   - Update to `bun install` and `bun run build` for consistency and speed.

3. **Verify `publish_dir: ./dist` matches Vite output**
   - Confirm the static `dist/` folder is produced at project root after `bun run build`.

## Technical details
- Workflow file content stays the same except `npm` → `bun` and `actions/setup-node` → `oven-sh/setup-bun`.
- No other project files affected.
