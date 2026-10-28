---
type: sign
id: hot
gloss: HOT
routine: safe
hands_checked: 1
tags: [sign, routine/safe]
---

# HOT

Routine: [[Safety & getting out]] · app id `hot` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Claw hand. |
| **Where** | Starts at your mouth. |
| **Move** | Twist quickly away and down. |

**Remember it (hook):** Spitting out food that's too hot.

**Use it for real (`say`):** Sign HOT near the stove, the bath tap, and soup.

## What the camera coach checks
`CHECKS.hot` = `{ hands:1, shape:["claw","C","5"], at:"mouth", ref:"center", move:["away","down","twist"] }`

- **Hands needed:** 1
- **Accepted handshapes:** claw hand, C-hand, open 5-hand → see [[Handshape Detection]]
- **Location:** at the mouth (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `away` (move the hand out, away from the face); `down` (move the hand down); `twist` (twist the wrists) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
