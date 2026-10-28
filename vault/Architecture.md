---
type: architecture
tags: [architecture, project]
---
# Architecture

A **static single-page app**. No framework, bundler, package manager (root), backend, or tests. ~1,300 lines of first-party code (`index.html` 32, `styles.css` 213, `js/app.js` 357, `js/camera.js` 307, `js/signs.js` 138, `js/alphabet.js` 66, `js/abc.js` 210).

```
index.html
 ├─ styles.css                (design tokens, light/dark)
 ├─ vendor/holistic/holistic.js   → global `Holistic`
 ├─ js/signs.js               → globals ROUTINES, SIGNS, PHRASES, HANDSHAPES, CHECKS
 ├─ js/alphabet.js            → globals ABC_GROUPS, LETTERS, NUMBERS, SPELL_WORDS, SPELL_TIPS
 ├─ js/camera.js              → global `Coach` (IIFE module)
 ├─ js/abc.js                 → ABC tab views + logic (uses app.js helpers at runtime)
 └─ js/app.js                 → state S, views, router (runs `route()` on load)
```

Script load order matters (classic scripts, shared global scope): `holistic.js` → `signs.js` → `alphabet.js` → `camera.js` → `abc.js` → `app.js`. `abc.js` only *calls* `app.js` helpers (`S`, `esc`, `route`, `brand`…) at runtime, after everything has loaded, so being loaded before `app.js` is fine; it must not use them at load time (the one load-time statement, the `submit` listener, grabs `#app` with `document.getElementById`).

## Layers
| Layer | File | Responsibility |
|---|---|---|
| Content/data | `js/signs.js`, `js/alphabet.js` ([[Alphabet and Numbers]]) | Pure data: [[Routines and Signs Overview]], [[Phrases]], [[Handshape Cheat Sheet]], [[CHECKS Format]] |
| Vision engine | `js/camera.js` | `Coach`: webcam → MediaPipe → handshape/zone/movement → verdict. See [[Camera Coach Overview]] |
| App/UI | `js/app.js`, `js/abc.js` ([[ABC Screens]]) | State + localStorage, spaced repetition, string-template views, hash router, one delegated click handler |
| Presentation | `styles.css` | [[Design System]] |
| ML runtime | `vendor/holistic/` | [[MediaPipe Holistic Vendor Bundle]] |

## Rendering model
- Views are **functions returning HTML strings**; `route()` sets `app.innerHTML = html` on every navigation *and* after almost every user action (full re-render, no virtual DOM). All user text goes through `esc()`. See [[Router and Events]].
- Events: **one delegated click listener** on `#app` that switches on `button.dataset.*` (`data-go`, `data-open`, `data-learn`, `data-used`, `data-mode`, `data-reveal`, `data-rate`, `data-pick`, `data-next`, `data-again`, `data-camon/camoff/camhelp/record/camskip/camsign`, plus `data-abc` handled by `js/abc.js`). Tab bar links are plain `<a href="#...">`.
- Session-only practice state lives in module variable `P` (not persisted). Persistent state is `S` ([[Data Model and Storage]]).

## Data flow for the camera coach
`Practice screen` → `mountCamera()` → `Coach.setTarget(CHECKS[id])` + `Coach.start(video, canvas, onFrame, status)` → per-frame `onResults` builds `{body, hands, live}` → live label updates → user hits **Record** → `Coach.record(3000)` collects frames → `Coach.evaluate(frames, check)` → result rows rendered → `data-rate` records progress via `rate()`. Details: [[Camera Coach Screen]], [[Evaluation and Scoring]].

## External dependencies
- **Google Fonts** (Fredoka, Atkinson Hyperlegible) via `<link>` in `index.html` — the only network dependency besides optional outbound links.
- **Signing Savvy** — "Watch it signed ↗" opens `https://www.signingsavvy.com/search/<word>` in a new tab (search page, not a direct video).
- MediaPipe is **vendored locally** (loaded via `locateFile: f => "vendor/holistic/" + f`), so tracking works offline once served.

## Runtime constraints
- Camera (`getUserMedia`) needs a secure context: `http://localhost` works, `file://` does not. `Coach.whyNot()` returns `"file"`, `"preview"` (Holistic global missing) or `"browser"` (no mediaDevices), mapped to help text in `CAM_HELP`. See [[Running Locally]].
- Browser support target: Chrome/Edge.
