---
type: sign
id: drink
gloss: DRINK
routine: meal
hands_checked: 1
tags: [sign, routine/meal]
---

# DRINK

Routine: [[Mealtime]] · app id `drink` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | C-hand, as if holding a cup. |
| **Where** | In front of your chin. |
| **Move** | Tip the 'cup' up toward your mouth. |

**Remember it (hook):** Sip from an invisible cup.

**Use it for real (`say`):** Ask "DRINK?" while holding up their cup.

## What the camera coach checks
`CHECKS.drink` = `{ hands:1, shape:["C","claw"], at:"mouth", ref:"center", move:["any"] }`

- **Hands needed:** 1
- **Accepted handshapes:** C-hand, claw hand → see [[Handshape Detection]]
- **Location:** at the mouth (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `any` (move as shown) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
