---
type: app-logic
tags: [app, screens, layout]
---
# App Layout and Screens

**Current design (2026-11-17):** a calm dashboard look, see [[Design System]]. Older designs were removed from the code and these notes.

## Shell (`index.html`)
- `nav.tabs`: **Learn, Practice, ABC, Rewards, Profile**. A bottom tab bar on phones; a white sidebar on screens ≥900px with the logo at the top and Profile at the bottom.
- `main#app`: the current page. Pages other than Learn start with the stats pills (`statBar()`) and a peach banner (`hero()` / `.pagehead`).
- During a lesson `body.lesson-mode` hides the nav so the lesson fills the screen.

## Mitt, the mascot
`mitt(size, mood)` in `js/app.js` draws an original open-hand character (inline SVG). Used in the logo, the Learn welcome banner, page banners and the sample-progress notice.

## Learn (`#learn`, default; `#today` still works)
**Dashboard (2026-11-17).** Same features as before, laid out as cards.
- Page title "Learn", then a peach **welcome banner**: "Welcome back!" / "Welcome!", the **Up next** lesson with Start lesson / Keep going, and the day-streak pill. Mitt on the right.
- Two halves (`.dash-l`, `.dash-r`, side by side ≥1180px, each 2 columns ≥700px, one column on phones):
  - Left: **Daily goal** (donut `donut()`, goal and done today, "Start practice session" → Practice), **Today's real moment** (sign of the day, We did it / How to sign), **Quick access** (big tiles for the 3 signs in the next lesson → their Sign guide).
  - Right: **Learning path** (`.mods`: every routine as a module with arrows; In progress / N of M signs / Not started / Done; tap one, `data-mapsel` → `mapSel`), overall % bar, then the picked routine's lesson checklist (`routineCard()`) and **Milestones** (earned badges with checks, next milestone with progress, View all badges).
- The current lesson is `currentLesson()`: first lesson, in routine order, not fully known.

## Lessons (`#lesson`)
`startLesson(title, steps, back, cam)` sets `P` and goes to `#lesson`.

**Minimal lesson screen (2026-11-16).** Lessons use the soft blue page with white panels (restyled 2026-11-17) (see [[Design System]]): an exit X, a thin progress bar and "N of M" on top (`lessonTop()`), then two columns on screens ≥900px (`.lgrid`, one column on phones): **Watch** on the left (photo or word in `watchFrame()`, sign name, handshape, Hint) and **Your turn** on the right. Buttons sit in a sticky footer (`.lfoot`, helpers `lbtn()`). Feedback uses one row, `resultRow(ok, title, text)`, with a check or cross.

Steps:
- `teach`: meet a new sign (Watch: photo + hint; Your turn: steps, hook). "Continue" calls `learn()` and counts toward the daily goal.
- `pick`: read the description, tap one of 4 signs. Result row ("Correct" / "Not quite. It's X.") with the hook, then Continue.
- `recall`: see the word, make the sign; "Show me the steps" then Got it / Not yet, or **Check with camera** (camera coach inside the lesson).
- Lesson from the path (`lessonFromSigns`): teach steps for signs not started yet, then a pick for every sign, then one recall.
- **No hearts.** A wrong answer just shows the result row and the lesson continues.
- Camera step: live camera in the Your turn column. After recording, a result row ("Great match" / "Almost there", "N of 3 checks passed") and the three check marks (Handshape, Location, Movement), each with "Matched N% of the time" or Detected / Not seen. See [[Evaluation and Scoring]].
- End screen: "Lesson complete" row with signs practiced, % correct and XP (+10 per right answer), and the reminder to use a sign with your child.

## Practice (`#practice`)
Mode cards: **Today's 5 minutes** (mixed lesson from `todaysSet()`), **Read & pick**, **Sign it yourself**, **Camera coach**. Below them, the [[Handshape Cheat Sheet]] (moved here from the old Routines tab).

## Rewards (`#rewards`)
`badges()` builds 11 badges: First moment, 10 moments, 7-day streak, one per routine (every sign known), Alphabet Ace, Counting Pro. Earned badges show in color; others show a lock and a progress bar.

## Profile (`#profile`; `#progress` still works)
Header with Mitt, four stat tiles (streak, XP, signs known, real moments), this week's practice days (Mon–Sun dots from `S.days`), progress by routine, `abcProgress()`, signs used with your child, Why this matters, and a two-step **Reset my progress**.

## Today's real moment
Card on the Learn dashboard. `todayMission()` picks one sign from the routine that fits the time of day. "We did it" pushes to `S.used` (real moments), "How to sign" opens the routine's sign guide.

## Stats
- **Streak**: `streak()` (unchanged).
- **Daily goal**: `GOAL = 5` signs practiced today, stored in `S.goal` (`bumpGoal()` is called from `rate()`, `abcRate()` and teach steps).
- **XP**: `xp()` is worked out from saved data (10 per sign review, 5 per letter/number/word review, 20 per real moment), so older saves get XP too.

## Hints (added 2026-11-03)
A **Hint** button (`hintButton(id)`) sits right under the question in every lesson step (hidden once a pick is answered or the steps are shown), and on every sign guide card and ABC card. Tapping it toggles a panel (`.hintpop`) under it without re-rendering the page. It replaced the "Watch it signed" links to another site.
- Signs (`hintPanel`): the handshape(s) the sign uses, read from its written hand text by `signShapes()` (`SHAPE_WORDS` patterns, at most 2), each with its cheat-sheet photo and description; the "Remember it" hook (left out where it is already on screen); a left-handed note.
- Letters (`abcHint` in `js/abc.js`): the letter's group and tip, plus the letters in the same group that are easy to mix up. Numbers show the counting tip.

## ABC tab
Unchanged logic ([[ABC Screens]]). `hero()` now draws a colored page header with Mitt instead of a photo banner.
