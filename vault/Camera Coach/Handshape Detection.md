---
type: camera
tags: [camera, handshape, algorithm]
---
# Handshape Detection (`readHand`, `js/camera.js:107`)

Input: 21 MediaPipe hand landmarks (0 wrist; thumb 1–4; index 5–8; middle 9–12; ring 13–16; pinky 17–20). Converted to pixels (`z` scaled by width).

Landmark index arrays: `TIP=[4,8,12,16,20]`, `PIP=[3,6,10,14,18]`, `MCP=[2,5,9,13,17]`.

## Measurements
- `palm` = dist(wrist 0, middle-knuckle 9) — the unit for hand-scale thresholds.
- Each finger f ∈ {index, middle, ring, pinky}:
  - `reach` = dist(tip, wrist) / dist(MCP, wrist)
  - `bend` = angle between (PIP−MCP) and (TIP−PIP) vectors
  - state: **`ext`** if (`reach > 1.45` and `bend < 35°`) or (`reach > 1.75` and `bend < 50°`); **`curl`** if `reach < 1.0`; else **`bent`** (changed 2026-11-03, see [[#Claw fix (2026-11-03)]])
- `thumbOut` = dist(4,5)/palm > 0.55 **and** dist(4,9)/palm > 0.7
- `thumbUp` = thumbOut and tip 4 is above knuckle 5 by > 0.3 palm (y smaller)
- `spread` = dist(index tip 8, pinky tip 20)/palm > 0.85
- `pinch` = max(dist(8,4), dist(12,4))/palm < 0.5 **and** dist(16,4)/palm < 0.7 **and** ≤ 1 curled finger
- `gap` = dist(8,4)/palm
- `fanned` = dist(index middle joint 6, pinky middle joint 18) / dist(knuckle 5, knuckle 17) > 1.18 (fingers fan out from the knuckles)

## Shapes (a hand can match several; stored in a `Set`)
| Shape key | Rule |
|---|---|
| `flatO` | `pinch` |
| `flat` | ≥ 3 ext fingers **and** index ext |
| `5` | `flat` and `thumbOut` and `spread` |
| `fist` | ≥ 3 curl and index not ext |
| `thumbsup` | `fist` and `thumbUp` |
| `index` | index ext, other three not ext |
| `two` | index + middle ext, ring + pinky not |
| `W` | index + middle + ring ext, pinky not |
| `Y` | pinky ext, index/middle/ring not ext (**thumb not checked**) |
| `ILY` | index + pinky ext, middle + ring not (**thumb not checked**) |
| `C` | not pinch, ≥ 2 bent, ≤ 1 curl, 0.35 < gap < 1.6 |
| `claw` | not `pinch`, no straight finger, ≥ 3 bent, and `fanned` |

`SHAPE_ORDER` (most specific first) picks the single **`label`** used for live feedback: `ILY, Y, W, two, index, flatO, thumbsup, fist, claw, C, 5, flat`.

Display names (`SHAPE_NAMES`): flat-O, flat hand, open 5-hand, fist, thumbs-up, pointing finger, two fingers, W-hand, Y-hand, I-love-you hand, C-hand, claw hand.

## Other per-hand outputs
- `openness` = mean `reach` of the 4 fingers (hand open/closed signal for `open`/`close`/`squeeze`)
- `roll` = atan2 of vector pinky-knuckle(17) − index-knuckle(5), in degrees (wrist rotation for `twist`/`shake`)
- `ref` = `{ tips, index, thumb, center }` reference points ([[Zones and Body Landmarks]])
- `pts` = pixel landmarks (for drawing)

## Claw fix (2026-11-03)
The claw was often missed. A claw bends the fingers at the middle joints toward the camera, so the tips look close to the wrist: the old `curl` cutoff (`reach < 1.15`) called tightly bent claw fingers curled (a fist), the old `ext` rule called gently bent long fingers straight, and the old `spread` test (fingertips apart) failed because bent fingertips come together.

Fix: `curl` only below `reach 1.0` (a real fist's tips sit at about 0.7–0.86), `ext` needs a small bend, and the claw uses `fanned` (middle joints wider than the knuckles: claw about 1.27+, C-hand about 1.06–1.13).

Checked with synthetic 3D hands (8 poses incl. tight/normal/soft claws, fists, C, flat, 5, index, two, W, Y, ILY, flat-O; 8 camera angles; full and half depth, plus random jitter). Claw found: about 90% of noisy hands vs 8–55% before. No other shape became a claw except an occasional C (8%). That only matters for COME and SLEEP, the two signs that accept a claw but not a C. All other shapes read the same as before.

## Limits to remember
- The teaching list ([[Handshape Cheat Sheet]]) includes A, S, K and T handshapes, but the detector has no keys for them. The sign checks stand in with the closest detectable shape: `fist` for BATH, SORRY, YES, SHOES, POTTY and LOVE (A / S / T hands); `two` or `index` for CAREFUL (K hands). So the coach cannot distinguish A vs S vs T.
- Thresholds are hand-tuned heuristics; lighting, hand orientation (palm facing away from camera), occlusion and fast motion will fool them.

See usage in [[Evaluation and Scoring]]; per-sign accepted shapes in [[Camera CHECKS Table]].
