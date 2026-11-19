---
type: app-logic
tags: [app, screens, layout]
---
# App Layout and Screens

**Current design (2026-11-17):** a calm dashboard look, see [[Design System]]. Older designs were removed from the code and these notes.

## Shell (`index.html`)
- `nav.tabs`: **Learn, Practice, ABC, Rewards, Profile**. A bottom tab bar on phones; a white sidebar on screens ≥900px with the logo at the top and Profile at the bottom.
- **Sign-in page** (`login.html`, `js/login.js`, added by Anish 2026-11-18): a mock sign-in / create account / continue as guest. Nothing is sent anywhere; the user is saved in `localStorage["firstsigns.user"]`, and `index.html` sends you to `login.html` until one exists. Profile shows the name and email and has **Sign out**; Learn says "Welcome back, <first name>!".
- `main#app`: the current page. Pages other than Learn start with the stats pills (`statBar()`) and a peach banner (`hero()` / `.pagehead`).
- During a lesson `body.lesson-mode` hides the nav so the lesson fills the screen.

## Mitt, the mascot
`mitt(size, mood)` in `js/app.js` draws an original open-hand character (inline SVG). Used in the logo, the Learn welcome banner, page banners and the sample-progress notice.

## Learn (`#learn`, default; `#today` still works)
**Learning map + dashboard cards (2026-11-18).**
- Header: "Welcome back!" (or "Welcome!" with no progress), a day-streak pill and a daily-goal pill.
- **Map card** (`learningMap()`, `mapScene()`): an SVG mountain in blues and white with a winding trail. The 6 routines are stops in `ROUTINES` order, with a flag at the summit ("All 43 signs", known count and %). Stop states: done (filled check), now (routine of the current lesson: big ring, "You're here", pulsing halo), started (progress ring), new (number). The trail is solid up to the current routine. Two layouts in `MAP`: `wide` (1000×440) and `tall` (400×620, under 700px); SVG ids get a `-wide`/`-tall` suffix because both are in the page. The map header has the **Up next** box with Start lesson / Keep going.
- Tapping a stop (`data-mapsel`, sets `mapSel`) shows that routine's lesson card (`routineCard()`: numbered checklist, Review all, Sign guide) under the map. Default: the routine with the current lesson (`currentLesson()`).
- Pictures are handshape line drawings, never photos of people ([[Photos]]).
- Cards under the map: the routine card and **Quick access** (tiles for the 3 signs in the next lesson → their Sign guide) on the left; **Daily goal** (donut, "Start practice session"), **Today's real moment** (We did it / How to sign) and **Milestones** (earned badges, next milestone, View all badges) on the right.

## Lessons (`#lesson`)
`startLesson(title, steps, back, cam)` sets `P` and goes to `#lesson`.

**Minimal lesson screen (2026-11-16).** Lessons use the soft blue page with white panels (restyled 2026-11-17) (see [[Design System]]): an exit X, a thin progress bar and "N of M" on top (`lessonTop()`), then two columns on screens ≥900px (`.lgrid`, one column on phones): **Watch** on the left (photo or word in `watchFrame()`, sign name, handshape, Hint) and **Your turn** on the right. Buttons sit in a sticky footer (`.lfoot`, helpers `lbtn()`). Feedback uses one row, `resultRow(ok, title, text)`, with a check or cross.

Steps:
- `teach`: meet a new sign (Watch: handshape drawing + hint; Your turn: steps, hook). "Continue" calls `learn()` and counts toward the daily goal.
- `pick`: read the description, tap one of 4 signs. Result row ("Correct" / "Not quite. It's X.") with the hook, then Continue.
- `recall`: see the word, make the sign; "Show me the steps" then Got it / Not yet, or **Check with camera** (camera coach inside the lesson).
- Lesson from the path (`lessonFromSigns`): teach steps for signs not started yet, then a pick for every sign, then a recall ("Sign this", with **Check with camera**) for every sign, so each sign you learn gets a camera check.
- **No hearts.** A wrong answer just shows the result row and the lesson continues.
- Camera step: live camera in the Your turn column. Buttons **Skip** and **Grade my sign** (3-2-1 countdown, then 3 seconds of signing). After grading, a result row ("Great match" / "Almost there", "N of 3 checks passed") and the three check marks (Handshape, Location, Movement), each with "Matched N% of the time" or Detected / Not seen. See [[Evaluation and Scoring]].
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
