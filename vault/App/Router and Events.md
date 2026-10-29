---
type: app-logic
tags: [app, router, events]
---
# Router and Events

## Hash routes (`route()`, `js/app.js:312`)
| Hash | View |
|---|---|
| `#today` (default / unknown) | `viewToday()` — [[Today Screen]] |
| `#routines` | `viewRoutines()` — [[Routines Screen]] |
| `#routines.<routineId>` (e.g. `#routines.meal`) | `viewRoutine(id)` — [[Routine Detail Screen]] (unknown id falls back to the list) |
| `#practice` | `viewPractice()` — [[Practice Screen]] (+ [[Camera Coach Screen]] when `P.cam`) |
| `#abc`, `#abc.letters`, `#abc.numbers`, `#abc.spell`, `#abc.practice` | `viewAbc(sub)` in `js/abc.js` — [[ABC Screens]] |
| `#progress` | `viewProgress()` — [[Progress Screen]] |

The hash is split on `"."` → `[tab, sub]`. Routine ids: `meal`, `bed`, `feel`, `family`, `play`, `safe`.

`route()` then:
1. sets `#app.innerHTML` (full re-render),
2. if on practice with camera on and unfinished → `mountCamera()`, else `Coach.stop()`,
3. updates `aria-current="page"` on the bottom tabs (non-listed hashes highlight Today),
4. `save()`.

`go(hash)`: if the hash already matches, calls `route()` directly (re-render); else sets `location.hash` (which fires `hashchange` → `route()`); scrolls to top.

## Click delegation (line 332)
One listener on `#app`; finds closest `button`, switches on `dataset`:

| data attr | Effect |
|---|---|
| `#reset` (id) | wipe to fresh empty state |
| `data-go="X"` | navigate; `go="practice"` first sets `P = null` (new session) |
| `data-open="routineId"` | go to `routines.<id>` |
| `data-learn="id"` | `learn(id)`, toast "X added to your practice" |
| `data-used="id"` | push `{id,t}` into `S.used`, `learn`, `markDay`, toast "Nice! That's real language for your child." |
| `data-mode` (recall or pick) | `startPractice(mode)` (new session, drops `cam`) |
| `data-reveal` | show steps (recall mode) |
| `data-rate` ("1" got it, "0" not yet) | `rate(current, got)`; score++ if got; advance index |
| `data-pick="id"` | quiz answer: `rate`, mark answered |
| `data-next` | next quiz question (clears `answered`, `opts`) |
| `data-again` | new session, keeps `cam` flag |
| `data-camon` / `data-camoff` | toggle `P.cam` |
| `data-camhelp` | reveal `CAM_HELP` text |
| `data-record` | `recordSign()` |
| `data-camskip` | `rate(current,false)`, advance |
| `data-camsign="id"` | from a sign card: `learn`, make single-item camera session, go practice |

The tab bar uses plain anchor links, so tapping **Practice** in the bar does *not* reset `P` (resumes), whereas "Start practice" on Today does.

## ABC events
Buttons with `data-abc="<action>"` (+ `data-val`) are handled by `abcClick(b)` in `js/abc.js`, called first in the click handler (`if (abcClick(b)) return;`). It returns `false` when the button has no `data-abc`, so all the actions above are untouched. The spell-a-word form uses a separate `submit` listener on `#app`. Actions: `learn start scope mode again reveal rate pick nextq word at prev next`.

## Gotchas
- Every action re-renders everything → focus and scroll position reset; camera video element is recreated each time (the MediaStream is reused, see `Coach.start`).
- `viewToday()` assigns `S.mission` during rendering ([[Known Issues and Quirks]]).
