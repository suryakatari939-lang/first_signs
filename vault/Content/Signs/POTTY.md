---
type: sign
id: potty
gloss: POTTY
routine: safe
hands_checked: 1
tags: [sign, routine/safe]
---

# POTTY

Routine: [[Safety & getting out]] · app id `potty` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | T-hand (thumb tucked between index and middle fingers). |
| **Where** | In front of your shoulder. |
| **Move** | Shake side to side. |

**Remember it (hook):** T for toilet.

**Use it for real (`say`):** Sign it every time you go, long before training starts.

## What the camera coach checks
`CHECKS.potty` = `{ hands:1, shape:["fist"], at:"body", ref:"center", move:["shake","side"] }`

- **Hands needed:** 1
- **Accepted handshapes:** fist → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `shake` (shake or wiggle the hands); `side` (move side to side) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
