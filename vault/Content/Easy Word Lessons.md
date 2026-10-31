---
type: content
tags: [content, fingerspelling, lessons]
---
# Easy Word Lessons

Defined in `WORD_LESSONS` in `js/alphabet.js` (table generated from that file; the source wins). Screens and logic: [[ABC Screens]]. Letters used: [[Alphabet and Numbers]].

**Design status:** the lesson order and word choices are **our own teaching design**, not taken from a published ASL curriculum. The only outside guidance behind it is practical advice from the sources in [[Alphabet Sources and Verification]]: start with short words and your own name (Signing Savvy), practise common letter combinations until automatic (Wikibooks), and use real signs for words that have them. Needs review by a Deaf educator / ASL instructor ([[Open Questions]] #11).

## Rules the data follows (checked by a script when written)
- Each lesson's `letters` are the letters **first introduced** there; across lessons 1-7 all 26 are taught exactly once.
- Every word uses **only letters taught up to and including its lesson**, and every new letter appears in at least one word of its lesson.
- 9 lessons, 54 unique words, 6 per lesson. Lesson 8 has no new letters (double letters); lesson 9 has no new letters (names and places).

## Lessons
| Lesson | New letters | Words | Words that already have a sign in the app |
|---|---|---|---|
| Lesson 1: first words | A I N P S T | SAT, PAT, TIP, PIN, NAP, ANT | none |
| Lesson 2: more letters | M D C | CAT, CAN, MAP, MAD, DIP, DAD | MAD, DAD |
| Lesson 3: round letters | B H O | BAT, HAT, HOT, DOT, POT, MOM | HOT, MOM |
| Lesson 4: everyday words | E G R | BED, RED, BIG, PIG, DOG, HEN | BED, DOG |
| Lesson 5: four more letters | U L K F | SUN, BUS, CUP, FUN, MILK, FLAG | MILK |
| Lesson 6: W, Y, J and V | W Y J V | YES, WET, JAM, VAN, JET, BOY | YES |
| Lesson 7: the last letters | Q X Z | BOX, FOX, SIX, MIX, QUIZ, ZIP | none |
| Lesson 8: double letters | none | BALL, DOLL, BOOK, MOON, BEE, ZOO | BALL, BOOK |
| Lesson 9: names and places | none | SAM, ANNA, MAYA, ZOE, LUCAS, TEXAS | none |

Intro text shown above the lessons: "Short words first. Each lesson adds a few letters, and every word only uses letters you have already learned. Say or mouth the word while you spell it, and keep practising common letter combinations until they feel automatic. These are practice words: in real life, use the sign when a word has one (we flag those)."

## Words with their own sign
10 of 54 lesson words are glosses in `SIGNS` (MAD, DAD, HOT, MOM, BED, DOG, MILK, YES, BALL, BOOK). The app flags them ("Has its own sign: use the sign in real life") because fingerspelling is mainly for names, titles and words with no established sign. They stay in the lessons as practice for the handshapes.

## Progress storage
Each word is an SRS card in `S.abc.cards` under id `w-<WORD>` (e.g. `w-SAT`), same Leitner rules as letters ([[Spaced Repetition]]). Known = box >= 2, so one correct "Got it" makes a word Known. See [[Data Model and Storage]].
