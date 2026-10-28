---
type: sign
id: help
gloss: HELP
routine: play
hands_checked: 2
tags: [sign, routine/play]
---

# HELP

Routine: [[Play & manners]] · app id `help` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Thumbs-up fist resting on your other flat palm. |
| **Where** | In front of your chest. |
| **Move** | Lift both hands up together. |

**Remember it (hook):** Giving someone a lift.

**Use it for real (`say`):** Teach them to ask: wait for HELP before you open the jar.

## What the camera coach checks
`CHECKS.help` = `{ hands:2, shape:["thumbsup","fist","flat","5"], at:"body", ref:"center", move:["up"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** thumbs-up, fist, flat hand, open 5-hand → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `up` (lift the hands up) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
