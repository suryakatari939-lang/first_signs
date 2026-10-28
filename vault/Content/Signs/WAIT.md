---
type: sign
id: wait
gloss: WAIT
routine: safe
hands_checked: 2
tags: [sign, routine/safe]
---

# WAIT

Routine: [[Safety & getting out]] · app id `wait` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both open hands, palms up, one in front of the other. |
| **Where** | Off to one side, in front of you. |
| **Move** | Wiggle the fingers. |

**Remember it (hook):** Fingers drumming while you wait.

**Use it for real (`say`):** Use it at crosswalks and at the store line.

## What the camera coach checks
`CHECKS.wait` = `{ hands:2, shape:["5","flat","claw","C"], at:"body", ref:"center", move:["any","still"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** open 5-hand, flat hand, claw hand, C-hand → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `any` (move as shown); `still` (hold it still) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
