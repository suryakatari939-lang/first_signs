---
type: camera
tags: [camera, movement, algorithm]
---
# Movement Detection (`movement()`, `js/camera.js:239`)

Operates on a *track* = per-frame `{h: hand, p: ref point, B: body}` for one hand over the 3-second recording. `F` = average face width over the recording; `B` = body from the middle frame. `pair` (two-handed signs only) = per-frame distance between the two hands' `center` points.

## Helpers
- `reversals(vals, thr)` — counts direction changes with hysteresis (ignores wiggles smaller than `thr`). Used as a robust "number of back-and-forths".
- `ends(a)` — averages of the first and last 20% of samples → `[start, end]` (noise-resistant).
- `range(a)` = max − min; `avg(a)`.

## Derived signals
| Signal | From |
|---|---|
| `rx`, `ry` | reversals of ref-point x / y, threshold 0.1F |
| `ro` | reversals of finger `openness`, threshold 0.1 |
| `rr` | reversals of hand `roll`, threshold 15° |
| `rd` | reversals of the inter-hand distance, threshold 0.12F |
| `path` | total path length of the ref point |
| `y0,y1` | start/end y; `o0,o1` openness; `pa0,pa1` palm size; `f0,f1` distance to mouth |

## Movement flags (a sign passes if **any** flag in its `move` list is true)
| Flag | Rule |
|---|---|
| `repeat` | `rx ≥ 2` or `ry ≥ 2` or `ro ≥ 2` or `rd ≥ 2` |
| `squeeze` | `ro ≥ 2` or `ry ≥ 2` |
| `down` | `y1 − y0 > 0.5F` |
| `up` | `y0 − y1 > 0.4F` |
| `away` | distance-to-mouth grows > 0.4F, or moved down > 0.4F, or palm size grows > 15% (moving toward camera) |
| `side` | `rx ≥ 2` |
| `circle` | `path > 1.4F` and `rx ≥ 1` and `ry ≥ 1` |
| `twist` | `range(roll) > 35°` |
| `shake` | `rx ≥ 2` or `rr ≥ 2` |
| `open` | openness grows > 0.25, or hands move apart by > 0.5F |
| `close` | openness shrinks > 0.2 |
| `change` | `range(roll) > 30°` or `range(openness) > 0.3` or (pair and `range(pair) > 0.5F`) |
| `rock` | `rx ≥ 2` |
| `still` | **always true** |
| `any` | `path > 0.4F` |

Human-friendly hints (shown when failing, `MOVE_HINTS`): repeat "do the movement twice (tap, tap)", squeeze "open and close your hand a few times", down "move your hand down", up "lift your hands up", away "move your hand out, away from your face", side "move side to side", circle "make small circles", twist "twist your wrists", shake "shake or wiggle your hands", open "spring your hands open", close "curl your fingers in", change "move or turn your hands", rock "rock side to side", still "hold it still", any "move as shown".

Only the **first** entry of a sign's `move` list is used for the failure hint.

Back to [[Camera Coach Overview]] · scoring in [[Evaluation and Scoring]].
