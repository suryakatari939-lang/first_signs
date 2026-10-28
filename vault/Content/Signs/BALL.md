---
type: sign
id: ball
gloss: BALL
routine: play
hands_checked: 2
tags: [sign, routine/play]
---

# BALL

Routine: [[Play & manners]] · app id `ball` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both curved hands, like holding a ball. |
| **Where** | In front of your chest. |
| **Move** | Tap the fingertips together twice. |

**Remember it (hook):** The shape of a ball.

**Use it for real (`say`):** Sign it, then roll it. Wait for them to sign before the next roll.

## What the camera coach checks
`CHECKS.ball` = `{ hands:2, shape:["C","claw","flatO"], at:"body", ref:"tips", move:["repeat"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** C-hand, claw hand, flat-O → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `tips`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `repeat` (do the movement twice (tap, tap)) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
