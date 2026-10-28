---
type: sign
id: milk
gloss: MILK
routine: meal
hands_checked: 1
tags: [sign, routine/meal]
---

# MILK

Routine: [[Mealtime]] · app id `milk` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Loose fist (C to S). |
| **Where** | At your side, about chest height. |
| **Move** | Squeeze and open the fist two or three times. |

**Remember it (hook):** Milking a cow.

**Use it for real (`say`):** Sign it right before you hand over the bottle or cup.

## What the camera coach checks
`CHECKS.milk` = `{ hands:1, shape:["fist","C","claw"], at:"body", ref:"center", move:["squeeze"] }`

- **Hands needed:** 1
- **Accepted handshapes:** fist, C-hand, claw hand → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `squeeze` (open and close the hand a few times) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
