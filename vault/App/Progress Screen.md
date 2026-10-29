---
type: screen
tags: [app, screen, ui]
---
# Progress Screen (`#progress`, `viewProgress()`)

1. Sample banner if applicable ([[Data Model and Storage]]).
2. Three stat tiles: **signs known** (box ≥ 2), **signs started** (cards), **real moments** (`S.used.length`).
3. **By routine**: bar per routine showing known ÷ total, with `k/n`. Note under it: "A sign counts as known after you get it right on two separate days." (the code does not enforce this — [[Known Issues and Quirks]]).
4. **Letters & numbers** panel (from `abcProgress()` in `js/abc.js`): known/total bars for the alphabet and numbers 1–10.
5. **Signs used with your child**: last 6 entries of `S.used` (newest first) with weekday/month/day; empty-state tells the parent to tap "We used it" on Today.
6. **Why this matters**: three stats (90%+, ≤40%, 70%) + a paragraph + a disclaimer: sign descriptions are written guides; use "Watch it signed" for video; learn alongside Deaf adults and local early intervention. Sources and context: [[Project Overview]].

Related: [[Spaced Repetition]], [[Today Screen]].
