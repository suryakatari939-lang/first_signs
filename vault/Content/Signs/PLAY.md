---
type: sign
id: play
gloss: PLAY
routine: play
hands_checked: 2
tags: [sign, routine/play]
---

# PLAY

Routine: [[Play & manners]] · app id `play` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both Y-hands (thumb and pinky out). |
| **Where** | In front of you. |
| **Move** | Shake both hands by twisting the wrists. |

**Remember it (hook):** Wiggly and fun.

**Use it for real (`say`):** "WANT PLAY?" with raised eyebrows.

## What the camera coach checks
`CHECKS.play` = `{ hands:2, shape:["Y"], at:"body", ref:"center", move:["shake","twist"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** Y-hand → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `shake` (shake or wiggle the hands); `twist` (twist the wrists) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
