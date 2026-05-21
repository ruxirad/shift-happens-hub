## Problem

Runtime error: `Cannot access 'g' before initialization`. This is a classic temporal dead zone error from a **circular import**:

- `ShiftHappensApp.tsx` imports all 7 screens
- `Screen3ChangeCurve.tsx` imports `STAGES` and `Stage` back from `ShiftHappensApp.tsx`

When the module graph evaluates, `STAGES` is referenced before its initializer runs, so the minified `g` (STAGES) throws on access. React's error boundary catches it → branded "This page didn't load" page renders.

## Fix

Extract the shared constants into their own module so neither side depends on the other.

1. Create `src/components/shift/stages.ts` exporting `Stage` type, `STAGES` array, and `Response` type.
2. Update `ShiftHappensApp.tsx` to import from `./stages` instead of defining them (and re-export for any external consumers — or just import directly).
3. Update `Screen3ChangeCurve.tsx` to import `STAGES, Stage` from `../stages`.
4. Update `Screen6Empathy.tsx` if it imports `Response` from `ShiftHappensApp` (check and switch to `../stages`).

No other behavioral changes. After the fix, the app loads normally.
