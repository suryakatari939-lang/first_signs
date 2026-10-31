---
type: screen
tags: [app, screen, ui, alphabet, fingerspelling]
---
# ABC Screens (`#abc`, `js/abc.js`)

The 5th tab ("Aa" icon, between Routines and Practice). Teaches the ASL alphabet, numbers 1–10, and fingerspelling words. Content: [[Alphabet and Numbers]]. Everything is in **`js/abc.js`** (210 lines) so `js/app.js` only has four small hooks — see "Hooks in app.js" below.

## Routes
| Hash | View | What it shows |
|---|---|---|
| `#abc` | `abcHub()` | 5 tiles: The alphabet (progress bar), Numbers (progress bar), Easy words (progress bar), Spell a word, Practice |
| `#abc.letters` | `abcLetters()` | 26 sign-style cards in 6 groups (closed fists, round, pointing, two-finger, fingers up, little finger/thumb), each group with a tip; link to Spell a word |
| `#abc.numbers` | `abcNumbers()` | 10 cards + `NUMBER_TIP` (6–9: thumb moves along the fingers) |
| `#abc.spell` | `abcSpell()` | type a word/name → tiles + one-letter-at-a-time stepper; suggested words; 5 fingerspelling tips |
| `#abc.practice` | `abcPractice()` | Letters / Numbers scope switch + Try it yourself / Read & pick, same flow as [[Practice Screen]] |
| `#abc.lessons` | `abcLessons()` | the 9 easy-word lessons as tiles with progress; the first unfinished one is marked "Next up" |
| `#abc.lesson-<id>` (e.g. `#abc.lesson-l1`) | `abcLesson(id)` | one lesson: (1) cards for its new letters, (2) its words as tappable chips with New/Learning/Known pills, (3) "Practice these words". Unknown id falls back to the list |
| `#abc.wordpractice` | `abcWordPractice()` | spell-it-yourself practice for one lesson; with no session in memory it falls back to the lessons list |

Letters, numbers and spell pages end with a collapsible **"Where these descriptions come from"** panel (`sourcesPanel()`, a function because it calls `esc` at render time) listing the 11 `ABC_SOURCES` links. Evidence per item: [[Alphabet Sources and Verification]].

Each card (`abcCardHtml`) = big character, New/Learning/Known pill, Hand (+ Move for J, Z, 10), "Remember it" hook, **Add to my practice**, and a Signing Savvy search link (`abcVideo`: letter, or number word like "seven").

## Spell a word
- `SP = { word, i }` (in memory, not saved). `spellClean` uppercases and strips everything except A–Z, max 12 letters (spaces and punctuation are dropped: one word at a time).
- Form `#spell-form` (submit handled by a listener on `#app` registered in `abc.js` at load time via `document.getElementById("app")`; the click handler ignores it). Enter key works.
- Tiles are buttons (`data-abc="at"`), current = sun-colored, passed = green. Stepper shows the letter, hand/move, hook, Back / Next letter (Start over on the last). Double letters (same as neighbour) show a "bounce or slide" note.
- Chips from `SPELL_WORDS`: SAM, ANNA, MAYA, ZOE, LUCAS, PIZZA, TEXAS.

## Easy word lessons (`WORD_LESSONS`, see [[Easy Word Lessons]])
- **Lesson page:** new-letter cards reuse `abcCardHtml`; each word is a `.chip` (`data-abc="tryword"`) that sets `SP` and opens the [[ABC Screens#Spell a word|spell stepper]] below. Words that match a gloss in `SIGNS` (`signFor`) get a note "Has its own sign: use the sign in real life".
- **Word practice (`WP`, in memory):** `abcWordStart(lessonId)` calls `abcLearn("w-<WORD>")` for the lesson's words, shuffles them, then for each word shows the word large, the parent spells it with their hand, **Show the handshapes** lists each letter's Hand/Move (double-letter note if the word has one), then **Not yet / Got it** calls `abcRate("w-<WORD>", got)`. Done screen: "n of 6 felt solid", Practice again, **Next lesson** (or **Spell a name** after lesson 9).
- Word cards share `S.abc.cards`; `abcSet`/letter practice only use `LETTERS`/`NUMBERS`, so they are unaffected. Hub tile, lesson tiles and the Progress panel count known words (`wordKnown`).
- Actions added to `abcClick`: `tryword wstart wagain wreveal wrate`.

## Practice (`AP` session, in memory)
- `abcSet(scope)`: like [[Spaced Repetition]] `todaysSet()`: due first (weakest box), then new ones in order (alphabetical A→Z, or 1→10), 2–6 items, fallback 5 random if < 4.
- `abcStart` calls `abcLearn` on each item (box 1, due tomorrow). **Switching mode keeps the same items** (`Object.assign(AP, {mode, i:0,...})`), unlike the sign practice mode toggle ([[Known Issues and Quirks]] #4). Switching scope starts a new session; "Practice again" re-rolls.
- Quiz options (`abcOptions`): right answer + 3 wrong, taken from the **same group first** so look-alikes (A/S/T/N/M/E, H/K/P/R/U/V) are compared.
- Rating uses `abcRate` = same Leitner rules/intervals as `rate()`; stored in `S.abc.cards` ([[Data Model and Storage]]). Known = box ≥ 2 (same single-correct-answer behaviour as signs).
- No camera check for letters/numbers.

## Progress
`abcProgress()` adds a "Letters & numbers" panel (known/total bars for Alphabet and Numbers) to [[Progress Screen]] — "signs known/started" tiles there still count only the 43 signs.

## Hooks in `js/app.js` (all that was touched)
1. `route()`: `else if (tab === "abc") html = viewAbc(sub);` and `"abc"` added to the active-tab list.
2. Click handler: `if (abcClick(b)) return;` before `const d = b.dataset;` (`abcClick` handles any button with `data-abc`; `data-go="abc..."` buttons use the normal navigation branch).
3. `viewProgress()`: `${abcProgress()}` panel.
4. Plus `index.html` (tab, 2 script tags: `alphabet.js` before `camera.js`, `abc.js` after it, before `app.js`) and `styles.css` (5-column tab bar, `.field`, `.tiles`/`.tile`, `.tips`, `button.chip`).

Naming: globals added are `ABC_*`, `LETTERS`, `NUMBERS`, `SPELL_*`, `NUMBER_TIP`, `abc*`, `SP`, `AP`, `handNote`. Back to [[Router and Events]].
