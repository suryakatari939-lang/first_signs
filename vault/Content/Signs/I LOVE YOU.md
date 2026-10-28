---
type: sign
id: ily
gloss: I LOVE YOU
routine: bed
hands_checked: 1
tags: [sign, routine/bed]
---

# I LOVE YOU

Routine: [[Bath & bedtime]] · app id `ily` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Thumb, index and pinky up; middle and ring folded down. |
| **Where** | Held up in front of you, palm out. |
| **Move** | Hold it still, or give it a little shake. |

**Remember it (hook):** It combines I, L and Y.

**Use it for real (`say`):** The last thing they see before you leave the room.

## What the camera coach checks
`CHECKS.ily` = `{ hands:1, shape:["ILY"], at:"any", ref:"center", move:["still"] }`

- **Hands needed:** 1
- **Accepted handshapes:** I-love-you hand → see [[Handshape Detection]]
- **Location:** anywhere (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `still` (hold it still) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
