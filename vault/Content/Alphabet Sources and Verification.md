---
type: reference
tags: [alphabet, numbers, sources, verification]
---
# Alphabet Sources and Verification

How the 36 descriptions in `js/alphabet.js` (26 letters + numbers 1-10) were checked. Written in our own words (paraphrased, not copied) from the pages below, then cross-checked. Content note: [[Alphabet and Numbers]]; screens: [[ABC Screens]].

## Sources (all fetched 2026-10-28)
| Code | Source | What it was good for |
|---|---|---|
| HK | [Helen Keller Services, ASL handshapes described](https://helenkeller.org/asl-handshapes-described) | Best single source. Written handshape descriptions for 19 letters (A B C D E G H I K L M N O R S T V X Y) and numbers 1-9. Does **not** cover F (only as the 9 shape), J, P, Q, U, W, Z, or 10. Assumes right-handed signer |
| W | [Wikipedia, American manual alphabet](https://en.wikipedia.org/wiki/American_manual_alphabet) | Mostly images. Text for: A thumb on side, S thumb in front, G palm to the side, H and U same handshape (orientation differs), K and P same handshape, Q and G same handshape, J (I with a wrist twist, pinky traces the curve), Z (index finger zig-zag), double letters |
| WB | [Wikibooks, ASL Fingerspelling 1](https://en.wikibooks.org/wiki/American_Sign_Language/Fingerspelling_1) | C and O face the viewer; G and H sideways; shoulder height; no bouncing; double letters bounce or slide; mouth the word; when to fingerspell. (Read through a mirror of the 2021 page) |
| SSM | [Signing Savvy, common mistakes](https://www.signingsavvy.com/article/251/Common+Fingerspelling+Mistakes+New+Signers+Make) | Z uses the index finger; E closed; M/N; rounded O; C and O face forward; K to P is wrist only; G and H sideways palm toward body; double letters slide outward |
| SSH | [Signing Savvy, how to fingerspell](https://www.signingsavvy.com/blog/405/How+to+Fingerspell) | Dominant hand in front of chest, palm toward the receiver, clear letters |
| SSN | [Signing Savvy, numbers article](https://www.signingsavvy.com/article/389/Signs+That+Are+Close...+But+Not+the+Same+—+Numbers) | 3 uses the thumb; 6-9 thumb positions; palm toward body when counting a quantity, forward for math/scores; 6-9 palm forward |
| SA | [Start ASL](https://www.startasl.com/american-sign-language-alphabet/) | J, M, N, T, P, Q, Z, F (three fingers apart or together) |
| HS | [Handspeak](https://www.handspeak.com/learn/408/) | Z written left to right; D vs F confusion; thumb matters for A/S and M/N/T; K vs P orientation |
| LP | [Lifeprint numbers](https://lifeprint.com/asl101/pages-layout/numbersdiscussion.htm) | Isolated 1-5 palm back, 6-9 palm forward; 2 is the V shape; 9 = F |
| BG | [US Bridge Federation](https://usbgf.org/courses/pip-counting-with-art-benjamin/lessons/review-the-american-sign-language-numbers/) | 1-5 palm inward, 6-10 palm outward; 3 with thumb; 6-9 thumb to pinky/ring/middle/index; 10 thumbs-up with twist |
| AB | [ASL Bloom, TEN](https://aslbloom.com/signs/ten) | 10: fist, thumb up, twist hand at wrist back and forth |

**Read but not used as a basis:** The Global Montessori Network alphabet page has written text for all 26 letters, but it contains at least one clear error (it describes K as a V shape), so it was used only as a tie-breaker where it agreed with others. Lifeprint's letter chart (`/fingerspelling/abc.htm`) and Wikipedia are image-only for most letters. Signing Savvy sign pages and Wikibooks/WikiHow detail were unavailable (members-only or blocked by the fetch tool). **Not read:** actual sign videos; nobody has watched them against the descriptions.

## What the audit changed (first draft was from general knowledge)
| Item | Problem found | Fix |
|---|---|---|
| Numbers 1-5 | Said palm toward the viewer. LP, SSN and BG all say palm toward yourself when counting alone (forward only inside a longer number) | Palm toward you; `NUMBER_TIP` rewritten |
| R | Said "middle finger over index". HK only says "crossed"; another source says the opposite order | Just "cross your index and middle fingers" |
| D | "Other fingers touch the thumb" | HK: thumb tip meets the **middle** fingertip, other fingers curved in |
| E | Missing "closed" | SSM, WB: keep closed, tips resting on the thumb |
| G, H | "Pointing sideways" only | Turned sideways, palm toward your body (W, WB, SSM) |
| C, O | No orientation | Face the viewer; O rounded, not flat (WB, SSM) |
| K, P | P said "tip your hand" | P = K with the wrist dropped, middle finger to the floor (SA, SSM) |
| M, N, T | Missing where the thumb tip shows | M between ring and little, N between middle and ring, T between index and middle (HK) |
| W | "Thumb holds down little finger" | Thumb **touches** little finger (same shape as 6; SSN) |
| Z | No finger rule | Use the index finger, not the little finger (SSM) |
| J | OK | Added wrist twist (W) |
| I, A, L, S, X, Y, B, V, F | Minor wording only | Tightened to match HK |
| 10 | "Shake or twist slightly" | Twist at the wrist back and forth, thumb up, palm out (AB, BG) |
| Palm rule note | "Palm faces the viewer" for everything | Exceptions G, H (sideways), P, Q (down) |
| Tips | "near your shoulder"; "names, places and new words" | Shoulder height vs chest differs between sources, said so; places often have own signs (WB); mouth the word, not the letters |

## Confidence per item
Counted by the `src` codes in the data. "Single source" does **not** mean wrong; it means only one reference was found with written text.
| Item | Sources | Confidence |
|---|---|---|
| A | HK, W | good (2 sources) |
| B | HK | single source, verify with video |
| C | HK, WB, SSM, SA | strong (3+ sources) |
| D | HK, HS | good (2 sources) |
| E | HK, SSM, WB | strong (3+ sources) |
| F | HK, SA | good (2 sources) |
| G | HK, W, WB, SSM | strong (3+ sources) |
| H | HK, W, WB, SSM | strong (3+ sources) |
| I | HK | single source, verify with video |
| J | W, SA | good (2 sources) |
| K | HK, W, SSM | strong (3+ sources) |
| L | HK | single source, verify with video |
| M | HK, SA, SSM | strong (3+ sources) |
| N | HK, SA, SSM | strong (3+ sources) |
| O | HK, SSM, WB | strong (3+ sources) |
| P | W, SA, SSM | strong (3+ sources) |
| Q | W, SA | good (2 sources) |
| R | HK | single source, verify with video |
| S | HK, W | good (2 sources) |
| T | HK, SA, HS | strong (3+ sources) |
| U | W | single source, verify with video |
| V | HK | single source, verify with video |
| W | SSN | single source, verify with video |
| X | HK | single source, verify with video |
| Y | HK | single source, verify with video |
| Z | W, SA, SSM, HS | strong (3+ sources) |
| 1 | HK, LP, BG | strong (3+ sources) |
| 2 | LP, BG | good (2 sources) |
| 3 | HK, SSN, BG | strong (3+ sources) |
| 4 | HK, BG | good (2 sources) |
| 5 | HK, BG | good (2 sources) |
| 6 | HK, SSN, LP, BG | strong (3+ sources) |
| 7 | HK, SSN, BG | strong (3+ sources) |
| 8 | HK, SSN, BG | strong (3+ sources) |
| 9 | HK, SSN, LP, BG | strong (3+ sources) |
| 10 | AB, BG | good (2 sources) |

**Single-source items (9):** B, I, L, R, U, V, W, X, Y. Most weakly supported: **U** (only Wikipedia saying it shares H's shape), **W** (only SSN via the matching 6 shape), **R** (crossing only; which finger is on top is unspecified), **10** (two lesser sources, Lifeprint page is video-only).

## Known disagreements between sources
- Hand height: Wikipedia says shoulder height and also "just below the dominant shoulder"; Signing Savvy says right of chest center, 6-8 inches out.
- G orientation: Wikipedia says palm to the side, fingers forward; Signing Savvy says palm toward the body. Wikipedia and Handspeak both note G orientation varies in real signing.
- F: other three fingers apart or together (Start ASL prefers apart).
- E and M: variants exist (Wikibooks) — the app teaches the common form only.
- 3: sources agree thumb counts; Signing Savvy warns many hearing learners sign 3 like 6.
- 10: palm orientation not given by AB; BG says outward.

## Still needed
Watch each handshape on video and/or have a Deaf signer or ASL instructor confirm — tracked in [[Open Questions]] #9. If a description changes, edit `js/alphabet.js` and update this note ([[Maintaining This Vault]]).
