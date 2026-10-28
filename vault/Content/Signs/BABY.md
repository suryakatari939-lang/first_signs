---
type: sign
id: baby
gloss: BABY
routine: family
hands_checked: 2
tags: [sign, routine/family]
---

# BABY

Routine: [[Family]] · app id `baby` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Arms cradled, one resting on the other. |
| **Where** | In front of your body. |
| **Move** | Rock side to side. |

**Remember it (hook):** Rocking a baby.

**Use it for real (`say`):** Use it for dolls, siblings, and baby animals.

## What the camera coach checks
`CHECKS.baby` = `{ hands:2, shape:["flat","5","C"], at:"body", ref:"center", move:["rock","side"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** flat hand, open 5-hand, C-hand → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `rock` (rock side to side); `side` (move side to side) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
