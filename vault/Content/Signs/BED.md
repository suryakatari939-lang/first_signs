---
type: sign
id: bed
gloss: BED
routine: bed
hands_checked: 1
tags: [sign, routine/bed]
---

# BED

Routine: [[Bath & bedtime]] · app id `bed` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | One flat hand. |
| **Where** | Against your cheek, head tilted. |
| **Move** | Rest your cheek on your palm. |

**Remember it (hook):** Your hand is the pillow.

**Use it for real (`say`):** "BOOK, then BED."

## What the camera coach checks
`CHECKS.bed` = `{ hands:1, shape:["flat","5"], at:"cheek", ref:"center", move:["still"] }`

- **Hands needed:** 1
- **Accepted handshapes:** flat hand, open 5-hand → see [[Handshape Detection]]
- **Location:** at the cheek (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `still` (hold it still) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
