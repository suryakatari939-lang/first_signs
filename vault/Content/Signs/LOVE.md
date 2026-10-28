---
type: sign
id: love
gloss: LOVE
routine: feel
hands_checked: 2
tags: [sign, routine/feel]
---

# LOVE

Routine: [[Feelings]] · app id `love` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both fists. |
| **Where** | Crossed over your heart. |
| **Move** | Hug them to your chest. |

**Remember it (hook):** Hugging something you love.

**Use it for real (`say`):** "Mommy LOVE you."

## What the camera coach checks
`CHECKS.love` = `{ hands:2, shape:["fist"], at:"chest", ref:"center", move:["still"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** fist → see [[Handshape Detection]]
- **Location:** on the chest (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `still` (hold it still) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
