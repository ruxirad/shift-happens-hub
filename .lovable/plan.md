# Shift Happens: Lunch & Learn — Facilitator App

A single-page interactive facilitation tool. 7 screens advanced manually via a "Next →" button, with a top progress bar and a subtle back link. Editorial dark theme matching the Shift Happens brand. All state is session-local (resets on reload).

## Design System (src/styles.css)

Replace the default tokens with the Shift Happens palette (oklch equivalents of the spec hexes):
- `--background` ≈ #060810 (near-black)
- `--surface` / `--card` ≈ #0A0E1A (deep navy)
- `--surface-2` ≈ #111827 (charcoal, for elevated cards)
- `--foreground` ≈ #F9FAFB
- `--muted-foreground` ≈ #8B9EC7 (used for facilitator notes)
- `--accent` / `--primary` ≈ #3B6FD4 (steel blue glow, used for progress, focus, CTA)
- `--border` ≈ subtle white/8%

Typography via Google Fonts in `__root.tsx` `<head>`:
- Headings: **Playfair Display** (serif)
- Body / UI: **Inter** (sans)

Add a global `--shadow-glow` using steel blue for hover states on primary CTAs and selected poll buttons. All animations: `fade-in` (200–400ms ease-out) only — no bounce.

## Architecture

Single route, single page — the entire experience is one route with screen-by-screen state:

```
src/routes/index.tsx         # hosts <ShiftHappensApp />
src/components/shift/
  ShiftHappensApp.tsx        # screen index state (0–6), progress bar, next/back chrome
  ProgressBar.tsx            # 7 segments, active = steel blue
  FacilitatorNote.tsx        # muted, smaller italic helper
  ScreenShell.tsx            # consistent padding/max-width, fade-in on mount
  screens/
    Screen1Welcome.tsx
    Screen2HumanSide.tsx     # 3 bullets fade in on click
    Screen3ChangeCurve.tsx   # SVG arc + hover tooltips + poll
    Screen4WhyFails.tsx      # 3 expandable cards + case quote
    Screen5MicroShifts.tsx   # 3 expandable cards
    Screen6Empathy.tsx       # input + floating bubble responses
    Screen7Wrap.tsx          # 3 recap cards + action challenge + CTAs
  ChangeCurveSVG.tsx         # arc with 7 plotted stages, hoverable
  PollBarChart.tsx           # simple bar chart driven by local state
  ResponseBubbles.tsx        # absolutely-positioned floating bubble layer
```

State lives in `ShiftHappensApp` via `useState`:
- `screenIndex: number`
- `pollVotes: Record<Stage, number>`
- `responses: { id, text, x, y }[]`

No router for sub-screens — using one route keeps facilitator "Next/Back" instant with no URL flicker, and matches "no data stored, no login" requirement.

## Screen-by-screen behavior

1. **Welcome** — Big serif "SHIFT HAPPENS", subhead, intro paragraph, icebreaker card, facilitator note.
2. **Human Side** — Pull quote in large serif. 3 bullets revealed sequentially on click of a "Reveal next" affordance (or by clicking each bullet placeholder). Facilitator note.
3. **Change Curve** — Custom SVG: a smooth cubic path forming the Kübler-Ross arc, 7 dots plotted along it with labels. Hover/tap shows a tooltip with the stage descriptor. Below: 7 buttons (one per stage) → clicking increments `pollVotes[stage]`. `PollBarChart` renders horizontal bars normalized to max vote, with vote count. Buttons highlight when selected (last clicked) but allow re-voting (it's anonymous/ambient).
4. **Why Fails** — 3 expandable cards (uses shadcn Accordion or custom). Pull-quote case study styled with large left border-accent.
5. **Micro-Shifts** — 3 expandable cards; each expanded view shows the "Try it" prompt in steel-blue accent.
6. **Empathy + Structure** — Prompt text, an `<input>` + submit. On submit, push `{id, text, x: random, y: random}` into `responses`. `ResponseBubbles` renders them with staggered fade-in inside a relative container above the input.
7. **Wrap-Up** — 3 recap cards fade in on mount (staggered). Action challenge in a highlighted block. Two `<a>` CTA buttons (Ebook + Field Guide — Field Guide URL placeholder `#` unless provided). Footer line.

## Chrome

- **Progress bar**: top of viewport, 7 equal segments separated by small gaps; current = steel blue with subtle glow, past = muted blue-gray, future = border color.
- **Back link**: top-left, small, muted, only visible when `screenIndex > 0`. Label: `← Back`.
- **Next button**: full-width fixed-ish bar at bottom (or sticky), label `Next →`; on screen 7 becomes `Restart ↺` which resets all state.

## SEO / head

Update `index.tsx` route `head()` with title "Shift Happens — Lunch & Learn", description from the intro line, og tags. Replace placeholder content in `src/routes/index.tsx`. Update `__root.tsx` title default.

## Open question

The "Field Guide Lovable app" CTA — do you have a URL for it, or should I leave it as `#` placeholder for now? (I'll default to `#` and a `// TODO` comment unless you specify.)

## Out of scope (per spec)

- No backend, no auth, no persistence (poll + bubbles reset on reload — intentional)
- No real-time multi-device sync (ambient single-screen use)
- No analytics
