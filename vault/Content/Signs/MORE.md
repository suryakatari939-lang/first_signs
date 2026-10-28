---
type: sign
id: more
gloss: MORE
routine: meal
hands_checked: 2
tags: [sign, routine/meal]
---

# MORE

Routine: [[Mealtime]] · app id `more` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both hands in flat-O. |
| **Where** | In front of your chest. |
| **Move** | Tap the fingertips of both hands together twice. |

**Remember it (hook):** Adding more pieces onto the pile.

**Use it for real (`say`):** Pause before refilling. Wait for a reach, look, or sign.

## What the camera coach checks
`CHECKS.more` = `{ hands:2, shape:["flatO","fist"], at:"body", ref:"tips", move:["repeat"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** flat-O, fist → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `tips`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `repeat` (do the movement twice (tap, tap)) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
