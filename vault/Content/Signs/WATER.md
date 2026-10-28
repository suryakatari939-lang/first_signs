---
type: sign
id: water
gloss: WATER
routine: meal
hands_checked: 1
tags: [sign, routine/meal]
---

# WATER

Routine: [[Mealtime]] · app id `water` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | W-hand: index, middle and ring fingers up, palm to the side. |
| **Where** | Index finger at your chin. |
| **Move** | Tap the chin twice. |

**Remember it (hook):** W for water, at the mouth where you drink it.

**Use it for real (`say`):** "WATER or MILK?"

## What the camera coach checks
`CHECKS.water` = `{ hands:1, shape:["W","flat"], at:"chin", ref:"index", move:["repeat"] }`

- **Hands needed:** 1
- **Accepted handshapes:** W-hand, flat hand → see [[Handshape Detection]]
- **Location:** at the chin (tracked point = `index`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `repeat` (do the movement twice (tap, tap)) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
