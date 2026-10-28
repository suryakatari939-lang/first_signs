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
  - state: **`ext`** if `reach > 1.6` or (`reach > 1.45` and `bend < 35°`); **`curl`** if `reach < 1.15`; else **`bent`**
- `thumbOut` = dist(4,5)/palm > 0.55 **and** dist(4,9)/palm > 0.7
- `thumbUp` = thumbOut and tip 4 is above knuckle 5 by > 0.3 palm (y smaller)
- `spread` = dist(index tip 8, pinky tip 20)/palm > 0.85
- `pinch` = max(dist(8,4), dist(12,4))/palm < 0.5 **and** dist(16,4)/palm < 0.7 **and** ≤ 1 curled finger
- `gap` = dist(8,4)/palm

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
| `claw` | ≥ 3 bent and `spread` |

`SHAPE_ORDER` (most specific first) picks the single **`label`** used for live feedback: `ILY, Y, W, two, index, flatO, thumbsup, fist, claw, C, 5, flat`.

Display names (`SHAPE_NAMES`): flat-O, flat hand, open 5-hand, fist, thumbs-up, pointing finger, two fingers, W-hand, Y-hand, I-love-you hand, C-hand, claw hand.

## Other per-hand outputs
- `openness` = mean `reach` of the 4 fingers (hand open/closed signal for `open`/`close`/`squeeze`)
- `roll` = atan2 of vector pinky-knuckle(17) − index-knuckle(5), in degrees (wrist rotation for `twist`/`shake`)
- `ref` = `{ tips, index, thumb, center }` reference points ([[Zones and Body Landmarks]])
- `pts` = pixel landmarks (for drawing)

## Limits to remember
- The teaching list ([[Handshape Cheat Sheet]]) includes A, S, K and T handshapes, but the detector has no keys for them. The sign checks stand in with the closest detectable shape: `fist` for BATH, SORRY, YES, SHOES, POTTY and LOVE (A / S / T hands); `two` or `index` for CAREFUL (K hands). So the coach cannot distinguish A vs S vs T.
- Thresholds are hand-tuned heuristics; lighting, hand orientation (palm facing away from camera), occlusion and fast motion will fool them.

See usage in [[Evaluation and Scoring]]; per-sign accepted shapes in [[Camera CHECKS Table]].
