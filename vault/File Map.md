---
type: reference
tags: [files, reference]
---
# File Map

Repo root (`~32 MB`, almost all of it `vendor/`):

| Path | Lines/size | What it is |
|---|---|---|
| `README.md` | — | Intro, run instructions, how the coach works, file list |
| `index.html` | 32 | Shell: `<main id="app">`, bottom tab nav (Today / Routines / ABC / Practice / Progress) with inline SVG icons, script tags |
| `styles.css` | 273 | [[Design System]] — tokens, components, camera styles |
| `js/alphabet.js` | 99 | Alphabet/number/fingerspelling content, `ABC_SOURCES` (11 reference links) a `src` list per item, and `WORD_LESSONS` ([[Alphabet and Numbers]], [[Alphabet Sources and Verification]], [[Easy Word Lessons]]) |
| `js/abc.js` | 294 | ABC tab views, practice, spell-a-word, sources panel, easy-word lessons ([[ABC Screens]]) |
| `js/signs.js` | 138 | Content + `CHECKS` ([[Routines and Signs Overview]], [[CHECKS Format]]) |
| `js/app.js` | 357 | State, views, router (+3 one-line ABC hooks, see [[ABC Screens]]) |
| `js/camera.js` | 307 | `Coach` module ([[Camera Coach Overview]]) |
| `start-mac.command` | 4 | `cd` to folder, open browser after 1s, `python3 -m http.server 8000` |
| `update-and-start.command` | 20 | `git pull --ff-only` on `main` (if the folder is a git clone), pick a free port from 8000, open browser, `python3 -m http.server`. Run with `bash update-and-start.command`; setup steps in README "Run the latest version" |
| `start-windows.bat` | 7 | Opens browser, uses `py`, else `python`, else `npx --yes serve -l 8000 .` |
| `vendor/holistic/` | ~32 MB | [[MediaPipe Holistic Vendor Bundle]] |
| `vendor/fonts/` | ~144 KB | [[Design System]] — Fraunces, Roboto, Roboto Mono (SIL OFL) |
| `.gitignore` | — | Generic Node template (no relevant rules) |

## `js/app.js` function index
_Line numbers are from the original analysis; the 3 ABC hooks added later shift everything after ~line 296 down by 1–3 lines._

| Lines | Symbol | Purpose |
|---|---|---|
| 1–25 | `KEY`, `DAY`, `INTERVALS`, `load`, `save`, `dayKey`, `sampleState`, `S` | storage + sample data ([[Data Model and Storage]]) |
| 27–45 | `$`, `esc`, `byId`, `card`, `isKnown`, `isDue`, `videoUrl`, `shuffle`, `streak`, `markDay`, `toast` | helpers |
| 48–61 | `todaysSet`, `rate`, `learn` | [[Spaced Repetition]] |
| 64–73 | `brand`, `sampleBanner` | shared header + example-progress banner |
| 75 | `viewToday` | [[Today Screen]] |
| 112 | `routineGrid` | shared by Today and Routines |
| 122 / 128 | `viewRoutines` / `viewRoutine` | [[Routines Screen]] / [[Routine Detail Screen]] |
| 139 | `signCard` | one sign article |
| 155–203 | `P`, `startPractice`, `viewPractice` | [[Practice Screen]] |
| 206–278 | `CAM_HELP`, `viewCamera`, `mountCamera`, `recordSign` | [[Camera Coach Screen]] |
| 280 | `viewProgress` | [[Progress Screen]] |
| 311–354 | `app`, `route`, `go`, click handler, `hashchange` | [[Router and Events]] |

## `js/camera.js` function index
| Lines | Symbol | Purpose |
|---|---|---|
| 7–27 | landmark index arrays, `HAND_LINKS`, `SHAPE_NAMES`, `SHAPE_ORDER`, `ZONE_NAMES`, `MOVE_HINTS` | constants |
| 33–39 | `whyNot`, `supported` | environment check |
| 42–50 | `sub`, `dist`, `dist2`, `mean`, `angle`, `toPx` | geometry |
| 53 | `readBody` | face/pose → mouth, chin, forehead, cheeks, face width F, box, shoulders ([[Zones and Body Landmarks]]) |
| 82 / 98 | `inZone` / `whereIs` | zone tests |
| 107 | `readHand` | 21 points → shapes, openness, roll, reference points ([[Handshape Detection]]) |
| 148 / 163 / 186 | `onResults`, `draw`, `pump` | per-frame loop |
| 195 / 214 / 220 | `start`, `stop`, `record` | lifecycle |
| 226–265 | `reversals`, `range`, `avg`, `ends`, `movement` | [[Movement Detection]] |
| 268 | `evaluate` | [[Evaluation and Scoring]] |
| 306 | public API | `{supported, whyNot, start, stop, record, evaluate, setTarget, SHAPE_NAMES, ZONE_NAMES, MOVE_HINTS, _readHand}` |
