---
type: sign
id: scared
gloss: SCARED
routine: feel
hands_checked: 2
tags: [sign, routine/feel]
---

# SCARED

Routine: [[Feelings]] · app id `scared` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both fists, then open 5-hands. |
| **Where** | In front of your chest. |
| **Move** | Burst both hands open toward each other, as if startled. |

**Remember it (hook):** A jump of fright.

**Use it for real (`say`):** Use it during storms, doctor visits, or loud noises.

## What the camera coach checks
`CHECKS.scared` = `{ hands:2, shape:["5","fist","claw","flat","C"], at:"chest", ref:"center", move:["open","change"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** open 5-hand, fist, claw hand, flat hand, C-hand → see [[Handshape Detection]]
- **Location:** on the chest (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `open` (spring the hands open); `change` (move or turn the hands) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
