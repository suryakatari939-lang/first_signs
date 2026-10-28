---
type: sign
id: mad
gloss: MAD
routine: feel
hands_checked: 1
tags: [sign, routine/feel]
---

# MAD

Routine: [[Feelings]] · app id `mad` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Claw hand (5-hand with fingers bent). |
| **Where** | In front of your face, palm in. |
| **Move** | Pull out a little while tensing the fingers. Frown. |

**Remember it (hook):** An angry face scrunching up.

**Use it for real (`say`):** "You MAD. Okay. WAIT, then we try again."

## What the camera coach checks
`CHECKS.mad` = `{ hands:1, shape:["claw","5","C"], at:"face", ref:"center", move:["any","close"] }`

- **Hands needed:** 1
- **Accepted handshapes:** claw hand, open 5-hand, C-hand → see [[Handshape Detection]]
- **Location:** in front of the face (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `any` (move as shown); `close` (curl the fingers in) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
