---
type: camera
tags: [camera, data, format]
---
# CHECKS Format

At the bottom of `js/signs.js`, `CHECKS` maps each sign id to the target the camera coach tests. Every one of the 43 `SIGNS` ids has an entry and there are no extras (verified).

```js
eat: { hands:1, shape:["flatO"], at:"mouth", ref:"tips", move:["repeat"] }
```

| Field | Meaning | Allowed values |
|---|---|---|
| `hands` | how many hands the sign uses | `1` or `2` |
| `shape` | handshapes that count (any one) | `flatO, flat, 5, fist, thumbsup, index, two, W, Y, ILY, C, claw` ([[Handshape Detection]]) |
| `at` | where the sign happens | `mouth, chin, forehead, cheek, face, chest, body, any` ([[Zones and Body Landmarks]]) |
| `ref` | which part of the hand must be there | `tips, index, thumb, center` |
| `move` | movements that count (any one) | `repeat, squeeze, down, up, away, side, circle, twist, shake, open, close, change, rock, still, any` ([[Movement Detection]]) |

## Adding or tuning a sign
1. Add the sign object to `SIGNS` (fields: `id, r, w, hand, where, move, hook, say`; `r` is a routine id).
2. Add a `CHECKS[id]` entry. Prefer generous `shape`/`move` lists — the coach is a helper, not a judge.
3. Add the sign to the matching routine list order in `SIGNS` (order = order shown, and order new signs are introduced — [[Spaced Repetition]]).
4. Update the vault ([[Maintaining This Vault]]).

Full table: [[Camera CHECKS Table]]. Scoring: [[Evaluation and Scoring]].
