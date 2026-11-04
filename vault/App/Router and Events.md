---
type: app-logic
tags: [app, router, events]
---
# Router and Events

## Hash routes (`route()` in `js/app.js`)
| Hash | View |
|---|---|
| `#learn` (default / unknown), also `#today` and `#routines` | `viewLearn()`: the lesson path ([[App Layout and Screens]]) |
| `#routines.<routineId>` (e.g. `#routines.meal`) | `viewRoutine(id)`: the sign guide ([[Routine Detail Screen]]) |
| `#lesson` | `viewLesson()`: full-screen lesson (needs `P`; without one it returns to Learn) |
| `#practice` | `viewPractice()`: practice modes + handshape cheat sheet |
| `#abc`, `#abc.letters`, `#abc.numbers`, `#abc.spell`, `#abc.practice`, `#abc.lessons`, `#abc.lesson-<id>`, `#abc.wordpractice` | `viewAbc(sub)` in `js/abc.js` ([[ABC Screens]]) |
| `#rewards` | `viewRewards()` |
| `#profile`, also `#progress` | `viewProfile()` |

`route()` then: toggles `body.lesson-mode` for `#lesson`; sets `#app.innerHTML`; fills `#rail` (empty during lessons); starts the camera (`mountCamera()`) when the current lesson step is a camera recall, else `Coach.stop()`; sets `aria-current` on the nav link (`#routines.*` highlights Learn); `save()`.

`go(hash)`: if the hash already matches, calls `route()`; else sets `location.hash` (the `hashchange` event calls `route()`); scrolls to top.

## Click handling
`onClick` listens on both `#app` and `#rail`. ABC buttons (`data-abc`) go to `abcClick()` first.

| data attr | Effect |
|---|---|
| `#reset` (id) | wipe to a fresh empty state, go to Learn |
| `data-askreset` | show the "Are you sure?" row on Profile |
| `data-go="X"` | navigate |
| `data-open="routineId"` | sign guide `routines.<id>` |
| `data-learn="id"` | `learn(id)`, toast |
| `data-used="id"` | add a real moment to `S.used`, `learn`, `markDay`, toast |
| `data-lesson="routineId:index"` | start that path lesson (`lessonFromSigns`) |
| `data-review="routineId"` | start the unit review |
| `data-start` (`mix`, `pick`, `recall`, `cam`) | start a practice mode (`startMode`) |
| `data-exit` | leave the lesson, back to `P.back` |
| `data-retry` | restart the same lesson with 5 hearts |
| `data-taught` | finish a teach step (`learn`, daily goal +1) |
| `data-reveal` | show the steps in a recall step |
| `data-rate` ("1" got it, "0" not yet) | `score()` (rate, XP, hearts), next step |
| `data-pick="id"` | answer a pick step |
| `data-next` | next step after feedback |
| `data-camon` / `data-camoff` | turn the camera on/off for recall steps |
| `data-camhelp` | show why the camera isn't available |
| `data-record` | `recordSign()` |
| `data-camskip` | counts as wrong (costs a heart), next step |
| `data-camsign="id"` | one-sign camera lesson from a sign card |
