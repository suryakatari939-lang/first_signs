---
type: content
tags: [content, alphabet, numbers, fingerspelling]
---
# Alphabet and Numbers (content)

Defined in `js/alphabet.js` (generated table below from that file; the source wins). UI in [[ABC Screens]]. Added after the first vault pass, on top of the 43 routine signs ([[Routines and Signs Overview]]); this content is **separate** from `SIGNS`/`CHECKS` and has **no camera check** (see [[Handshape Detection]] for why letters are hard: A/S/T/N/M/E are all fists).

## Data
- `LETTERS` — 26 items `{id, ch, g, q, hand, move?, hook}`; ids are lowercase letters (`a`..`z`). `g` = group id for [[ABC Screens]] grouping and quiz look-alike distractors. `q` = search word for the Signing Savvy link.
- `NUMBERS` — 10 items, ids `n1`..`n10`, `g:"num"`.
- `ABC_GROUPS` — 6 groups with a teaching tip each; `NUMBER_TIP`; `SPELL_WORDS` (starter words: names, places, double letters); `SPELL_TIPS` (5 fingerspelling tips).
- Descriptions assume a right-handed signer, palm facing the viewer; the UI says to mirror for left-handers.
- **Accuracy status:** written from general ASL knowledge and not yet reviewed by a Deaf signer or ASL instructor — see [[Open Questions]].

## Letters (by group)
| Group | Letters |
|---|---|
| Closed fists | A, E, M, N, S, T |
| Round shapes | C, O |
| Pointing finger | D, G, L, Q, X, Z |
| Two-finger letters | H, K, P, R, U, V |
| Fingers up | B, F, W |
| Little finger and thumb | I, J, Y |

## All letters
| Letter | Group | Hand | Movement | Hook |
|---|---|---|---|---|
| A | Closed fists | Make a fist with your thumb resting along the side of your index finger, pointing up. |  | The thumb stands up beside the fist, like the point of a capital A. |
| B | Fingers up | Hold your four fingers straight up and together, with your thumb folded across your palm. |  | A flat board with the thumb tucked in. |
| C | Round shapes | Curve your hand into the shape of the letter C, thumb and fingers open. |  | Your hand is the letter. |
| D | Pointing finger | Point your index finger up. Curl the other fingers to touch your thumb, making a small circle. |  | The straight finger is the stem of a d and the circle is its belly. |
| E | Closed fists | Curl your fingertips down toward your palm and tuck your thumb underneath, so the fingertips rest on it. |  | The fingers curl down like a little roof over the thumb. |
| F | Fingers up | Touch the tips of your thumb and index finger to make a circle. Hold the other three fingers up and spread. |  | It is the "OK" sign. |
| G | Pointing finger | Point your index finger and thumb sideways, parallel, as if showing a small gap. Curl the other fingers. Your palm faces in. |  | Show how small something is, sideways. |
| H | Two-finger letters | Hold your index and middle fingers together, pointing sideways. Thumb tucked in. |  | Two fingers lying down like the bar across an H. |
| I | Little finger and thumb | Make a fist and stick your little finger straight up. |  | The little finger is the dot of an i. |
| J | Little finger and thumb | Make the I handshape (little finger up). | Draw a J in the air with your little finger: down, then curve into a hook. | I plus a hook. |
| K | Two-finger letters | Point your index finger up and your middle finger out at an angle. Press your thumb against the middle finger. |  | A V with the thumb propped in the middle. |
| L | Pointing finger | Stick out your thumb and index finger at a right angle. Curl the other fingers. |  | Your thumb and finger draw an L. |
| M | Closed fists | Make a fist and tuck your thumb under your first three fingers (index, middle and ring). |  | M has three legs, so three fingers go over the thumb. |
| N | Closed fists | Make a fist and tuck your thumb under your first two fingers (index and middle). |  | N has two legs, so two fingers go over the thumb. |
| O | Round shapes | Curve all your fingers so the tips touch your thumb, making a round O. |  | Your fingers make the shape of an O. |
| P | Two-finger letters | Make the K handshape, then tip your hand so your fingers point down. |  | K tipped over to point downward. |
| Q | Pointing finger | Make the G handshape, then turn your hand so your index finger and thumb point down. |  | G pointing down, like the tail of a Q. |
| R | Two-finger letters | Cross your middle finger over your index finger and hold them up. |  | Fingers crossed, as if wishing for luck. |
| S | Closed fists | Make a fist with your thumb wrapped across the front of your fingers. |  | The thumb crosses in front like a seat belt. |
| T | Closed fists | Make a fist and tuck your thumb between your index and middle fingers, so the thumb tip peeks out. |  | T for tucked. |
| U | Two-finger letters | Hold your index and middle fingers straight up and together. Your thumb holds down the other two fingers. |  | Two fingers standing together. |
| V | Two-finger letters | Hold your index and middle fingers up and spread them apart. Thumb holds down the other two. |  | U with the fingers apart. The peace sign. |
| W | Fingers up | Hold your index, middle and ring fingers up and spread. Your thumb holds down your little finger. |  | Three fingers make a W. |
| X | Pointing finger | Make a fist and bend your index finger into a hook. |  | A hooked finger, like a pirate's hook. |
| Y | Little finger and thumb | Stick out your thumb and little finger. Curl the other three fingers. |  | The thumb and little finger are the two arms of a Y. |
| Z | Pointing finger | Point your index finger. | Draw a Z in the air: across, diagonally down, then across again. | Trace the letter with your finger. |

## Numbers
| Number | Hand | Movement | Hook |
|---|---|---|---|
| 1 | Point your index finger up. Fold the other fingers into your palm with the thumb across them. |  | One finger for one. |
| 2 | Hold your index and middle fingers up and spread. Thumb holds down the other two fingers. |  | Two fingers up, like a peace sign. |
| 3 | Stick out your thumb, index finger and middle finger. Fold the other two fingers down. |  | In ASL the thumb counts: thumb, pointer, middle. |
| 4 | Hold four fingers up and spread. Fold your thumb across your palm. |  | Four fingers, thumb tucked away. |
| 5 | Spread all five fingers open. |  | A full open hand. |
| 6 | Touch your thumb to your little finger. Hold the other three fingers up. |  | Six starts at the little finger. |
| 7 | Touch your thumb to your ring finger. Hold the other three fingers up. |  | The thumb moves one finger over. |
| 8 | Touch your thumb to your middle finger. Hold the other three fingers up. |  | The thumb moves one more finger over. |
| 9 | Touch your thumb to your index finger. Hold the other three fingers up. |  | The thumb ends at the pointer. It looks like the F handshape. |
| 10 | Make a fist with your thumb pointing up. | Shake or twist your fist slightly. | Thumbs-up with a little wiggle. |
