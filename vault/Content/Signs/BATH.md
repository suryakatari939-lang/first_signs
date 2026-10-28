---
type: sign
id: bath
gloss: BATH
routine: bed
hands_checked: 2
tags: [sign, routine/bed]
---

# BATH

Routine: [[Bath & bedtime]] · app id `bath` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both A-hands (fists, thumbs on the side). |
| **Where** | On your chest. |
| **Move** | Rub up and down on your chest. |

**Remember it (hook):** Scrubbing with a washcloth.

**Use it for real (`say`):** Sign BATH before you turn on the water.

## What the camera coach checks
`CHECKS.bath` = `{ hands:2, shape:["fist"], at:"chest", ref:"center", move:["repeat"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** fist → see [[Handshape Detection]]
- **Location:** on the chest (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `repeat` (do the movement twice (tap, tap)) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
