---
type: sign
id: shoes
gloss: SHOES
routine: safe
hands_checked: 2
tags: [sign, routine/safe]
---

# SHOES

Routine: [[Safety & getting out]] · app id `shoes` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both S-hands (fists), palms down. |
| **Where** | In front of your chest. |
| **Move** | Knock the thumb sides together twice. |

**Remember it (hook):** Clicking your heels together.

**Use it for real (`say`):** "SHOES on, then go outside."

## What the camera coach checks
`CHECKS.shoes` = `{ hands:2, shape:["fist"], at:"body", ref:"center", move:["repeat"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** fist → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `repeat` (do the movement twice (tap, tap)) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
