---
type: sign
id: hungry
gloss: HUNGRY
routine: meal
hands_checked: 1
tags: [sign, routine/meal]
---

# HUNGRY

Routine: [[Mealtime]] · app id `hungry` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | C-hand, palm toward you. |
| **Where** | Upper chest. |
| **Move** | Slide down once to your stomach. |

**Remember it (hook):** Food traveling down an empty tummy.

**Use it for real (`say`):** "You HUNGRY?" with eyebrows raised (that's how ASL asks yes/no).

## What the camera coach checks
`CHECKS.hungry` = `{ hands:1, shape:["C","claw"], at:"chest", ref:"center", move:["down"] }`

- **Hands needed:** 1
- **Accepted handshapes:** C-hand, claw hand → see [[Handshape Detection]]
- **Location:** on the chest (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `down` (move the hand down) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
