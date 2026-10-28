---
type: sign
id: want
gloss: WANT
routine: meal
hands_checked: 2
tags: [sign, routine/meal]
---

# WANT

Routine: [[Mealtime]] · app id `want` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both hands open, palms up, fingers slightly bent. |
| **Where** | In front of you. |
| **Move** | Pull toward your body while curling the fingers into claws. |

**Remember it (hook):** Pulling something you want toward you.

**Use it for real (`say`):** "WANT apple?" Hold the apple near your face so they see both.

## What the camera coach checks
`CHECKS.want` = `{ hands:2, shape:["5","claw","flat","C"], at:"body", ref:"center", move:["close","change"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** open 5-hand, claw hand, flat hand, C-hand → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `close` (curl the fingers in); `change` (move or turn the hands) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
