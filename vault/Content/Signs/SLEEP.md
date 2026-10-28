---
type: sign
id: sleep
gloss: SLEEP
routine: bed
hands_checked: 1
tags: [sign, routine/bed]
---

# SLEEP

Routine: [[Bath & bedtime]] · app id `sleep` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Open 5-hand closing to a flat-O. |
| **Where** | In front of your face. |
| **Move** | Draw down over your face as the fingers close. Let your eyes close too. |

**Remember it (hook):** Pulling down your eyelids.

**Use it for real (`say`):** Sign it slowly at lights out.

## What the camera coach checks
`CHECKS.sleep` = `{ hands:1, shape:["5","flat","flatO","claw"], at:"face", ref:"center", move:["down","close"] }`

- **Hands needed:** 1
- **Accepted handshapes:** open 5-hand, flat hand, flat-O, claw hand → see [[Handshape Detection]]
- **Location:** in front of the face (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `down` (move the hand down); `close` (curl the fingers in) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
