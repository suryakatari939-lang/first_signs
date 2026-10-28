---
type: sign
id: friend
gloss: FRIEND
routine: family
hands_checked: 2
tags: [sign, routine/family]
---

# FRIEND

Routine: [[Family]] · app id `friend` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both index fingers hooked. |
| **Where** | In front of your chest. |
| **Move** | Hook the fingers together, flip, and hook again. |

**Remember it (hook):** Two people linked together.

**Use it for real (`say`):** Point to the child at the park, then FRIEND.

## What the camera coach checks
`CHECKS.friend` = `{ hands:2, shape:["index","fist","claw","C"], at:"body", ref:"index", move:["change","twist","any"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** pointing finger, fist, claw hand, C-hand → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `index`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `change` (move or turn the hands); `twist` (twist the wrists); `any` (move as shown) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
