---
type: camera
tags: [camera, coach, overview]
---
# Camera Coach Overview (`js/camera.js`, global `Coach`)

An IIFE module. Goal: decide if a parent's attempt at a sign matches its three components — **handshape, location, movement** — using MediaPipe Holistic landmarks. Everything runs locally in the browser. It is a *practice helper, not a certified ASL judge* (README).

## Pipeline
```
webcam (getUserMedia 960x720 ideal, facingMode user, no audio)
  → <video> → pump() (requestAnimationFrame; one holistic.send at a time via `busy`)
  → MediaPipe Holistic results: faceLandmarks, poseLandmarks, leftHandLandmarks, rightHandLandmarks
  → onResults():  readBody()  → body anchors (mouth/chin/forehead/cheeks/face width F/shoulders)   [[Zones and Body Landmarks]]
                  readHand()  → per hand: shapes Set, label, openness, roll, ref points           [[Handshape Detection]]
                  frame = { t, body, hands:[left,right], live:{shape,zone,hands,face} }
  → draw() overlay (dashed target zone + hand skeleton)  → listener(frame) updates UI live line
  → while `recording`, frames are pushed to an array
  → after 3000 ms: evaluate(frames, CHECKS[id])  → movement() + zone/shape hit rates              [[Movement Detection]], [[Evaluation and Scoring]]
```

## Holistic options (`start()`)
`modelComplexity: 0` (lite), `smoothLandmarks: true`, `refineFaceLandmarks: false`, `enableSegmentation: false`, `minDetectionConfidence: 0.5`, `minTrackingConfidence: 0.5`. Assets loaded from `vendor/holistic/` via `locateFile` ([[MediaPipe Holistic Vendor Bundle]]). `holistic.initialize()` is awaited once (cached in module var).

## Public API
`Coach.supported()`, `whyNot()`, `start(videoEl, canvasEl, onFrame, statusFn)`, `stop()`, `record(ms)`, `evaluate(frames, check)`, `setTarget(check)`, plus the label tables `SHAPE_NAMES`, `ZONE_NAMES`, `MOVE_HINTS` and `_readHand` (exposed for debugging/tests).

## Lifecycle details
- `start`: creates `Holistic` once; gets the media stream once (reused across signs); attaches to the new `<video>` each time; sets `running = true` and starts `pump()` if not already running.
- `stop`: `running=false`, `recording=null`, stops all stream tracks, nulls `stream`/`video`. Holistic instance remains.
- `pump` swallows `holistic.send` errors (`busy=false`) and keeps looping while `running`.
- Drawing: target zone dashed in marigold (`rgba(242,177,52,.95)`); left-landmark hand periwinkle `#94a1ff`, right-landmark hand teal `#4fc2b1`; white joint dots.
- Canvas and video are both mirrored with CSS so it behaves like a mirror (landmarks are computed on the un-mirrored frame, so geometry is unaffected).

## Parts
- [[Zones and Body Landmarks]] · [[Handshape Detection]] · [[Movement Detection]] · [[Evaluation and Scoring]]
- Per-sign targets: [[CHECKS Format]], [[Camera CHECKS Table]]
- UI integration: [[Camera Coach Screen]]
