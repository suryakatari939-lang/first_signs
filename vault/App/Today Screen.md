---
type: screen
tags: [app, screen, ui]
---
# Today Screen (`#today`, `viewToday()`)

> **Replaced (2026-11-03).** The app-style redesign changed this screen; see [[App Layout and Screens]]. The notes below describe the old version and are kept for history.

Default landing view. Top to bottom:

1. **Header** (`brand`): logo + "First Signs" + `N day streak` pill (`streak()`).
2. **Sample banner** if `S.sample` ([[Data Model and Storage]]).
3. **Hero card "Today's 5 minutes"** — "`N` signs to practice", explanatory copy, chips for each sign in `todaysSet()` (`.chip.due` highlighted style if the sign already has a card, otherwise suffixed "· new"). Big **Start practice** button (`data-go="practice"` → resets `P`). See [[Spaced Repetition]].
4. **Mission card "Use it for real · <routine>"** — "Sign **X** with your child today", the sign's `say` prompt, buttons **We used it** (`data-used`), **How to sign it** (`data-open=<sign routine>` → [[Routine Detail Screen]]), and a count of real moments logged today.
5. **Daily routines** grid (`routineGrid()`): one card per routine with progress bar = signs *started* (have a card) ÷ routine size.

## Mission selection
- `moment` by local hour: `<10` → `meal`, `<17` → `play`, otherwise `bed`.
- If `S.mission` is set for today's `dayKey` and the sign exists, keep it. Otherwise pick the first **started** sign in that moment's routine, else the first sign in that routine.
- `S.mission = {id, day}` is assigned **during render** (saved by `route()`'s `save()`).
- The eyebrow shows the *current* time-of-day routine's name (`r`), which can differ from the stored mission sign's routine later in the day → [[Known Issues and Quirks]].

Related: [[Practice Screen]], [[Progress Screen]], [[Router and Events]].
