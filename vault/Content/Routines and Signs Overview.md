---
type: content
tags: [content, overview]
---
# Routines and Signs Overview

Content lives in `js/signs.js` as plain globals. The organizing idea: **signs are grouped by daily routine**, so practice happens inside the moments a parent already shares with the child.

## Routines (`ROUTINES`)
| Routine | id | When | Signs |
|---|---|---|---|
| [[Mealtime]] | `meal` | Breakfast, lunch, dinner | 8 |
| [[Bath & bedtime]] | `bed` | Evening | 6 |
| [[Feelings]] | `feel` | Any time | 7 |
| [[Family]] | `family` | Any time | 6 |
| [[Play & manners]] | `play` | Daytime | 9 |
| [[Safety & getting out]] | `safe` | On the go | 7 |

**Total: 43 signs** (README/plan say 42 — see [[Known Issues and Quirks]]). Order inside `SIGNS` is the order shown *and* the order new signs are introduced ([[Spaced Repetition]]).

## Sign object shape
```js
{ id, r /*routine id*/, w /*gloss shown*/, hand, where, move, hook /*mnemonic*/, say /*real-life prompt*/ }
```
Note: the id for ALL DONE is `finish`, for THANK YOU is `thanks`, BRUSH TEETH is `brush`, I LOVE YOU is `ily`, GRANDMA/GRANDPA are `grandma`/`grandpa`.

All signs: [[Signs Index]] (with each sign's camera target) and one note per sign in `Content/Signs/`.

## Other content tables
- `PHRASES[routineId]` → [[Phrases]]
- `HANDSHAPES` → [[Handshape Cheat Sheet]]
- `CHECKS[id]` → [[CHECKS Format]], [[Camera CHECKS Table]]

## Content conventions
- ASL glosses in CAPITALS. Yes/no questions use raised eyebrows. "One hand" = dominant hand.
- Descriptions are written text guides, not video; each sign card links to a Signing Savvy search for the real video.
- Tone: second person, warm, practical ("Pause before refilling. Wait for a reach, look, or sign.").
- No record in the repo of the sign descriptions being reviewed by a Deaf signer or ASL instructor; the app itself advises learning alongside Deaf adults.
