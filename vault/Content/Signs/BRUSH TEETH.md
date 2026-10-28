---
type: sign
id: brush
gloss: BRUSH TEETH
routine: bed
hands_checked: 1
tags: [sign, routine/bed]
---

# BRUSH TEETH

Routine: [[Bath & bedtime]] · app id `brush` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Index finger, like a toothbrush. |
| **Where** | In front of your teeth. |
| **Move** | Move side to side. |

**Remember it (hook):** Your finger is the toothbrush.

**Use it for real (`say`):** Brush together and sign first.

## What the camera coach checks
`CHECKS.brush` = `{ hands:1, shape:["index"], at:"mouth", ref:"index", move:["side","repeat"] }`

- **Hands needed:** 1
- **Accepted handshapes:** pointing finger → see [[Handshape Detection]]
- **Location:** at the mouth (tracked point = `index`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `side` (move side to side); `repeat` (do the movement twice (tap, tap)) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
