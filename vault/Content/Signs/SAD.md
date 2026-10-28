---
type: sign
id: sad
gloss: SAD
routine: feel
hands_checked: 2
tags: [sign, routine/feel]
---

# SAD

Routine: [[Feelings]] · app id `sad` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both open 5-hands, palms toward your face. |
| **Where** | In front of your face. |
| **Move** | Move both hands down slowly. Let your face look sad. |

**Remember it (hook):** Tears or a face falling.

**Use it for real (`say`):** Your face is part of the sign. Match the feeling.

## What the camera coach checks
`CHECKS.sad` = `{ hands:2, shape:["5","flat"], at:"face", ref:"center", move:["down"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** open 5-hand, flat hand → see [[Handshape Detection]]
- **Location:** in front of the face (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `down` (move the hand down) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
