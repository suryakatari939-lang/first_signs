---
type: sign
id: finish
gloss: ALL DONE
routine: meal
hands_checked: 2
tags: [sign, routine/meal]
---

# ALL DONE

Routine: [[Mealtime]] · app id `finish` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both hands open (5-hands), palms toward you. |
| **Where** | In front of your chest. |
| **Move** | Twist both wrists out so palms face away. Shake once or twice. |

**Remember it (hook):** Shaking off crumbs: nothing left.

**Use it for real (`say`):** Sign it as the plate comes away, every meal.

## What the camera coach checks
`CHECKS.finish` = `{ hands:2, shape:["5","flat"], at:"body", ref:"center", move:["twist","shake"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** open 5-hand, flat hand → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `twist` (twist the wrists); `shake` (shake or wiggle the hands) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
