---
type: sign
id: eat
gloss: EAT
routine: meal
hands_checked: 1
tags: [sign, routine/meal]
---

# EAT

Routine: [[Mealtime]] · app id `eat` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Flat-O: fingertips pressed together on the thumb. |
| **Where** | At your lips. |
| **Move** | Tap the fingertips to your mouth twice. |

**Remember it (hook):** You're putting a bite of food in your mouth.

**Use it for real (`say`):** "Time to EAT!" when the plate goes down.

## What the camera coach checks
`CHECKS.eat` = `{ hands:1, shape:["flatO"], at:"mouth", ref:"tips", move:["repeat"] }`

- **Hands needed:** 1
- **Accepted handshapes:** flat-O → see [[Handshape Detection]]
- **Location:** at the mouth (tracked point = `tips`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `repeat` (do the movement twice (tap, tap)) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
