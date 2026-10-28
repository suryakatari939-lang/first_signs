---
type: sign
id: stop
gloss: STOP
routine: safe
hands_checked: 2
tags: [sign, routine/safe]
---

# STOP

Routine: [[Safety & getting out]] · app id `stop` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both flat hands. One palm up, the other on its edge. |
| **Where** | In front of your chest. |
| **Move** | Chop the edge down onto the flat palm once, sharply. |

**Remember it (hook):** A gate slamming down.

**Use it for real (`say`):** Practice it as a game first so it works in a real moment.

## What the camera coach checks
`CHECKS.stop` = `{ hands:2, shape:["flat","5"], at:"body", ref:"center", move:["down"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** flat hand, open 5-hand → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `down` (move the hand down) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
