---
type: screen
tags: [app, screen, ui, practice]
---
# Practice Screen (`#practice`, `viewPractice()`)

> **Replaced (2026-11-03).** The app-style redesign changed this screen; see [[App Layout and Screens]]. The notes below describe the old version and are kept for history.

Session object `P` (module variable, not persisted):
```js
P = { mode: "recall" | "pick", items: [signIds shuffled], i: 0, right: 0,
      revealed: false, answered: null, opts?: [4 ids], cam?: boolean }
```
`startPractice(mode)`: `set = todaysSet()` (fallback: 5 random signs if < 4), `learn()` every item, shuffle. Visiting `#practice` with no `P` auto-starts `"recall"`.

A segmented control switches modes (`data-mode`). **Switching mode starts a brand-new session** (drops the `cam` flag, and re-runs `todaysSet()` — because the earlier set was just `learn()`ed they are no longer "new", so different new signs get pulled in; see [[Known Issues and Quirks]]).

## Mode 1: "Try it yourself" (recall)
- Shows the big gloss + `say` situation: "Sign it with your hands, then check."
- **Show me the steps** → reveals Hand/Where/Move + hook, then "Did your sign match?" → **Not yet** (`rate 0`) / **Got it** (`rate 1`).
- **Check with camera** (`data-camon`) → sets `P.cam` and the screen becomes the [[Camera Coach Screen]]. If the camera isn't supported, the button instead reveals the `CAM_HELP` explanation for `Coach.whyNot()` (`file` / `preview` / `browser`).

## Mode 2: "Read & pick" (recognition quiz)
- Shows the written Hand/Where/Move; four options = the right sign + 3 random others (`P.opts`, shuffled once per question).
- Answer → `rate(id, ok)`; right/wrong styling; feedback "Yes! <hook>" or "That one is X. <hook>"; **Next** button.

## Session done
Progress dots (one per item), then "Session done": "`right` of `n` right" (pick) or "`right` of `n` felt solid" (recall). Copy nudges: "use one of these with your child before bed tonight." Buttons: **Practice again** (`data-again`, keeps `cam`), **Back to today**.

Ratings feed [[Spaced Repetition]]; every rating also calls `markDay()` → streak ([[Data Model and Storage]]).
