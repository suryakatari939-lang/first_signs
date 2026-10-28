---
type: app-logic
tags: [app, state, storage]
---
# Data Model and Storage

All persistent state is one JSON object `S` in `localStorage` under key **`firstsigns.v1`** (`js/app.js:2`). `save()` is wrapped in try/catch so a blocked storage never crashes the app; `load()` returns `null` unless the parsed object has a `cards` property.

```js
S = {
  sample: boolean,                 // true = showing example progress
  cards: { [signId]: { box: 0..6, due: msEpoch, seen: n } },
  days:  ["2026-10-28", ...],      // practice days, NOT zero-padded: "YYYY-M-D"
  used:  [{ id: signId, t: msEpoch }],   // "We used it" real-life moments
  mission: { id: signId, day: "YYYY-M-D" } | null   // today's chosen mission sign
}
```

- `dayKey(t)` = `getFullYear()-(getMonth()+1)-getDate()` — local time, no zero padding.
- `markDay()` pushes today's key into `days` (called by `rate`, `learn`, `used`).
- `streak()` counts consecutive days ending today (or yesterday if today isn't marked yet).
- A sign "exists" in practice once it has a `cards` entry. `Known` = `box >= 2` (`isKnown`). `Due` = card exists and `due <= now` (`isDue`). See [[Spaced Repetition]].

## Not persisted
`P` (the current practice session: mode, item list, index, score, reveal/answer state, `cam` flag, quiz options) is in-memory only. Refreshing the page loses an in-progress session. See [[Practice Screen]].

## Sample ("example progress") state
On first visit (no saved state) `sampleState()` seeds:
- cards for 9 signs: `eat:3, more:3, finish:2, milk:2, drink:1, mom:2, dad:1, sleep:1, ily:2` (value = box). `seen = box+1`.
- `due`: `drink` and `sleep` are 1 day **overdue**; the rest are due `INTERVALS[box]` days in the future.
- `days`: the two previous days → a 2-day streak.
- `used`: MORE, ALL DONE (`finish`) yesterday, I LOVE YOU (`ily`) two days ago.
- `sample: true`.

While `sample` is true, [[Today Screen]] and [[Progress Screen]] show a banner ("You're looking at example progress…") with a **Start fresh** button (`#reset`) which replaces `S` with an empty state (`sample:false`), clears `P`, saves, toasts "Fresh start. Welcome!". Note `sample` stays true through normal use until the user clicks it — real activity mixes into the sample data ([[Known Issues and Quirks]]).

## Clearing data manually
`localStorage.removeItem("firstsigns.v1")` in the console resets to sample state on next load.
