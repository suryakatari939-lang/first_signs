---
type: sign
id: tired
gloss: TIRED
routine: feel
hands_checked: 2
tags: [sign, routine/feel]
---

# TIRED

Routine: [[Feelings]] · app id `tired` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both bent hands, fingertips on your upper chest. |
| **Where** | Upper chest. |
| **Move** | Roll the hands down so they droop. Let your shoulders sag. |

**Remember it (hook):** Your body running out of energy.

**Use it for real (`say`):** "You TIRED? BED soon."

## What the camera coach checks
`CHECKS.tired` = `{ hands:2, shape:["flat","claw","C","5"], at:"chest", ref:"tips", move:["any","change","down"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** flat hand, claw hand, C-hand, open 5-hand → see [[Handshape Detection]]
- **Location:** on the chest (tracked point = `tips`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `any` (move as shown); `change` (move or turn the hands); `down` (move the hand down) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
