---
type: sign
id: hurt
gloss: HURT
routine: feel
hands_checked: 2
tags: [sign, routine/feel]
---

# HURT

Routine: [[Feelings]] · app id `hurt` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both index fingers pointing at each other. |
| **Where** | Near the place that hurts (head, tummy, knee). |
| **Move** | Jab the fingertips toward each other twice, or twist them. |

**Remember it (hook):** Pain stabbing right there.

**Use it for real (`say`):** Sign it at the sore spot. They learn to tell you where.

## What the camera coach checks
`CHECKS.hurt` = `{ hands:2, shape:["index"], at:"any", ref:"index", move:["repeat","twist"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** pointing finger → see [[Handshape Detection]]
- **Location:** anywhere (tracked point = `index`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `repeat` (do the movement twice (tap, tap)); `twist` (twist the wrists) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
