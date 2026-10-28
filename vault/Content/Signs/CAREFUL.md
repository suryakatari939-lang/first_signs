---
type: sign
id: careful
gloss: CAREFUL
routine: safe
hands_checked: 2
tags: [sign, routine/safe]
---

# CAREFUL

Routine: [[Safety & getting out]] · app id `careful` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both K-hands (index up, middle out, thumb between). |
| **Where** | Stacked in front of your chest. |
| **Move** | Tap the top hand on the bottom one twice. |

**Remember it (hook):** Stacking things carefully.

**Use it for real (`say`):** "CAREFUL, HOT!"

## What the camera coach checks
`CHECKS.careful` = `{ hands:2, shape:["two","index"], at:"body", ref:"center", move:["repeat"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** two fingers, pointing finger → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `repeat` (do the movement twice (tap, tap)) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
