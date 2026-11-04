---
type: app-logic
tags: [app, screens, layout]
---
# App Layout and Screens

**App-style redesign (2026-11-03).** The app moved from a website-like layout (photo banners, long pages) to an app layout modeled on learning apps such as Duolingo, without copying them. Replaces [[Today Screen]], [[Routines Screen]], [[Practice Screen]] and [[Progress Screen]]; the camera coach now runs inside a lesson ([[Camera Coach Screen]] logic is unchanged).

## Shell (`index.html`)
- `nav.tabs`: **Learn, Practice, ABC, Rewards, Profile**. A bottom tab bar on phones; a left sidebar with the logo on screens ≥900px.
- `main#app`: the current page.
- `aside#rail` (screens ≥1240px): stats, [[#Today's real moment]], daily goal and the two closest badges. Below that width the same stats show as a bar at the top of each page (`statBar()`) and the real-moment card appears on Learn.
- During a lesson `body.lesson-mode` hides the nav and rail so the lesson fills the screen.

## Mitt, the mascot
`mitt(size, mood)` in `js/app.js` draws an original open-hand character (inline SVG). Used in the logo, page headers, next to the current lesson, in lesson cards and on the end screen (sad face when out of hearts).

## Learn (`#learn`, default; `#today` still works)
- One **unit per routine** (`ROUTINES` order), each with a colored bar (`UNIT_COLOR`) and a **Sign guide** button that opens the routine's sign cards (`#routines.<id>`, [[Routine Detail Screen]]).
- Each unit's signs are split into **lessons of 3** (`unitLessons()`, `LESSON_SIZE`). Each lesson is a bubble on a zig-zag path (`ZIG` offsets). States: done (all known, gold check), started (gold), new (grey), and **current** = first lesson in path order not fully known (unit color, ring, bobbing START bubble, Mitt beside it).
- A green chest at the end of each unit starts a **unit review** (every sign as read-and-pick, plus 2 sign-it-yourself).

## Lessons (`#lesson`)
`startLesson(title, steps, back, cam)` sets `P` and goes to `#lesson`. Steps:
- `teach`: meet a new sign (photo or Mitt, steps, hook). "Got it" calls `learn()` and counts toward the daily goal.
- `pick`: read the description, tap one of 4 signs. Instant feedback bar (green / coral) with the hook, then Continue.
- `recall`: see the word, make the sign; "Show me the steps" then Got it / Not yet, or **Check with camera** (camera coach inside the lesson).
- Lesson from the path (`lessonFromSigns`): teach steps for signs not started yet, then a pick for every sign, then one recall.
- **Hearts:** 5 per lesson, a wrong answer (or camera Skip) costs one. At 0 the last feedback still shows, then an "Out of hearts" screen with Try again.
- End screen: XP earned (+10 per right answer), accuracy, hearts left, and the reminder to use a sign with your child.

## Practice (`#practice`)
Mode cards: **Today's 5 minutes** (mixed lesson from `todaysSet()`), **Read & pick**, **Sign it yourself**, **Camera coach**. Below them, the [[Handshape Cheat Sheet]] (moved here from the old Routines tab).

## Rewards (`#rewards`)
`badges()` builds 11 badges: First moment, 10 moments, 7-day streak, one per routine (every sign known), Alphabet Ace, Counting Pro. Earned badges show in color; others show a lock and a progress bar.

## Profile (`#profile`; `#progress` still works)
Header with Mitt, four stat tiles (streak, XP, signs known, real moments), this week's practice days (Mon–Sun dots from `S.days`), progress by routine, `abcProgress()`, signs used with your child, Why this matters, and a two-step **Reset my progress**.

## Today's real moment
`todayMission()` picks one sign from the routine that fits the time of day (same rule as before). "We did it" pushes to `S.used` (real moments), "How to sign" opens the routine's sign guide.

## Stats
- **Streak**: `streak()` (unchanged).
- **Daily goal**: `GOAL = 5` signs practiced today, stored in `S.goal` (`bumpGoal()` is called from `rate()`, `abcRate()` and teach steps).
- **XP**: `xp()` is worked out from saved data (10 per sign review, 5 per letter/number/word review, 20 per real moment), so older saves get XP too.

## ABC tab
Unchanged logic ([[ABC Screens]]). `hero()` now draws a colored page header with Mitt instead of a photo banner.
