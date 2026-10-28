---
type: screen
tags: [app, screen, ui, camera]
---
# Camera Coach Screen (inside `#practice` when `P.cam`)

Rendered by `viewCamera(s, dots)`, then wired by `mountCamera()` after `route()` sets the HTML (`js/app.js:211–278`). Engine: [[Camera Coach Overview]].

## Layout
- Sign gloss + **Turn camera off** (`data-camoff`).
- `.cam-stage`: mirrored `<video>` + overlay `<canvas>` (CSS `scaleX(-1)`), a big countdown element, and a status bubble ("Starting camera…", "Loading hand tracking (first time takes a few seconds)…", "Waiting for camera permission…"). The stage's `aspect-ratio` is set from `videoWidth/videoHeight` on `loadedmetadata`.
- **Live line** (`#live-hand`): updated every frame from `frame.live`:
  - no face → "Move back so your face is in the picture."
  - no hands → "Looking for your hand…"
  - else "I see one/two hand(s), shaped like a <shape>, <zone>."
- Note: "The dashed outline shows where this sign happens. Sit so your face and chest are in view." (the overlay is drawn by `Coach.draw` from `CHECKS[id].at`.)
- `<details>` "How to sign X" with Hand/Where/Move + hook.
- Result area (`#cam-result`) and action row.

## Flow
1. `mountCamera()` → `Coach.setTarget(CHECKS[id])` and `Coach.start(video, canvas, onFrame, status)`. Errors: `NotAllowedError` → "Camera access is blocked. Allow the camera in your browser's address bar…"; anything else → "The camera couldn't start. Check that no other app is using it."
2. **Record my sign** → `recordSign()` (guarded by `recordingNow`): countdown "3, 2, 1" at 700 ms each, then "Sign now!" and `Coach.record(3000)` (3 seconds of frames).
3. `Coach.evaluate(frames, check)` ([[Evaluation and Scoring]]). Errors (no face / no hand) → message + **Try again** / **Skip**.
4. Otherwise three feedback rows — **Handshape**, **Location**, **Movement** — each ✓/✕ with a sentence:
   - Handshape: if two-handed sign but only one hand seen → "This sign uses both hands. I only saw one."; else "Looks like a X." or "I saw a Y. Try a W." (first two accepted shapes joined by "or").
   - Location: "Right place, <zone>." or "Your hand was <where>. Sign it <zone>."
   - Movement: "Movement looks right." or "Try to <hint>." using the *first* accepted movement.
5. If all three pass: "That matches!" + **Next sign** (`data-rate="1"`) / **Record again**. Otherwise "Close. Here's what to fix:" + **Try again** / **It was right, count it** (`data-rate="1"` — parent override).
6. **Skip** counts as a miss (`data-camskip` → `rate(id,false)`).

Leaving the screen calls `Coach.stop()` (stops camera tracks, `running=false`). The Holistic instance is kept so the next start is fast.

Entry points: Practice recall mode "Check with camera", or "Check with camera" on any sign card ([[Routine Detail Screen]]).
