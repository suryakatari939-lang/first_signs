---
type: sign
id: book
gloss: BOOK
routine: bed
hands_checked: 2
tags: [sign, routine/bed]
---

# BOOK

Routine: [[Bath & bedtime]] · app id `book` · defined in `js/signs.js` (`SIGNS` + `CHECKS`)

## How to sign it (shown to the parent)
| | |
|---|---|
| **Hand** | Both flat hands, palms pressed together. |
| **Where** | In front of your chest. |
| **Move** | Open them like the covers of a book. |

**Remember it (hook):** Opening a book.

**Use it for real (`say`):** Let them pick: hold up two books and sign BOOK.

## What the camera coach checks
`CHECKS.book` = `{ hands:2, shape:["flat","5"], at:"body", ref:"center", move:["change","open","twist"] }`

- **Hands needed:** 2 (both must be seen in ≥25% of frames, and both must match a shape)
- **Accepted handshapes:** flat hand, open 5-hand → see [[Handshape Detection]]
- **Location:** in front of the body (tracked point = `center`) → see [[Zones and Body Landmarks]]
- **Movement (any one passes):** `change` (move or turn the hands); `open` (spring the hands open); `twist` (twist the wrists) → see [[Movement Detection]]

Scoring rules: [[Evaluation and Scoring]]. All checks: [[Camera CHECKS Table]].
