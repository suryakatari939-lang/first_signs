---
type: sign
id: come
gloss: COME
routine: safe
hands_checked: 1
tags: [sign, routine/safe]
---

# COME

Routine: [[Safety & getting out]] · app id `come` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Index fingers pointing out. |
| **Where** | In front of you. |
| **Move** | Curl them back toward you, like beckoning. |

**Remember it (hook):** 'Come here' with a finger.

**Use it for real (`say`):** Get down to their eye level first so they can see you.

## What the camera coach checks
`CHECKS.come` = `{ hands:1, shape:["index","fist","claw"], at:"body", ref:"index", move:["close","any"] }`

- **Hands needed:** 1
- **Accepted handshapes:** pointing finger, fist, claw hand → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `index`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `close` (curl the fingers in); `any` (move as shown) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
