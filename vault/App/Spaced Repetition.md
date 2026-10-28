---
type: app-logic
tags: [app, algorithm, srs]
---
# Spaced Repetition

A simple **Leitner-box** scheme in `js/app.js`.

```js
const INTERVALS = [0, 1, 2, 4, 7, 14, 30]; // days until next review, by box
```

## `rate(id, got)` (line 54)
```
c = cards[id] or {box:0, due:0, seen:0}
c.seen++
c.box = got ? min(c.box+1, 6) : 1
c.due = now + INTERVALS[got ? c.box : 0] * DAY      // note: a miss uses INTERVALS[0] = 0 → due immediately
cards[id] = c; markDay(); save()
```
- **Correct** → promote one box, schedule `INTERVALS[newBox]` days out (box 2 = 2 days, box 3 = 4 days, … box 6 = 30 days).
- **Miss** → drop to box 1 but `due = now` (interval index 0), so it stays in the due list right away.

## `learn(id)` (line 61)
If no card exists, creates `{box:1, due: now + 1 day, seen:1}` and marks the day. Triggered by: "Add to my practice", "We used it", starting a practice session (all items), camera "Check with camera" from a sign card.

## Known / Learning / New
- **New**: no card. **Learning**: card with box < 2. **Known**: box ≥ 2 (`isKnown`).
- Because `learn()` gives box 1 and one correct rating gives box 2, a sign becomes **Known after a single correct answer**, even though the Progress screen says "A sign counts as known after you get it right on two separate days." → [[Known Issues and Quirks]].

## `todaysSet()` (line 48) — the "Today's 5 minutes" list
1. `due` = all signs with a due card, sorted by box ascending (weakest first).
2. `fresh` = signs with no card, in `SIGNS` order (so new signs come in routine order: Mealtime first).
3. `newCount = max(2, 5 - due.length)`.
4. Result = `[...due.slice(0,5), ...fresh.slice(0,newCount)].slice(0,6)` → between 2 and 6 items; always includes ≥2 new signs while any remain.

## Session behaviour
`startPractice(mode)` uses `todaysSet()`; if fewer than 4 items, falls back to 5 random signs. It calls `learn()` on every item up front (so merely starting a session starts those signs), then shuffles. Details: [[Practice Screen]].

Related: [[Data Model and Storage]], [[Today Screen]].
