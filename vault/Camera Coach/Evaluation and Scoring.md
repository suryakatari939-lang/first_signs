---
type: camera
tags: [camera, scoring, algorithm]
---
# Evaluation and Scoring (`Coach.evaluate`, `js/camera.js:268`)

Input: array of frames from a 3000 ms `Coach.record()` and the sign's `check` ([[CHECKS Format]]).

## Steps
1. Keep frames with a body. None → `error: "We couldn't see your face. Sit so your head and chest are in the picture."`
2. `F` = mean face width; `B` = body of the middle frame.
3. Build `tracks[0|1]` (left-landmark hand, right-landmark hand): frames where that hand and body exist, with `p = hand.ref[check.ref]`.
4. `seen` = tracks present in **≥ 25%** of all frames. None → `error: "We couldn't see your hand. Keep it in the picture and try again."`
5. `scoreTrack(track, pair)`:
   - `shapeOk` — ≥ **35%** of the track's frames have *any* of `check.shape` in the hand's shape Set
   - `zoneOk` — ≥ **30%** of frames have the ref point in `check.at` zone
   - `moveOk` — any flag in `check.move` true ([[Movement Detection]])
   - `saw` — most frequent `label` (for "I saw a Y-hand")
   - `at` — most frequent `whereIs` name (for "Your hand was at your chin")
6. **One-handed signs** (`hands:1`): score each seen hand, take the one with the highest `shapeOk+zoneOk+moveOk`; `handsSeen = seen.length`.
7. **Two-handed signs** (`hands:2`):
   - Need frames with *both* hands + body in ≥ 25% of frames; otherwise returns `shapeOk:false`, `handsSeen:1`, `handsNeeded:2` → UI says "This sign uses both hands. I only saw one."
   - Else score both tracks with the inter-hand `pair` distance series: `shapeOk = a && b` (**both** hands must match a shape), `zoneOk = a || b`, `moveOk = a || b`.
8. Return `{...res, handsNeeded: check.hands, check}`.

## Verdict (in `recordSign`, `js/app.js`)
Three rows — Handshape (`shapeOk && handsSeen ≥ handsNeeded`), Location (`zoneOk`), Movement (`moveOk`). All pass → "That matches!". Otherwise "Close. Here's what to fix:" with per-row advice. Parent can always press **It was right, count it**. See [[Camera Coach Screen]].

## Tuning knobs (if the coach is too strict/lenient)
| Where | Value |
|---|---|
| Frame presence | 0.25 of frames (hands seen) |
| Shape hit rate | 0.35 |
| Zone hit rate | 0.30 |
| Recording length | 3000 ms (`recordSign`), countdown 3-2-1 × 700 ms |
| Finger/zone/movement thresholds | [[Handshape Detection]], [[Zones and Body Landmarks]], [[Movement Detection]] |

Because `still` is always true and many signs accept `at:"body"`/`"any"`, a few signs are easy to "pass" with nearly any matching handshape — see [[Camera CHECKS Table]] and [[Known Issues and Quirks]].
